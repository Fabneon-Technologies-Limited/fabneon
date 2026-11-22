<script setup lang="ts">
import BorderGlow from '../BorderGlow.vue';
</script>

<template>
  <section class="section" id="services">
    <div class="container">
      <div class="section-header text-center reveal-up">
        <div class="badge mb-4">What We Do</div>
        <h2>Our Expertise</h2>
        <p class="lead">Delivering cutting-edge solutions across the entire technology stack.</p>
      </div>

      <div class="services-grid grid-3">
        <BorderGlow className="service-card reveal-stagger-child" backgroundColor="var(--bg-secondary)" :animated="true">
          <div class="service-icon" style="color: var(--brand-teal);">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"></path>
            </svg>
          </div>
          <h3>Software Engineering</h3>
          <p class="text-secondary">Custom cloud architectures and robust microservices tailored to your exact business specifications.</p>
        </BorderGlow>

        <BorderGlow className="service-card reveal-stagger-child" backgroundColor="var(--bg-secondary)" :animated="true">
          <div class="service-icon" style="color: var(--brand-purple);">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect width="20" height="8" x="2" y="14" rx="2"></rect>
              <rect width="20" height="8" x="2" y="2" rx="2"></rect>
              <line x1="6" x2="6.01" y1="6" y2="6"></line>
              <line x1="6" x2="6.01" y1="18" y2="18"></line>
            </svg>
          </div>
          <h3>Enterprise ERP Systems</h3>
          <p class="text-secondary">Comprehensive resource planning systems unifying inventory, supply chain, automated accounting, and analytics.</p>
        </BorderGlow>

        <BorderGlow className="service-card reveal-stagger-child" backgroundColor="var(--bg-secondary)" :animated="true">
          <div class="service-icon" style="color: var(--brand-gold);">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect width="14" height="20" x="5" y="2" rx="2" ry="2"></rect>
              <path d="M12 18h.01"></path>
            </svg>
          </div>
          <h3>Mobile Applications</h3>
          <p class="text-secondary">High-performance cross-platform Flutter and native mobile applications with offline-first synchronization.</p>
        </BorderGlow>
      </div>
    </div>
  </section>
</template>
