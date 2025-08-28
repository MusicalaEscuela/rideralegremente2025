:root{
  --bg:#f6f7fb;
  --card:#ffffffcc;
  --card-solid:#fff;
  --text:#1f2328;
  --muted:#60666d;
  --brand:#2563eb;
  --brand-2:#1b5cff;
  --ok:#22c55e;
  --radius:16px;
  --shadow:0 10px 28px rgba(0,0,0,.08);
  --hair:#eceef3;
  --blur: 8px;
}

html{scroll-behavior:smooth}
*{box-sizing:border-box}
body{
  margin:0;
  background:
    radial-gradient(60rem 60rem at -10% -20%, #dbe8ff 0%, #eef2ff 26%, transparent 60%),
    radial-gradient(50rem 50rem at 120% 20%, #ffe6f5 0%, #fff0f8 30%, transparent 60%),
    var(--bg);
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  color:var(--text);
}

/* ===== THEME: DARK ===== */
html[data-theme="dark"]{
  --bg:#0b1020;
  --card:#0e1626cc;
  --card-solid:#0e1626;
  --text:#e6e9f0;
  --muted:#a7b1c2;
  --brand:#6aa6ff;
  --brand-2:#82aaff;
  --hair:#1b2740;
  --shadow:0 10px 28px rgba(0,0,0,.5);
}

/* ===== HEADER ===== */
header{
  position:sticky;top:0;z-index:10;
  backdrop-filter:saturate(1.1) blur(var(--blur));
  background:linear-gradient(180deg, var(--card), var(--card-solid));
  border-bottom:1px solid var(--hair);
}
.head{
  max-width:1200px;margin:auto;
  display:flex;gap:14px;align-items:center;
  padding:10px 16px;
}
.logo{width:40px;height:40px;border-radius:10px;object-fit:cover;box-shadow:0 2px 8px rgba(0,0,0,.08)}
.titles h1{font-size:18px;margin:0}
.small{font-size:12px;color:var(--muted)}
.spacer{flex:1}
.actions{display:flex;align-items:center;gap:8px}

.icon-btn{
  display:inline-flex;align-items:center;justify-content:center;
  width:36px;height:36px;border-radius:12px;border:1px solid var(--hair);
  background:var(--card-solid);cursor:pointer;
}
.icon-btn.ghost{background:transparent}
.icon{display:inline-block;width:18px;height:18px}
.icon.theme{background:conic-gradient(from 0deg, #ffbf3c, #ff7a3d 40%, #8b5cf6 60%, #3b82f6)}
.icon.link{background: linear-gradient(135deg,#6aa6ff,#8b5cf6)}
.icon.search{mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="black"><path d="M21 21l-4.35-4.35m1.85-5.65A7.5 7.5 0 1 1 3 11a7.5 7.5 0 0 1 15 0z"/></svg>') center/contain no-repeat;background:#9aa4b2}
.icon.close{mask:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" stroke="black" stroke-width="2" stroke-linecap="round"/></svg>') center/18px 18px no-repeat;background:#9aa4b2}

.btn{
  background:var(--brand);
  color:#fff;border:none;border-radius:12px;
  padding:10px 14px;cursor:pointer;
  box-shadow:0 6px 14px rgba(37,99,235,.25);
  transition: transform .06s ease;
}
.btn:active{transform:translateY(1px)}

.tabs-wrap{
  display:flex;align-items:center;gap:6px;
  padding:6px 8px;border-top:1px solid var(--hair);
}
.tabs-arrow{
  width:34px;height:34px;border-radius:10px;border:1px solid var(--hair);
  background:var(--card-solid);cursor:pointer;
}
.tabs{
  display:flex;gap:8px;overflow:auto;scrollbar-width:thin;flex:1;
  padding-bottom:4px;
}
.tab{
  background:var(--card-solid);
  border:1px solid var(--hair);
  border-radius:999px;padding:8px 12px;
  cursor:pointer;white-space:nowrap;
}
.tab.active{
  background:linear-gradient(180deg,var(--brand-2),var(--brand));
  color:#fff;border-color:transparent;
  box-shadow:0 6px 16px rgba(27,92,255,.25);
}

/* ===== MAIN ===== */
main{max-width:1200px;margin:18px auto;padding:0 16px 80px}
.bar{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}
.kbd{opacity:.8}
.status-wrap{display:flex;gap:8px;align-items:center}
#status.loading::after{
  content:""; width:14px;height:14px;border-radius:50%;
  border:2px solid var(--hair); border-top-color:var(--brand);
  display:inline-block; margin-left:8px; animation:spin .8s linear infinite;
}
@keyframes spin{to{transform:rotate(360deg)}}

.grid{display:grid;grid-template-columns:1fr;gap:14px}
@media(min-width:980px){.grid{grid-template-columns:280px 1fr}}

.panel{
  background:var(--card);backdrop-filter: blur(var(--blur));
  border:1px solid var(--hair);border-radius:var(--radius);padding:12px;
  box-shadow:var(--shadow)
}
.panel-title{display:block;margin-bottom:6px}
.search-wrap{
  display:flex;align-items:center;gap:6px;
  background:var(--card-solid);border:1px solid var(--hair);
  border-radius:12px;padding:8px 10px
}
.search{flex:1;border:none;outline:none;background:transparent;color:var(--text)}
.chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px;max-height:44vh;overflow:auto;padding-right:4px}
.chip{
  background:#eef4ff22;color:var(--brand-2);
  border:1px solid var(--hair);border-radius:999px;padding:8px 12px;cursor:pointer
}
html[data-theme="dark"] .chip{background:#1b274022}

.section{
  background:var(--card);backdrop-filter: blur(var(--blur));
  border:1px solid var(--hair);border-radius:var(--radius);padding:14px;box-shadow:var(--shadow)
}
.section h2{margin:0 0 8px 0}
.section h3{margin:0 0 6px 0;font-size:18px}
.req{white-space:pre-line;line-height:1.5}
.muted{color:var(--muted)}

/* Rider grid */
.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:12px}
.article{scroll-margin-top:110px}
.article.active{outline:2px solid var(--brand);outline-offset:2px;border-radius:12px}

/* Tables */
table{width:100%;border-collapse:collapse}
th,td{border-bottom:1px solid var(--hair);padding:10px;vertical-align:top}
th{text-align:left;color:var(--muted);font-weight:600}

/* Skeleton */
.skeleton-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:12px}
.skeleton-card{
  height:120px;border-radius:14px;background:
  linear-gradient(90deg, #e9edf6 25%, #f4f7fc 37%, #e9edf6 63%);
  animation: shimmer 1.2s infinite; border:1px solid var(--hair)
}
html[data-theme="dark"] .skeleton-card{
  background:linear-gradient(90deg, #1a2438 25%, #1f2b44 37%, #1a2438 63%);
}
@keyframes shimmer{0%{background-position:-200px 0}100%{background-position:200px 0}}

/* Buttons / utilities */
.to-top{
  position:fixed;right:18px;bottom:18px;z-index:20;
  width:42px;height:42px;border-radius:12px;border:1px solid var(--hair);
  background:var(--card-solid);cursor:pointer;display:none
}
.to-top.show{display:block}

/* Print */
@media print{
  header,.panel,.tabs-wrap,.bar,#toTop{display:none!important}
  body{background:#fff}
  .section{box-shadow:none;border:1px solid #ddd}
  a[href]:after{content:""}
}

/* Accesibilidad */
.visually-hidden{
  position:absolute!important;height:1px;width:1px;overflow:hidden;
  clip:rect(1px,1px,1px,1px);white-space:nowrap
}
