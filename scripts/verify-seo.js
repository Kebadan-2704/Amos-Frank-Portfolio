import fs from 'fs';

const home = fs.readFileSync('dist/index.html', 'utf8');
const contact = fs.readFileSync('dist/contact/index.html', 'utf8');

console.log('=== VERIFY HOME (/) RAW HTML ===');
console.log('1. Title:', home.match(/<title>.*?<\/title>/)?.[0]);
console.log('2. Canonical:', home.match(/<link rel="canonical".*?\/>/)?.[0]);
console.log('3. OG Title:', home.match(/<meta property="og:title".*?\/>/)?.[0]);
console.log('4. OG Image:', home.match(/<meta property="og:image".*?\/>/)?.[0]);
console.log('5. Twitter Card:', home.match(/<meta property="twitter:card".*?\/>/)?.[0]);
console.log('6. H1:', home.match(/<h1[\s\S]*?<\/h1>/)?.[0].slice(0, 150) + '...');
console.log('7. Music Heading:', home.match(/<h2 class="section-title">[\s\S]*?<\/h2>/)?.[0]);
console.log('8. Sample Video Card Titles:', home.match(/<h3 class="music-card-title">.*?<\/h3>/g)?.slice(0, 3));
console.log('9. Total Video Titles in Prerender:', home.match(/<h3 class="music-card-title">.*?<\/h3>/g)?.length);
console.log('10. Has JSON-LD scripts:', home.match(/<script type="application\/ld\+json">/g)?.length);

console.log('\n=== VERIFY CONTACT (/contact) RAW HTML ===');
console.log('1. Title:', contact.match(/<title>.*?<\/title>/)?.[0]);
console.log('2. Canonical:', contact.match(/<link rel="canonical".*?\/>/)?.[0]);
console.log('3. OG Title:', contact.match(/<meta property="og:title".*?\/>/)?.[0]);
console.log('4. Has Contact Form:', contact.includes('contact-form'));
console.log('5. Has Breadcrumb schema:', contact.includes('BreadcrumbList'));
