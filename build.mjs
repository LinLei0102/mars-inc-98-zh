import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

// 把 template.html + src/style.css + src/game.js 重新拼成单文件 index.html
// 用法: node build.mjs             -> dist/index.html (three.js 指向本地 ../vendor/three.min.js)
//       node build.mjs --cdn       -> dist/index.html (three.js 走 cdnjs，与原发布包一致)
const root = dirname(fileURLToPath(import.meta.url));
const CDN = process.argv.includes('--cdn');

const [tpl, css, js] = await Promise.all([
  readFile(join(root, 'template.html'), 'utf8'),
  readFile(join(root, 'src/style.css'), 'utf8'),
  readFile(join(root, 'src/game.js'), 'utf8'),
]);

let out = tpl
  .replace('/*__CSS__*/', () => css)
  .replace('//__JS__', () => js.replace(/<\/script/gi, '<\\/script'));

if (!CDN) {
  out = out.replace(
    '<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>',
    '<script src="../vendor/three.min.js"></script>'
  );
}
// itch.io 运行时脚本在本地没有意义，去掉
out = out.replace(/<script[^>]*src="https:\/\/static\.itch\.io\/htmlgame\.js"[^>]*>\s*<\/script>/g, '');

// --zh 时把中文翻译层挂进去（在游戏脚本之前执行，可捕获首帧）
if (process.argv.includes('--zh')) {
  out = out.replace(
    '<script src="../vendor/three.min.js"></script>',
    '<script src="../vendor/three.min.js"></script>\n<script src="../i18n/zh-CN.js"></script>'
  );
}

const zh = process.argv.includes('--zh');
await mkdir(join(root, 'dist'), { recursive: true });
const target = join(root, zh ? 'dist/index.zh.html' : 'dist/index.html');
await writeFile(target, out, 'utf8');
console.log('built', zh ? 'dist/index.zh.html' : 'dist/index.html', out.length, 'bytes', CDN ? '(cdn three)' : '(local three)', zh ? '[zh-CN]' : '[en]');
