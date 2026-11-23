<script setup lang="ts">
import CardSwap from '../CardSwap.vue';
import { scrollToTarget } from '../../composables/useAppRouter';
</script>

<template>
  <section class="hero overflow-hidden [isolation:isolate]" id="home">
    <div class="hero-bg-glow"></div>
    <div class="hero-bg-glow-2"></div>

    <div class="container">
      <div class="grid md:grid-cols-2 gap-8 lg:gap-12 items-center h-full">
        <!-- Left Hero Content with calibrated, elegant text size -->
        <div class="hero-content text-center md:text-left mx-0 max-w-none relative z-20">
          <div class="badge badge-purple mb-4 inline-flex text-xs py-1.5 px-3.5 tracking-wide">
            Enterprise Systems • Cloud SaaS • Applied AI Solutions
          </div>

          <!-- Calibrated, readable, responsive Hero Title -->
          <h1 class="hero-title font-extrabold text-[var(--text-primary)] tracking-tight mb-4">
            Premier Software Company in <br class="hidden sm:inline">
            <span class="text-gradient">Rajshahi &amp; Bangladesh</span>
          </h1>

          <p class="hero-subtitle text-center md:text-left mx-auto md:mx-0 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-xl mb-8 md:mb-9">
            We architect mission-critical enterprise ERPs, high-throughput cloud SaaS platforms (RepairSoft, FabPharma), and government-accredited digital ecosystems. Delivering scalable, secure software engineering with sub-second performance for industry leaders.
          </p>

          <div class="hero-cta flex flex-wrap justify-center md:justify-start gap-3.5 sm:gap-4">
            <a 
              href="#case-studies" 
              class="btn btn-primary btn-lg magnetic cursor-pointer shadow-lg" 
              @click.prevent="scrollToTarget('case-studies')"
            >
              Explore Case Studies
            </a>
            <a 
              href="#services" 
              class="btn btn-outline-purple btn-lg magnetic cursor-pointer" 
              @click.prevent="scrollToTarget('services')"
            >
              Our Expertise
            </a>
          </div>
        </div>

        <!-- Right Side: CardSwap Showcase (Optimized WebP, sub-second load) -->
        <div class="relative w-full min-w-0 h-[350px] md:h-[480px] z-10 mt-6 md:mt-0 translate-y-2 md:translate-y-[40px] flex justify-center overflow-visible">
          <CardSwap :card-distance="55" :vertical-distance="65" :delay="5000" :pause-on-hover="false">
            <!-- Card 1 -->
            <div
              class="absolute top-1/2 left-1/2 w-full h-full rounded-2xl flex flex-col justify-end text-left overflow-hidden [transform-style:preserve-3d] [backface-visibility:hidden] [will-change:transform]"
              style="padding: 1.5rem; border: 1px solid rgba(255,255,255,0.15); box-shadow: 0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2);">
              <img 
                src="/assets/images/cs_centraio_real.webp" 
                alt="Centraio Cloud OS Multi-Tenant Campus Architecture — Fabneon Technologies Limited"
                class="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 hover:scale-105 [will-change:transform]" 
                style="transform: translateZ(0);" 
                loading="eager" 
                fetchpriority="high" 
                decoding="async" 
                width="500" 
                height="400" 
              />
              <div class="absolute inset-0 bg-gradient-to-t from-[#0E0F12] via-[#0E0F12]/60 to-transparent z-10"></div>

              <div class="relative z-20">
                <div class="w-10 h-10 rounded-full bg-[#1A1D24] flex items-center justify-center text-[var(--brand-teal)] mb-3 border border-white/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                  </svg>
                </div>
                <div class="text-xl sm:text-2xl font-bold mb-1 text-white" role="heading" aria-level="2">Scalable Architectures</div>
                <p class="text-xs sm:text-sm text-white/85">Centraio Multi-Tenant Cloud OS for institutions.</p>
              </div>
            </div>

            <!-- Card 2 -->
            <div
              class="absolute top-1/2 left-1/2 w-full h-full rounded-2xl flex flex-col justify-end text-left overflow-hidden [transform-style:preserve-3d] [backface-visibility:hidden] [will-change:transform]"
              style="padding: 1.5rem; border: 1px solid rgba(255,255,255,0.15); box-shadow: 0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2);">
              <img 
                src="/assets/images/cs_repairsoft_real.webp" 
                alt="RepairSoft Electronics Diagnostics OS — Fabneon Technologies Limited"
                class="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 hover:scale-105 [will-change:transform]" 
                style="transform: translateZ(0);" 
                loading="lazy" 
                decoding="async" 
                width="500" 
                height="400" 
              />
              <div class="absolute inset-0 bg-gradient-to-t from-[#0E0F12] via-[#0E0F12]/60 to-transparent z-10"></div>

              <div class="relative z-20">
                <div class="w-10 h-10 rounded-full bg-[#1A1D24] flex items-center justify-center text-[var(--brand-purple)] mb-3 border border-white/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                    <circle cx="9" cy="9" r="2"></circle>
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                  </svg>
                </div>
                <div class="text-xl sm:text-2xl font-bold mb-1 text-white" role="heading" aria-level="2">High-Throughput SaaS</div>
                <p class="text-xs sm:text-sm text-white/85">RepairSoft Electronics Diagnostics &amp; Workshop OS.</p>
              </div>
            </div>

            <!-- Card 3 -->
            <div
              class="absolute top-1/2 left-1/2 w-full h-full rounded-2xl flex flex-col justify-end text-left overflow-hidden [transform-style:preserve-3d] [backface-visibility:hidden] [will-change:transform]"
              style="padding: 1.5rem; border: 1px solid rgba(255,255,255,0.15); box-shadow: 0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2);">
              <img 
                src="/assets/images/cs_fabpharma_real.webp" 
                alt="FabPharma Enterprise Healthcare & Retail POS — Fabneon Technologies Limited"
                class="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 hover:scale-105 [will-change:transform]" 
                style="transform: translateZ(0);" 
                loading="lazy" 
                decoding="async" 
                width="500" 
                height="400" 
              />
              <div class="absolute inset-0 bg-gradient-to-t from-[#0E0F12] via-[#0E0F12]/60 to-transparent z-10"></div>

              <div class="relative z-20">
                <div class="w-10 h-10 rounded-full bg-[#1A1D24] flex items-center justify-center text-[var(--brand-gold)] mb-3 border border-white/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 2v20"></path>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                </div>
                <div class="text-xl sm:text-2xl font-bold mb-1 text-white" role="heading" aria-level="2">Mission-Critical ERP</div>
                <p class="text-xs sm:text-sm text-white/85">FabPharma Healthcare POS with proactive batch radar.</p>
              </div>
            </div>
          </CardSwap>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-title {
  font-size: clamp(1.65rem, 2.3vw + 0.25rem, 2.45rem) !important;
  line-height: 1.15 !important;
  letter-spacing: -0.025em !important;
  max-width: 580px;
}

.hero-subtitle {
  font-size: clamp(0.925rem, 1vw + 0.1rem, 1.05rem) !important;
  line-height: 1.68 !important;
  letter-spacing: -0.01em;
}

.hero-cta {
  opacity: 1 !important;
  visibility: visible !important;
}
</style>
