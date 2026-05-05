/* ===================================================
   Мила Дружинина — психолог ОРКТ — script.js
   =================================================== */

// --- Theme toggle ---
(function () {
  const toggle = document.querySelector('[data-theme-toggle]');
  const root = document.documentElement;
  let theme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  root.setAttribute('data-theme', theme);
  updateToggleIcon(toggle, theme);

  if (toggle) {
    toggle.addEventListener('click', () => {
      theme = theme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', theme);
      updateToggleIcon(toggle, theme);
    });
  }

  function updateToggleIcon(btn, t) {
    if (!btn) return;
    btn.setAttribute('aria-label', 'Переключить тему на ' + (t === 'dark' ? 'светлую' : 'тёмную'));
    btn.innerHTML = t === 'dark'
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }
})();

// --- Sticky header scroll state ---
(function () {
  const header = document.querySelector('.site-header');
  if (!header) return;
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
})();

// --- Mobile burger menu ---
(function () {
  const burger = document.querySelector('.burger');
  const menu = document.getElementById('mobile-menu');
  if (!burger || !menu) return;

  burger.addEventListener('click', () => {
    const isOpen = !menu.hidden;
    menu.hidden = isOpen;
    burger.setAttribute('aria-expanded', String(!isOpen));
  });

  // Close on link click
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.hidden = true;
      burger.setAttribute('aria-expanded', 'false');
    });
  });
})();

// --- Scroll fade-in animation ---
(function () {
  const elements = document.querySelectorAll(
    '.pain-card, .stat-card, .pillar, .what-item, .package-card, .faq-item, .highlight-quote'
  );
  elements.forEach(el => el.classList.add('fade-in'));

  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
})();

// --- Smooth anchor scroll with offset ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
