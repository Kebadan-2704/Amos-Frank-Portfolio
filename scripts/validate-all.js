import fs from 'fs';

let allPassed = true;
function assert(desc, condition) {
  if (condition) {
    console.log(`[PASS] ${desc}`);
  } else {
    console.error(`[FAIL] ${desc}`);
    allPassed = false;
  }
}

// 1. Validate manifest.json
const manifest = JSON.parse(fs.readFileSync('public/manifest.json', 'utf8'));
assert('manifest has name', !!manifest.name);
assert('manifest has short_name', !!manifest.short_name);
assert('manifest has start_url', manifest.start_url === '/');
assert('manifest has icons array', Array.isArray(manifest.icons) && manifest.icons.length >= 3);
manifest.icons.forEach(icon => {
  assert(`icon file exists: ${icon.src}`, fs.existsSync(`public/${icon.src.replace(/^\//, '')}`));
});

// 2. Validate robots.txt
const robots = fs.readFileSync('public/robots.txt', 'utf8');
assert('robots.txt allows all', robots.includes('Allow: /'));
assert('robots.txt points to https sitemap', robots.includes('Sitemap: https://amosfrank.com/sitemap.xml'));

// 3. Validate sitemap.xml
const sitemap = fs.readFileSync('dist/sitemap.xml', 'utf8');
assert('sitemap has https://amosfrank.com/', sitemap.includes('<loc>https://amosfrank.com/</loc>'));
assert('sitemap has https://amosfrank.com/contact', sitemap.includes('<loc>https://amosfrank.com/contact</loc>'));
assert('sitemap does not contain /about', !sitemap.includes('/about'));
assert('sitemap does not contain /music', !sitemap.includes('/music'));

// 4. Validate vercel.json redirects
const vercel = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
assert('vercel cleanUrls is true', vercel.cleanUrls === true);
const redirects = vercel.redirects;
assert('redirect /about -> / exists', redirects.some(r => r.source === '/about' && r.destination === '/' && r.permanent === true));
assert('redirect /music -> /#music exists', redirects.some(r => r.source === '/music' && r.destination === '/#music' && r.permanent === true));
assert('redirect /index.html -> / exists', redirects.some(r => r.source === '/index.html' && r.destination === '/' && r.permanent === true));

// 5. Validate JSON-LD in dist/index.html
const html = fs.readFileSync('dist/index.html', 'utf8');
const jsonLdMatches = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g);
assert('JSON-LD script tags found in dist/index.html', jsonLdMatches && jsonLdMatches.length > 0);

jsonLdMatches.forEach((scriptTag, idx) => {
  const content = scriptTag.replace(/<script type="application\/ld\+json">/, '').replace(/<\/script>/, '');
  try {
    const parsed = JSON.parse(content);
    assert(`JSON-LD tag #${idx + 1} is valid JSON`, true);
    if (Array.isArray(parsed)) {
      parsed.forEach(item => {
        assert(`Schema item ${item['@type']} has @context`, item['@context'] === 'https://schema.org');
        assert(`Schema item ${item['@type']} has name or id`, !!(item.name || item['@id']));
      });
    }
  } catch (e) {
    assert(`JSON-LD tag #${idx + 1} failed parse: ${e.message}`, false);
  }
});

console.log(`\nOverall Validation Result: ${allPassed ? 'ALL CHECKS PASSED' : 'SOME CHECKS FAILED'}`);
