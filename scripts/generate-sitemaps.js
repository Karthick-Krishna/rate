import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getStaticReviews, TOTAL_REVIEWS } from '../src/reviewsData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://coralgenz-reviews.vercel.app';
const PUBLIC_DIR = path.resolve(__dirname, '../public');

if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

console.log('Generating sitemaps for 53,766 reviews...');
const reviews = getStaticReviews();

// 1. Generate sitemap-main.xml
const mainPages = [
  { url: '/', changefreq: 'daily', priority: '1.0' },
  { url: '/category/it-services', changefreq: 'daily', priority: '0.9' },
  { url: '/category/coralgenz-vault', changefreq: 'daily', priority: '0.9' },
  { url: '/category/coralgenz-compiler', changefreq: 'daily', priority: '0.9' },
  { url: '/category/coralgenz-qr', changefreq: 'daily', priority: '0.9' },
  { url: '/category/general', changefreq: 'daily', priority: '0.8' },
];

const mainXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${mainPages.map(p => `  <url>
    <loc>${BASE_URL}${p.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap-main.xml'), mainXml, 'utf-8');

// 2. Generate sitemap-reviews-1.xml (First 30,000 reviews)
const batch1 = reviews.slice(0, 30000);
let reviewsXml1 = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
for (let i = 0; i < batch1.length; i++) {
  const r = batch1[i];
  const dateStr = r.timestampStr ? r.timestampStr.split('T')[0] : '2026-08-16';
  reviewsXml1 += `  <url>\n    <loc>${BASE_URL}/review/${r.id}</loc>\n    <lastmod>${dateStr}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
}
reviewsXml1 += `</urlset>`;
fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap-reviews-1.xml'), reviewsXml1, 'utf-8');

// 3. Generate sitemap-reviews-2.xml (Remaining 23,766 reviews)
const batch2 = reviews.slice(30000);
let reviewsXml2 = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
for (let i = 0; i < batch2.length; i++) {
  const r = batch2[i];
  const dateStr = r.timestampStr ? r.timestampStr.split('T')[0] : '2026-08-16';
  reviewsXml2 += `  <url>\n    <loc>${BASE_URL}/review/${r.id}</loc>\n    <lastmod>${dateStr}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
}
reviewsXml2 += `</urlset>`;
fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap-reviews-2.xml'), reviewsXml2, 'utf-8');

// 4. Generate sitemap.xml (Sitemap Index file per Google specs)
const sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${BASE_URL}/sitemap-main.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-reviews-1.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${BASE_URL}/sitemap-reviews-2.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>
</sitemapindex>`;
fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemapIndexXml, 'utf-8');

// 5. Generate robots.txt
const robotsTxt = `User-agent: *
Allow: /

# High SEO Sitemaps for Googlebot, Bingbot & Search Engine Crawlers
Sitemap: ${BASE_URL}/sitemap.xml
`;
fs.writeFileSync(path.join(PUBLIC_DIR, 'robots.txt'), robotsTxt, 'utf-8');

console.log(`Successfully generated sitemaps for all ${reviews.length.toLocaleString()} reviews in public/!`);
