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
  await wait(1400); await closeModal(); await wait(300);
  await wait(8000);   // 让状态机跑起来
  const grab = () => {
    const o = {};
    for (const id of ['sb-state','hud-vis','w-alerts','w-fc','w-colony','w-goals','hint','sb-sol']) {
      const e = q('#' + id);
      if (e) o[id] = e.innerText.replace(/\s+/g, ' ').trim().slice(0, 300);
    }
    return o;
  };
  const out = { panels: {} };
  for (const t of ['craft','power','mine','terra','hydro','bio','launch']) {
    const b = q('[data-act="tab"][data-id="' + t + '"]');
    if (b) { b.click(); await wait(650); }
    const pane = q('#pane-' + t);
    out.panels[t] = pane ? pane.innerText.replace(/\s+/g, ' ').trim().slice(0, 1200) : '';
  }
  out.hud = grab();
  out.log = q('#w-out') ? q('#w-out').innerText.replace(/\s+/g, ' ').slice(-1500) : '';
  return JSON.stringify(out);
})()