import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function optimizeLogos() {
  const publicDir = path.join(__dirname, 'public');
  const files = [
    'fabneon_logo_dark.png',
    'fabneon_logo_light.png',
    'fabneon_logo_only.png'
  ];

  for (const file of files) {
    const inputPath = path.join(publicDir, file);
    if (!fs.existsSync(inputPath)) continue;
    
    const buffer = fs.readFileSync(inputPath);
    
    await sharp(buffer)
      .resize({ height: 200, withoutEnlargement: true }) // Max height 200px
      .png({ quality: 80, compressionLevel: 9 }) // Compress
      .toFile(inputPath);
      
    console.log(`Optimized ${file}`);
  }
}

optimizeLogos().catch(console.error);
