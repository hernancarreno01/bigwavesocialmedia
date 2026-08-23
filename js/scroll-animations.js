/* ═══════════════════════════════════════════════════════════
   BigWave — Scroll Animations (scroll-animations.js)
   IntersectionObserver-based scroll reveal system
   ═══════════════════════════════════════════════════════════ */

class ScrollAnimations {
  constructor() {
    this.observers = [];
    this.init();
  }

  init() {
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Show all elements immediately
      document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => {
        el.classList.add('visible');
      });
      return;
    }

    this.setupRevealObserver();
    this.setupStaggerObserver();
    this.setupCounterObserver();
  }

  setupRevealObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Only animate once
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    document.querySelectorAll('.reveal').forEach(el => {
      observer.observe(el);
    });

    this.observers.push(observer);
  }

  setupStaggerObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px',
      }
    );

    document.querySelectorAll('.reveal-stagger').forEach(el => {
      observer.observe(el);
    });

    this.observers.push(observer);
  }

  setupCounterObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.target, 10);
            if (!isNaN(target)) {
              this.animateCounter(el, target);
            }
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('[data-counter]').forEach(el => {
      observer.observe(el);
    });

    this.observers.push(observer);
  }

  animateCounter(el, target) {
    const duration = 2000;
    const startTime = performance.now();
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(easedProgress * target);

      el.textContent = prefix + current + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }

  destroy() {
    this.observers.forEach(obs => obs.disconnect());
  }
}
