/* ═══════════════════════════════════════════════════════════
   BigWave — Navbar (navbar.js)
   Sticky nav, scroll spy, hamburger, smooth scroll
   ═══════════════════════════════════════════════════════════ */

class Navbar {
  constructor() {
    this.navbar = document.getElementById('navbar');
    this.hamburger = document.getElementById('hamburger');
    this.mobileMenu = document.getElementById('mobile-menu');
    this.links = document.querySelectorAll('.navbar__link[href^="#"]');
    this.mobileLinks = document.querySelectorAll('.mobile-menu .navbar__link');
    this.sections = [];
    this.isMenuOpen = false;
    this.lastScrollY = 0;

    this.init();
  }

  init() {
    this.cacheSections();
    this.setupScroll();
    this.setupHamburger();
    this.setupSmoothScroll();
  }

  cacheSections() {
    this.links.forEach(link => {
      const id = link.getAttribute('href').substring(1);
      const section = document.getElementById(id);
      if (section) {
        this.sections.push({ id, el: section, link });
      }
    });
  }

  setupScroll() {
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.onScroll();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    // Initial check
    this.onScroll();
  }

  onScroll() {
    const scrollY = window.scrollY;

    // Toggle scrolled class for bg
    if (scrollY > 50) {
      this.navbar.classList.add('scrolled');
    } else {
      this.navbar.classList.remove('scrolled');
    }

    this.lastScrollY = scrollY;

    // Scroll spy
    this.updateActiveLink(scrollY);
  }

  updateActiveLink(scrollY) {
    const offset = 100;
    let currentSection = '';

    for (const section of this.sections) {
      const top = section.el.offsetTop - offset;
      const bottom = top + section.el.offsetHeight;

      if (scrollY >= top && scrollY < bottom) {
        currentSection = section.id;
        break;
      }
    }

    this.links.forEach(link => {
      const href = link.getAttribute('href').substring(1);
      if (href === currentSection) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  setupHamburger() {
    if (!this.hamburger) return;

    this.hamburger.addEventListener('click', () => {
      this.toggleMenu();
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isMenuOpen) {
        this.closeMenu();
      }
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.hamburger.classList.toggle('open', this.isMenuOpen);
    this.mobileMenu.classList.toggle('open', this.isMenuOpen);
    this.hamburger.setAttribute('aria-expanded', String(this.isMenuOpen));
    document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
  }

  closeMenu() {
    this.isMenuOpen = false;
    this.hamburger.classList.remove('open');
    this.mobileMenu.classList.remove('open');
    this.hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  setupSmoothScroll() {
    const allLinks = [...this.links, ...this.mobileLinks];

    allLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            this.closeMenu();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });
  }
}
