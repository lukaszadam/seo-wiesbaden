const SITE = 'https://seo-wiesbaden.de';

export async function GET() {
  const posts = (await import.meta.glob('../content/blog/*.md', { eager: true }))
  const urls = [
    { loc: '/', lastmod: new Date().toISOString() },
    { loc: '/blog', lastmod: new Date().toISOString() },
    { loc: '/datenschutz', lastmod: new Date().toISOString() },
    ...Object.values(posts)
      .filter((post) => post.frontmatter?.draft !== true)
      .map((post) => ({
        loc: `/blog/${post.frontmatter.slug}`,
        lastmod: new Date(post.frontmatter.updatedDate ?? post.frontmatter.pubDate).toISOString(),
      })),
  ];

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url>
    <loc>${SITE}${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
  </url>`).join('\n')}
</urlset>`, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
