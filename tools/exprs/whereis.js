(async () => {
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  await wait(1500);
  const targets = ["decoded genomes", "species living on Mars", "Life 100", "T3 / T3", "Uranium Cells"];
  const found = {};
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null);
  let n;
  while ((n = w.nextNode())) {
    const v = (n.nodeValue || "").trim();
    for (const t of targets) {
      if (v.includes(t)) {
        const p = n.parentNode;
        found[t] = found[t] || [];
        if (found[t].length < 2) found[t].push({ tag: p.nodeName, cls: p.className, id: p.id, parent: p.parentNode ? p.parentNode.className : null, raw: v.slice(0, 80) });
      }
    }
  }
  return JSON.stringify(found);
})()