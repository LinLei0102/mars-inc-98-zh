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
  const openDevkit = async () => {
    const dbg = qa('#menubar .menu').find((m) => /Debug|调试/.test(m.textContent));
    if (dbg) { dbg.querySelector('button').click(); await wait(200); }
    q('[data-act="mi"][data-id="devkit"]')?.click();
    await wait(350);
  };
  await wait(1300);
  await closeModal();
  await wait(300);
  const seen = [];
  for (let step = 0; step < 12; step++) {
    await openDevkit();
    const b = q('[data-act="dev"][data-id="stage"]');
    if (!b) { seen.push({ step, err: 'no stage button' }); break; }
    b.click();
    await wait(600);
    const dlg = q('#modal .dlg-body');
    if (dlg && q('#modal') && !q('#modal').hidden) {
      seen.push({
        step,
        title: q('#dlg-t') ? q('#dlg-t').innerText : null,
        body: dlg.innerText.replace(/\s+/g, ' ').trim().slice(0, 300),
        btns: qa('#modal .dlg-btns button').map((x) => x.textContent.trim()),
      });
    } else seen.push({ step, title: null });
    await closeModal();
    await wait(250);
  }
  return JSON.stringify(seen);
})()