/* bumper-gate.js — load the bumper animation only on the very first visit.
   sessionStorage resets when the browser tab/session ends, so "first visit"
   means the first page-load in a new browsing session. */
(function () {
  if (sessionStorage.getItem('ha_bumper_seen')) return;

  window.addEventListener('ha:bumper-done', function () {
    // Mark as seen so next load skips the bumper.
    sessionStorage.setItem('ha_bumper_seen', '1');

    // Unlock content: CSS rule hides everything until ha-ready lands on <html>.
    document.documentElement.classList.add('ha-ready');

    // Force-show all .reveal elements. IntersectionObserver may not have
    // fired for elements hidden behind ha-bumper-lock, so guarantee
    // everything is visible the moment the bumper exits.
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('vis');
    });
  }, { once: true });

  // Dynamically load the full bumper script.
  var s = document.createElement('script');
  s.src = '/legacy/index-bumper.js';
  document.head.appendChild(s);
})();
