import { $, $$, RM } from './util.js';

/* Aynı nesnenin iki görünümünü birbirine bağlayan noktalı iz çizgisi.
   .threaded içindeki [data-node] öğeleri sırayla bağlanır; yan yana ise yatay,
   alt alta ise (mobil) dikey çizilir. data-stack="skip" olan kutuda alt alta çizilmez. */
const played = new Set();

export function draw() {
  $$('.threaded').forEach((box, bi) => {
    const svg = $('svg.thread', box), hr = svg.parentElement.getBoundingClientRect();
    const nodes = $$('[data-node]', box); let out = '';
    for (let i = 0; i < nodes.length - 1; i++) {
      const a = nodes[i].getBoundingClientRect(), c = nodes[i + 1].getBoundingClientRect();
      const stacked = c.left - a.right < 24;
      if (stacked && box.dataset.stack === 'skip') continue;
      let x1, y1, x2, y2, d;
      if (stacked) {
        x1 = a.left + a.width / 2 - hr.left; y1 = a.bottom - hr.top + 5; x2 = c.left + c.width / 2 - hr.left; y2 = c.top - hr.top - 5;
        const dy = (y2 - y1) * 0.5; d = `M${x1} ${y1}C${x1} ${y1 + dy},${x2} ${y2 - dy},${x2} ${y2}`;
      } else {
        x1 = a.right - hr.left + 5; y1 = a.top + a.height / 2 - hr.top; x2 = c.left - hr.left - 5; y2 = c.top + c.height / 2 - hr.top;
        const dx = (x2 - x1) * 0.5; d = `M${x1} ${y1}C${x1 + dx} ${y1},${x2 - dx} ${y2},${x2} ${y2}`;
      }
      const id = `m${bi}_${i}`;
      out += `<g class="th${played.has(id) || RM ? ' go' : ''}" data-id="${id}"><mask id="${id}" maskUnits="userSpaceOnUse" x="-50" y="-50" width="4000" height="4000"><path class="rv" d="${d}" pathLength="1" fill="none" stroke="#fff" stroke-width="14" stroke-dasharray="1" stroke-linecap="round"/></mask>
      <g mask="url(#${id})"><path d="${d}" fill="none" stroke="#FFB14D" stroke-opacity=".28" stroke-width="6" stroke-linecap="round"/><path d="${d}" fill="none" stroke="#FFB14D" stroke-width="1.8" stroke-dasharray="1 6" stroke-linecap="round"/></g>
      <circle cx="${x1}" cy="${y1}" r="4" fill="#FFB14D" stroke="#fff" stroke-width="2"/><circle cx="${x2}" cy="${y2}" r="4" fill="#FFB14D" stroke="#fff" stroke-width="2"/></g>`;
    }
    svg.innerHTML = out;
  });
}
export function fire(box, i) {
  const g = $$('.th', box)[i];
  if (g) { played.add(g.dataset.id); g.getBoundingClientRect(); g.classList.add('go'); }
}
export function unfire(box) {
  $$('.th', box).forEach((g) => { played.delete(g.dataset.id); g.classList.remove('go'); });
}
let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(draw, 120); });
