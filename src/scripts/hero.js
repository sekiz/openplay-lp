import { $, $$, RM, wait, clamp } from './util.js';

const hero = $('#hero');
if (hero) {
  const DATA = JSON.parse($('#scene-data').textContent);
  const scenes = $$('.scene', hero), tabs = $$('.htab', hero);
  const subs = scenes.map((s) => $('.subw', s)), imgs = scenes.map((s, i) => $('img.sub', s) || subs[i]), N = scenes.length;
  const co = $('#callout'), pin = $('.pin', hero), pinl = $('#pinl'), pind = $('#pind');
  const tints = $$('.tints i', hero);
  const hk = $('#hk'), hp = $('#hp'), rec = $('#rec');
  const cv = $('.motes', hero), cx = cv.getContext('2d');
  const DW = 1440, DH = 810, ZOOM = 1.07;
  let cur = 0, busy = false, auto = !RM, fitv = [], card = { l: 0, t: 0, w: 0, h: 0 };

  /* ---- sahneyi ekrana oturt: masaüstünde sağa yaslı "cover", mobilde nesne merkezli ---- */
  function fit() {
    const W = hero.clientWidth, H = hero.clientHeight, m = W < 900;
    scenes.forEach((sc, i) => {
      const b = subs[i]; let s, tx, ty;
      if (m) {
        s = Math.max(W / DW, Math.min(1.05, (0.8 * W) / Math.max(b.offsetWidth, 300)));
        tx = W / 2 - (b.offsetLeft + b.offsetWidth / 2) * s;
        ty = H * 0.7 - (b.offsetTop + b.offsetHeight / 2) * s;
        if (ty + DH * s < H) ty = H - DH * s;
        if (tx + DW * s < W) tx = W - DW * s;
        if (tx > 0) tx = 0;
      } else {
        s = Math.max(W / DW, H / DH); tx = W - DW * s; ty = (H - DH * s) / 2;
      }
      sc.style.transform = `translate(${tx}px,${ty}px) scale(${s})`;
      sc.style.setProperty('--hx', DW / 2 + ((W * 0.05 - tx) / s - DW / 2) / ZOOM + 'px');
      fitv[i] = { s, tx, ty, W, H, m };
    });
    pin.setAttribute('viewBox', `0 0 ${W} ${H}`);
    const dpr = Math.min(2, devicePixelRatio || 1);
    cv.width = W * dpr; cv.height = H * dpr; cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    place(cur);
  }
  /* nesnenin odak noktasının (araba tavanı, çadır zirvesi, topun tepesi) ekrandaki yeri */
  function anchor(i) {
    const f = fitv[i], d = DATA[i], b = subs[i];
    const x = DW / 2 + (b.offsetLeft + b.offsetWidth * d.focus[0] - DW / 2) * ZOOM;
    const y = DH / 2 + (b.offsetTop + b.offsetHeight * d.focus[1] - DH / 2) * ZOOM;
    return [f.tx + x * f.s, f.ty + y * f.s];
  }
  function place(i) {
    const f = fitv[i]; if (!f) return;
    const [ax, ay] = anchor(i), w = co.offsetWidth, h = co.offsetHeight;
    // masaüstünde kart nesnenin solunda, dev başlığın altında durur; mobilde nesnenin üstünde
    const l = f.m ? clamp(ax - w / 2, 12, f.W - w - 12) : clamp(ax - w - 96 * f.s, f.W * 0.05 + Math.min(f.W * 0.4, 460) + 20, f.W - w - 24);
    const t = f.m ? ay - h - 40 : Math.max(84, ay + 18 * f.s);
    co.style.left = l + 'px'; co.style.top = t + 'px'; card = { l, t, w, h, side: !f.m };
  }
  /* iğne ucu her karede nesnenin kendisini izler */
  function track() {
    const d = DATA[cur], r = imgs[cur].getBoundingClientRect(), h = hero.getBoundingClientRect();
    const x = r.left - h.left + r.width * d.focus[0], y = r.top - h.top + r.height * d.focus[1];
    const x1 = card.side ? card.l + card.w : clamp(x, card.l + 28, card.l + card.w - 28), y1 = card.side ? card.t + card.h / 2 : card.t + card.h;
    pinl.setAttribute('d', `M${x.toFixed(1)} ${y.toFixed(1)}L${x1.toFixed(1)} ${y1.toFixed(1)}`);
    pind.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
  }

  function setCopy(i, now) {
    const d = DATA[i];
    if (now || RM) { hk.textContent = d.game; hp.textContent = d.copy; return; }
    hk.classList.add('sw'); hp.classList.add('sw');
    setTimeout(() => { hk.textContent = d.game; hp.textContent = d.copy; hk.classList.remove('sw'); setTimeout(() => hp.classList.remove('sw'), 90); }, 380);
  }
  function setRec(i) {
    if (!rec) return; const d = DATA[i];
    rec.classList.add('sw');
    setTimeout(() => {
      $('#rec-ic').src = `/icons/${d.icon}.svg`;
      $('#rec-g').textContent = `${d.studio} / ${d.game} · ${d.panel}`;
      $('#rec-t').textContent = d.field; $('#rec-v').textContent = d.value;
      rec.classList.remove('sw');
    }, RM ? 0 : 260);
  }
  async function showCallout(i) {
    const d = DATA[i];
    $('#c-ic').innerHTML = `<img alt="" src="/icons/${d.icon}.svg">`;
    $('#c-t').textContent = d.event; $('#c-s').textContent = d.message;
    place(i); pinl.setAttribute('pathLength', '1'); track();
    pin.classList.add('pinon'); await wait(380); co.classList.add('show');
  }
  async function go(i, user) {
    if (busy || (i === cur && !user)) return; busy = true;
    co.classList.remove('show'); pin.classList.remove('pinon');
    const prev = scenes[cur], next = scenes[i];
    if (prev !== next) {
      prev.classList.add('out'); prev.classList.remove('on'); next.classList.remove('out'); next.classList.add('on');
      setTimeout(() => prev.classList.remove('out'), 1400);
    }
    tabs.forEach((t, k) => { t.classList.toggle('on', k === i); t.setAttribute('aria-pressed', String(k === i)); });
    cur = i; setRec(i); setCopy(i); tints.forEach((t, k) => t.classList.toggle('on', k === i));
    const tb = tabs[i].parentNode; tb.scrollTo({ left: tabs[i].offsetLeft - (tb.clientWidth - tabs[i].offsetWidth) / 2, behavior: RM ? 'auto' : 'smooth' });
    await wait(1050); await showCallout(i); busy = false;
  }
  const stopAuto = () => { auto = false; hero.classList.add('manual'); };
  tabs.forEach((t, k) => {
    t.addEventListener('click', () => { stopAuto(); go(k, true); });
    t.addEventListener('keydown', (e) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
      e.preventDefault(); stopAuto();
      const n = e.key === 'Home' ? 0 : e.key === 'End' ? N - 1 : (k + (e.key === 'ArrowLeft' ? N - 1 : 1)) % N;
      tabs[n].focus(); go(n, true);
    });
    $('u', t).addEventListener('animationend', () => { if (auto) go((k + 1) % N); });
  });

  /* imleç paralaksı (yalnızca fare olan cihazlarda) */
  let tx = 0, ty = 0, mx = 0, my = 0;
  if (matchMedia('(hover:hover)').matches && !RM) {
    hero.addEventListener('pointermove', (e) => { const r = hero.getBoundingClientRect(); tx = (e.clientX - r.left) / r.width - 0.5; ty = (e.clientY - r.top) / r.height - 0.5; });
    hero.addEventListener('pointerleave', () => { tx = ty = 0; });
  }
  /* ışık zerreleri */
  const COL = ['255,214,150', '255,196,120', '255,170,210', '255,224,170', '255,190,130', '255,150,140'];
  const P = Array.from({ length: 46 }, () => ({ x: Math.random(), y: Math.random(), r: 0.6 + Math.random() * 2.2, v: 0.15 + Math.random() * 0.5, a: Math.random() * 6.28, o: 0.15 + Math.random() * 0.55 }));
  let visible = true;
  new IntersectionObserver((es) => { visible = es[0].isIntersecting; }).observe(hero);
  function frame(t) {
    if (visible) {
      mx += (tx - mx) * 0.06; my += (ty - my) * 0.06;
      hero.style.setProperty('--mx', mx.toFixed(4)); hero.style.setProperty('--my', my.toFixed(4));
      track();
      const W = hero.clientWidth, H = hero.clientHeight; cx.clearRect(0, 0, W, H);
      for (const p of P) {
        p.y -= p.v / H; p.x += (Math.sin(t / 1400 + p.a) * 0.35 + 0.12) / W;
        if (p.y < -0.02) { p.y = 1.02; p.x = Math.random(); } if (p.x > 1.02) p.x = -0.02;
        const X = p.x * W, Y = p.y * H, o = p.o * (0.6 + 0.4 * Math.sin(t / 700 + p.a));
        const g = cx.createRadialGradient(X, Y, 0, X, Y, p.r * 5);
        g.addColorStop(0, `rgba(${COL[cur]},${o})`); g.addColorStop(1, `rgba(${COL[cur]},0)`);
        cx.fillStyle = g; cx.beginPath(); cx.arc(X, Y, p.r * 5, 0, 6.29); cx.fill();
      }
    }
    if (!RM) requestAnimationFrame(frame);
  }

  setCopy(0, true); setRec(0); fit();
  addEventListener('resize', fit);
  requestAnimationFrame(frame);
  document.fonts.ready.then(async () => { fit(); await wait(120); hero.classList.remove('boot'); await wait(1500); showCallout(0); });

  /* yapışkan gezinme ve sayfa içi kaydırma */
  const stick = $('.stick');
  if (stick) addEventListener('scroll', () => stick.classList.toggle('show', hero.getBoundingClientRect().bottom < 60), { passive: true });
  $$('[data-go]').forEach((a) => a.addEventListener('click', () => $(a.dataset.go)?.scrollIntoView({ behavior: RM ? 'auto' : 'smooth', block: 'start' })));
}
