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

// ========== MODAL OFERTA ESPECIAL MEJORADO ==========
class OfferModal {
  constructor() {
    this.currentOffer = null;
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
          <div class="offer-badge">🔥 OFERTA LIMITADA</div>
          <h2>¡Descuento Especial!</h2>
          <p>Solo para 5 lotes seleccionados</p>
          <button class="offer-modal-close">×</button>
        </div>
        <div class="offer-modal-body">
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
              <label class="offer-form-label">¿Cuándo planeas comprar?</label>
              <input type="text" class="offer-form-input" name="cuando" placeholder="Ej: En 1 mes, En 3 meses...">
            </div>
            
            <button type="submit" class="offer-form-button">
              Ver Mi Descuento 🎉
            </button>
          </form>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    const closeBtn = modal.querySelector('.offer-modal-close');
    const overlay = modal.querySelector('.offer-modal-overlay');
    const form = modal.querySelector('#offerForm');
    
    closeBtn.addEventListener('click', () => this.closeModal(modal));
    overlay.addEventListener('click', () => this.closeModal(modal));
    form.addEventListener('submit', (e) => this.handleFormSubmit(e, modal));
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
    
    console.log('Datos del formulario:', {
      nombre,
      email,
      telefono,
      lotSize: this.currentOffer.lotSize,
      originalPrice: this.currentOffer.price
    });
    
    this.showDiscountReveal(modal);
  }

  showDiscountReveal(modal) {
    const modalBody = modal.querySelector('.offer-modal-body');
    const originalPrice = this.currentOffer.price;
    const discount = 0.30;
    const discountedPrice = originalPrice * (1 - discount);
    
    modalBody.innerHTML = `
      <div class="discount-reveal">
        <div class="discount-reveal-icon">🎊</div>
        <h3>¡Felicidades!</h3>
        <p>Has desbloqueado tu descuento exclusivo del 30%</p>
        
        <div class="discount-amount">30% DE DESCUENTO</div>
        
        <div class="original-price">Precio original: $${originalPrice.toLocaleString()}</div>
        <div class="discounted-price">Tu precio: $${discountedPrice.toLocaleString()}</div>
        
        <p><strong>Ahorras: $${(originalPrice * discount).toLocaleString()}</strong></p>
        <p>Esta oferta es válida solo para lotes seleccionados y por tiempo limitado.</p>
        
        <div class="discount-actions">
          <button class="discount-btn whatsapp" onclick="window.offerModal.contactWhatsApp()">
            💬 Contactar por WhatsApp
          </button>
          <button class="discount-btn contact" onclick="window.offerModal.scrollToContact()">
            📧 Ir al formulario
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
      `Precio original: $${price.toLocaleString()}, Precio con descuento: $${finalPrice.toLocaleString()}. ` +
      `¿Podrían darme más información?`
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
        <span class="notification-icon">${type === 'error' ? '⚠' : '✓'}</span>
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
      <span class="notification-icon">✓</span>
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
          📧 Formulario
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

// ========== INICIALIZAR TODO ==========
document.addEventListener('DOMContentLoaded', function() {
  // Inicializar componentes
  new HeroCarousel();
  window.offerModal = new OfferModal();
  new TestimonialsCarousel();
  
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
  
  console.log('✅ Pacific Beach - Website inicializado correctamente');
});

// ========== MANEJO DE RESIZE ==========
let resizeTimer;
window.addEventListener('resize', function() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {
    console.log('Ventana redimensionada');
  }, 250);
});

// ========== PREVENIR ERRORES ==========
window.addEventListener('error', function(e) {
  console.error('Error detectado:', e.message);
});

// ========== PERFORMANCE MONITORING ==========
if ('performance' in window) {
  window.addEventListener('load', function() {
    setTimeout(function() {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      console.log('⚡ Tiempo de carga de página:', pageLoadTime + 'ms');
    }, 0);
  });
}