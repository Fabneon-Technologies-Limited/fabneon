/**
 * ============================================
 * FABNEON — GSAP & ScrollTrigger Animations
 * ============================================
 */

function initAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('GSAP or ScrollTrigger not loaded');
    return;
  }

  // Register ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // --- Utility: Batch reveal animations ---
  const animateOnScroll = (selector, animationProps, stagger = 0) => {
    const elements = gsap.utils.toArray(selector);
    if (!elements.length) return;

    elements.forEach(element => {
      // Remove the invisible class right before animating
      element.classList.remove('invisible-until-scroll');
      
      gsap.to(element, {
        scrollTrigger: {
          trigger: element,
          start: 'top 85%', // Trigger when top of element hits 85% from top of viewport
          toggleActions: 'play none none none'
        },
        ...animationProps,
        stagger: stagger
      });
    });
  };

  // --- Basic Reveals ---
  // Reveal Up
  gsap.utils.toArray('.reveal-up').forEach(element => {
    gsap.to(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top 90%',
        onEnter: () => element.classList.remove('invisible-until-scroll')
      },
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out'
    });
  });

  // Reveal Left
  gsap.utils.toArray('.reveal-left').forEach(element => {
    gsap.to(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        onEnter: () => element.classList.remove('invisible-until-scroll')
      },
      x: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out'
    });
  });

  // Reveal Right
  gsap.utils.toArray('.reveal-right').forEach(element => {
    gsap.to(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        onEnter: () => element.classList.remove('invisible-until-scroll')
      },
      x: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out'
    });
  });

  // --- Staggered Children Reveal (Grids, Lists) ---
  // For containers holding elements with .reveal-stagger-child
  const staggerContainers = ['.services-grid', '.portfolio-grid', '.tech-grid', '.team-grid', '.process-grid', '.testimonials-grid'];
  
  staggerContainers.forEach(containerSelector => {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const children = container.querySelectorAll('.reveal-stagger-child');
    if (!children.length) return;

    ScrollTrigger.create({
      trigger: container,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(children, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          onStart: function() {
            // Remove invisible class on start
            children.forEach(c => c.classList.remove('invisible-until-scroll'));
          }
        });
      },
      once: true
    });
  });

  // --- Parallax Effects ---
  // Hero background elements parallax
  gsap.to('.hero-bg-glow', {
    y: 150,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });
  
  gsap.to('.hero-bg-glow-2', {
    y: -150,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });
}

// Export or attach to window
window.initAnimations = initAnimations;
