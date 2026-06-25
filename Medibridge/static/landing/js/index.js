/* ============================================
   index.js — Home Page JavaScript
   Medibridge Landing Page
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ── 1. NAVBAR scroll effect ──
  const navbar = document.querySelector('.mb-navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  }, { passive: true });

  // ── 2. SEARCH BAR ──
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

  // ── 3. SCROLL REVEAL ──
  const revealEls = document.querySelectorAll(
    '.mb-service-card, .mb-doctor-card, .mb-testimonial-card, .mb-blog-card, .mb-step-item, .mb-stat-item'
  );

  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 60);
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  revealEls.forEach((el) => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(24px)';
    el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
    revealObs.observe(el);
  });

  // ── 4. STATS COUNTER ──
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

  // ── 5. HERO PARALLAX on mouse move ──
  const hero = document.querySelector('.mb-hero');
  if (hero) {
    hero.addEventListener('mousemove', (e) => {
      const rect   = hero.getBoundingClientRect();
      const x      = ((e.clientX - rect.left) / rect.width  - 0.5) * 12;
      const y      = ((e.clientY - rect.top)  / rect.height - 0.5) * 8;
      const card   = hero.querySelector('.mb-video-card');
      if (card) card.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${-y}deg) translateY(-6px)`;
    });
    hero.addEventListener('mouseleave', () => {
      const card = hero.querySelector('.mb-video-card');
      if (card) card.style.transform = '';
    });
  }

});