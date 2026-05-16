/**
 * Portfolio Script — js/script.js
 * Semua fungsi JavaScript untuk portfolio K.
 * Dipisahkan agar kode lebih modular dan mudah dikelola.
 */

/* =========================================================
   HERO SLIDER
   ========================================================= */
function initHeroSlider() {
  const slides = document.querySelectorAll('.slide');
  if (slides.length === 0) return;

  let currentSlide = 0;

  setInterval(() => {
    slides.forEach(slide => {
      slide.classList.remove('active', 'prev');
    });

    slides[currentSlide].classList.add('prev');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }, 5000);
}

/* =========================================================
   MENU TOGGLE
   ========================================================= */
function initMenuToggle() {
  const hamburger = document.getElementById('hamburger');
  const fullMenu = document.getElementById('fullMenu');

  if (!hamburger || !fullMenu) return;

  hamburger.addEventListener('click', () => {
    fullMenu.classList.toggle('open');
  });

  // Tutup menu saat link navigasi diklik
  fullMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      fullMenu.classList.remove('open');
    });
  });
}

/* =========================================================
   INTRO ANIMATION
   ========================================================= */
function initIntroAnimation() {
  const screen = document.getElementById('intro-screen');
  if (!screen) return;

  const bar = document.getElementById('intro-bar');
  const logo = document.getElementById('intro-logo');
  const sub = document.getElementById('intro-sub');
  const counter = document.getElementById('intro-counter');
  const cornerTL = document.getElementById('intro-corner-tl');
  const cornerBR = document.getElementById('intro-corner-br');
  const wipeTop = document.getElementById('intro-wipe-top');
  const wipeBot = document.getElementById('intro-wipe-bottom');

  // Timeline animasi intro
  setTimeout(() => { if (bar) bar.style.width = '100%'; }, 150);

  setTimeout(() => {
    if (logo) {
      logo.style.opacity = '1';
      logo.style.transform = 'translateY(0)';
    }
  }, 600);

  setTimeout(() => {
    if (cornerTL) cornerTL.style.opacity = '1';
    if (cornerBR) cornerBR.style.opacity = '1';
  }, 700);

  setTimeout(() => {
    if (sub) {
      sub.style.opacity = '1';
      sub.style.transform = 'translateY(0)';
    }
  }, 900);

  setTimeout(() => { if (counter) counter.style.opacity = '1'; }, 1100);

  setTimeout(() => {
    if (wipeTop) wipeTop.style.height = '55%';
    if (wipeBot) wipeBot.style.height = '55%';
  }, 2200);

  setTimeout(() => { if (screen) screen.style.opacity = '0'; }, 3000);

  setTimeout(() => {
    if (screen) screen.style.display = 'none';
    const main = document.getElementById('main-content');
    if (main) main.classList.add('visible');
  }, 3800);
}

/* =========================================================
   INIT ALL FUNCTIONS
   ========================================================= */
function init() {
  initHeroSlider();
  initMenuToggle();
  initIntroAnimation();
}

// Jalankan setelah DOM sepenuhnya dimuat
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}