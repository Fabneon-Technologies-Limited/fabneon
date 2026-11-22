export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Case Studies', href: '#case-studies' },
  { label: 'Blog', href: '#blog' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' }
];

export interface PortfolioItem {
  image: string;
  title: string;
  description: string;
  link: string;
  badge: string;
}

export const portfolioItems: PortfolioItem[] = [
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
    title: 'Centraio Higher Education Campus ERP',
    description: 'High-availability multi-tenant university and college operating system with automated CGPA grading, fee ledgers, and biometric attendance.',
    link: '#case-studies',
    badge: 'Campus Cloud OS'
  },
  {
    image: '/assets/images/proj_pos.webp',
    title: 'High-Speed Retail POS & Inventory Engine',
    description: 'Sub-second Point of Sale system with thermal ESC/POS receipt generation, barcode matrix, and real-time ledger accounting.',
    link: '#services',
    badge: 'Retail POS Engine'
  },
  {
    image: '/assets/images/proj_erp.webp',
    title: 'Enterprise Supply Chain & Logistics ERP',
    description: 'Mission-critical resource planning software for global supply chain pipelines, multi-warehouse tracking, and automated procurement.',
    link: '#services',
    badge: 'Enterprise Architecture'
  },
  {
    image: '/assets/images/proj_training.webp',
    title: 'Madrasah Management System (MMS OS)',
    description: 'Purpose-built residential academy ERP featuring 30-Para Quran Hifz progress radar, hostel dining hall quota control, and parent SMS billing.',
    link: '#case-studies',
    badge: 'Residential ERP'
  },
  {
    image: '/assets/images/proj_crm.webp',
    title: 'Enterprise Lead & Client CRM',
    description: 'Client relationship management tool tailored for tracking enterprise leads, multi-stage conversion pipelines, and sales stages.',
    link: '#services',
    badge: 'Enterprise CRM'
  },
  {
    image: '/assets/images/proj_ecommerce.webp',
    title: 'iTrust E-Commerce Platform (Nuxt 3 SSR)',
    description: 'High-conversion consumer storefront with sub-second checkout, automated 64-district thana shipping matrix, and server-side Meta CAPI.',
    link: 'https://itrust.com.bd',
    badge: 'Sub-Second E-Commerce'
  },
  {
    image: '/assets/images/proj_hrms.webp',
    title: 'Enterprise HRMS & Automated Payroll Suite',
    description: 'Centralized human resources portal for automated payroll ledgers, employee directories, tax deduction, and biometric attendance.',
    link: '#services',
    badge: 'Enterprise HRMS'
  },
  {
    image: '/assets/images/proj_fleet.webp',
    title: 'Intelligent Fleet Management & Telemetry System',
    description: 'Nationwide logistics tracking platform featuring live GPS telemetry, delivery route optimization, and vehicle fuel metrics.',
    link: '#contact',
    badge: 'Logistics Telemetry'
  }
];

export const teamMembers = [
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
];

export const partners = [
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
];

export const techStack1 = [
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
];

export const techStack2 = [
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
];

export const processSteps = [
  {
    number: '01',
    title: 'Discovery & Strategy',
    description: 'We deeply analyze your business needs, target audience, and technical requirements.'
  },
  {
    number: '02',
    title: 'Design & Prototyping',
    description: 'Our UI/UX team creates beautiful, intuitive wireframes and interactive prototypes.'
  },
  {
    number: '03',
    title: 'Development',
    description: 'We write clean, modular code building robust, scalable architecture using modern technologies.'
  },
  {
    number: '04',
    title: 'Testing & QA',
    description: 'Rigorous automated and manual testing to ensure security, performance, and reliability.'
  },
  {
    number: '05',
    title: 'Deployment',
    description: 'A seamless launch process with CI/CD pipelines ensuring zero downtime.'
  },
  {
    number: '06',
    title: 'Maintenance & Support',
    description: 'Continuous monitoring, updates, and optimization to keep your system performing at its best.'
  }
];

export const impactStats = [
  { value: 150, suffix: '+', label: 'Projects Delivered' },
  { value: 40, suffix: '+', label: 'Countries Served' },
  { value: 99, suffix: '%', label: 'Client Retention' },
  { value: 25, suffix: 'M+', label: 'Lines of Code' }
];

export const testimonials = [
  {
    quote: 'Fabneon completely transformed our legacy ERP system. Their attention to detail and modern architecture drastically improved our operational efficiency.',
    author: 'Tariqul Islam',
    role: 'CTO, GlobalNet',
    image: '/assets/images/client_1.webp'
  },
  {
    quote: 'The mobile app and DRM streaming they engineered exceeded all expectations. Beautiful UI, buttery smooth performance, and delivered ahead of schedule.',
    author: 'Nazmul Hasan',
    role: 'Founder, Apex',
    image: '/assets/images/client_2.webp'
  },
  {
    quote: 'Their team\'s expertise in Vue, Node.js, and cloud database architecture is unmatched. They act more like an internal engineering partner than an outsourced agency.',
    author: 'Nusrat Jahan',
    role: 'VP Engineering, Synthetix',
    image: '/assets/images/client_3.webp'
  }
];

export const faqItems = [
  {
    question: 'Who is Fabneon Technologies Limited?',
    answer: 'Fabneon Technologies Limited is a registered enterprise software company based in Bangladesh, specializing in high-performance ERP systems, custom SaaS operating systems (RepairSoft, FabPharma), and accredited digital education systems across 40+ countries.'
  },
  {
    question: 'What software did Fabneon build for Global Knowledge Institute (GKITI)?',
    answer: 'Fabneon engineered the complete digital campus ecosystem for Global Knowledge Institute (GKITI) — Bangladesh\'s premier, BTEB-certified (Code: 23415) mobile repair training academy with 23+ years experience. Features include forensic watermark video DRM, automated QR certificate verification, and nationwide admissions automation.'
  },
  {
    question: 'What is RepairSoft (GKTool)?',
    answer: 'RepairSoft is a cloud operating system engineered by Fabneon for mobile electronics workshops and tool centers. It manages component-level SMD IC inventory, technician commission splits, multi-stage repair tickets, and automated customer WhatsApp updates.'
  },
  {
    question: 'What is FabPharma?',
    answer: 'FabPharma is Fabneon\'s healthcare and retail pharmacy ERP. It eliminates medicine waste with automated 90/60/30-day proactive expiry alerts, sub-second generic drug substitution POS, and wholesale reorder workflows.'
  },
  {
    question: 'What technologies do you specialize in?',
    answer: 'We specialize in Vue.js, React, Next.js, Node.js, Python/Django, PostgreSQL, Redis, Docker, Flutter for mobile, and cloud infrastructure on AWS, Google Cloud, and Supabase.'
  },
  {
    question: 'Do you provide ongoing support after launch?',
    answer: 'Absolutely. We offer dedicated maintenance, cloud DevOps monitoring, security patching, and SLA-backed support to ensure your systems remain ultra-fast, secure, and available 24/7.'
  }
];
