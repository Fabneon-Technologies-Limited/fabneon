<script setup lang="ts">
import { partners } from '../../data/siteContent';
import LogoMarquee from '../LogoMarquee.vue';
</script>

<template>
  <section class="section [isolation:isolate] overflow-hidden" style="padding: 0; padding-bottom: 2rem;">
    <div class="container mb-4">
      <div class="section-header text-center reveal-up" style="margin-bottom: var(--space-xl);">
        <div class="badge badge-teal mb-4 mx-auto w-max">Trusted By Industry Benchmarks</div>
        <h2 style="font-size: var(--text-2xl);">Powering Leading Enterprises & Institutions</h2>
      </div>
    </div>
    
    <div class="w-full">
      <LogoMarquee :items="partners" direction="left" speed="normal" :showNames="false" />
    </div>
  </section>
</template>
