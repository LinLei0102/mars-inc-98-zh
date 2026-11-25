(async () => {
  const q = (s) => document.querySelector(s), qa = (s) => [...document.querySelectorAll(s)];
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const closeModal = async () => {
    for (let i = 0; i < 12; i++) {
      const m = q('#modal');
      if (m && !m.hidden) { qa('#modal .dlg-btns button').forEach((b) => b.click()); q('#modal [data-x]')?.click(); await wait(150); }
      else return;
    }
  };
  await wait(1300); await closeModal(); await wait(300);
  const out = [];
  // Dev Kit → 立即完成发射
  const dbg = qa('#menubar .menu').find((m) => /Debug|调试/.test(m.textContent));
  if (dbg) { dbg.querySelector('button').click(); await wait(220); }
  q('[data-act="mi"][data-id="devkit"]')?.click(); await wait(350);
  q('[data-act="dev"][data-id="launch"]')?.click();
  await wait(900);
  const dlg = q('#modal .dlg-body');
  out.push({ step: 'launch1', title: q('#dlg-t') ? q('#dlg-t').innerText : null, body: dlg ? dlg.innerText.replace(/\s+/g,' ').trim().slice(0,400) : null, btns: qa('#modal .dlg-btns button').map(b=>b.textContent.trim()) });
  await closeModal(); await wait(300);
  // Colony Reports
  const col = qa('#menubar .menu').find((m) => /Colony|殖民地/.test(m.textContent));
  if (col) { col.querySelector('button').click(); await wait(250); }
  const rep = q('[data-act="mi"][data-id="reports"]');
  if (rep) { rep.click(); await wait(700); }
  const d2 = q('#modal .dlg-body');
  out.push({ step: 'reports', title: q('#dlg-t') ? q('#dlg-t').innerText : null, body: d2 ? d2.innerText.replace(/\s+/g,' ').trim().slice(0,600) : null, btns: qa('#modal .dlg-btns button').map(b=>b.textContent.trim()) });
  return JSON.stringify(out);
})()