<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';

const props = defineProps<{
  theme: 'light' | 'dark';
}>();

const isLoading = ref(true);
const loadingContainer = ref<HTMLElement | null>(null);

onMounted(() => {
  // Simulate loading sequence
  setTimeout(() => {
    if (loadingContainer.value) {
      gsap.to(loadingContainer.value, {
        opacity: 0,
        y: -50,
        duration: 0.8,
        ease: 'power3.inOut',
        onComplete: () => {
          isLoading.value = false;
        }
      });
    }
  }, 1200); // 1.2s loading animation
});
</script>

<template>
  <div 
    v-if="isLoading" 
    ref="loadingContainer"
    class="loading-screen"
  >
    <div class="loader-content">
      <img 
        :src="theme === 'dark' ? '/fabneon_logo_dark.png' : '/fabneon_logo_light.png'" 
        alt="Fabneon Loading" 
        class="loader-logo" 
      />
      <div class="loader-bar-container">
        <div class="loader-bar"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loading-screen {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background-color: var(--bg-primary);
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.loader-logo {
  height: 48px;
  width: auto;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.loader-bar-container {
  width: 200px;
  height: 4px;
  background: var(--border-muted);
  border-radius: 4px;
  overflow: hidden;
}

.loader-bar {
  height: 100%;
  width: 0%;
  background: var(--gradient-signature);
  animation: load 1.2s cubic-bezier(0.25, 1, 0.5, 1) forwards;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@keyframes load {
  0% { width: 0%; }
  100% { width: 100%; }
}
</style>
