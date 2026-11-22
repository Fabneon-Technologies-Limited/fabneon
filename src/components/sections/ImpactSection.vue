<script setup lang="ts">
import StatCounter from '../StatCounter.vue';
import { impactStats } from '../../data/siteContent';
</script>

<template>
  <section class="section" id="impact">
    <div class="container">
      <div class="section-header text-center reveal-up">
        <div class="badge badge-gold mb-4">Our Impact</div>
        <h2>Numbers That Matter</h2>
      </div>
      <div class="impact-stats-container grid grid-cols-2 md:grid-cols-4 gap-6">
        <StatCounter 
          v-for="stat in impactStats" 
          :key="stat.label" 
          :value="stat.value" 
          :suffix="stat.suffix" 
          :label="stat.label" 
          class="reveal-stagger-child" 
        />
      </div>
    </div>
  </section>
</template>
