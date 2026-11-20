(async () => {

  const q = (s) => document.querySelector(s), qa = (s) => [...document.querySelectorAll(s)];
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const ratio = () => { const t = document.body.innerText; const c = (t.match(/[\u4e00-\u9fff]/g)||[]).length; const l = (t.match(/[A-Za-z]{3,}/g)||[]).length; return Math.round(100 * c / Math.max(1, c + l)); };
  await wait(900);
  // close the mission briefing that opens on start
  for (const b of qa('#modal .dlg-btns button')) b.click();
  q('#modal [data-x]')?.click();
  await wait(500);
  const dbg = qa('#menubar .menu').find((m) => /Debug|调试/.test(m.textContent));
  if (dbg) { dbg.querySelector('button').click(); await wait(250); }
  q('[data-act="mi"][data-id="devkit"]')?.click(); await wait(450);
  for (const id of ["res","energy","seeds"]) { q('[data-act="dev"][data-id="'+id+'"]')?.click(); await wait(180); }
  for (let i=0;i<16;i++){ q('[data-act="dev"][data-id="stage"]')?.click(); await wait(220); }
  q('[data-act="dev"][data-id="buildall"]')?.click(); await wait(300);
  for (let i=0;i<8;i++){ q('[data-act="dev"][data-id="stage"]')?.click(); await wait(220); }
  q('[data-act="dev"][data-id="buildall"]')?.click(); await wait(300);
  q('#modal [data-x]')?.click(); await wait(400);

  const out = [];
  for (const t of ["craft","power","mine","terra","hydro","bio","launch"]) {
    const b = q('[data-act="tab"][data-id="'+t+'"]');
    if (!b) { out.push(t + ":lock"); continue; }
    b.click(); await wait(800);
    const pane = q('#pane-' + t);
    out.push(t + ":" + ratio() + "%/" + (pane ? pane.innerText.length : 0));
  }
  await wait(800);
  const d = document.documentElement.dataset;
  return out.join(" ") + " || HITS=" + d.i18nHits + " MISS=" + d.i18nMiss + " :: " + (d.i18nTop || "").slice(0, 600);
})()