<script setup lang="ts">
import { computed } from 'vue';

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

const props = defineProps<{
  caseStudy: CaseStudyData;
  allCaseStudies?: CaseStudyData[];
  theme?: 'light' | 'dark';
}>();

const emit = defineEmits<{
  (e: 'back'): void;
  (e: 'select', id: string): void;
  (e: 'toggle-theme'): void;
}>();

const currentIndex = computed(() => {
  if (!props.allCaseStudies) return -1;
  return props.allCaseStudies.findIndex(c => c.id === props.caseStudy.id);
});

const prevCaseStudy = computed(() => {
  if (!props.allCaseStudies || currentIndex.value <= 0) return null;
  return props.allCaseStudies[currentIndex.value - 1];
});

const nextCaseStudy = computed(() => {
  if (!props.allCaseStudies || currentIndex.value >= props.allCaseStudies.length - 1) return null;
  return props.allCaseStudies[currentIndex.value + 1];
});

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>

<template>
  <div class="case-study-page">
    
    <!-- Unified Top Navigation Bar (Non-overlapping, Fixed) -->
    <header class="detail-top-bar">
      <div class="container max-w-6xl mx-auto px-4 flex items-center justify-between">
        
        <!-- Left: Logo & Back Action -->
        <div class="flex items-center gap-3">
          <a href="#home" @click.prevent="emit('back')" class="flex items-center gap-2 cursor-pointer mr-1">
            <img src="/fabneon_logo_only.png" alt="Fabneon Technologies Limited" class="h-7 w-auto" />
            <span class="font-bold text-sm tracking-tight text-white hidden sm:inline">Fabneon</span>
          </a>

          <button 
            @click="emit('back')" 
            class="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-white/[0.06] border border-white/10 text-white/90 hover:text-white hover:bg-white/[0.12] hover:border-[var(--brand-teal-light)]/40 transition-all cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            <span>All Projects</span>
          </button>
        </div>

        <!-- Center: Current Context Badge -->
        <div class="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-semibold text-white/90">
          <span class="w-1.5 h-1.5 rounded-full bg-[var(--brand-teal)]"></span>
          <span class="truncate max-w-[280px]">{{ caseStudy.title }}</span>
        </div>

        <!-- Right: Actions -->
        <div class="flex items-center gap-2.5">
          <!-- Theme Toggle -->
          <button 
            v-if="theme" 
            class="p-2 rounded-xl text-[var(--text-muted)] hover:text-white transition-colors cursor-pointer" 
            @click="emit('toggle-theme')" 
            :title="theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
            aria-label="Toggle Theme"
          >
            <svg v-if="theme === 'dark'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
          </button>

          <!-- Live Platform Link -->
          <a 
            v-if="caseStudy.liveUrl && caseStudy.liveUrl !== '#contact'" 
            :href="caseStudy.liveUrl" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl bg-[var(--brand-teal)]/15 text-[var(--brand-teal-light)] border border-[var(--brand-teal)]/30 hover:bg-[var(--brand-teal)]/25 transition-all"
          >
            <span>Live Platform</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          </a>

          <!-- Start Project CTA Button -->
          <a 
            href="#contact" 
            @click="emit('back')" 
            class="inline-flex items-center gap-1 text-xs font-bold px-3.5 py-1.5 rounded-xl text-white shadow-md cursor-pointer"
            style="background: linear-gradient(135deg, #00A3C4 0%, #4B1A7F 100%);"
          >
            <span>Start Project</span>
          </a>
        </div>

      </div>
    </header>

    <!-- Hero Header (Generous Breathing Room) -->
    <section class="detail-hero pt-28 md:pt-32 pb-10">
      <div class="container max-w-5xl mx-auto px-4">
        
        <!-- Breadcrumb & Tag Line -->
        <div class="flex flex-wrap items-center gap-2 mb-3 text-xs font-semibold">
          <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[var(--brand-teal)]/15 text-[var(--brand-teal-light)] border border-[var(--brand-teal)]/30">
            {{ caseStudy.badge }}
          </span>
          <span v-if="caseStudy.client" class="text-[var(--text-secondary)]">
            • {{ caseStudy.client }}
          </span>
          <span class="text-[var(--text-muted)]">
            • {{ caseStudy.year }}
          </span>
        </div>

        <!-- Title -->
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.18] mb-4">
          {{ caseStudy.title }}
        </h1>

        <!-- Subtitle -->
        <p class="text-base sm:text-lg md:text-xl text-[var(--text-secondary)] font-normal leading-relaxed mb-8 max-w-3xl">
          {{ caseStudy.subtitle }}
        </p>

        <!-- Featured Media Container -->
        <div class="rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 aspect-video md:aspect-[16/9] max-h-[500px] bg-black/60 shadow-2xl relative mb-12">
          <img :src="caseStudy.image" :alt="caseStudy.title" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-5 md:p-8">
            <div class="flex flex-wrap items-center gap-3 text-white text-xs font-semibold">
              <span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15">
                <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                Engineered by Fabneon Technologies Limited
              </span>
              <span class="text-white/80 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10 hidden sm:inline-block">Production Deployment: {{ caseStudy.year }}</span>
            </div>
          </div>
        </div>

        <!-- Key Impact Metrics (Airy 4-Column Grid) -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 my-10">
          <div v-for="stat in caseStudy.keyStats" :key="stat.label" class="p-5 md:p-6 rounded-2xl bg-white/[0.02] border border-white/10 text-center shadow-lg hover:border-[var(--brand-teal)]/40 hover:-translate-y-1 transition-all">
            <div class="text-2xl sm:text-3xl md:text-4xl font-black text-[var(--brand-teal-light)] font-mono mb-1.5">{{ stat.value }}</div>
            <div class="text-xs font-bold text-white uppercase tracking-wider">{{ stat.label }}</div>
            <p class="text-[11px] text-[var(--text-secondary)] mt-1.5 mb-0 leading-normal">{{ stat.desc }}</p>
          </div>
        </div>

      </div>
    </section>

    <!-- Main Content Breakdown -->
    <main class="detail-body pb-24">
      <div class="container max-w-5xl mx-auto px-4">
        
        <!-- 1. Executive Summary -->
        <section class="mb-14">
          <div class="max-w-3xl">
            <div class="badge badge-teal mb-3">Project Overview</div>
            <h2 class="text-2xl sm:text-3xl font-bold text-white mb-4">Challenge, Scope & Architectural Goal</h2>
            <p class="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
              {{ caseStudy.summary }}
            </p>
          </div>
        </section>

        <!-- 2. Problem vs Solution (Balanced Side-by-Side) -->
        <section class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16">
          <!-- The Challenge / Problem -->
          <div class="p-6 md:p-8 rounded-3xl bg-rose-500/[0.03] border border-rose-500/20 shadow-lg flex flex-col justify-between">
            <div>
              <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-500/10 text-rose-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                <span>The Core Challenge</span>
              </div>
              <h3 class="text-xl md:text-2xl font-bold text-white mb-3 leading-snug">
                {{ caseStudy.problem.title }}
              </h3>
              <p class="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                {{ caseStudy.problem.description }}
              </p>
            </div>

            <div class="space-y-3 pt-5 border-t border-rose-500/15">
              <div v-for="pt in caseStudy.problem.points" :key="pt" class="flex items-start gap-3 text-xs sm:text-sm text-[var(--text-primary)]">
                <span class="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 shrink-0"></span>
                <span class="leading-relaxed">{{ pt }}</span>
              </div>
            </div>
          </div>

          <!-- Fabneon's Engineering Solution -->
          <div class="p-6 md:p-8 rounded-3xl bg-emerald-500/[0.03] border border-emerald-500/20 shadow-lg flex flex-col justify-between">
            <div>
              <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                <span>Fabneon's Engineering Solution</span>
              </div>
              <h3 class="text-xl md:text-2xl font-bold text-white mb-3 leading-snug">
                {{ caseStudy.solution.title }}
              </h3>
              <p class="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                {{ caseStudy.solution.description }}
              </p>
            </div>

            <div class="space-y-3 pt-5 border-t border-emerald-500/15">
              <div v-for="pt in caseStudy.solution.points" :key="pt" class="flex items-start gap-3 text-xs sm:text-sm text-[var(--text-primary)]">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></span>
                <span class="leading-relaxed">{{ pt }}</span>
              </div>
            </div>
          </div>
        </section>

        <!-- 3. Technical Architecture & Core Features -->
        <section class="mb-16">
          <div class="max-w-3xl mb-8">
            <div class="badge badge-purple mb-3">Architecture & Technology</div>
            <h2 class="text-2xl sm:text-3xl font-bold text-white mb-3">Engineered for Scale & Reliability</h2>
            <p class="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed">
              {{ caseStudy.architecture.overview }}
            </p>
          </div>

          <!-- Feature Cards Grid (3 Columns) -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            <div v-for="feat in caseStudy.architecture.features" :key="feat.title" class="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[var(--brand-teal)]/40 transition-all">
              <div class="w-8 h-8 rounded-lg bg-[var(--brand-teal)]/15 text-[var(--brand-teal-light)] flex items-center justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>
              </div>
              <h4 class="font-bold text-base text-white mb-2">{{ feat.title }}</h4>
              <p class="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-0">{{ feat.desc }}</p>
            </div>
          </div>

          <!-- Tech Stack Tags -->
          <div class="flex flex-wrap items-center gap-2 p-5 rounded-2xl bg-white/[0.02] border border-white/10">
            <span class="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mr-2">Core Tech Stack:</span>
            <span v-for="tech in caseStudy.architecture.stack" :key="tech" class="px-3 py-1 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-semibold text-white/90">
              {{ tech }}
            </span>
          </div>
        </section>

        <!-- 4. Client Testimonial (if available) -->
        <section v-if="caseStudy.testimonial" class="mb-16 p-8 md:p-10 rounded-3xl bg-gradient-to-br from-[var(--brand-teal)]/10 via-transparent to-[var(--brand-purple)]/10 border border-white/10 text-center relative overflow-hidden">
          <div class="max-w-2xl mx-auto">
            <svg class="w-8 h-8 text-[var(--brand-teal-light)] mx-auto mb-3 opacity-60" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
            <p class="text-base sm:text-lg font-medium text-white italic leading-relaxed mb-5">
              "{{ caseStudy.testimonial.quote }}"
            </p>
            <div class="font-bold text-sm text-white">{{ caseStudy.testimonial.author }}</div>
            <div class="text-xs text-[var(--brand-teal-light)] font-medium mt-0.5">{{ caseStudy.testimonial.role }}</div>
          </div>
        </section>

        <!-- 5. Next / Prev Case Study Switcher -->
        <nav class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10 mb-14">
          <button 
            v-if="prevCaseStudy" 
            @click="emit('select', prevCaseStudy.id); scrollToTop();"
            class="w-full sm:w-auto px-5 py-3 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[var(--brand-teal-light)]/50 text-left flex items-center gap-3 transition-all cursor-pointer group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="group-hover:-translate-x-1 transition-transform"><path d="m15 18-6-6 6-6"/></svg>
            <div>
              <span class="text-[10px] uppercase tracking-wider text-[var(--text-muted)] block">Previous Project</span>
              <span class="font-bold text-xs sm:text-sm text-white">{{ prevCaseStudy.title }}</span>
            </div>
          </button>
          <div v-else class="hidden sm:block"></div>

          <button 
            v-if="nextCaseStudy" 
            @click="emit('select', nextCaseStudy.id); scrollToTop();"
            class="w-full sm:w-auto px-5 py-3 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[var(--brand-purple-light)]/50 text-right flex items-center justify-end gap-3 transition-all cursor-pointer group"
          >
            <div>
              <span class="text-[10px] uppercase tracking-wider text-[var(--text-muted)] block">Next Project</span>
              <span class="font-bold text-xs sm:text-sm text-white">{{ nextCaseStudy.title }}</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="group-hover:translate-x-1 transition-transform"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </nav>

        <!-- 6. Bottom CTA Banner -->
        <div class="p-8 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/10 text-center shadow-xl">
          <h3 class="text-xl sm:text-2xl font-extrabold text-white mb-2">
            Have a Mission-Critical Software Challenge?
          </h3>
          <p class="text-xs sm:text-sm text-[var(--text-secondary)] max-w-lg mx-auto mb-6">
            Fabneon Technologies Limited engineers high-scale ERP, DRM platforms, and cloud applications designed for zero downtime.
          </p>
          <a href="#contact" @click="emit('back')" class="btn btn-sm text-xs font-bold px-6 py-2.5 rounded-xl text-white shadow-md inline-flex items-center gap-2" style="background: linear-gradient(135deg, #00A3C4 0%, #4B1A7F 100%);">
            <span>Start a Conversation</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </a>
        </div>

      </div>
    </main>

  </div>
</template>

<style scoped>
.case-study-page {
  min-height: 100vh;
  background: var(--bg-primary);
  color: var(--text-primary);
  position: relative;
  overflow-x: hidden;
}

.detail-top-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: rgba(13, 15, 20, 0.92);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  z-index: 999;
  display: flex;
  align-items: center;
}

[data-theme='light'] .detail-top-bar {
  background: rgba(255, 255, 255, 0.96);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}
</style>
