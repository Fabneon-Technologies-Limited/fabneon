<script setup lang="ts">
import { computed } from 'vue';
import BorderGlow from './BorderGlow.vue';

const props = defineProps<{
  items: { title: string; description: string; image: string; link: string }[];
  direction?: 'left' | 'right';
  speed?: 'slow' | 'normal' | 'fast';
}>();

const animationClass = computed(() => {
  const dir = props.direction === 'right' ? 'right' : 'left';
  const spd = props.speed || 'normal';
  return `marquee-${dir}-${spd}`;
});
</script>

<template>
  <div class="project-marquee-wrapper">
    <div class="project-marquee-track" :class="animationClass">
      <!-- Original set -->
      <div v-for="(item, index) in items" :key="`orig-${index}`" class="project-marquee-item">
        <BorderGlow className="h-full rounded-2xl overflow-hidden flex flex-col group text-left shadow-lg border border-[var(--border-muted)] bg-[var(--bg-primary)]" backgroundColor="var(--bg-secondary)" :animated="true">
          <div class="relative overflow-hidden h-[240px] w-full">
            <img :src="item.image" :alt="item.title" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
          </div>
          <div class="p-6 flex flex-col flex-grow bg-[var(--bg-primary)]">
            <h3 class="text-xl font-bold mb-2 text-[var(--text-primary)]">{{ item.title }}</h3>
            <p class="text-sm text-[var(--text-secondary)] flex-grow leading-relaxed">{{ item.description }}</p>
            <div class="mt-5 pt-5 border-t border-[var(--border-muted)] flex justify-between items-center">
              <a :href="item.link" class="text-[var(--brand-teal)] font-semibold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                View Project
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
        </BorderGlow>
      </div>
      <!-- Duplicated set for infinite loop -->
      <div v-for="(item, index) in items" :key="`dup-${index}`" class="project-marquee-item">
        <BorderGlow className="h-full rounded-2xl overflow-hidden flex flex-col group text-left shadow-lg border border-[var(--border-muted)] bg-[var(--bg-primary)]" backgroundColor="var(--bg-secondary)" :animated="true">
          <div class="relative overflow-hidden h-[240px] w-full">
            <img :src="item.image" :alt="item.title" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
          </div>
          <div class="p-6 flex flex-col flex-grow bg-[var(--bg-primary)]">
            <h3 class="text-xl font-bold mb-2 text-[var(--text-primary)]">{{ item.title }}</h3>
            <p class="text-sm text-[var(--text-secondary)] flex-grow leading-relaxed">{{ item.description }}</p>
            <div class="mt-5 pt-5 border-t border-[var(--border-muted)] flex justify-between items-center">
              <a :href="item.link" class="text-[var(--brand-teal)] font-semibold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                View Project
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
        </BorderGlow>
      </div>
    </div>
  </div>
</template>

<style scoped>
.project-marquee-wrapper {
  overflow: hidden;
  width: 100%;
  position: relative;
  mask-image: linear-gradient(to right, transparent, black 2%, black 98%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 2%, black 98%, transparent);
  padding: 2rem 0;
}

.project-marquee-track {
  display: flex;
  align-items: stretch;
  gap: 2rem; /* Spacing between cards */
  width: max-content;
}

.project-marquee-item {
  flex-shrink: 0;
  width: 400px;
  transform: translateY(0);
  transition: transform 0.3s ease;
}

.project-marquee-item:hover {
  transform: translateY(-8px);
}

/* Animations */
.marquee-left-normal { animation: p-marquee-left 60s linear infinite; }
.marquee-left-slow { animation: p-marquee-left 90s linear infinite; }
.marquee-left-fast { animation: p-marquee-left 40s linear infinite; }

.marquee-right-normal { animation: p-marquee-right 60s linear infinite; }
.marquee-right-slow { animation: p-marquee-right 90s linear infinite; }
.marquee-right-fast { animation: p-marquee-right 40s linear infinite; }

.project-marquee-wrapper:hover .project-marquee-track {
  animation-play-state: paused;
}

@keyframes p-marquee-left {
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(-50% - 1rem)); } /* -50% width minus half of the gap */
}

@keyframes p-marquee-right {
  0% { transform: translateX(calc(-50% - 1rem)); }
  100% { transform: translateX(0); }
}

@media (max-width: 768px) {
  .project-marquee-item {
    width: 320px;
  }
}
</style>
