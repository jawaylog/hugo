#!/bin/bash
# 部署到 GitHub Pages 脚本

# 错误时终止脚本
set -e

echo "➤ 1. 清理旧构建文件..."
rm -rf public

echo "➤ 2. 使用Hera主题构建网站..."
hugo -t oneblog --minify

 echo "➤ 3. 进入public目录..."
 cd public

echo "➤ 4. 初始化Git仓库..."
git init

echo "➤ 5. 添加所有文件到暂存区..."
git add -A

echo "➤ 6. 提交更改..."
msg="自动部署: $(date '+%Y-%m-%d %H:%M:%S')"
if [ $# -eq 1 ]; then
  msg="$1"
fi
git commit -m "$msg"

echo "➤ 7. 推送到GitHub Pages..."
# 注意：GitHub Pages现在默认使用main分支
git push -f git@github.com:jawaylog/jawaylog.github.io.git HEAD:master

echo "➤ 8. 部署完成!"
cd ..