import { mkdir, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const SITE = 'https://seo-wiesbaden.de';
const BLOG_DIR = path.join(process.cwd(), 'src/content/blog');
const PROVIDER = (process.env.AI_PROVIDER || (process.env.ANTHROPIC_API_KEY ? 'anthropic' : 'openai')).toLowerCase();
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-5.2';
const ANTHROPIC_MODEL = process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-5';
const SUBREDDITS = (process.env.REDDIT_SUBREDDITS || 'SEO,bigseo,TechSEO,smallbusiness')
  .split(',')
  .map((item) => item.trim())
  .filter(Boolean);
const DRY_RUN = process.argv.includes('--dry-run');
const FORCE = process.argv.includes('--force');

const today = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Europe/Berlin',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
}).format(new Date());

await mkdir(BLOG_DIR, { recursive: true });

const existing = await readdir(BLOG_DIR).catch(() => []);
if (!FORCE && existing.some((file) => file.startsWith(`${today}-`) && file.endsWith('.md'))) {
  console.log(`A blog post for ${today} already exists. Use --force to generate another one.`);
  process.exit(0);
}

const redditSignals = await collectRedditSignals();
const article = await generateArticle(redditSignals);
article.title = cleanPostTitle(article.title);
article.slug = cleanPostSlug(article.slug || article.title);
const slug = uniqueSlug(slugify(article.slug), existing);
const filePath = path.join(BLOG_DIR, `${today}-${slug}.md`);
const markdown = renderMarkdown(article, redditSignals, slug);

if (DRY_RUN) {
  console.log(markdown);
} else {
  await writeFile(filePath, markdown, 'utf8');
  console.log(`Created ${filePath}`);
}

async function collectRedditSignals() {
  const windows = ['hot', 'top?t=week'];
  const jsonRequests = SUBREDDITS.flatMap((subreddit) =>
    windows.map((window) => fetchRedditListing(subreddit, window))
  );
  const jsonSettled = await Promise.allSettled(jsonRequests);
  let posts = jsonSettled
    .filter((result) => result.status === 'fulfilled')
    .flatMap((result) => result.value)
    .filter((post) => post.title && !post.over_18)
    .sort((a, b) => scorePost(b) - scorePost(a))
    .slice(0, 28);

  if (posts.length === 0) {
    console.warn('Reddit JSON returned no usable topics. Trying Reddit RSS fallback.');
    const rssRequests = SUBREDDITS.flatMap((subreddit) =>
      ['hot', 'top'].map((window) => fetchRedditRss(subreddit, window))
    );
    const rssSettled = await Promise.allSettled(rssRequests);
    posts = rssSettled
      .filter((result) => result.status === 'fulfilled')
      .flatMap((result) => result.value)
      .filter((post) => post.title)
      .sort((a, b) => scorePost(b) - scorePost(a))
      .slice(0, 28);
  }

  if (posts.length === 0) {
    console.warn('Reddit JSON and RSS returned no usable topics. Falling back to a generic seed topic.');
    return [{
      subreddit: 'SEO',
      title: 'Fallback seed: how should local businesses prioritize technical SEO, content, and local trust signals?',
      url: 'https://www.reddit.com/r/SEO/',
      score: 1,
      comments: 0,
    }];
  }

  return posts.map((post) => ({
    subreddit: post.subreddit,
    title: post.title,
    url: post.url ?? `https://www.reddit.com${post.permalink}`,
    score: post.score ?? 0,
    comments: post.num_comments ?? 0,
  }));
}

async function fetchRedditListing(subreddit, window) {
  const url = `https://www.reddit.com/r/${encodeURIComponent(subreddit)}/${window}.json?limit=25`;
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'seo-wiesbaden-daily-blog/1.0 (topic research)',
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    console.warn(`Reddit fetch failed for r/${subreddit}/${window}: ${response.status}`);
    return [];
  }

  const data = await response.json();
  return data?.data?.children?.map((child) => child.data) ?? [];
}

async function fetchRedditRss(subreddit, window) {
  const url = `https://www.reddit.com/r/${encodeURIComponent(subreddit)}/${window}/.rss`;
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'seo-wiesbaden-daily-blog/1.0 (topic research)',
      'Accept': 'application/rss+xml, application/xml, text/xml',
    },
  });

  if (!response.ok) {
    console.warn(`Reddit RSS fetch failed for r/${subreddit}/${window}: ${response.status}`);
    return [];
  }

  const xml = await response.text();
  return parseRedditRss(xml, subreddit);
}

function parseRedditRss(xml, subreddit) {
  return [...xml.matchAll(/<entry\b[\s\S]*?<\/entry>/gi)]
    .map((match) => {
      const entry = match[0];
      const title = decodeXml(getXmlText(entry, 'title'));
      const updated = getXmlText(entry, 'updated') || getXmlText(entry, 'published');
      const href = entry.match(/<link\b[^>]*href="([^"]+)"/i)?.[1] ?? `https://www.reddit.com/r/${subreddit}/`;
      return {
        subreddit,
        title,
        url: decodeXml(href),
        score: updated ? Math.max(1, Math.floor((Date.now() - new Date(updated).valueOf()) / -3600000) + 168) : 1,
        num_comments: 0,
      };
    })
    .filter((post) => post.title && !/^\s*(comment|comments)\s*$/i.test(post.title));
}

function getXmlText(xml, tagName) {
  const match = xml.match(new RegExp(`<${tagName}\\b[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i'));
  return match?.[1]?.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim() ?? '';
}

function decodeXml(value) {
  return String(value ?? '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'");
}

async function generateArticle(signals) {
  const prompt = {
    site: SITE,
    audience: 'lokale Unternehmen in Wiesbaden und im Rhein-Main-Gebiet',
    language: 'de-DE',
    goal: 'Ein hilfreicher, fachlich sauberer SEO-Blogartikel, der konkrete Fragen aus Reddit in lokaler Beratungssprache beantwortet.',
    redditSignals: signals,
    outputContract: {
      title: 'Maximal 70 Zeichen. Darf die Woerter "SEO" und "Wiesbaden" nicht enthalten.',
      slug: 'kurzer, praeziser URL-Slug ohne Datum, maximal 5 Woerter. Darf "seo" und "wiesbaden" nicht enthalten.',
      description: 'Meta Description, maximal 155 Zeichen',
      intro: '2 kurze Absätze',
      sections: '5 bis 7 Abschnitte mit h2 und body Markdown',
      faq: '3 kurze FAQ-Paare',
      takeaway: 'kurzes Fazit',
    },
  };

  const instructions = [
    'Du bist ein senioriger SEO-Berater und Redakteur fuer SEO Wiesbaden.',
    'Schreibe hilfreich, konkret und ohne erfundene Fallzahlen.',
    'Der Titel und damit die H1 duerfen weder "SEO" noch "Wiesbaden" enthalten. Diese Begriffe sind fuer die Startseite reserviert.',
    'Nutze Reddit nur als Ideengeber. Zitiere keine Reddit-Kommentare und stelle Reddit-Titel nicht als Fakten dar.',
    'Waehle ein aktuelles Thema mit erkennbarem Nutzen fuer lokale Unternehmen, nicht nur das lauteste Reddit-Thema.',
    'Der Artikel soll fuer Menschen geschrieben sein, nicht als SEO-Spam wirken.',
    'Antworte ausschliesslich mit gueltigem JSON ohne Markdown-Codeblock.',
  ].join(' ');

  const parsed = PROVIDER === 'anthropic'
    ? await generateWithAnthropic(instructions, prompt)
    : await generateWithOpenAI(instructions, prompt);

  validateArticle(parsed);
  return parsed;
}

async function generateWithOpenAI(instructions, prompt) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('Missing OPENAI_API_KEY. Add it as a GitHub Actions repository secret or set AI_PROVIDER=anthropic with ANTHROPIC_API_KEY.');
  }

  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      instructions,
      input: JSON.stringify(prompt, null, 2),
      max_output_tokens: 4500,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`OpenAI request failed: ${response.status} ${body}`);
  }

  const data = await response.json();
  const text = data.output_text || extractOutputText(data);
  return parseJson(text, 'OpenAI');
}

async function generateWithAnthropic(instructions, prompt) {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error('Missing ANTHROPIC_API_KEY. Add it as a GitHub Actions repository secret.');
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: ANTHROPIC_MODEL,
      max_tokens: 4500,
      system: instructions,
      messages: [
        {
          role: 'user',
          content: JSON.stringify(prompt, null, 2),
        },
      ],
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Anthropic request failed: ${response.status} ${body}`);
  }

  const data = await response.json();
  const text = data.content
    ?.filter((content) => content.type === 'text')
    ?.map((content) => content.text)
    ?.join('\n')
    ?.trim();
  return parseJson(text, 'Anthropic');
}

function extractOutputText(data) {
  return data.output
    ?.flatMap((item) => item.content ?? [])
    ?.map((content) => content.text ?? '')
    ?.join('\n')
    ?.trim();
}

function parseJson(text, provider = 'AI provider') {
  if (!text) {
    throw new Error(`${provider} returned an empty response.`);
  }

  const candidates = [text];
  const match = text.match(/\{[\s\S]*\}/);
  if (match) candidates.push(match[0]);

  for (const candidate of candidates) {
    try { return JSON.parse(candidate); } catch {}
    try { return JSON.parse(escapeJsonStrings(candidate)); } catch {}
  }

  throw new Error(`${provider} response did not contain valid JSON.`);
}

function escapeJsonStrings(str) {
  let result = '';
  let inString = false;
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    if (ch === '"' && (i === 0 || str[i - 1] !== '\\')) {
      inString = !inString;
      result += ch;
    } else if (inString && ch === '\n') {
      result += '\\n';
    } else if (inString && ch === '\r') {
      result += '\\r';
    } else if (inString && ch === '\t') {
      result += '\\t';
    } else {
      result += ch;
    }
  }
  return result;
}

function validateArticle(article) {
  const required = ['title', 'slug', 'description', 'intro', 'sections', 'faq', 'takeaway'];
  for (const key of required) {
    if (!article[key]) throw new Error(`Generated article is missing "${key}".`);
  }
  if (!Array.isArray(article.sections) || article.sections.length < 4) {
    throw new Error('Generated article needs at least 4 sections.');
  }
  if (!Array.isArray(article.faq) || article.faq.length < 2) {
    throw new Error('Generated article needs at least 2 FAQ entries.');
  }
}

function renderMarkdown(article, signals, slug) {
  const sourceList = signals
    .slice(0, 8)
    .map((signal) => `  - title: ${yamlQuote(signal.title)}\n    subreddit: ${yamlQuote(signal.subreddit)}\n    url: ${yamlQuote(signal.url)}`)
    .join('\n');
  const intro = Array.isArray(article.intro) ? article.intro.join('\n\n') : article.intro;
  const sections = article.sections
    .map((section, index) => `## ${cleanSectionHeading(section.heading, index)}\n\n${section.body}`)
    .join('\n\n');
  const faq = article.faq
    .map((item) => `### ${item.question}\n\n${item.answer}`)
    .join('\n\n');

  return `---
title: ${yamlQuote(article.title)}
slug: ${yamlQuote(slug)}
description: ${yamlQuote(article.description)}
pubDate: ${yamlQuote(today)}
updatedDate: ${yamlQuote(today)}
draft: false
researchSources:
${sourceList}
---

${intro}

${sections}

## FAQ

${faq}

## Fazit

${article.takeaway}
`;
}

function scorePost(post) {
  return (post.score ?? 0) + (post.num_comments ?? 0) * 3;
}

function slugify(input) {
  return input
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 72) || 'seo-blog';
}

function cleanPostTitle(input) {
  return String(input ?? '')
    .replace(/\bSEO\b/gi, '')
    .replace(/\bWiesbaden\w*\b/gi, '')
    .replace(/\s+([:|,-])/g, '$1')
    .replace(/([:|,-])\s*$/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim() || 'Aktuelle Fragen aus der Suche';
}

function cleanPostSlug(input) {
  return String(input ?? '')
    .replace(/\bseo\b/gi, '')
    .replace(/\bwiesbaden\w*\b/gi, '')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '')
    .trim() || 'aktuelles-thema';
}

function cleanSectionHeading(input, index) {
  const fallbackHeadings = [
    'Ausgangslage verstehen',
    'Wichtige Grundlagen',
    'Praktische Umsetzung',
    'Haeufige Fehler',
    'Prioritaeten setzen',
    'Ergebnisse messen',
    'Naechste Schritte',
  ];
  const heading = String(input ?? '').trim();
  if (!heading || heading.toLowerCase() === 'undefined') {
    return fallbackHeadings[index] ?? 'Weitere Hinweise';
  }
  return heading;
}

function uniqueSlug(base, files) {
  let slug = base;
  let counter = 2;
  while (files.includes(`${slug}.md`)) {
    slug = `${base}-${counter}`;
    counter += 1;
  }
  return slug;
}

function yamlQuote(value) {
  return JSON.stringify(String(value ?? ''));
}
