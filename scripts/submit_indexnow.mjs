// scripts/submit_indexnow.mjs
// Automates instant pinging of Bing, Microsoft Copilot, ChatGPT, and Yandex via IndexNow

const INDEXNOW_KEY = 'f5e831b46bc0a1a21f449847b90842bb';
const HOST = 'fabneon.com';
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;

const URLS = [
  `https://${HOST}/`,
  `https://${HOST}/case-studies`,
  `https://${HOST}/case-study/repairsoft`,
  `https://${HOST}/case-study/fabpharma`,
  `https://${HOST}/case-study/gkiti`,
  `https://${HOST}/case-study/campus-erp`,
  `https://${HOST}/case-study/hifz-erp`,
  `https://${HOST}/case-study/itrust`,
  `https://${HOST}/blog/offline-first-architecture-flutter-sqlite`,
  `https://${HOST}/blog/multi-tenant-database-isolation-saas`,
  `https://${HOST}/blog/forensic-drm-video-protection-canvas`,
  `https://${HOST}/blog/sub-second-ecommerce-architecture-nuxt3`,
  `https://${HOST}/terms`,
  `https://${HOST}/privacy`
];

async function submitIndexNow() {
  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: URLS
  };

  const endpoints = [
    'https://api.indexnow.org/indexnow',
    'https://www.bing.com/indexnow'
  ];

  for (const endpoint of endpoints) {
    try {
      console.log(`Pinging IndexNow endpoint: ${endpoint}...`);
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(payload)
      });

      console.log(`Response status from ${endpoint}: ${response.status} ${response.statusText}`);
      if (response.status === 200 || response.status === 202) {
        console.log(`✓ Successfully notified ${endpoint} for ${URLS.length} URLs!`);
      } else {
        const text = await response.text();
        console.log(`Response body: ${text}`);
      }
    } catch (err) {
      console.error(`Error pinging ${endpoint}:`, err);
    }
  }
}

submitIndexNow();
