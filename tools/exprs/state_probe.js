(async () => {
  const q = (s) => document.querySelector(s), qa = (s) => [...document.querySelectorAll(s)];
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  await wait(1400);
  for (const b of qa('#modal .dlg-btns button')) b.click();
  q('#modal [data-x]')?.click();
  await wait(500);
  const stage = q('#hud-stage') ? q('#hud-stage').innerText : (qa('.w-goals, #w-goals').length ? 'goals?' : 'none');
  const tiles = qa('.tool').map((b) => b.textContent.trim()).join('/');
  const tabMine = q('[data-act="tab"][data-id="mine"]') ? 'mineTab=yes' : 'mineTab=no';
  return JSON.stringify({ stage: stage, tiles: tiles.slice(0, 80), tabMine: tabMine, body: document.body.innerText.replace(/\s+/g,' ').slice(0, 200) });
})()