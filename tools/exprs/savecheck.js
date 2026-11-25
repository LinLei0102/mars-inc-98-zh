(async () => {
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  await wait(1500);
  const raw = localStorage.getItem("mg98-save-v4");
  const ui = localStorage.getItem("mg98-ui");
  let parsed = null, err = null;
  try { parsed = JSON.parse(raw); } catch (e) { err = e.message; }
  return JSON.stringify({
    rawLen: raw ? raw.length : 0, ui, err,
    stage: parsed && parsed.stage, speed: parsed && parsed.speed, storm: parsed && parsed.storm,
  });
})()