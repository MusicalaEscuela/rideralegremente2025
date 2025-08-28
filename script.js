// ========= TU URL DE APPS SCRIPT =========
const WEBAPP_URL = "https://script.google.com/macros/s/AKfycbwjr9rr7yEpz3-x3ty4UdaxDbGtlpnB3OKiJGGAqK_yKBdTrA6bAAfqJzhRAdKZZ72x/exec";
// ========================================

// Atajos
const el = id => document.getElementById(id);
const tabsEl   = el('sheetTabs');
const chipsEl  = el('chips');
const content  = el('content');
const searchEl = el('search');
const statusEl = el('status');

el('btnPrint').onclick = () => window.print();

let DATA = {};
let SHEETS = [];
let current = "";

// Utilidades
const escapeHtml = (s) => String(s).replace(/[&<>"']/g, m => (
  { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[m]
));
const nl2br = (s) => escapeHtml(String(s)).replace(/\n/g,'<br>');

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

function renderTabs(){
  tabsEl.innerHTML = '';
  SHEETS.forEach(name => {
    const b = document.createElement('button');
    b.className = 'tab' + (name===current ? ' active':'');
    b.textContent = name;
    b.onclick = () => setActive(name);
    tabsEl.appendChild(b);
  });
}

function setActive(name){
  current = name;
  renderTabs();
  const pack = DATA[name] || {};
  const rows = pack.rows || [];
  const idx  = hasCatReqHeaders(rows);
  if(idx >= 0) renderRider(rows);
  else renderTable(rows);
}

function renderRider(rows){
  const items = toRider(rows);
  const q = (searchEl.value||'').toLowerCase();
  const filtered = q ? items.filter(x => x.cat.toLowerCase().includes(q) || x.req.toLowerCase().includes(q)) : items;

  chipsEl.innerHTML = filtered.map(x =>
    `<button class="chip" onclick="document.getElementById('${x.id}').scrollIntoView({behavior:'smooth'});">${escapeHtml(x.cat||'Ítem')}</button>`
  ).join('');

  content.innerHTML = `
    <h2 style="margin:0 0 8px">${escapeHtml(current)}</h2>
    <div class="small muted" style="margin-bottom:8px">${filtered.length} categorías</div>
    <div id="riderWrap" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:12px"></div>
  `;
  const wrap = document.getElementById('riderWrap');
  wrap.innerHTML = filtered.map(x => `
    <article id="${x.id}" class="section">
      <h3>${escapeHtml(x.cat||'Ítem')}</h3>
      <div class="req">${nl2br(x.req||'')}</div>
    </article>
  `).join('');

  searchEl.oninput = () => renderRider(rows);
}

function renderTable(rows){
  chipsEl.innerHTML = '';
  searchEl.value = '';
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
    <h2 style="margin:0 0 8px">${escapeHtml(current)}</h2>
    <div class="section" style="overflow:auto">
      <table>
        <thead><tr>${thead}</tr></thead>
        <tbody>${tbody}</tbody>
      </table>
    </div>
  `;
}

async function init(){
  try{
    statusEl.textContent = 'Cargando…';
    const res = await fetch(WEBAPP_URL + '?_=' + Date.now());
    if(!res.ok) throw new Error('No se pudo leer el WebApp.');
    DATA = await res.json();
    SHEETS = Object.keys(DATA);
    if(!SHEETS.length) throw new Error('El JSON llegó vacío.');

    // Selecciona preferida si existe
    const preferred = SHEETS.find(n => n.toLowerCase().includes('requisitos') && n.toLowerCase().includes('teatro')) || SHEETS[0];
    setActive(preferred);
    statusEl.textContent = 'Listo ✔️';
  }catch(e){
    content.innerHTML = `<div class="error"><b>Error:</b> ${escapeHtml(e.message)}</div>`;
    statusEl.textContent = '';
  }
}

init();
