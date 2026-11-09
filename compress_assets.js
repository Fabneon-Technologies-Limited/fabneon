import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function compressAll() {
  const imgDir = path.join(__dirname, 'public', 'assets', 'images');
  if (!fs.existsSync(imgDir)) return;

  const files = fs.readdirSync(imgDir);
  console.log(`Processing ${files.length} files in ${imgDir}...`);

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!['.png', '.jpg', '.jpeg'].includes(ext)) continue;

    const baseName = path.basename(file, ext);
    const inputPath = path.join(imgDir, file);
    const webpPath = path.join(imgDir, `${baseName}.webp`);

    const stat = fs.statSync(inputPath);
    const origSizeKB = Math.round(stat.size / 1024);

    try {
      // Create high quality WebP
      await sharp(inputPath)
        .resize({ width: 1200, withoutEnlargement: true })
        .webp({ quality: 82, effort: 4 })
        .toFile(webpPath);

      const newStat = fs.statSync(webpPath);
      const newSizeKB = Math.round(newStat.size / 1024);
      console.log(`✓ ${file} (${origSizeKB} KB) -> ${baseName}.webp (${newSizeKB} KB, saved ${Math.round((1 - newSizeKB/origSizeKB) * 100)}%)`);
    } catch (err) {
      console.error(`Failed ${file}:`, err.message);
    }
  }
}

compressAll().catch(console.error);
