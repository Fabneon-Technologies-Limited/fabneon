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
}>();

const emit = defineEmits<{
  (e: 'back'): void;
  (e: 'select', id: string): void;
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
    
    <!-- Sticky Top Navigation Bar -->
    <header class="detail-top-bar">
      <div class="container max-w-6xl mx-auto flex items-center justify-between">
        <button @click="emit('back')" class="back-btn inline-flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)] hover:text-white transition-colors cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          <span>Back to Home & All Projects</span>
        </button>

        <div class="flex items-center gap-3">
          <span class="text-xs uppercase tracking-wider text-[var(--text-muted)] hidden sm:inline-block">Case Study Overview</span>
          <a v-if="caseStudy.liveUrl" :href="caseStudy.liveUrl" target="_blank" rel="noopener noreferrer" class="live-pill-btn inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full bg-[var(--brand-teal)]/20 text-[var(--brand-teal-light)] border border-[var(--brand-teal)]/40 hover:bg-[var(--brand-teal)]/30 transition-all">
            <span>Visit Live Platform</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          </a>
        </div>
      </div>
    </header>

    <!-- Hero Header -->
    <section class="detail-hero pt-32 pb-16">
      <div class="container max-w-6xl mx-auto">
        <div class="flex flex-wrap items-center gap-2.5 mb-4">
          <span class="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--brand-purple)]/20 text-[var(--brand-purple-light)] border border-[var(--brand-purple)]/30">
            {{ caseStudy.badge }}
          </span>
          <span v-if="caseStudy.client" class="px-3 py-1 rounded-full text-xs font-semibold text-[var(--text-secondary)] bg-[var(--bg-overlay)] border border-[var(--border-muted)]">
            Client: {{ caseStudy.client }}
          </span>
          <span v-if="caseStudy.founder" class="px-3 py-1 rounded-full text-xs font-semibold text-[var(--text-secondary)] bg-[var(--bg-overlay)] border border-[var(--border-muted)]">
            {{ caseStudy.founder }}
          </span>
        </div>

        <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] mb-4 tracking-tight leading-tight">
          {{ caseStudy.title }}
        </h1>
        <p class="text-lg md:text-xl text-[var(--text-secondary)] max-w-3xl leading-relaxed mb-8">
          {{ caseStudy.subtitle }}
        </p>

        <!-- Main Banner Image -->
        <div class="rounded-3xl overflow-hidden border border-[var(--border-muted)] aspect-video md:aspect-[21/9] bg-black/60 shadow-2xl relative mb-12">
          <img :src="caseStudy.image" :alt="caseStudy.title" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6 md:p-10">
            <div class="flex flex-wrap items-center gap-4 text-white text-xs md:text-sm font-semibold">
              <span class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                Engineered by Fabneon Technologies Limited
              </span>
              <span class="text-white/80">Delivered: {{ caseStudy.year }}</span>
            </div>
          </div>
        </div>

        <!-- Key Metrics Cards -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <div v-for="stat in caseStudy.keyStats" :key="stat.label" class="p-5 md:p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-muted)] text-center shadow-md hover:border-[var(--brand-teal)]/40 transition-colors">
            <div class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--brand-teal-light)] font-mono mb-1">{{ stat.value }}</div>
            <div class="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wide">{{ stat.label }}</div>
            <p class="text-[11px] text-[var(--text-secondary)] mt-1 mb-0">{{ stat.desc }}</p>
          </div>
        </div>

      </div>
    </section>

    <!-- Main Content Breakdown -->
    <main class="detail-body pb-24">
      <div class="container max-w-6xl mx-auto space-y-16">
        
        <!-- Executive Summary -->
        <section class="p-8 md:p-12 rounded-3xl bg-[var(--bg-secondary)] border border-[var(--border-muted)] shadow-lg">
          <div class="badge badge-teal mb-3">Executive Summary</div>
          <h2 class="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-4">Project Overview & Objectives</h2>
          <p class="text-base md:text-lg text-[var(--text-secondary)] leading-relaxed mb-0">
            {{ caseStudy.summary }}
          </p>
        </section>

        <!-- Problem vs Solution Breakdown -->
        <section class="grid md:grid-cols-2 gap-8">
          <!-- The Challenge / Problem -->
          <div class="p-8 rounded-3xl bg-rose-500/5 border border-rose-500/20 shadow-lg flex flex-col justify-between">
            <div>
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-500/10 text-rose-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                The Core Challenge & Pain Points
              </div>
              <h3 class="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-3">
                {{ caseStudy.problem.title }}
              </h3>
              <p class="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed mb-6">
                {{ caseStudy.problem.description }}
              </p>
            </div>

            <div class="space-y-3 pt-4 border-t border-rose-500/10">
              <div v-for="pt in caseStudy.problem.points" :key="pt" class="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-primary)] font-medium">
                <span class="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 shrink-0"></span>
                <span>{{ pt }}</span>
              </div>
            </div>
          </div>

          <!-- Fabneon's Solution -->
          <div class="p-8 rounded-3xl bg-emerald-500/5 border border-emerald-500/20 shadow-lg flex flex-col justify-between">
            <div>
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                Fabneon's Engineering Solution
              </div>
              <h3 class="text-xl md:text-2xl font-bold text-[var(--text-primary)] mb-3">
                {{ caseStudy.solution.title }}
              </h3>
              <p class="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed mb-6">
                {{ caseStudy.solution.description }}
              </p>
            </div>

            <div class="space-y-3 pt-4 border-t border-emerald-500/10">
              <div v-for="pt in caseStudy.solution.points" :key="pt" class="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-primary)] font-medium">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></span>
                <span>{{ pt }}</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Technical Architecture & Core Features -->
        <section class="p-8 md:p-12 rounded-3xl bg-[var(--bg-secondary)] border border-[var(--border-muted)] shadow-lg">
          <div class="badge badge-purple mb-3">Architecture & Technology</div>
          <h2 class="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-4">System Architecture & Capabilities</h2>
          <p class="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed mb-8">
            {{ caseStudy.architecture.overview }}
          </p>

          <!-- Feature Cards Grid -->
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            <div v-for="feat in caseStudy.architecture.features" :key="feat.title" class="p-5 rounded-2xl bg-[var(--bg-overlay)] border border-[var(--border-muted)]">
              <h4 class="font-bold text-base text-[var(--text-primary)] mb-2">{{ feat.title }}</h4>
              <p class="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-0">{{ feat.desc }}</p>
            </div>
          </div>

          <!-- Tech Stack Tags -->
          <div class="pt-6 border-t border-[var(--border-muted)]">
            <span class="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-3">Technology Stack:</span>
            <div class="flex flex-wrap items-center gap-2">
              <span v-for="tech in caseStudy.architecture.stack" :key="tech" class="px-3.5 py-1.5 rounded-xl bg-[var(--bg-overlay)] border border-[var(--border-muted)] text-xs font-semibold text-[var(--text-primary)]">
                {{ tech }}
              </span>
            </div>
          </div>
        </section>

        <!-- Testimonial (if available) -->
        <section v-if="caseStudy.testimonial" class="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-[var(--brand-teal)]/10 via-[var(--bg-secondary)] to-[var(--bg-secondary)] border border-[var(--brand-teal)]/30 shadow-lg text-center relative overflow-hidden">
          <div class="max-w-3xl mx-auto">
            <svg class="w-10 h-10 text-[var(--brand-teal)] mx-auto mb-4 opacity-40" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
            <p class="text-base md:text-xl font-medium text-[var(--text-primary)] italic leading-relaxed mb-6">
              "{{ caseStudy.testimonial.quote }}"
            </p>
            <div class="font-bold text-base text-[var(--text-primary)]">{{ caseStudy.testimonial.author }}</div>
            <div class="text-xs text-[var(--brand-teal-light)] font-semibold mt-0.5">{{ caseStudy.testimonial.role }}</div>
          </div>
        </section>

        <!-- Next / Prev Case Study Switcher -->
        <nav class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[var(--border-muted)]">
          <button 
            v-if="prevCaseStudy" 
            @click="emit('select', prevCaseStudy.id); scrollToTop();"
            class="w-full sm:w-auto px-5 py-3 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-muted)] hover:border-[var(--brand-teal)] text-left flex items-center gap-3 transition-colors cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            <div>
              <span class="text-[11px] uppercase tracking-wider text-[var(--text-muted)] block">Previous Project</span>
              <span class="font-bold text-sm text-[var(--text-primary)]">{{ prevCaseStudy.title }}</span>
            </div>
          </button>
          <div v-else class="hidden sm:block"></div>

          <button 
            v-if="nextCaseStudy" 
            @click="emit('select', nextCaseStudy.id); scrollToTop();"
            class="w-full sm:w-auto px-5 py-3 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-muted)] hover:border-[var(--brand-purple)] text-right flex items-center justify-end gap-3 transition-colors cursor-pointer"
          >
            <div>
              <span class="text-[11px] uppercase tracking-wider text-[var(--text-muted)] block">Next Project</span>
              <span class="font-bold text-sm text-[var(--text-primary)]">{{ nextCaseStudy.title }}</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </nav>

        <!-- Bottom CTA -->
        <div class="p-8 sm:p-12 rounded-3xl bg-[var(--bg-secondary)] border border-[var(--border-muted)] text-center shadow-xl">
          <h3 class="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] mb-3">
            Have a Mission-Critical Software Project?
          </h3>
          <p class="text-sm sm:text-base text-[var(--text-secondary)] max-w-xl mx-auto mb-6">
            Partner with Fabneon Technologies Limited to engineer custom ERP, cloud SaaS, or secure enterprise digital platforms.
          </p>
          <a href="#contact" @click="emit('back')" class="btn btn-primary btn-lg inline-flex items-center gap-2">
            <span>Start a Conversation</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
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
}

.detail-top-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: rgba(13, 15, 20, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border-muted);
  z-index: 1000;
  display: flex;
  align-items: center;
}

[data-theme='light'] .detail-top-bar {
  background: rgba(255, 255, 255, 0.9);
}
</style>

