<script setup lang="ts">
import ProjectCarousel from '../ProjectCarousel.vue';
import { portfolioItems } from '../../data/siteContent';
</script>

<template>
  <section class="section" id="portfolio" style="padding-top: 5.5rem; padding-bottom: 5rem; scroll-margin-top: 110px;">
    <div class="container mb-8">
      <div class="section-header text-center reveal-up">
        <div class="badge badge-purple mb-4 mx-auto w-max">Our Work</div>
        <h2>Featured Projects</h2>
        <p class="lead">A showcase of our world-class enterprise software solutions.</p>
      </div>
      
      <div class="w-full mt-12 reveal-up">
        <ProjectCarousel :items="portfolioItems" />
      </div>
    </div>
  </section>
</template>
