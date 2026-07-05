<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';

const props = defineProps<{
  items: { label: string; href: string }[];
  theme: 'light' | 'dark';
}>();

const emit = defineEmits<{
  (e: 'toggle-theme'): void;
}>();

const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);
const activeSection = ref('#home');

const logoSrc = computed(() => 
  props.theme === 'dark' ? '/fabneon_logo_dark.png' : '/fabneon_logo_light.png'
);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
  
  const sections = props.items.map(item => document.querySelector(item.href)).filter(Boolean);
  let current = '#home';
  for (const section of sections) {
    if (section && window.scrollY >= (section as HTMLElement).offsetTop - 150) {
      current = `#${section.id}`;
    }
  }
  activeSection.value = current;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <header class="premium-nav" :class="{ 'is-scrolled': isScrolled }">
    <div class="nav-container">
      
      <!-- Logo -->
      <a href="#home" class="nav-brand">
        <img :src="logoSrc" alt="Fabneon" class="nav-logo-img" />
      </a>

      <!-- Desktop Navigation -->
      <nav class="nav-menu">
        <a 
          v-for="item in items" 
          :key="item.href"
          :href="item.href"
          class="premium-link"
          :class="{ 'active': activeSection === item.href }"
        >
          {{ item.label }}
          <span class="nav-indicator"></span>
        </a>
      </nav>

      <!-- CTA & Theme Switcher -->
      <div class="nav-actions">
        <!-- Theme Switcher -->
        <button 
          class="theme-toggle" 
          @click="emit('toggle-theme')" 
          :title="theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
        >
          <svg v-if="theme === 'dark'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="theme-icon"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="theme-icon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
        </button>

        <a href="#contact" class="nav-cta-btn">
          Start Project
        </a>
      </div>

      <!-- Mobile Toggle -->
      <button class="mobile-toggle" @click="isMobileMenuOpen = !isMobileMenuOpen" :class="{ 'is-open': isMobileMenuOpen }">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>

    </div>

    <!-- Mobile Dropdown -->
    <div class="mobile-menu" :class="{ 'is-open': isMobileMenuOpen }">
      <nav class="mobile-nav">
        <a 
          v-for="item in items" 
          :key="item.href"
          :href="item.href"
          class="mobile-link"
          @click="isMobileMenuOpen = false"
        >
          {{ item.label }}
        </a>
        <a href="#contact" class="mobile-cta-btn" @click="isMobileMenuOpen = false">
          Start Project
        </a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.premium-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  background: transparent;
  padding: 1.5rem 0;
}

.premium-nav.is-scrolled {
  background: var(--bg-nav-scrolled);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border-bottom: none !important;
  padding: 1rem 0;
  box-shadow: var(--nav-shadow);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
}

.nav-logo-img {
  height: 52px; /* Scaled up for full lockup */
  width: auto;
  transition: transform 0.3s ease;
}

.nav-brand:hover .nav-logo-img {
  transform: scale(1.05);
}



.nav-menu {
  display: none;
}

@media (min-width: 768px) {
  .nav-menu {
    display: flex;
    align-items: center;
    gap: 2.5rem;
  }
}

.premium-link {
  position: relative;
  color: var(--text-secondary);
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.3s ease;
  padding: 0.5rem 0;
}

.premium-link:hover, .premium-link.active {
  color: var(--text-primary);
}

.nav-indicator {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  border-radius: 3px;
  background: linear-gradient(90deg, var(--brand-teal), var(--brand-purple));
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
}

.premium-link:hover .nav-indicator, .premium-link.active .nav-indicator {
  transform: scaleX(1);
}

.nav-actions {
  display: none;
}

@media (min-width: 768px) {
  .nav-actions {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }
}

.theme-toggle {
  background: transparent;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s ease;
  padding: 0.5rem;
}

.theme-toggle:hover {
  color: var(--brand-gold);
}

.nav-cta-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.75rem;
  background: var(--gradient-signature);
  color: #fff;
  font-weight: 600; /* Adjusted to 600 from 700 per guidelines */
  font-size: 1rem;
  text-decoration: none;
  border-radius: 50px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 90, 107, 0.1);
}

[data-theme="dark"] .nav-cta-btn {
  box-shadow: 0 0 15px rgba(0, 90, 107, 0.3); /* Brand glow */
}

.nav-cta-btn:hover {
  transform: translateY(-2px);
  filter: brightness(1.1);
}

/* Mobile Toggle */
.mobile-toggle {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 44px;
  height: 44px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  cursor: pointer;
  padding: 0;
}

@media (min-width: 768px) {
  .mobile-toggle {
    display: none;
  }
}

.mobile-toggle .bar {
  display: block;
  width: 20px;
  height: 2px;
  background-color: #fff;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.mobile-toggle.is-open .bar:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.mobile-toggle.is-open .bar:nth-child(2) {
  opacity: 0;
}
.mobile-toggle.is-open .bar:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* Mobile Menu */
.mobile-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: rgba(3, 0, 8, 0.98);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.4s cubic-bezier(0.25, 1, 0.5, 1);
}

.mobile-menu.is-open {
  max-height: 500px;
}

.mobile-nav {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.mobile-link {
  color: var(--text-secondary);
  font-size: 1.25rem;
  font-weight: 600;
  text-decoration: none;
  padding: 0.5rem 0;
  transition: color 0.3s ease;
}

.mobile-link:hover {
  color: var(--text-primary);
}

.mobile-cta-btn {
  margin-top: 1rem;
  display: block;
  text-align: center;
  padding: 1rem;
  background: var(--gradient-signature);
  color: #fff;
  font-weight: 600;
  font-size: 1.1rem;
  border-radius: 12px;
  text-decoration: none;
}
</style>
