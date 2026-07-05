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
  <div class="pill-nav-wrapper">
    <header class="pill-nav" :class="{ 'is-scrolled': isScrolled }">
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
            class="pill-link"
            :class="{ 'active': activeSection === item.href }"
          >
            {{ item.label }}
          </a>
        </nav>

        <!-- Actions & Mobile Toggle -->
        <div class="mobile-actions-container">
          <!-- Theme Switcher -->
          <button 
            class="theme-toggle" 
            @click="emit('toggle-theme')" 
            :title="theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
          >
            <svg v-if="theme === 'dark'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="theme-icon"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="theme-icon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
          </button>

          <!-- Desktop CTA -->
          <div class="nav-actions">
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
  </div>
</template>

<style scoped>
.pill-nav-wrapper {
  position: fixed;
  top: 1.5rem;
  left: 1rem;
  right: 1rem;
  width: auto;
  max-width: 1100px;
  margin: 0 auto;
  z-index: 100;
  pointer-events: none; /* Let clicks pass through outside the pill */
}

.pill-nav {
  pointer-events: auto; /* Re-enable clicks for the actual nav */
  width: 100%;
  height: 60px;
  background: rgba(var(--bg-secondary-rgb), 0.7);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid var(--border-muted);
  border-radius: 50px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  position: relative;
}

[data-theme='dark'] .pill-nav {
  background: rgba(10, 12, 16, 0.75);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
[data-theme='light'] .pill-nav {
  background: rgba(255, 255, 255, 0.85);
  border: 1px solid rgba(0, 0, 0, 0.1);
}

@media (min-width: 900px) {
  .pill-nav-wrapper {
    left: 2rem;
    right: 2rem;
  }
  .pill-nav {
    height: 70px;
  }
}

.pill-nav.is-scrolled {
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.15);
  transform: translateY(-5px);
}
[data-theme='dark'] .pill-nav.is-scrolled {
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.6);
}

.nav-container {
  height: 100%;
  width: 100%;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

@media (min-width: 900px) {
  .nav-container {
    padding: 0 1rem 0 1.5rem;
  }
}

.nav-brand {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.nav-logo-img {
  height: 40px;
  width: auto;
  transition: transform 0.3s ease;
}

.nav-brand:hover .nav-logo-img {
  transform: scale(1.05);
}

.nav-menu {
  display: none;
}

@media (min-width: 900px) {
  .nav-menu {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: var(--bg-overlay);
    padding: 0.35rem;
    border-radius: 40px;
    border: 1px solid var(--border-muted);
  }
}

.pill-link {
  color: var(--text-secondary);
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  padding: 0.5rem 1.25rem;
  border-radius: 30px;
  transition: all 0.3s ease;
  position: relative;
}

.pill-link:hover {
  color: var(--text-primary);
}

.pill-link.active {
  color: var(--text-primary);
  background: var(--bg-secondary);
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}
[data-theme='dark'] .pill-link.active {
  background: rgba(255,255,255,0.1);
  box-shadow: 0 2px 10px rgba(0,0,0,0.3);
}

.nav-actions {
  display: none;
}

.mobile-actions-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

@media (min-width: 900px) {
  .nav-actions {
    display: flex;
    align-items: center;
  }
  .mobile-actions-container {
    gap: 1rem;
  }
}

.theme-toggle {
  background: var(--bg-overlay);
  border: 1px solid var(--border-muted);
  border-radius: 50%;
  width: 36px;
  height: 36px;
  color: var(--text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

@media (min-width: 900px) {
  .theme-toggle {
    width: 40px;
    height: 40px;
  }
}

.theme-toggle:hover {
  color: var(--brand-gold);
  border-color: var(--brand-gold);
  transform: rotate(15deg);
}

.nav-cta-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem 1.5rem;
  background: var(--gradient-signature);
  color: #fff;
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
  border-radius: 40px;
  transition: all 0.3s ease;
}

.nav-cta-btn:hover {
  transform: translateY(-2px) scale(1.02);
  filter: brightness(1.1);
  box-shadow: 0 10px 20px rgba(0, 90, 107, 0.3);
}

/* Mobile Toggle */
.mobile-toggle {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  width: 36px;
  height: 36px;
  background: var(--bg-overlay);
  border: 1px solid var(--border-muted);
  border-radius: 50%;
  cursor: pointer;
  padding: 0;
}

@media (min-width: 900px) {
  .mobile-toggle {
    display: none;
  }
}

.mobile-toggle .bar {
  display: block;
  width: 18px;
  height: 2px;
  background-color: var(--text-primary);
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
  top: calc(100% + 0.5rem);
  left: 0;
  width: 100%;
  background: rgba(var(--bg-secondary-rgb), 0.95);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid var(--border-muted);
  border-radius: 24px;
  overflow: hidden;
  max-height: 0;
  opacity: 0;
  visibility: hidden;
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  box-shadow: 0 20px 50px rgba(0,0,0,0.3);
}

[data-theme='dark'] .mobile-menu {
  background: rgba(10, 12, 16, 0.95);
}
[data-theme='light'] .mobile-menu {
  background: rgba(255, 255, 255, 0.95);
}

.mobile-menu.is-open {
  max-height: 500px;
  opacity: 1;
  visibility: visible;
}

.mobile-nav {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.mobile-link {
  color: var(--text-secondary);
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  transition: all 0.3s ease;
  background: transparent;
}

.mobile-link:hover {
  color: var(--text-primary);
  background: var(--bg-overlay);
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
  border-radius: 16px;
  text-decoration: none;
}
</style>
