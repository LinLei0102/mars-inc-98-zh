(async () => {
  const q = (s) => document.querySelector(s), qa = (s) => [...document.querySelectorAll(s)];
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const seen = new Map();
  const add = (s) => {
    const t = (s || "").replace(/\s+/g, " ").trim();
    if (t.length < 3 || !/[A-Za-z]{2}/.test(t)) return;
    seen.set(t, (seen.get(t) || 0) + 1);
  };
  const collect = () => {
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
    let n;
    while ((n = w.nextNode())) { const p = n.parentNode; if (!p || /^(SCRIPT|STYLE)$/.test(p.nodeName)) continue; add(n.nodeValue); }
    for (const el of document.body.querySelectorAll("[title],[aria-label],[alt],[placeholder]"))
      for (const a of ["title","aria-label","alt","placeholder"]) { const v = el.getAttribute && el.getAttribute(a); if (v) add(v); }
  };
  const closeModal = async () => {
    for (let i = 0; i < 12; i++) {
      const m = q('#modal');
      if (m && !m.hidden) { qa('#modal .dlg-btns button').forEach((b) => b.click()); q('#modal [data-x]')?.click(); await wait(140); }
      else return;
    }
  };
  await wait(1300); await closeModal(); await wait(300); collect();
  for (const t of ["craft","power","mine","terra","hydro","bio","launch"]) {
    const b = q('[data-act="tab"][data-id="'+t+'"]'); if (!b) continue;
    b.click(); await wait(600); collect();
    for (const tile of qa('#pane-' + t + ' [data-act="bp"]').slice(0, 14)) { tile.click(); await wait(200); collect(); }
  }
  const menus = qa('#menubar .menu > button');
  for (let i = 0; i < menus.length; i++) {
    menus[i].click(); await wait(200); collect();
    for (const it of qa('.menu.open .drop button').slice(0, 10)) {
      const id = it.dataset.id || "";
      if (/^(newgame|loadgame|exit|save|itch|tab:)/.test(id)) continue;
      it.click(); await wait(400); collect(); await closeModal(); await wait(150);
      if (!q('.menu.open')) { menus[i].click(); await wait(180); }
    }
    menus[i].click(); await wait(150);
  }
  // 触发制造与升级日志
  q('[data-act="tab"][data-id="craft"]')?.click(); await wait(400);
  for (const c of qa('[data-act="craft"]').slice(0, 3)) { if (!c.disabled) { c.click(); await wait(300); } }
  collect();
  q('[data-act="tab"][data-id="mine"]')?.click(); await wait(500);
  for (let i = 0; i < 4; i++) { const mb = q('#mine-btn'); if (mb && !mb.disabled) mb.click(); await wait(220); }
  collect();
  q('#tl-helpmenu')?.click(); await wait(250); collect();
  const ask = qa('[data-act="mi"]').find((b) => /spr:ask/.test(b.dataset.id || ""));
  if (ask) { ask.click(); await wait(700); collect(); }
  const lines = [...seen.entries()].sort((a,b)=>b[1]-a[1]).map(([s,n]) => n + "\t" + s);
  const plain = lines.join("\n");
  return btoa(unescape(encodeURIComponent(plain)));
})()