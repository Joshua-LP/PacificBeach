// ========== CAROUSEL HERO ==========
class HeroCarousel {
  constructor() {
    this.slides = document.querySelectorAll('.hero-slide');
    this.indicators = document.querySelectorAll('.indicator');
    this.currentSlide = 0;
    this.slideInterval = null;
    this.init();
  }

  init() {
    if (this.slides.length > 0) {
      this.showSlide(0);
      this.startAutoplay();
      this.initControls();
      this.initIndicators();
    }
  }

  showSlide(index) {
    this.slides.forEach(slide => slide.classList.remove('active'));
    this.indicators.forEach(ind => ind.classList.remove('active'));
    
    this.currentSlide = index;
    this.slides[this.currentSlide].classList.add('active');
    this.indicators[this.currentSlide].classList.add('active');
  }

  nextSlide() {
    const next = (this.currentSlide + 1) % this.slides.length;
    this.showSlide(next);
  }

  prevSlide() {
    const prev = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.showSlide(prev);
  }

  startAutoplay() {
    this.slideInterval = setInterval(() => this.nextSlide(), 5000);
  }

  stopAutoplay() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  initControls() {
    const prevBtn = document.querySelector('.hero-nav-btn.prev');
    const nextBtn = document.querySelector('.hero-nav-btn.next');
    
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        this.stopAutoplay();
        this.prevSlide();
        this.startAutoplay();
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.stopAutoplay();
        this.nextSlide();
        this.startAutoplay();
      });
    }
  }

  initIndicators() {
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        this.stopAutoplay();
        this.showSlide(index);
        this.startAutoplay();
      });
    });
  }
}

// ========== COUNTDOWN TIMER ==========
class CountdownTimer {
  constructor(hours = 72) {
    this.endTime = Date.now() + (hours * 60 * 60 * 1000);
    this.timerElement = null;
  }

  formatTime(value) {
    return value < 10 ? `0${value}` : value;
  }

  update() {
    const now = Date.now();
    const distance = this.endTime - now;

    if (distance < 0) {
      this.endTime = Date.now() + (72 * 60 * 60 * 1000);
    }

    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return {
      hours: this.formatTime(hours),
      minutes: this.formatTime(minutes),
      seconds: this.formatTime(seconds)
    };
  }

  render() {
    const time = this.update();
    return `
      <div class="countdown-timer">
        <div class="countdown-timer-title">
          ⏳ ¡Oferta limitada! Este descuento solo estará disponible por las próximas 72 horas.
        </div>
        <div class="timer-display">
          <div class="timer-unit">
            <span class="timer-value">${time.hours}</span>
            <span class="timer-label">Horas</span>
          </div>
          <div class="timer-unit">
            <span class="timer-value">${time.minutes}</span>
            <span class="timer-label">Minutos</span>
          </div>
          <div class="timer-unit">
            <span class="timer-value">${time.seconds}</span>
            <span class="timer-label">Segundos</span>
          </div>
        </div>
      </div>
    `;
  }

  start(container) {
    this.timerElement = container;
    this.timerElement.innerHTML = this.render();
    setInterval(() => {
      this.timerElement.innerHTML = this.render();
    }, 1000);
  }
}

// ========== MODAL OFERTA ESPECIAL MEJORADO ==========
class OfferModal {
  constructor() {
    this.currentOffer = null;
    this.timer = new CountdownTimer(72);
    this.termsAccepted = false;
    this.privacyAccepted = false;
    this.init();
  }

  init() {
    const offerButtons = document.querySelectorAll('.special-offer-btn');
    offerButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        const lotSize = button.dataset.lotSize;
        const price = parseFloat(button.dataset.price);
        this.showOfferModal(lotSize, price);
      });
    });
  }

  showOfferModal(lotSize, price) {
    this.currentOffer = { lotSize, price };
    
    const modal = document.createElement('div');
    modal.className = 'offer-modal';
    modal.innerHTML = `
      <div class="offer-modal-overlay"></div>
      <div class="offer-modal-content">
        <div class="offer-modal-header">
          <div class="offer-badge">OFERTA LIMITADA</div>
          <h2>¡Descuento Especial!</h2>
          <p>Solo para 5 lotes seleccionados</p>
          <button class="offer-modal-close">×</button>
        </div>
        <div class="offer-modal-body">
          <div id="countdown-container"></div>
          
          <div class="reservation-section">
            <h3>💰 Aprovecha y separa tu lote hoy mismo con solo $200 reembolsables</h3>
            <div class="reservation-benefits">
              <div class="reservation-benefit">Asegura el precio con descuento</div>
              <div class="reservation-benefit">Bloquea disponibilidad del lote</div>
              <div class="reservation-benefit">Sin riesgo – separación 100% reembolsable</div>
            </div>
            <div class="reservation-price">
              <span class="reservation-amount">$200</span>
              <span class="reservation-subtitle">Separación reembolsable</span>
            </div>
          </div>
          
          <div class="offer-info">
            <h3>🎁 Beneficios Exclusivos</h3>
            <ul>
              <li>Descuento del 30% en lotes seleccionados</li>
              <li>Promoción válida hasta diciembre 2025</li>
              <li>Solo 5 lotes disponibles con esta oferta</li>
              <li>Planes de pago flexibles sin intereses</li>
            </ul>
          </div>
          
          <h3 class="offer-form-title">Completa tus datos para acceder al descuento</h3>
          
          <form class="offer-form" id="offerForm">
            <div class="offer-form-group">
              <label class="offer-form-label">Nombre completo *</label>
              <input type="text" class="offer-form-input" name="nombre" required>
            </div>
            
            <div class="offer-form-group">
              <label class="offer-form-label">Correo electrónico *</label>
              <input type="email" class="offer-form-input" name="email" required>
            </div>
            
            <div class="offer-form-group">
              <label class="offer-form-label">Teléfono *</label>
              <input type="tel" class="offer-form-input" name="telefono" required>
            </div>
            
            <div class="offer-form-group">
              <label class="offer-form-label">¿Cómo se enteró de la oferta?</label>
              <input type="text" class="offer-form-input" name="como_se_entero">
            </div>
            
            <div class="terms-checkbox-group">
              <div class="checkbox-container">
                <input type="checkbox" id="terms-checkbox" name="terms">
                <label for="terms-checkbox" class="checkbox-label">
                  Acepto los <a href="#" id="terms-link">Términos y Condiciones</a> y el tratamiento de datos personales *
                </label>
              </div>
              
              <div class="checkbox-container">
                <input type="checkbox" id="privacy-checkbox" name="privacy">
                <label for="privacy-checkbox" class="checkbox-label">
                  Acepto recibir comunicaciones comerciales según la <a href="#" id="privacy-link">Política de Comunicaciones</a> *
                </label>
              </div>
            </div>
            
            <button type="submit" class="offer-form-button" id="submitOfferBtn" disabled>
              Ver Mi Descuento
            </button>
          </form>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    const countdownContainer = modal.querySelector('#countdown-container');
    this.timer.start(countdownContainer);
    
    const closeBtn = modal.querySelector('.offer-modal-close');
    const overlay = modal.querySelector('.offer-modal-overlay');
    const form = modal.querySelector('#offerForm');
    const termsCheckbox = modal.querySelector('#terms-checkbox');
    const privacyCheckbox = modal.querySelector('#privacy-checkbox');
    const submitBtn = modal.querySelector('#submitOfferBtn');
    const termsLink = modal.querySelector('#terms-link');
    const privacyLink = modal.querySelector('#privacy-link');
    
    termsCheckbox.addEventListener('change', () => {
      this.termsAccepted = termsCheckbox.checked;
      this.updateSubmitButton(submitBtn);
    });
    
    privacyCheckbox.addEventListener('change', () => {
      this.privacyAccepted = privacyCheckbox.checked;
      this.updateSubmitButton(submitBtn);
    });
    
    termsLink.addEventListener('click', (e) => {
      e.preventDefault();
      this.showTermsModal('terms');
    });
    
    privacyLink.addEventListener('click', (e) => {
      e.preventDefault();
      this.showTermsModal('privacy');
    });
    
    closeBtn.addEventListener('click', () => this.closeModal(modal));
    overlay.addEventListener('click', () => this.closeModal(modal));
    form.addEventListener('submit', (e) => this.handleFormSubmit(e, modal));
  }

  updateSubmitButton(button) {
    if (this.termsAccepted && this.privacyAccepted) {
      button.disabled = false;
      button.style.opacity = '1';
    } else {
      button.disabled = true;
      button.style.opacity = '0.6';
    }
  }

  showTermsModal(type) {
    const modal = document.createElement('div');
    modal.className = 'terms-modal';
    
    let content = '';
    
    if (type === 'terms') {
      content = `
        <h2>Tratamiento de Datos Personales</h2>
        <p>En cumplimiento de la Ley N.° 29733 – Ley de Protección de Datos Personales y su Reglamento, informamos a los usuarios que los datos personales que nos proporcionen a través de este sitio web serán incorporados a un banco de datos de titularidad de Pacific Beach, con domicilio en Av. La Molina 3879, Urb. Sol de la Molina.</p>
        
        <h3>Finalidad del Tratamiento</h3>
        <p>La finalidad del tratamiento de los datos es gestionar consultas, atender solicitudes, enviar información sobre nuestros productos y servicios, así como fines estadísticos y/o administrativos.</p>
        
        <h3>Confidencialidad y Compartición de Datos</h3>
        <p>Los datos serán tratados de manera confidencial y únicamente podrán ser compartidos con terceros cuando sea necesario para cumplir las finalidades antes mencionadas o por mandato legal.</p>
        
        <h3>Derechos ARCO</h3>
        <p>El usuario podrá ejercer en cualquier momento sus derechos de acceso, rectificación, cancelación y oposición (ARCO), enviando una solicitud a admin@pacificbeach.pe.</p>
        
        <h3>Consentimiento</h3>
        <p>El consentimiento otorgado para el tratamiento de sus datos es indefinido, sin perjuicio de que pueda ser revocado en cualquier momento mediante comunicación escrita al correo indicado.</p>
        
        <p><strong>Al utilizar este sitio web y enviar sus datos personales, el usuario declara haber leído y aceptado los términos del presente documento.</strong></p>
      `;
    } else {
      content = `
        <h2>Política para el Envío de Comunicaciones Comerciales</h2>
        <p>Pacific Beach, con domicilio en Av. La Molina 3879, Urb. Sol de la Molina, informa a los usuarios que, al brindar sus datos personales a través de este sitio web o cualquier otro medio habilitado, otorgan su consentimiento expreso para el envío de comunicaciones comerciales, promocionales y/o informativas relacionadas con nuestros productos, servicios, actividades y eventos.</p>
        
        <h3>Medios de Comunicación</h3>
        <p>Estas comunicaciones podrán realizarse mediante correo electrónico, mensajes de texto (SMS), aplicaciones de mensajería instantánea o llamadas telefónicas, siempre respetando la normativa vigente sobre protección de datos personales y comunicaciones comerciales.</p>
        
        <h3>Revocación del Consentimiento</h3>
        <p>El usuario podrá en cualquier momento revocar su consentimiento o solicitar la cancelación de estas comunicaciones, enviando un correo electrónico a admin@pacificbeach.pe, sin que ello afecte la licitud del tratamiento realizado con anterioridad.</p>
        
        <h3>Compromiso de Pacific Beach</h3>
        <p>Pacific Beach se compromete a no remitir comunicaciones comerciales que no hayan sido previamente autorizadas por el usuario, garantizando la confidencialidad y seguridad de los datos proporcionados.</p>
      `;
    }
    
    modal.innerHTML = `
      <div class="terms-modal-content">
        <button class="terms-modal-close">×</button>
        ${content}
      </div>
    `;
    
    document.body.appendChild(modal);
    
    const closeBtn = modal.querySelector('.terms-modal-close');
    closeBtn.addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
  }

  handleFormSubmit(e, modal) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const nombre = formData.get('nombre');
    const email = formData.get('email');
    const telefono = formData.get('telefono');
    
    if (!nombre || !email || !telefono) {
      this.showNotification('Por favor completa todos los campos requeridos', 'error');
      return;
    }
    
    if (!this.termsAccepted || !this.privacyAccepted) {
      this.showNotification('Debes aceptar los términos y condiciones para continuar', 'error');
      return;
    }
    
    console.log('Datos del formulario:', {
      nombre,
      email,
      telefono,
      lotSize: this.currentOffer.lotSize,
      originalPrice: this.currentOffer.price,
      termsAccepted: this.termsAccepted,
      privacyAccepted: this.privacyAccepted
    });
    
    this.showDiscountReveal(modal);
  }

  showDiscountReveal(modal) {
    const modalBody = modal.querySelector('.offer-modal-body');
    const originalPrice = this.currentOffer.price;
    const discount = 0.30;
    const discountedPrice = originalPrice * (1 - discount);
    const savings = originalPrice * discount;
    
    modalBody.innerHTML = `
      <div class="discount-reveal">
        <div class="discount-reveal-icon">🎉 DESCUENTO DESBLOQUEADO 🎉</div>
        <h3>¡Felicidades!</h3>
        <p>Has desbloqueado tu descuento exclusivo del 30%</p>
        
        <div class="discount-amount">30% DE DESCUENTO</div>
        
        <div class="original-price">Precio original: ${originalPrice.toLocaleString()}</div>
        <div class="discounted-price">Tu precio: ${discountedPrice.toLocaleString()}</div>
        
        <p><strong>Ahorras: ${savings.toLocaleString()}</strong></p>
        <p>Esta oferta es válida solo para lotes seleccionados y por tiempo limitado.</p>
        
        <div class="reservation-section">
          <h3>💰 Separa tu lote ahora con solo $200 reembolsables</h3>
          <div class="reservation-price">
            <span class="reservation-amount">$200</span>
            <span class="reservation-subtitle">100% reembolsable - Sin riesgo</span>
          </div>
        </div>
        
        <div class="discount-actions">
          <button class="discount-btn whatsapp" onclick="window.offerModal.contactWhatsApp()">
            💬 Contactar por WhatsApp
          </button>
          <button class="discount-btn contact" onclick="window.offerModal.scrollToContact()">
            📝 Ir al formulario
          </button>
        </div>
      </div>
    `;
  }

  contactWhatsApp() {
    const { lotSize, price } = this.currentOffer;
    const discount = price * 0.30;
    const finalPrice = price * 0.70;
    const message = encodeURIComponent(
      `¡Hola! Estoy interesado en el lote de ${lotSize} con el descuento especial del 30%. ` +
      `Precio original: ${price.toLocaleString()}, Precio con descuento: ${finalPrice.toLocaleString()}. ` +
      `Me gustaría separar el lote con $200 reembolsables. ¿Podrían darme más información?`
    );
    window.open(`https://wa.me/51933597955?text=${message}`, '_blank');
  }

  scrollToContact() {
    this.closeModal(document.querySelector('.offer-modal'));
    const contactSection = document.querySelector('#contacto');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  closeModal(modal) {
    modal.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => {
      modal.remove();
      document.body.style.overflow = '';
    }, 300);
  }

  showNotification(message, type = 'error') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <span class="notification-icon">${type === 'error' ? '⚠' : '✔'}</span>
        <div>
          <strong>${type === 'error' ? 'Error' : 'Éxito'}</strong>
          <p>${message}</p>
        </div>
      </div>
    `;
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: ${type === 'error' ? 'linear-gradient(135deg, #f44336, #da190b)' : 'linear-gradient(135deg, #4CAF50, #45a049)'};
      color: white;
      padding: 20px 30px;
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      z-index: 10001;
      animation: slideInRight 0.5s ease;
      max-width: 350px;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideInRight {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
      }
      .notification-content {
        display: flex;
        align-items: center;
        gap: 15px;
      }
      .notification-icon {
        font-size: 2rem;
        background: rgba(255,255,255,0.2);
        width: 45px;
        height: 45px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.5s ease';
      setTimeout(() => notification.remove(), 500);
    }, 4000);
  }
}

// ========== CAROUSEL DE TESTIMONIOS ==========
class TestimonialsCarousel {
  constructor() {
    this.carousel = document.querySelector('.testimonials-carousel');
    this.prevBtn = document.querySelector('.testimonials-carousel-container .carousel-btn.prev');
    this.nextBtn = document.querySelector('.testimonials-carousel-container .carousel-btn.next');
    this.init();
  }

  init() {
    if (!this.carousel) return;
    
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.scroll(-380));
    }
    
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.scroll(380));
    }
    
    this.initTouchEvents();
  }

  scroll(amount) {
    this.carousel.scrollBy({
      left: amount,
      behavior: 'smooth'
    });
  }

  initTouchEvents() {
    let startX = 0;
    let scrollLeft = 0;
    
    this.carousel.addEventListener('touchstart', (e) => {
      startX = e.touches[0].pageX;
      scrollLeft = this.carousel.scrollLeft;
    });
    
    this.carousel.addEventListener('touchmove', (e) => {
      const x = e.touches[0].pageX;
      const walk = (startX - x) * 2;
      this.carousel.scrollLeft = scrollLeft + walk;
    });
  }
}

// ========== SMOOTH SCROLL ==========
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const offset = 80;
          const targetPosition = target.offsetTop - offset;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

// ========== NAVBAR SCROLL EFFECT ==========
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      navbar.style.boxShadow = '0 6px 30px rgba(0, 0, 0, 0.3)';
      navbar.style.backdropFilter = 'blur(15px)';
    } else {
      navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
      navbar.style.backdropFilter = 'blur(10px)';
    }
  });
}

// ========== FORM VALIDATION ==========
function initFormValidation() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  if (!document.getElementById('hidden_iframe')) {
    const iframe = document.createElement('iframe');
    iframe.name = 'hidden_iframe';
    iframe.id = 'hidden_iframe';
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
  }

  form.addEventListener('submit', function(e) {
    const nombre = form.querySelector('input[name="entry.466729256"]');
    const telefono = form.querySelector('input[name="entry.881075350"]');
    const email = form.querySelector('input[name="entry.179096599"]');
    const mensaje = form.querySelector('textarea[name="entry.439370938"]');
    
    let isValid = true;
    let errorMessage = '';
    
    if (!nombre || nombre.value.trim() === '') {
      isValid = false;
      errorMessage += 'Por favor ingresa tu nombre.\n';
    }
    
    if (!telefono || telefono.value.trim() === '') {
      isValid = false;
      errorMessage += 'Por favor ingresa tu teléfono.\n';
    }
    
    if (!email || email.value.trim() === '') {
      isValid = false;
      errorMessage += 'Por favor ingresa tu correo electrónico.\n';
    } else if (!isValidEmail(email.value)) {
      isValid = false;
      errorMessage += 'Por favor ingresa un correo electrónico válido.\n';
    }
    
    if (!mensaje || mensaje.value.trim() === '') {
      isValid = false;
      errorMessage += 'Por favor ingresa tu mensaje.\n';
    }
    
    if (!isValid) {
      e.preventDefault();
      showErrorMessage(errorMessage);
    } else {
      setTimeout(() => {
        showSuccessMessage();
        form.reset();
      }, 500);
    }
  });
}

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function showSuccessMessage() {
  const message = document.createElement('div');
  message.className = 'notification success';
  message.innerHTML = `
    <div class="notification-content">
      <span class="notification-icon">✔</span>
      <div>
        <strong>¡Mensaje enviado exitosamente!</strong>
        <p>Nos contactaremos contigo pronto.</p>
      </div>
    </div>
  `;
  message.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: linear-gradient(135deg, #4CAF50, #45a049);
    color: white;
    padding: 20px 30px;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    z-index: 10000;
    animation: slideInRight 0.5s ease;
    max-width: 350px;
  `;
  
  document.body.appendChild(message);
  
  setTimeout(() => {
    message.style.animation = 'slideOutRight 0.5s ease';
    setTimeout(() => message.remove(), 500);
  }, 4000);
}

function showErrorMessage(text) {
  const message = document.createElement('div');
  message.className = 'notification error';
  message.innerHTML = `
    <div class="notification-content">
      <span class="notification-icon">⚠</span>
      <div>
        <strong>Error en el formulario</strong>
        <p>${text.replace(/\n/g, '<br>')}</p>
      </div>
    </div>
  `;
  message.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: linear-gradient(135deg, #f44336, #da190b);
    color: white;
    padding: 20px 30px;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    z-index: 10000;
    animation: slideInRight 0.5s ease;
    max-width: 350px;
  `;
  
  document.body.appendChild(message);
  
  setTimeout(() => {
    message.style.animation = 'slideOutRight 0.5s ease';
    setTimeout(() => message.remove(), 500);
  }, 4000);
}

// ========== ANIMACIONES ON SCROLL ==========
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  const animateElements = document.querySelectorAll(
    '.pricing-card, .testimonial-card, .contact-info-card, .refiere-step'
  );
  
  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
  });
}

// ========== BOTONES CTA ==========
function initCTAButtons() {
  const ctaButtons = document.querySelectorAll('.pricing-button');
  
  ctaButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const lotSize = this.dataset.lotSize;
      const price = this.dataset.price;
      showInfoModal(lotSize, price);
    });
  });
}

// ========== MODAL DE INFORMACIÓN ==========
function showInfoModal(lotSize, price) {
  const modal = document.createElement('div');
  modal.className = 'info-modal';
  modal.innerHTML = `
    <div class="modal-overlay"></div>
    <div class="modal-content">
      <button class="modal-close">×</button>
      <h2>Lote de ${lotSize}</h2>
      <p class="modal-price">${price}</p>
      <p>¿Te interesa este lote? Contáctanos para más información y agenda una visita.</p>
      <div class="modal-actions">
        <a href="https://wa.me/51933597955?text=Hola, estoy interesado en el lote de ${lotSize}" class="modal-btn whatsapp" target="_blank">
          💬 WhatsApp
        </a>
        <a href="#contacto" class="modal-btn contact">
          📝 Formulario
        </a>
      </div>
    </div>
  `;
  
  const style = document.createElement('style');
  style.textContent = `
    .info-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: fadeIn 0.3s ease;
    }
    .modal-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.8);
    }
    .modal-content {
      position: relative;
      background: white;
      max-width: 500px;
      padding: 40px;
      border-radius: 20px;
      z-index: 10001;
      animation: slideUp 0.3s ease;
      text-align: center;
    }
    .modal-close {
      position: absolute;
      top: 15px;
      right: 15px;
      background: none;
      border: none;
      font-size: 2rem;
      cursor: pointer;
      color: #999;
      transition: color 0.3s;
    }
    .modal-close:hover {
      color: #333;
    }
    .modal-content h2 {
      color: var(--navy-blue);
      margin-bottom: 10px;
    }
    .modal-price {
      font-size: 2rem;
      font-weight: 700;
      color: var(--primary-yellow);
      margin-bottom: 20px;
    }
    .modal-content p {
      color: #666;
      margin-bottom: 30px;
      line-height: 1.6;
    }
    .modal-actions {
      display: flex;
      gap: 15px;
    }
    .modal-btn {
      flex: 1;
      padding: 15px;
      border-radius: 12px;
      text-decoration: none;
      font-weight: 700;
      transition: all 0.3s;
      text-align: center;
    }
    .modal-btn.whatsapp {
      background: #25D366;
      color: white;
    }
    .modal-btn.whatsapp:hover {
      background: #20ba5a;
      transform: translateY(-2px);
    }
    .modal-btn.contact {
      background: var(--primary-yellow);
      color: var(--navy-blue);
    }
    .modal-btn.contact:hover {
      background: #FFA500;
      transform: translateY(-2px);
    }
  `;
  document.head.appendChild(style);
  
  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';
  
  const closeModal = () => {
    modal.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => {
      modal.remove();
      document.body.style.overflow = '';
    }, 300);
  };
  
  modal.querySelector('.modal-close').addEventListener('click', closeModal);
  modal.querySelector('.modal-overlay').addEventListener('click', closeModal);
  modal.querySelector('.modal-btn.contact').addEventListener('click', closeModal);
}

// ========== WHATSAPP BUTTON ==========
function initWhatsAppButton() {
  const whatsappBtn = document.querySelector('.chat-button');
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', function() {
      const phone = '51933597955';
      const message = encodeURIComponent('Hola, estoy interesado en los proyectos de Pacific Beach. ¿Podrían darme más información?');
      window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
    });
  }
}

// ========== PARALLAX EFFECT ==========
function initParallax() {
  const heroSlides = document.querySelectorAll('.hero-slide');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (scrolled < 800) {
      heroSlides.forEach(slide => {
        if (slide.classList.contains('active')) {
          slide.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
      });
    }
  });
}

// ========== NAVEGACIÓN ACTIVA ==========
function initActiveNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu a');

  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// ========== SCROLL TO TOP BUTTON ==========
function initScrollToTop() {
  const scrollBtn = document.createElement('div');
  scrollBtn.className = 'scroll-to-top';
  scrollBtn.innerHTML = '↑';
  scrollBtn.style.cssText = `
    position: fixed;
    bottom: 90px;
    right: 20px;
    width: 50px;
    height: 50px;
    background: var(--navy-blue);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s;
    z-index: 999;
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  `;
  
  document.body.appendChild(scrollBtn);

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
      scrollBtn.style.opacity = '1';
      scrollBtn.style.visibility = 'visible';
    } else {
      scrollBtn.style.opacity = '0';
      scrollBtn.style.visibility = 'hidden';
    }
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  scrollBtn.addEventListener('mouseenter', () => {
    scrollBtn.style.transform = 'scale(1.1) translateY(-5px)';
  });
  
  scrollBtn.addEventListener('mouseleave', () => {
    scrollBtn.style.transform = 'scale(1) translateY(0)';
  });
}

// ========== ANIMACIÓN IMAGEN FLOTANTE ==========
function initFloatingImageAnimation() {
  const floatingImage = document.querySelector('.floating-image-right');
  if (!floatingImage) return;

  floatingImage.style.cursor = 'pointer';
  floatingImage.addEventListener('click', function() {
    const contactSection = document.querySelector('#contacto');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// ========== MENÚ MÓVIL ==========
function initMobileMenu() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const navWrapper = document.querySelector('.nav-wrapper');
  const navLinks = document.querySelectorAll('.nav-menu a');
  
  if (!menuToggle || !navWrapper) return;
  
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navWrapper.classList.toggle('active');
    document.body.style.overflow = navWrapper.classList.contains('active') ? 'hidden' : '';
  });
  
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navWrapper.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
  
  document.addEventListener('click', (e) => {
    if (!navWrapper.contains(e.target) && !menuToggle.contains(e.target) && navWrapper.classList.contains('active')) {
      menuToggle.classList.remove('active');
      navWrapper.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

// ========== ANIMACIONES DE HOVER EN CARDS ==========
function initCardAnimations() {
  const cards = document.querySelectorAll('.pricing-card, .testimonial-card, .refiere-step');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
}

// ========== LOADING ANIMATION ==========
function initLoadingAnimation() {
  const elements = document.querySelectorAll('.pricing-card, .testimonial-card, .refiere-step, .contact-info-card');
  
  elements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, index * 100);
  });
}

// ========== EFECTO RIPPLE EN BOTONES ==========
function initRippleEffect() {
  const buttons = document.querySelectorAll('.cta-button, .pricing-button, .form-button');
  
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        animation: rippleEffect 0.6s ease-out;
      `;
      
      if (!document.querySelector('#ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
          @keyframes rippleEffect {
            to {
              transform: scale(4);
              opacity: 0;
            }
          }
        `;
        document.head.appendChild(style);
      }
      
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });
}

// ========== CONTADOR DE VISITANTES (SIMULADO) ==========
function initVisitorCounter() {
  const footer = document.querySelector('.footer-bottom');
  if (!footer) return;
  
  const baseVisitors = 1247;
  const randomAdd = Math.floor(Math.random() * 50);
  const totalVisitors = baseVisitors + randomAdd;
  
  const counter = document.createElement('p');
  counter.style.cssText = `
    font-size: 0.85rem;
    margin-top: 10px;
    opacity: 0.7;
  `;
  counter.textContent = `👥 ${totalVisitors.toLocaleString()} personas han visitado este sitio`;
  
  footer.appendChild(counter);
}

// ========== ANIMACIÓN DE NÚMEROS ==========
function animateNumber(element, start, end, duration) {
  const range = end - start;
  const increment = range / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
      current = end;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current).toLocaleString();
  }, 16);
}

// ========== INICIALIZAR TODO ==========
document.addEventListener('DOMContentLoaded', function() {
  console.log('🌊 Pacific Beach - Inicializando...');
  
  // Inicializar componentes principales
  new HeroCarousel();
  window.offerModal = new OfferModal();
  new TestimonialsCarousel();
  
  // Inicializar funcionalidades
  initMobileMenu();
  initSmoothScroll();
  initNavbarScroll();
  initFormValidation();
  initScrollAnimations();
  initCTAButtons();
  initWhatsAppButton();
  initParallax();
  initActiveNavigation();
  initScrollToTop();
  initFloatingImageAnimation();
  initCardAnimations();
  initLoadingAnimation();
  initRippleEffect();
  initVisitorCounter();
  
  // Animación de entrada para secciones
  setTimeout(() => {
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
      setTimeout(() => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        requestAnimationFrame(() => {
          section.style.opacity = '1';
          section.style.transform = 'translateY(0)';
        });
      }, index * 200);
    });
  }, 100);
  
  console.log('✅ Pacific Beach - Website inicializado correctamente');
});

// ========== MANEJO DE RESIZE ==========
let resizeTimer;
window.addEventListener('resize', function() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {
    console.log('📱 Ventana redimensionada');
    
    // Reajustar carouseles si es necesario
    const carousel = document.querySelector('.testimonials-carousel');
    if (carousel) {
      carousel.scrollLeft = 0;
    }
  }, 250);
});

// ========== PREVENIR ERRORES ==========
window.addEventListener('error', function(e) {
  console.error('❌ Error detectado:', e.message);
});

// ========== PERFORMANCE MONITORING ==========
if ('performance' in window) {
  window.addEventListener('load', function() {
    setTimeout(function() {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      console.log('⚡ Tiempo de carga de página:', pageLoadTime + 'ms');
      
      if (pageLoadTime > 3000) {
        console.warn('⚠️ La página tardó más de 3 segundos en cargar');
      } else {
        console.log('✨ Tiempo de carga óptimo');
      }
    }, 0);
  });
}

// ========== DETECTAR INACTIVIDAD ==========
let inactivityTimer;
function resetInactivityTimer() {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(() => {
    console.log('😴 Usuario inactivo por 5 minutos');
    // Aquí podrías mostrar un mensaje o una oferta especial
  }, 300000); // 5 minutos
}

window.addEventListener('mousemove', resetInactivityTimer);
window.addEventListener('keypress', resetInactivityTimer);
window.addEventListener('click', resetInactivityTimer);
window.addEventListener('scroll', resetInactivityTimer);

resetInactivityTimer();

// ========== DETECTAR SALIDA DE PÁGINA ==========
window.addEventListener('beforeunload', function(e) {
  console.log('👋 Usuario saliendo de la página');
  // Aquí podrías trackear la salida o mostrar un mensaje
});

// ========== LAZY LOADING DE IMÁGENES ==========
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ========== ANIMACIÓN DE PROGRESO DE SCROLL ==========
function initScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #FFD700, #FFA500);
    z-index: 10001;
    transition: width 0.1s ease;
  `;
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  });
}

initScrollProgress();

// ========== CONSOLE STYLING ==========
console.log(
  '%c🌊 Pacific Beach %c- Tu casa de playa te espera',
  'color: #1976D2; font-size: 24px; font-weight: bold;',
  'color: #FFD700; font-size: 16px; font-weight: normal;'
);

console.log(
  '%c¿Interesado en trabajar con nosotros? Envía tu CV a admin@pacificbeach.pe',
  'color: #0A3A5C; font-size: 12px; font-style: italic;'
);