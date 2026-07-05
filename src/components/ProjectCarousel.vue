<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

const props = defineProps<{
  items?: { image?: string; title?: string; description?: string }[]
}>()

const activeIndex = ref(0)
const autoPlayInterval = ref<any>(null)

const displayItems = computed(() => {
  if (!props.items || props.items.length === 0) return []
  return props.items
})

const getSlideClass = (index: number) => {
  if (displayItems.value.length === 1) return 'active single'
  
  const total = displayItems.value.length
  
  if (index === activeIndex.value) return 'active'
  
  let prevIndex = activeIndex.value - 1
  if (prevIndex < 0) prevIndex = total - 1
  if (index === prevIndex) return 'prev'
  
  let nextIndex = (activeIndex.value + 1) % total
  if (index === nextIndex) return 'next'
  
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
  autoPlayInterval.value = setInterval(nextSlide, 6000)
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
  <div class="project-carousel-wrapper">
    <div class="carousel-container">
      <div class="carousel-track">
        <div 
          v-for="(item, idx) in displayItems" 
          :key="idx" 
          class="carousel-slide" 
          :class="getSlideClass(idx)"
          @click="setActive(idx)"
        >
          <img :src="item.image" :alt="item.title" />
          <div class="slide-overlay">
            <template v-if="item.title">
              <div class="slide-text-container absolute inset-x-0 bottom-0 p-6 flex flex-col items-center justify-center z-10 pointer-events-none">
                <h3 class="slide-title mb-2 text-center">{{ item.title }}</h3>
                <p class="slide-desc m-0 text-center max-w-sm">{{ item.description }}</p>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Custom dots for navigation -->
    <div class="carousel-indicators">
      <button 
        v-for="(_, idx) in displayItems" 
        :key="'dot-'+idx"
        class="indicator-dot"
        :class="{ active: idx === activeIndex }"
        @click="setActive(idx)"
        :aria-label="'Go to slide ' + (idx + 1)"
      ></button>
    </div>
  </div>
</template>

<style scoped>
.project-carousel-wrapper {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.carousel-container {
  perspective: 1500px;
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
  max-width: 650px;
  height: 380px;
  transform-style: preserve-3d;
}

.carousel-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 24px;
  overflow: hidden;
  transition: transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.7s ease, z-index 0s 0.1s;
  box-shadow: 0 20px 40px rgba(0,0,0,0.25);
  cursor: pointer;
  opacity: 0;
  pointer-events: none;
  transform: translateZ(-400px);
  will-change: transform, opacity;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.carousel-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s ease;
}

.slide-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%);
  opacity: 0;
  transition: opacity 0.4s;
}

/* Active Slide */
.carousel-slide.active {
  transform: translateZ(80px) scale(1);
  opacity: 1;
  z-index: 10;
  pointer-events: auto;
  box-shadow: 0 30px 60px rgba(0,0,0,0.4);
  transition: transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.7s ease, z-index 0s 0s;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.carousel-slide.active .slide-overlay {
  opacity: 1;
}

.slide-text-container {
  background: rgba(10, 12, 16, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.slide-title {
  color: #ffffff !important;
  font-size: 1.75rem;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
  letter-spacing: -0.02em;
}

.slide-desc {
  font-size: 1rem;
  font-weight: 400;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
  color: #cbd5e1;
  line-height: 1.5;
}

.carousel-slide.active.single {
  transform: translateZ(0) scale(1);
  cursor: default;
}

/* Previous Slide */
.carousel-slide.prev {
  transform: translateX(-55%) translateZ(-200px) rotateY(25deg);
  opacity: 0.6;
  z-index: 5;
  pointer-events: auto;
}

/* Next Slide */
.carousel-slide.next {
  transform: translateX(55%) translateZ(-200px) rotateY(-25deg);
  opacity: 0.6;
  z-index: 5;
  pointer-events: auto;
}

/* Hidden Slides */
.carousel-slide.hidden {
  transform: translateZ(-400px) scale(0.8);
  opacity: 0;
  z-index: 1;
}

/* Hover effects */
.carousel-slide.prev:hover,
.carousel-slide.next:hover {
  opacity: 0.9;
}

.carousel-slide.active:hover img {
  transform: scale(1.05);
}

/* Dark Mode Adjustments */
html[data-theme='light'] .carousel-slide {
  box-shadow: 0 15px 30px rgba(0,0,0,0.1);
  border: 1px solid rgba(0,0,0,0.05);
}
html[data-theme='light'] .carousel-slide.active {
  box-shadow: 0 25px 50px rgba(0,0,0,0.15);
}

/* Indicators */
.carousel-indicators {
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
  justify-content: center;
}

.indicator-dot {
  width: 12px;
  height: 12px;
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
  background: var(--brand-teal);
  transform: scale(1.3);
}

/* Responsiveness */
@media (max-width: 1024px) {
  .carousel-track {
    max-width: 500px;
    height: 300px;
  }
}

@media (max-width: 768px) {
  .carousel-container {
    height: 350px;
  }
  .carousel-track {
    max-width: 320px;
    height: 220px;
  }
  .carousel-slide.prev {
    transform: translateX(-45%) translateZ(-150px) rotateY(20deg);
  }
  .carousel-slide.next {
    transform: translateX(45%) translateZ(-150px) rotateY(-20deg);
  }
  .slide-title {
    font-size: 1.25rem;
  }
  .slide-desc {
    font-size: 0.875rem;
  }
}
</style>
