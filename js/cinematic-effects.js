// Cinematic Effects JavaScript

class CinematicEffects {
  constructor() {
    this.init();
  }

  init() {
    this.setupParallax();
    this.setupScrollIndicator();
    this.setupMouseEffects();
    this.setupIntersectionObserver();
    this.setupCinematicAnimations();
  }

  setupParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    document.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      
      parallaxElements.forEach((element, index) => {
        const speed = (index + 1) * 0.5;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        
        element.style.transform = `translate3d(${x}px, ${y}px, 0) rotateX(${y * 0.5}deg) rotateY(${x * 0.5}deg)`;
      });
    });
  }

  setupScrollIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    document.body.appendChild(indicator);

    window.addEventListener('scroll', () => {
      const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      indicator.style.transform = `scaleX(${scrolled / 100})`;
    });
  }

  setupMouseEffects() {
    const cards = document.querySelectorAll('.card, .project-card, .service-card, [class*="card"]');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
      });
    });
  }

  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('cinematic-visible');
          this.animateElement(entry.target);
        }
      });
    }, observerOptions);

    // Observe all major elements
    const elementsToObserve = document.querySelectorAll('section, .card, .project-card, .service-card, h1, h2, h3');
    elementsToObserve.forEach(el => observer.observe(el));
  }

  animateElement(element) {
    // Add cinematic entrance animation
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px) scale(0.95)';
    element.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    
    setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0) scale(1)';
    }, 100);
  }

  setupCinematicAnimations() {
    // Add floating animation to specific elements
    const floatingElements = document.querySelectorAll('.hero-section img, .project-image');
    floatingElements.forEach(el => el.classList.add('cinematic-float'));

    // Add pulse animation to buttons
    const buttons = document.querySelectorAll('.btn, button, [class*="button"]');
    buttons.forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        btn.classList.add('cinematic-pulse');
      });
      
      btn.addEventListener('mouseleave', () => {
        btn.classList.remove('cinematic-pulse');
      });
    });

    // Add depth to images
    const images = document.querySelectorAll('img');
    images.forEach((img, index) => {
      img.classList.add(`depth-${(index % 3) + 1}`);
      img.classList.add('gpu-accelerated');
    });
  }

  // Cinematic page transitions
  static pageTransition() {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      z-index: 10000;
      opacity: 0;
      transition: opacity 0.6s ease;
    `;
    
    document.body.appendChild(overlay);
    
    setTimeout(() => {
      overlay.style.opacity = '1';
    }, 10);
    
    setTimeout(() => {
      overlay.style.opacity = '0';
      setTimeout(() => {
        document.body.removeChild(overlay);
      }, 600);
    }, 300);
  }

  // Cinematic loading effect
  static showLoading(element) {
    element.classList.add('loading');
    setTimeout(() => {
      element.classList.remove('loading');
    }, 2000);
  }
}

// Initialize cinematic effects when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new CinematicEffects();
  
  // Add GPU acceleration to all major elements
  const majorElements = document.querySelectorAll('section, .card, .project-card, .service-card, img, video');
  majorElements.forEach(el => el.classList.add('gpu-accelerated'));
});

// Add cinematic page transition to all links
document.addEventListener('click', (e) => {
  if (e.target.tagName === 'A' && e.target.href && !e.target.href.includes('#')) {
    e.preventDefault();
    CinematicEffects.pageTransition();
    setTimeout(() => {
      window.location.href = e.target.href;
    }, 300);
  }
});

// Cinematic scroll effects
let ticking = false;

function updateScrollEffects() {
  const scrolled = window.scrollY;
  const rate = scrolled * -0.5;
  
  // Parallax background effect
  const parallaxBg = document.querySelector('.hero-section');
  if (parallaxBg) {
    parallaxBg.style.transform = `translate3d(0, ${rate}px, 0)`;
  }
  
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(updateScrollEffects);
    ticking = true;
  }
});

// Export for use in other scripts
window.CinematicEffects = CinematicEffects;