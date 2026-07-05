/**
 * ============================================
 * FABNEON — Animated Number Counters
 * ============================================
 */

function initCounters() {
  const counters = document.querySelectorAll('.stat-value');
  const speed = 200; // The lower the slower

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5 // Trigger when 50% of the element is visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = +counter.getAttribute('data-target');
        
        // Use a slight delay before starting to allow other animations to finish
        setTimeout(() => {
          const updateCount = () => {
            const count = +counter.innerText;
            // Lower inc to slow and higher to fast
            const inc = target / speed;

            // Check if target is reached and increment
            if (count < target) {
              // Add inc to count and output in counter
              counter.innerText = Math.ceil(count + inc);
              // Call function every ms
              setTimeout(updateCount, 15);
            } else {
              counter.innerText = target + (target > 90 ? '%' : '+');
            }
          };

          updateCount();
        }, 500); // 500ms delay

        // Stop observing once animation started
        observer.unobserve(counter);
      }
    });
  }, observerOptions);

  counters.forEach(counter => {
    observer.observe(counter);
  });
}

// Export or attach to window if using modules, else rely on main.js to call
window.initCounters = initCounters;
