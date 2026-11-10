const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const partners = [
  { name: 'bKash', url: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.bkash.com&size=64', file: 'brand_bkash.png' },
  { name: 'Pathao', url: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://pathao.com&size=64', file: 'brand_pathao.png' },
  { name: 'Grameenphone', url: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.grameenphone.com&size=64', file: 'brand_grameenphone.png' },
  { name: 'Daraz', url: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.daraz.com.bd&size=64', file: 'brand_daraz.png' },
  { name: 'Walton', url: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://waltonbd.com&size=64', file: 'brand_walton.png' },
  { name: 'Square Hospital', url: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://squarehospital.com&size=64', file: 'brand_square_hospital.png' },
  { name: 'United Hospital', url: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.uhlbd.com&size=64', file: 'brand_united_hospital.png' },
  { name: 'Evercare', url: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.evercarebd.com&size=64', file: 'brand_evercare.png' },
  { name: 'BRAC Bank', url: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.bracbank.com&size=64', file: 'brand_brac_bank.png' },
  { name: 'City Bank', url: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.thecitybank.com&size=64', file: 'brand_city_bank.png' },
  { name: 'Aarong', url: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.aarong.com&size=64', file: 'brand_aarong.png' },
  { name: 'Chaldal', url: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://chaldal.com&size=64', file: 'brand_chaldal.png' },
  { name: 'Foodpanda', url: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.foodpanda.com.bd&size=64', file: 'brand_foodpanda.png' },
  { name: 'LankaBangla', url: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://lankabangla.com&size=64', file: 'brand_lankabangla.png' },
  { name: 'Shohoz', url: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.shohoz.com&size=64', file: 'brand_shohoz.png' },
  { name: 'Biman', url: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.biman-airlines.com&size=64', file: 'brand_biman.png' },
  { name: 'Samsung', url: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.samsung.com&size=64', file: 'brand_samsung.png' },
  { name: 'ASUS', url: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.asus.com&size=64', file: 'brand_asus.png' },
  { name: 'Toyota', url: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.toyota.com&size=64', file: 'brand_toyota.png' },
  { name: 'Sony', url: 'https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://www.sony.com&size=64', file: 'brand_sony.png' }
];

const destDir = path.join(__dirname, '..', 'public', 'assets', 'logos');
if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

partners.forEach(p => {
  const target = path.join(destDir, p.file);
  try {
    execSync(`curl.exe -sL -A "Mozilla/5.0" -o "${target}" "${p.url}"`);
    const sz = fs.statSync(target).size;
    console.log(`Saved ${p.name}: ${sz} bytes`);
  } catch(e) {
    console.error(`Error on ${p.name}:`, e.message);
  }
});
console.log('Finished downloading all real brand logos!');
