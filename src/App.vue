<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
import PremiumNav from './components/PremiumNav.vue';
import StatCounter from './components/StatCounter.vue';
import CardSwap from './components/CardSwap.vue';
import HeroCarousel from './components/HeroCarousel.vue';
import TermsAndConditions from './components/TermsAndConditions.vue';
import PrivacyPolicy from './components/PrivacyPolicy.vue';
import CaseStudyDetail, { type CaseStudyData } from './components/CaseStudyDetail.vue';
import BlogSection from './components/BlogSection.vue';
import BlogPostDetail from './components/BlogPostDetail.vue';
import { blogPosts, type BlogPost } from './data/blogPosts';
import BorderGlow from './components/BorderGlow.vue';
import LogoMarquee from './components/LogoMarquee.vue';
import ProjectCarousel from './components/ProjectCarousel.vue';
import LoadingScreen from './components/LoadingScreen.vue';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const savedTheme = localStorage.getItem('fabneon-theme') as 'light' | 'dark' | null;
const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const defaultTheme = systemPrefersDark ? 'dark' : 'light';
const theme = ref<'light' | 'dark'>(savedTheme || defaultTheme);

const applyTheme = (newTheme: 'light' | 'dark') => {
  theme.value = newTheme;
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('fabneon-theme', newTheme);
};

// Initialize theme immediately on script setup execution to avoid flicker
document.documentElement.setAttribute('data-theme', theme.value);

const toggleTheme = () => {
  applyTheme(theme.value === 'dark' ? 'light' : 'dark');
};

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Case Studies', href: '#case-studies' },
  { label: 'Blog', href: '#blog' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' }
];

const currentPage = ref<'home' | 'terms' | 'privacy' | 'case-study' | 'blog-post'>('home');

// Flagship Case Studies Data Model
const caseStudies: CaseStudyData[] = [
  {
    id: 'gkiti',
    title: 'Global Knowledge Institute (GKITI)',
    subtitle: 'Digital Campus OS, Anti-Piracy DRM Player & Verification Engine',
    client: 'Global Knowledge International Training Institute (BTEB Code: 23415)',
    badge: 'EdTech & Anti-Piracy DRM',
    badgeColor: 'teal',
    founder: 'Founder: Md Hafijur Rahman Milon (24+ Yrs Exp)',
    year: '2024 – 2026',
    image: '/assets/images/proj_gkiti.webp',
    liveUrl: 'https://gkinstitutebd.com',
    summary: 'Global Knowledge is Bangladesh\'s premier, government-accredited mobile hardware and chip-level diagnostic academy under the Bangladesh Technical Education Board (BTEB Code: 23415). Fabneon engineered GKITI\'s end-to-end digital campus ecosystem — integrating dynamic hardware-bound DRM video streaming, instant tamper-proof QR certification, and multi-campus batch admissions.',
    shortDesc: 'Engineered Bangladesh\'s 1st BTEB-certified mobile repair institute platform with proprietary canvas-based DRM video protection, instant QR certificate validation, and zero-paper admissions.',
    highlights: ['5,000+ Active Technicians', 'Zero Video DRM Leaks', 'BTEB Code 23415'],
    keyStats: [
      { value: '0', label: 'Video Piracy Leaks', desc: 'Hardware-bound DRM canvas playback' },
      { value: '5,000+', label: 'Certified Technicians', desc: 'Graduated across 64 districts' },
      { value: '100%', label: 'QR Tamper Verification', desc: 'Instant cryptographic validation' },
      { value: '10x', label: 'Admissions Velocity', desc: 'Zero manual paperwork' }
    ],
    problem: {
      title: 'Course Piracy, Paper Backlogs & Certificate Forgery',
      description: 'As Bangladesh\'s oldest and premier institute for CPU reballing and iPhone logic board diagnostics, GKITI was targeted by digital pirates who screen-recorded proprietary masterclasses to resell on Telegram. At the same time, manual admissions from 64 districts overwhelmed administrators, and paper certificates were being fraudulently forged.',
      points: [
        'Proprietary motherboard repair video masterclasses being pirated and leaked to unauthorized channels.',
        'Overwhelming physical paper backlogs for student seat booking and hostel bed allocations across 64 districts.',
        'Physical paper certificates vulnerable to counterfeit duplication by unauthorized repair shops.'
      ]
    },
    solution: {
      title: 'Dynamic DRM Video Security, Cryptographic QR & Real-Time Admissions',
      description: 'Fabneon architected a unified Digital Campus OS featuring custom video DRM with canvas dynamic student-identity watermarking, automated instant QR certificate validation, and digital seat booking with hostel capacity management.',
      points: [
        'Custom DRM video player with live student watermark, blur on focus lost, and screen recording countermeasures.',
        'Automated cryptographic QR certificate generation verified against BTEB Code 23415 national registry.',
        'Digital seat booking with integrated bKash/Nagad checkout and hostel capacity management.'
      ]
    },
    architecture: {
      overview: 'A resilient decoupled cloud architecture combining high-concurrency Supabase PostgreSQL, edge CDN video streaming, Pinia state stores, and fine-grained Role-Based Access Control.',
      stack: ['Vue 3', 'TypeScript', 'PostgreSQL / Supabase', 'Cloudflare Edge CDN', 'Tailwind CSS', 'bKash / Nagad APIs'],
      features: [
        { title: 'Dynamic DRM Watermarking', desc: 'Stamps student phone number, IP and unique token across randomized canvas coordinates.' },
        { title: 'Instant QR Certificate Engine', desc: 'Generates tamper-proof vector certificates verifiable in 0.2 seconds globally.' },
        { title: 'Batch & Seat Management', desc: 'Automates student onboarding, seat reservation queues, and hostel bed allocations.' }
      ]
    },
    testimonial: {
      quote: 'Fabneon built an enterprise-grade digital campus that completely stopped video theft of our advanced mobile repair schematics and gave our BTEB-certified academy national operational excellence.',
      author: 'Md Hafijur Rahman Milon',
      role: 'Founder & Chief Master Trainer, Global Knowledge (GKITI)'
    }
  },
  {
    id: 'repairsoft',
    title: 'RepairSoft (GKTool)',
    subtitle: 'Electronics Service Bench & Workshop Operating System',
    client: 'Mobile Engineering Ecosystem & Workshop Franchises',
    badge: 'Enterprise Workshop SaaS',
    badgeColor: 'purple',
    founder: 'Component-Level IC Traceability',
    year: '2024 – 2026',
    image: '/assets/images/proj_gktool.webp',
    liveUrl: 'https://gktool.fabneon.com',
    summary: 'Engineered for multi-branch repair centres and electronics service centers. Automates the full job sheet cycle from multimeter diagnostic estimation to BGA micro-soldering, component-level IC inventory deduction, and customer WhatsApp handover.',
    shortDesc: 'Cloud operating system for smartphone repair labs — tracking 15,000+ microscopic IC parts, multi-stage repair job sheets, technician commission splits, and automated WhatsApp billing.',
    highlights: ['15,000+ IC Part Numbers', 'Real-Time WhatsApp Billing', 'Multi-Stage Repair Tickets'],
    keyStats: [
      { value: '15k+', label: 'Indexed Components', desc: 'Microscopic ICs, PMICs & BGA stencils' },
      { value: '65%', label: 'Turnaround Reduction', desc: 'From diagnosis to customer handover' },
      { value: '100%', label: 'Audit Accountability', desc: 'Every screw, resistor and IC tracked' },
      { value: '99.98%', label: 'Cloud SaaS Uptime', desc: 'Continuous multi-tenant workbench access' }
    ],
    problem: {
      title: 'Microscopic Parts Misplacement, Unstructured Tickets & Revenue Leakage',
      description: 'Smartphone motherboard repair involves hundreds of tiny BGA chips, PMICs, coils, and capacitors worth substantial capital. Technicians relied on paper slips and disorganized plastic drawers, leading to inventory shrinkage, lost customer phones, and unrecorded diagnostic fees.',
      points: [
        'No traceability for expensive micro-components (PMICs, NAND, baseband ICs).',
        'Lost repair tickets, forgotten customer handovers, and technician commission disputes.',
        'Manual billing causing friction and delayed customer notification.'
      ]
    },
    solution: {
      title: 'Barcode IC Inventory, Multi-Stage Job Boards & WhatsApp Automation',
      description: 'Fabneon built a high-speed cloud SaaS platform tailored specifically to service bench workflows, featuring component-level barcode tracking, real-time ticket progression, and WhatsApp webhook billing notifications.',
      points: [
        'Component-level cataloging for 15,000+ smartphone parts with drawer/bin coordinate indexing.',
        'Kanban repair ticket workflow (Received → Diagnosis → Under Microscope → Testing → Ready).',
        'Automated WhatsApp invoice generation and repair status alerts sent directly to clients.'
      ]
    },
    architecture: {
      overview: 'A responsive, offline-tolerant multi-tenant cloud application built with Vue 3, Supabase Realtime, and thermal receipt printer ESC/POS support.',
      stack: ['Vue 3', 'TypeScript', 'Supabase Realtime', 'WhatsApp Business API', 'Tailwind CSS'],
      features: [
        { title: 'Bin & Coordinate Indexing', desc: 'Technicians find microscopic ICs in seconds by searching schematics or part codes.' },
        { title: 'Technician Commission Engine', desc: 'Automatically splits labor profit and parts cost per ticket.' },
        { title: 'Thermal & WhatsApp POS', desc: 'Instant 58mm/80mm thermal receipts plus digital WhatsApp notifications.' }
      ]
    }
  },
  {
    id: 'fabpharma',
    title: 'FabPharma ERP',
    subtitle: 'High-Throughput Healthcare Retail & Pharmacy Operating System',
    client: 'Healthcare Retailers & Clinic Pharmacies',
    badge: 'Healthcare & Pharmacy POS',
    badgeColor: 'gold',
    founder: 'High-Throughput Clinical Retail',
    year: '2024 – 2026',
    image: '/assets/images/proj_healthcare.webp',
    summary: 'Mission-critical healthcare retail ERP featuring proactive 90/60/30-day batch expiry tracking, sub-second POS barcode checkout, and instant generic medicine substitution to ensure zero patient safety violations and zero expired stock losses.',
    shortDesc: 'Mission-critical healthcare retail ERP featuring proactive 90/60/30-day batch expiry radar, sub-second POS checkout, and instant generic medicine alternative matching.',
    highlights: ['Sub-Second POS Speed', 'Zero Expiry Stock Loss', 'Smart Generic Substitution'],
    keyStats: [
      { value: '<1s', label: 'POS Checkout Time', desc: 'Ultra-fast barcode scanning' },
      { value: '0%', label: 'Expired Stock Dispensed', desc: 'Strict batch-level quarantine gates' },
      { value: '40k+', label: 'Brand & Generic DB', desc: 'Pre-indexed pharmaceutical formulations' },
      { value: '100%', label: 'Regulatory Compliance', desc: 'Audit trails for restricted pharmaceuticals' }
    ],
    problem: {
      title: 'Dangerous Medicine Expiration, Slow Queues & Generic Stockouts',
      description: 'Pharmacies face catastrophic financial loss when medicines expire undetected on shelves, and dispensing expired medicine poses severe patient health hazards. Slow, laggy desktop software caused long lines and stockouts of specific brand names.',
      points: [
        'Medicines expiring unnoticed on shelves causing huge financial write-offs.',
        'Risk of dispensing expired or quarantined drugs to patients.',
        'Lost sales when customers ask for a specific brand that is out of stock.'
      ]
    },
    solution: {
      title: 'Proactive Expiry Radar, Sub-Second POS & Intelligent Generic Matching',
      description: 'Fabneon developed a modern web-based Pharmacy ERP with predictive 90/60/30-day color-coded expiry alerts, instant sub-second barcode point-of-sale, and an AI-assisted generic medicine alternative engine.',
      points: [
        'Automated 90/60/30-day batch expiry radar that flags approaching expirations for supplier return.',
        'Sub-second keyboard-first POS checkout that processes transactions in under 1 second.',
        'Instant generic substitution showing identical active chemical formulations in stock.'
      ]
    },
    architecture: {
      overview: 'High-availability architecture optimized for continuous 24/7 retail operation with local caching and instant query indexing.',
      stack: ['Vue 3', 'PostgreSQL', 'High-Performance IndexedDB', 'Thermal ESC/POS', 'Docker'],
      features: [
        { title: 'Batch & FIFO Expiry Tracking', desc: 'Forces first-expiry-first-out dispensing to protect patient safety and revenue.' },
        { title: 'Instant Alternative Finder', desc: 'When Panadol is out of stock, instantly reveals in-stock Napa or Ace alternatives.' },
        { title: 'Multi-Store Inventory Sync', desc: 'Transfers medicine between clinic branches in real-time.' }
      ]
    }
  },
  {
    id: 'centraio',
    title: 'Centraio Cloud OS',
    subtitle: 'Multi-Tenant Higher-Ed Campus ERP & Institutional Operating System',
    client: 'Universities, Polytechnic Colleges & Academic Institutions',
    badge: 'EdTech ERP & Multi-Tenant SaaS',
    badgeColor: 'purple',
    founder: 'Higher-Education Enterprise SaaS',
    year: '2025 – 2026',
    image: '/assets/images/proj_school.webp',
    liveUrl: '#contact',
    summary: 'Centraio is a high-availability, multi-tenant academic ERP architected for universities, polytechnic institutes, and large colleges. Engineered with sub-organization domain isolation, automated student billing and fee reconciliation, biometric/RFID attendance pipelines, and real-time CGPA exam result tabulation.',
    shortDesc: 'Engineered a high-availability multi-tenant institutional operating system with dynamic subdomain routing, automated fee reconciliation, biometric attendance, and algorithmic CGPA tabulation.',
    highlights: ['Multi-Tenant Subdomains', 'Automated Tuition Billing', 'Biometric & RFID Sync'],
    keyStats: [
      { value: '100+', label: 'Institutions Ready', desc: 'Secure multi-tenant isolation' },
      { value: '10x', label: 'Faster Tabulation', desc: 'Automated semester GPA computation' },
      { value: '99.9%', label: 'Data Security', desc: 'Strict database tenant isolation' },
      { value: '<100ms', label: 'API Response', desc: 'Optimized Django REST & Redis caching' }
    ],
    problem: {
      title: 'Fragmented Academic Silos, Spreadsheet Chaos & Manual Tuition Tracking',
      description: 'Universities and colleges struggled with disjointed systems—student admissions were handled on paper, tuition fees were logged in error-prone spreadsheets, and semester exam mark tabulation required weeks of manual calculations.',
      points: [
        'Disjointed student records scattered across desktop spreadsheets, leading to lost academic histories and duplicate enrollments.',
        'Delayed fee collection with zero automated reconciliation between bank payments, student fee ledgers, and scholarships.',
        'Slow, error-prone manual semester exam mark calculation causing delays in transcript issuance and graduation approvals.'
      ]
    },
    solution: {
      title: 'Unified Multi-Tenant Academic OS, Real-Time Fee Engine & Algorithmic Result Tabulation',
      description: 'Fabneon engineered Centraio—a unified multi-tenant campus ERP with sub-organization domain isolation, automated student invoice scheduling with digital payment gateways, biometric attendance ingestion, and automated CGPA calculation.',
      points: [
        'Multi-tenant cloud architecture providing custom branded subdomains and secure institutional data boundaries.',
        'End-to-end student fee automation with real-time digital payment reconciliation and automated fine calculations.',
        'Algorithmic grading engine supporting BTEB, UGC, and custom institutional grading scales with instant transcript generation.'
      ]
    },
    architecture: {
      overview: 'Resilient multi-tenant architecture utilizing Django REST Framework, Vue 3, PostgreSQL with tenant schema segregation, Redis query caching, and Docker containerization.',
      stack: ['Vue 3', 'Django REST Framework', 'PostgreSQL', 'Redis', 'Docker', 'Tailwind CSS'],
      features: [
        { title: 'Dynamic Subdomain Routing', desc: 'Each campus operates on its own secure branded subdomain with isolated role permissions.' },
        { title: 'Automated Tuition Ledgers', desc: 'Generates recurring monthly and semester invoices with automatic late-fee rules and instant digital receipts.' },
        { title: 'Biometric Attendance Pipeline', desc: 'Ingests hardware biometric and RFID punch data directly into student academic profiles.' }
      ]
    },
    testimonial: {
      quote: 'Centraio reduced our end-of-semester exam tabulation from three weeks to less than fifteen minutes. The multi-tenant architecture and automated fee collection have completely transformed our administrative operations.',
      author: 'Academic Registrar',
      role: 'Partner Polytechnic Institute'
    }
  },
  {
    id: 'madrasah',
    title: 'Madrasah Management System (MMS)',
    subtitle: 'Residential Islamic Academy OS & Hifz Memorization Progress Radar',
    client: 'Madrasahs, Hifz Academies & Residential Islamic Institutions',
    badge: 'Specialized Institutional ERP',
    badgeColor: 'teal',
    founder: 'Islamic Academic & Residential ERP',
    year: '2025 – 2026',
    image: '/assets/images/proj_training.webp',
    liveUrl: '#contact',
    summary: 'A purpose-built residential academy ERP featuring granular Quran Hifz progress tracking (Sabaq, Sabqi, Manzil), residential mess/hostel boarding, and multi-tier fee ledgers with native bilingual (English & Bengali) interfaces.',
    shortDesc: 'Specialized residential academy ERP featuring granular Quran Hifz progress radar (Sabaq, Sabqi, Manzil), residential mess/hostel boarding, and automated parent SMS ledgers.',
    highlights: ['Quran Hifz Daily Radar', 'Residential Mess & Boarding', 'Bilingual EN/BN Interface'],
    keyStats: [
      { value: '30 Para', label: 'Granular Hifz Radar', desc: 'Sabaq, Sabqi & Manzil tracking' },
      { value: '0', label: 'Untracked Boarding Meals', desc: 'Dining hall meal quota control' },
      { value: '100%', label: 'Parent SMS Visibility', desc: 'Instant progress and fee alerts' },
      { value: 'Bilingual', label: 'English & Bengali', desc: 'Native localized institutional UI' }
    ],
    problem: {
      title: 'Complex Residential Logistics, Manual Quran Memorization Logs & Untracked Boarding',
      description: 'Traditional madrasahs and Hifz academies face unique operational demands that generic school software cannot handle: tracking daily Quran memorization (Sabaq, Sabqi, Manzil), residential dining hall meal allocations, and cash-heavy student fees.',
      points: [
        'Teachers manually logged daily Quran memorization progress in paper diaries with zero visibility for distant parents.',
        'Residential hostel and dining hall meal tracking had zero inventory control, leading to high dining hall food wastage.',
        'Disconnected donation, waqf, and tuition fee bookkeeping with difficult monthly accounting reconciliation.'
      ]
    },
    solution: {
      title: 'Dedicated Hifz Radar, Residential Boarding Logistics & Automated SMS Updates',
      description: 'Fabneon developed a dedicated Madrasah OS featuring a 30-Para Quran memorization tracker, residential hostel bed and meal allocation manager, automated monthly fee ledgers with thermal ESC/POS receipting, and instant parent SMS notifications.',
      points: [
        'Interactive Hifz progress matrix tracking daily Sabaq (new lesson), Sabqi (recent revision), and Manzil (long-term retention).',
        'Residential meal and hostel boarding management preventing food wastage and tracking boarding occupancy.',
        'Automated fee receipts, waqf donation ledgers, and SMS notifications sent directly to guardian mobile phones.'
      ]
    },
    architecture: {
      overview: 'Modern cloud-native stack powered by Nuxt 3, Supabase PostgreSQL with strict Row-Level Security (RLS), Pinia state stores, and Deno edge workers for scheduled automated fee and SMS runs.',
      stack: ['Nuxt 3', 'Supabase PostgreSQL', 'Row-Level Security (RLS)', 'Tailwind CSS', 'Deno Edge Workers', 'Pinia'],
      features: [
        { title: '30-Para Hifz Memorization Engine', desc: 'Logs page-by-page and ayah-by-ayah memorization accuracy with visual completion heatmaps.' },
        { title: 'Hostel & Mess Boarding Control', desc: 'Monitors student bed assignments, visitor check-ins, and daily dining hall meal quotas.' },
        { title: 'Thermal Receipt & SMS Gateway', desc: 'Prints 80mm thermal receipts on fee payment and automatically dispatches SMS alerts to parents.' }
      ]
    },
    testimonial: {
      quote: 'The Hifz tracking feature alone is priceless. Parents can monitor their children\'s Quran memorization progress daily, and our residential mess food waste has decreased by over 30%.',
      author: 'Principal Maulana',
      role: 'Residential Hifz & Kitab Academy'
    }
  },
  {
    id: 'itrust',
    title: 'iTrust E-Commerce Platform',
    subtitle: 'High-Conversion Consumer Retail with 64-District Thana Shipping & Meta CAPI',
    client: 'iTrust Online Store — Consumer Retail',
    badge: 'E-Commerce & High-Conversion Retail',
    badgeColor: 'gold',
    founder: 'Consumer Retail & Direct-to-Consumer',
    year: '2025 – 2026',
    image: '/assets/images/proj_ecommerce.webp',
    liveUrl: 'https://itrust.com.bd',
    summary: 'iTrust is a fast-growing consumer retail e-commerce platform in Bangladesh. Fabneon engineered the high-speed Nuxt 3 storefront featuring sub-second mobile checkout, a nationwide 64-district and 500+ thana courier delivery matrix, dual-layer Meta Conversions API (CAPI) attribution, and automated payment gateway routing.',
    shortDesc: 'Full-stack high-speed retail e-commerce platform with automated 64-district thana shipping matrix, server-side Meta Conversions API (CAPI), and instant 2-click checkout.',
    highlights: ['Sub-Second Mobile Checkout', '64-District & Thana Logistics', 'Live Meta CAPI Tracking'],
    keyStats: [
      { value: '<0.8s', label: 'Core Page Load', desc: 'Edge-cached Nuxt 3 SSR performance' },
      { value: '64 Districts', label: 'Nationwide Logistics', desc: 'Automated 500+ thana courier rates' },
      { value: '100%', label: 'Meta CAPI Tracking', desc: 'Zero attribution loss on iOS & adblockers' },
      { value: '+42%', label: 'Checkout Conversion', desc: 'Frictionless 2-click mobile purchasing' }
    ],
    problem: {
      title: 'Checkout Crashes, Broken Ad Attribution & Mobile Drop-Offs',
      description: 'Following a legacy rebuild, iTrust experienced high cart abandonment, checkout crashes during flash sales, and ad attribution failure where Meta Ads Manager received zero purchase signals.',
      points: [
        'Checkout input fields broke on mobile screens and crashed during high-traffic flash sale ad campaigns.',
        'Zero Meta Pixel or server-side Conversions API (CAPI) events were sent, causing Facebook ad campaigns to misfire with collapsed ROAS.',
        'Manual and inaccurate courier fee calculation across 64 districts and 500+ thanas created customer disputes and shipping losses.'
      ]
    },
    solution: {
      title: 'Sub-Second Mobile Checkout, Automated Thana Shipping Matrix & Bulletproof Meta CAPI',
      description: 'Fabneon rebuilt the e-commerce architecture on Nuxt 3 with server-side Nitro endpoints, dual client+server Meta CAPI tracking for 100% ad signal capture, dynamic thana shipping rate computation, and frictionless mobile checkout.',
      points: [
        'Streamlined 2-click keyboard-first checkout optimized for mobile shoppers with automated thana postal lookup.',
        'Dual-layer Meta Pixel and server-side Conversions API (CAPI) feeding real-time purchase value data to Meta Ad algorithms.',
        'High-performance PostgreSQL and Nitro engine delivering sub-second page loads even under concurrent marketing surges.'
      ]
    },
    architecture: {
      overview: 'High-throughput e-commerce stack utilizing Nuxt 3 Server-Side Rendering (SSR), Nitro server engine, PostgreSQL, Tailwind CSS, and direct courier/payment API integrations.',
      stack: ['Nuxt 3 (SSR)', 'Vue 3', 'Nitro Server Engine', 'PostgreSQL', 'Meta Conversions API (CAPI)', 'bKash Gateway'],
      features: [
        { title: 'Server-Side Meta CAPI', desc: 'Bypasses browser ad-blockers and iOS privacy restrictions to guarantee 100% accurate purchase attribution.' },
        { title: '64-District Courier Matrix', desc: 'Dynamically computes Steadfast and Pathao shipping fees based on precise customer thana and weight.' },
        { title: 'Sub-Second Edge Caching', desc: 'Caches product catalogs at edge nodes for instant navigation without database bottlenecks.' }
      ]
    },
    testimonial: {
      quote: 'Fabneon transformed our entire e-commerce infrastructure. The checkout is buttery smooth on mobile, and the server-side Meta CAPI integration completely restored our advertising profitability on Facebook and Instagram.',
      author: 'Operations Director',
      role: 'iTrust Online Store'
    }
  }
];

const selectedCaseStudyId = ref('gkiti');
const currentCaseStudy = computed(() => 
  caseStudies.find(c => c.id === selectedCaseStudyId.value) || caseStudies[0]
);

const openCaseStudy = (id: string) => {
  selectedCaseStudyId.value = id;
  currentPage.value = 'case-study';
  window.location.hash = 'case-study-' + id;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const closeCaseStudy = () => {
  currentPage.value = 'home';
  window.location.hash = 'case-studies';
  nextTick(() => {
    const el = document.getElementById('case-studies');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  });
};

const selectedBlogPostSlug = ref('best-software-company-in-rajshahi');
const currentBlogPost = computed(() => 
  blogPosts.find(p => p.slug === selectedBlogPostSlug.value) || blogPosts[0]
);

const openBlogPost = (post: BlogPost) => {
  selectedBlogPostSlug.value = post.slug;
  currentPage.value = 'blog-post';
  window.location.hash = 'blog-' + post.slug;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const closeBlogPost = () => {
  currentPage.value = 'home';
  window.location.hash = 'blog';
  nextTick(() => {
    const el = document.getElementById('blog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  });
};

const handleHashRouting = () => {
  const hash = window.location.hash;
  if (hash.startsWith('#case-study-')) {
    const id = hash.replace('#case-study-', '');
    if (caseStudies.some(c => c.id === id)) {
      selectedCaseStudyId.value = id;
      currentPage.value = 'case-study';
      return;
    }
  }
  if (hash.startsWith('#blog-')) {
    const slug = hash.replace('#blog-', '');
    const found = blogPosts.find(p => p.slug === slug);
    if (found) {
      selectedBlogPostSlug.value = slug;
      currentPage.value = 'blog-post';
      return;
    }
  }
  if (hash === '#blog' && currentPage.value === 'blog-post') {
    currentPage.value = 'home';
    nextTick(() => {
      const el = document.getElementById('blog');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    });
    return;
  }
  if ((currentPage.value === 'case-study' || currentPage.value === 'blog-post') && 
      !hash.startsWith('#case-study-') && !hash.startsWith('#blog-')) {
    currentPage.value = 'home';
  }
};

const navigateTo = (page: 'home' | 'terms' | 'privacy' | 'case-study' | 'blog-post') => {
  currentPage.value = page;
  window.scrollTo(0, 0);
};

const portfolioItems = [
  {
    image: '/assets/images/proj_gkiti.webp',
    title: 'Global Knowledge (GKITI) — BTEB Certified EdTech Platform',
    description: 'Enterprise training platform for Bangladesh\'s premier BTEB accredited (Code: 23415) mobile repair institute. Anti-piracy video DRM, instant QR certificates & admissions.',
    link: 'https://gkinstitutebd.com',
    badge: 'Govt. Accredited Ecosystem'
  },
  {
    image: '/assets/images/proj_gktool.webp',
    title: 'RepairSoft (GKTool) — Repair Bench & Workshop OS',
    description: 'Enterprise repair shop operating system for mobile tool inventory, component IC tracking, multi-stage repair tickets, POS, and WhatsApp automation.',
    link: 'https://gktool.fabneon.com',
    badge: 'Live SaaS Product'
  },
  {
    image: '/assets/images/proj_healthcare.webp',
    title: 'FabPharma — Healthcare & Retail Pharmacy ERP',
    description: 'Smart pharmaceutical management system featuring automated drug expiry alerts, batch tracking, multi-counter POS, and wholesale inventory restocking.',
    link: '#case-studies',
    badge: 'Healthcare ERP'
  },
  {
    image: '/assets/images/proj_school.webp',
    title: 'School Management System',
    description: 'Comprehensive dashboard for tracking student attendance, grades, and faculty schedules.',
    link: '#'
  },
  {
    image: '/assets/images/proj_pos.webp',
    title: 'High-Speed Retail POS System',
    description: 'Lightning-fast Point of Sale system with real-time inventory and sales analytics.',
    link: '#'
  },
  {
    image: '/assets/images/proj_erp.webp',
    title: 'Enterprise Supply Chain ERP',
    description: 'Enterprise resource planning software for global supply chain and manufacturing operations.',
    link: '#'
  },
  {
    image: '/assets/images/proj_coaching.webp',
    title: 'Coaching Centre Management System',
    description: 'End-to-end management for coaching centers including class tracking, batch scheduling, and payments.',
    link: '#'
  },
  {
    image: '/assets/images/proj_crm.webp',
    title: 'Enterprise Lead & Client CRM',
    description: 'Client relationship management tool tailored for tracking leads, conversion pipelines, and sales stages.',
    link: '#'
  },
  {
    image: '/assets/images/proj_ecommerce.webp',
    title: 'B2B & B2C E-Commerce Platform',
    description: 'Scalable digital storefront with comprehensive sales analytics and inventory management.',
    link: '#'
  },
  {
    image: '/assets/images/proj_hrms.webp',
    title: 'Enterprise HRMS & Payroll Suite',
    description: 'Centralized human resources portal for automated payroll, employee directory, and biometric attendance.',
    link: '#'
  },
  {
    image: '/assets/images/proj_fleet.webp',
    title: 'Intelligent Fleet Management System',
    description: 'Logistics tracking platform featuring live GPS telemetry, delivery route optimization, and vehicle fuel metrics.',
    link: '#'
  }
];

const teamMembers = ref([
  {
    id: 1,
    name: 'Mahfuz Ahmad',
    role: 'Lead Software Architect & Engineer',
    image: '/assets/images/team_mahfuz.webp',
    colorClass: 'text-[var(--brand-teal)]',
    shadowClass: 'hover:shadow-[var(--glow-teal)]'
  },
  {
    id: 3,
    name: 'Golam Rabbani',
    role: 'Senior Software Engineer',
    image: '/assets/images/team_rabbani.webp',
    colorClass: 'text-[var(--brand-gold)]',
    shadowClass: 'hover:shadow-[var(--glow-gold)]',
    objectPosition: '75% 50%'
  },
  {
    id: 4,
    name: 'Oishi Farzana',
    role: 'Senior UI/UX Expert & Frontend Engineer',
    image: '/assets/images/team_oishi.webp',
    colorClass: 'text-[var(--brand-teal)]',
    shadowClass: 'hover:shadow-[var(--glow-teal)]'
  },
  {
    id: 2,
    name: 'Samiha Rahman',
    role: 'Frontend Engineer',
    image: '/assets/images/team_samiha.webp',
    colorClass: 'text-[var(--brand-purple)]',
    shadowClass: 'hover:shadow-[var(--glow-purple)]'
  },
  {
    id: 5,
    name: 'Al Mamun',
    role: 'Software Engineer',
    image: '/assets/images/team_al_mamun.webp',
    colorClass: 'text-[var(--brand-gold)]',
    shadowClass: 'hover:shadow-[var(--glow-gold)]'
  }
]);

// 20 Original Partner Brand Logos — Optimized, reduced size locally served images (zero external latency)
const partners = ref([
  { name: 'bKash', url: '/assets/logos/brand_bkash.png' },
  { name: 'Pathao', url: '/assets/logos/brand_pathao.png' },
  { name: 'Grameenphone', url: '/assets/logos/brand_grameenphone.png' },
  { name: 'Daraz', url: '/assets/logos/brand_daraz.png' },
  { name: 'Walton', url: '/assets/logos/brand_walton.png' },
  { name: 'Square Hospital', url: '/assets/logos/brand_square_hospital.png' },
  { name: 'United Hospital', url: '/assets/logos/brand_united_hospital.png' },
  { name: 'Evercare', url: '/assets/logos/brand_evercare.png' },
  { name: 'BRAC Bank', url: '/assets/logos/brand_brac_bank.png' },
  { name: 'City Bank', url: '/assets/logos/brand_city_bank.png' },
  { name: 'Aarong', url: '/assets/logos/brand_aarong.png' },
  { name: 'Chaldal', url: '/assets/logos/brand_chaldal.png' },
  { name: 'Foodpanda', url: '/assets/logos/brand_foodpanda.png' },
  { name: 'LankaBangla', url: '/assets/logos/brand_lankabangla.png' },
  { name: 'Shohoz', url: '/assets/logos/brand_shohoz.png' },
  { name: 'Biman', url: '/assets/logos/brand_biman.png' },
  { name: 'Samsung', url: '/assets/logos/brand_samsung.png' },
  { name: 'ASUS', url: '/assets/logos/brand_asus.png' },
  { name: 'Toyota', url: '/assets/logos/brand_toyota.png' },
  { name: 'Sony', url: '/assets/logos/brand_sony.png' }
]);

const techStack1 = ref([
  { name: 'Vue.js', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg' },
  { name: 'React', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
  { name: 'Node.js', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
  { name: 'Python', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
  { name: 'PostgreSQL', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
  { name: 'MongoDB', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
  { name: 'Docker', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
  { name: 'AWS', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
  { name: 'Google Cloud', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg' },
  { name: 'Tailwind CSS', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'TypeScript', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
  { name: 'Figma', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg' }
]);

const techStack2 = ref([
  { name: 'Redis', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg' },
  { name: 'GraphQL', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg' },
  { name: 'Next.js', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg' },
  { name: 'Nuxt', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nuxtjs/nuxtjs-original.svg' },
  { name: 'Flutter', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg' },
  { name: 'Android', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/android/android-original.svg' },
  { name: 'iOS', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apple/apple-original.svg' },
  { name: 'Supabase', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg' },
  { name: 'Kubernetes', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg' },
  { name: 'Ubuntu', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/ubuntu/ubuntu-plain.svg' },
  { name: 'GitHub', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg' },
  { name: 'GitLab', url: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gitlab/gitlab-original.svg' }
]);

onMounted(() => {
  document.documentElement.setAttribute('data-theme', theme.value);
  document.documentElement.classList.remove('light-theme-loader');

  nextTick(() => {
    // 1. Immediately remove any invisible classes so sections are never blank
    document.querySelectorAll('.invisible-until-scroll').forEach(el => el.classList.remove('invisible-until-scroll'));

    // 2. Progressive enhancement GSAP animations
    try {
      const revealElements = gsap.utils.toArray('.reveal-up, .reveal-left, .reveal-right') as HTMLElement[];
      ScrollTrigger.batch(revealElements, {
        start: 'top 92%',
        onEnter: (batch) => {
          batch.forEach((element) => {
            let xOffset = 0;
            let yOffset = 25;

            if (element.classList.contains('reveal-left')) {
              xOffset = -35;
              yOffset = 0;
            } else if (element.classList.contains('reveal-right')) {
              xOffset = 35;
              yOffset = 0;
            }

            gsap.fromTo(element,
              { x: xOffset, y: yOffset, opacity: 0.25 },
              { x: 0, y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', overwrite: 'auto' }
            );
          });
        },
        once: true
      });

      const staggerContainers = [
        '.services-grid', 
        '.case-studies-grid', 
        '.portfolio-grid', 
        '.tech-grid', 
        '.team-grid', 
        '.process-grid', 
        '.testimonials-grid', 
        '.impact-stats-container'
      ];

      staggerContainers.forEach(containerSelector => {
        const container = document.querySelector(containerSelector);
        if (!container) return;
        const children = container.querySelectorAll('.reveal-stagger-child');
        if (!children.length) return;

        ScrollTrigger.create({
          trigger: container,
          start: 'top 88%',
          onEnter: () => {
            gsap.fromTo(children,
              { y: 20, opacity: 0.3 },
              { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power2.out', overwrite: 'auto' }
            );
          },
          once: true
        });
      });
    } catch (err) {
      console.warn('ScrollTrigger fallback applied:', err);
    }

    // 3. Absolute resilience fallback: force visible after 250ms
    setTimeout(() => {
      document.querySelectorAll<HTMLElement>('.reveal-stagger-child, .reveal-up, .reveal-left, .reveal-right, .invisible-until-scroll').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.style.visibility = 'visible';
      });
      ScrollTrigger.refresh();
    }, 250);

    // FAQ Accordion
    document.querySelectorAll('.accordion-header').forEach(header => {
      header.addEventListener('click', () => {
        const item = header.parentElement;
        const isActive = item?.classList.contains('active');
        document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
        if (!isActive && item) item.classList.add('active');
      });
    });
  });

  window.addEventListener('hashchange', handleHashRouting);
  handleHashRouting();
});

onUnmounted(() => {
  window.removeEventListener('hashchange', handleHashRouting);
});
</script>

<template>
  <div>
    <!-- Non-blocking loader removed for instant First Contentful Paint -->
    <LoadingScreen :theme="theme" />

    <PremiumNav v-if="currentPage === 'home'" :theme="theme" :items="navItems" @toggle-theme="toggleTheme" />

    <!-- Main Content -->
    <main v-if="currentPage === 'home'">
      <!-- 1. Hero Section -->
      <section class="hero overflow-hidden [isolation:isolate]" id="home">
        <div class="hero-bg-glow"></div>
        <div class="hero-bg-glow-2"></div>

        <div class="container">
          <div class="grid md:grid-cols-2 gap-8 items-center h-full">
            <div class="hero-content text-center md:text-left mx-0 max-w-none relative z-20">
              <div class="badge badge-purple reveal-up"
                style="margin-bottom: var(--space-md); display: inline-flex;">
                Fabneon Technologies Limited • Innovation-Driven Engineering
              </div>

              <h1 class="display reveal-up">
                We Build The <br>
                <span class="text-gradient">Future of Tech</span>
              </h1>

              <p class="lead reveal-up text-center md:text-left mx-auto md:mx-0"
                style="max-width: 530px;">
                <strong>Fabneon Technologies Limited</strong> is a premier corporate technology partner engineering scalable enterprise software, mission-critical ERP systems, and specialized SaaS operating systems (RepairSoft, FabPharma, GKITI).
              </p>

              <div class="hero-cta reveal-up flex flex-wrap justify-center md:justify-start gap-4"
                style="margin-top: var(--space-xl);">
                <a href="#case-studies" class="btn btn-primary btn-lg magnetic">Explore Case Studies</a>
                <a href="#services" class="btn btn-outline-purple btn-lg magnetic">Our Expertise</a>
              </div>
            </div>

            <!-- CardSwap Showcase (Optimized WebP, sub-second load) -->
            <div
              class="relative w-full min-w-0 h-[350px] md:h-[500px] z-10 mt-8 md:mt-0 translate-y-4 md:translate-y-[60px] flex justify-center overflow-visible">
              <CardSwap :card-distance="60" :vertical-distance="70" :delay="5000" :pause-on-hover="false">
                <!-- Card 1 -->
                <div
                  class="absolute top-1/2 left-1/2 w-full h-full rounded-2xl flex flex-col justify-end text-left overflow-hidden [transform-style:preserve-3d] [backface-visibility:hidden] [will-change:transform]"
                  style="padding: 1.5rem; border: 1px solid rgba(255,255,255,0.15); box-shadow: 0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2);">
                  <img src="/assets/images/card_scalable.webp" alt="Scalable Solutions — Fabneon Technologies Limited"
                    class="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 hover:scale-105 [will-change:transform]" style="transform: translateZ(0);" loading="eager" decoding="async" />
                  <div class="absolute inset-0 bg-gradient-to-t from-[#0E0F12] via-[#0E0F12]/60 to-transparent z-10"></div>

                  <div class="relative z-20">
                    <div
                      class="w-10 h-10 rounded-full bg-[#1A1D24] flex items-center justify-center text-[var(--brand-teal)] mb-3 border border-white/10">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                        <line x1="12" y1="22.08" x2="12" y2="12"></line>
                      </svg>
                    </div>
                    <h3 class="text-2xl font-bold mb-1" style="color: #ffffff;">Scalable Architectures</h3>
                    <p class="text-sm" style="color: rgba(255, 255, 255, 0.85);">Engineered for millions of transactions.</p>
                  </div>
                </div>

                <!-- Card 2 -->
                <div
                  class="absolute top-1/2 left-1/2 w-full h-full rounded-2xl flex flex-col justify-end text-left overflow-hidden [transform-style:preserve-3d] [backface-visibility:hidden] [will-change:transform]"
                  style="padding: 1.5rem; border: 1px solid rgba(255,255,255,0.15); box-shadow: 0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2);">
                  <img src="/assets/images/card_uiux.webp" alt="Stunning UI/UX — Fabneon Technologies Limited"
                    class="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 hover:scale-105 [will-change:transform]" style="transform: translateZ(0);" loading="lazy" decoding="async" />
                  <div class="absolute inset-0 bg-gradient-to-t from-[#0E0F12] via-[#0E0F12]/60 to-transparent z-10"></div>

                  <div class="relative z-20">
                    <div
                      class="w-10 h-10 rounded-full bg-[#1A1D24] flex items-center justify-center text-[var(--brand-purple)] mb-3 border border-white/10">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                        <circle cx="9" cy="9" r="2"></circle>
                        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                      </svg>
                    </div>
                    <h3 class="text-2xl font-bold mb-1" style="color: #ffffff;">Intuitive UI/UX</h3>
                    <p class="text-sm" style="color: rgba(255, 255, 255, 0.85);">Design systems that drive business conversion.</p>
                  </div>
                </div>

                <!-- Card 3 -->
                <div
                  class="absolute top-1/2 left-1/2 w-full h-full rounded-2xl flex flex-col justify-end text-left overflow-hidden [transform-style:preserve-3d] [backface-visibility:hidden] [will-change:transform]"
                  style="padding: 1.5rem; border: 1px solid rgba(255,255,255,0.15); box-shadow: 0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2);">
                  <img src="/assets/images/card_growth.webp" alt="Enterprise Growth — Fabneon Technologies Limited"
                    class="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 hover:scale-105 [will-change:transform]" style="transform: translateZ(0);" loading="lazy" decoding="async" />
                  <div class="absolute inset-0 bg-gradient-to-t from-[#0E0F12] via-[#0E0F12]/60 to-transparent z-10"></div>

                  <div class="relative z-20">
                    <div
                      class="w-10 h-10 rounded-full bg-[#1A1D24] flex items-center justify-center text-[var(--brand-gold)] mb-3 border border-white/10">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 2v20"></path>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                      </svg>
                    </div>
                    <h3 class="text-2xl font-bold mb-1" style="color: #ffffff;">Mission-Critical ERP</h3>
                    <p class="text-sm" style="color: rgba(255, 255, 255, 0.85);">Empowering enterprises with real-time operational control.</p>
                  </div>
                </div>
              </CardSwap>
            </div>
          </div>
        </div>
      </section>

      <!-- 1.5 Our Partners Section (Optimized Real Brand Logos) -->
      <section class="section [isolation:isolate] overflow-hidden" style="padding: 0; padding-bottom: 2rem;">
        <div class="container text-center mb-4">
          <p class="text-sm font-semibold tracking-wider text-[var(--text-secondary)] uppercase">Trusted by forward-thinking companies & industry leaders</p>
        </div>
        <LogoMarquee :items="partners" direction="left" speed="normal" />
      </section>

      <!-- 2. Services Section -->
      <section class="section" id="services">
        <div class="container">
          <div class="section-header text-center reveal-up">
            <div class="badge mb-4">What We Do</div>
            <h2>Our Expertise</h2>
            <p class="lead">Delivering cutting-edge solutions across the entire technology stack.</p>
          </div>

          <div class="services-grid grid-3">
            <BorderGlow className="service-card reveal-stagger-child" backgroundColor="var(--bg-secondary)" :animated="true">
              <div class="service-icon" style="color: var(--brand-teal);">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"></path>
                </svg>
              </div>
              <h3>Software Engineering</h3>
              <p class="text-secondary">Custom cloud architectures and robust microservices tailored to your exact business specifications.</p>
            </BorderGlow>

            <BorderGlow className="service-card reveal-stagger-child" backgroundColor="var(--bg-secondary)" :animated="true">
              <div class="service-icon" style="color: var(--brand-purple);">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect width="20" height="8" x="2" y="14" rx="2"></rect>
                  <rect width="20" height="8" x="2" y="2" rx="2"></rect>
                  <line x1="6" x2="6.01" y1="6" y2="6"></line>
                  <line x1="6" x2="6.01" y1="18" y2="18"></line>
                </svg>
              </div>
              <h3>Enterprise ERP Systems</h3>
              <p class="text-secondary">Comprehensive resource planning systems unifying inventory, supply chain, automated accounting, and analytics.</p>
            </BorderGlow>

            <BorderGlow className="service-card reveal-stagger-child" backgroundColor="var(--bg-secondary)" :animated="true">
              <div class="service-icon" style="color: var(--brand-gold);">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect width="14" height="20" x="5" y="2" rx="2" ry="2"></rect>
                  <path d="M12 18h.01"></path>
                </svg>
              </div>
              <h3>Mobile Applications</h3>
              <p class="text-secondary">High-performance cross-platform Flutter and native mobile applications with offline-first synchronization.</p>
            </BorderGlow>
          </div>
        </div>
      </section>

      <!-- 2.5 FLAGSHIP CASE STUDIES & PROBLEMS SOLVED -->
      <section class="section" id="case-studies" style="padding-top: 3.5rem; padding-bottom: 5.5rem;">
        <div class="container">
          <div class="section-header text-center reveal-up">
            <div class="badge badge-purple mb-4">Engineering Case Studies</div>
            <h2 class="text-3xl md:text-5xl font-bold mb-4">
              Flagship Projects & <span class="text-gradient">Case Studies</span>
            </h2>
            <p class="lead max-w-3xl mx-auto">
              How Fabneon Technologies Limited engineered high-impact platforms for industry benchmarks — solving piracy, inventory shrinkage, and institutional compliance.
            </p>
          </div>

          <!-- Horizontal 4-Card Grid on Homepage -->
          <div class="case-studies-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            <div 
              v-for="study in caseStudies.slice(0, 4)" 
              :key="study.id" 
              class="case-study-card reveal-stagger-child rounded-2xl md:rounded-3xl flex flex-col justify-between p-5 md:p-6 transition-all duration-300 group cursor-pointer"
              @click="openCaseStudy(study.id)"
            >
              <div>
                <!-- Clean Thumbnail with Subtle Inner Border (NO text overlay) -->
                <div class="relative rounded-xl md:rounded-2xl overflow-hidden aspect-[16/10] bg-black/40 border border-white/10 mb-4 group-hover:border-[var(--brand-teal-light)]/40 transition-colors">
                  <img 
                    :src="study.image" 
                    :alt="study.title + ' — Case Study by Fabneon Technologies Limited'" 
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    loading="lazy" 
                  />
                  <!-- Floating Category Badge -->
                  <div class="absolute top-2.5 left-2.5">
                    <span class="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-black/80 backdrop-blur-md text-[var(--brand-teal-light)] border border-[var(--brand-teal-light)]/30 shadow-md">
                      {{ study.badge }}
                    </span>
                  </div>
                </div>

                <!-- Client / Sector Subtitle -->
                <div class="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5 line-clamp-1">
                  {{ study.client }}
                </div>

                <!-- Title -->
                <h3 class="text-base md:text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--brand-teal-light)] transition-colors mb-2 leading-snug line-clamp-2">
                  {{ study.title }}
                </h3>

                <!-- Low Wording Summary -->
                <p class="text-xs text-[var(--text-secondary)] leading-relaxed mb-4 line-clamp-2">
                  {{ study.shortDesc }}
                </p>

                <!-- Scannable Micro Metric Pills -->
                <div class="flex flex-wrap gap-1.5 mb-5">
                  <span 
                    v-for="(hl, i) in study.highlights.slice(0, 2)" 
                    :key="i"
                    class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-white/[0.04] text-[var(--text-secondary)] border border-white/10"
                  >
                    <span class="w-1 h-1 rounded-full bg-[var(--brand-teal)]"></span>
                    {{ hl }}
                  </span>
                </div>
              </div>

              <!-- Action Footer with "View Details" button -->
              <div class="pt-4 border-t border-[var(--border-muted)] flex items-center justify-between gap-2 mt-auto">
                <button 
                  class="btn-case-detail inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white transition-all cursor-pointer shadow-md"
                  @click.stop="openCaseStudy(study.id)"
                >
                  <span>View Details</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                </button>

                <a 
                  v-if="study.liveUrl && study.liveUrl !== '#contact'" 
                  :href="study.liveUrl" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--brand-teal-light)] inline-flex items-center gap-1 transition-colors px-2 py-1"
                  @click.stop
                >
                  <span>Live</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </a>
              </div>
            </div>
          </div>

          <!-- Section Footer CTA: View All Case Studies -->
          <div class="text-center mt-12">
            <button 
              @click="openCaseStudy('gkiti')" 
              class="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-xs md:text-sm font-semibold text-[var(--text-primary)] hover:text-white bg-[var(--bg-secondary)] border border-[var(--border-muted)] hover:border-[var(--brand-teal-light)]/60 hover:shadow-lg hover:shadow-[var(--brand-teal-light)]/10 transition-all cursor-pointer"
            >
              <span>Explore All 6 Enterprise Case Studies & Architecture Specs</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </button>
          </div>
        </div>
      </section>

      <!-- 2.8. ENGINEERING BLOG & INDUSTRY BENCHMARKS -->
      <BlogSection @select-post="openBlogPost" />

      <!-- 3. Process Section -->
      <section class="section section-alt" id="process">
        <div class="container">
          <div class="section-header text-center reveal-up">
            <div class="badge badge-purple mb-4">How We Work</div>
            <h2>Our Process</h2>
            <p class="lead">A proven methodology that ensures project success from conception to deployment.</p>
          </div>
          <div class="process-grid grid-3">
            <BorderGlow className="process-step reveal-stagger-child" backgroundColor="var(--bg-primary)" :animated="false">
              <div class="step-number text-[3rem] font-bold text-[var(--text-muted)] opacity-30 mb-2">01</div>
              <h3 class="mb-2">Discovery & Strategy</h3>
              <p class="text-sm text-[var(--text-secondary)]">We deeply analyze your business needs, target audience, and technical requirements.</p>
            </BorderGlow>
            <BorderGlow className="process-step reveal-stagger-child" backgroundColor="var(--bg-primary)" :animated="false">
              <div class="step-number text-[3rem] font-bold text-[var(--text-muted)] opacity-30 mb-2">02</div>
              <h3 class="mb-2">Design & Prototyping</h3>
              <p class="text-sm text-[var(--text-secondary)]">Our UI/UX team creates beautiful, intuitive wireframes and interactive prototypes.</p>
            </BorderGlow>
            <BorderGlow className="process-step reveal-stagger-child" backgroundColor="var(--bg-primary)" :animated="false">
              <div class="step-number text-[3rem] font-bold text-[var(--text-muted)] opacity-30 mb-2">03</div>
              <h3 class="mb-2">Development</h3>
              <p class="text-sm text-[var(--text-secondary)]">We write clean, modular code building robust, scalable architecture using modern technologies.</p>
            </BorderGlow>
            <BorderGlow className="process-step reveal-stagger-child" backgroundColor="var(--bg-primary)" :animated="false">
              <div class="step-number text-[3rem] font-bold text-[var(--text-muted)] opacity-30 mb-2">04</div>
              <h3 class="mb-2">Testing & QA</h3>
              <p class="text-sm text-[var(--text-secondary)]">Rigorous automated and manual testing to ensure security, performance, and reliability.</p>
            </BorderGlow>
            <BorderGlow className="process-step reveal-stagger-child" backgroundColor="var(--bg-primary)" :animated="false">
              <div class="step-number text-[3rem] font-bold text-[var(--text-muted)] opacity-30 mb-2">05</div>
              <h3 class="mb-2">Deployment</h3>
              <p class="text-sm text-[var(--text-secondary)]">A seamless launch process with CI/CD pipelines ensuring zero downtime.</p>
            </BorderGlow>
            <BorderGlow className="process-step reveal-stagger-child" backgroundColor="var(--bg-primary)" :animated="false">
              <div class="step-number text-[3rem] font-bold text-[var(--text-muted)] opacity-30 mb-2">06</div>
              <h3 class="mb-2">Maintenance & Support</h3>
              <p class="text-sm text-[var(--text-secondary)]">Continuous monitoring, updates, and optimization to keep your system performing at its best.</p>
            </BorderGlow>
          </div>
        </div>
      </section>

      <!-- 3.5. Impact & Stats Section -->
      <section class="section" id="impact">
        <div class="container">
          <div class="section-header text-center reveal-up">
            <div class="badge badge-gold mb-4">Our Impact</div>
            <h2>Numbers That Matter</h2>
          </div>
          <div class="impact-stats-container grid md:grid-cols-4 gap-6">
            <StatCounter :value="150" suffix="+" label="Projects Delivered" class="reveal-stagger-child" />
            <StatCounter :value="40" suffix="+" label="Countries Served" class="reveal-stagger-child" />
            <StatCounter :value="99" suffix="%" label="Client Retention" class="reveal-stagger-child" />
            <StatCounter :value="25" suffix="M+" label="Lines of Code" class="reveal-stagger-child" />
          </div>
        </div>
      </section>

      <!-- 3.75. About & Team Section -->
      <section class="section section-alt" id="about">
        <div class="container relative">
          <div class="grid md:grid-cols-2 gap-12 items-center mt-12">
            <!-- Left Side: Title and Subtitle -->
            <div class="text-left reveal-up">
              <div class="badge mb-4 inline-block">Who We Are</div>
              <h2 class="display text-4xl md:text-5xl lg:text-6xl mb-6">Meet The <span class="text-gradient">Team</span></h2>
              <p class="lead text-lg md:text-xl text-[var(--text-muted)] max-w-lg">
                We are a passionate team of software architects, engineers, and UI/UX specialists at <strong>Fabneon Technologies Limited</strong>. From enterprise ERPs to high-performance web applications, our team delivers excellence at every level.
              </p>
            </div>

            <!-- Right Side: Coverflow Carousel -->
            <div class="flex justify-center items-center h-[400px] md:h-[500px] relative w-full reveal-up" style="animation-delay: 0.2s;">
              <HeroCarousel :items="teamMembers" />
            </div>
          </div>
        </div>
      </section>

      <!-- 3.9. Portfolio / Our Work Section -->
      <section class="section" id="portfolio" style="padding-bottom: 2rem;">
        <div class="container mb-8">
          <div class="section-header text-center reveal-up">
            <div class="badge badge-purple mb-4 mx-auto w-max">Our Work</div>
            <h2>Featured Projects</h2>
            <p class="lead">A showcase of our world-class enterprise software solutions.</p>
          </div>
          
          <div class="w-full mt-12 reveal-up">
            <ProjectCarousel :items="portfolioItems" />
          </div>
        </div>
      </section>

      <!-- 4. Testimonials Section -->
      <section class="section" id="testimonials">
        <div class="container">
          <div class="section-header text-center reveal-up">
            <div class="badge mb-4">Client Stories</div>
            <h2>Don't Just Take Our Word</h2>
          </div>

          <div class="testimonials-grid grid-3">
            <BorderGlow className="testimonial-card reveal-stagger-child" backgroundColor="var(--bg-secondary)" :animated="true">
              <p class="testimonial-text mb-6">"Fabneon completely transformed our legacy ERP system. Their attention to detail and modern architecture drastically improved our operational efficiency."</p>
              <div class="testimonial-author flex items-center gap-4">
                <img src="/assets/images/client_1.webp" alt="Tariqul Islam — CTO, GlobalNet" class="w-12 h-12 rounded-full object-cover">
                <div class="author-info">
                  <h4 class="m-0 text-base">Tariqul Islam</h4>
                  <span class="text-sm text-[var(--text-secondary)]">CTO, GlobalNet</span>
                </div>
              </div>
            </BorderGlow>
            <BorderGlow className="testimonial-card reveal-stagger-child" backgroundColor="var(--bg-secondary)" :animated="true">
              <p class="testimonial-text mb-6">"The mobile app and DRM streaming they engineered exceeded all expectations. Beautiful UI, buttery smooth performance, and delivered ahead of schedule."</p>
              <div class="testimonial-author flex items-center gap-4">
                <img src="/assets/images/client_2.webp" alt="Nazmul Hasan — Founder, Apex" class="w-12 h-12 rounded-full object-cover">
                <div class="author-info">
                  <h4 class="m-0 text-base">Nazmul Hasan</h4>
                  <span class="text-sm text-[var(--text-secondary)]">Founder, Apex</span>
                </div>
              </div>
            </BorderGlow>
            <BorderGlow className="testimonial-card reveal-stagger-child" backgroundColor="var(--bg-secondary)" :animated="true">
              <p class="testimonial-text mb-6">"Their team's expertise in Vue, Node.js, and cloud database architecture is unmatched. They act more like an internal engineering partner than an outsourced agency."</p>
              <div class="testimonial-author flex items-center gap-4">
                <img src="/assets/images/client_3.webp" alt="Nusrat Jahan — VP Engineering, Synthetix" class="w-12 h-12 rounded-full object-cover">
                <div class="author-info">
                  <h4 class="m-0 text-base">Nusrat Jahan</h4>
                  <span class="text-sm text-[var(--text-secondary)]">VP Engineering, Synthetix</span>
                </div>
              </div>
            </BorderGlow>
          </div>
        </div>
      </section>

      <!-- 4.5. Technologies Section -->
      <section class="section" id="technologies" style="padding-top: 2rem; padding-bottom: 4rem;">
        <div class="container mb-8">
          <div class="section-header text-center reveal-up">
            <div class="badge badge-teal mb-4 mx-auto w-max">Tech Stack</div>
            <h2>Technologies We Use</h2>
            <p class="lead">Built with modern, scalable, and secure technologies tailored for enterprise needs.</p>
          </div>
        </div>
        
        <div class="flex flex-col gap-8 w-full mt-4">
          <!-- Row 1: Left to right -->
          <LogoMarquee :items="techStack1" direction="left" speed="normal" :showNames="true" />
          <!-- Row 2: Right to left -->
          <LogoMarquee :items="techStack2" direction="right" speed="slow" :showNames="true" />
        </div>
      </section>

      <!-- 5. FAQ Section -->
      <section class="section section-alt" id="faq">
        <div class="container">
          <div class="faq-grid grid md:grid-cols-2 gap-12">
            <div class="faq-content reveal-up">
              <div class="badge badge-purple mb-4">Got Questions?</div>
              <h2>Frequently Asked Questions</h2>
              <p class="lead mb-8">Everything you need to know about partnering with Fabneon Technologies Limited for your next software initiative.
              </p>
              <a href="#contact" class="btn btn-secondary magnetic inline-block">Ask Us Directly</a>
            </div>
            <div class="faq-accordion reveal-up">
              <div
                class="accordion-item mb-4 border border-[var(--border-muted)] rounded-lg overflow-hidden bg-[var(--bg-overlay)]">
                <button
                  class="accordion-header w-full text-left p-4 md:p-6 font-semibold flex justify-between items-center cursor-pointer bg-transparent border-none text-[var(--text-primary)]">
                  <span>Who is Fabneon Technologies Limited?</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="accordion-icon">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                <div class="accordion-body px-4 md:px-6 max-h-0 overflow-hidden transition-all duration-300">
                  <p class="pb-4 md:pb-6 m-0 text-[var(--text-secondary)]">Fabneon Technologies Limited is a registered enterprise software company based in Bangladesh, specializing in high-performance ERP systems, custom SaaS operating systems (RepairSoft, FabPharma), and accredited digital education systems across 40+ countries.</p>
                </div>
              </div>

              <div
                class="accordion-item mb-4 border border-[var(--border-muted)] rounded-lg overflow-hidden bg-[var(--bg-overlay)]">
                <button
                  class="accordion-header w-full text-left p-4 md:p-6 font-semibold flex justify-between items-center cursor-pointer bg-transparent border-none text-[var(--text-primary)]">
                  <span>What software did Fabneon build for Global Knowledge Institute (GKITI)?</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="accordion-icon">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                <div class="accordion-body px-4 md:px-6 max-h-0 overflow-hidden transition-all duration-300">
                  <p class="pb-4 md:pb-6 m-0 text-[var(--text-secondary)]">Fabneon engineered the complete digital campus ecosystem for Global Knowledge Institute (GKITI) — Bangladesh's premier, BTEB-certified (Code: 23415) mobile repair training academy with 23+ years experience. Features include forensic watermark video DRM, automated QR certificate verification, and nationwide admissions automation.</p>
                </div>
              </div>

              <div
                class="accordion-item mb-4 border border-[var(--border-muted)] rounded-lg overflow-hidden bg-[var(--bg-overlay)]">
                <button
                  class="accordion-header w-full text-left p-4 md:p-6 font-semibold flex justify-between items-center cursor-pointer bg-transparent border-none text-[var(--text-primary)]">
                  <span>What is RepairSoft (GKTool)?</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="accordion-icon">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                <div class="accordion-body px-4 md:px-6 max-h-0 overflow-hidden transition-all duration-300">
                  <p class="pb-4 md:pb-6 m-0 text-[var(--text-secondary)]">RepairSoft is a cloud operating system engineered by Fabneon for mobile electronics workshops and tool centers. It manages component-level SMD IC inventory, technician commission splits, multi-stage repair tickets, and automated customer WhatsApp updates.</p>
                </div>
              </div>

              <div
                class="accordion-item mb-4 border border-[var(--border-muted)] rounded-lg overflow-hidden bg-[var(--bg-overlay)]">
                <button
                  class="accordion-header w-full text-left p-4 md:p-6 font-semibold flex justify-between items-center cursor-pointer bg-transparent border-none text-[var(--text-primary)]">
                  <span>What is FabPharma?</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="accordion-icon">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                <div class="accordion-body px-4 md:px-6 max-h-0 overflow-hidden transition-all duration-300">
                  <p class="pb-4 md:pb-6 m-0 text-[var(--text-secondary)]">FabPharma is Fabneon's healthcare and retail pharmacy ERP. It eliminates medicine waste with automated 90/60/30-day proactive expiry alerts, sub-second generic drug substitution POS, and wholesale reorder workflows.</p>
                </div>
              </div>

              <div
                class="accordion-item mb-4 border border-[var(--border-muted)] rounded-lg overflow-hidden bg-[var(--bg-overlay)]">
                <button
                  class="accordion-header w-full text-left p-4 md:p-6 font-semibold flex justify-between items-center cursor-pointer bg-transparent border-none text-[var(--text-primary)]">
                  <span>What technologies do you specialize in?</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="accordion-icon">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                <div class="accordion-body px-4 md:px-6 max-h-0 overflow-hidden transition-all duration-300">
                  <p class="pb-4 md:pb-6 m-0 text-[var(--text-secondary)]">We specialize in Vue.js, React, Next.js, Node.js, Python/Django, PostgreSQL, Redis, Docker, Flutter for mobile, and cloud infrastructure on AWS, Google Cloud, and Supabase.</p>
                </div>
              </div>

              <div
                class="accordion-item mb-4 border border-[var(--border-muted)] rounded-lg overflow-hidden bg-[var(--bg-overlay)]">
                <button
                  class="accordion-header w-full text-left p-4 md:p-6 font-semibold flex justify-between items-center cursor-pointer bg-transparent border-none text-[var(--text-primary)]">
                  <span>Do you provide ongoing support after launch?</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="accordion-icon">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
                <div class="accordion-body px-4 md:px-6 max-h-0 overflow-hidden transition-all duration-300">
                  <p class="pb-4 md:pb-6 m-0 text-[var(--text-secondary)]">Absolutely. We offer dedicated maintenance, cloud DevOps monitoring, security patching, and SLA-backed support to ensure your systems remain ultra-fast, secure, and available 24/7.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 6. Contact Section -->
      <section class="section" id="contact">
        <div class="container">
          <div class="contact-grid grid md:grid-cols-2 gap-12">
            <div class="contact-info reveal-left flex flex-col justify-center">
              <div class="badge mb-4 self-start" style="display: inline-flex;">Get In Touch</div>
              <h2 class="mb-4">Contact Fabneon Technologies Limited</h2>
              <p class="mb-10 text-[var(--text-secondary)]">Connect with our software architects to discuss your enterprise ERP, SaaS product, or digital transformation roadmap.</p>

              <div class="contact-details flex flex-col gap-8">
                <div class="contact-item flex items-center gap-5">
                  <div
                    class="contact-icon-wrapper flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-[var(--bg-overlay)] border border-[var(--border-muted)] text-[var(--brand-teal)]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                  </div>
                  <div>
                    <h5 class="m-0 mb-1 text-base font-semibold">Email Us</h5>
                    <a href="mailto:business@fabneon.com"
                      class="text-[var(--text-secondary)] hover:text-[var(--brand-teal-light)] transition-colors">business@fabneon.com</a>
                  </div>
                </div>

                <div class="contact-item flex items-center gap-5">
                  <div
                    class="contact-icon-wrapper flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-[var(--bg-overlay)] border border-[var(--border-muted)] text-[var(--brand-purple)]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path
                        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z">
                      </path>
                    </svg>
                  </div>
                  <div>
                    <h5 class="m-0 mb-1 text-base font-semibold">Direct Corporate Phone</h5>
                    <a href="tel:+8801569149839"
                      class="text-[var(--text-secondary)] hover:text-[var(--brand-purple-light)] transition-colors">+8801569-149839</a>
                  </div>
                </div>

                <div class="contact-item flex items-center gap-5">
                  <div
                    class="contact-icon-wrapper flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-[var(--bg-overlay)] border border-[var(--border-muted)] text-[var(--brand-gold)]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div>
                    <h5 class="m-0 mb-1 text-base font-semibold">Headquarters</h5>
                    <p class="m-0 text-[var(--text-secondary)] leading-relaxed max-w-[250px]">Rajshahi & Dhaka, Bangladesh</p>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="contact-form-container reveal-right bg-[var(--bg-overlay)] p-5 md:p-8 rounded-2xl border border-[var(--border-muted)]">
              <form id="contact-form" class="flex-col gap-lg" @submit.prevent>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div class="form-group flex flex-col gap-sm">
                    <label class="form-label text-sm font-semibold" for="name">Full Name</label>
                    <input type="text" id="name"
                      class="form-input w-full p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-muted)] text-[var(--text-primary)]"
                      placeholder="e.g. Tariqul Islam" required>
                  </div>
                  <div class="form-group flex flex-col gap-sm">
                    <label class="form-label text-sm font-semibold" for="email">Email Address</label>
                    <input type="email" id="email"
                      class="form-input w-full p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-muted)] text-[var(--text-primary)]"
                      placeholder="client@enterprise.com" required>
                  </div>
                </div>

                <div class="form-group flex flex-col gap-sm mt-6">
                  <label class="form-label text-sm font-semibold" for="subject">Project Scope</label>
                  <input type="text" id="subject"
                    class="form-input w-full p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-muted)] text-[var(--text-primary)]"
                    placeholder="e.g. Enterprise ERP, SaaS Platform, Healthcare OS" required>
                </div>

                <div class="form-group flex flex-col gap-sm mt-6">
                  <label class="form-label text-sm font-semibold" for="message">Project Requirements</label>
                  <textarea id="message" rows="5"
                    class="form-textarea w-full p-4 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-muted)] text-[var(--text-primary)] resize-none"
                    placeholder="Tell us about your business workflow, target scale, and technical goals..." required></textarea>
                </div>

                <button type="submit"
                  class="btn btn-primary w-full mt-8 p-4 rounded-lg flex items-center justify-center gap-2 font-semibold">
                  <span>Send Inquiry to Fabneon</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <!-- 7. Pre-Footer CTA -->
      <section class="section cta-section pb-0">
        <div class="container">
          <div class="cta-banner reveal-up text-center shadow-2xl">
            <div class="cta-banner-bg"></div>
            <div class="cta-banner-content mx-auto flex flex-col items-center justify-center">
              <h2>Ready to Transform Your Business?</h2>
              <p class="lead mb-10">Let's build something extraordinary together. Our architects and engineers are ready to turn your vision into reality.</p>
              <a href="#contact" class="btn btn-primary btn-lg magnetic" style="border-radius: 50px;">Start a Conversation</a>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Case Study Detail View -->
    <CaseStudyDetail
      v-else-if="currentPage === 'case-study'"
      :case-study="currentCaseStudy"
      :all-case-studies="caseStudies"
      :theme="theme"
      @back="closeCaseStudy"
      @select="openCaseStudy"
      @toggle-theme="toggleTheme"
    />

    <!-- Blog Post Detail View -->
    <BlogPostDetail
      v-else-if="currentPage === 'blog-post'"
      :post="currentBlogPost"
      :all-posts="blogPosts"
      @back="closeBlogPost"
      @select-post="openBlogPost"
    />

    <!-- Legal Pages -->
    <TermsAndConditions v-else-if="currentPage === 'terms'" @back="navigateTo('home')" />
    <PrivacyPolicy v-else-if="currentPage === 'privacy'" @back="navigateTo('home')" />

    <!-- 8. Footer (Always visible) -->
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <div class="logo font-bold text-2xl flex items-center gap-2">
              <img src="/fabneon_logo_only.png" alt="Fabneon Technologies Limited" class="h-8" />
              <span>Fabneon</span>
            </div>
            <p class="text-[var(--text-secondary)]"><strong>Fabneon Technologies Limited</strong> — Empowering global businesses with scalable enterprise software, mission-critical ERPs, and state-of-the-art digital experiences.</p>
          </div>

          <div class="footer-links-group">
            <h5 class="text-[var(--text-primary)] font-semibold">Flagship Solutions</h5>
            <div class="footer-links">
              <a href="#case-studies">Global Knowledge (GKITI)</a>
              <a href="#case-studies">RepairSoft (GKTool)</a>
              <a href="#case-studies">FabPharma ERP</a>
              <a href="#services">Enterprise Architecture</a>
            </div>
          </div>

          <div class="footer-links-group">
            <h5 class="text-[var(--text-primary)] font-semibold">Company</h5>
            <div class="footer-links">
              <a href="#about">About Fabneon</a>
              <a href="#portfolio">Our Work</a>
              <a href="#process">Our Process</a>
              <a href="#contact">Contact</a>
            </div>
          </div>

          <div class="footer-newsletter">
            <h5 class="text-[var(--text-primary)] font-semibold">Stay Updated</h5>
            <p class="text-[var(--text-secondary)] text-sm mb-4">Subscribe for technical insights and engineering updates from Fabneon.</p>
            <form @submit.prevent>
              <input type="email" placeholder="Email address"
                class="form-input flex-1 p-2 rounded-l-lg bg-[var(--bg-secondary)] border border-[var(--border-muted)] text-[var(--text-primary)]"
                required>
              <button type="submit" class="btn btn-primary rounded-r-lg p-2"
                style="border-radius: 0 8px 8px 0;">Subscribe</button>
            </form>
          </div>
        </div>

        <div class="footer-bottom">
          <p class="text-[var(--text-muted)] text-sm">&copy; 2026 Fabneon Technologies Limited. All rights reserved.</p>
          <div class="footer-bottom-links">
            <a href="#" @click.prevent="navigateTo('privacy')"
              class="text-[var(--text-muted)] text-sm hover:text-[var(--brand-teal-light)] transition-colors">Privacy Policy</a>
            <a href="#" @click.prevent="navigateTo('terms')"
              class="text-[var(--text-muted)] text-sm hover:text-[var(--brand-teal-light)] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
/* Accordion active state overrides */
.accordion-item.active .accordion-body {
  max-height: 250px;
}

/* Case study card visual enhancement */
.case-study-card {
  position: relative;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease;
}

[data-theme="dark"] .case-study-card {
  background: rgba(18, 20, 26, 0.75);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
}

[data-theme="dark"] .case-study-card:hover {
  border-color: rgba(0, 163, 196, 0.45);
  box-shadow: 0 16px 36px -10px rgba(0, 163, 196, 0.2), 0 0 20px rgba(75, 26, 127, 0.15);
  transform: translateY(-6px);
}

[data-theme="light"] .case-study-card {
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}

[data-theme="light"] .case-study-card:hover {
  border-color: rgba(0, 163, 196, 0.5);
  box-shadow: 0 16px 36px -10px rgba(0, 163, 196, 0.2);
  transform: translateY(-6px);
}

.btn-case-detail {
  background: linear-gradient(135deg, #00A3C4 0%, #4B1A7F 100%);
  border: 1px solid rgba(0, 163, 196, 0.3);
  box-shadow: 0 4px 14px rgba(0, 163, 196, 0.25);
}

.btn-case-detail:hover {
  background: linear-gradient(135deg, #00BCE0 0%, #5C2299 100%) !important;
  box-shadow: 0 6px 20px rgba(0, 163, 196, 0.4) !important;
  transform: translateY(-1px);
}
</style>
