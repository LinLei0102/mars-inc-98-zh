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
  q('[data-act="tab"][data-id="terra"]')?.click(); await wait(700);
  const btn = q('[data-act="seed"]');
  const btnText = btn ? btn.innerText.trim() : null;
  if (btn) { btn.click(); await wait(900); }
  const d = q('#modal .dlg-body');
  const res = {
    btnText,
    title: q('#dlg-t') ? q('#dlg-t').innerText : null,
    body: d ? d.innerText.replace(/\s+/g,' ').trim() : null,
    btns: qa('#modal .dlg-btns button').map(b => b.textContent.trim()),
    status: q('#sb-state') ? q('#sb-state').innerText : null,
  };
  return JSON.stringify(res);
})()