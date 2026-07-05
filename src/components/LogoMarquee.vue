<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  items: { name: string; url: string }[];
  direction?: 'left' | 'right';
  speed?: 'slow' | 'normal' | 'fast';
  showNames?: boolean;
}>();

const animationClass = computed(() => {
  if (props.direction === 'right') {
    return props.speed === 'fast' ? 'marquee-right-fast' : props.speed === 'slow' ? 'marquee-right-slow' : 'marquee-right';
  }
  return props.speed === 'fast' ? 'marquee-fast' : props.speed === 'slow' ? 'marquee-slow' : 'marquee-normal';
});
</script>

<template>
  <div class="logo-marquee-wrapper">
    <div class="logo-marquee-track" :class="animationClass">
      <!-- Original set -->
      <div v-for="(item, index) in items" :key="`orig-${index}`" class="logo-marquee-item">
        <div class="logo-img-wrapper">
          <img :src="item.url" :alt="item.name" :title="item.name" loading="lazy" />
        </div>
        <span v-if="showNames" class="logo-name">{{ item.name }}</span>
      </div>
      <!-- Duplicated set for infinite loop -->
      <div v-for="(item, index) in items" :key="`dup-${index}`" class="logo-marquee-item">
        <div class="logo-img-wrapper">
          <img :src="item.url" :alt="item.name" :title="item.name" loading="lazy" />
        </div>
        <span v-if="showNames" class="logo-name">{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.logo-marquee-wrapper {
  overflow: hidden;
  width: 100%;
  position: relative;
  /* Road trail styling */
  background: linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(255,255,255,0.03) 20%, rgba(255,255,255,0.03) 80%, rgba(0,0,0,0) 100%);
  border-top: 1px dashed rgba(255,255,255,0.05);
  border-bottom: 1px dashed rgba(255,255,255,0.05);
  /* Edge fading for the whole track */
  mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
  padding: var(--space-xl) 0;
}

.logo-marquee-track {
  display: flex;
  align-items: center;
  gap: 4rem; /* Spacing between logos */
  width: max-content;
}

.logo-marquee-item {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 160px;
  transition: all var(--transition-base);
}

.logo-img-wrapper {
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-marquee-item:hover {
  transform: scale(1.1);
  filter: drop-shadow(0 0 8px rgba(255,255,255,0.1));
}

.logo-marquee-item:hover .logo-name {
  color: var(--text-primary);
}

.logo-marquee-item img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.logo-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-muted);
  text-align: center;
  transition: color var(--transition-base);
}

/* Animations */
.marquee-normal {
  animation: marquee-left 40s linear infinite;
}
.marquee-slow {
  animation: marquee-left 60s linear infinite;
}
.marquee-fast {
  animation: marquee-left 25s linear infinite;
}

.marquee-right {
  animation: marquee-right 40s linear infinite;
}
.marquee-right-slow {
  animation: marquee-right 60s linear infinite;
}
.marquee-right-fast {
  animation: marquee-right 25s linear infinite;
}

.logo-marquee-wrapper:hover .logo-marquee-track {
  animation-play-state: paused;
}

@keyframes marquee-left {
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(-50% - 2rem)); } /* -50% width minus half of the gap to perfectly loop */
}

@keyframes marquee-right {
  0% { transform: translateX(calc(-50% - 2rem)); }
  100% { transform: translateX(0); }
}

@media (max-width: 768px) {
  .logo-marquee-item {
    width: 120px;
    height: 40px;
  }
  .logo-marquee-track {
    gap: 2.5rem;
  }
  @keyframes marquee-left {
    0% { transform: translateX(0); }
    100% { transform: translateX(calc(-50% - 1.25rem)); }
  }
  @keyframes marquee-right {
    0% { transform: translateX(calc(-50% - 1.25rem)); }
    100% { transform: translateX(0); }
  }
}
</style>
