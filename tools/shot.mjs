import { spawn } from 'node:child_process';
import { writeFile, mkdir, rm } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import { setTimeout as sleep } from 'node:timers/promises';

const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const url = process.argv[2];
const out = process.argv[3] || 'shot.png';
const clickSel = process.argv[4] || '';
const waitMs = Number(process.argv[5] || 3000);
const port = 9333 + Math.floor(Math.random() * 500);
const prof = new URL('./.prof' + port, import.meta.url).pathname.replace(/^\//, '');
await mkdir(prof, { recursive: true });

const child = spawn(EDGE, [
  '--headless=new', '--remote-debugging-port=' + port, '--user-data-dir=' + prof,
  '--window-size=1500,950', '--hide-scrollbars', '--no-first-run', '--no-default-browser-check',
  '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader',
  '--allow-file-access-from-files', 'about:blank',
], { stdio: 'ignore' });

let ws, id = 0, pend = new Map();
const logs = [];
const send = (method, params = {}) => new Promise((res, rej) => {
  const mid = ++id; pend.set(mid, { res, rej });
  ws.send(JSON.stringify({ id: mid, method, params }));
});

try {
  let target = null;
  for (let i = 0; i < 60 && !target; i++) {
    try {
      const r = await fetch('http://127.0.0.1:' + port + '/json/list');
      const list = await r.json();
      target = list.find(t => t.type === 'page');
    } catch (e) {}
    if (!target) await sleep(250);
  }
  if (!target) throw new Error('no devtools target');
  ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
  ws.onmessage = (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pend.has(msg.id)) { const p = pend.get(msg.id); pend.delete(msg.id); msg.error ? p.rej(new Error(JSON.stringify(msg.error))) : p.res(msg.result); }
    else if (msg.method === 'Runtime.consoleAPICalled') logs.push('[' + msg.params.type + '] ' + msg.params.args.map(a => a.value ?? a.description ?? '').join(' '));
    else if (msg.method === 'Runtime.exceptionThrown') logs.push('[exception] ' + (msg.params.exceptionDetails.exception?.description || msg.params.exceptionDetails.text));
  };
  await send('Page.enable'); await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 1500, height: 950, deviceScaleFactor: 1, mobile: false });
  const preArg = process.argv.find((a) => a.startsWith('--preload='));
  if (preArg) {
    const p = preArg.slice('--preload='.length);
    const src = p.startsWith('@') ? readFileSync(p.slice(1), 'utf8') : p;
    await send('Page.addScriptToEvaluateOnNewDocument', { source: src });
  }
  await send('Page.navigate', { url });
  await sleep(2500);
  if (clickSel) {
    const r = await send('Runtime.evaluate', { expression: "(()=>{const b=document.querySelector(" + JSON.stringify(clickSel) + ");if(!b)return 'no button';b.click();return 'clicked'})()", returnByValue: true });
    console.log('click:', r.result?.value);
  }
  await sleep(waitMs);
  const clipSel = process.argv.slice(2).find((a) => a.startsWith('#'));
  let clip = null;
  if (clipSel) {
    const rc = await send('Runtime.evaluate', { expression: "(()=>{const e=document.querySelector(" + JSON.stringify(clipSel) + ");if(!e)return null;const r=e.getBoundingClientRect();return {x:r.left,y:r.top,width:r.width,height:r.height};})()", returnByValue: true });
    const v = rc.result && rc.result.value;
    if (v && v.width > 4 && v.height > 4) clip = { x: Math.max(0, v.x - 8), y: Math.max(0, v.y - 8), width: v.width + 16, height: v.height + 16, scale: 2 };
  }
  const png = await send('Page.captureScreenshot', clip ? { format: 'png', clip } : { format: 'png' });
  await writeFile(out, Buffer.from(png.data, 'base64'));
  console.log('saved', out);
  console.log('--- console ---');
  console.log(logs.slice(0, 40).join('\n') || '(clean)');
  let exprArg = process.argv[6];
  if (exprArg && exprArg.startsWith('@')) exprArg = readFileSync(exprArg.slice(1), 'utf8');
  if (exprArg) {
    const ev = await send('Runtime.evaluate', { expression: exprArg, returnByValue: true, awaitPromise: true });
    const outArg = process.argv.find((a) => a.startsWith('--evalout='));
    if (outArg) {
      const p = outArg.slice('--evalout='.length);
      const v = ev.result?.value;
      await writeFile(p, typeof v === 'string' ? v : JSON.stringify(v), 'utf8');
      console.log('EVAL written to', p, 'len', typeof v === 'string' ? v.length : -1);
    } else {
      console.log('EVAL:', JSON.stringify(ev.result?.value ?? ev.exceptionDetails?.text ?? null).slice(0, 4000));
    }
    if (ev.exceptionDetails) console.log('EVAL_ERR:', (ev.exceptionDetails.exception && (ev.exceptionDetails.exception.description || ev.exceptionDetails.exception.value)) || ev.exceptionDetails.text);
  }
  const cjk = await send('Runtime.evaluate', { expression: "(()=>{const t=document.body.innerText;const c=(t.match(/[\\u4e00-\\u9fff]/g)||[]).length;return {cjkChars:c, total:t.length, sample:t.slice(0,240).replace(/\\n+/g,' | ')}})()", returnByValue: true });
  console.log('CJK check:', JSON.stringify(cjk.result?.value));
} finally {
  try { ws && ws.close(); } catch (e) {}
  child.kill();
  await sleep(300);
  await rm(prof, { recursive: true, force: true }).catch(() => {});
}
