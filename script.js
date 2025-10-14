// ========== CAROUSEL HERO ==========
class HeroCarousel {
  constructor() {
    this.slides = document.querySelectorAll('.hero-slide');
    this.currentSlide = 0;
    this.slideInterval = null;
    this.init();
  }

  init() {
    if (this.slides.length > 0) {
      this.showSlide(0);
      this.startAutoplay();
    }
  }

  showSlide(index) {
    this.slides.forEach(slide => slide.classList.remove('active'));
    this.currentSlide = index;
    this.slides[this.currentSlide].classList.add('active');
  }

  nextSlide() {
    const next = (this.currentSlide + 1) % this.slides.length;
    this.showSlide(next);
  }

  startAutoplay() {
    this.slideInterval = setInterval(() => this.nextSlide(), 5000);
  }

  stopAutoplay() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
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
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
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
      navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.4)';
    } else {
      navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    }
    
    lastScroll = currentScroll;
  });
}

// ========== FORM VALIDATION ==========
function initFormValidation() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nombre = form.querySelector('input[placeholder*="Nombre"]');
    const telefono = form.querySelector('input[placeholder*="Teléfono"]');
    const email = form.querySelector('input[placeholder*="electrónico"]');
    const mensaje = form.querySelector('textarea');
    
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
    
    if (isValid) {
      // Aquí iría la lógica para enviar el formulario
      showSuccessMessage();
      form.reset();
    } else {
      alert(errorMessage);
    }
  });
}

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function showSuccessMessage() {
  const message = document.createElement('div');
  message.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: #4CAF50;
    color: white;
    padding: 20px 30px;
    border-radius: 10px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.3);
    z-index: 10000;
    animation: slideIn 0.5s ease;
  `;
  message.textContent = '¡Mensaje enviado exitosamente! Nos contactaremos contigo pronto.';
  document.body.appendChild(message);
  
  setTimeout(() => {
    message.style.animation = 'slideOut 0.5s ease';
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
    '.lot-card, .pricing-card, .testimonial-card, .contact-info-card'
  );
  
  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// ========== BOTONES CTA ==========
function initCTAButtons() {
  const ctaButtons = document.querySelectorAll('.cta-button, .pricing-button');
  
  ctaButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      if (this.getAttribute('href') === '#' || !this.getAttribute('href')) {
        e.preventDefault();
        const proyectosSection = document.querySelector('#proyectos');
        if (proyectosSection) {
          proyectosSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
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
        element.textContent = text.replace(/\d+/, Math.floor(current));
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

// ========== LAZY LOADING IMAGES ==========
function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

// ========== PARALLAX EFFECT ==========
function initParallax() {
  const heroSlides = document.querySelectorAll('.hero-slide');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    heroSlides.forEach(slide => {
      if (slide.classList.contains('active')) {
        slide.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    });
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

// ========== PRELOADER ==========
function initPreloader() {
  window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
      setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => preloader.remove(), 300);
      }, 500);
    }
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
    if (window.pageYOffset > 300) {
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

// ========== TYPING EFFECT ==========
function initTypingEffect() {
  const elements = document.querySelectorAll('[data-typing]');
  
  elements.forEach(element => {
    const text = element.textContent;
    element.textContent = '';
    element.style.borderRight = '2px solid var(--primary-yellow)';
    
    let index = 0;
    const speed = 50;
    
    function type() {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        setTimeout(type, speed);
      } else {
        setTimeout(() => {
          element.style.borderRight = 'none';
        }, 500);
      }
    }
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !element.dataset.typed) {
          element.dataset.typed = 'true';
          type();
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(element);
  });
}

// ========== MODAL PARA PROYECTOS ==========
function initProjectModals() {
  const modalHTML = `
    <div class="project-modal" style="display: none;">
      <div class="modal-overlay"></div>
      <div class="modal-content">
        <button class="modal-close">&times;</button>
        <div class="modal-body">
          <img class="modal-image" src="" alt="">
          <h2 class="modal-title"></h2>
          <p class="modal-description"></p>
          <div class="modal-features"></div>
          <button class="modal-cta">Contactar Ahora</button>
        </div>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  
  const modal = document.querySelector('.project-modal');
  const modalClose = document.querySelector('.modal-close');
  const modalOverlay = document.querySelector('.modal-overlay');
  
  // Estilos del modal
  const style = document.createElement('style');
  style.textContent = `
    .project-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
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
      max-width: 800px;
      max-height: 90vh;
      overflow-y: auto;
      border-radius: 15px;
      z-index: 10001;
      animation: modalSlideIn 0.3s ease;
    }
    .modal-close {
      position: absolute;
      top: 20px;
      right: 20px;
      background: var(--primary-yellow);
      border: none;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      font-size: 28px;
      cursor: pointer;
      z-index: 10002;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
    }
    .modal-image {
      width: 100%;
      height: 400px;
      object-fit: cover;
    }
    .modal-body {
      padding: 40px;
    }
    .modal-title {
      font-size: 2.5rem;
      color: var(--navy-blue);
      margin: 20px 0;
    }
    .modal-description {
      color: #666;
      line-height: 1.8;
      margin-bottom: 30px;
    }
    .modal-features {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
      margin-bottom: 30px;
    }
    .modal-cta {
      width: 100%;
      background: var(--primary-yellow);
      color: var(--navy-blue);
      border: none;
      padding: 18px;
      border-radius: 8px;
      font-size: 1.1rem;
      font-weight: 700;
      cursor: pointer;
    }
    @keyframes modalSlideIn {
      from { transform: translateY(-50px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  `;
  document.head.appendChild(style);
  
  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
  
  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', closeModal);
  
  // Vincular botones de proyectos
  document.querySelectorAll('.pricing-button, .cta-button').forEach(btn => {
    btn.addEventListener('click', function(e) {
      if (this.textContent.includes('información')) {
        e.preventDefault();
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      }
    });
  });
}

// ========== AÑADIR ANIMACIONES CSS ==========
function addAnimationStyles() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); }
      to { transform: translateX(0); }
    }
    @keyframes slideOut {
      from { transform: translateX(0); }
      to { transform: translateX(100%); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .nav-menu a.active {
      color: var(--primary-yellow);
      position: relative;
    }
    .nav-menu a.active::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 100%;
      height: 2px;
      background: var(--primary-yellow);
    }
  `;
  document.head.appendChild(style);
}

// ========== INICIALIZAR TODO ==========
document.addEventListener('DOMContentLoaded', function() {
  // Inicializar componentes
  new HeroCarousel();
  initSmoothScroll();
  initNavbarScroll();
  initFormValidation();
  initScrollAnimations();
  initCTAButtons();
  initWhatsAppButton();
  initCounterAnimation();
  initLazyLoading();
  initParallax();
  initActiveNavigation();
  initPreloader();
  initScrollToTop();
  initTypingEffect();
  initProjectModals();
  addAnimationStyles();
  
  // Log para confirmar inicialización
  console.log('Pacific Beach - Website inicializado correctamente');
});

// ========== MANEJO DE RESIZE ==========
let resizeTimer;
window.addEventListener('resize', function() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {
    // Recalcular elementos si es necesario
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
      console.log('Tiempo de carga de página:', pageLoadTime + 'ms');
    }, 0);
  });
}