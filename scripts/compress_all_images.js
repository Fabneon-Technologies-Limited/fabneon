import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function optimizeImages() {
  const imagesDir = path.join(__dirname, '..', 'public', 'assets', 'images');
  if (!fs.existsSync(imagesDir)) return;

  const files = fs.readdirSync(imagesDir);
  console.log(`Analyzing and optimizing images in ${imagesDir}...`);

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const filePath = path.join(imagesDir, file);
    const stat = fs.statSync(filePath);

    // Optimize large WebP files (> 80 KB)
    if (ext === '.webp' && stat.size > 80 * 1024) {
      const origKB = Math.round(stat.size / 1024);
      try {
        const fileBuffer = fs.readFileSync(filePath);
        const metadata = await sharp(fileBuffer).metadata();
        const maxW = metadata.width && metadata.width > 900 ? 900 : metadata.width;

        const optimizedBuffer = await sharp(fileBuffer)
          .resize({ width: maxW, withoutEnlargement: true })
          .webp({ quality: 80, effort: 5 })
          .toBuffer();

        const newKB = Math.round(optimizedBuffer.length / 1024);

        if (optimizedBuffer.length < stat.size) {
          fs.writeFileSync(filePath, optimizedBuffer);
          console.log(`✓ Compressed WebP: ${file} (${origKB} KB -> ${newKB} KB, saved ${Math.round((1 - newKB/origKB)*100)}%)`);
        }
      } catch (err) {
        console.error(`Error processing ${file}:`, err.message);
      }
    }
  }
}

optimizeImages().catch(console.error);
