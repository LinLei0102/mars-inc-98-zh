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
  const out0 = q('#w-out') ? q('#w-out').innerText : '';
  await wait(14000);
  const out1 = q('#w-out') ? q('#w-out').innerText : '';
  return JSON.stringify({ before: out0.slice(-300), after: out1.slice(-3000) });
})()