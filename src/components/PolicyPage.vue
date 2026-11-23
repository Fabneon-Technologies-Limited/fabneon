<template>
  <div class="policy-page">
    <div class="policy-header pb-16">
      <div class="container max-w-4xl mx-auto px-4 relative z-10">
        <!-- In-flow back breadcrumb -->
        <div class="mb-8 pb-4 border-b border-[var(--border-muted)] flex items-center justify-between">
          <button 
            @click="$emit('back')" 
            class="inline-flex items-center gap-2 text-xs font-semibold px-3.5 py-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-muted)] text-[var(--text-primary)] hover:border-[var(--brand-teal-light)]/60 transition-all cursor-pointer shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            <span>Back to Home</span>
          </button>
          <span class="text-xs font-bold uppercase tracking-wider text-[var(--brand-teal-light)]">Legal &amp; Compliance</span>
        </div>

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

.policy-header {
  padding-top: clamp(7.5rem, 9vw + 1.5rem, 9.5rem) !important;
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
