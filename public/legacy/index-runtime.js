
/* ===== inline script #0 (IIFE-wrapped) ===== */
(function(){
try {

window.__HA_BUMPER_PENDING = true;
/* Lock immediately so body content stays hidden until the bumper paints. */
document.documentElement.classList.add('ha-bumper-lock');

} catch(e) { console.error('[hegemoni-runtime] block 0:', e); }
})();

/* ===== inline script #1 (IIFE-wrapped) ===== */
(function(){
try {

/* LMS preview tab switcher + entry animations */
(function(){
  var titles = {
    dashboard: 'The Playmakers \u00b7 Dashboard',
    library:   'The Playmakers \u00b7 Playbook Library',
    live:      'The Playmakers \u00b7 Live \u00b7 KOL Crack',
    vault:     'The Playmakers \u00b7 Case \u00b7 Brighty Q3 2025'
  };
  var paths = {
    dashboard: '/dashboard',
    library:   '/playbook-library',
    live:      '/live/kol-crack',
    vault:     '/case-vault/brighty-q3-2025'
  };

  function animateNumber(node, to, decimals, prefix, suffix){
    var dur = 900;
    var startTime = performance.now();
    function step(now){
      var t = Math.min(1, (now - startTime) / dur);
      var eased = 1 - Math.pow(1 - t, 3);
      var v = to * eased;
      var txt = (decimals > 0 ? v.toFixed(decimals) : Math.round(v).toString());
      node.textContent = (prefix || '') + txt + (suffix || '');
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function runScreenAnimations(screen){
    // Reset and animate counters
    screen.querySelectorAll('[data-count-to]').forEach(function(node){
      var to = parseFloat(node.getAttribute('data-count-to'));
      var decimals = parseInt(node.getAttribute('data-count-decimals') || '0', 10);
      var prefix = node.getAttribute('data-count-prefix') || '';
      var suffix = node.getAttribute('data-count-suffix') || '';
      animateNumber(node, to, decimals, prefix, suffix);
    });
    // Reset + animate progress bars
    screen.querySelectorAll('.lms-pb-prog-fill[data-pct]').forEach(function(node){
      node.style.width = '0%';
      var pct = node.getAttribute('data-pct');
      // small delay so the 0 paints first
      setTimeout(function(){ node.style.width = pct + '%'; }, 60);
    });
    // Stagger entry for marked nodes
    var staggered = screen.querySelectorAll('[data-anim-stagger]');
    staggered.forEach(function(node, i){
      node.style.opacity = '0';
      node.style.transform = 'translateY(10px)';
      node.style.transition = 'opacity .55s cubic-bezier(.16,1,.3,1), transform .55s cubic-bezier(.16,1,.3,1)';
      setTimeout(function(){
        node.style.opacity = '1';
        node.style.transform = 'translateY(0)';
      }, 80 + i * 70);
    });
  }

  function switchTo(screen){
    if (!titles[screen]) return;
    document.querySelectorAll('.lms-screen').forEach(function(el){
      el.classList.toggle('active', el.getAttribute('data-lms-screen') === screen);
    });
    document.querySelectorAll('.lms-nav-item[data-lms-screen]').forEach(function(el){
      el.classList.toggle('active', el.getAttribute('data-lms-screen') === screen);
    });
    document.querySelectorAll('.lms-tab-btn').forEach(function(el){
      el.classList.toggle('active', el.getAttribute('data-lms-screen') === screen);
    });
    var tt = document.getElementById('lmsTabTitle'); if (tt) tt.textContent = titles[screen];
    var up = document.getElementById('lmsUrlPath'); if (up) up.textContent = paths[screen];
    var active = document.querySelector('.lms-screen.active');
    if (active) runScreenAnimations(active);
  }

  // Click handlers — only items that carry data-lms-screen toggle the view.
  document.querySelectorAll('[data-lms-screen]').forEach(function(el){
    if (el.tagName === 'SECTION') return; // screens themselves, not triggers
    el.addEventListener('click', function(){
      switchTo(el.getAttribute('data-lms-screen'));
      // pause auto-rotate briefly after manual click, then resume
      pauseUntil = Date.now() + 6000;
    }, { passive: true });
  });

  // Auto-advance through screens every 2.5s, loop back to start after last.
  var order = ['dashboard', 'library', 'live', 'vault'];
  var pauseUntil = 0;
  setInterval(function(){
    if (Date.now() < pauseUntil) return;
    var current = document.querySelector('.lms-screen.active');
    var idx = current ? order.indexOf(current.getAttribute('data-lms-screen')) : -1;
    var next = order[(idx + 1) % order.length];
    switchTo(next);
  }, 6500);

  // Run animations on the initially-active screen once it scrolls into view.
  var first = document.querySelector('.lms-screen.active');
  if (first){
    if ('IntersectionObserver' in window){
      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          if (e.isIntersecting){
            runScreenAnimations(first);
            io.disconnect();
          }
        });
      }, { threshold: 0.18 });
      io.observe(first);
    } else {
      runScreenAnimations(first);
    }
  }
})();

} catch(e) { console.error('[hegemoni-runtime] block 1:', e); }
})();

/* ===== inline script #2 (IIFE-wrapped) ===== */
(function(){
try {

// Scroll reveal
const obs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('vis');obs.unobserve(e.target)}})},{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

// Nav dropdown - hover only, no JS needed
// Mega menu tabs
const megaTabs=[
  {label:'Stage 01 · Foundation',items:[['Brand Positioning','Diferensiasi, value prop, dan market sizing.'],['Unit Economics','HPP, margin, dan CAC sebelum scale.'],['Market Mapping','Peta kompetitor dan peluang whitespace.'],['Pricing Strategy','Psikologi harga dan tier produk.']]},
  {label:'Stage 02 · Growth Engine',items:[['Traffic Acquisition','Ads, organic, KOL — full-funnel system.'],['KOL Management','Seleksi, brief, tracking, dan ROI.'],['Content System','Framework konten yang bisa direplikasi.'],['Marketplace Ops','SEO produk, flash sale, dan campaign.'],]},
  {label:'Stage 03 · Scale System',items:[['Operations & Fulfillment','Sistem gudang dan logistik untuk volume.'],['Team Structure','Hire, delegate, dan build culture.'],['Supply Chain','Sourcing, kontrak, dan buffer stok.'],['Financial Modeling','P&L, cashflow, dan proyeksi 9-digit.']]},
  {label:'Stage 04 · Mastery',items:[['Multi-brand Strategy','Portfolio brand dan sinergi antar produk.'],['Investor Readiness','Deck, due diligence, dan negosiasi.'],['Exit Planning','M&A basics dan valuasi bisnis.'],['Corporate Governance','Struktur legal dan compliance.']]},
];
function setMegaTab(idx){
  document.querySelectorAll('.mega-sidebar-item').forEach((el,i)=>el.classList.toggle('active',i===idx));
  const tab=megaTabs[idx];
  document.getElementById('megaTabLabel').textContent=tab.label;
  document.getElementById('megaTabGrid').innerHTML=tab.items.map(([t,d])=>`<a href="#kurikulum" class="mega-link"><div class="mega-link-title">${t}</div><div class="mega-link-desc">${d}</div></a>`).join('');
}

// Number counter
const counterObs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){const el=e.target;const target=parseInt(el.dataset.target);if(!target)return;let current=0;const step=Math.max(1,Math.floor(target/60));const timer=setInterval(()=>{current+=step;if(current>=target){current=target;clearInterval(timer)}el.textContent=current.toLocaleString('id-ID');},25);counterObs.unobserve(el)}})},{threshold:.5});
document.querySelectorAll('.stat-val[data-target]').forEach(el=>counterObs.observe(el));

// Form submit → WA
function submitForm(){
  const fields=document.querySelectorAll('.reg-form-card input,.reg-form-card select');
  const nama=fields[0].value.trim();
  const email=fields[1].value.trim();
  const phone=fields[2].value.trim();
  const brand=fields[3].value.trim();
  const paket=fields[4].value;
  const metode=fields[5].value;
  if(!nama||!phone){
    fields[!nama?0:2].style.borderColor='#e05';
    setTimeout(()=>{fields[0].style.borderColor='';fields[2].style.borderColor=''},2000);
    return;
  }
  const msg=`Halo, saya ingin mendaftar Hegemoni MBA Batch #01 ðŸŽ“\n\n*Nama:* ${nama}\n*Email:* ${email||'-'}\n*Brand/Bisnis:* ${brand||'-'}\n*Paket:* ${paket||'-'}\n*Metode:* ${metode||'-'}\n\nMohon informasi lebih lanjut. Terima kasih!`;
  window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(msg)}`,'_blank');
}

// Hero slideshow — start only after bumper is finished
(function(){
  var s=document.querySelectorAll('.hdb-slide');
  if(s.length<2) return;

  // Always keep the first hero photo locked before intro bumper finishes.
  var i=0;
  s.forEach(function(slide,idx){
    slide.classList.toggle('active', idx===0);
  });

  function startHeroSlider(){
    if(window.__HA_HERO_SLIDER_STARTED) return;
    window.__HA_HERO_SLIDER_STARTED = true;
    setInterval(function(){
      s[i].classList.remove('active');
      i=(i+1)%s.length;
      s[i].classList.add('active');
    },4500);
  }

  if(window.__HA_BUMPER_PENDING){
    window.addEventListener('ha:bumper-done', startHeroSlider, { once:true });
  }else{
    startHeroSlider();
  }
})();

} catch(e) { console.error('[hegemoni-runtime] block 2:', e); }
})();

/* ===== inline script #3 (IIFE-wrapped) ===== */
(function(){
try {

// Hegemoni edit: Playbook stage hover focus, similar to screen-record active timeline feel
(function(){
  const items=document.querySelectorAll('.hfw-section .hfwt-item');
  if(!items.length)return;
  const clear=()=>items.forEach(el=>el.classList.remove('hfw-active'));
  items.forEach(el=>{
    el.addEventListener('mouseenter',()=>{clear();el.classList.add('hfw-active')});
    el.addEventListener('focusin',()=>{clear();el.classList.add('hfw-active')});
  });
  const target=items[0];
  if(target) target.classList.add('hfw-active');
})();

} catch(e) { console.error('[hegemoni-runtime] block 3:', e); }
})();

/* ===== inline script #4 (IIFE-wrapped) ===== */
(function(){
try {

/* v34: start hero typewriter only after bumper is finished */
(function(){
  var el = null;
  var originalText = '';

  function prepareTypewriter(){
    el = document.querySelector('.typing-active-commerce');
    if(!el) return;

    originalText = el.getAttribute('data-typewriter-text') || el.textContent.trim();
    if(!originalText) return;

    el.setAttribute('data-typewriter-text', originalText);
    el.classList.remove('is-typing', 'is-done');

    // Keep hero line blank while bumper is playing, so it starts fresh after reveal.
    if(window.__HA_BUMPER_PENDING){
      el.textContent = '';
    }
  }

  function startTypewriter(){
    if(!el) prepareTypewriter();
    if(!el || el.dataset.typed === 'true') return;

    var text = el.getAttribute('data-typewriter-text') || originalText || el.textContent.trim();
    if(!text) return;

    if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      el.textContent = text;
      el.dataset.typed = 'true';
      return;
    }

    el.dataset.typed = 'true';
    el.textContent = '';
    el.classList.remove('is-done');
    el.classList.add('is-typing');

    var i = 0;
    var delay = 220;
    var speed = 44;

    setTimeout(function type(){
      el.textContent = text.slice(0, i + 1);
      i += 1;

      if(i < text.length){
        setTimeout(type, speed);
      }else{
        el.classList.remove('is-typing');
        el.classList.add('is-done');
      }
    }, delay);
  }

  function boot(){
    prepareTypewriter();

    if(window.__HA_BUMPER_PENDING){
      window.addEventListener('ha:bumper-done', startTypewriter, { once:true });
    }else{
      startTypewriter();
    }
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', boot);
  }else{
    boot();
  }
})();

} catch(e) { console.error('[hegemoni-runtime] block 4:', e); }
})();

/* ===== inline script #6 (IIFE-wrapped) ===== */
(function(){
try {

/* v36: Faculty marquee logic — initial order 10→1, auto-left after reveal, manual cursor scroll */
(function(){
  function applyMobileScroll(){
    if (!window.matchMedia('(max-width: 600px)').matches) return;
    var fw = document.querySelector('#faculty .faculty-marquee-wrap');
    if (!fw) return;
    fw.style.setProperty('overflow-x', 'auto', 'important');
    fw.style.setProperty('overflow-y', 'visible', 'important');
    fw.style.setProperty('touch-action', 'pan-x', 'important');
    fw.style.setProperty('overscroll-behavior', 'auto', 'important');
    fw.style.setProperty('overscroll-behavior-x', 'auto', 'important');
    fw.style.setProperty('cursor', 'auto', 'important');
    fw.style.setProperty('-webkit-overflow-scrolling', 'touch', 'important');
    var ft = fw.querySelector('.faculty-marquee-track');
    if (ft){
      ft.style.setProperty('animation', 'none', 'important');
      ft.style.setProperty('transform', 'none', 'important');
    }
  }
  // Apply now AND on a few rAFs to beat any later style/JS that re-sets these.
  applyMobileScroll();
  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', applyMobileScroll);
  }
  window.addEventListener('load', applyMobileScroll);
  // Skip the rest of the desktop marquee setup on mobile.
  if (window.matchMedia('(max-width: 600px)').matches) return;

  const wrap = document.querySelector('#faculty .faculty-marquee-wrap');
  const track = document.querySelector('#faculty .faculty-marquee-track');
  if(!wrap || !track) return;

  const originalCards = Array.from(track.querySelectorAll('.faculty-hover-card'));
  if(!originalCards.length) return;

  // Make sure DOM order stays 10 → 1 for the first full cycle.
  const firstCycle = originalCards
    .slice(0, 10)
    .sort((a,b) => {
      const na = parseInt(a.getAttribute('data-faculty-number') || '0', 10);
      const nb = parseInt(b.getAttribute('data-faculty-number') || '0', 10);
      return nb - na;
    });

  const secondCycle = originalCards
    .slice(10, 20)
    .sort((a,b) => {
      const na = parseInt(a.getAttribute('data-faculty-number') || '0', 10);
      const nb = parseInt(b.getAttribute('data-faculty-number') || '0', 10);
      return nb - na;
    });

  if(firstCycle.length){
    track.innerHTML = '';
    firstCycle.concat(secondCycle.length ? secondCycle : firstCycle.map(card => card.cloneNode(true))).forEach(card => {
      track.appendChild(card);
    });
  }

  let running = false;
  let started = false;
  let raf = null;
  let last = 0;
  let pauseUntil = 0;
  const speed = 42; // px/sec, faster but still premium

  function halfWidth(){
    return Math.max(1, track.scrollWidth / 2);
  }

  function resetToStart(){
    wrap.scrollLeft = 0; // first visible card = #10 Muhammad Hadiyatullah
  }

  function tick(now){
    if(!running){
      raf = null;
      return;
    }
    if(!last) last = now;
    const dt = Math.min(64, now - last);
    last = now;

    if(now > pauseUntil && !wrap.classList.contains('is-dragging')){
      wrap.scrollLeft += speed * (dt / 1000);
      const half = halfWidth();
      if(wrap.scrollLeft >= half){
        wrap.scrollLeft -= half;
      }
    }

    raf = requestAnimationFrame(tick);
  }

  function start(){
    running = true;
    last = 0;
    if(!raf) raf = requestAnimationFrame(tick);
  }

  function stop(){
    running = false;
  }

  // Start only when the faculty section reaches viewport, so it begins from Muhammad Hadiyatullah.
  const section = document.querySelector('#faculty');
  if('IntersectionObserver' in window && section){
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          if(!started){
            resetToStart();
            started = true;
          }
          start();
        }else{
          stop();
        }
      });
    }, { threshold: 0.18 });
    io.observe(section);
  }else{
    resetToStart();
    start();
  }

  // Drag with cursor.
  let isDown = false;
  let startX = 0;
  let startScroll = 0;

  wrap.addEventListener('pointerdown', function(e){
    isDown = true;
    wrap.classList.add('is-dragging');
    startX = e.clientX;
    startScroll = wrap.scrollLeft;
    pauseUntil = performance.now() + 2200;
    try { wrap.setPointerCapture(e.pointerId); } catch(_) {}
  });

  wrap.addEventListener('pointermove', function(e){
    if(!isDown) return;
    const dx = e.clientX - startX;
    wrap.scrollLeft = startScroll - dx;
  });

  function endDrag(e){
    if(!isDown) return;
    isDown = false;
    wrap.classList.remove('is-dragging');
    pauseUntil = performance.now() + 1200;
    try { wrap.releasePointerCapture(e.pointerId); } catch(_) {}
  }

  wrap.addEventListener('pointerup', endDrag);
  wrap.addEventListener('pointercancel', endDrag);
  wrap.addEventListener('pointerleave', endDrag);

  // Reset if browser restores a middle scroll position on reload.
  window.addEventListener('load', resetToStart);
})();

} catch(e) { console.error('[hegemoni-runtime] block 6:', e); }
})();

/* ===== inline script #7 (IIFE-wrapped) ===== */
(function(){
try {

/* v37 helper: drag-only faculty marquee polish */
(function(){
  const wrap = document.querySelector('#faculty .faculty-marquee-wrap');
  if(!wrap) return;

  wrap.querySelectorAll('img').forEach(function(img){
    img.setAttribute('draggable', 'false');
  });

  wrap.addEventListener('dragstart', function(e){
    e.preventDefault();
  });

  // Important: wheel/trackpad should scroll the page normally, not the faculty row.
  wrap.addEventListener('wheel', function(e){
    // do nothing intentionally — no preventDefault, no horizontal conversion
  }, { passive:true });
})();

} catch(e) { console.error('[hegemoni-runtime] block 7:', e); }
})();

/* ===== inline script #8 (DISABLED for perf) =====
   Previously: scroll-driven "Apple sink" transition that updated
   --ha-logo-sink CSS variable on every scroll/raf tick. Disabled
   visually via CSS overrides — but JS still ran on every scroll
   causing main-thread jank. Now neutralized entirely. */

/* ===== inline script #9 (IIFE-wrapped) ===== */
(function(){
try {

/* v48: keep root scroll locked to x=0, without disturbing vertical scroll or inner faculty drag */
(function(){
  function lockRootX(){
    var y = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;

    if(window.scrollX && window.scrollX !== 0){
      window.scrollTo(0, y);
    }

    if(document.documentElement && document.documentElement.scrollLeft){
      document.documentElement.scrollLeft = 0;
    }

    if(document.body && document.body.scrollLeft){
      document.body.scrollLeft = 0;
    }
  }

  window.addEventListener('scroll', lockRootX, { passive:true });
  window.addEventListener('resize', lockRootX);
  window.addEventListener('load', lockRootX);

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', lockRootX);
  }else{
    lockRootX();
  }
})();

} catch(e) { console.error('[hegemoni-runtime] block 9:', e); }
})();

/* ===== inline script #10 (IIFE-wrapped) ===== */
(function(){
try {

/* v50: reliable roadmap typewriter, starts when PROVEN FRAMEWORK enters */
(function(){
  const el = document.querySelector('.typing-roadmap-scale');
  const section = document.querySelector('.hfw-section');
  if(!el || !section) return;

  const text = el.getAttribute('data-typewriter-text') || 'Scale Brand Dari 0 Sampai XX Milliar';

  function prepare(){
    if(el.dataset.prepared === 'true') return;
    el.dataset.prepared = 'true';
    el.textContent = '';
    el.classList.remove('is-typing','is-done');
  }

  function startTyping(){
    if(el.dataset.typed === 'true') return;
    el.dataset.typed = 'true';

    if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      el.textContent = text;
      return;
    }

    el.textContent = '';
    el.classList.add('is-typing');

    let i = 0;
    const speed = 44;
    const delay = 180;

    setTimeout(function type(){
      el.textContent = text.slice(0, i + 1);
      i += 1;

      if(i < text.length){
        setTimeout(type, speed);
      }else{
        el.classList.remove('is-typing');
        el.classList.add('is-done');
      }
    }, delay);
  }

  function boot(){
    prepare();

    if('IntersectionObserver' in window){
      const io = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if(entry.isIntersecting){
            startTyping();
            io.disconnect();
          }
        });
      }, { threshold:0.22, rootMargin:'0px 0px -8% 0px' });
      io.observe(section);
    }else{
      startTyping();
    }
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', boot);
  }else{
    boot();
  }
})();

} catch(e) { console.error('[hegemoni-runtime] block 10:', e); }
})();

/* ===== inline script #11 (IIFE-wrapped) ===== */
(function(){
try {

/* Mobile collapse for Playbook modules.
   - Uses grid-template-rows 0fr → 1fr for buttery-smooth collapse.
   - Wraps existing .hfwt-desc text in a child element (required for grid trick).
   - Rail auto-re-measures via ResizeObserver whenever heights change. */
(function(){
  var right, items;
  function trimRail(){
    if (window.innerWidth > 600) return;
    if (!right || !items || !items.length) return;
    var last = items[items.length - 1];
    var icon = last.querySelector('.hfwt-icon');
    if (!icon) return;
    var rightRect = right.getBoundingClientRect();
    var iconRect = icon.getBoundingClientRect();
    var iconCenterFromRailTop = (iconRect.top + iconRect.height / 2) - rightRect.top;
    var bottomFromRail = rightRect.height - iconCenterFromRailTop;
    right.style.setProperty('--rail-bottom', bottomFromRail + 'px');
  }
  function init(){
    if (window.innerWidth > 600) return;
    right = document.querySelector('.hfw-right');
    items = document.querySelectorAll('.hfwt-item');
    if (!right || !items.length) return;
    // Wrap each desc content in an inner span so grid-template-rows trick works.
    items.forEach(function(it){
      var desc = it.querySelector('.hfwt-desc');
      if (desc && !desc.querySelector('.hfwt-desc-inner')){
        var inner = document.createElement('span');
        inner.className = 'hfwt-desc-inner';
        inner.style.display = 'block';
        while (desc.firstChild) inner.appendChild(desc.firstChild);
        desc.appendChild(inner);
      }
    });
    items.forEach(function(it, i){
      if (i === 0) it.classList.add('hfw-open');
      it.addEventListener('click', function(e){
        if (e.target.closest('a,button')) return;
        var wasOpen = it.classList.contains('hfw-open');
        for (var k = 0; k < items.length; k++) items[k].classList.remove('hfw-open');
        if (!wasOpen) it.classList.add('hfw-open');
      }, { passive: true });
    });
    trimRail();
    // Auto re-measure rail when item heights change (e.g. on collapse toggle).
    if (typeof ResizeObserver !== 'undefined'){
      var ro = new ResizeObserver(function(){ trimRail(); });
      ro.observe(right);
    }
    window.addEventListener('resize', trimRail, { passive: true });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

} catch(e) { console.error('[hegemoni-runtime] block 11:', e); }
})();

/* ===== inline script #12 (IIFE-wrapped) ===== */
(function(){
try {

// Hegemoni edit: mobile-only hero slideshow uses hero-mobile-1..5 in filename order.
(function(){
  var slides = document.querySelectorAll('.hdb-mobile-slide');
  if (slides.length < 2) return;
  var i = 0;
  slides.forEach(function(slide, idx){ slide.classList.toggle('active', idx === 0); });
  setInterval(function(){
    if (!window.matchMedia || !window.matchMedia('(max-width: 600px)').matches) return;
    slides[i].classList.remove('active');
    i = (i + 1) % slides.length;
    slides[i].classList.add('active');
  }, 4500);
})();

} catch(e) { console.error('[hegemoni-runtime] block 12:', e); }
})();
