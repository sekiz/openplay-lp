import { $, $$, RM, wait, fmt, count, once } from './util.js';
import { draw, fire, unfire } from './threads.js';

/* ---------- Ürün penceresi: bir ödülün oyundan panele izi ---------- */
const fr = $('.frame');
if (fr) {
  const steps = $$('.tr', fr), row = $('.tb .r.hl', fr), akce = $$('.num', fr)[0], hud = $('.hud span:last-child', fr);
  const setAkce = (v) => { akce.lastChild.textContent = fmt(v); hud.childNodes[1].textContent = fmt(v) + ' '; };
  let running = false;
  const reset = () => {
    fr.classList.remove('s1', 's2', 's3', 's4'); steps.forEach((s) => s.classList.remove('on'));
    row.classList.remove('hl'); row.classList.add('pend'); setAkce(1250); unfire(fr);
  };
  const play = async () => {
    if (running) return; running = true; reset(); await wait(500);
    fr.classList.add('s1'); steps[0].classList.add('on'); await wait(900);
    fr.classList.add('s2'); steps[1].classList.add('on'); await wait(700);
    fire(fr, 0); await wait(950);
    fr.classList.add('s3'); steps[2].classList.add('on'); row.classList.remove('pend'); row.classList.add('hl'); await wait(900);
    fr.classList.add('s4'); steps[3].classList.add('on'); count(1250, 1370, 900, setAkce);
    akce.classList.remove('bumpn'); void akce.offsetWidth; akce.classList.add('bumpn');
    await wait(1000); running = false;
  };
  $('.replay', fr)?.addEventListener('click', play);
  draw(); if (!RM) reset();
  once(fr, () => { draw(); if (!RM) play(); }, 0.3);
}

/* ---------- kaydırmayla beliren öğeler ---------- */
const mark = (sel, stagger) => $$(sel).forEach((el) => {
  el.dataset.a = '';
  if (stagger) el.style.setProperty('--i', [...el.parentElement.children].indexOf(el));
});
mark('.head'); mark('.steps .step', 1); mark('.split>div', 1); mark('.ec', 1); mark('.tc', 1); mark('.bc', 1); mark('.foot');
mark('.dg'); mark('.sdk', 1); mark('.mcp'); mark('.paths'); mark('.cbox'); mark('#platform .frame');
$$('[data-a]').forEach((el) => once(el, (e) => e.classList.add('in'), 0.12));

/* ekonomi: eşyanın izi sırayla çizilir */
const trio = $('.trio');
once(trio, async () => { draw(); await wait(700); fire(trio, 0); await wait(800); fire(trio, 1); }, 0.3);
once($('.profile'), (e) => e.classList.add('in'), 0.3);

/* skor tablosu: Ada bir sıra yükselir */
const lb = $('.lb');
if (lb) {
  const rows = $$('.r', lb), me = rows[2], other = rows[3], sc = $('.sc', me);
  if (RM) lb.classList.add('done');
  else {
    const h = me.offsetHeight;
    me.style.transition = other.style.transition = 'none';
    me.style.transform = `translateY(${h}px)`; other.style.transform = `translateY(${-h}px)`;
    $('.p', me).textContent = '4'; $('.p', other).textContent = '3'; sc.textContent = fmt(15280);
  }
  once(lb, async () => {
    await wait(900); me.style.transition = other.style.transition = '';
    count(15280, 17105, 1100, (v) => { sc.textContent = fmt(v); }); await wait(500);
    me.style.transform = other.style.transform = ''; $('.p', me).textContent = '3'; $('.p', other).textContent = '4'; lb.classList.add('done');
  }, 0.6);
}
const chat = $('.chat');
if (chat) { $$('.msg,.sys', chat).forEach((m, i) => { m.style.transitionDelay = 0.2 + i * 0.55 + 's'; }); once(chat, (e) => e.classList.add('in'), 0.5); }
once($('.lock'), (e) => e.classList.add('in'), 0.5);
$('.steps .code pre')?.insertAdjacentHTML('beforeend', '<span class="cur"></span>');
