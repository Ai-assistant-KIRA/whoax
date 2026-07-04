const STRATEGY_MAILTO =
  'mailto:hello@whoax.com?subject=Strategy%20Call%20Request&body=Hi%20Reda%2C%0A%0AI%27d%20like%20to%20book%20a%20strategy%20call.%0A%0AName%3A%20%0ACompany%3A%20%0AWebsite%3A%20%0AMonthly%20revenue%3A%20%0AMain%20challenge%3A%20';

const navToggle = document.querySelector('.nav-toggle');
const mobileNav = document.getElementById('mobile-nav');
const overlay = document.getElementById('nav-overlay');
const stickyCta = document.getElementById('sticky-cta');
const hero = document.querySelector('.hero');

function closeNav() {
  mobileNav?.classList.remove('is-open');
  overlay?.classList.remove('is-open');
  document.body.style.overflow = '';
  navToggle?.setAttribute('aria-expanded', 'false');
  if (navToggle) navToggle.textContent = '\u2630';
}

function openNav() {
  mobileNav?.classList.add('is-open');
  overlay?.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  navToggle?.setAttribute('aria-expanded', 'true');
  if (navToggle) navToggle.textContent = '\u2715';
}

if (navToggle && mobileNav) {
  navToggle.addEventListener('click', () => {
    if (mobileNav.classList.contains('is-open')) closeNav();
    else openNav();
  });
}

overlay?.addEventListener('click', closeNav);

mobileNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeNav);
});

document.querySelectorAll('a[data-strategy-call]').forEach((link) => {
  link.href = STRATEGY_MAILTO;
});

const mobileMq = window.matchMedia('(max-width: 767px)');

function onScroll() {
  if (!stickyCta) return;
  if (!mobileMq.matches) {
    stickyCta.classList.remove('is-visible');
    return;
  }
  const threshold = hero ? hero.offsetHeight * 0.55 : 380;
  stickyCta.classList.toggle('is-visible', window.scrollY > threshold);
}

window.addEventListener('scroll', onScroll, { passive: true });
mobileMq.addEventListener('change', onScroll);
onScroll();

const sectionLinks = [...document.querySelectorAll('.nav--desktop a[href^="#"]')].map((link) => {
  const id = link.getAttribute('href')?.slice(1);
  const section = id ? document.getElementById(id) : null;
  return section ? { link, section } : null;
}).filter(Boolean);

if (sectionLinks.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        sectionLinks.forEach(({ link, section }) => {
          link.style.color = section.id === entry.target.id ? '#f1f5f9' : '';
        });
      });
    },
    { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
  );

  sectionLinks.forEach(({ section }) => observer.observe(section));
}