import { $, RM, once } from './util.js';

/* Altbilgideki dev logo: görünür olunca harfler yükselir; imleç üstündeyken ışık imleci izler. */
const wm = $('.wordmark');
if (wm) {
  once(wm, (e) => e.classList.add('in'), 0.25);
  if (!RM && matchMedia('(hover:hover)').matches) {
    wm.addEventListener('pointermove', (e) => {
      const r = wm.getBoundingClientRect();
      wm.classList.add('live');
      wm.style.setProperty('--wx', ((e.clientX - r.left) / r.width) * 100 + '%');
      wm.style.setProperty('--wy', ((e.clientY - r.top) / r.height) * 100 + '%');
    });
    wm.addEventListener('pointerleave', () => { wm.classList.remove('live'); wm.style.removeProperty('--wx'); wm.style.removeProperty('--wy'); });
  }
}
