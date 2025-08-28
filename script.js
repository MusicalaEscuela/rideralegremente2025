// ========= TU URL DE APPS SCRIPT =========
const WEBAPP_URL = "https://script.google.com/macros/s/AKfycbwjr9rr7yEpz3-x3ty4UdaxDbGtlpnB3OKiJGGAqK_yKBdTrA6bAAfqJzhRAdKZZ72x/exec";
// ========================================

// Atajos de elementos
const $ = (id) => document.getElementById(id);
const tabsEl   = $('sheetTabs');
const chipsEl  = $('chips');
const content  = $('content');
const searchEl = $('search');
const statusEl = $('status');
const toTopBtn = $('toTop');

$('btnPrint').onclick = () => window.print();
$('clearSearch').onclick = () => { searchEl.value=''; updateHash(); renderActive(); };
$('btnCopyLink').onclick = async () => {
  try{ await navigator.clipboard.writeText(location.href); flashStatus('Enlace copiado ✔️'); }
  catch{ flashStatus('No se pudo copiar', true); }
};
$('btnTheme').onclick = toggleTheme;
document.addEventListener('keydown', (e)=>{
  if(e.key === '/' && !/input|textarea/i.test(document.activeElement.tagName)){ e.preventDefault(); searchEl.focus(); }
  if(e.key.toLowerCase()==='d'){ toggleTheme(); }
  if(e.key.toLowerCase()==='l'){ $('btnCopyLink').click(); }
  if(e.key === 'Escape'){ searchEl.value=''; updateHash(); renderActive(); }
});

let DATA = {};
let SHEETS = [];
let current = "";
let debounceTimer;

// ===== Utilidades =====
const escapeHtml = (s) => String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const nl2br = (s) => escapeHtml(String(s)).replace(/\n/g,'<br>');
const flashStatus = (msg, isErr=false)=>{
  statusEl.textContent = msg;
  statusEl.classList.toggle('loading', false);
  if(isErr) statusEl.style.color = '#d11';
  setTimeout(()=>{ statusEl.textContent=''; statusEl.style.color=''; }, 1800);
};

// Detecta fila de encabezados "Categoría / Requisito"
function hasCatReqHeaders(rows){
  if(!rows || !rows.length) return -1;
  for(let i=0;i<Math.min(3,rows.length);i++){
    const r = rows[i].map(c => String(c||'').toLowerCase().trim());
    if((r.includes('categoría')||r.includes('categoria')) && (r.includes('requisito')||r.includes('requisitos'))) return i;
  }
  return -1;
}
function toRider(rows){
  const idx = hasCatReqHeaders(rows);
  const start = idx>=0 ? idx+1 : 1;
  const list = [];
  for(let i=start;i<rows.length;i++){
    const cat = (rows[i][0]||'').trim();
    const req = (rows[i][1]||'').trim();
    if(!cat && !req) continue;
    list.push({cat, req, id: 'c'+i});
  }
  return list;
}

// ===== Tabs =====
function renderTabs(){
  tabsEl.innerHTML = '';
  SHEETS.forEach(name => {
    const b = document.createElement('button');
    b.className = 'tab' + (name===current ? ' active':'' );
    b.textContent = name;
    b.setAttribute('role','tab');
    b.setAttribute('aria-selected', name===current ? 'true' : 'false');
    b.onclick = () => setActive(name, {push:true});
    tabsEl.appendChild(b);
  });
}
function setActive(name, {push=false} = {}){
  current = name;
  localStorage.setItem('rider:lastSheet', name);
  renderTabs();
  const pack = DATA[name] || {};
  const rows = pack.rows || [];
  const idx  = hasCatReqHeaders(rows);
  if(push) updateHash();
  if(idx >= 0) renderRider(rows);
  else renderTable(rows);
  // Muestra botón subir
  toTopBtn.classList.add('show');
}
toTopBtn.onclick = () => window.scrollTo({top:0, behavior:'smooth'});

// ===== Rider / Tabla =====
function renderRider(rows){
  const items = toRider(rows);
  const q = (searchEl.value||'').toLowerCase().trim();
  const filtered = q ? items.filter(x => x.cat.toLowerCase().includes(q) || x.req.toLowerCase().includes(q)) : items;

  // Chips
  chipsEl.innerHTML = filtered.map(x =>
    `<button class="chip" onclick="document.getElementById('${x.id}').scrollIntoView({behavior:'smooth'});">${escapeHtml(x.cat||'Ítem')}</button>`
  ).join('');

  // Contenido
  content.innerHTML = `
    <h2>${escapeHtml(current)}</h2>
    <div class="small muted" style="margin-bottom:8px">${filtered.length} categorías</div>
    <div id="riderWrap" class="cards"></div>
  `;
  const wrap = document.getElementById('riderWrap');
  wrap.innerHTML = filtered.map(x => `
    <article id="${x.id}" class="section article">
      <h3>${escapeHtml(x.cat||'Ítem')}</h3>
      <div class="req">${nl2br(x.req||'')}</div>
    </article>
  `).join('');

  // Resalta el artículo visible al hacer scroll (scroll spy simple)
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      const el = e.target;
      if(e.isIntersecting) el.classList.add('active');
      else el.classList.remove('active');
    });
  }, {rootMargin: '-30% 0px -60% 0px', threshold: 0.1});
  document.querySelectorAll('.article').forEach(a=>observer.observe(a));

  if(!searchEl.oninput){
    searchEl.oninput = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(()=>{ updateHash(); renderRider(rows); }, 160);
    };
  }
}

function renderTable(rows){
  chipsEl.innerHTML = '';
  searchEl.oninput = null;

  if(!rows.length){
    content.innerHTML = `<div class="muted">Sin datos en esta hoja.</div>`;
    return;
  }

  let header = rows[0], data = rows.slice(1);
  if((rows[0]?.[0]||'') && !(rows[0]?.[1]||'') && (rows[1]||[]).filter(c=>c && String(c).trim()).length >= 2){
    header = rows[1];
    data   = rows.slice(2);
  }

  const thead = header.map(h => `<th>${escapeHtml(h||'')}</th>`).join('');
  const tbody = data.map(r => `<tr>${
    header.map((_,i)=>`<td>${nl2br(r[i]||'')}</td>`).join('')
  }</tr>`).join('');

  content.innerHTML = `
    <h2>${escapeHtml(current)}</h2>
    <div class="section" style="overflow:auto">
      <table>
        <thead><tr>${thead}</tr></thead>
        <tbody>${tbody}</tbody>
      </table>
    </div>
  `;
}

// ===== Hash (deep link) =====
function updateHash(){
  const params = new URLSearchParams();
  if(current) params.set('sheet', current);
  const q = searchEl.value?.trim();
  if(q) params.set('q', q);
  history.replaceState(null, '', '#'+params.toString());
}
function readHash(){
  const hash = location.hash.replace(/^#/, '');
  const p = new URLSearchParams(hash);
  return { sheet: p.get('sheet')||'', q: p.get('q')||'' };
}

// ===== Tabs scrolling arrows =====
(function tabsArrows(){
  const wrap = document.querySelector('.tabs');
  document.querySelector('.tabs-arrow.left').onclick = ()=>wrap.scrollBy({left:-200,behavior:'smooth'});
  document.querySelector('.tabs-arrow.right').onclick= ()=>wrap.scrollBy({left: 200,behavior:'smooth'});
})();

// ===== Tema =====
function applyTheme(t){
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem('rider:theme', t);
}
function toggleTheme(){
  const cur = document.documentElement.getAttribute('data-theme') || 'light';
  applyTheme(cur === 'light' ? 'dark' : 'light');
}

// ===== Init =====
async function init(){
  try{
    statusEl.textContent = 'Cargando…';
    statusEl.classList.add('loading');

    // Tema recordado
    applyTheme(localStorage.getItem('rider:theme') || 'light');

    // Hash inicial
    const { sheet:hashSheet, q:hashQ } = readHash();
    if(hashQ) searchEl.value = hashQ;

    const res = await fetch(WEBAPP_URL + '?_=' + Date.now());
    if(!res.ok) throw new Error('No se pudo leer el WebApp.');
    DATA = await res.json();

    SHEETS = Object.keys(DATA);
    if(!SHEETS.length) throw new Error('El JSON llegó vacío.');

    const preferred = hashSheet
      || localStorage.getItem('rider:lastSheet')
      || SHEETS.find(n => n.toLowerCase().includes('requisitos') && n.toLowerCase().includes('teatro'))
      || SHEETS[0];

    setActive(preferred, {push:true});
    statusEl.textContent = 'Listo ✔️';
  }catch(e){
    content.innerHTML = `<div class="section" style="border-color:#ffb3b3;background:#ffecec">
      <b>Error:</b> ${escapeHtml(e.message)}
    </div>`;
  }finally{
    statusEl.classList.remove('loading');
  }
}
init();
