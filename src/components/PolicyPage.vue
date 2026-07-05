<template>
  <div class="policy-page">
    <div class="policy-header">
      <div class="container max-w-4xl mx-auto relative z-10">
        <div class="header-top">
          <button @click="$emit('back')" class="btn btn-outline-purple back-btn magnetic">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            <span class="font-medium">Back to Home</span>
          </button>
        </div>
        
        <div class="header-title">
          <div class="badge badge-teal mb-4">Legal Document</div>
          <h1 class="display title-text">{{ title }}</h1>
          <p class="last-updated">Last Updated: <span>{{ lastUpdated }}</span></p>
        </div>
      </div>
    </div>

    <div class="container max-w-4xl mx-auto relative z-10 content-wrapper">
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
}

.policy-header {
  padding-top: 140px;
  padding-bottom: 80px;
  background: var(--bg-overlay);
}

.header-top {
  margin-bottom: 40px;
  display: flex;
}

.back-btn {
  border-radius: 50px;
  padding: 10px 24px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.header-title {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.title-text {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.last-updated {
  color: var(--text-secondary);
  font-size: 1.1rem;
}

.last-updated span {
  color: var(--text-primary);
  font-weight: 500;
}

.content-wrapper {
  margin-top: -40px;
  padding-bottom: 120px;
}

.policy-card {
  background: var(--bg-secondary);
  padding: 60px;
  border-radius: var(--radius-2xl);
  border: 1px solid var(--border-muted);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
}

@media (max-width: 768px) {
  .policy-card {
    padding: 30px;
  }
}

.prose :deep(h2) {
  color: var(--text-primary);
  font-size: 1.75rem;
  font-weight: 700;
  margin-top: 3rem;
  margin-bottom: 1.25rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-muted);
}

.prose :deep(h2:first-child) {
  margin-top: 0;
}

.prose :deep(h3) {
  color: var(--text-primary);
  font-size: 1.35rem;
  font-weight: 600;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.prose :deep(p) {
  color: var(--text-secondary);
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
}

.prose :deep(ul) {
  list-style-type: disc;
  padding-left: 2rem;
  margin-bottom: 2rem;
  color: var(--text-secondary);
  font-size: 1.1rem;
  line-height: 1.8;
}

.prose :deep(li) {
  margin-bottom: 0.75rem;
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
