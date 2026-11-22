<script setup lang="ts">
import { ref } from 'vue';
import { faqItems } from '../../data/siteContent';

const activeIndex = ref<number | null>(null);

const toggleFaq = (index: number) => {
  activeIndex.value = activeIndex.value === index ? null : index;
};
</script>

<template>
  <section class="section section-alt" id="faq" style="padding-top: 5.5rem; padding-bottom: 5.5rem; scroll-margin-top: 110px;">
    <div class="container">
      <div class="faq-grid grid md:grid-cols-2 gap-12">
        <div class="faq-content reveal-up">
          <div class="badge badge-purple mb-4">Got Questions?</div>
          <h2>Frequently Asked Questions</h2>
          <p class="lead mb-8">
            Everything you need to know about partnering with Fabneon Technologies Limited for your next software initiative.
          </p>
          <a href="#contact" class="btn btn-secondary magnetic inline-block">Ask Us Directly</a>
        </div>
        
        <div class="faq-accordion reveal-up">
          <div
            v-for="(item, idx) in faqItems"
            :key="item.question"
            class="accordion-item mb-4 border border-[var(--border-muted)] rounded-2xl overflow-hidden bg-[var(--bg-overlay)] transition-all shadow-sm"
            :class="{ 'active': activeIndex === idx }"
          >
            <button
              class="accordion-header w-full text-left p-4 md:p-6 font-semibold flex justify-between items-center cursor-pointer bg-transparent border-none text-[var(--text-primary)]"
              @click="toggleFaq(idx)"
              :aria-expanded="activeIndex === idx"
            >
              <span class="text-sm md:text-base font-bold pr-4">{{ item.question }}</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none"
                stroke="currentColor" 
                stroke-width="2.5" 
                stroke-linecap="round" 
                stroke-linejoin="round"
                class="accordion-icon transition-transform duration-300 shrink-0"
                :class="{ 'rotate-180 text-[var(--brand-teal-light)]': activeIndex === idx }"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div 
              class="accordion-body px-4 md:px-6 transition-all duration-300"
              :style="{ maxHeight: activeIndex === idx ? '300px' : '0px', opacity: activeIndex === idx ? '1' : '0' }"
            >
              <p class="pb-4 md:pb-6 m-0 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                {{ item.answer }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.accordion-body {
  overflow: hidden;
  transition: max-height 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease;
}
</style>
