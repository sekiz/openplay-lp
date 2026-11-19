export const RM = matchMedia('(prefers-reduced-motion:reduce)').matches;
export const $ = (s, e = document) => e.querySelector(s);
export const $$ = (s, e = document) => [...e.querySelectorAll(s)];
export const wait = (ms) => new Promise((r) => setTimeout(r, RM ? 0 : ms));
const LOCALE = document.documentElement.lang || 'en-US';
export const fmt = (n) => Math.round(n).toLocaleString(LOCALE);
export const clamp = (v, a, b) => Math.min(Math.max(v, a), Math.max(a, b));

/** Sayıyı yumuşak biçimde from → to sayar. */
export function count(from, to, ms, cb) {
  if (RM) return cb(to);
  const t0 = performance.now();
  const f = (t) => {
    const p = Math.min(1, (t - t0) / ms);
    cb(from + (to - from) * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(f);
  };
  requestAnimationFrame(f);
}

/** Öğe görünür olduğunda bir kez çalışır. */
export function once(el, fn, threshold = 0.35) {
  if (!el) return;
  const io = new IntersectionObserver(
    (es) => es.forEach((e) => { if (e.isIntersecting) { io.disconnect(); fn(el); } }),
    { threshold },
  );
  io.observe(el);
}
