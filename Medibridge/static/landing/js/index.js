/* ============================================
   index.js — Home Page JavaScript
   Medibridge Landing Page
   Full Directional Animations System
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ══════════════════════════════════════════
     1. NAVBAR — scroll effect
  ══════════════════════════════════════════ */
  const navbar = document.querySelector('.mb-navbar');
  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });


  /* ══════════════════════════════════════════
     2. SEARCH BAR
  ══════════════════════════════════════════ */
  const searchInput = document.querySelector('.mb-search-input');
  const searchBtn   = document.querySelector('.mb-search-btn');
  if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', () => {
      const query = searchInput.value.trim();
      if (query) console.log('Searching:', query);
    });
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') searchBtn.click();
    });
  }


  /* ══════════════════════════════════════════
     3. DIRECTIONAL ANIMATIONS
     Each section animates from a specific direction
  ══════════════════════════════════════════ */

  // Define direction transforms
  const directions = {
    top:    'translateY(-60px)',
    bottom: 'translateY(60px)',
    left:   'translateX(-60px)',
    right:  'translateX(60px)',
    fade:   'scale(0.92)',
  };

  // Map each element to its animation direction
  const animationMap = [

    // HERO — left text, right card
    { selector: '.mb-hero .mb-eyebrow',       dir: 'left',   delay: 0   },
    { selector: '.mb-hero-heading',            dir: 'left',   delay: 100 },
    { selector: '.mb-hero-sub',                dir: 'left',   delay: 200 },
    { selector: '.mb-search-bar',             dir: 'bottom', delay: 300 },
    { selector: '.mb-hero-badges',            dir: 'bottom', delay: 400 },
    { selector: '.mb-video-card',             dir: 'right',  delay: 200 },

    // TRUST BAR — bottom with stagger
    { selector: '.mb-trust-item:nth-child(1)', dir: 'bottom', delay: 0   },
    { selector: '.mb-trust-item:nth-child(2)', dir: 'bottom', delay: 100 },
    { selector: '.mb-trust-item:nth-child(3)', dir: 'bottom', delay: 200 },
    { selector: '.mb-trust-item:nth-child(4)', dir: 'bottom', delay: 300 },

    // HOW IT WORKS — section heading top, steps alternating
    { selector: '.mb-how .mb-section-header',  dir: 'top',    delay: 0   },
    { selector: '.mb-step-item:nth-child(1)',   dir: 'left',   delay: 0   },
    { selector: '.mb-step-item:nth-child(2)',   dir: 'bottom', delay: 120 },
    { selector: '.mb-step-item:nth-child(3)',   dir: 'bottom', delay: 240 },
    { selector: '.mb-step-item:nth-child(4)',   dir: 'right',  delay: 360 },

    // SERVICES — heading top, cards alternating left/right/bottom
    { selector: '.mb-services .mb-section-header', dir: 'top',    delay: 0   },
    { selector: '.mb-services .row > div:nth-child(1) .mb-service-card', dir: 'left',   delay: 0   },
    { selector: '.mb-services .row > div:nth-child(2) .mb-service-card', dir: 'bottom', delay: 80  },
    { selector: '.mb-services .row > div:nth-child(3) .mb-service-card', dir: 'bottom', delay: 160 },
    { selector: '.mb-services .row > div:nth-child(4) .mb-service-card', dir: 'right',  delay: 240 },
    { selector: '.mb-services .row > div:nth-child(5) .mb-service-card', dir: 'left',   delay: 80  },
    { selector: '.mb-services .row > div:nth-child(6) .mb-service-card', dir: 'bottom', delay: 160 },
    { selector: '.mb-services .row > div:nth-child(7) .mb-service-card', dir: 'bottom', delay: 240 },
    { selector: '.mb-services .row > div:nth-child(8) .mb-service-card', dir: 'right',  delay: 320 },

    // DOCTORS — heading top, cards from alternating sides
    { selector: '.mb-doctors .mb-section-header',  dir: 'top',   delay: 0   },
    { selector: '.mb-doctors .row > div:nth-child(1) .mb-doctor-card', dir: 'left',   delay: 0   },
    { selector: '.mb-doctors .row > div:nth-child(2) .mb-doctor-card', dir: 'bottom', delay: 120 },
    { selector: '.mb-doctors .row > div:nth-child(3) .mb-doctor-card', dir: 'bottom', delay: 240 },
    { selector: '.mb-doctors .row > div:nth-child(4) .mb-doctor-card', dir: 'right',  delay: 360 },
    { selector: '.mb-doctors .text-center.mt-5',   dir: 'bottom', delay: 400 },

    // TESTIMONIALS — heading top, cards from different sides
    { selector: '.mb-testimonials .mb-section-header',  dir: 'top',   delay: 0   },
    { selector: '.mb-testimonials .row > div:nth-child(1) .mb-testimonial-card', dir: 'left',   delay: 0   },
    { selector: '.mb-testimonials .row > div:nth-child(2) .mb-testimonial-card', dir: 'top',    delay: 150 },
    { selector: '.mb-testimonials .row > div:nth-child(3) .mb-testimonial-card', dir: 'right',  delay: 300 },

    // STATS — each stat from bottom with stagger
    { selector: '.mb-stat-item:nth-child(1)', dir: 'bottom', delay: 0   },
    { selector: '.mb-stat-item:nth-child(2)', dir: 'bottom', delay: 120 },
    { selector: '.mb-stat-item:nth-child(3)', dir: 'bottom', delay: 240 },
    { selector: '.mb-stat-item:nth-child(4)', dir: 'bottom', delay: 360 },

    // APP SECTION — left text, right phone
    { selector: '.mb-app .mb-eyebrow',        dir: 'left',   delay: 0   },
    { selector: '.mb-app .mb-section-heading', dir: 'left',  delay: 100 },
    { selector: '.mb-app .mb-section-sub',     dir: 'left',  delay: 200 },
    { selector: '.mb-app-buttons',             dir: 'left',  delay: 300 },
    { selector: '.mb-phone-mockup',            dir: 'right', delay: 200 },

    // BLOG — heading top, cards from alternating
    { selector: '.mb-blog .mb-section-header', dir: 'top',    delay: 0   },
    { selector: '.mb-blog .row > div:nth-child(1) .mb-blog-card', dir: 'left',   delay: 0   },
    { selector: '.mb-blog .row > div:nth-child(2) .mb-blog-card', dir: 'bottom', delay: 150 },
    { selector: '.mb-blog .row > div:nth-child(3) .mb-blog-card', dir: 'right',  delay: 300 },
    { selector: '.mb-blog .text-center.mt-5',  dir: 'bottom', delay: 400 },

  ];

  // Apply initial hidden state and observe each element
  animationMap.forEach(({ selector, dir, delay }) => {
    const el = document.querySelector(selector);
    if (!el) return;

    // Set initial hidden state
    el.style.opacity    = '0';
    el.style.transform  = directions[dir];
    el.style.transition = `opacity 0.65s ease ${delay}ms, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms`;
    el.dataset.animated = 'false';

    // Observe
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && el.dataset.animated === 'false') {
          el.dataset.animated = 'true';
          el.style.opacity   = '1';
          el.style.transform = 'translateY(0) translateX(0) scale(1)';
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.12 });

    obs.observe(el);
  });


  /* ══════════════════════════════════════════
     4. STATS COUNTER — animate numbers
  ══════════════════════════════════════════ */
  const statNums = document.querySelectorAll('.mb-stat-number');

  const statsObs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        statsObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach((el) => statsObs.observe(el));

  function animateCounter(el) {
    const text     = el.textContent;
    const numMatch = text.match(/[\d.]+/);
    if (!numMatch) return;
    const target   = parseFloat(numMatch[0]);
    const suffix   = text.replace(/[\d.]+/, '');
    const duration = 1800;
    const start    = performance.now();

    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 4);
      const current  = target * eased;
      el.textContent = (Number.isInteger(target)
        ? Math.floor(current)
        : current.toFixed(1)) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }


  /* ══════════════════════════════════════════
     5. HERO PARALLAX — 3D tilt on mouse move
  ══════════════════════════════════════════ */
  const hero = document.querySelector('.mb-hero');
  if (hero) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x    = ((e.clientX - rect.left) / rect.width  - 0.5) * 12;
      const y    = ((e.clientY - rect.top)  / rect.height - 0.5) * 8;
      const card = hero.querySelector('.mb-video-card');
      if (card) {
        card.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${-y}deg) translateY(-6px)`;
      }
    });
    hero.addEventListener('mouseleave', () => {
      const card = hero.querySelector('.mb-video-card');
      if (card) card.style.transform = '';
    });
  }


  /* ══════════════════════════════════════════
     6. SERVICE CARDS — icon bounce on hover
  ══════════════════════════════════════════ */
  document.querySelectorAll('.mb-service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      const icon = card.querySelector('.mb-service-icon img');
      if (!icon) return;
      icon.style.transition = 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)';
      icon.style.transform  = 'scale(1.2) rotate(-8deg)';
    });
    card.addEventListener('mouseleave', () => {
      const icon = card.querySelector('.mb-service-icon img');
      if (!icon) return;
      icon.style.transform = 'scale(1) rotate(0deg)';
    });
  });


  /* ══════════════════════════════════════════
     7. TRUST ITEMS — icon pulse on hover
  ══════════════════════════════════════════ */
  document.querySelectorAll('.mb-trust-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      const wrap = item.querySelector('.mb-trust-icon-wrap');
      if (wrap) {
        wrap.style.transition = 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)';
        wrap.style.transform  = 'scale(1.15)';
      }
    });
    item.addEventListener('mouseleave', () => {
      const wrap = item.querySelector('.mb-trust-icon-wrap');
      if (wrap) wrap.style.transform = 'scale(1)';
    });
  });


  /* ══════════════════════════════════════════
     8. DOCTOR CARDS — avatar float on hover
  ══════════════════════════════════════════ */
  document.querySelectorAll('.mb-doctor-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      const avatar = card.querySelector('.mb-doctor-avatar');
      if (avatar) {
        avatar.style.transition = 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)';
        avatar.style.transform  = 'translateY(-6px) scale(1.05)';
      }
    });
    card.addEventListener('mouseleave', () => {
      const avatar = card.querySelector('.mb-doctor-avatar');
      if (avatar) avatar.style.transform = 'translateY(0) scale(1)';
    });
  });


  /* ══════════════════════════════════════════
     9. BLOG CARDS — image zoom on hover
  ══════════════════════════════════════════ */
  document.querySelectorAll('.mb-blog-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      const img = card.querySelector('.mb-blog-image img');
      if (img) {
        img.style.transition = 'transform 0.5s ease';
        img.style.transform  = 'scale(1.08)';
      }
    });
    card.addEventListener('mouseleave', () => {
      const img = card.querySelector('.mb-blog-image img');
      if (img) img.style.transform = 'scale(1)';
    });
  });

});