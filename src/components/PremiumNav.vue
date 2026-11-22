<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';

const props = withDefaults(defineProps<{
  items: { label: string; href: string }[];
  theme: 'light' | 'dark';
  currentPage?: string;
}>(), {
  currentPage: 'home'
});

const emit = defineEmits<{
  (e: 'toggle-theme'): void;
  (e: 'navigate', targetId: string): void;
}>();

const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);
const activeSection = ref('#home');
let ticking = false;

const logoSrc = computed(() => 
  props.theme === 'dark' ? '/fabneon_logo_dark.png' : '/fabneon_logo_light.png'
);

const updateScrollState = () => {
  isScrolled.value = window.scrollY > 40;
  
  if (props.currentPage === 'case-study') {
    activeSection.value = '#case-studies';
    return;
  }
  if (props.currentPage === 'blog-post') {
    activeSection.value = '#blog';
    return;
  }

  const sections = props.items.map(item => document.querySelector(item.href)).filter(Boolean);
  let current = '#home';
  for (const section of sections) {
    if (section && window.scrollY >= (section as HTMLElement).offsetTop - 180) {
      current = `#${section.id}`;
    }
  }
  activeSection.value = current;
  ticking = false;
};

const handleScroll = () => {
  if (!ticking) {
    window.requestAnimationFrame(updateScrollState);
    ticking = true;
  }
};

const handleNavClick = (e: MouseEvent, href: string) => {
  if (href.startsWith('#')) {
    e.preventDefault();
    isMobileMenuOpen.value = false;
    const targetId = href.substring(1);

    if (props.currentPage !== 'home') {
      emit('navigate', targetId);
      return;
    }

    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      const navOffset = 110;
      const elTop = targetEl.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: Math.max(0, elTop - navOffset),
        behavior: 'smooth'
      });
      history.pushState(null, '', href);
      activeSection.value = href;
    }
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
  updateScrollState();
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
        <a href="#home" class="nav-brand" @click="handleNavClick($event, '#home')">
          <img :src="logoSrc" alt="Fabneon Technologies Limited — Premier Software Company Logo" class="nav-logo-img" width="160" height="40" />
        </a>

        <!-- Desktop Navigation -->
        <nav class="nav-menu">
          <a 
            v-for="item in items" 
            :key="item.href"
            :href="item.href"
            class="pill-link"
            :class="{ 'active': activeSection === item.href }"
            @click="handleNavClick($event, item.href)"
          >
            {{ item.label }}
          </a>
        </nav>

        <!-- Actions & Mobile Toggle -->
        <div class="nav-actions-wrapper">
          <!-- Theme Switcher -->
          <button 
            class="theme-toggle" 
            @click="emit('toggle-theme')" 
            :title="theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
            aria-label="Toggle Theme"
          >
            <svg v-if="theme === 'dark'" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="theme-icon"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="theme-icon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
          </button>

          <!-- Desktop CTA Button -->
          <a href="#contact" class="nav-cta-btn" @click="handleNavClick($event, '#contact')">
            <span>Start Project</span>
          </a>

          <!-- Mobile Hamburger -->
          <button class="mobile-toggle" @click="isMobileMenuOpen = !isMobileMenuOpen" :class="{ 'is-open': isMobileMenuOpen }" aria-label="Toggle Menu">
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
            @click="handleNavClick($event, item.href)"
          >
            {{ item.label }}
          </a>
          <a href="#contact" class="mobile-cta-btn" @click="handleNavClick($event, '#contact')">
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
  top: 1.25rem;
  left: 1rem;
  right: 1rem;
  width: auto;
  max-width: 1080px;
  margin: 0 auto;
  z-index: 1000;
  pointer-events: none;
}

.pill-nav {
  pointer-events: auto;
  width: 100%;
  height: 60px;
  border-radius: 9999px;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
}

[data-theme='dark'] .pill-nav {
  background: rgba(13, 15, 20, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.04);
}

[data-theme='light'] .pill-nav {
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.02);
}

.pill-nav.is-scrolled {
  transform: translateY(-2px);
  box-shadow: 0 16px 45px rgba(0, 0, 0, 0.55);
}

[data-theme='dark'] .pill-nav.is-scrolled {
  background: rgba(13, 15, 20, 0.96);
  backdrop-filter: blur(28px);
  -webkit-backdrop-filter: blur(28px);
  border-color: rgba(255, 255, 255, 0.12);
  box-shadow: 0 16px 45px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(255, 255, 255, 0.06);
}

[data-theme='light'] .pill-nav.is-scrolled {
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(28px);
  -webkit-backdrop-filter: blur(28px);
  border-color: rgba(0, 0, 0, 0.12);
  box-shadow: 0 16px 45px rgba(0, 0, 0, 0.14), 0 0 0 1px rgba(0, 0, 0, 0.04);
}

.nav-container {
  height: 100%;
  width: 100%;
  padding: 0 0.85rem 0 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

/* Brand Logo */
.nav-brand {
  display: flex;
  align-items: center;
  text-decoration: none;
  flex-shrink: 0;
}

.nav-logo-img {
  height: 32px;
  width: auto;
  object-fit: contain;
  transition: transform 0.25s ease;
}

.nav-brand:hover .nav-logo-img {
  transform: scale(1.04);
}

/* Center Menu */
.nav-menu {
  display: none;
}

@media (min-width: 960px) {
  .nav-menu {
    display: flex;
    align-items: center;
    gap: 0.15rem;
    padding: 0.25rem;
    border-radius: 9999px;
  }
  
  [data-theme='dark'] .nav-menu {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.06);
  }
  
  [data-theme='light'] .nav-menu {
    background: rgba(0, 0, 0, 0.03);
    border: 1px solid rgba(0, 0, 0, 0.06);
  }
}

.pill-link {
  color: var(--text-secondary);
  font-size: 0.86rem;
  font-weight: 500;
  letter-spacing: 0.01em;
  text-decoration: none;
  white-space: nowrap;
  padding: 0.42rem 0.95rem;
  border-radius: 9999px;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  display: inline-block;
  line-height: 1.2;
}

.pill-link:hover {
  color: var(--text-primary);
}

[data-theme='dark'] .pill-link:hover {
  background: rgba(255, 255, 255, 0.05);
}
[data-theme='light'] .pill-link:hover {
  background: rgba(0, 0, 0, 0.04);
}

.pill-link.active {
  color: var(--text-primary);
  font-weight: 600;
}

[data-theme='dark'] .pill-link.active {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.11);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
}

[data-theme='light'] .pill-link.active {
  color: #0b0c0e;
  background: rgba(0, 0, 0, 0.08);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
}

/* Right Actions */
.nav-actions-wrapper {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-shrink: 0;
}

.theme-toggle {
  background: transparent;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  color: var(--text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s ease;
  flex-shrink: 0;
}

[data-theme='dark'] .theme-toggle {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
[data-theme='light'] .theme-toggle {
  background: rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.08);
}

.theme-toggle:hover {
  color: var(--brand-gold);
  transform: rotate(20deg);
  border-color: rgba(255, 215, 0, 0.4);
}

/* CTA Button */
.nav-cta-btn {
  display: none;
}

@media (min-width: 960px) {
  .nav-cta-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    flex-shrink: 0;
    height: 38px;
    padding: 0 1.25rem;
    background: var(--gradient-signature);
    color: #ffffff;
    font-weight: 600;
    font-size: 0.86rem;
    line-height: 1;
    text-decoration: none;
    border-radius: 9999px;
    box-shadow: 0 4px 14px rgba(0, 90, 107, 0.28);
    transition: all 0.25s ease;
  }

  .nav-cta-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(0, 90, 107, 0.4);
    filter: brightness(1.08);
  }
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
  background: transparent;
  border-radius: 50%;
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;
}

[data-theme='dark'] .mobile-toggle {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
[data-theme='light'] .mobile-toggle {
  background: rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.08);
}

@media (min-width: 960px) {
  .mobile-toggle {
    display: none;
  }
}

.mobile-toggle .bar {
  display: block;
  width: 16px;
  height: 2px;
  background-color: var(--text-primary);
  border-radius: 2px;
  transition: all 0.25s ease;
}

.mobile-toggle.is-open .bar:nth-child(1) {
  transform: translateY(6px) rotate(45deg);
}
.mobile-toggle.is-open .bar:nth-child(2) {
  opacity: 0;
}
.mobile-toggle.is-open .bar:nth-child(3) {
  transform: translateY(-6px) rotate(-45deg);
}

/* Mobile Dropdown Menu */
.mobile-menu {
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
  max-height: 0;
  opacity: 0;
  visibility: hidden;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
}

[data-theme='dark'] .mobile-menu {
  background: rgba(14, 16, 21, 0.96);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}
[data-theme='light'] .mobile-menu {
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.mobile-menu.is-open {
  max-height: 480px;
  opacity: 1;
  visibility: visible;
}

.mobile-nav {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.mobile-link {
  color: var(--text-secondary);
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  padding: 0.7rem 1rem;
  border-radius: 12px;
  transition: all 0.2s ease;
}

.mobile-link:hover {
  color: var(--text-primary);
}

[data-theme='dark'] .mobile-link:hover {
  background: rgba(255, 255, 255, 0.05);
}
[data-theme='light'] .mobile-link:hover {
  background: rgba(0, 0, 0, 0.04);
}

.mobile-cta-btn {
  margin-top: 0.75rem;
  display: block;
  text-align: center;
  padding: 0.85rem;
  background: var(--gradient-signature);
  color: #ffffff;
  font-weight: 600;
  font-size: 0.95rem;
  border-radius: 14px;
  text-decoration: none;
  box-shadow: 0 4px 15px rgba(0, 90, 107, 0.3);
}
</style>
