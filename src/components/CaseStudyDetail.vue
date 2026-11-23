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
    
    <!-- Hero Header (Generous Breathing Room below Global Floating Navbar) -->
    <section class="detail-hero pb-12">
      <div class="container max-w-5xl mx-auto px-4">
        
        <!-- Breadcrumb & Back Navigation -->
        <div class="flex items-center justify-between mb-8 pb-4 border-b border-[var(--border-muted)]">
          <button 
            @click="emit('back')" 
            class="inline-flex items-center gap-2 text-xs font-semibold px-3.5 py-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-muted)] text-[var(--text-primary)] hover:border-[var(--brand-teal-light)]/60 transition-all cursor-pointer shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            <span>Back to All Projects</span>
          </button>

          <div class="flex items-center gap-3">
            <span class="text-xs font-semibold text-[var(--text-muted)] hidden sm:inline">{{ caseStudy.client }}</span>
            <a 
              v-if="caseStudy.liveUrl && caseStudy.liveUrl !== '#contact'" 
              :href="caseStudy.liveUrl" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl bg-[var(--brand-teal)]/15 text-[var(--brand-teal-light)] border border-[var(--brand-teal)]/30 hover:bg-[var(--brand-teal)]/25 transition-all shadow-sm cursor-pointer"
            >
              <span>Live Platform</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </a>
          </div>
        </div>

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
        <h1 class="case-study-h1 font-black text-[var(--text-primary)] tracking-tight mb-4">
          {{ caseStudy.title }}
        </h1>

        <!-- Subtitle -->
        <p class="text-base sm:text-lg md:text-xl text-[var(--text-secondary)] font-normal leading-relaxed mb-8 max-w-3xl">
          {{ caseStudy.subtitle }}
        </p>

        <!-- Featured Media Container -->
        <div class="rounded-2xl md:rounded-3xl overflow-hidden border border-[var(--border-muted)] aspect-video md:aspect-[16/9] max-h-[500px] bg-black/60 shadow-2xl relative mb-12">
          <img :src="caseStudy.image" :alt="caseStudy.title + ' — Enterprise Case Study by Fabneon Technologies Limited'" class="w-full h-full object-cover" width="1000" height="562" />
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

        <!-- Official Government Accreditation Card (If Applicable) -->
        <div v-if="caseStudy.govVerification" class="p-5 md:p-6 rounded-2xl bg-[var(--bg-secondary)] border border-emerald-500/30 shadow-lg my-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="flex items-start gap-3.5">
            <div class="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="text-xs font-bold uppercase tracking-wider text-emerald-400">{{ caseStudy.govVerification.label }}</span>
                <span class="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-emerald-400/10 text-emerald-300 border border-emerald-400/20">{{ caseStudy.govVerification.code }}</span>
              </div>
              <div class="text-sm font-semibold text-[var(--text-primary)] mt-1">{{ caseStudy.govVerification.authority }}</div>
              <p class="text-xs text-[var(--text-secondary)] mt-1 mb-0">{{ caseStudy.govVerification.details }}</p>
            </div>
          </div>
          <a 
            :href="caseStudy.govVerification.url" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/25 transition-all shrink-0 self-start sm:self-auto cursor-pointer"
          >
            <span>Verify on Govt. Registry</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          </a>
        </div>

        <!-- Key Impact Metrics (Airy 4-Column Grid) -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 my-10">
          <div v-for="stat in caseStudy.keyStats" :key="stat.label" class="cs-stat-card p-5 md:p-6 rounded-2xl text-center shadow-lg transition-all">
            <div class="stat-value text-2xl sm:text-3xl md:text-4xl font-black font-mono mb-1.5">{{ stat.value }}</div>
            <div class="stat-label text-xs font-bold uppercase tracking-wider">{{ stat.label }}</div>
            <p class="stat-desc text-[11px] mt-1.5 mb-0 leading-normal">{{ stat.desc }}</p>
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
            <h2 class="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-4">Challenge, Scope & Architectural Goal</h2>
            <p class="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
              {{ caseStudy.summary }}
            </p>
          </div>
        </section>

        <!-- 2. Problem vs Solution (Balanced Side-by-Side, Solid Surfaces) -->
        <section class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16">
          <!-- The Challenge / Problem -->
          <div class="cs-challenge-card p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-xl flex flex-col justify-between">
            <div>
              <div class="challenge-badge inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                <span>The Core Challenge</span>
              </div>
              <h3 class="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-3 leading-snug">
                {{ caseStudy.problem.title }}
              </h3>
              <p class="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                {{ caseStudy.problem.description }}
              </p>
            </div>

            <div class="space-y-3 pt-5 border-t border-[var(--border-muted)]">
              <div v-for="pt in caseStudy.problem.points" :key="pt" class="flex items-start gap-3 text-xs sm:text-sm text-[var(--text-primary)]">
                <span class="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0"></span>
                <span class="leading-relaxed">{{ pt }}</span>
              </div>
            </div>
          </div>

          <!-- Fabneon's Engineering Solution -->
          <div class="cs-solution-card p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-xl flex flex-col justify-between">
            <div>
              <div class="solution-badge inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                <span>Fabneon's Engineering Solution</span>
              </div>
              <h3 class="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-3 leading-snug">
                {{ caseStudy.solution.title }}
              </h3>
              <p class="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
                {{ caseStudy.solution.description }}
              </p>
            </div>

            <div class="space-y-3 pt-5 border-t border-[var(--border-muted)]">
              <div v-for="pt in caseStudy.solution.points" :key="pt" class="flex items-start gap-3 text-xs sm:text-sm text-[var(--text-primary)]">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></span>
                <span class="leading-relaxed">{{ pt }}</span>
              </div>
            </div>
          </div>
        </section>

        <!-- 3. Technical Architecture & Core Features -->
        <section class="mb-16">
          <div class="max-w-3xl mb-8">
            <div class="badge badge-purple mb-3">Architecture & Technology</div>
            <h2 class="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-3">Engineered for Scale & Reliability</h2>
            <p class="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed">
              {{ caseStudy.architecture.overview }}
            </p>
          </div>

          <!-- Feature Cards Grid (3 Columns, Solid Surfaces) -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            <div v-for="feat in caseStudy.architecture.features" :key="feat.title" class="cs-feature-card p-6 rounded-2xl transition-all shadow-md">
              <div class="w-8 h-8 rounded-lg bg-[var(--brand-teal)]/15 text-[var(--brand-teal-light)] flex items-center justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>
              </div>
              <h3 class="font-bold text-base text-[var(--text-primary)] mb-2">{{ feat.title }}</h3>
              <p class="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-0">{{ feat.desc }}</p>
            </div>
          </div>

          <!-- Tech Stack Tags -->
          <div class="cs-stack-container flex flex-wrap items-center gap-2 p-5 rounded-2xl">
            <span class="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mr-2">Core Tech Stack:</span>
            <span v-for="tech in caseStudy.architecture.stack" :key="tech" class="cs-stack-tag px-3 py-1 rounded-xl text-xs font-semibold">
              {{ tech }}
            </span>
          </div>
        </section>

        <!-- 4. Client Testimonial (if available) -->
        <section v-if="caseStudy.testimonial" class="cs-testimonial-card mb-16 p-8 md:p-10 rounded-3xl text-center relative overflow-hidden shadow-xl">
          <div class="max-w-2xl mx-auto">
            <svg class="w-8 h-8 text-[var(--brand-teal-light)] mx-auto mb-3 opacity-60" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
            <p class="text-base sm:text-lg font-medium text-[var(--text-primary)] italic leading-relaxed mb-5">
              "{{ caseStudy.testimonial.quote }}"
            </p>
            <div class="font-bold text-sm text-[var(--text-primary)]">{{ caseStudy.testimonial.author }}</div>
            <div class="text-xs text-[var(--brand-teal-light)] font-medium mt-0.5">{{ caseStudy.testimonial.role }}</div>
          </div>
        </section>

        <!-- 5. Next / Prev Case Study Switcher -->
        <nav class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[var(--border-muted)] mb-14">
          <button 
            v-if="prevCaseStudy" 
            @click="emit('select', prevCaseStudy.id); scrollToTop();"
            class="w-full sm:w-auto px-5 py-3 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-muted)] hover:border-[var(--brand-teal-light)]/50 text-left flex items-center gap-3 transition-all cursor-pointer group shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="group-hover:-translate-x-1 transition-transform"><path d="m15 18-6-6 6-6"/></svg>
            <div>
              <span class="text-[10px] uppercase tracking-wider text-[var(--text-muted)] block">Previous Project</span>
              <span class="font-bold text-xs sm:text-sm text-[var(--text-primary)]">{{ prevCaseStudy.title }}</span>
            </div>
          </button>
          <div v-else class="hidden sm:block"></div>

          <button 
            v-if="nextCaseStudy" 
            @click="emit('select', nextCaseStudy.id); scrollToTop();"
            class="w-full sm:w-auto px-5 py-3 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-muted)] hover:border-[var(--brand-purple-light)]/50 text-right flex items-center justify-end gap-3 transition-all cursor-pointer group shadow-sm"
          >
            <div>
              <span class="text-[10px] uppercase tracking-wider text-[var(--text-muted)] block">Next Project</span>
              <span class="font-bold text-xs sm:text-sm text-[var(--text-primary)]">{{ nextCaseStudy.title }}</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="group-hover:translate-x-1 transition-transform"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </nav>

        <!-- 6. Bottom CTA Banner -->
        <div class="cs-bottom-cta p-8 sm:p-10 rounded-3xl text-center shadow-xl">
          <h3 class="text-xl sm:text-2xl font-extrabold text-[var(--text-primary)] mb-2">
            Have a Mission-Critical Software Challenge?
          </h3>
          <p class="text-xs sm:text-sm text-[var(--text-secondary)] max-w-lg mx-auto mb-6">
            Fabneon Technologies Limited engineers high-scale ERP, DRM platforms, and cloud applications designed for zero downtime.
          </p>
          <a href="#contact" @click="emit('back')" class="btn btn-primary cursor-pointer shadow-lg inline-flex items-center gap-2">
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

.detail-hero {
  padding-top: clamp(7.5rem, 9vw + 1.5rem, 9.5rem) !important;
  padding-bottom: 3rem;
}

.case-study-h1 {
  font-size: clamp(1.85rem, 3vw + 0.25rem, 2.75rem) !important;
  line-height: 1.18 !important;
}

/* Live Platform Button */
.live-platform-btn {
  background: rgba(0, 163, 196, 0.15);
  color: var(--brand-teal-light);
  border: 1px solid rgba(0, 163, 196, 0.3);
}

.live-platform-btn:hover {
  background: rgba(0, 163, 196, 0.25);
}

[data-theme='light'] .live-platform-btn {
  background: rgba(0, 90, 107, 0.08);
  color: #005A6B;
  border: 1px solid rgba(0, 90, 107, 0.25);
}

[data-theme='light'] .live-platform-btn:hover {
  background: rgba(0, 90, 107, 0.15);
}

/* Stat Cards */
.cs-stat-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-muted);
}

.cs-stat-card:hover {
  border-color: rgba(0, 163, 196, 0.4);
  transform: translateY(-4px);
}

.stat-value {
  color: var(--brand-teal-light);
}

.stat-label {
  color: var(--text-primary);
}

.stat-desc {
  color: var(--text-secondary);
}

[data-theme='light'] .cs-stat-card {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
}

[data-theme='light'] .stat-value {
  color: #005A6B;
}

[data-theme='light'] .stat-label {
  color: #0F172A;
}

[data-theme='light'] .stat-desc {
  color: #64748B;
}

/* Challenge & Solution Cards */
.cs-challenge-card {
  background: var(--bg-secondary);
  border: 1px solid rgba(244, 63, 94, 0.25);
}

.challenge-badge {
  background: rgba(244, 63, 94, 0.1);
  color: #FB7185;
  border: 1px solid rgba(244, 63, 94, 0.2);
}

[data-theme='light'] .cs-challenge-card {
  background: #FFF1F2;
  border: 1px solid #FECDD3;
  box-shadow: 0 4px 20px rgba(225, 29, 72, 0.04);
}

[data-theme='light'] .challenge-badge {
  background: #FFE4E6;
  color: #BE123C;
  border: 1px solid #FDA4AF;
}

.cs-solution-card {
  background: var(--bg-secondary);
  border: 1px solid rgba(16, 185, 129, 0.25);
}

.solution-badge {
  background: rgba(16, 185, 129, 0.1);
  color: #34D399;
  border: 1px solid rgba(16, 185, 129, 0.2);
}

[data-theme='light'] .cs-solution-card {
  background: #F0FDF4;
  border: 1px solid #BBF7D0;
  box-shadow: 0 4px 20px rgba(5, 150, 105, 0.04);
}

[data-theme='light'] .solution-badge {
  background: #DCFCE7;
  color: #15803D;
  border: 1px solid #86EFAC;
}

/* Feature & Stack Cards */
.cs-feature-card,
.cs-stack-container,
.cs-testimonial-card,
.cs-bottom-cta {
  background: var(--bg-secondary);
  border: 1px solid var(--border-muted);
}

.cs-stack-tag {
  background: var(--bg-tertiary);
  border: 1px solid var(--border-muted);
  color: var(--text-primary);
}

[data-theme='light'] .cs-feature-card,
[data-theme='light'] .cs-stack-container,
[data-theme='light'] .cs-testimonial-card,
[data-theme='light'] .cs-bottom-cta {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

[data-theme='light'] .cs-stack-tag {
  background: #F1F5F9;
  border: 1px solid #CBD5E1;
  color: #1E293B;
}
</style>
