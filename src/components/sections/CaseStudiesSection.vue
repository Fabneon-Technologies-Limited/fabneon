<script setup lang="ts">
import { caseStudies } from '../../data/caseStudies';

const emit = defineEmits<{
  (e: 'open-case-study', id: string): void;
}>();
</script>

<template>
  <section class="section" id="case-studies" style="padding-top: 5.5rem; padding-bottom: 5.5rem; scroll-margin-top: 110px;">
    <div class="container">
      <div class="section-header text-center reveal-up">
        <div class="badge badge-purple mb-4">Engineering Case Studies</div>
        <h2 class="text-3xl md:text-5xl font-bold mb-4">
          Flagship Projects &amp; <span class="text-gradient">Case Studies</span>
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
          @click="emit('open-case-study', study.id)"
        >
          <div>
            <!-- Clean Thumbnail with Subtle Inner Border (NO text overlay) -->
            <div class="relative rounded-xl md:rounded-2xl overflow-hidden aspect-[16/10] bg-black/40 border border-black/5 dark:border-white/10 mb-4 group-hover:border-[var(--brand-teal-light)]/40 transition-colors">
              <img 
                :src="study.image" 
                :alt="study.title + ' — Case Study by Fabneon Technologies Limited'" 
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                loading="lazy" 
              />
              <!-- Floating Category Badge -->
              <div class="absolute top-2.5 left-2.5">
                <span class="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-black/85 backdrop-blur-md text-[var(--brand-teal-light)] border border-[var(--brand-teal-light)]/40 shadow-md">
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
                class="case-study-metric-pill inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-[var(--brand-teal)]"></span>
                {{ hl }}
              </span>
            </div>
          </div>

          <!-- Action Footer with "View Details" button -->
          <div class="pt-4 border-t border-[var(--border-muted)] flex items-center justify-between gap-2 mt-auto">
            <button 
              class="btn-case-detail inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white transition-all cursor-pointer shadow-md"
              @click.stop="emit('open-case-study', study.id)"
            >
              <span>View Details</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </button>

            <a 
              v-if="study.liveUrl && study.liveUrl !== '#contact'" 
              :href="study.liveUrl" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--brand-teal)] dark:hover:text-[var(--brand-teal-light)] inline-flex items-center gap-1 transition-colors px-2 py-1"
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
          @click="emit('open-case-study', 'gkiti')" 
          class="inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-xs md:text-sm font-semibold text-[var(--text-primary)] hover:text-white bg-[var(--bg-secondary)] border border-[var(--border-muted)] hover:border-[var(--brand-teal-light)]/60 hover:shadow-lg hover:shadow-[var(--brand-teal-light)]/10 transition-all cursor-pointer"
        >
          <span>Explore All 6 Enterprise Case Studies &amp; Architecture Specs</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
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
  background: #FFFFFF;
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02);
}

[data-theme="light"] .case-study-card:hover {
  border-color: rgba(0, 90, 107, 0.35);
  box-shadow: 0 16px 36px -10px rgba(0, 90, 107, 0.15), 0 2px 10px rgba(0, 0, 0, 0.04);
  transform: translateY(-6px);
}

[data-theme="dark"] .case-study-metric-pill {
  background: rgba(255, 255, 255, 0.04);
  color: var(--text-secondary);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

[data-theme="light"] .case-study-metric-pill {
  background: #F1F5F9;
  color: #334155;
  border: 1px solid #E2E8F0;
}
</style>
