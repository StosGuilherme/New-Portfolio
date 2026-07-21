export function initScrollReveal() {
  const groups = document.querySelectorAll('[data-reveal-group]');
  groups.forEach((group) => {
    group.querySelectorAll(':scope > .reveal').forEach((el, index) => {
      el.style.setProperty('--reveal-delay', `${index * 90}ms`);
    });
  });

  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  elements.forEach((el) => observer.observe(el));
}
