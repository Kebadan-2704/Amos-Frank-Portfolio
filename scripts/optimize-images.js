import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const publicDir = path.resolve('public');

async function optimizeImages() {
  console.log('Optimizing images...');

  // 1. og-image.jpg (Target: < 300 KB, 1200x630)
  const ogInput = path.join(publicDir, 'og-image.jpg');
  if (fs.existsSync(ogInput)) {
    const ogBuffer = fs.readFileSync(ogInput);
    await sharp(ogBuffer)
      .resize(1200, 630, { fit: 'cover' })
      .jpeg({ quality: 82, progressive: true, mozjpeg: true })
      .toFile(path.join(publicDir, 'og-image.jpg'));
    const ogStats = fs.statSync(path.join(publicDir, 'og-image.jpg'));
    console.log(`og-image.jpg optimized: ${(ogStats.size / 1024).toFixed(1)} KB`);
  }

  // 2. PWA icons from pwa-icon.png
  const pwaInput = path.join(publicDir, 'pwa-icon.png');
  if (fs.existsSync(pwaInput)) {
    const pwaBuffer = fs.readFileSync(pwaInput);
    // 192x192
    await sharp(pwaBuffer)
      .resize(192, 192)
      .png({ quality: 85, compressionLevel: 9 })
      .toFile(path.join(publicDir, 'pwa-192x192.png'));
    // 512x512
    await sharp(pwaBuffer)
      .resize(512, 512)
      .png({ quality: 85, compressionLevel: 9 })
      .toFile(path.join(publicDir, 'pwa-512x512.png'));
    // Maskable 512x512 with safe-zone padding (410x410 inside 512x512 canvas)
    const inner = await sharp(pwaBuffer).resize(410, 410).toBuffer();
    await sharp({
      create: {
        width: 512,
        height: 512,
        channels: 4,
        background: { r: 10, g: 10, b: 10, alpha: 1 },
      },
    })
      .composite([{ input: inner, gravity: 'center' }])
      .png({ quality: 85, compressionLevel: 9 })
      .toFile(path.join(publicDir, 'pwa-maskable-512x512.png'));

    console.log('PWA icons generated (192, 512, maskable 512)');
  }

  // 3. amos-hero.jpg -> AVIF + WebP + optimized JPEG
  const heroInput = path.join(publicDir, 'amos-hero.jpg');
  if (fs.existsSync(heroInput)) {
    const heroBuffer = fs.readFileSync(heroInput);
    await sharp(heroBuffer)
      .resize(500, 500, { fit: 'cover' })
      .avif({ quality: 75 })
      .toFile(path.join(publicDir, 'amos-hero.avif'));
    await sharp(heroBuffer)
      .resize(500, 500, { fit: 'cover' })
      .webp({ quality: 80 })
      .toFile(path.join(publicDir, 'amos-hero.webp'));
    await sharp(heroBuffer)
      .resize(500, 500, { fit: 'cover' })
      .jpeg({ quality: 82, progressive: true, mozjpeg: true })
      .toFile(path.join(publicDir, 'amos-hero-opt.jpg'));
    console.log('Hero image optimized (AVIF, WebP, optimized JPEG)');
  }

  // 4. Secondary photos -> WebP
  const photos = ['amos-stage-bw.jpg', 'amos-keys.jpg', 'amos-bass.jpg'];
  for (const photo of photos) {
    const pPath = path.join(publicDir, photo);
    if (fs.existsSync(pPath)) {
      const buf = fs.readFileSync(pPath);
      const webpName = photo.replace('.jpg', '.webp');
      await sharp(buf)
        .resize(600, null, { withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(path.join(publicDir, webpName));
    }
  }
  console.log('Secondary photos converted to WebP');
}

optimizeImages().catch(console.error);
