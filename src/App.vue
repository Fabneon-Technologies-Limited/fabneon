<script setup lang="ts">
import { onMounted, onUnmounted, nextTick, defineAsyncComponent } from 'vue';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Composables & State
import { useTheme } from './composables/useTheme';
import { useAppRouter, updateMetaTags } from './composables/useAppRouter';
import { navItems } from './data/siteContent';
import { caseStudies } from './data/caseStudies';
import { blogPosts } from './data/blogPosts';

// Core Navigation & Layout Components
import LoadingScreen from './components/LoadingScreen.vue';
import PremiumNav from './components/PremiumNav.vue';

// Modular Home Sections
import HeroSection from './components/sections/HeroSection.vue';
import PartnersSection from './components/sections/PartnersSection.vue';
import ServicesSection from './components/sections/ServicesSection.vue';
import CaseStudiesSection from './components/sections/CaseStudiesSection.vue';
import BlogSection from './components/BlogSection.vue';
import ProcessSection from './components/sections/ProcessSection.vue';
import ImpactSection from './components/sections/ImpactSection.vue';
import AboutSection from './components/sections/AboutSection.vue';
import PortfolioSection from './components/sections/PortfolioSection.vue';
import TestimonialsSection from './components/sections/TestimonialsSection.vue';
import TechStackSection from './components/sections/TechStackSection.vue';
import FaqSection from './components/sections/FaqSection.vue';
import ContactSection from './components/sections/ContactSection.vue';
import FooterSection from './components/sections/FooterSection.vue';

// Code-Split Dynamic Subpages (Lazy-Loaded for ultra-fast initial bundle)
const CaseStudyDetail = defineAsyncComponent(() => import('./components/CaseStudyDetail.vue'));
const BlogPostDetail = defineAsyncComponent(() => import('./components/BlogPostDetail.vue'));
const TermsAndConditions = defineAsyncComponent(() => import('./components/TermsAndConditions.vue'));
const PrivacyPolicy = defineAsyncComponent(() => import('./components/PrivacyPolicy.vue'));

gsap.registerPlugin(ScrollTrigger);

const { theme, toggleTheme } = useTheme();
const {
  currentPage,
  currentCaseStudy,
  currentBlogPost,
  openCaseStudy,
  closeCaseStudy,
  openBlogPost,
  closeBlogPost,
  navigateTo,
  handleRoutingSync,
  scrollToTarget
} = useAppRouter();

const handleNavAction = (targetId: string) => {
  currentPage.value = 'home';
  try {
    window.history.pushState(null, '', `/#${targetId}`);
  } catch (_) {
    window.location.hash = targetId;
  }
  updateMetaTags(
    'Fabneon Technologies Limited | Best Software Company in Rajshahi & Bangladesh | Enterprise ERP & AI Solutions',
    'Fabneon Technologies Limited is the premier corporate software engineering firm in Rajshahi & Bangladesh. We build scalable enterprise ERPs, cloud SaaS operating systems (RepairSoft, FabPharma), and government-accredited digital ecosystems (Global Knowledge Institute GKITI BTEB 23415).',
    '/'
  );
  nextTick(() => {
    setTimeout(() => {
      scrollToTarget(targetId, true);
    }, 60);
  });
};

onMounted(() => {
  document.documentElement.setAttribute('data-theme', theme.value);
  document.documentElement.classList.remove('light-theme-loader');

  nextTick(() => {
    // 1. Immediately remove invisible classes so content is never blank
    document.querySelectorAll('.invisible-until-scroll').forEach(el => el.classList.remove('invisible-until-scroll'));

    // 2. Progressive GSAP ScrollTrigger batch animations (Excluding Hero elements so above-the-fold CTA is always 100% visible)
    try {
      const revealElements = (gsap.utils.toArray('.reveal-up, .reveal-left, .reveal-right') as HTMLElement[])
        .filter(el => !el.closest('.hero'));

      ScrollTrigger.batch(revealElements, {
        start: 'top 92%',
        end: 'bottom 8%',
        onEnter: (batch) => {
          batch.forEach((element) => {
            let xOffset = 0;
            let yOffset = 25;

            if (element.classList.contains('reveal-left')) {
              xOffset = -35;
              yOffset = 0;
            } else if (element.classList.contains('reveal-right')) {
              xOffset = 35;
              yOffset = 0;
            }

            gsap.fromTo(element,
              { x: xOffset, y: yOffset, opacity: 0.2 },
              { x: 0, y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', overwrite: 'auto' }
            );
          });
        },
        onEnterBack: (batch) => {
          batch.forEach((element) => {
            let xOffset = 0;
            let yOffset = -25;

            if (element.classList.contains('reveal-left')) {
              xOffset = -35;
              yOffset = 0;
            } else if (element.classList.contains('reveal-right')) {
              xOffset = 35;
              yOffset = 0;
            }

            gsap.fromTo(element,
              { x: xOffset, y: yOffset, opacity: 0.2 },
              { x: 0, y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', overwrite: 'auto' }
            );
          });
        },
        onLeave: (batch) => {
          gsap.to(batch, { opacity: 0.25, duration: 0.4, overwrite: 'auto' });
        },
        onLeaveBack: (batch) => {
          gsap.to(batch, { opacity: 0.25, duration: 0.4, overwrite: 'auto' });
        }
      });

      const staggerContainers = [
        '.services-grid', 
        '.case-studies-grid', 
        '.portfolio-grid', 
        '.tech-grid', 
        '.team-grid', 
        '.process-grid', 
        '.testimonials-grid', 
        '.impact-stats-container'
      ];

      staggerContainers.forEach(containerSelector => {
        const container = document.querySelector(containerSelector);
        if (!container) return;
        const children = container.querySelectorAll('.reveal-stagger-child');
        if (!children.length) return;

        ScrollTrigger.create({
          trigger: container,
          start: 'top 88%',
          end: 'bottom 12%',
          onEnter: () => {
            gsap.fromTo(children,
              { y: 25, opacity: 0.2 },
              { y: 0, opacity: 1, duration: 0.55, stagger: 0.08, ease: 'power2.out', overwrite: 'auto' }
            );
          },
          onEnterBack: () => {
            gsap.fromTo(children,
              { y: -20, opacity: 0.2 },
              { y: 0, opacity: 1, duration: 0.55, stagger: 0.08, ease: 'power2.out', overwrite: 'auto' }
            );
          }
        });
      });
    } catch (_) {
      // Graceful fallback if GSAP plugin encounters SSR/Canvas restrictions
    }
  });

  window.addEventListener('hashchange', handleRoutingSync);
  window.addEventListener('popstate', handleRoutingSync);
  handleRoutingSync();

  if (currentPage.value === 'home' && window.location.hash) {
    const target = window.location.hash.replace('#', '');
    if (['services', 'case-studies', 'blog', 'process', 'portfolio', 'about', 'contact', 'faq'].includes(target)) {
      setTimeout(() => {
        scrollToTarget(target, true);
      }, 200);
    }
  }
});

onUnmounted(() => {
  window.removeEventListener('hashchange', handleRoutingSync);
  window.removeEventListener('popstate', handleRoutingSync);
});
</script>

<template>
  <div class="app-root min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
    <!-- Non-blocking loader for instant First Contentful Paint -->
    <LoadingScreen :theme="theme" />

    <!-- Persistent Unified Floating Navbar across ALL Pages (Home, Blog, Case Studies) -->
    <PremiumNav 
      :theme="theme" 
      :items="navItems" 
      :current-page="currentPage"
      @toggle-theme="toggleTheme" 
      @navigate="handleNavAction"
    />

    <!-- Main Homepage View -->
    <main v-if="currentPage === 'home'">
      <HeroSection />
      <PartnersSection />
      <ServicesSection />
      <CaseStudiesSection @open-case-study="openCaseStudy" />
      <BlogSection @select-post="openBlogPost" />
      <ProcessSection />
      <ImpactSection />
      <AboutSection />
      <PortfolioSection />
      <TestimonialsSection />
      <TechStackSection />
      <FaqSection />
      <ContactSection />
    </main>

    <!-- Case Study Detail View -->
    <CaseStudyDetail
      v-else-if="currentPage === 'case-study'"
      :case-study="currentCaseStudy"
      :all-case-studies="caseStudies"
      :theme="theme"
      @back="closeCaseStudy"
      @select="openCaseStudy"
      @toggle-theme="toggleTheme"
    />

    <!-- Blog Post Detail View -->
    <BlogPostDetail
      v-else-if="currentPage === 'blog-post'"
      :post="currentBlogPost"
      :all-posts="blogPosts"
      :theme="theme"
      @back="closeBlogPost"
      @select-post="openBlogPost"
      @toggle-theme="toggleTheme"
    />

    <!-- Legal Pages -->
    <TermsAndConditions v-else-if="currentPage === 'terms'" @back="navigateTo('home')" />
    <PrivacyPolicy v-else-if="currentPage === 'privacy'" @back="navigateTo('home')" />

    <!-- Footer (Always visible) -->
    <FooterSection @navigate="navigateTo" />
  </div>
</template>
