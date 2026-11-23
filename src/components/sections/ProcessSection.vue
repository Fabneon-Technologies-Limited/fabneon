<script setup lang="ts">
import BorderGlow from '../BorderGlow.vue';
import { processSteps } from '../../data/siteContent';
</script>

<template>
  <section class="section section-alt" id="process" style="padding-top: 5.5rem; padding-bottom: 5.5rem; scroll-margin-top: 110px;">
    <div class="container">
      <div class="section-header text-center">
        <div class="badge badge-purple mb-4">How We Work</div>
        <h2>Our Process</h2>
        <p class="lead">A proven methodology that ensures project success from conception to deployment.</p>
      </div>
      <div class="process-grid grid-3">
        <BorderGlow 
          v-for="step in processSteps" 
          :key="step.number" 
          className="process-step reveal-stagger-child" 
          backgroundColor="var(--bg-primary)" 
          :animated="false"
        >
          <div class="step-number text-[3rem] font-bold text-[var(--text-muted)] opacity-30 mb-2">{{ step.number }}</div>
          <h3 class="mb-2">{{ step.title }}</h3>
          <p class="text-sm text-[var(--text-secondary)]">{{ step.description }}</p>
        </BorderGlow>
      </div>
    </div>
  </section>
</template>
