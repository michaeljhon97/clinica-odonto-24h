document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer for Scroll Animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Animate only once
      }
    });
  }, observerOptions);

  const revealElements = document.querySelectorAll('.reveal');
  revealElements.forEach(el => {
    observer.observe(el);
  });

  // Header Scroll Effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.padding = '10px 0';
      header.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.padding = '16px 0';
      header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05)';
    }
  });

  // LGPD Cookie Banner Logic
  const cookieBanner = document.getElementById('cookieBanner');
  const acceptCookiesBtn = document.getElementById('acceptCookies');

  if (!localStorage.getItem('lgpd_cookie_accepted')) {
    // Show banner after a short delay
    setTimeout(() => {
      cookieBanner.classList.add('show');
    }, 1000);
  }

  acceptCookiesBtn.addEventListener('click', () => {
    localStorage.setItem('lgpd_cookie_accepted', 'true');
    cookieBanner.classList.remove('show');
  });

  // Google Ads Conversion Tracking (WhatsApp Clicks)
  const whatsappLinks = document.querySelectorAll('a[href*="api.whatsapp.com"]');
  whatsappLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (typeof gtag === 'function') {
        gtag('event', 'conversion', {
            'send_to': 'AW-16879544557/Vl1fCOGFoe8cEO3R5fA-',
            'value': 0.0,
            'currency': 'BRL'
        });
      }
    });
  });
});
