(async () => {
  const q = (s) => document.querySelector(s), qa = (s) => [...document.querySelectorAll(s)];
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const target = window.__BP_TARGET;
  const closeAll = async () => {
    for (let i = 0; i < 14; i++) {
      const m = q('#modal');
      if (m && !m.hidden) { qa('#modal .dlg-btns button').forEach((b) => b.click()); q('#modal [data-x]')?.click(); await wait(180); }
      else return;
    }
  };
  await wait(1300);
  await closeAll();
  await wait(300);
  // 确保在 craft 页
  q('[data-act="tab"][data-id="craft"]')?.click();
  await wait(500);
  const tile = q('[data-act="bp"][data-id="' + target + '"]');
  const tileText = tile ? tile.innerText.replace(/\s+/g, ' ').trim() : null;
  if (tile) { tile.click(); await wait(450); }
  const btn = q('.bpd-build[data-id="' + target + '"]');
  const btnText = btn ? btn.innerText.trim() : null;
  const disabled = btn ? btn.disabled : null;
  if (btn && !btn.disabled) { btn.click(); await wait(1000); }
  const dlg = q('#modal .dlg-body');
  const res = {
    target,
    tileText,
    btnText,
    disabled,
    modalOpen: q('#modal') ? !q('#modal').hidden : false,
    title: q('#dlg-t') ? q('#dlg-t').innerText : null,
    body: dlg ? dlg.innerText.replace(/\s+/g, ' ').trim() : null,
    buttons: qa('#modal .dlg-btns button').map((b) => b.textContent.trim()),
  };
  await wait(500);
  return JSON.stringify(res);
})()