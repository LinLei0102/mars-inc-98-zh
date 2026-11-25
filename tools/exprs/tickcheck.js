(async () => {
  const q = (s) => document.querySelector(s);
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  await wait(1500);
  const snap = () => ({
    sol: q('#sb-sol') ? q('#sb-sol').innerText : null,
    state: q('#sb-state') ? q('#sb-state').innerText : null,
    outLen: q('#w-out') ? q('#w-out').innerText.length : 0,
    outTail: q('#w-out') ? q('#w-out').innerText.slice(-160) : '',
  });
  const a = snap();
  await wait(20000);
  const b = snap();
  return JSON.stringify({ a, b, grew: b.outLen - a.outLen });
})()