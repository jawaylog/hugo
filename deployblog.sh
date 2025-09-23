#!/bin/bash
# 部署整个Hugo项目到GitHub脚本

set -e  # 错误时终止脚本

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}➤ 1. 清理旧构建文件...${NC}"
rm -rf public

echo -e "${GREEN}➤ 2. 使用Hera主题构建网站（本地测试用）...${NC}"
hugo -t oneblog --minify

echo -e "${GREEN}➤ 3. 初始化Git仓库（如果不存在）...${NC}"
if [ ! -d ".git" ]; then
    git init
fi

echo -e "${GREEN}➤ 4. 添加所有文件到暂存区...${NC}"
git add -A

echo -e "${GREEN}➤ 5. 提交更改...${NC}"
msg="自动部署: $(date '+%Y-%m-%d %H:%M:%S')"
if [ $# -eq 1 ]; then
  msg="$1"
fi
git commit -m "$msg" || echo -e "${YELLOW}⚠️ 没有更改可提交${NC}"

echo -e "${GREEN}➤ 6. 推送到GitHub仓库...${NC}"
git push -f git@github.com:jawaylog/jawaylog.github.io.git HEAD:master

echo -e "${GREEN}✅ 整个Hugo项目部署完成!${NC}"