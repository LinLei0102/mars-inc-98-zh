import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

// 把 template.html + src/style.css + src/game.js 重新拼成单文件 index.html
//
//   node build.mjs                  -> dist/index.html                （three.js 指向 ../vendor/）
//   node build.mjs --zh             -> dist/index.zh.html             （挂上中文层，同样指向 ../）
//   node build.mjs --cdn            -> three.js 走 cdnjs（与线上发布包一致）
//   node build.mjs --zh --inline    -> dist/index.zh.standalone.html  （three.js + 中文层全部内联，
//                                      单文件即可托管到 GitHub Pages / itch.io）
const root = dirname(fileURLToPath(import.meta.url));
const CDN = process.argv.includes('--cdn');
const INLINE = process.argv.includes('--inline');
const ZH = process.argv.includes('--zh');

const THREE_CDN_TAG = '<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>';
const inlineScript = (src) => '<script>\n' + src.replace(/<\/script/gi, '<\\/script') + '\n</script>';

const [tpl, css, js] = await Promise.all([
  readFile(join(root, 'template.html'), 'utf8'),
  readFile(join(root, 'src/style.css'), 'utf8'),
  readFile(join(root, 'src/game.js'), 'utf8'),
]);

let out = tpl
  .replace('/*__CSS__*/', () => css)
  .replace('//__JS__', () => js.replace(/<\/script/gi, '<\\/script'));

// 1) three.js：cdn / 本地引用 / 内联，三选一
let threeBlock;
if (CDN) threeBlock = THREE_CDN_TAG;
else if (INLINE) threeBlock = inlineScript(await readFile(join(root, 'vendor/three.min.js'), 'utf8'));
else threeBlock = '<script src="../vendor/three.min.js"></script>';

// 2) 中文层：紧跟在 three.js 之后（游戏脚本之前），保证首帧就能翻译
let zhBlock = '';
if (ZH) zhBlock = INLINE
  ? '\n' + inlineScript(await readFile(join(root, 'i18n/zh-CN.js'), 'utf8'))
  : '\n<script src="../i18n/zh-CN.js"></script>';

out = out.replace(THREE_CDN_TAG, () => threeBlock + zhBlock);

// 3) 中文包把 <html lang> 一并改掉
if (ZH) out = out.replace('<html lang="en">', '<html lang="zh-CN">');

// 4) itch.io 运行时脚本在本地没有意义，去掉
out = out.replace(/<script[^>]*src="https:\/\/static\.itch\.io\/htmlgame\.js"[^>]*>\s*<\/script>/g, '');

await mkdir(join(root, 'dist'), { recursive: true });
const name = ZH
  ? (INLINE ? 'index.zh.standalone.html' : 'index.zh.html')
  : (INLINE ? 'index.standalone.html' : 'index.html');
await writeFile(join(root, 'dist', name), out, 'utf8');
console.log(
  'built', 'dist/' + name, out.length, 'bytes',
  CDN ? '(cdn three)' : INLINE ? '(inlined three + i18n)' : '(local three)',
  ZH ? '[zh-CN]' : '[en]'
);
