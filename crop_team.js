import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function cropTeamImage() {
  const inputPath = path.join('C:', 'Users', 'choto', '.gemini', 'antigravity-ide', 'brain', 'e96faaa0-bc9d-4110-899d-a33c725c386b', 'media__1783265466383.jpg');
  const outputPath = path.join(__dirname, 'public', 'assets', 'images', 'team_rabbani.webp');

  if (!fs.existsSync(inputPath)) {
    console.error("Input image not found!");
    return;
  }
  
  await sharp(inputPath)
    .resize({
      width: 600,
      height: 600,
      fit: sharp.fit.cover,
      position: sharp.strategy.entropy // Focus on the face/most interesting part
    })
    .webp({ quality: 80 })
    .toFile(outputPath);
    
  console.log('Successfully cropped team image');
}

cropTeamImage().catch(console.error);
