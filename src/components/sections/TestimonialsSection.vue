<script setup lang="ts">
import BorderGlow from '../BorderGlow.vue';
import { testimonials } from '../../data/siteContent';
</script>

<template>
  <section class="section" id="testimonials">
    <div class="container">
      <div class="section-header text-center">
        <div class="badge mb-4">Client Stories</div>
        <h2>Don't Just Take Our Word</h2>
      </div>

      <div class="testimonials-grid grid-3">
        <BorderGlow 
          v-for="t in testimonials" 
          :key="t.author" 
          className="testimonial-card reveal-stagger-child" 
          backgroundColor="var(--bg-secondary)" 
          :animated="true"
        >
          <p class="testimonial-text mb-6">"{{ t.quote }}"</p>
          <div class="testimonial-author flex items-center gap-4">
            <img :src="t.image" :alt="t.author + ', ' + t.role + ' — Client Review for Fabneon'" class="w-12 h-12 rounded-full object-cover" width="48" height="48" loading="lazy" decoding="async">
            <div class="author-info">
              <h3 class="m-0 text-base font-bold">{{ t.author }}</h3>
              <span class="text-sm text-[var(--text-secondary)]">{{ t.role }}</span>
            </div>
          </div>
        </BorderGlow>
      </div>
    </div>
  </section>
</template>
