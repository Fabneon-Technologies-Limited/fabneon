<script setup lang="ts">
import { ref } from 'vue';
import { type BlogPost } from '../data/blogPosts';

const props = defineProps<{
  post: BlogPost;
  allPosts?: BlogPost[];
  theme?: 'light' | 'dark';
}>();

const emit = defineEmits<{
  (e: 'back'): void;
  (e: 'select-post', post: BlogPost): void;
  (e: 'toggle-theme'): void;
}>();

const copied = ref(false);

const copyArticleUrl = () => {
  navigator.clipboard.writeText(window.location.href);
  copied.value = true;
  setTimeout(() => (copied.value = false), 2500);
};

const handleBack = () => {
  emit('back');
};

const handleSelectOther = (otherPost: BlogPost) => {
  emit('select-post', otherPost);
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>

<template>
  <div class="blog-detail-view min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
    
    <!-- Unified Top Navigation Bar (Solid Opaque, Zero Transparency / Bleed-through) -->
    <header class="blog-top-bar">
      <div class="container max-w-5xl mx-auto px-4 flex items-center justify-between">
        
        <!-- Left: Logo & Back Button -->
        <div class="flex items-center gap-3">
          <a href="#home" @click.prevent="handleBack" class="flex items-center gap-2 cursor-pointer mr-1">
            <img src="/fabneon_logo_only.png" alt="Fabneon Technologies Limited" class="h-7 w-auto" />
            <span class="font-bold text-sm tracking-tight text-[var(--text-primary)] hidden sm:inline">Fabneon</span>
          </a>

          <button 
            @click="handleBack" 
            class="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-muted)] text-[var(--text-primary)] hover:border-[var(--brand-teal-light)]/60 transition-all cursor-pointer shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            <span>All Articles</span>
          </button>
        </div>

        <!-- Center: Truncated Article Title -->
        <div class="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-muted)] text-xs font-semibold text-[var(--text-primary)] shadow-sm">
          <span class="w-1.5 h-1.5 rounded-full bg-[var(--brand-teal-light)]"></span>
          <span class="truncate max-w-[280px]">{{ post.title }}</span>
        </div>

        <!-- Right: Actions -->
        <div class="flex items-center gap-2.5">
          <!-- Theme Toggle -->
          <button 
            v-if="theme" 
            class="p-2 rounded-xl text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer" 
            @click="emit('toggle-theme')" 
            :title="theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
            aria-label="Toggle Theme"
          >
            <svg v-if="theme === 'dark'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
          </button>

          <!-- Share Link -->
          <button 
            @click="copyArticleUrl" 
            class="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-muted)] text-[var(--text-primary)] hover:border-[var(--brand-teal-light)]/40 transition-all cursor-pointer shadow-sm"
          >
            <svg v-if="!copied" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-400"><polyline points="20 6 9 17 4 12"/></svg>
            <span class="hidden sm:inline">{{ copied ? 'Copied!' : 'Share' }}</span>
          </button>

          <!-- Start Project CTA -->
          <a 
            href="#contact" 
            @click="handleBack" 
            class="inline-flex items-center gap-1 text-xs font-bold px-3.5 py-1.5 rounded-xl text-white shadow-md cursor-pointer"
            style="background: linear-gradient(135deg, #00A3C4 0%, #4B1A7F 100%);"
          >
            <span>Start Project</span>
          </a>
        </div>

      </div>
    </header>

    <!-- Main Content Container (Generous Breathing Room) -->
    <div class="container max-w-4xl mx-auto px-4 sm:px-6 pt-32 md:pt-36 pb-24">
      
      <!-- Article Header -->
      <header class="mb-10 text-left">
        <!-- Category & Read Time -->
        <div class="flex flex-wrap items-center gap-2 mb-3.5 text-xs">
          <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[var(--brand-teal)]/15 text-[var(--brand-teal-light)] border border-[var(--brand-teal)]/30">
            {{ post.category }}
          </span>
          <span class="text-[var(--text-muted)] flex items-center gap-1.5">
            <span>{{ post.publishDate }}</span>
            <span>•</span>
            <span>{{ post.readTime }}</span>
          </span>
        </div>

        <!-- Headline -->
        <h1 class="text-2xl sm:text-3xl md:text-5xl font-black text-[var(--text-primary)] tracking-tight leading-[1.18] mb-4">
          {{ post.title }}
        </h1>

        <!-- Subtitle -->
        <p class="text-base sm:text-lg md:text-xl text-[var(--text-secondary)] font-normal leading-relaxed mb-8">
          {{ post.subtitle }}
        </p>

        <!-- Author Byline Card -->
        <div class="inline-flex items-center gap-3.5 p-3.5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-muted)] shadow-md">
          <img :src="post.author.avatar" :alt="post.author.name" class="w-10 h-10 rounded-full bg-white/10 p-1" />
          <div>
            <h4 class="text-xs font-bold text-[var(--text-primary)] m-0 leading-tight">{{ post.author.name }}</h4>
            <p class="text-[10px] text-[var(--text-muted)] m-0 mt-0.5">{{ post.author.role }}</p>
          </div>
        </div>
      </header>

      <!-- Featured Visual -->
      <div class="relative rounded-2xl md:rounded-3xl overflow-hidden aspect-video md:aspect-[16/9] max-h-[460px] mb-12 border border-[var(--border-muted)] shadow-2xl bg-black/60">
        <img :src="post.featuredImage" :alt="post.title" class="w-full h-full object-cover" />
      </div>

      <!-- Article Body (HTML rendered with spacious editorial typography) -->
      <article class="blog-prose leading-relaxed text-base text-[var(--text-secondary)] text-left space-y-6">
        <div v-html="post.content"></div>
      </article>

      <!-- Tags Bottom -->
      <div class="mt-14 pt-6 border-t border-[var(--border-muted)] text-left">
        <h4 class="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3">Related Topics:</h4>
        <div class="flex flex-wrap gap-2">
          <span 
            v-for="tag in post.tags" 
            :key="tag"
            class="text-xs font-medium px-3 py-1.5 rounded-xl bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-muted)]"
          >
            #{{ tag }}
          </span>
        </div>
      </div>

      <!-- CTA Banner -->
      <div class="mt-16 p-8 sm:p-10 rounded-3xl bg-[var(--bg-secondary)] border border-[var(--border-muted)] text-center shadow-xl">
        <div class="max-w-xl mx-auto">
          <h3 class="text-xl sm:text-2xl font-black text-[var(--text-primary)] mb-2">Build Your Next Mission-Critical Platform</h3>
          <p class="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
            Fabneon Technologies Limited engineers high-scale cloud SaaS, custom ERP systems, and applied AI automation for enterprise leaders.
          </p>
          <a href="#contact" @click="handleBack" class="btn btn-sm text-xs font-bold px-6 py-2.5 rounded-xl text-white shadow-md inline-flex items-center gap-2" style="background: linear-gradient(135deg, #00A3C4 0%, #4B1A7F 100%);">
            <span>Start a Project with Fabneon</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </a>
        </div>
      </div>

      <!-- More Articles Grid -->
      <div v-if="allPosts && allPosts.length > 1" class="mt-16 pt-12 border-t border-[var(--border-muted)] text-left">
        <h3 class="text-lg sm:text-xl font-bold text-[var(--text-primary)] mb-6">More from the Engineering Desk</h3>
        <div class="grid sm:grid-cols-2 gap-4">
          <div 
            v-for="other in allPosts.filter(p => p.id !== post.id).slice(0, 2)" 
            :key="other.id"
            @click="handleSelectOther(other)"
            class="p-5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-muted)] hover:border-[var(--brand-teal-light)]/40 hover:-translate-y-1 transition-all cursor-pointer group flex flex-col justify-between shadow-md"
          >
            <div>
              <span class="text-[10px] font-bold uppercase text-[var(--brand-teal-light)] mb-1 block">{{ other.category }}</span>
              <h4 class="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--brand-teal-light)] transition-colors leading-snug mb-2">{{ other.title }}</h4>
            </div>
            <span class="text-xs text-[var(--text-muted)] font-medium mt-3 flex items-center gap-1 group-hover:text-[var(--text-primary)] transition-colors">
              <span>{{ other.readTime }}</span>
              <span>•</span>
              <span>Read Article →</span>
            </span>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<style scoped>
.blog-detail-view {
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

.blog-top-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 68px;
  background: #0E0F12 !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.7);
  z-index: 99999;
  display: flex;
  align-items: center;
}

[data-theme='light'] .blog-top-bar {
  background: #FFFFFF !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
}

:deep(.blog-prose h2) {
  font-size: 1.65rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-top: 2.5rem;
  margin-bottom: 1.25rem;
  line-height: 1.3;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border-muted);
}

:deep(.blog-prose h3) {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-top: 2rem;
  margin-bottom: 0.85rem;
  line-height: 1.35;
}

:deep(.blog-prose h4) {
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--brand-teal-light);
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}

:deep(.blog-prose p) {
  margin-bottom: 1.5rem;
  line-height: 1.85;
  color: var(--text-secondary);
  font-size: 1rem;
}

:deep(.blog-prose ul),
:deep(.blog-prose ol) {
  margin-bottom: 1.75rem;
  padding-left: 1.5rem;
  color: var(--text-secondary);
}

:deep(.blog-prose ul) {
  list-style-type: disc;
}

:deep(.blog-prose ol) {
  list-style-type: decimal;
}

:deep(.blog-prose li) {
  margin-bottom: 0.6rem;
  line-height: 1.75;
}

:deep(.blog-prose strong) {
  color: var(--text-primary);
  font-weight: 700;
}

:deep(.blog-prose a) {
  color: var(--brand-teal-light);
  text-decoration: underline;
  transition: opacity 0.2s ease;
}

:deep(.blog-prose a:hover) {
  opacity: 0.85;
}
</style>
