import { $, $$, RM, wait, fmt, count } from './util.js';

/* B yönü: oyun ve stüdyo yan yana. Tek seçim hem sahneyi hem paneldeki sonucu değiştirir.
   Her panel görünümü "önce" durumundan başlar ve sonucu oynatır. */
const lb = $('#lb');
if (lb) {
  const subs = $$('.lb-sub', lb), bgs = $$('.lb-bg', lb), opts = $$('.lb-opt', lb), views = $$('.pv', lb);
  const ev = $('#ev'), res = $('#res'), coins = $('#coins'), row = $('#row'), cnt = $('#count'), save = $('#save'), board = $('#board');
  const FROM = +coins.dataset.from, TO = +coins.dataset.to, N = subs.length;
  $$('.num', lb).forEach((n) => { n.textContent = fmt(+n.dataset.n); });
  let cur = 0, token = 0;

  /* skor tablosu: Ada 5. sıradan 3. sıraya. DOM sırası son durumdur; "önce" durumu kaydırmayla kurulur. */
  const rows = $$('li', board), mv = rows.map((r) => $('.mv', r)), me = rows.findIndex((r) => r.classList.contains('me')), meSc = $('.sc', rows[me]);
  const H = () => rows[0].offsetHeight;
  const boardBefore = () => { mv.forEach((m) => { m.style.transition = 'none'; }); mv[me].style.transform = `translateY(${2 * H()}px)`; mv[me + 1].style.transform = mv[me + 2].style.transform = `translateY(${-H()}px)`; meSc.textContent = fmt(14105); void board.offsetWidth; mv.forEach((m) => { m.style.transition = ''; }); };
  const boardAfter = () => { mv.forEach((m) => { m.style.transform = ''; }); };

  const before = [
    () => { row.classList.remove('in'); coins.textContent = fmt(FROM); cnt.textContent = cnt.dataset.before; },
    () => { save.classList.remove('done'); $('.st', save).textContent = $('.st', save).dataset.saving; },
    boardBefore,
  ];
  const after = [
    async (ok) => { await wait(700); if (!ok()) return; row.classList.add('in'); cnt.textContent = cnt.dataset.after; await wait(500); if (!ok()) return; count(FROM, TO, 900, (v) => { if (ok()) coins.textContent = fmt(v); }); coins.classList.remove('up'); void coins.offsetWidth; coins.classList.add('up'); },
    async (ok) => { await wait(500); if (!ok()) return; save.classList.add('done'); await wait(RM ? 0 : 1300); if (ok()) $('.st', save).textContent = $('.st', save).dataset.synced; },
    async (ok) => { await wait(800); if (!ok()) return; count(14105, 17105, 1000, (v) => { if (ok()) meSc.textContent = fmt(v); }); await wait(450); if (ok()) boardAfter(); },
  ];
  function playView(i) {
    const my = ++token, ok = () => my === token;
    before[i]();
    if (RM) { [() => { row.classList.add('in'); coins.textContent = fmt(TO); cnt.textContent = cnt.dataset.after; }, () => { save.classList.add('done'); $('.st', save).textContent = $('.st', save).dataset.synced; }, () => { boardAfter(); meSc.textContent = fmt(17105); }][i](); return; }
    after[i](ok);
  }
  function select(i, focus) {
    i = (i + N) % N; cur = i; lb.dataset.i = i;
    subs.forEach((s, k) => { s.dataset.p = (k - i + N) % N; });
    bgs.forEach((b, k) => b.classList.toggle('on', k === i));
    opts.forEach((o, k) => o.setAttribute('aria-pressed', String(k === i)));
    views.forEach((v, k) => v.classList.toggle('on', k === i));
    const o = opts[i], swap = (el, txt) => { const p = el.parentElement; p.classList.add('sw'); setTimeout(() => { el.textContent = txt; p.classList.remove('sw'); }, RM ? 0 : 260); };
    swap(ev, o.dataset.event); swap(res, o.dataset.result);
    if (focus) o.focus();
    playView(i);
  }
  opts.forEach((o, k) => o.addEventListener('click', () => select(k)));
  $('#prev').addEventListener('click', () => select(cur - 1));
  $('#next').addEventListener('click', () => select(cur + 1));
  $('#replay').addEventListener('click', () => playView(cur));
  $('.lb-pick', lb).addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); select(cur - 1, true); }
    if (e.key === 'ArrowRight') { e.preventDefault(); select(cur + 1, true); }
    if (e.key === 'Home') { e.preventDefault(); select(0, true); }
    if (e.key === 'End') { e.preventDefault(); select(N - 1, true); }
  });
  /* dokunmatik: sahnede yatay kaydırma */
  let x0 = null; const st = $('#stage');
  st.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
  st.addEventListener('touchend', (e) => { if (x0 === null) return; const d = e.changedTouches[0].clientX - x0; x0 = null; if (Math.abs(d) > 48) select(cur + (d < 0 ? 1 : -1)); }, { passive: true });

  subs.forEach((s, k) => { s.dataset.p = k; });
  document.fonts.ready.then(() => playView(0));
}
