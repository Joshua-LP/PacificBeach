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

// ========== CAROUSEL DE PRECIOS ==========
class PricingCarousel {
  constructor() {
    this.carousel = document.querySelector('.pricing-carousel');
    this.prevBtn = document.querySelector('.pricing-carousel-container .carousel-btn.prev');
    this.nextBtn = document.querySelector('.pricing-carousel-container .carousel-btn.next');
    this.init();
  }

  init() {
    if (!this.carousel) return;
    
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.scroll(-400));
    }
    
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.scroll(400));
    }
    
    // Touch events para móvil
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
    
    // Touch events para móvil
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

  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      navbar.style.boxShadow = '0 6px 30px rgba(0, 0, 0, 0.3)';
      navbar.style.backdropFilter = 'blur(15px)';
    } else {
      navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
      navbar.style.backdropFilter = 'blur(10px)';
    }
    
    lastScroll = currentScroll;
  });
}

// ========== FORM VALIDATION ==========
function initFormValidation() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  // Crear iframe oculto si no existe
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
    
    // Validación básica
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
      // Mostrar mensaje de éxito después de un pequeño delay
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
    '.lot-card, .pricing-card, .testimonial-card, .contact-info-card, .refiere-step'
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
  const ctaButtons = document.querySelectorAll('.cta-button, .pricing-button');
  
  ctaButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      if (this.textContent.includes('información')) {
        e.preventDefault();
        showInfoModal(this);
      }
    });
  });
}

// ========== MODAL DE INFORMACIÓN ==========
function showInfoModal(button) {
  const card = button.closest('.pricing-card');
  const lotSize = card.querySelector('.pricing-lot-size').textContent;
  const price = card.querySelector('.pricing-amount').textContent;
  
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
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes slideUp {
      from { transform: translateY(50px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
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

// ========== CONTADOR ANIMADO ==========
function initCounterAnimation() {
  const counters = document.querySelectorAll('.lot-size, .pricing-amount');
  
  const animateCounter = (element) => {
    const text = element.textContent;
    const number = text.match(/\d+/);
    
    if (number) {
      const target = parseInt(number[0]);
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        element.textContent = text.replace(/\d+/, Math.floor(current).toLocaleString());
      }, 16);
    }
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = 'true';
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
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

// ========== LAZY LOADING IMAGES ==========
function initLazyLoading() {
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }
}

// ========== INICIALIZAR TODO ==========
document.addEventListener('DOMContentLoaded', function() {
  // Inicializar componentes
  new HeroCarousel();
  new PricingCarousel();
  new TestimonialsCarousel();
  
  initMobileMenu();
  initSmoothScroll();
  initNavbarScroll();
  initFormValidation();
  initScrollAnimations();
  initCTAButtons();
  initWhatsAppButton();
  initCounterAnimation();
  initParallax();
  initActiveNavigation();
  initScrollToTop();
  initFloatingImageAnimation();
  initLazyLoading();
  
  // Log para confirmar inicialización
  console.log('✅ Pacific Beach - Website inicializado correctamente');
});

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
  
  // Cerrar menú al hacer clic en un enlace
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navWrapper.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
  
  // Cerrar menú al hacer clic fuera
  document.addEventListener('click', (e) => {
    if (!navWrapper.contains(e.target) && !menuToggle.contains(e.target) && navWrapper.classList.contains('active')) {
      menuToggle.classList.remove('active');
      navWrapper.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

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