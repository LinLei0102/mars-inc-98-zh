#!/usr/bin/env bash
# 重新构建并把单文件中文版推到 gh-pages 分支（GitHub Pages 用）
# 用法: bash tools/publish-pages.sh
set -e
cd "$(dirname "$0")/.."

echo "== 构建单文件自包含中文版 =="
node build.mjs --zh --inline

echo "== 生成 gh-pages 提交 =="
BLOB=$(git hash-object -w dist/index.zh.standalone.html)
NOJ=$(printf "" | git hash-object -w --stdin)
TREE=$(printf "100644 blob %s\tindex.html\n100644 blob %s\t.nojekyll\n" "$BLOB" "$NOJ" | git mktree)
COMMIT=$(git commit-tree "$TREE" -m "pages: rebuild $(date '+%Y-%m-%d %H:%M')")
git branch -f gh-pages "$COMMIT"

echo "== 推送 gh-pages =="
git push -f origin gh-pages
echo "完成。Pages 已开启的话，约 1 分钟后生效。"
