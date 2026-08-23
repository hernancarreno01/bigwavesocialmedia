/* ═══════════════════════════════════════════════════════════
   BigWave — App Orchestrator (app.js)
   Initializes all modules on DOMContentLoaded
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Hero Canvas ──
  const heroCanvasEl = document.getElementById('hero-canvas');
  if (heroCanvasEl) {
    // Skip canvas animation on reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      new HeroCanvas(heroCanvasEl);
    }
  }

  // ── Navbar ──
  new Navbar();

  // ── Scroll Animations ──
  new ScrollAnimations();

  // ── Smart Form ──
  new SmartForm();

  // ── Year in footer ──
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});
