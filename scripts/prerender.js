import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { artistInfo, youtubeVideos, spotifyTracks } from '../src/data/tracks.js';
import {
  BASE_URL,
  getPersonSchema,
  getWebsiteSchema,
  getProfilePageSchema,
  getFaqSchema,
  getVideoSchemaList,
  getMusicRecordingSchemaList,
  getContactBreadcrumbSchema,
} from '../src/utils/seoData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const distDir = path.resolve(root, 'dist');
const distSsrDir = path.resolve(root, 'dist-ssr');

const ROUTE_CONFIGS = {
  '/': {
    title: `${artistInfo.name} | Keyboardist, Music Producer & Teacher`,
    description: `Official portfolio of ${artistInfo.name} — Keyboardist, bassist, and music producer in Coimbatore, India. Watch music videos, stream tracks, and book sessions.`,
    canonical: `${BASE_URL}/`,
    isHome: true,
    schemas: [
      getPersonSchema(artistInfo),
      getWebsiteSchema(artistInfo),
      getProfilePageSchema(artistInfo),
      getFaqSchema(),
      ...getVideoSchemaList(youtubeVideos, artistInfo),
      ...getMusicRecordingSchemaList(spotifyTracks, artistInfo),
    ],
  },
  '/contact': {
    title: `Contact ${artistInfo.name} | Bookings & Music Lessons Coimbatore`,
    description: `Get in touch with ${artistInfo.name} for music production, live performance bookings, collaborations, and keyboard or bass guitar classes at Musik Hub Coimbatore.`,
    canonical: `${BASE_URL}/contact`,
    isHome: false,
    schemas: [
      getPersonSchema(artistInfo),
      getContactBreadcrumbSchema(),
    ],
  },
};

function injectHeadMeta(html, routeConfig) {
  let updated = html;

  // Title
  updated = updated.replace(/<title>.*?<\/title>/, `<title>${routeConfig.title}</title>`);

  // Meta title & description
  updated = updated.replace(/<meta name="title" content=".*?" \/>/, `<meta name="title" content="${routeConfig.title}" />`);
  updated = updated.replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${routeConfig.description}" />`);

  // Canonical
  updated = updated.replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${routeConfig.canonical}" />`);

  // OpenGraph
  updated = updated.replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${routeConfig.title}" />`);
  updated = updated.replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${routeConfig.description}" />`);
  updated = updated.replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${routeConfig.canonical}" />`);

  // Twitter
  updated = updated.replace(/<meta property="twitter:title" content=".*?" \/>/, `<meta property="twitter:title" content="${routeConfig.title}" />`);
  updated = updated.replace(/<meta property="twitter:description" content=".*?" \/>/, `<meta property="twitter:description" content="${routeConfig.description}" />`);
  updated = updated.replace(/<meta property="twitter:url" content=".*?" \/>/, `<meta property="twitter:url" content="${routeConfig.canonical}" />`);

  // If not home, remove hero image preload to prevent unused preload warning
  if (!routeConfig.isHome) {
    updated = updated.replace(/<link rel="preload" as="image" href="\/amos-hero\..*?" .*?\/>\s*/, '');
  }

  // Inject route-specific JSON-LD schemas
  if (routeConfig.schemas && routeConfig.schemas.length > 0) {
    const jsonLdScript = `\n    <script type="application/ld+json">\n      ${JSON.stringify(routeConfig.schemas)}\n    </script>`;
    updated = updated.replace('</head>', `${jsonLdScript}\n  </head>`);
  }

  return updated;
}

async function prerender() {
  console.log('--- Starting SSG Prerendering ---');
  const templatePath = path.resolve(distDir, 'index.html');
  if (!fs.existsSync(templatePath)) {
    throw new Error('dist/index.html not found. Run client build first.');
  }
  const template = fs.readFileSync(templatePath, 'utf-8');

  // Import SSR entry
  const serverEntryPath = path.resolve(distSsrDir, 'entry-server.js');
  const { render } = await import(pathToFileURL(serverEntryPath).href);

  for (const [url, config] of Object.entries(ROUTE_CONFIGS)) {
    console.log(`Prerendering route: ${url}`);
    const { appHtml } = render(url);

    let html = injectHeadMeta(template, config);

    // Clean up document tags from appHtml so they live exclusively in <head>
    const cleanAppHtml = appHtml
      .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/g, '')
      .replace(/<title>.*?<\/title>\s*/g, '')
      .replace(/<meta .*?\/>\s*/g, '')
      .replace(/<link .*?\/>\s*/g, '');

    // Inject prerendered markup into #root
    html = html.replace('<div id="root"></div>', `<div id="root">${cleanAppHtml}</div>`);

    // Determine output destination
    if (url === '/') {
      fs.writeFileSync(path.resolve(distDir, 'index.html'), html, 'utf-8');
      console.log('✓ Wrote dist/index.html');
    } else {
      const routeDir = path.resolve(distDir, url.slice(1));
      if (!fs.existsSync(routeDir)) {
        fs.mkdirSync(routeDir, { recursive: true });
      }
      fs.writeFileSync(path.resolve(routeDir, 'index.html'), html, 'utf-8');
      fs.writeFileSync(path.resolve(distDir, `${url.slice(1)}.html`), html, 'utf-8');
      console.log(`✓ Wrote dist${url}/index.html and dist/${url.slice(1)}.html`);
    }
  }

  // Generate 404.html with noindex
  console.log('Generating dist/404.html...');
  const { appHtml: notFoundHtml } = render('/404');
  const cleanNotFoundHtml = notFoundHtml
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/g, '')
    .replace(/<title>.*?<\/title>\s*/g, '')
    .replace(/<meta .*?\/>\s*/g, '')
    .replace(/<link .*?\/>\s*/g, '');
  let notFoundPage = template
    .replace(/<title>.*?<\/title>/, '<title>Page Not Found | Amos Frank</title>')
    .replace(/<link rel="canonical".*?\/>\s*/, '')
    .replace(/<link rel="preload" as="image" href="\/amos-hero\..*?" .*?\/>\s*/, '')
    .replace('</head>', '    <meta name="robots" content="noindex, nofollow" />\n  </head>')
    .replace('<div id="root"></div>', `<div id="root">${cleanNotFoundHtml}</div>`);
  fs.writeFileSync(path.resolve(distDir, '404.html'), notFoundPage, 'utf-8');
  console.log('✓ Wrote dist/404.html');

  // Generate dynamic sitemap.xml
  const today = new Date().toISOString().split('T')[0];
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://amosfrank.com/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://amosfrank.com/contact</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
`;
  fs.writeFileSync(path.resolve(distDir, 'sitemap.xml'), sitemapXml, 'utf-8');
  fs.writeFileSync(path.resolve(root, 'public/sitemap.xml'), sitemapXml, 'utf-8');
  console.log(`✓ Generated sitemap.xml (lastmod: ${today})`);

  // Clean up dist-ssr
  if (fs.existsSync(distSsrDir)) {
    fs.rmSync(distSsrDir, { recursive: true, force: true });
    console.log('✓ Cleaned up dist-ssr');
  }

  console.log('--- SSG Prerendering Completed Successfully ---');
}

prerender().catch((err) => {
  console.error('Prerender error:', err);
  process.exit(1);
});
