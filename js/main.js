// Menú móvil
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
  
    if (mobileMenuBtn && mainNav) {
      mobileMenuBtn.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        this.innerHTML = mainNav.classList.contains('active') ? '✕' : '☰';
      });
    }
  
    // Cerrar menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (mainNav.classList.contains('active')) {
          mainNav.classList.remove('active');
          mobileMenuBtn.innerHTML = '☰';
        }
      });
    });
  
    // Validación de formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Resetear mensajes de error
        resetErrors();
        
        // Validar campos
        let isValid = true;
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        
        // Validar nombre
        if (name.value.trim() === '') {
          showError(name, 'Por favor ingresa tu nombre');
          isValid = false;
        }
        
        // Validar email
        if (email.value.trim() === '') {
          showError(email, 'Por favor ingresa tu email');
          isValid = false;
        } else if (!validateEmail(email.value.trim())) {
          showError(email, 'Por favor ingresa un email válido');
          isValid = false;
        }
        
        // Validar mensaje
        if (message.value.trim() === '') {
          showError(message, 'Por favor ingresa tu mensaje');
          isValid = false;
        }
        
        // Si el formulario es válido, enviar
        if (isValid) {
          // Simular envío
          showSuccess('¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.');
          contactForm.reset();
        }
      });
    }
  
    // Slider de testimonios
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    if (testimonialsSlider) {
      let currentSlide = 0;
      const slides = document.querySelectorAll('.testimonial-slide');
      const totalSlides = slides.length;
      
      function showSlide(index) {
        slides.forEach((slide, i) => {
          slide.style.transform = `translateX(${100 * (i - index)}%)`;
        });
      }
      
      function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
      }
      
      // Configurar intervalo para cambio automático
      let slideInterval = setInterval(nextSlide, 5000);
      
      // Pausar al hacer hover
      testimonialsSlider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
      });
      
      testimonialsSlider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
      });
      
      // Mostrar primer slide
      showSlide(0);
    }
  
    // Animaciones al hacer scroll
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
          element.classList.add('animated');
        }
      });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Ejecutar al cargar la página
  
    // Funciones auxiliares
    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }
    
    function showError(input, message) {
      const formGroup = input.closest('.form-group');
      const errorElement = formGroup.querySelector('.error-message') || document.createElement('span');
      
      errorElement.className = 'error-message';
      errorElement.textContent = message;
      errorElement.style.color = 'var(--error)';
      errorElement.style.fontSize = '0.875rem';
      errorElement.style.marginTop = '0.25rem';
      errorElement.style.display = 'block';
      
      if (!formGroup.querySelector('.error-message')) {
        formGroup.appendChild(errorElement);
      }
      
      input.style.borderColor = 'var(--error)';
    }
    
    function resetErrors() {
      document.querySelectorAll('.error-message').forEach(el => el.remove());
      document.querySelectorAll('input, textarea').forEach(input => {
        input.style.borderColor = '';
      });
    }
    
    function showSuccess(message) {
      const successElement = document.createElement('div');
      successElement.className = 'success-message';
      successElement.textContent = message;
      successElement.style.backgroundColor = 'var(--success)';
      successElement.style.color = 'white';
      successElement.style.padding = '1rem';
      successElement.style.borderRadius = 'var(--radius-md)';
      successElement.style.marginBottom = '1.5rem';
      successElement.style.textAlign = 'center';
      
      contactForm.prepend(successElement);
      
      setTimeout(() => {
        successElement.remove();
      }, 5000);
    }
  });
  
  // Efecto smooth scroll para enlaces internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector('.main-header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Lazy loading para imágenes
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img.lazy');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          if (img.dataset.srcset) img.srcset = img.dataset.srcset;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '200px'
    });
    
    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });
  }