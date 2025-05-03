#!/bin/bash
# 双仓库部署脚本：源码推送到hugo，静态文件推送到jawaylog.github.io

set -e  # 错误时终止脚本

# 仓库配置
SOURCE_REPO="git@github.com:jawaylog/hugo.git"  # Hugo源码仓库
PAGES_REPO="git@github.com:jawaylog/jawaylog.github.io.git"  # Pages仓库
DEPLOY_MSG="自动部署: $(date '+%Y-%m-%d %H:%M:%S')"
[ $# -eq 1 ] && DEPLOY_MSG="$1"

echo "➤ 1. 清理旧构建文件..."
rm -rf public

echo "➤ 2. 构建Hugo网站..."
hugo -t hera --minify --gc

echo "➤ 3. 推送静态文件到GitHub Pages..."
cd public || exit 1
git init
git checkout -b master  # 显式创建分支
git add -A
git commit -m "$DEPLOY_MSG"
git remote add origin "$PAGES_REPO" 2>/dev/null || git remote set-url origin "$PAGES_REPO"
git push -f origin master
cd ..

echo "➤ 4. 推送 Hugo 源码到 hugo 仓库..."

# 检查是否受保护分支
if git ls-remote --exit-code origin master | grep -q "refs/heads/master"; then
    echo "➤ 检测到受保护分支，创建新分支推送..."
    NEW_BRANCH="auto-deploy-$(date '+%Y%m%d')"
    git checkout -b $NEW_BRANCH
    git push origin $NEW_BRANCH
    echo "✅ 请到 GitHub 创建 Pull Request 合并分支 $NEW_BRANCH"
else
    git push origin master
fi

echo "✅ 部署完成！"