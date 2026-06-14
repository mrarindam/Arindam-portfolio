import { blogs, toSlug } from '../src/data/blogs';

const SITE_URL = 'https://mrarindam.xyz';

// Static routes with SEO weighting. Keep in sync with the files in /pages.
const STATIC_ROUTES = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/about', changefreq: 'monthly', priority: '0.8' },
  { path: '/works', changefreq: 'monthly', priority: '0.8' },
  { path: '/blogs', changefreq: 'weekly', priority: '0.8' },
  { path: '/contact', changefreq: 'yearly', priority: '0.7' },
  { path: '/privacy', changefreq: 'yearly', priority: '0.3' },
  { path: '/terms', changefreq: 'yearly', priority: '0.3' },
];

function buildSitemap() {
  const lastmod = new Date().toISOString();

  const urls = [
    ...STATIC_ROUTES.map((r) => ({
      loc: `${SITE_URL}${r.path}`,
      changefreq: r.changefreq,
      priority: r.priority,
    })),
    // Blog posts are data-driven, so they are added automatically.
    ...blogs.map((b) => ({
      loc: `${SITE_URL}/blog/${toSlug(b.title)}`,
      changefreq: 'monthly',
      priority: '0.6',
    })),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;
}

export async function getServerSideProps({ res }) {
  const sitemap = buildSitemap();

  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  // Cache at the CDN edge for a day; serve stale while revalidating.
  res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=43200');
  res.write(sitemap);
  res.end();

  return { props: {} };
}

// The route only emits XML via getServerSideProps; nothing to render.
export default function SiteMap() {
  return null;
}
