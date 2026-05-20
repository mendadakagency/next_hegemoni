/* ===== about-runtime (IIFE-wrapped) ===== */
(function () {
  try {
    // Reveal on scroll
    const obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add('vis');
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal').forEach(function (el) {
      obs.observe(el);
    });
  } catch (e) {
    console.error('[hegemoni-about-runtime]', e);
  }
})();
