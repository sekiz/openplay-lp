import { $, $$, RM, wait, fmt, count } from './util.js';

/* A yönü: finiş → ödül → panel. Durum .la[data-s] üzerinde tutulur; CSS geçişleri oradan okur.
   Rozet, oyundaki yerinden paneldeki envanter satırına uçan tek bir öğedir. */
const la = $('#la');
if (la) {
  const sc = $('.la-sc', la), car = $('#car'), fly = $('#fly'), tag = $('#tag'), cap = $('#cap');
  const row = $('#row'), slot = $('#slot'), coins = $('#coins'), cnt = $('#count'), act = $('#act');
  const FROM = +coins.dataset.from, TO = +coins.dataset.to;
  $$('.num', la).forEach((n) => { n.textContent = fmt(+n.dataset.n); });
  let running = false, fit = { s: 1, tx: 0, ty: 0 };

  function layout() {
    const W = la.clientWidth, H = la.clientHeight, m = W < 900; let s, tx, ty;
    if (m) { s = Math.max(W / 1440, (0.82 * W) / 400); tx = W / 2 - 1080 * s; ty = H * 0.44 - 380 * s; if (tx + 1440 * s < W) tx = W - 1440 * s; }
    else { s = Math.max(W / 1440, H / 810) * 1.1; tx = W * 0.52 - 1080 * s; ty = H * 0.47 - 400 * s; tx = Math.min(0, Math.max(tx, W - 1440 * s)); ty = Math.min(0, Math.max(ty, H - 810 * s)); }
    sc.style.transform = `translate(${tx}px,${ty}px) scale(${s})`; fit = { s, tx, ty };
    sc.style.setProperty('--hx', (W * 0.053 - tx) / s + 'px');
    const r = car.getBoundingClientRect(), h = la.getBoundingClientRect();
    tag.style.transform = `translate(${r.left - h.left + r.width * 0.74 - tag.offsetWidth / 2}px,${r.top - h.top + r.height * 0.3 - 44}px)`;
  }
  const rel = (el) => { const r = el.getBoundingClientRect(), h = la.getBoundingClientRect(); return { x: r.left - h.left, y: r.top - h.top, w: r.width, h: r.height }; };
  function parkFly() { // rozetin oyundaki yeri: arabanın hemen üstü
    const c = rel(car), w = fly.offsetWidth;
    fly.style.left = c.x + c.w * 0.5 - w / 2 + 'px'; fly.style.top = c.y + c.h * 0.3 - fly.offsetHeight - 14 + 'px'; fly.style.transform = '';
  }
  const set = (s) => { la.dataset.s = s; if (cap.dataset[s]) cap.textContent = cap.dataset[s]; };

  function reset() {
    set('idle'); cap.textContent = ''; row.classList.remove('in', 'wait'); coins.textContent = fmt(FROM);
    cnt.textContent = cnt.dataset.before; act.textContent = act.dataset.idle; fly.getAnimations().forEach((a) => a.cancel()); layout();
  }
  function finish() { // son durum (hareket azaltıldığında doğrudan buraya gelinir)
    row.classList.add('in'); row.classList.remove('wait'); coins.textContent = fmt(TO);
    cnt.textContent = cnt.dataset.after; act.textContent = act.dataset.done; set('done'); cap.textContent = cap.dataset.panel;
  }
  async function play() {
    if (running) return; running = true; reset();
    if (RM) { finish(); running = false; return; }
    await wait(250); set('finish'); await wait(1100);
    parkFly(); set('reward'); await wait(1700);
    set('panel'); row.classList.add('in', 'wait'); cnt.textContent = cnt.dataset.after; await wait(950);
    // rozet panel satırındaki yuvaya uçar (aynı nesne, iki görünüm)
    const a = rel($('img', fly)), b = rel($('img', slot));
    const dx = b.x + b.w / 2 - (a.x + a.w / 2), dy = b.y + b.h / 2 - (a.y + a.h / 2), k = b.w / a.w;
    const anim = fly.animate([
      { transform: 'translate(0,0) scale(1)' },
      { transform: `translate(${dx * 0.45}px,${Math.min(dy, 0) - 70}px) scale(${1 + (k - 1) * 0.3})`, offset: 0.45 },
      { transform: `translate(${dx}px,${dy}px) scale(${k})` },
    ], { duration: 950, easing: 'cubic-bezier(.5,0,.2,1)', fill: 'forwards' });
    await anim.finished; row.classList.remove('wait'); fly.style.opacity = 0;
    count(FROM, TO, 900, (v) => { coins.textContent = fmt(v); }); coins.classList.remove('up'); void coins.offsetWidth; coins.classList.add('up');
    act.textContent = act.dataset.done; await wait(1000);
    set('done'); fly.style.opacity = ''; anim.cancel(); running = false;
  }

  $('#play').addEventListener('click', play);
  $('#replay').addEventListener('click', play);
  addEventListener('keydown', (e) => { if (e.key === 'r' || e.key === 'R') play(); });
  addEventListener('resize', () => { if (!running) layout(); });
  coins.textContent = fmt(FROM); layout(); document.fonts.ready.then(layout);
  $('.la-bg', la).addEventListener('load', layout);
}
