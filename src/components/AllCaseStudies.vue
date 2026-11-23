<script setup lang="ts">
import { ref, computed } from 'vue';
import { type CaseStudyData } from '../data/caseStudies';

const props = defineProps<{
  allCaseStudies: CaseStudyData[];
  theme?: 'light' | 'dark';
}>();

const emit = defineEmits<{
  (e: 'back'): void;
  (e: 'open-case-study', id: string): void;
}>();

const selectedCategory = ref<string>('All');
const searchQuery = ref<string>('');

const categories = computed(() => {
  const cats = new Set(props.allCaseStudies.map(c => c.badge));
  return ['All', ...Array.from(cats)];
});

const filteredStudies = computed(() => {
  return props.allCaseStudies.filter(study => {
    const matchesCategory = selectedCategory.value === 'All' || study.badge === selectedCategory.value;
    const query = searchQuery.value.toLowerCase().trim();
    const matchesQuery = !query ||
      study.title.toLowerCase().includes(query) ||
      study.client.toLowerCase().includes(query) ||
      study.shortDesc.toLowerCase().includes(query) ||
      study.highlights.some(h => h.toLowerCase().includes(query)) ||
      (study.architecture?.stack && study.architecture.stack.some(s => s.toLowerCase().includes(query)));
    return matchesCategory && matchesQuery;
  });
});

const handleSelectStudy = (id: string) => {
  emit('open-case-study', id);
};
</script>

<template>
  <div class="all-case-studies-view min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
    <div class="case-studies-content container max-w-7xl mx-auto px-4 sm:px-6 pb-24">
      
      <!-- In-Flow Breadcrumb Header -->
      <div class="flex items-center justify-between mb-8 pb-4 border-b border-[var(--border-muted)]">
        <button 
          @click="emit('back')" 
          class="inline-flex items-center gap-2 text-xs font-semibold px-3.5 py-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-muted)] text-[var(--text-primary)] hover:border-[var(--brand-teal-light)]/60 transition-all cursor-pointer shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          <span>Back to Home</span>
        </button>

        <span class="text-xs font-bold text-[var(--brand-teal-light)] bg-[var(--brand-teal)]/10 px-3 py-1 rounded-full border border-[var(--brand-teal)]/30">
          {{ allCaseStudies.length }} Flagship Engineering Projects
        </span>
      </div>

      <!-- Page Header -->
      <div class="text-center max-w-3xl mx-auto mb-10">
        <div class="badge badge-purple mb-4">Enterprise Engineering Portfolio</div>
        <h1 class="all-cases-h1 font-black text-[var(--text-primary)] tracking-tight mb-4">
          Flagship Case Studies &amp; <span class="text-gradient">Architectures</span>
        </h1>
        <p class="lead max-w-2xl mx-auto text-sm sm:text-base text-[var(--text-secondary)]">
          Real-world production platforms architected by Fabneon Technologies Limited — delivering sub-second ERP queries, dynamic DRM video streaming, and automated institutional governance.
        </p>
      </div>

      <!-- Filters & Search Controls -->
      <div class="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
        <!-- Category Filter Pills -->
        <div class="flex flex-wrap items-center justify-center md:justify-start gap-2 w-full md:w-auto">
          <button 
            v-for="cat in categories" 
            :key="cat"
            @click="selectedCategory = cat"
            :class="[
              'cat-filter-btn px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap',
              selectedCategory === cat ? 'active' : ''
            ]"
          >
            {{ cat }}
          </button>
        </div>

        <!-- Search Input -->
        <div class="relative w-full md:w-72">
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="Search ERP, DRM, BTEB, SaaS..."
            class="case-search-input w-full px-4 py-2 pl-9 rounded-xl text-xs focus:outline-none transition-colors"
          />
          <svg class="absolute left-3 top-2.5 w-3.5 h-3.5 text-[var(--text-muted)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <!-- Case Studies 3-Column Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="study in filteredStudies" 
          :key="study.id" 
          class="all-case-card rounded-2xl md:rounded-3xl flex flex-col justify-between p-6 transition-all duration-300 group cursor-pointer shadow-lg"
          @click="handleSelectStudy(study.id)"
        >
          <div>
            <!-- Thumbnail Image -->
            <div class="relative rounded-xl overflow-hidden aspect-[16/10] bg-black/40 border border-black/5 dark:border-white/10 mb-4 group-hover:border-[var(--brand-teal-light)]/40 transition-colors">
              <img 
                :src="study.image" 
                :alt="study.title + ' — Case Study by Fabneon Technologies Limited'" 
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                loading="lazy" 
              />
              <div class="absolute top-2.5 left-2.5">
                <span class="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-black/85 backdrop-blur-md text-[var(--brand-teal-light)] border border-[var(--brand-teal-light)]/40 shadow-md">
                  {{ study.badge }}
                </span>
              </div>
            </div>

            <!-- Client & Year -->
            <div class="flex items-center justify-between text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
              <span class="line-clamp-1 max-w-[200px]">{{ study.client }}</span>
              <span>{{ study.year }}</span>
            </div>

            <!-- Title -->
            <h3 class="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--brand-teal-light)] transition-colors mb-2 leading-snug line-clamp-2">
              {{ study.title }}
            </h3>

            <!-- Short Description -->
            <p class="text-xs text-[var(--text-secondary)] leading-relaxed mb-4 line-clamp-2">
              {{ study.shortDesc }}
            </p>

            <!-- Key Metric Pills -->
            <div class="flex flex-wrap gap-1.5 mb-5">
              <span 
                v-for="(hl, i) in study.highlights.slice(0, 2)" 
                :key="i"
                class="case-study-metric-pill inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-semibold"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-[var(--brand-teal)]"></span>
                {{ hl }}
              </span>
            </div>

            <!-- Architecture Stack Badges -->
            <div v-if="study.architecture?.stack" class="flex flex-wrap gap-1 mb-5">
              <span 
                v-for="tech in study.architecture.stack.slice(0, 3)" 
                :key="tech"
                class="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--bg-tertiary)] border border-[var(--border-muted)] text-[var(--text-secondary)]"
              >
                {{ tech }}
              </span>
            </div>
          </div>

          <!-- Card Action Footer -->
          <div class="pt-4 border-t border-[var(--border-muted)] flex items-center justify-between gap-2 mt-auto">
            <button 
              class="btn-case-detail inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white transition-all cursor-pointer shadow-md"
              @click.stop="handleSelectStudy(study.id)"
            >
              <span>View Full Case Study</span>
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

      <!-- No Results State -->
      <div v-if="filteredStudies.length === 0" class="text-center py-16">
        <p class="text-sm text-[var(--text-muted)] mb-4">No case studies found matching "{{ searchQuery }}".</p>
        <button 
          @click="searchQuery = ''; selectedCategory = 'All'" 
          class="px-4 py-2 text-xs font-semibold rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-muted)] hover:border-[var(--brand-teal)] transition-all cursor-pointer"
        >
          Reset Filters
        </button>
      </div>

      <!-- Bottom Enterprise CTA Banner -->
      <div class="mt-20 p-8 sm:p-12 rounded-3xl bg-[var(--bg-secondary)] border border-[var(--border-muted)] text-center shadow-xl">
        <div class="max-w-2xl mx-auto">
          <div class="badge badge-teal mb-3">Enterprise Engineering Consultation</div>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] mb-3">Architecting Your Next Flagship Platform</h2>
          <p class="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
            Fabneon Technologies Limited delivers battle-tested enterprise architectures, high-concurrency SaaS infrastructures, and bespoke automation workflows for regional and international enterprise leaders.
          </p>
          <a 
            href="#contact" 
            @click="emit('back')" 
            class="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-white shadow-lg cursor-pointer"
          >
            <span>Start an Enterprise Project</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </a>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.all-case-studies-view {
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

.case-studies-content {
  padding-top: clamp(7.5rem, 9vw + 1.5rem, 9.5rem) !important;
  padding-bottom: 6rem;
}

.all-cases-h1 {
  font-size: clamp(2rem, 3.5vw + 0.25rem, 3rem) !important;
  line-height: 1.18 !important;
}

.all-case-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-muted);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease;
}

.all-case-card:hover {
  border-color: rgba(0, 163, 196, 0.45);
  transform: translateY(-4px);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.25);
}

[data-theme='light'] .all-case-card {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.04);
}

[data-theme='light'] .all-case-card:hover {
  border-color: #00A3C4;
  box-shadow: 0 12px 30px rgba(0, 163, 196, 0.12);
}

.cat-filter-btn {
  background: var(--bg-secondary);
  color: var(--text-secondary);
  border: 1px solid var(--border-muted);
}

.cat-filter-btn:hover {
  color: var(--text-primary);
  border-color: var(--brand-teal-light);
}

.cat-filter-btn.active {
  background: linear-gradient(135deg, #00A3C4 0%, #4B1A7F 100%);
  color: #FFFFFF !important;
  border-color: transparent;
  box-shadow: 0 2px 10px rgba(0, 163, 196, 0.3);
}

[data-theme='light'] .cat-filter-btn {
  background: #FFFFFF;
  color: #475569;
  border: 1px solid #E2E8F0;
}

[data-theme='light'] .cat-filter-btn:hover {
  color: #0F172A;
  border-color: #00A3C4;
}

[data-theme='light'] .cat-filter-btn.active {
  background: linear-gradient(135deg, #00A3C4 0%, #4B1A7F 100%);
  color: #FFFFFF !important;
  border-color: transparent;
}

.case-search-input {
  background: var(--bg-secondary);
  border: 1px solid var(--border-muted);
  color: var(--text-primary);
}

.case-search-input:focus {
  border-color: var(--brand-teal-light);
}

[data-theme='light'] .case-search-input {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  color: #0F172A;
}

[data-theme='light'] .case-search-input:focus {
  border-color: #00A3C4;
}

.case-study-metric-pill {
  background: rgba(0, 163, 196, 0.1);
  color: var(--brand-teal-light);
  border: 1px solid rgba(0, 163, 196, 0.2);
}

[data-theme='light'] .case-study-metric-pill {
  background: #F0FDF4;
  color: #065F46;
  border: 1px solid #BBF7D0;
}

.btn-case-detail {
  background: linear-gradient(135deg, #00A3C4 0%, #4B1A7F 100%);
  color: #FFFFFF !important;
  border: none;
}

.btn-case-detail:hover {
  background: linear-gradient(135deg, #00BFDF 0%, #6025A5 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 14px rgba(0, 163, 196, 0.35);
}
</style>
