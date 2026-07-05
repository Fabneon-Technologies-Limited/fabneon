<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const props = defineProps<{
  value: number;
  suffix?: string;
  label: string;
}>();

const counterRef = ref<HTMLElement | null>(null);
const displayValue = ref(0);

onMounted(() => {
  if (counterRef.value) {
    ScrollTrigger.create({
      trigger: counterRef.value,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(displayValue, {
          value: props.value,
          duration: 2.5,
          ease: 'power3.out',
          snap: { value: 1 }
        });
      },
      once: true
    });
  }
});
</script>

<template>
  <div class="stat-card" ref="counterRef">
    <div class="stat-number">
      {{ displayValue }}{{ suffix }}
    </div>
    <div class="stat-label">{{ label }}</div>
  </div>
</template>

<style scoped>
.stat-card {
  text-align: center;
  padding: 2rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-muted);
  border-radius: var(--radius-xl);
  transition: transform var(--transition-base), box-shadow var(--transition-base), border-color var(--transition-base);
}

.stat-card:hover {
  transform: translateY(-5px);
  border-color: var(--brand-purple);
  box-shadow: 0 10px 30px rgba(75, 26, 127, 0.15);
}

.stat-number {
  font-size: var(--text-5xl);
  font-weight: var(--font-extrabold);
  background: var(--gradient-signature);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: var(--space-xs);
  line-height: 1;
}

.stat-label {
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  color: var(--text-secondary);
}
</style>
