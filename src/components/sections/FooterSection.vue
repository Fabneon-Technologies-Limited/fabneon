<script setup lang="ts">
const emit = defineEmits<{
  (e: 'navigate', page: 'home' | 'terms' | 'privacy'): void;
}>();
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="logo font-bold text-2xl flex items-center gap-2">
            <img src="/fabneon_logo_only.png" alt="Fabneon Technologies Limited Official Logo" class="h-8 w-auto" width="32" height="32" />
            <span>Fabneon</span>
          </div>
          <p class="text-[var(--text-secondary)]"><strong>Fabneon Technologies Limited</strong> — Empowering global businesses with scalable enterprise software, mission-critical ERPs, and state-of-the-art digital experiences.</p>
        </div>

        <div class="footer-links-group">
          <h3 class="text-[var(--text-primary)] font-semibold text-base mb-4">Flagship Solutions</h3>
          <div class="footer-links">
            <a href="#case-studies">Global Knowledge (GKITI)</a>
            <a href="#case-studies">RepairSoft (GKTool)</a>
            <a href="#case-studies">FabPharma ERP</a>
            <a href="#services">Enterprise Architecture</a>
          </div>
        </div>

        <div class="footer-links-group">
          <h3 class="text-[var(--text-primary)] font-semibold text-base mb-4">Company</h3>
          <div class="footer-links">
            <a href="#about">About Fabneon</a>
            <a href="#portfolio">Our Work</a>
            <a href="#process">Our Process</a>
            <a href="#contact">Contact</a>
          </div>
        </div>

        <div class="footer-newsletter">
          <h3 class="text-[var(--text-primary)] font-semibold text-base mb-4">Stay Updated</h3>
          <p class="text-[var(--text-secondary)] text-sm mb-4">Subscribe for technical insights and engineering updates from Fabneon.</p>
          <form @submit.prevent>
            <input type="email" placeholder="Email address"
              class="form-input flex-1 p-2 rounded-l-lg bg-[var(--bg-secondary)] border border-[var(--border-muted)] text-[var(--text-primary)]"
              required>
            <button type="submit" class="btn btn-primary rounded-r-lg p-2"
              style="border-radius: 0 8px 8px 0;">Subscribe</button>
          </form>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="text-[var(--text-muted)] text-sm">&copy; 2026 Fabneon Technologies Limited. All rights reserved.</p>
        <div class="footer-bottom-links">
          <a href="/privacy" @click.prevent="emit('navigate', 'privacy')"
            class="text-[var(--text-muted)] text-sm hover:text-[var(--brand-teal-light)] transition-colors">Privacy Policy</a>
          <a href="/terms" @click.prevent="emit('navigate', 'terms')"
            class="text-[var(--text-muted)] text-sm hover:text-[var(--brand-teal-light)] transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
</template>
