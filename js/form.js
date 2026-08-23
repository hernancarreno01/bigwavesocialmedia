/* ═══════════════════════════════════════════════════════════
   BigWave — Smart Form (form.js)
   Multi-step intelligent contact form
   ═══════════════════════════════════════════════════════════ */

class SmartForm {
  constructor() {
    this.form = document.getElementById('smart-form');
    if (!this.form) return;

    this.currentStep = 1;
    this.totalSteps = 2;
    this.selectedNeeds = [];
    
    this.init();
  }

  init() {
    this.setupChips();
    this.setupNavigation();
    this.setupSubmit();
  }

  setupChips() {
    const chips = this.form.querySelectorAll('.chip');

    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chip.classList.toggle('active');
        const pressed = chip.classList.contains('active');
        chip.setAttribute('aria-pressed', String(pressed));

        const value = chip.dataset.value;
        if (pressed) {
          this.selectedNeeds.push(value);
        } else {
          this.selectedNeeds = this.selectedNeeds.filter(n => n !== value);
        }
      });

      // Keyboard support
      chip.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          chip.click();
        }
      });
    });
  }

  setupNavigation() {
    const nextBtn = this.form.querySelector('[data-action="next"]');
    const backBtn = this.form.querySelector('[data-action="back"]');

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (this.selectedNeeds.length === 0) {
          // Visual feedback — at least select one
          const chipsContainer = this.form.querySelector('.smart-form__chips');
          chipsContainer.style.outline = '2px solid rgba(0,188,212,0.5)';
          chipsContainer.style.outlineOffset = '8px';
          chipsContainer.style.borderRadius = '12px';
          setTimeout(() => {
            chipsContainer.style.outline = '';
            chipsContainer.style.outlineOffset = '';
          }, 1500);
          return;
        }
        this.goToStep(2);
      });
    }

    if (backBtn) {
      backBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.goToStep(1);
      });
    }
  }

  goToStep(step) {
    const steps = this.form.querySelectorAll('.smart-form__step');
    steps.forEach(s => s.classList.remove('active'));

    const target = this.form.querySelector(`[data-step="${step}"]`);
    if (target) {
      target.classList.add('active');
      this.currentStep = step;
      
      // Scroll form into view
      this.form.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  setupSubmit() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = {
        needs: this.selectedNeeds,
        name: this.form.querySelector('#form-name')?.value || '',
        company: this.form.querySelector('#form-company')?.value || '',
        email: this.form.querySelector('#form-email')?.value || '',
        whatsapp: this.form.querySelector('#form-whatsapp')?.value || '',
        message: this.form.querySelector('#form-message')?.value || '',
      };

      // Basic validation
      if (!formData.name || !formData.email) {
        const emptyField = !formData.name 
          ? this.form.querySelector('#form-name')
          : this.form.querySelector('#form-email');
        emptyField.focus();
        emptyField.style.borderColor = '#FF6B6B';
        setTimeout(() => { emptyField.style.borderColor = ''; }, 2000);
        return;
      }

      // For now, create WhatsApp message
      const waMsg = this.buildWhatsAppMessage(formData);
      const waUrl = `https://wa.me/${BIGWAVE.brand.whatsapp}?text=${encodeURIComponent(waMsg)}`;
      
      // Show success state
      this.showSuccess(waUrl);
    });
  }

  buildWhatsAppMessage(data) {
    let msg = `Hola BigWave! 👋\n\n`;
    msg += `Soy *${data.name}*`;
    if (data.company) msg += ` de *${data.company}*`;
    msg += `.\n\n`;
    
    if (data.needs.length > 0) {
      msg += `Me interesa:\n`;
      data.needs.forEach(n => { msg += `• ${n}\n`; });
      msg += `\n`;
    }

    if (data.message) {
      msg += `${data.message}\n\n`;
    }

    msg += `📧 ${data.email}`;
    if (data.whatsapp) msg += `\n📱 ${data.whatsapp}`;
    
    return msg;
  }

  showSuccess(waUrl) {
    const step2 = this.form.querySelector('[data-step="2"]');
    if (step2) {
      step2.innerHTML = `
        <div class="text-center" style="padding: 2rem 0;">
          <div style="font-size: 3rem; margin-bottom: 1rem;">🌊</div>
          <h3 style="color: var(--white); margin-bottom: 1rem;">¡Mensaje listo!</h3>
          <p style="color: rgba(255,255,255,0.6); margin-bottom: 2rem; margin-inline: auto;">
            Tu consulta está preparada. Te redirigimos a WhatsApp para enviarla.
          </p>
          <a href="${waUrl}" target="_blank" rel="noopener" class="btn btn--whatsapp btn--lg">
            <span>Enviar por WhatsApp</span>
            <span class="btn-icon">→</span>
          </a>
          <p style="color: rgba(255,255,255,0.35); font-size: var(--text-xs); margin-top: 1.5rem; margin-inline: auto;">
            También podés escribirnos a ${BIGWAVE.brand.email}
          </p>
        </div>
      `;
    }
  }
}
