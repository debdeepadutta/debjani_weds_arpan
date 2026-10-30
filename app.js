(() => {
'use strict';
const W = window.WEDDING;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const store = {
  get(k){ try { return localStorage.getItem(k); } catch(e){ return null; } },
  set(k,v){ try { localStorage.setItem(k,v); } catch(e){} }
};

const qs = new URLSearchParams(location.search);
const guest = (qs.get('guest') || '').replace(/[\u0000-\u001f<>]/g, '').replace(/\s+/g, ' ').trim().slice(0, 40);
const qLang = qs.get('lang');
let lang = (qLang === 'bn' || qLang === 'en') ? qLang : (store.get('lang') === 'bn' ? 'bn' : 'en');
const pick = o => (o && (o[lang] || o.en)) || '';
const dig = (o, path) => path.split('.').reduce((a, k) => a && a[k], o);
const fill = (s) => s
  .replace('{bride}', pick(W.names.bride)).replace('{groom}', pick(W.names.groom)).replace('{guest}', guest);
const locale = () => lang === 'bn' ? 'bn-IN' : 'en-IN';
const fmt = (iso, opt) => new Intl.DateTimeFormat(locale(), { timeZone: 'Asia/Kolkata', ...opt }).format(new Date(iso));
const nBn = n => lang === 'bn' ? new Intl.NumberFormat('bn-IN',{useGrouping:false}).format(n) : String(n);
// time: "7:30 PM" in English; "সন্ধ্যা ৭:৩০" in Bengali (no Latin AM/PM)
function fmtTime(iso){
  if (lang !== 'bn') return fmt(iso, { hour:'numeric', minute:'2-digit', hour12:true }).toUpperCase();
  const h = Number(new Intl.DateTimeFormat('en-GB', { timeZone:'Asia/Kolkata', hour:'2-digit', hour12:false }).format(new Date(iso)) % 24);
  const m = Number(new Intl.DateTimeFormat('en-GB', { timeZone:'Asia/Kolkata', minute:'2-digit' }).format(new Date(iso)));
  const per = h < 4 ? 'রাত' : h < 12 ? 'সকাল' : h < 16 ? 'দুপুর' : h < 18 ? 'বিকেল' : h < 20 ? 'সন্ধ্যা' : 'রাত';
  return `${per} ${nBn(h % 12 || 12)}:${nBn(m).padStart(m < 10 ? 2 : 1, '০')}`;
}

/* ---------------------------------------------------------------- text */
function render(){
  document.documentElement.lang = lang === 'bn' ? 'bn' : 'en';
  document.body.classList.toggle('bn', lang === 'bn');
  $('#langEn').classList.toggle('on', lang === 'en');
  $('#langBn').classList.toggle('on', lang === 'bn');

  $$('[data-i18n]').forEach(el => {
    const k = el.dataset.i18n.replace(/^ui\./, '');
    el.textContent = fill(pick(W.ui[k]));
  });

  const bride = pick(W.names.bride), groom = pick(W.names.groom);
  document.title = `${bride} & ${groom} · ${lang === 'bn' ? 'শুভ বিবাহ' : 'Wedding Invitation'}`;

  const long = fmt(W.dateTime, { day:'numeric', month:'long', year:'numeric' });
  const time = fmtTime(W.dateTime);
  const ist = lang === 'bn' ? '' : 'IST';
  const dayN = Number(fmt(W.dateTime, { day:'numeric', timeZone:'Asia/Kolkata' }).replace(/\D/g,'')) || null;
  let dateTxt = long;
  if (lang === 'en' && dayN) {
    const s = (dayN % 10 === 1 && dayN !== 11) ? 'st' : (dayN % 10 === 2 && dayN !== 12) ? 'nd' : (dayN % 10 === 3 && dayN !== 13) ? 'rd' : 'th';
    dateTxt = `${dayN}${s} ${fmt(W.dateTime, { month:'long' })} ${fmt(W.dateTime, { year:'numeric' })}`;
  }
  $('#heroDate').textContent = dateTxt; $('#heroTime').textContent = `${time} ${ist}`.trim(); $('#heroVenue').textContent = pick(W.venue.name);
  $('#secretDate').textContent = dateTxt;
  $('#dcDay').textContent = nBn(Number(new Intl.DateTimeFormat('en-IN', { timeZone:'Asia/Kolkata', day:'numeric' }).format(new Date(W.dateTime))));
  $('#dcMon').textContent = fmt(W.dateTime, { month:'short' }).replace(/\./g, '');
  // Bengali: swap in the picture without English lettering, and print the Bengali calendar date on the leaves
  { const bnMode = lang === 'bn', ai = $('.art-img');
    if (ai) ai.src = bnMode ? 'assets/date/hands2-bn.webp' : 'assets/date/hands2.webp';
    $('#artTitle').textContent = bnMode ? 'শুভ বিবাহ' : '';
    if (bnMode) { $('#dcDay').textContent = '৯ ই'; $('#dcMon').textContent = 'অগ্রহায়ণ'; } }
  $('#dcYear').textContent = nBn(Number(new Intl.DateTimeFormat('en-IN', { timeZone:'Asia/Kolkata', year:'numeric' }).format(new Date(W.dateTime))));
  if (lang === 'bn') $('#dcYear').textContent = '১৪৩৩';
  $('#secretTime').textContent = `${time} ${ist}`.trim();


  renderRituals();
  renderFamilies();
  renderFam2();

  // hero card: English lettering is painted in the picture; Bengali mode uses the blank arch with live Bengali names
  const bn = lang === 'bn', ci = $('#cardImg');
  const csrc = bn ? 'assets/card-bn-clean.webp' : 'assets/card.webp'; if (!ci.getAttribute('src').endsWith(csrc)) ci.src = csrc;
  ci.alt = bn ? 'দেবযানী ও অর্পণ। শুভ বিবাহ, বিয়ের আমন্ত্রণ।' : 'Debjani weds Arpan. Shubho Bibaho. 26th November 2026, 7:30 PM IST, St. Patricks Community Center.';
  $('#cardNames').hidden = !bn;
  $('[data-name=bride]').textContent = bride; $('[data-name=groom]').textContent = groom;

  // venue
  $('#venueName').textContent = pick(W.venue.name);
  $('#venueAddr').textContent = pick(W.venue.address);
  const q = encodeURIComponent(W.venue.mapQuery || W.venue.address.en);
  const frame = $('#mapFrame'); const src = `https://maps.google.com/maps?q=${q}&hl=${lang}&z=14&output=embed`;
  if (frame.dataset.src !== src) { frame.dataset.src = src; frame.src = src; }
  $('#mapBtn').href = W.venue.mapUrl || `https://www.google.com/maps/search/?api=1&query=${q}`;


  // guest greeting (?guest=Name)
  const dear = fill(pick(W.ui.dear));
  const gg = $('#guestGreet');
  gg.hidden = !guest;
  if (guest) gg.textContent = dear;

  fitHero();
}

/* ------------------------------------------------- family panels (live text) */
function renderFamilies(){
  $$('.w-text').forEach(el => {
    const f = W.families && W.families[el.dataset.fam]; if (!f) return;
    el.innerHTML = `<h3>${pick(f.title)}</h3><i class="wt-line" aria-hidden="true"></i>` + f.lines.map(l =>
      `<p>${l.label ? `<span class="wt-k">${pick(l.label)}:</span> ` : ''}<span class="wt-v">${pick(l.value)}</span></p>`).join('');
  });
}

/* ------------------------------------------------- fit text to the arch */
function fitOne(el, maxW, minPx){
  el.style.fontSize = '';
  let fs = parseFloat(getComputedStyle(el).fontSize);
  while (el.scrollWidth > maxW && fs > minPx) { fs -= 0.5; el.style.fontSize = fs + 'px'; }
}
function fitHero(){
  const gg = $('#guestGreet'); if (guest && gg.clientWidth) fitOne(gg, gg.clientWidth, 14);
  $$('.dc b, .dc i').forEach(el => { const w = el.parentElement.clientWidth; if (w) fitOne(el, w, 8); });
}
addEventListener('resize', () => { fitHero(); sizeScratch(); sizeFx(); });
if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { fitHero(); });

/* ------------------------------------------------------- reveal on scroll */
const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }) : null;
function watch(){ $$('.rv:not(.in)').forEach(el => io ? io.observe(el) : el.classList.add('in')); }

/* --------------------------------------------------------------- petals */
const fx = $('#fx'), fctx = fx.getContext('2d');
let parts = [], emitting = 0, raf = 0, last = 0;
function sizeFx(){ const r = fx.getBoundingClientRect(); const d = Math.min(devicePixelRatio || 1, 1.25); fx.width = r.width * d; fx.height = r.height * d; fctx.setTransform(d,0,0,d,0,0); }
function addPetal(x, y, burst){
  const white = Math.random() < .62;
  parts.push({ x, y, vx: burst ? (Math.random() - .5) * 7 : (Math.random() - .5) * 1.1, vy: burst ? -Math.random() * 6 - 2 : Math.random() * .9 + .6,
    r: Math.random() * 5 + 5, a: Math.random() * 6.28, va: (Math.random() - .5) * .08, sw: Math.random() * 6, col: white ? '255,250,240' : '240,170,40', life: 1 });
}
function loop(t){
  const dt = Math.min(2, (t - last) / 16.7 || 1); last = t;
  const w = fx.clientWidth, h = fx.clientHeight;
  fctx.clearRect(0, 0, w, h);
  if (emitting > 0 && scrollY < innerHeight * .55 && parts.length < (matchMedia('(max-width:600px)').matches ? 22 : 40) && Math.random() < .35 * dt) addPetal(Math.random() * w, -12);
  parts = parts.filter(p => p.y < h + 20 && p.life > 0);
  if (rparts.length || t < roseUntil) stepRoses(dt, w, h, t);
  for (const p of parts) {
    p.sw += .03 * dt; p.x += (p.vx + Math.sin(p.sw) * .6) * dt; p.y += p.vy * dt; p.vy += (p.vy < 1.6 ? .02 : 0) * dt; p.vx *= .995; p.a += p.va * dt;
    fctx.save(); fctx.translate(p.x, p.y); fctx.rotate(p.a); fctx.scale(1, .55 + .45 * Math.abs(Math.sin(p.sw)));
    fctx.fillStyle = `rgba(${p.col},.92)`; fctx.beginPath(); fctx.ellipse(0, 0, p.r, p.r * .62, 0, 0, 6.283); fctx.fill();
    fctx.restore();
  }
  if (parts.length || emitting > 0 || rparts.length || t < roseUntil) raf = requestAnimationFrame(loop); else raf = 0;
}
function startFx(){ if (reduced) return; if (!raf) { last = performance.now(); raf = requestAnimationFrame(loop); } }

/* ---------------------------------------------------------------- roses
   Red and pink rose heads with a few loose rose petals. They fall and spin
   gently. Used only when a family window is opened. */
// Real red roses and rose petals, cut out of the garden photo (assets/fx/)
const ROSE_N = 8, PETAL_N = 6;
let roseSprites = null, petalSprites = null;
function buildRoses(){
  if (roseSprites) return;
  const load = src => { const i = new Image(); i.decoding = 'async'; i.src = src; return i; };
  roseSprites = Array.from({ length: ROSE_N }, (_, k) => load(`assets/fx/rose${k + 1}.webp`));
  petalSprites = Array.from({ length: PETAL_N }, (_, k) => load(`assets/fx/petal${k + 1}.webp`));
}
let rparts = [], roseUntil = 0;
const smallScreen = () => matchMedia('(max-width:600px)').matches;
function addRose(x, y, burst){
  const head = Math.random() < .6, list = head ? roseSprites : petalSprites, spr = list[Math.floor(Math.random() * list.length)];
  if (!spr || !spr.complete || !spr.naturalWidth) return;
  const size = head ? 30 + Math.random() * 16 : 17 + Math.random() * 10, k = size / Math.max(spr.naturalWidth, spr.naturalHeight);
  rparts.push({ head, spr, w: spr.naturalWidth * k, h: spr.naturalHeight * k, x, y,
    vx: burst ? (Math.random() - .5) * 7 : (Math.random() - .5) * 1.1, vy: burst ? -Math.random() * 5 - 2 : Math.random() * .8 + .5, vmax: head ? 1.5 + Math.random() * .7 : 1.1 + Math.random() * .6,
    a: Math.random() * 6.28, va: (Math.random() - .5) * (head ? .045 : .07), sw: Math.random() * 6, sws: .022 + Math.random() * .03, tilt: .8 + Math.random() * .2 });
}
function roseShower(cx, cy){
  if (reduced) return; buildRoses();
  for (let i = 0; i < 9; i++) addRose(cx, cy, true);            // a small burst from the window ...
  roseUntil = performance.now() + 2600;         // ... then a shower from the top
  startFx();
}
function stepRoses(dt, w, h, t){
  if (t < roseUntil && rparts.length < (smallScreen() ? 30 : 48) && Math.random() < .3 * dt) addRose(Math.random() * w, -24, false);
  rparts = rparts.filter(p => p.y < h + 40);
  for (const p of rparts) {
    p.sw += p.sws * dt; p.x += (p.vx + Math.sin(p.sw) * .55) * dt; p.y += p.vy * dt; p.vy += (p.vy < p.vmax ? (p.vy < 0 ? .12 : .035) : -.01) * dt; p.vx *= .992; p.a += p.va * dt;
    const sy = p.head ? p.tilt + (1 - p.tilt) * Math.abs(Math.sin(p.sw * .8)) : .45 + .55 * Math.abs(Math.cos(p.sw * 1.3));
    fctx.save(); fctx.translate(p.x, p.y); fctx.rotate(p.a); fctx.scale(1, sy);
    fctx.drawImage(p.spr, -p.w / 2, -p.h / 2, p.w, p.h); fctx.restore();
  }
}
function petalsFor(ms){ if (reduced) return; emitting++; startFx(); setTimeout(() => { emitting--; }, ms); }
function burst(cx, cy){ if (reduced) return; for (let i = 0; i < 46; i++) addPetal(cx, cy, true); startFx(); }
document.addEventListener('visibilitychange', () => { if (document.hidden && raf) { cancelAnimationFrame(raf); raf = 0; } else if (parts.length || emitting || rparts.length) startFx(); });

/* ------------------------------------------------------- the opening */
// tap anywhere -> curtains part -> doors swing open -> the couple walk -> the card
const cover = $('#cover'), video = $('#walkVideo'), walk = $('#walk'), skipBtn = $('#skipBtn'), hero = $('#hero');
let opened = false, shown = false; const timers = [];
const later = (fn, ms) => timers.push(setTimeout(fn, ms));
function showCard(){
  if (shown) return; shown = true; timers.forEach(clearTimeout);
  document.documentElement.classList.remove('locked'); document.body.classList.remove('locked');
  window.scrollTo(0, 0);
  skipBtn.hidden = true;
  hero.classList.add('show');
  cover.classList.add('gone');                       // the walk fades away while the card fades in
  setTimeout(() => { try { video.pause(); } catch (e) {} cover.hidden = true; }, 1400);
}
function openInvite(){
  if (opened) return; opened = true;
  cover.classList.add('opening'); startMusic();
  if (reduced) { showCard(); return; }
  later(() => cover.classList.add('doors'), 350);
  later(() => { walk.classList.add('go'); const p = video.play(); if (p && p.catch) p.catch(showCard); skipBtn.hidden = false; }, 900);
  later(() => { if (video.currentTime < 0.1) showCard(); }, 5500);   // the video never started: go straight to the card
  later(() => cover.classList.add('push'), 1900);
  video.addEventListener('ended', showCard, { once: true });
  video.addEventListener('error', showCard, { once: true });
  $$('source', video).forEach(s => s.addEventListener('error', () => { if (video.networkState === 3) showCard(); }));
  later(showCard, 14000);                            // safety: never stay stuck
}
cover.addEventListener('click', openInvite);
cover.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openInvite(); } });
skipBtn.addEventListener('click', e => { e.stopPropagation(); showCard(); });

/* ---------------------------------------------------------------- music
   Starts when the guest taps the door, fades in over 2 s to a soft level (35%) and loops.
   The music button mutes it (the choice is remembered). Pauses when the phone locks or the tab is hidden.
   On phones volume is set through a Web Audio gain (iPhone ignores audio.volume); on file:// it falls back to audio.volume. */
const mbtn = $('#musicBtn'); let audio = null, musicOn = store.get('music') !== 'off', musicStarted = false, actx = null, gain = null, fadeT = 0;
const VOL = 0.35, FADE = 2; let voiceActive = false;
if (W.music) {
  fetch(W.music, { method: 'HEAD' }).then(r => { if (r.ok) { mbtn.hidden = false; audio = new Audio(W.music); audio.loop = true; audio.preload = 'auto'; audio.volume = 0; mbtn.classList.toggle('muted', !musicOn); mbtn.setAttribute('aria-pressed', musicOn); } }).catch(() => {});
}
function setVol(v){ if (gain) gain.gain.value = v; else if (audio) audio.volume = Math.min(1, Math.max(0, v)); }
function fadeTo(target, sec, done){
  clearInterval(fadeT); const from = gain ? gain.gain.value : audio.volume, t0 = performance.now();
  fadeT = setInterval(() => { const k = Math.min(1, (performance.now() - t0) / (sec * 1000)); setVol(from + (target - from) * k); if (k >= 1) { clearInterval(fadeT); if (done) done(); } }, 50);
}
function playMusic(){
  if (!audio || !musicOn || document.hidden) return;
  if (!gain && !actx && location.protocol !== 'file:' && (window.AudioContext || window.webkitAudioContext)) {
    try { actx = new (window.AudioContext || window.webkitAudioContext)(); const src = actx.createMediaElementSource(audio); gain = actx.createGain(); gain.gain.value = 0; src.connect(gain); gain.connect(actx.destination); audio.volume = 1; } catch (e) { actx = null; gain = null; audio.volume = 0; }
  }
  if (actx && actx.state === 'suspended') actx.resume().catch(() => {});
  const p = audio.play(); if (p && p.catch) p.catch(() => {});
  fadeTo(VOL, FADE);
}
function startMusic(){ musicStarted = true; playMusic(); }
function stopMusic(){ if (!audio) return; clearInterval(fadeT); fadeTo(0, .35, () => { if (!musicOn || document.hidden) audio.pause(); }); }
mbtn.addEventListener('click', () => {
  if (!audio) return; musicOn = !musicOn; store.set('music', musicOn ? 'on' : 'off'); mbtn.classList.toggle('muted', !musicOn); mbtn.setAttribute('aria-pressed', musicOn);
  if (musicOn) { musicStarted = true; if (!voiceActive) playMusic(); } else stopMusic();
});
document.addEventListener('visibilitychange', () => {
  if (!audio || !musicStarted) return;
  if (document.hidden) { clearInterval(fadeT); audio.pause(); setVol(0); if (actx && actx.state === 'running') actx.suspend().catch(() => {}); }
  else if (musicOn && !voiceActive) playMusic();
});
addEventListener('pagehide', () => { if (audio) audio.pause(); });

/* -------------------------------------------------------- language toggle */
$('#langEn').addEventListener('click', () => { lang = 'en'; store.set('lang', 'en'); render(); watch(); });
$('#langBn').addEventListener('click', () => { lang = 'bn'; store.set('lang', 'bn'); render(); watch(); });

/* ---------------------------------------------------------- scratch card
   The two betel leaves in the picture are the scratch surface. The coat is a
   dark-green foil image (assets/date/leaves.webp) with exactly the leaf shape;
   scratching it away shows the picture, with the date inside the red circles. */
const sc = $('#scratchCanvas'), sctx = sc.getContext('2d', { willReadFrequently: true }), art = $('#art');
const mini = document.createElement('canvas'), mctx = mini.getContext('2d', { willReadFrequently: true });   // small copy used only to measure progress
const MINI = 3;
let scratching = false, revealed = false, moves = 0, lastPt = null, started = false, samples = [];
const coatImg = new Image(); let coatReady = false;
coatImg.onload = () => { coatReady = true; paintCoat(); };
coatImg.src = 'assets/date/leaves2.webp';
let coatKey = '';
function paintCoat(){
  const w = sc.clientWidth, h = sc.clientHeight; if (!w || !coatReady) return;
  // repaint only when the card really changed size (mobile browsers fire resize while scrolling, which must not wipe the scratches)
  const key = w + 'x' + h + '@' + (devicePixelRatio || 1);
  if (key === coatKey) return; if (started || revealed) return; coatKey = key;
  const d = Math.min(devicePixelRatio || 1, 2); sc.width = Math.round(w * d); sc.height = Math.round(h * d); sctx.setTransform(d, 0, 0, d, 0, 0);
  sctx.globalCompositeOperation = 'source-over'; sctx.clearRect(0, 0, w, h); sctx.drawImage(coatImg, 0, 0, w, h);
  mini.width = Math.max(1, Math.round(w / MINI)); mini.height = Math.max(1, Math.round(h / MINI)); mctx.globalCompositeOperation = 'source-over'; mctx.clearRect(0, 0, mini.width, mini.height); mctx.drawImage(coatImg, 0, 0, mini.width, mini.height);
  // the points that lie on a leaf: progress is measured only there
  const data = mctx.getImageData(0, 0, mini.width, mini.height).data; samples = [];
  for (let y = 0; y < mini.height; y += 2) for (let x = 0; x < mini.width; x += 2) if (data[(y * mini.width + x) * 4 + 3] > 200) samples.push((y * mini.width + x) * 4 + 3);
}
function sizeScratch(){ paintCoat(); }
function pt(e){ const r = sc.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; }
function scratchTo(p){
  const lw = Math.max(34, sc.clientWidth * .095);
  const stroke = (c, k) => { c.globalCompositeOperation = 'destination-out'; c.strokeStyle = '#000'; c.globalAlpha = 1; c.lineCap = 'round'; c.lineJoin = 'round'; c.lineWidth = lw * k;
    c.beginPath(); if (lastPt) c.moveTo(lastPt.x * k, lastPt.y * k); else c.moveTo((p.x - .1) * k, p.y * k); c.lineTo(p.x * k, p.y * k); c.stroke(); };
  stroke(sctx, 1); stroke(mctx, 1 / MINI); lastPt = p;
  if (!started) { started = true; art.classList.add('started'); }
  if (++moves % 5 === 0) checkReveal();
}
function checkReveal(){
  if (revealed || !samples.length) return;
  const data = mctx.getImageData(0, 0, mini.width, mini.height).data; let clear = 0;
  for (let i = 0; i < samples.length; i++) if (data[samples[i]] < 40) clear++;
  if (clear / samples.length > .5) reveal();
}
function reveal(){
  if (revealed) return; revealed = true; sc.classList.add('gone'); art.classList.add('started');
  $('#secret').classList.add('on'); $('#saveBtn').hidden = false;
  const r = art.getBoundingClientRect(), fr = $('#frame').getBoundingClientRect();
  roseShower(r.left - fr.left + r.width * .47, r.top + r.height * .36);   // roses, same as the windows
}
sc.addEventListener('pointerdown', e => { if (revealed) return; scratching = true; lastPt = null; sc.setPointerCapture(e.pointerId); scratchTo(pt(e)); e.preventDefault(); });
sc.addEventListener('pointermove', e => { if (!scratching || revealed) return; scratchTo(pt(e)); e.preventDefault(); });
['pointerup','pointercancel'].forEach(t => sc.addEventListener(t, () => { scratching = false; lastPt = null; checkReveal(); }));


/* ------------------------------------------------------ wedding rituals
   Five rows: a picture in an arch, the ritual name on a line, and a pastel card
   with a gold + . Tapping the card opens it (time and description); tapping
   again closes it. One card is open at a time. */
const RIT = W.rituals || [];
const ritList = $('#ritList');
function ritWhen(r){
  if (r.date) return `<span>${fmt(r.date, { weekday: 'long', day: 'numeric', month: 'long' })}</span><span>${fmtTime(r.date)}</span>`;
  return pick(r.when);
}
const LOTUS = '<svg class="rr-lotus" viewBox="0 0 28 22" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2c3 3.5 3.6 7.5 0 12-3.6-4.500-3-8.500 0-12z"/><path d="M13 15C9.500 10.500 5 9.500 1.500 10.500c1.500 5 6.500 7.500 11.500 4.500z"/><path d="M15 15c3.500-4.500 8-5.500 11.500-4.500-1.500 5-6.500 7.500-11.500 4.500z"/><path d="M5 19c3-.5 6-.5 9 1.500 3-2 6-2 9-1.500"/></g></svg>';
const PLUS = '<svg class="rr-plusi" viewBox="0 0 48 48" aria-hidden="true"><rect x="9" y="9" width="30" height="30" rx="9" fill="#fff6e6" stroke="#c28a45" stroke-width="3"/><rect x="9" y="9" width="30" height="30" rx="9" transform="rotate(45 24 24)" fill="#fff6e6" stroke="#c28a45" stroke-width="3"/><rect x="9" y="9" width="30" height="30" rx="9" fill="#fff6e6"/><rect x="9" y="9" width="30" height="30" rx="9" transform="rotate(45 24 24)" fill="#fff6e6"/><path class="rr-h" d="M16 24h16" stroke="#9a5f1f" stroke-width="2.600" stroke-linecap="round"/><path class="rr-v" d="M24 16v16" stroke="#9a5f1f" stroke-width="2.600" stroke-linecap="round"/></svg>';
function renderRituals(){
  if (!ritList) return;
  ritList.innerHTML = RIT.map((r, i) => `
    <li class="rr-row ${i % 2 ? 'rr-g' : 'rr-p'}">
      <div class="rr-arch"><img src="assets/rit/arch${i + 1}.webp" alt="" decoding="async"></div>
      <div class="rr-right">
        <div class="rr-title">${LOTUS}<span class="rr-tx"><span class="rr-name">${pick(r.name)}</span>${r.alt ? `<span class="rr-alt">${pick(r.alt)}</span>` : ''}</span><span class="rr-plus">${PLUS}</span></div>
        <div class="rr-card">
          <span class="rr-wm"></span>
          <span class="rr-in"><span class="rr-when">${ritWhen(r)}</span><span class="rr-note">${pick(r.note)}</span></span>
        </div>
      </div>
    </li>`).join('');
  fitRit();
}
/* the writing must fit inside its card without making the row longer: shrink it a little if it does not */
function fitRit(){
  if (!ritList) return;
  $$('.rr-card', ritList).forEach(c => {
    let k = 1; c.style.setProperty('--fs', 1);
    while (c.scrollHeight > c.clientHeight + 1 && k > .6) { k -= .04; c.style.setProperty('--fs', k.toFixed(2)); }
  });
}
if (ritList && RIT.length) {
  let fitT = 0; const fitSoon = () => { clearTimeout(fitT); fitT = setTimeout(fitRit, 80); };
  ritList.addEventListener('load', fitSoon, true);      // arch pictures decide the card height
  addEventListener('resize', fitSoon);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitSoon);
  addEventListener('load', fitSoon);
}

/* --------------------------------------------------- save the date (.ics) */
// the wedding itself, plus every ritual that has a date (Gaye Holud)
$('#saveBtn').addEventListener('click', () => {
  const z = d => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const esc = t => t.replace(/[\\,;]/g, m => '\\' + m);
  const where = esc(`${pick(W.venue.name)}, ${pick(W.venue.address)}`), stamp = z(new Date());
  const items = [{ start: new Date(W.dateTime), hours: W.durationHours || 4, title: fill(pick(W.ui.calendarTitle)) }]
    .concat((W.rituals || []).filter(r => r.date).map(r => ({ start: new Date(r.date), hours: 2, title: `${pick(r.name)} · ${bride_groom()}` })));
  const ev = items.flatMap((it, i) => ['BEGIN:VEVENT', `UID:${it.start.getTime()}-${i}@wedding-invite`, `DTSTAMP:${stamp}`, `DTSTART:${z(it.start)}`, `DTEND:${z(new Date(it.start.getTime() + it.hours * 3600e3))}`,
    `SUMMARY:${esc(it.title)}`, `LOCATION:${where}`, 'BEGIN:VALARM', 'TRIGGER:-P1D', 'ACTION:DISPLAY', `DESCRIPTION:${esc(it.title)}`, 'END:VALARM', 'END:VEVENT']);
  const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Wedding Invitation//EN'].concat(ev, 'END:VCALENDAR').join('\r\n');
  const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' })); a.download = 'wedding-save-the-date.ics';
  document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
});
function bride_groom(){ return `${pick(W.names.bride)} ${lang === 'bn' ? 'ও' : '&'} ${pick(W.names.groom)}`; }

/* ------------------------------------------- the families page (scroll + tap) */
const rv2 = $$('.rv2'), wins = $$('.win');
const ease = p => p * p * (3 - 2 * p);
function closeWin(w){ w.classList.remove('open'); const b = $('.w-hit', w); b.tabIndex = 0; b.removeAttribute('aria-hidden'); }
function scrollFx(){
  const vh = innerHeight;
  rv2.forEach(el => {
    const r = el.getBoundingClientRect(), span = Math.max(180, Math.min(vh * .5, r.height * .8));
    const p = ease(Math.min(1, Math.max(0, (vh * .94 - r.top) / span)));
    if (Math.abs(p - (el._p ?? -1)) > .002) { el._p = p; el.style.setProperty('--p', p.toFixed(3)); }
    if (p < .06 && el.classList.contains('open')) closeWin(el);      // scrolled away: the windows close again
  });
}
let sfRaf = 0; const sfQueue = () => { if (!sfRaf) sfRaf = requestAnimationFrame(() => { sfRaf = 0; scrollFx(); }); };
if (reduced) rv2.forEach(el => el.style.setProperty('--p', 1));
else { addEventListener('scroll', sfQueue, { passive: true }); addEventListener('resize', sfQueue); scrollFx(); }
wins.forEach(w => $('.w-hit', w).addEventListener('click', e => {
  if (w.classList.contains('open')) return;
  w.classList.add('open'); e.currentTarget.tabIndex = -1; e.currentTarget.setAttribute('aria-hidden', 'true');
  const r = $('.shut', w).getBoundingClientRect(), fr = $('#frame').getBoundingClientRect();
  roseShower(r.left - fr.left + r.width / 2, r.top + r.height / 2);
}));


/* ------------------------------------------- families: two doors + voice messages */
function renderFam2(){
  const P = W.parentLines || {}, names = { b: W.names.bride, g: W.names.groom }, who = { b: 'bride', g: 'groom' };
  ['b', 'g'].forEach(k => {
    const nm = pick(names[k]);
    $$(`.vname[data-k="${k}"]`).forEach(el => el.textContent = nm);
    $$(`.dt .dn[data-k="${k}"]`).forEach(el => el.textContent = nm);
    $$(`.dt .pl[data-k="${k}"]`).forEach(el => el.textContent = pick(P[who[k]]));
    $$(`.door2[data-k="${k}"]`).forEach(el => el.setAttribute('aria-label', lang === 'bn' ? `${nm} — দরজা খুলুন` : `Open the door: ${nm}`));
    $$(`.voice[data-k="${k}"]`).forEach(el => el.setAttribute('aria-label', (lang === 'bn' ? 'শুনুন: ' : 'Play voice message: ') + nm));
  });
}
const VOICE = { en: { b: 'assets/fam2/bride.mp3', g: 'assets/fam2/groom.mp3' }, bn: { b: 'assets/fam2/bride-bn.mp3', g: 'assets/fam2/groom-bn.mp3' } }, vAudio = {};
function vEl(k){ if (vAudio[k] && vAudio[k]._l !== lang) { vAudio[k].pause(); vState(k, false); delete vAudio[k]; }
  return vAudio[k] || (vAudio[k] = (() => { const a = new Audio(VOICE[lang === 'bn' ? 'bn' : 'en'][k]); a._l = lang; a.preload = 'auto'; a.addEventListener('ended', () => { a.currentTime = 0; vState(k, false); endVoice(); }); return a; })()); }
function vState(k, on){ const b = $(`.voice[data-k="${k}"]`); if (b) b.classList.toggle('playing', on); }
function duckMusic(){ if (audio && musicStarted) { clearInterval(fadeT); fadeTo(0, .4, () => { if (voiceActive) audio.pause(); }); } }
function endVoice(){ voiceActive = false; if (musicOn && musicStarted) playMusic(); }
function openDoor2(k){
  const d = $(`.door2[data-k="${k}"]`); if (!d || d.classList.contains('open')) return;
  d.classList.add('open'); d._t = setTimeout(() => d.classList.add('det'), 5500);
  const r = d.getBoundingClientRect(), fr = $('#frame').getBoundingClientRect();
  roseShower(r.left - fr.left + r.width / 2, r.top + r.height * .45);
}
function toggleVoice(k){
  openDoor2(k);
  const a = vEl(k);
  if (!a.paused) { a.pause(); vState(k, false); endVoice(); return; }
  ['b', 'g'].forEach(o => { if (o !== k && vAudio[o] && !vAudio[o].paused) { vAudio[o].pause(); vState(o, false); } });
  voiceActive = true; duckMusic();
  const p = a.play(); vState(k, true);
  if (p && p.catch) p.catch(() => { vState(k, false); endVoice(); });
}
$$('.door2').forEach(d => d.addEventListener('click', () => { openDoor2(d.dataset.k); }));   // tap only opens; the photo turns to writing by itself
$$('.voice').forEach(b => b.addEventListener('click', () => toggleVoice(b.dataset.k)));
const stopVoices = () => { ['b', 'g'].forEach(k => { if (vAudio[k] && !vAudio[k].paused) { vAudio[k].pause(); vState(k, false); } }); if (voiceActive) voiceActive = false; };
document.addEventListener('visibilitychange', () => { if (document.hidden) stopVoices(); });
addEventListener('pagehide', stopVoices);

/* ---------------------------------------------------------------- start */
render(); watch(); sizeFx(); paintCoat(); buildRoses();
// re-paint the scratch coat once layout and fonts settle
setTimeout(() => { paintCoat(); fitHero(); }, 400);
if (new URLSearchParams(location.search).has('skip')) { opened = true; cover.hidden = true; showCard(); }
})();
