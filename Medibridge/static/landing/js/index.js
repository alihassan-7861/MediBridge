/* ============================================
   index.js — Home Page Only
   Medibridge Landing Page JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ── 1. SEARCH BAR — focus effect ──
  const searchInput = document.querySelector('.mb-search-input');
  const searchBar   = document.querySelector('.mb-search-bar');

  if (searchInput && searchBar) {
    searchInput.addEventListener('focus', () => {
      searchBar.style.borderColor = '#2F7A6F';
      searchBar.style.boxShadow   = '0 0 0 3px rgba(47,122,111,0.15)';
    });
    searchInput.addEventListener('blur', () => {
      searchBar.style.borderColor = '#e0e8e7';
      searchBar.style.boxShadow   = '0 4px 16px rgba(22,52,74,0.08)';
    });
    // Search button click
    const searchBtn = document.querySelector('.mb-search-btn');
    if (searchBtn) {
      searchBtn.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
          // Will link to doctors/services page later
          console.log('Searching for:', query);
        }
      });
      // Search on Enter key
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') searchBtn.click();
      });
    }
  }

  // ── 2. SCROLL REVEAL — fade in sections on scroll ──
  const revealElements = document.querySelectorAll(
    '.mb-service-card, .mb-doctor-card, .mb-testimonial-card, .mb-blog-card, .mb-step-item'
  );

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity    = '1';
        entry.target.style.transform  = 'translateY(0)';
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach((el) => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    revealObserver.observe(el);
  });

  // ── 3. STATS COUNTER — animate numbers on scroll ──
  const statNumbers = document.querySelectorAll('.mb-stat-number');

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach((el) => statsObserver.observe(el));

  function animateCounter(el) {
    const text    = el.textContent;
    const numMatch = text.match(/[\d.]+/);
    if (!numMatch) return;
    const target  = parseFloat(numMatch[0]);
    const suffix  = text.replace(/[\d.]+/, '');
    const duration = 1500;
    const start   = performance.now();

    function update(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      const current  = target * eased;
      el.textContent = (Number.isInteger(target)
        ? Math.floor(current)
        : current.toFixed(1)) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  // ── 4. NAVBAR — active link highlight on scroll ──
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.mb-navbar .nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - 100) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

});