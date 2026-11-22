import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outDir = path.join(__dirname, 'public', 'assets', 'logos');

const logos = {
  'bkash.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 50" fill="none">
    <rect width="160" height="50" rx="8" fill="rgba(226,19,110,0.08)" stroke="rgba(226,19,110,0.25)" stroke-width="1"/>
    <path d="M25 15L35 25L25 35L30 25Z" fill="#E2136E"/>
    <text x="50" y="31" fill="#E2136E" font-family="system-ui, sans-serif" font-weight="800" font-size="20" letter-spacing="0.5">bKash</text>
  </svg>`,
  'nagad.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 50" fill="none">
    <rect width="160" height="50" rx="8" fill="rgba(247,148,29,0.08)" stroke="rgba(247,148,29,0.25)" stroke-width="1"/>
    <circle cx="28" cy="25" r="10" fill="#F7941D"/>
    <text x="48" y="31" fill="#F7941D" font-family="system-ui, sans-serif" font-weight="800" font-size="20" letter-spacing="0.5">Nagad</text>
  </svg>`,
  'pathao.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 50" fill="none">
    <rect width="160" height="50" rx="8" fill="rgba(238,43,59,0.08)" stroke="rgba(238,43,59,0.25)" stroke-width="1"/>
    <path d="M22 28C22 21 28 17 34 21L26 31C24 30 22 29 22 28Z" fill="#EE2B3B"/>
    <text x="48" y="31" fill="#EE2B3B" font-family="system-ui, sans-serif" font-weight="800" font-size="20">Pathao</text>
  </svg>`,
  'grameenphone.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 190 50" fill="none">
    <rect width="190" height="50" rx="8" fill="rgba(0,169,224,0.08)" stroke="rgba(0,169,224,0.25)" stroke-width="1"/>
    <circle cx="28" cy="25" r="10" fill="#00A9E0"/>
    <text x="46" y="31" fill="#00A9E0" font-family="system-ui, sans-serif" font-weight="700" font-size="16">Grameenphone</text>
  </svg>`,
  'daraz.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 50" fill="none">
    <rect width="160" height="50" rx="8" fill="rgba(245,114,36,0.08)" stroke="rgba(245,114,36,0.25)" stroke-width="1"/>
    <path d="M22 17H32L26 33H16L22 17Z" fill="#F57224"/>
    <text x="44" y="31" fill="#F57224" font-family="system-ui, sans-serif" font-weight="800" font-size="20">Daraz</text>
  </svg>`,
  'walton.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 50" fill="none">
    <rect width="160" height="50" rx="8" fill="rgba(0,114,206,0.08)" stroke="rgba(0,114,206,0.25)" stroke-width="1"/>
    <path d="M18 19L24 31L28 23L32 31L38 19" stroke="#0072CE" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="46" y="31" fill="#0072CE" font-family="system-ui, sans-serif" font-weight="800" font-size="18">WALTON</text>
  </svg>`,
  'square.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 50" fill="none">
    <rect width="180" height="50" rx="8" fill="rgba(16,185,129,0.08)" stroke="rgba(16,185,129,0.25)" stroke-width="1"/>
    <rect x="18" y="15" width="18" height="18" rx="4" fill="#10B981"/>
    <text x="46" y="31" fill="#10B981" font-family="system-ui, sans-serif" font-weight="800" font-size="16">Square Health</text>
  </svg>`,
  'bracbank.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170 50" fill="none">
    <rect width="170" height="50" rx="8" fill="rgba(0,104,56,0.08)" stroke="rgba(0,104,56,0.25)" stroke-width="1"/>
    <circle cx="28" cy="25" r="9" fill="#006838"/>
    <text x="46" y="31" fill="#006838" font-family="system-ui, sans-serif" font-weight="800" font-size="17">BRAC Bank</text>
  </svg>`,
  'citybank.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 50" fill="none">
    <rect width="160" height="50" rx="8" fill="rgba(237,28,36,0.08)" stroke="rgba(237,28,36,0.25)" stroke-width="1"/>
    <polygon points="28,15 38,33 18,33" fill="#ED1C24"/>
    <text x="46" y="31" fill="#ED1C24" font-family="system-ui, sans-serif" font-weight="800" font-size="17">City Bank</text>
  </svg>`,
  'aarong.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 50" fill="none">
    <rect width="160" height="50" rx="8" fill="rgba(217,119,6,0.08)" stroke="rgba(217,119,6,0.25)" stroke-width="1"/>
    <circle cx="28" cy="25" r="9" fill="#D97706"/>
    <text x="48" y="31" fill="#D97706" font-family="system-ui, sans-serif" font-weight="800" font-size="18">Aarong</text>
  </svg>`,
  'chaldal.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 50" fill="none">
    <rect width="160" height="50" rx="8" fill="rgba(251,191,36,0.08)" stroke="rgba(251,191,36,0.25)" stroke-width="1"/>
    <path d="M22 30C22 22 34 22 34 30Z" fill="#F59E0B"/>
    <text x="46" y="31" fill="#F59E0B" font-family="system-ui, sans-serif" font-weight="800" font-size="18">Chaldal</text>
  </svg>`,
  'samsung.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170 50" fill="none">
    <rect width="170" height="50" rx="8" fill="rgba(3,78,162,0.08)" stroke="rgba(3,78,162,0.25)" stroke-width="1"/>
    <ellipse cx="28" cy="25" rx="14" ry="9" stroke="#034EA2" stroke-width="2"/>
    <text x="50" y="31" fill="#034EA2" font-family="system-ui, sans-serif" font-weight="800" font-size="18" letter-spacing="1">SAMSUNG</text>
  </svg>`,
  'sony.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 50" fill="none">
    <rect width="160" height="50" rx="8" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
    <text x="40" y="32" fill="#FFFFFF" font-family="system-ui, sans-serif" font-weight="900" font-size="22" letter-spacing="3">SONY</text>
  </svg>`,
  'asus.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 50" fill="none">
    <rect width="160" height="50" rx="8" fill="rgba(56,189,248,0.08)" stroke="rgba(56,189,248,0.25)" stroke-width="1"/>
    <text x="45" y="32" fill="#38BDF8" font-family="system-ui, sans-serif" font-weight="900" font-size="20" letter-spacing="2">ASUS</text>
  </svg>`
};

for (const [name, content] of Object.entries(logos)) {
  fs.writeFileSync(path.join(outDir, name), content.trim());
}
console.log(`Generated ${Object.keys(logos).length} crisp local partner SVG logos in ${outDir}`);

