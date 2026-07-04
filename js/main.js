const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const header = document.querySelector('.site-header');
if (header) {
  const links = [...document.querySelectorAll('section[id]')].map((section) => {
    const id = section.id;
    const link = document.querySelector(`.nav a[href="#${id}"]`);
    return link ? { id, link, section } : null;
  }).filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach(({ id, link }) => {
          link.style.color = id === entry.target.id ? '#ffffff' : '';
        });
      });
    },
    { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
  );

  links.forEach(({ section }) => observer.observe(section));
}