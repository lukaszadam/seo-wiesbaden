import { mkdir, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const SITE = 'https://seo-wiesbaden.de';
const BLOG_DIR = path.join(process.cwd(), 'src/content/blog');
const PROVIDER = (process.env.AI_PROVIDER || (process.env.ANTHROPIC_API_KEY ? 'anthropic' : 'openai')).toLowerCase();
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-5.2';
const ANTHROPIC_MODEL = process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-5';
const SUBREDDITS = (process.env.REDDIT_SUBREDDITS || 'SEO,bigseo,TechSEO,LocalSEO')
  .split(',')
  .map((item) => item.trim())
  .filter(Boolean);
const DRY_RUN = process.argv.includes('--dry-run');
const FORCE = process.argv.includes('--force');

const SEO_FALLBACK_TOPICS = [
  'Google Business Profile optimieren: Bewertungen sammeln und richtig beantworten',
  'Core Web Vitals verbessern: Was lokale Unternehmen wirklich wissen müssen',
  'Lokale Keywords recherchieren: So findet man die richtigen Suchbegriffe',
  'Schema Markup für lokale Unternehmen: Welche strukturierten Daten wirklich helfen',
  'Google Helpful Content: Was sich für lokale Websites grundlegend ändert',
  'Backlinks für lokale Unternehmen: Regionale Verlinkungsstrategien im Rhein-Main-Gebiet',
  'Mobile-First Indexing: Warum das Smartphone die Google-Rangliste bestimmt',
  'Google Maps Ranking verbessern: Die wichtigsten lokalen Rankingfaktoren',
  'On-Page SEO für Dienstleistungsseiten: Titel, Meta-Description und Seitenstruktur',
  'Seitengeschwindigkeit optimieren: Tools und Maßnahmen für schnellere Ladezeiten',
  'Duplicate Content vermeiden: Typische SEO-Fehler bei lokalen Websites',
  'E-E-A-T für lokale Unternehmen: Vertrauen als Google-Rankingfaktor aufbauen',
  'Google Search Console nutzen: Die wichtigsten Berichte für lokale Websites verstehen',
  'Wettbewerbsanalyse im lokalen SEO: Von erfolgreichen Mitbewerbern lernen',
  'Interne Verlinkung optimieren: Seitenstruktur und Link-Verteilung richtig aufbauen',
  'Featured Snippets gewinnen: Strukturierte Antworten für mehr Sichtbarkeit',
  'Saisonale SEO-Strategie: Suchanfragen im Jahresverlauf erkennen und nutzen',
  'Bildoptimierung und Alt-Texte: Wie Bilder zur Google-Sichtbarkeit beitragen',
  'FAQ-Seiten richtig aufbauen: Struktur und Inhalte für bessere Suchergebnisse',
  'NAP-Konsistenz: Warum einheitliche Unternehmensdaten im lokalen SEO entscheidend sind',
];

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

let article;
for (let attempt = 1; attempt <= 3; attempt++) {
  try {
    article = await generateArticle(redditSignals);
    break;
  } catch (err) {
    if (attempt < 3) {
      console.warn(`Article generation attempt ${attempt} failed: ${err.message}. Retrying...`);
    } else {
      throw err;
    }
  }
}

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
    console.warn('Reddit JSON and RSS returned no usable topics. Falling back to AI-generated SEO topics.');
    return await generateFallbackTopics();
  }

  return posts.map((post) => ({
    subreddit: post.subreddit,
    title: post.title,
    url: post.url ?? `https://www.reddit.com${post.permalink}`,
    score: post.score ?? 0,
    comments: post.num_comments ?? 0,
  }));
}

async function generateFallbackTopics() {
  const instructions = [
    'Du bist ein SEO-Experte. Generiere eine Liste von 10 aktuellen SEO-Themen fuer lokale Unternehmen.',
    'Jedes Thema MUSS sich direkt auf Suchmaschinenoptimierung, Google-Sichtbarkeit oder lokales Online-Marketing beziehen.',
    'Antworte ausschliesslich mit einem gueltigen JSON-Array von Strings. Kein Text, kein Markdown, nur reines JSON-Array.',
    'Beispiel: ["Thema 1", "Thema 2", ...]',
  ].join(' ');

  try {
    let topics = null;
    if (PROVIDER === 'anthropic' && process.env.ANTHROPIC_API_KEY) {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': process.env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: ANTHROPIC_MODEL,
          max_tokens: 800,
          system: instructions,
          messages: [{ role: 'user', content: 'Generiere 10 SEO-Themen fuer lokale Unternehmen im Rhein-Main-Gebiet.' }],
        }),
      });
      if (response.ok) {
        const data = await response.json();
        const text = data.content?.filter((c) => c.type === 'text').map((c) => c.text).join('').trim();
        const match = text?.match(/\[[\s\S]*\]/);
        if (match) topics = JSON.parse(match[0]);
      }
    } else if (process.env.OPENAI_API_KEY) {
      const response = await fetch('https://api.openai.com/v1/responses', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: OPENAI_MODEL, instructions, input: 'Generiere 10 SEO-Themen fuer lokale Unternehmen im Rhein-Main-Gebiet.', max_output_tokens: 800 }),
      });
      if (response.ok) {
        const data = await response.json();
        const text = (data.output_text || extractOutputText(data))?.trim();
        const match = text?.match(/\[[\s\S]*\]/);
        if (match) topics = JSON.parse(match[0]);
      }
    }

    if (Array.isArray(topics) && topics.length > 0) {
      console.log(`Using ${topics.length} AI-generated SEO fallback topics.`);
      return topics.map((title) => ({ subreddit: 'seo-fallback', title: String(title), url: SITE, score: 50, comments: 0 }));
    }
  } catch (err) {
    console.warn(`AI fallback topic generation failed: ${err.message}. Using hardcoded topics.`);
  }

  // Pick 8 random topics from the hardcoded list so each run stays varied
  const shuffled = [...SEO_FALLBACK_TOPICS].sort(() => Math.random() - 0.5).slice(0, 8);
  console.log('Using hardcoded SEO fallback topics.');
  return shuffled.map((title) => ({ subreddit: 'seo-fallback', title, url: SITE, score: 50, comments: 0 }));
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
    goal: 'Ein hilfreicher, fachlich sauberer SEO-Blogartikel ueber Suchmaschinenoptimierung, Google-Sichtbarkeit oder lokales Online-Marketing – der konkrete Fragen aus Reddit in lokaler Beratungssprache beantwortet.',
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
    'Nutze die Signalthemen nur als Ideengeber. Zitiere keine Reddit-Kommentare und stelle Thementitel nicht als Fakten dar.',
    'Das Thema MUSS sich direkt auf Suchmaschinenoptimierung, Google-Rankingfaktoren, technisches SEO, lokales Online-Marketing, Google Business Profile, Backlinks, Keywords, Ladezeiten, Core Web Vitals oder verwandte Suchmaschinenthemen beziehen.',
    'Allgemeine Businessthemen wie Kundenservice, Reaktionszeiten, Team-Management oder Vertrieb ohne direkten SEO-Bezug sind NICHT erlaubt – waehle in diesem Fall ein anderes Thema aus den Signalen.',
    'Der Artikel soll fuer Menschen geschrieben sein, nicht als SEO-Spam wirken.',
    'WICHTIG: Antworte AUSSCHLIESSLICH mit einem reinen JSON-Objekt. Kein einleitender Text, keine Erklaerung, kein Markdown-Codeblock, keine Backticks. Nur das rohe JSON-Objekt beginnend mit { und endend mit }.',
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
