(function () {
  "use strict";

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scrollBehavior = reducedMotion ? 'auto' : 'smooth';

  /** Header toggle (mobile): the closed menu is hidden in CSS, so its links can't be tabbed into. */
  const header = document.querySelector('#header');
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    const isOpen = header.classList.toggle('header-show');
    headerToggleBtn.querySelector('use').setAttribute('href', isOpen ? '#i-times' : '#i-bars');
    headerToggleBtn.setAttribute('aria-expanded', isOpen);
    if (isOpen) header.querySelector('#navmenu a').focus();
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /** Escape closes the open mobile menu and returns focus to the toggle */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && header.classList.contains('header-show')) {
      headerToggle();
      headerToggleBtn.focus();
    }
  });

  /** Hide mobile nav on same-page/hash links */
  header.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', () => {
      if (header.classList.contains('header-show')) {
        headerToggle();
      }
    });
  });

  /** Email links are assembled here so the address isn't in the HTML for scrapers. */
  document.querySelectorAll('[data-email-user]').forEach(link => {
    const email = `${link.dataset.emailUser}@${link.dataset.emailDomain}`;
    link.href = `mailto:${email}`;
    if (link.hasAttribute('data-email-show')) link.textContent = email;
  });

  /** Copyright year and years of experience */
  const currentYear = new Date().getFullYear();
  const yearEl = document.querySelector('#copyright-year');
  if (yearEl) {
    yearEl.textContent = currentYear;
  }
  document.querySelectorAll('[data-years-since]').forEach(el => {
    el.textContent = currentYear - Number(el.dataset.yearsSince);
  });

  /** Scroll top button: shown once the hero is mostly scrolled past */
  const scrollTop = document.querySelector('.scroll-top');
  function toggleScrollTop() {
    scrollTop.classList.toggle('active', window.scrollY > window.innerHeight * 0.8);
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: scrollBehavior
    });
  });
  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop, { passive: true });

  /** Init AOS.js */
  function aosInit() {
    AOS.init({
      disable: reducedMotion,
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /** Init Typed.js */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped && !reducedMotion) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
      autoInsertCss: false // cursor CSS lives in main.css so the CSP can forbid inline styles
    });
  }

  /** Correct scrolling position upon page load for URLs containing hash links. */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: scrollBehavior
          });
        }, 100);
      }
    }
  });

  /**  Navmenu Scrollspy */
  const navmenulinks = document.querySelectorAll('.navmenu a[href^="#"]');
  const sections = Array.from(navmenulinks, link => document.querySelector(link.hash)).filter(Boolean);
  const sectionsOnLine = new Set();
  let footerVisible = false;
  let scrollspyObserver;

  /** The last section can't scroll up to the line, so it is active while the footer is (almost) fully visible. */
  function updateActiveNavLink() {
    const active = footerVisible ? sections[sections.length - 1] : sections.find(section => sectionsOnLine.has(section));
    if (!active) return;
    navmenulinks.forEach(link => {
      const isActive = link.hash === '#' + active.id;
      link.classList.toggle('active', isActive);
      isActive ? link.setAttribute('aria-current', 'location') : link.removeAttribute('aria-current');
    });
  }

  /** Observe a 1px line 200px below the top of the viewport; the section crossing it is active. */
  function navmenuScrollspy() {
    if (scrollspyObserver) scrollspyObserver.disconnect();
    sectionsOnLine.clear();
    scrollspyObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.isIntersecting ? sectionsOnLine.add(entry.target) : sectionsOnLine.delete(entry.target));
      updateActiveNavLink();
    }, {
      rootMargin: `-200px 0px -${Math.max(window.innerHeight - 201, 0)}px 0px`
    });
    sections.forEach(section => scrollspyObserver.observe(section));
  }
  navmenuScrollspy();
  window.addEventListener('resize', navmenuScrollspy);

  const footer = document.querySelector('#footer');
  if (footer && sections.length) {
    new IntersectionObserver(entries => {
      footerVisible = entries[0].isIntersecting;
      updateActiveNavLink();
    }, { threshold: 0.9 }).observe(footer);
  }
})();