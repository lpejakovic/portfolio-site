/** Scroll top button */
let scrollTop = document.querySelector('.scroll-top');
function toggleScrollTop() {
  if (scrollTop) {
    window.scrollY > 0 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
  }
}
scrollTop.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
window.addEventListener('load', toggleScrollTop);
document.addEventListener('scroll', toggleScrollTop);

/** Init AOS.js */
function aosInit() {
  AOS.init({
    duration: 600,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  });
}
window.addEventListener('load', aosInit);

/** Init Typed.js */
const selectTyped = document.querySelector('.typed');
if (selectTyped) {
  let typed_strings = selectTyped.getAttribute('data-typed-items');
  typed_strings = typed_strings.split(',');
  new Typed('.typed', {
    strings: typed_strings,
    loop: true,
    typeSpeed: 100,
    backSpeed: 50,
    backDelay: 2000
  });
}