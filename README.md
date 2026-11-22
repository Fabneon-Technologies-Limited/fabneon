# Fabneon Technologies Limited — Official Enterprise Web Platform

High-performance, Geo-SEO optimized web platform for **Fabneon Technologies Limited** (`https://fabneon.com`), Bangladesh's premier enterprise software engineering firm based in Rajshahi & Dhaka.

---

## 🛠 Tech Stack & Architecture

- **Framework**: Vue 3 (Composition API `<script setup>`, TypeScript)
- **Tooling**: Vite 5 + `vue-tsc` (sub-second HMR and code splitting)
- **Styling**: Tailwind CSS v4 + Design Tokens System (`css/variables.css`, `css/base.css`)
- **Animation**: GSAP + ScrollTrigger (hardware-accelerated, will-change optimized)
- **Routing**: Zero-dependency lightweight HTML5 History API router (`useAppRouter.ts`) with hash-fallback for static web hosts
- **SEO & Geo-Optimization**: Structured JSON-LD `@graph`, dynamic canonical tags, Open Graph meta tags, XML sitemap with images, search console verification

---

## 📁 Project Structure (Feature-Driven & Clean Architecture)

```
├── .env.example              # Environment variables template
├── deployment/               # Nginx reverse proxy configuration & droplet scripts
│   ├── fabneon_nginx.conf
│   └── droplet-commands.md
├── public/                   # Static public assets (Favicon, sitemap, robots, manifest)
│   ├── sitemap.xml
│   ├── robots.txt
│   ├── og-image.png
│   └── llms.txt
├── scripts/                  # Build-time utilities & asset compressors
│   ├── compress_all_images.js
│   ├── generate_og_image.js
│   └── download_logos.cjs
├── src/                      # Application Source Code
│   ├── components/           # UI Components
│   │   ├── sections/         # Modular Home Page Sections (< 200 lines each)
│   │   │   ├── HeroSection.vue
│   │   │   ├── CaseStudiesSection.vue
│   │   │   ├── PartnersSection.vue
│   │   │   └── ...
│   │   ├── BlogPostDetail.vue
│   │   ├── CaseStudyDetail.vue
│   │   └── PremiumNav.vue
│   ├── composables/          # Reusable reactive logic
│   │   ├── useAppRouter.ts   # SPA routing & dynamic canonical meta tag management
│   │   └── useTheme.ts       # Reactive Light/Dark mode state with localStorage sync
│   ├── data/                 # Typed static data models
│   │   ├── caseStudies.ts    # 6 Enterprise case studies data & specs
│   │   ├── blogPosts.ts      # High-impact engineering analyses & articles
│   │   └── siteContent.ts    # Navigation, team, stats, and testimonials
│   ├── App.vue               # Root application shell (modular & code-split)
│   ├── main.ts               # Application entry point
│   └── style.css             # Root stylesheet & universal contrast rules
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18.x
- npm >= 9.x

### Installation
```bash
npm install
```

### Local Development Server
```bash
npm run dev
```
Runs the Vite development server on `http://localhost:5173/`.

### Production Build & Typecheck
```bash
npm run build
```
Generates an optimized static bundle in the `dist/` folder ready for CDN or Nginx serving.

### Preview Production Build Locally
```bash
npm run preview
```

---

## 📋 Technical Checklist Verification
- [x] Canonical tags & indexable meta directives
- [x] Verified 1 H1 per page structure
- [x] Strict semantic heading hierarchy (H1 -> H2 -> H3)
- [x] Dual-theme parity (Dark Mode & Light Mode with high-contrast accessibility)
- [x] Core Web Vitals optimized (WebP modern formats, explicit dimensions, preload priority)
- [x] XML Sitemap & Robots.txt verified for Googlebot, Bingbot, and AI Search Crawlers

---

## 📄 License
Proprietary © 2026 Fabneon Technologies Limited. All Rights Reserved.
