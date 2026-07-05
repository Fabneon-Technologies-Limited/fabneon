/**
 * ============================================
 * FABNEON — Main Application Initialization
 * ============================================
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // --- 1. Loading Screen ---
  const loader = document.getElementById('loader');
  
  // Give minimum time for loading animation to show
  setTimeout(() => {
    // Hide loader
    if (loader) {
      loader.classList.add('loaded');
      
      // Remove loader from DOM after transition
      setTimeout(() => {
        loader.style.display = 'none';
      }, 600);
    }
    
    // Initialize animations after loader is hidden
    initApp();
  }, 2000); // 2 second minimum loading screen
  
  
  // --- 2. Main App Initialization ---
  function initApp() {
    // Initialize Lenis Smooth Scroll
    let lenis;
    if (typeof Lenis !== 'undefined') {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
      });

      // Integrate Lenis with GSAP ScrollTrigger
      if (typeof ScrollTrigger !== 'undefined' && typeof gsap !== 'undefined') {
        lenis.on('scroll', ScrollTrigger.update);
        
        gsap.ticker.add((time) => {
          lenis.raf(time * 1000);
        });
        
        gsap.ticker.lagSmoothing(0);
      } else {
        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
      }
    } else {
      console.warn('Lenis smooth scroll not loaded');
    }

    // Initialize GSAP Animations
    if (window.initAnimations) {
      window.initAnimations();
    }

    // Initialize Counters
    if (window.initCounters) {
      window.initCounters();
    }
    
    // Initialize Theme Toggle
    initThemeToggle();
    
    // Initialize Magnetic Cursor (Desktop only)
    initMagneticCursor();
  }
  
  // --- Theme Toggle ---
  function initThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;
    
    const sunIcon = toggleBtn.querySelector('.theme-icon-sun');
    const moonIcon = toggleBtn.querySelector('.theme-icon-moon');
    
    // Check saved theme
    const savedTheme = localStorage.getItem('fabneon-theme') || 'light';
    if (savedTheme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      sunIcon.style.display = 'block';
      moonIcon.style.display = 'none';
    }
    
    toggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('fabneon-theme', newTheme);
      
      if (newTheme === 'light') {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
      } else {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
      }
    });
  }
  
  // --- 3. Magnetic Cursor & Button Effect ---
  function initMagneticCursor() {
    // Only run on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;
    
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    const magnetics = document.querySelectorAll('.magnetic');
    
    if (!dot || !ring) return;
    
    // Track mouse position
    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    
    // Lerp function for smooth following
    const lerp = (a, b, n) => (1 - n) * a + n * b;
    
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Dot follows immediately
      dot.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;
    });
    
    // Animation loop for ring (smooth follow)
    const animateRing = () => {
      ringX = lerp(ringX, mouseX, 0.15);
      ringY = lerp(ringY, mouseY, 0.15);
      
      ring.style.transform = `translate3d(${ringX - 16}px, ${ringY - 16}px, 0)`;
      requestAnimationFrame(animateRing);
    };
    
    animateRing();
    
    // Magnetic Button Effect
    magnetics.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        // Move button slightly towards cursor
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        
        // Enlarge cursor ring
        ring.style.transform = `translate3d(${ringX - 24}px, ${ringY - 24}px, 0) scale(1.5)`;
        ring.style.borderColor = 'rgba(0, 163, 196, 0.8)';
        ring.style.backgroundColor = 'rgba(0, 163, 196, 0.1)';
      });
      
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0px, 0px)';
        
        // Reset cursor ring
        ring.style.transform = `translate3d(${ringX - 16}px, ${ringY - 16}px, 0) scale(1)`;
        ring.style.borderColor = 'rgba(0, 163, 196, 0.4)';
        ring.style.backgroundColor = 'transparent';
      });
    });
    
    // Hover effects for generic links
    document.querySelectorAll('a:not(.magnetic), button:not(.magnetic)').forEach(el => {
      el.addEventListener('mouseenter', () => {
        ring.style.transform = `translate3d(${ringX - 24}px, ${ringY - 24}px, 0) scale(1.5)`;
        ring.style.borderColor = 'var(--brand-teal-light)';
      });
      
      el.addEventListener('mouseleave', () => {
        ring.style.transform = `translate3d(${ringX - 16}px, ${ringY - 16}px, 0) scale(1)`;
        ring.style.borderColor = 'rgba(0, 163, 196, 0.4)';
      });
    });
  }

});
