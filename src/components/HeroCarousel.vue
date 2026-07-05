<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

const props = defineProps<{
  items?: { image?: string; img?: string; name?: string; role?: string; colorClass?: string }[]
}>()

const activeIndex = ref(0)
const autoPlayInterval = ref<any>(null)

const displayItems = computed(() => {
  if (!props.items || props.items.length === 0) {
    return [
      { image: '/assets/images/proj_erp.webp', name: 'ERP System', role: 'Enterprise' },
      { image: '/assets/images/proj_fintech.webp', name: 'Fintech', role: 'Finance' },
      { image: '/assets/images/card_growth.png', name: 'Growth', role: 'Analytics' }
    ] // Fallbacks
  }
  return props.items
})

const getSlideClass = (index: number) => {
  if (displayItems.value.length === 1) return 'active single'
  
  const total = displayItems.value.length
  
  if (index === activeIndex.value) return 'active'
  
  // Handle previous
  let prevIndex = activeIndex.value - 1
  if (prevIndex < 0) prevIndex = total - 1
  if (index === prevIndex) return 'prev'
  
  // Handle next
  let nextIndex = (activeIndex.value + 1) % total
  if (index === nextIndex) return 'next'
  
  // If we have more than 3 images, handle far positions or hidden
  return 'hidden'
}

const setActive = (index: number) => {
  if (displayItems.value.length <= 1) return
  activeIndex.value = index
  resetAutoPlay()
}

const nextSlide = () => {
  if (displayItems.value.length <= 1) return
  activeIndex.value = (activeIndex.value + 1) % displayItems.value.length
}

const startAutoPlay = () => {
  if (displayItems.value.length <= 1) return
  autoPlayInterval.value = setInterval(nextSlide, 5000)
}

const resetAutoPlay = () => {
  if (autoPlayInterval.value) {
    clearInterval(autoPlayInterval.value)
  }
  startAutoPlay()
}

onMounted(() => {
  startAutoPlay()
})

onUnmounted(() => {
  if (autoPlayInterval.value) clearInterval(autoPlayInterval.value)
})
</script>

<template>
  <div class="hero-carousel-wrapper">
    <div class="carousel-container">
      <div class="carousel-track">
        <div 
          v-for="(item, idx) in displayItems" 
          :key="idx" 
          class="carousel-slide" 
          :class="getSlideClass(idx)"
          @click="setActive(idx)"
        >
          <img :src="item.image || item.img" :alt="item.name" />
          <div class="slide-overlay">
            <template v-if="item.name || item.role">
              <div class="slide-text-container absolute inset-x-0 bottom-0 p-6 pt-16 pb-10 flex flex-col items-center justify-end z-10 pointer-events-none">
                <h3 class="slide-title mb-2 text-center">{{ item.name }}</h3>
                <p class="slide-role m-0 text-center" :class="item.colorClass">{{ item.role }}</p>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-carousel-wrapper {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.carousel-container {
  perspective: 1200px;
  position: relative;
  width: 100%;
  height: 480px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
}

.carousel-track {
  position: relative;
  width: 100%;
  max-width: 360px;
  height: 100%;
  transform-style: preserve-3d;
}

.carousel-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  overflow: hidden;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s ease, z-index 0s 0.1s;
  box-shadow: 0 15px 35px rgba(0,0,0,0.1);
  cursor: pointer;
  opacity: 0;
  pointer-events: none;
  transform: translateZ(-300px);
  will-change: transform, opacity;
}

.carousel-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.slide-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 40%);
  opacity: 0;
  transition: opacity 0.3s;
}

/* Active Slide */
.carousel-slide.active {
  transform: translateZ(50px) scale(1);
  opacity: 1;
  z-index: 10;
  pointer-events: auto;
  box-shadow: 0 25px 50px rgba(var(--brand-primary-rgb), 0.25);
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s ease, z-index 0s 0s;
}

.carousel-slide.active .slide-overlay {
  opacity: 1;
}

.slide-text-container {
  background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 40%, transparent 100%);
}

.slide-title {
  color: #ffffff !important;
  font-size: 1.5rem;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
}

.slide-role {
  font-size: 0.875rem;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
  /* Fallback color if the item.colorClass fails */
  color: #e2e8f0; 
}

.carousel-slide.active.single {
  transform: translateZ(0) scale(1);
  cursor: default;
}

/* Previous Slide */
.carousel-slide.prev {
  transform: translateX(-40%) translateZ(-150px) rotateY(30deg);
  opacity: 0.6;
  z-index: 5;
  pointer-events: auto;
}

/* Next Slide */
.carousel-slide.next {
  transform: translateX(40%) translateZ(-150px) rotateY(-30deg);
  opacity: 0.6;
  z-index: 5;
  pointer-events: auto;
}

/* Hidden Slides (if > 3 images) */
.carousel-slide.hidden {
  transform: translateZ(-300px) scale(0.8);
  opacity: 0;
  z-index: 1;
}

/* Hover effects */
.carousel-slide.prev:hover,
.carousel-slide.next:hover {
  opacity: 0.85;
}

.carousel-slide.active:hover img {
  transform: scale(1.03);
}

/* Dark Mode Adjustments */
html[data-theme='dark'] .carousel-slide.active {
  box-shadow: 0 25px 50px rgba(var(--brand-primary-rgb), 0.15);
}

/* Indicators */
.carousel-indicators {
  display: flex;
  gap: 0.75rem;
  margin-top: 2rem;
  justify-content: center;
}

.indicator-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--border-muted);
  border: none;
  padding: 0;
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator-dot:hover {
  background: var(--text-muted);
}

.indicator-dot.active {
  background: var(--brand-primary);
  transform: scale(1.3);
}

/* Responsiveness */
@media (max-width: 1024px) {
  .carousel-track {
    max-width: 320px;
    height: 420px;
  }
}

@media (max-width: 768px) {
  .carousel-container {
    justify-content: center;
    height: 400px;
  }
  .carousel-track {
    max-width: 260px;
    height: 350px;
  }
  .carousel-slide.prev {
    transform: translateX(-40%) translateZ(-150px) rotateY(25deg);
  }
  .carousel-slide.next {
    transform: translateX(40%) translateZ(-150px) rotateY(-25deg);
  }
}
</style>
