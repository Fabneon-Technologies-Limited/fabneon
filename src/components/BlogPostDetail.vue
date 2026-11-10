<script setup lang="ts">
import { ref } from 'vue';
import { type BlogPost } from '../data/blogPosts';

const props = defineProps<{
  post: BlogPost;
  allPosts?: BlogPost[];
}>();

const emit = defineEmits<{
  (e: 'back'): void;
  (e: 'select-post', post: BlogPost): void;
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
  <div class="blog-detail-view min-h-screen pt-28 pb-24 bg-[var(--bg-primary)] text-[var(--text-primary)]">
    <div class="container max-w-4xl mx-auto px-4 sm:px-6">

      <!-- Top Navigation & Breadcrumbs -->
      <div class="flex items-center justify-between gap-4 mb-8">
        <button 
          @click="handleBack"
          class="inline-flex items-center gap-2 text-xs font-bold text-[var(--text-secondary)] hover:text-white bg-[var(--bg-secondary)] border border-[var(--border-muted)] px-4 py-2 rounded-xl transition-all cursor-pointer hover:border-[var(--brand-teal)]/40"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          <span>Back to Articles</span>
        </button>

        <button 
          @click="copyArticleUrl"
          class="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-secondary)] hover:text-white bg-[var(--bg-secondary)] border border-[var(--border-muted)] px-3 py-2 rounded-xl transition-all cursor-pointer"
        >
          <svg v-if="!copied" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-400"><polyline points="20 6 9 17 4 12"/></svg>
          <span>{{ copied ? 'Link Copied!' : 'Share' }}</span>
        </button>
      </div>

      <!-- Article Header -->
      <header class="mb-10 text-left">
        <div class="flex flex-wrap items-center gap-2 mb-4">
          <span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[var(--brand-teal)]/15 text-[var(--brand-teal)] border border-[var(--brand-teal)]/30">
            {{ post.category }}
          </span>
          <span class="text-xs text-[var(--text-muted)] flex items-center gap-1.5">
            <span>{{ post.publishDate }}</span>
            <span>•</span>
            <span>{{ post.readTime }}</span>
          </span>
        </div>

        <h1 class="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.2] mb-4">
          {{ post.title }}
        </h1>

        <p class="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed mb-6 font-medium">
          {{ post.subtitle }}
        </p>

        <!-- Author Byline -->
        <div class="flex items-center gap-3.5 p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-muted)]">
          <img :src="post.author.avatar" :alt="post.author.name" class="w-10 h-10 rounded-full bg-white/10 p-1" />
          <div>
            <h4 class="text-sm font-bold text-white m-0">{{ post.author.name }}</h4>
            <p class="text-xs text-[var(--text-muted)] m-0">{{ post.author.role }}</p>
          </div>
        </div>
      </header>

      <!-- Featured Image -->
      <div class="relative rounded-3xl overflow-hidden aspect-[16/9] mb-12 border border-white/10 shadow-2xl bg-black/60">
        <img :src="post.featuredImage" :alt="post.title" class="w-full h-full object-cover" />
      </div>

      <!-- Article Body (HTML rendered with dark typography) -->
      <article class="blog-prose leading-relaxed text-base text-[var(--text-secondary)] text-left space-y-6">
        <div v-html="post.content"></div>
      </article>

      <!-- Tags Bottom -->
      <div class="mt-12 pt-6 border-t border-[var(--border-muted)] text-left">
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
      <div class="mt-16 p-8 rounded-3xl bg-gradient-to-br from-[var(--brand-purple)]/20 via-[var(--bg-secondary)] to-[var(--bg-secondary)] border border-[var(--brand-purple)]/30 text-center shadow-2xl">
        <div class="max-w-xl mx-auto">
          <h3 class="text-2xl font-bold text-white mb-2">Build Your Next Mission-Critical Platform</h3>
          <p class="text-sm text-[var(--text-secondary)] mb-6">
            Fabneon Technologies Limited engineers high-scale cloud SaaS, custom ERP systems, and applied AI automation for global industry leaders.
          </p>
          <a href="#contact" @click="handleBack" class="btn btn-primary btn-md">
            <span>Start a Project with Fabneon</span>
          </a>
        </div>
      </div>

      <!-- More Articles -->
      <div v-if="allPosts && allPosts.length > 1" class="mt-16 pt-12 border-t border-[var(--border-muted)] text-left">
        <h3 class="text-xl font-bold text-white mb-6">More from the Engineering Desk</h3>
        <div class="grid sm:grid-cols-2 gap-4">
          <div 
            v-for="other in allPosts.filter(p => p.id !== post.id).slice(0, 2)" 
            :key="other.id"
            @click="handleSelectOther(other)"
            class="p-5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-muted)] hover:border-[var(--brand-teal)]/40 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <span class="text-[10px] font-bold uppercase text-[var(--brand-teal)] mb-1 block">{{ other.category }}</span>
              <h4 class="text-sm font-bold text-white group-hover:text-[var(--brand-teal)] transition-colors leading-snug mb-2">{{ other.title }}</h4>
            </div>
            <span class="text-xs text-[var(--text-muted)] font-medium mt-3">{{ other.readTime }} • Read Article →</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
:deep(.blog-prose h2) {
  font-size: 1.75rem;
  font-weight: 800;
  color: #ffffff;
  margin-top: 2rem;
  margin-bottom: 1rem;
  line-height: 1.3;
}
:deep(.blog-prose h3) {
  font-size: 1.35rem;
  font-weight: 700;
  color: #ffffff;
  margin-top: 1.75rem;
  margin-bottom: 0.75rem;
  line-height: 1.35;
}
:deep(.blog-prose h4) {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--brand-teal, #2dd4bf);
  margin-top: 1.25rem;
  margin-bottom: 0.5rem;
}
:deep(.blog-prose p) {
  margin-bottom: 1.25rem;
  line-height: 1.8;
  color: var(--text-secondary);
}
:deep(.blog-prose ul),
:deep(.blog-prose ol) {
  margin-bottom: 1.5rem;
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
  margin-bottom: 0.5rem;
  line-height: 1.7;
}
:deep(.blog-prose strong) {
  color: #ffffff;
}
:deep(.blog-prose a) {
  color: var(--brand-teal, #2dd4bf);
  text-decoration: underline;
}
</style>

