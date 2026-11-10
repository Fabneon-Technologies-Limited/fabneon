<template>
  <div class="policy-page">
    
    <!-- Unified Fixed Top Navigation Bar -->
    <header class="policy-top-bar">
      <div class="container max-w-5xl mx-auto px-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <a href="#home" @click.prevent="$emit('back')" class="flex items-center gap-2 cursor-pointer mr-1">
            <img src="/fabneon_logo_only.png" alt="Fabneon Technologies Limited" class="h-7 w-auto" />
            <span class="font-bold text-sm tracking-tight text-white hidden sm:inline">Fabneon</span>
          </a>

          <button 
            @click="$emit('back')" 
            class="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl bg-white/[0.06] border border-white/10 text-white/90 hover:text-white hover:bg-white/[0.12] hover:border-[var(--brand-teal-light)]/40 transition-all cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            <span>Back to Home</span>
          </button>
        </div>

        <div class="text-xs font-bold uppercase tracking-wider text-[var(--brand-teal-light)] hidden sm:block">
          Legal & Compliance
        </div>

        <a 
          href="#contact" 
          @click="$emit('back')" 
          class="inline-flex items-center gap-1 text-xs font-bold px-3.5 py-1.5 rounded-xl text-white shadow-md cursor-pointer"
          style="background: linear-gradient(135deg, #00A3C4 0%, #4B1A7F 100%);"
        >
          <span>Contact Legal</span>
        </a>
      </div>
    </header>

    <div class="policy-header pt-28 md:pt-32 pb-16">
      <div class="container max-w-4xl mx-auto px-4 relative z-10">
        <div class="header-title">
          <div class="badge badge-teal mb-4">Official Document</div>
          <h1 class="display title-text">{{ title }}</h1>
          <p class="last-updated text-xs sm:text-sm text-[var(--text-secondary)]">Last Updated: <span class="text-white font-semibold">{{ lastUpdated }}</span></p>
        </div>
      </div>
    </div>

    <div class="container max-w-4xl mx-auto px-4 relative z-10 content-wrapper">
      <div class="policy-card">
        <div class="prose">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  lastUpdated: string;
}>();

defineEmits(['back']);
</script>

<style scoped>
.policy-page {
  min-height: 100vh;
  background: var(--bg-primary);
  position: relative;
}

.policy-top-bar {
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

[data-theme='light'] .policy-top-bar {
  background: rgba(255, 255, 255, 0.96);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.policy-header {
  background: var(--bg-overlay);
}

.header-title {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.title-text {
  font-size: clamp(2.2rem, 5vw, 4rem);
  font-weight: 900;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
  letter-spacing: -0.02em;
}

.content-wrapper {
  margin-top: -30px;
  padding-bottom: 120px;
}

.policy-card {
  background: var(--bg-secondary);
  padding: 48px;
  border-radius: var(--radius-2xl);
  border: 1px solid var(--border-muted);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
}

@media (max-width: 768px) {
  .policy-card {
    padding: 24px;
  }
}

.prose :deep(h2) {
  color: var(--text-primary);
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--border-muted);
}

.prose :deep(h2:first-child) {
  margin-top: 0;
}

.prose :deep(h3) {
  color: var(--text-primary);
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 1.75rem;
  margin-bottom: 0.75rem;
}

.prose :deep(p) {
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.8;
  margin-bottom: 1.25rem;
}

.prose :deep(ul) {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin-bottom: 1.5rem;
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.75;
}

.prose :deep(li) {
  margin-bottom: 0.5rem;
}

.prose :deep(li strong) {
  color: var(--text-primary);
  font-weight: 600;
}

.prose :deep(a) {
  color: var(--brand-teal);
  text-decoration: none;
  font-weight: 500;
  border-bottom: 1px solid transparent;
  transition: all 0.2s ease;
}

.prose :deep(a:hover) {
  color: var(--brand-teal-light);
  border-bottom-color: var(--brand-teal-light);
}
</style>
