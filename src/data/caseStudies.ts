export interface CaseStudyData {
  id: string;
  title: string;
  subtitle: string;
  client: string;
  badge: string;
  badgeColor: string;
  founder?: string;
  year: string;
  image: string;
  liveUrl?: string;
  summary: string;
  shortDesc: string;
  highlights: string[];
  keyStats: { label: string; value: string; desc: string }[];
  govVerification?: {
    label: string;
    code: string;
    authority: string;
    url: string;
    details: string;
  };
  problem: {
    title: string;
    description: string;
    points: string[];
  };
  solution: {
    title: string;
    description: string;
    points: string[];
  };
  architecture: {
    overview: string;
    stack: string[];
    features: { title: string; desc: string }[];
  };
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

export const caseStudies: CaseStudyData[] = [
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
    govVerification: {
      label: 'Verified Govt. Accreditation',
      code: 'BTEB Code: 23415',
      authority: 'Bangladesh Technical Education Board (BTEB)',
      url: 'https://btebcbt.gov.bd/utility/showInstitute/614',
      details: 'Competency Based Training & Assessment (CBT&A) Under NTVQF · Occupation: Mobile Phone Servicing (124) · National Skill Certificate-I (23) · Accredited: 26/09/2022'
    },
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
