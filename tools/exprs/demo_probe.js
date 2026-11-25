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
  const dbg = qa('#menubar .menu').find((m) => /Debug|调试/.test(m.textContent));
  if (dbg) { dbg.querySelector('button').click(); await wait(220); }
  q('[data-act="mi"][data-id="devkit"]')?.click(); await wait(350);
  q('[data-act="dev"][data-id="stage"]')?.click();
  await wait(900);
  const d = q('#modal .dlg-body');
  out.push({ step:'demo-end', title: q('#dlg-t') ? q('#dlg-t').innerText : null, body: d ? d.innerText.replace(/\s+/g,' ').trim().slice(0,400) : null, btns: qa('#modal .dlg-btns button').map(b=>b.textContent.trim()) });
  return JSON.stringify(out);
})()