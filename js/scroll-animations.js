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

/* ═══════════════════════════════════════════════════════════
   Keyboard Navigation (Arrow Keys)
   ═══════════════════════════════════════════════════════════ */
class KeyboardNavigation {
  constructor() {
    this.sections = Array.from(document.querySelectorAll('section, .hero, .footer'));
    this.isScrolling = false;
    this.init();
  }

  init() {
    window.addEventListener('keydown', (e) => {
      // Ignore if user is typing in form inputs
      if (['input', 'textarea'].includes(e.target.tagName.toLowerCase())) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        this.scrollToNext();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        this.scrollToPrev();
      }
    }, { passive: false });
  }

  getCurrentSectionIndex() {
    const scrollY = window.scrollY;
    const offset = 150; // allow some margin
    for (let i = this.sections.length - 1; i >= 0; i--) {
      if (scrollY >= this.sections[i].offsetTop - offset) {
        return i;
      }
    }
    return 0;
  }

  scrollToNext() {
    if (this.isScrolling) return;
    const currentIndex = this.getCurrentSectionIndex();
    if (currentIndex < this.sections.length - 1) {
      this.scrollTo(this.sections[currentIndex + 1]);
    }
  }

  scrollToPrev() {
    if (this.isScrolling) return;
    const currentIndex = this.getCurrentSectionIndex();
    
    // Si ya estamos muy pasados del inicio de la sección, subir al inicio de la misma
    if (window.scrollY > this.sections[currentIndex].offsetTop + 50) {
      this.scrollTo(this.sections[currentIndex]);
    } else if (currentIndex > 0) {
      this.scrollTo(this.sections[currentIndex - 1]);
    }
  }

  scrollTo(element) {
    this.isScrolling = true;
    element.scrollIntoView({ behavior: 'smooth' });
    
    // Unlock after animation finishes
    setTimeout(() => {
      this.isScrolling = false;
    }, 700);
  }
}
