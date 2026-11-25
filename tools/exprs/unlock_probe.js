(async () => {
  const q = (s) => document.querySelector(s), qa = (s) => [...document.querySelectorAll(s)];
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  await wait(1300);
  for (let i = 0; i < 12 && q('#modal') && !q('#modal').hidden; i++) { qa('#modal .dlg-btns button').forEach((b) => b.click()); q('#modal [data-x]')?.click(); await wait(200); }
  await wait(300);
  q('[data-act="tab"][data-id="craft"]')?.click(); await wait(500);
  const tile = q('[data-act="bp"][data-id="drill"]');
  if (tile) { tile.click(); await wait(400); }
  const btn = q('.bpd-build[data-id="drill"]');
  const btnText = btn ? btn.innerText.trim() : null;
  if (btn && !btn.disabled) { btn.click(); await wait(900); }
  const dlg = q('#modal .dlg-body');
  const ub = q('#modal .unlockbox');
  await wait(600);
  return JSON.stringify({
    btnText,
    modalHidden: q('#modal') ? q('#modal').hidden : 'none',
    title: q('#dlg-t') ? q('#dlg-t').innerText : null,
    body: dlg ? dlg.innerText.replace(/\s+/g, ' ').trim() : null,
    box: ub ? ub.innerText.replace(/\s+/g, ' ').trim() : null,
    rows: ub ? [...ub.querySelectorAll('.ub-r')].map((r) => r.innerText.replace(/\s+/g, ' ').trim()) : null,
    head: ub ? (ub.querySelector('.ub-h') || {}).innerText : null
  });
})()