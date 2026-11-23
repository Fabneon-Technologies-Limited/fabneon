import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateOgImage() {
  const width = 1200;
  const height = 630;

  // Read logo if available
  const logoPath = path.join(__dirname, '..', 'public', 'fabneon_logo_only.png');
  let logoBase64 = '';
  if (fs.existsSync(logoPath)) {
    logoBase64 = `data:image/png;base64,${fs.readFileSync(logoPath).toString('base64')}`;
  }

  const svg = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Background gradient -->
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#08090C" />
        <stop offset="50%" stop-color="#0E1017" />
        <stop offset="100%" stop-color="#050608" />
      </linearGradient>

      <!-- Glow radial gradients -->
      <radialGradient id="tealGlow" cx="20%" cy="25%" r="65%">
        <stop offset="0%" stop-color="#00A3C4" stop-opacity="0.35" />
        <stop offset="60%" stop-color="#00A3C4" stop-opacity="0.05" />
        <stop offset="100%" stop-color="#00A3C4" stop-opacity="0" />
      </radialGradient>
      
      <radialGradient id="purpleGlow" cx="80%" cy="75%" r="65%">
        <stop offset="0%" stop-color="#7B2CBF" stop-opacity="0.32" />
        <stop offset="60%" stop-color="#4B1A7F" stop-opacity="0.08" />
        <stop offset="100%" stop-color="#4B1A7F" stop-opacity="0" />
      </radialGradient>

      <!-- Card gradient -->
      <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="rgba(255,255,255,0.06)" />
        <stop offset="100%" stop-color="rgba(255,255,255,0.01)" />
      </linearGradient>

      <!-- Text gradient -->
      <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#00C4EF" />
        <stop offset="50%" stop-color="#00A3C4" />
        <stop offset="100%" stop-color="#A855F7" />
      </linearGradient>
      
      <linearGradient id="badgeBorder" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#00A3C4" stop-opacity="0.6" />
        <stop offset="100%" stop-color="#7B2CBF" stop-opacity="0.6" />
      </linearGradient>
    </defs>

    <!-- Base Canvas -->
    <rect width="${width}" height="${height}" fill="url(#bgGrad)" />
    
    <!-- Neon Glow Accents -->
    <rect width="${width}" height="${height}" fill="url(#tealGlow)" />
    <rect width="${width}" height="${height}" fill="url(#purpleGlow)" />

    <!-- Subtle Tech Grid Lines -->
    <g stroke="rgba(255,255,255,0.03)" stroke-width="1">
      <line x1="0" y1="105" x2="${width}" y2="105" />
      <line x1="0" y1="210" x2="${width}" y2="210" />
      <line x1="0" y1="315" x2="${width}" y2="315" />
      <line x1="0" y1="420" x2="${width}" y2="420" />
      <line x1="0" y1="525" x2="${width}" y2="525" />
      
      <line x1="200" y1="0" x2="200" y2="${height}" />
      <line x1="400" y1="0" x2="400" y2="${height}" />
      <line x1="600" y1="0" x2="600" y2="${height}" />
      <line x1="800" y1="0" x2="800" y2="${height}" />
      <line x1="1000" y1="0" x2="1000" y2="${height}" />
    </g>

    <!-- Outer Decorative Border -->
    <rect x="30" y="30" width="1140" height="570" rx="24" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
    <rect x="35" y="35" width="1130" height="560" rx="20" fill="none" stroke="url(#badgeBorder)" stroke-width="1.5" stroke-opacity="0.4" />

    <!-- Top Badge -->
    <g transform="translate(80, 80)">
      <rect x="0" y="0" width="480" height="38" rx="19" fill="rgba(0, 163, 196, 0.12)" stroke="rgba(0, 163, 196, 0.4)" stroke-width="1" />
      <circle cx="20" cy="19" r="6" fill="#00C4EF" />
      <text x="36" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="13" font-weight="700" fill="#00C4EF" letter-spacing="1.5">FABNEON TECHNOLOGIES LIMITED • RAJSHAHI &amp; DHAKA</text>
    </g>

    <!-- Main Title Lines -->
    <text x="80" y="210" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="62" font-weight="900" fill="#FFFFFF" letter-spacing="-1.5">
      Premier Software Company
    </text>
    <text x="80" y="285" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="62" font-weight="900" fill="url(#textGrad)" letter-spacing="-1.5">
      in Rajshahi &amp; Bangladesh
    </text>

    <!-- Subtitle / Value Proposition -->
    <text x="80" y="350" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="22" font-weight="400" fill="#CBD5E1">
      Architecting Scalable Enterprise ERPs, Cloud SaaS OS &amp; Applied AI Solutions
    </text>
    <text x="80" y="382" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="18" font-weight="400" fill="#94A3B8">
      Trusted builders of RepairSoft, FabPharma &amp; Global Knowledge Institute (GKITI BTEB 23415)
    </text>

    <!-- Feature Pillars / Badges -->
    <g transform="translate(80, 440)">
      <!-- Pill 1 -->
      <g transform="translate(0, 0)">
        <rect width="230" height="52" rx="14" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" stroke-width="1" />
        <text x="20" y="32" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="15" font-weight="600" fill="#E2E8F0">⚡ Enterprise ERPs</text>
      </g>
      <!-- Pill 2 -->
      <g transform="translate(245, 0)">
        <rect width="210" height="52" rx="14" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" stroke-width="1" />
        <text x="20" y="32" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="15" font-weight="600" fill="#E2E8F0">☁ Cloud SaaS OS</text>
      </g>
      <!-- Pill 3 -->
      <g transform="translate(470, 0)">
        <rect width="240" height="52" rx="14" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" stroke-width="1" />
        <text x="20" y="32" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="15" font-weight="600" fill="#E2E8F0">🤖 Applied AI &amp; Radar</text>
      </g>
      <!-- Pill 4 -->
      <g transform="translate(725, 0)">
        <rect width="295" height="52" rx="14" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" stroke-width="1" />
        <text x="20" y="32" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="15" font-weight="600" fill="#E2E8F0">🛡 Govt. BTEB Accredited</text>
      </g>
    </g>

    <!-- Bottom Footer Bar -->
    <g transform="translate(80, 545)">
      <text x="0" y="0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="14" font-weight="600" fill="#00C4EF">
        https://fabneon.com
      </text>
      <text x="200" y="0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="14" font-weight="400" fill="#64748B">
        |
      </text>
      <text x="220" y="0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="14" font-weight="500" fill="#94A3B8">
        Corporate Inquiries: contact@fabneon.com
      </text>
      <text x="700" y="0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="14" font-weight="500" fill="#94A3B8">
        Rajshahi &amp; Dhaka, Bangladesh
      </text>
    </g>

    ${logoBase64 ? `
    <!-- Top Right Brand Logo -->
    <g transform="translate(1030, 70)">
      <image href="${logoBase64}" width="80" height="80" />
    </g>
    ` : ''}
  </svg>
  `;

  const publicDir = path.join(__dirname, '..', 'public');
  const pngOutput = path.join(publicDir, 'og-image.png');
  const webpOutput = path.join(publicDir, 'og-image.webp');

  const svgBuffer = Buffer.from(svg);

  // Output PNG (1200x630, optimized)
  await sharp(svgBuffer)
    .png({ quality: 90, compressionLevel: 9 })
    .toFile(pngOutput);
  console.log(`✓ Generated ${pngOutput} (1200x630)`);

  // Output WebP (1200x630, optimized)
  await sharp(svgBuffer)
    .webp({ quality: 85, effort: 6 })
    .toFile(webpOutput);
  console.log(`✓ Generated ${webpOutput} (1200x630)`);
}

generateOgImage().catch(console.error);
