import fs from 'fs';
import path from 'path';
import https from 'https';

const fontsDir = path.resolve('public/fonts');
if (!fs.existsSync(fontsDir)) {
  fs.mkdirSync(fontsDir, { recursive: true });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to get '${url}' (${res.statusCode})`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', reject);
  });
}

async function fetchCss(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function main() {
  console.log('Downloading self-hosted fonts...');
  const cssUrl = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@700&family=Outfit:wght@400;500;600;700&family=Space+Grotesk:wght@600;700&display=swap';
  const css = await fetchCss(cssUrl);

  // Regex to extract latin blocks
  const blocks = css.split('@font-face').slice(1);
  let localCss = '/* Self-hosted fonts — Latin subset (Woff2) */\n';

  for (const block of blocks) {
    if (!block.includes('/* latin */')) continue;

    const familyMatch = block.match(/font-family:\s*['"]([^'"]+)['"]/);
    const weightMatch = block.match(/font-weight:\s*(\d+)/);
    const urlMatch = block.match(/src:\s*url\((https:\/\/[^)]+\.woff2)\)/);
    const unicodeMatch = block.match(/unicode-range:\s*([^;]+);/);

    if (familyMatch && weightMatch && urlMatch) {
      const family = familyMatch[1];
      const weight = weightMatch[1];
      const remoteUrl = urlMatch[1];
      const unicodeRange = unicodeMatch ? unicodeMatch[1] : 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD';
      
      const safeName = `${family.replace(/\s+/g, '-')}-${weight}.woff2`;
      const destPath = path.join(fontsDir, safeName);

      console.log(`Downloading ${safeName}...`);
      await download(remoteUrl, destPath);

      localCss += `
@font-face {
  font-family: '${family}';
  font-style: normal;
  font-weight: ${weight};
  font-display: swap;
  src: url('/fonts/${safeName}') format('woff2');
  unicode-range: ${unicodeRange};
}
`;
    }
  }

  fs.writeFileSync(path.resolve('src/fonts.css'), localCss);
  console.log('Fonts downloaded and src/fonts.css written successfully!');
}

main().catch(console.error);
