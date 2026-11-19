/* Hero sahnelerinin yerleşim verisi. Metinler sözlükte: i18n/locales/<dil>.js → hero.scenes (aynı sırayla).
   sub/fg değerleri ajansın OpenRaster kaynağındaki konumların yarısıdır (2880×1620 → 1440×810).
   focus: bildirim iğnesinin nesne üzerindeki yeri (genişlik ve yükseklik oranı).
   shadow: nesnenin zemine oturması için çizilen temas gölgesi (nesne pikseli koordinatında). */
const layout = [
  {
    id: 'race', icon: 'reward', tint: '9,47,49',
    sub: { x: 880, y: 217, w: 400, h: 327.5, vb: '0 0 800 655' }, fg: { x: 0, y: 489.5, w: 320 }, focus: [0.5, 0.305],
    shadow: '<polygon points="40,580 -70,640 330,725 440,655" opacity=".4" filter="url(#bl22)"/><polygon points="60,560 120,615 400,662 470,642 662,548 690,470 600,440 300,470" opacity=".9" filter="url(#bl12)"/><g filter="url(#bl5)"><ellipse cx="412" cy="648" rx="72" ry="12"/><ellipse cx="612" cy="538" rx="54" ry="9"/><ellipse cx="96" cy="592" rx="52" ry="9"/></g>',
  },
  {
    id: 'camp', icon: 'cloud-save', tint: '9,47,49',
    sub: { x: 935, y: 308, w: 351.5, h: 254, vb: '0 0 703 508' }, fg: { x: 0, y: 503.5, w: 320 }, focus: [0.43, 0.19],
    shadow: '<polygon points="0,430 -80,474 120,546 330,472" opacity=".24" filter="url(#bl22)"/><polygon points="0,428 140,508 330,454 400,480 480,480 560,472 640,484 700,446 640,405 80,395" opacity=".7" filter="url(#bl12)"/><g filter="url(#bl5)" opacity=".8"><ellipse cx="590" cy="472" rx="64" ry="8"/><ellipse cx="150" cy="500" rx="60" ry="7"/></g>',
  },
  {
    id: 'arcade', icon: 'trophy', tint: '9,47,49',
    sub: { x: 988, y: 444.5, w: 125, h: 95, vb: '0 0 250 190' }, fg: { x: 1115, y: 500, w: 325 }, focus: [0.458, 0.125],
    shadow: '<ellipse cx="114" cy="192" rx="70" ry="14" opacity=".5" filter="url(#bl12)"/><ellipse cx="114" cy="187" rx="36" ry="6" opacity=".85" filter="url(#bl5)"/>',
  },
  /* Düz (katmansız) sahneler: sub yalnızca çerçeveleme ve iğne için sanal bir kutudur;
     occ, dev başlığın önünden geçen kısmın maskeli kopyasıdır (y:170, yükseklik 300). */
  { id: 'town', icon: 'store', tint: '6,48,56', flat: true, sub: { x: 850, y: 250, w: 330, h: 300 }, focus: [0.545, 0.47] },
  { id: 'gate', icon: 'account', tint: '14,34,38', flat: true, sub: { x: 1070, y: 300, w: 310, h: 320 }, focus: [0.49, 0.44] },
  { id: 'run', icon: 'realtime', tint: '26,19,42', flat: true, sub: { x: 900, y: 110, w: 440, h: 440 }, focus: [0.78, 0.2] },
];

/** Yerleşim verisini seçilen dilin metinleriyle birleştirir. */
export function getScenes(t) {
  return layout.map((l, i) => ({ ...l, ...t.hero.scenes[i], studio: t.hero.studio }));
}
