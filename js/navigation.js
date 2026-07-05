/**
 * ============================================
 * FABNEON — Navigation & UI Interaction
 * ============================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Navbar Scroll Effect ---
  const navbar = document.getElementById('navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // --- Smooth Scroll for anchor links (fallback if Lenis isn't used, though Lenis handles most) ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        
        // Update active class on nav links
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
        });
        this.classList.add('active');

        // Scroll
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
  
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- Active Nav Link based on Scroll (Intersection Observer) ---
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  if (sections.length > 0 && navLinks.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }, observerOptions);
    
    sections.forEach(section => {
      if (section.getAttribute('id')) {
        observer.observe(section);
      }
    });
  }

  // --- Mobile Menu Toggle ---
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const navLinksContainer = document.getElementById('nav-links');
  
  if (mobileBtn && navLinksContainer) {
    mobileBtn.addEventListener('click', () => {
      navLinksContainer.classList.toggle('active');
      const icon = navLinksContainer.classList.contains('active') ? 'x' : 'menu';
      mobileBtn.innerHTML = `<i data-lucide="${icon}"></i>`;
      if (typeof lucide !== 'undefined') lucide.createIcons();
    });
    
    // Close menu when a nav link is clicked
    const links = navLinksContainer.querySelectorAll('.nav-link, .btn');
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinksContainer.classList.remove('active');
        mobileBtn.innerHTML = `<i data-lucide="menu"></i>`;
        if (typeof lucide !== 'undefined') lucide.createIcons();
      });
    });
  }

  // --- Portfolio Filtering ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filterValue === 'all' || filterValue === category) {
          card.style.display = 'flex';
          // Small delay for fade-in effect if needed
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.9)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300); // matches transition time
        }
      });
      
      // Refresh ScrollTrigger after layout change
      if (typeof ScrollTrigger !== 'undefined') {
        setTimeout(() => ScrollTrigger.refresh(), 350);
      }
    });
  });

  // --- Contact Form Submission (Mock) ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      
      btn.innerHTML = '<span>Sending...</span> <i data-lucide="loader-2" class="spin"></i>';
      btn.style.pointerEvents = 'none';
      
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }

      // Simulate API call
      setTimeout(() => {
        btn.innerHTML = '<span>Message Sent!</span> <i data-lucide="check"></i>';
        btn.style.background = '#005A6B'; // Success color (Brand Teal)
        
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }
        
        contactForm.reset();
        
        // Reset button after 3s
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.background = '';
          btn.style.pointerEvents = 'auto';
          if (typeof lucide !== 'undefined') {
            lucide.createIcons();
          }
        }, 3000);
      }, 1500);
    });
  }

  // --- FAQ Accordion ---
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');
      
      // Close all open items
      document.querySelectorAll('.accordion-item').forEach(i => {
        i.classList.remove('active');
      });
      
      // Toggle clicked item
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

});
