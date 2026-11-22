<script setup lang="ts">
import LogoMarquee from '../LogoMarquee.vue';
import { techStack1, techStack2 } from '../../data/siteContent';
</script>

<template>
  <section class="section" id="technologies" style="padding-top: 2rem; padding-bottom: 4rem;">
    <div class="container mb-8">
      <div class="section-header text-center reveal-up">
        <div class="badge badge-teal mb-4 mx-auto w-max">Tech Stack</div>
        <h2>Technologies We Use</h2>
        <p class="lead">Built with modern, scalable, and secure technologies tailored for enterprise needs.</p>
      </div>
    </div>
    
    <div class="flex flex-col gap-8 w-full mt-4">
      <!-- Row 1: Left to right -->
      <LogoMarquee :items="techStack1" direction="left" speed="normal" :showNames="true" />
      <!-- Row 2: Right to left -->
      <LogoMarquee :items="techStack2" direction="right" speed="slow" :showNames="true" />
    </div>
  </section>
</template>
