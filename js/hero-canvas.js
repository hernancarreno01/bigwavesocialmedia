/* ═══════════════════════════════════════════════════════════
   BigWave — Hero Canvas (hero-canvas.js)
   Animated tech wave with particles, nodes, and connections
   Lightweight Canvas 2D — pauses when not visible
   ═══════════════════════════════════════════════════════════ */

class HeroCanvas {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.ctx = canvasElement.getContext('2d');
    this.particles = [];
    this.connections = [];
    this.animationId = null;
    this.isVisible = true;
    this.mouse = { x: -1000, y: -1000 };
    this.time = 0;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.config = {
      particleCount: 80,
      connectionDistance: 140,
      particleSpeed: 0.3,
      waveAmplitude: 50,
      waveFrequency: 0.008,
      mouseRadius: 150,
      colors: {
        particle: ['rgba(0,188,212,', 'rgba(45,200,168,', 'rgba(91,191,207,', 'rgba(141,216,229,'],
        connection: 'rgba(0,188,212,',
      },
    };

    this.init();
  }

  init() {
    this.resize();
    this.createParticles();
    this.setupEvents();
    this.animate();
  }

  resize() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.width = rect.width;
    this.height = rect.height;
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.canvas.style.width = this.width + 'px';
    this.canvas.style.height = this.height + 'px';
    this.ctx.scale(this.dpr, this.dpr);
  }

  createParticles() {
    this.particles = [];
    const count = window.innerWidth < 768 ? 40 : this.config.particleCount;

    for (let i = 0; i < count; i++) {
      const colorBase = this.config.colors.particle[Math.floor(Math.random() * this.config.colors.particle.length)];
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        baseX: Math.random() * this.width,
        baseY: this.height * 0.3 + Math.random() * this.height * 0.5,
        vx: (Math.random() - 0.5) * this.config.particleSpeed,
        vy: (Math.random() - 0.5) * this.config.particleSpeed,
        radius: Math.random() * 2.5 + 1,
        color: colorBase,
        alpha: Math.random() * 0.5 + 0.3,
        phase: Math.random() * Math.PI * 2,
      });
    }
  }

  setupEvents() {
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        this.resize();
        this.createParticles();
      }, 250);
    });

    // Mouse interaction (desktop only)
    if (window.innerWidth > 768) {
      this.canvas.parentElement.addEventListener('mousemove', (e) => {
        const rect = this.canvas.parentElement.getBoundingClientRect();
        this.mouse.x = e.clientX - rect.left;
        this.mouse.y = e.clientY - rect.top;
      });

      this.canvas.parentElement.addEventListener('mouseleave', () => {
        this.mouse.x = -1000;
        this.mouse.y = -1000;
      });
    }

    // Visibility observer — pause when off-screen
    const observer = new IntersectionObserver(
      (entries) => {
        this.isVisible = entries[0].isIntersecting;
        if (this.isVisible && !this.animationId) {
          this.animate();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(this.canvas.parentElement);
  }

  updateParticles() {
    const waveOffset = this.time * 0.5;

    for (const p of this.particles) {
      // Wave motion
      const waveY = Math.sin(p.x * this.config.waveFrequency + waveOffset + p.phase) * this.config.waveAmplitude;
      const waveX = Math.cos(p.y * this.config.waveFrequency * 0.5 + waveOffset * 0.7 + p.phase) * 15;

      p.x += p.vx + waveX * 0.01;
      p.y += p.vy + waveY * 0.005;

      // Mouse repulsion
      const dx = p.x - this.mouse.x;
      const dy = p.y - this.mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < this.config.mouseRadius) {
        const force = (this.config.mouseRadius - dist) / this.config.mouseRadius;
        p.x += dx * force * 0.03;
        p.y += dy * force * 0.03;
      }

      // Boundaries — wrap around
      if (p.x < -20) p.x = this.width + 20;
      if (p.x > this.width + 20) p.x = -20;
      if (p.y < -20) p.y = this.height + 20;
      if (p.y > this.height + 20) p.y = -20;
    }
  }

  drawConnections() {
    const maxDist = this.config.connectionDistance;
    const len = this.particles.length;

    for (let i = 0; i < len; i++) {
      for (let j = i + 1; j < len; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.15;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.strokeStyle = this.config.colors.connection + alpha + ')';
          this.ctx.lineWidth = 0.8;
          this.ctx.stroke();
        }
      }
    }
  }

  drawParticles() {
    for (const p of this.particles) {
      const pulseAlpha = p.alpha + Math.sin(this.time * 2 + p.phase) * 0.15;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color + Math.max(0.1, pulseAlpha) + ')';
      this.ctx.fill();
    }
  }

  drawWaveLines() {
    // Subtle horizontal wave lines
    for (let w = 0; w < 3; w++) {
      this.ctx.beginPath();
      const yBase = this.height * (0.35 + w * 0.15);
      const alpha = 0.04 - w * 0.01;

      for (let x = 0; x < this.width; x += 3) {
        const y = yBase + Math.sin(x * 0.005 + this.time * 0.3 + w) * (30 + w * 10);
        if (x === 0) {
          this.ctx.moveTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }
      }

      this.ctx.strokeStyle = `rgba(0, 188, 212, ${alpha})`;
      this.ctx.lineWidth = 1.5;
      this.ctx.stroke();
    }
  }

  animate() {
    if (!this.isVisible) {
      this.animationId = null;
      return;
    }

    this.ctx.clearRect(0, 0, this.width, this.height);
    this.time += 0.016;

    this.drawWaveLines();
    this.updateParticles();
    this.drawConnections();
    this.drawParticles();

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }
}
