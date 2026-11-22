<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  items: { name: string; url: string }[];
  direction?: 'left' | 'right';
  speed?: 'slow' | 'normal' | 'fast';
  showNames?: boolean;
}>(), {
  direction: 'left',
  speed: 'normal',
  showNames: false
});

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
      <!-- First Group -->
      <div class="logo-marquee-group">
        <div v-for="(item, index) in items" :key="`g1-${index}`" class="logo-marquee-item">
          <div class="logo-img-wrapper">
            <img 
              :src="item.url" 
              :alt="item.name + ' — Technology Partner of Fabneon Technologies Limited'" 
              :title="item.name" 
              loading="lazy"
              decoding="async" 
              width="48"
              height="48"
            />
          </div>
          <span v-if="showNames" class="logo-name">{{ item.name }}</span>
        </div>
      </div>
      <!-- Duplicate Group for Seamless 50% Infinite Loop -->
      <div class="logo-marquee-group" aria-hidden="true">
        <div v-for="(item, index) in items" :key="`g2-${index}`" class="logo-marquee-item">
          <div class="logo-img-wrapper">
            <img 
              :src="item.url" 
              :alt="item.name + ' — Technology Partner of Fabneon Technologies Limited'" 
              :title="item.name" 
              loading="lazy"
              decoding="async" 
              width="48"
              height="48"
            />
          </div>
          <span v-if="showNames" class="logo-name">{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.logo-marquee-wrapper {
  overflow: hidden;
  width: 100%;
  position: relative;
  isolation: isolate;
  contain: content;
  /* Road trail subtle contrast */
  background: linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(255,255,255,0.02) 20%, rgba(255,255,255,0.02) 80%, rgba(0,0,0,0) 100%);
  border-top: 1px dashed rgba(255,255,255,0.05);
  border-bottom: 1px dashed rgba(255,255,255,0.05);
  padding: 1.25rem 0;
}

/* Edge fading gradient overlays - Hardware accelerated, replaces expensive mask-image */
.logo-marquee-wrapper::before,
.logo-marquee-wrapper::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100px;
  z-index: 5;
  pointer-events: none;
}

.logo-marquee-wrapper::before {
  left: 0;
  background: linear-gradient(to right, var(--bg-primary, #0B0C0E) 0%, rgba(11, 12, 14, 0.8) 40%, transparent 100%);
}

.logo-marquee-wrapper::after {
  right: 0;
  background: linear-gradient(to left, var(--bg-primary, #0B0C0E) 0%, rgba(11, 12, 14, 0.8) 40%, transparent 100%);
}

.logo-marquee-track {
  display: flex;
  width: max-content;
  will-change: transform;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
}

.logo-marquee-group {
  display: flex;
  align-items: center;
  gap: 3.5rem;
  padding-right: 3.5rem;
  flex-shrink: 0;
}

.logo-marquee-item {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 120px;
}

.logo-img-wrapper {
  height: 38px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-marquee-item img {
  max-width: 100%;
  max-height: 34px;
  object-fit: contain;
  filter: grayscale(15%) opacity(0.85);
  transition: filter 0.2s ease, transform 0.2s ease;
  will-change: filter, transform;
}

.logo-marquee-item:hover img {
  filter: grayscale(0%) opacity(1);
  transform: scale(1.12);
}

.logo-name {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--text-muted);
  text-align: center;
  white-space: nowrap;
  transition: color 0.2s ease;
}

.logo-marquee-item:hover .logo-name {
  color: var(--text-primary);
}

/* Pause on hover */
.logo-marquee-wrapper:hover .logo-marquee-track {
  animation-play-state: paused;
}

/* Pure GPU-accelerated Keyframe Animations */
.marquee-normal {
  animation: marquee-left 35s linear infinite;
}
.marquee-slow {
  animation: marquee-left 55s linear infinite;
}
.marquee-fast {
  animation: marquee-left 22s linear infinite;
}

.marquee-right {
  animation: marquee-right 35s linear infinite;
}
.marquee-right-slow {
  animation: marquee-right 55s linear infinite;
}
.marquee-right-fast {
  animation: marquee-right 22s linear infinite;
}

@keyframes marquee-left {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-50%, 0, 0);
  }
}

@keyframes marquee-right {
  0% {
    transform: translate3d(-50%, 0, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}

@media (max-width: 768px) {
  .logo-marquee-wrapper {
    padding: 1rem 0;
  }
  .logo-marquee-wrapper::before,
  .logo-marquee-wrapper::after {
    width: 50px;
  }
  .logo-marquee-group {
    gap: 2.25rem;
    padding-right: 2.25rem;
  }
  .logo-marquee-item {
    width: 90px;
  }
  .logo-img-wrapper {
    height: 30px;
  }
  .logo-marquee-item img {
    max-height: 28px;
  }
}
</style>
