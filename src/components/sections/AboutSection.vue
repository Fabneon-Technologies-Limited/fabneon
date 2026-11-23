<script setup lang="ts">
import HeroCarousel from '../HeroCarousel.vue';
import { teamMembers } from '../../data/siteContent';
</script>

<template>
  <section class="section section-alt" id="about" style="padding-top: 5.5rem; padding-bottom: 5.5rem; scroll-margin-top: 110px;">
    <div class="container relative">
      <div class="grid md:grid-cols-2 gap-12 items-center mt-6 md:mt-12">
        <!-- Left Side: Title and Subtitle -->
        <div class="text-left">
          <div class="badge mb-4 inline-block">Who We Are</div>
          <h2 class="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6">Meet The <span class="text-gradient">Team</span></h2>
          <p class="lead text-base sm:text-lg text-[var(--text-muted)] max-w-lg">
            We are a passionate team of software architects, engineers, and UI/UX specialists at <strong>Fabneon Technologies Limited</strong>. From enterprise ERPs to high-performance web applications, our team delivers excellence at every level.
          </p>
        </div>

        <!-- Right Side: Coverflow Carousel -->
        <div class="flex justify-center items-center h-[400px] md:h-[500px] relative w-full">
          <HeroCarousel :items="teamMembers" />
        </div>
      </div>
    </div>
  </section>
</template>
