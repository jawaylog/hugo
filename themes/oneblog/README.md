# OneBlog Hugo 主题

基于Typecho OneBlog主题转换的Hugo版本，简约文艺的文字博客主题。

## 特性

- 响应式设计，适配移动端和PC端
- 夜间模式切换
- 文章列表和详情页美观布局
- 图片灯箱效果（Fancybox）
- 代码高亮（Highlight.js）
- 支持Disqus评论系统
- 自定义主题颜色和样式

## 安装

1. 在Hugo站点的`themes`目录下克隆本主题：
   ```bash
   git clone https://github.com/yourusername/hugo-theme-oneblog.git oneblog
   ```

2. 在`config.toml`中设置主题：
   ```toml
   theme = "oneblog"
   ```

## 配置

完整配置示例请参考`exampleSite/config.toml`，主要配置项包括：

- `[params]`：主题参数（颜色、logo、社交链接等）
- `[[params.banner]]`：首页轮播图配置
- `[[menu.main]]`：顶部菜单配置
- `disqusShortname`：Disqus评论系统

## 使用

### 内容格式

文章头部Front Matter示例：
```yaml
---
title: "文章标题"
date: 2024-01-01
categories: ["技术"]
tags: ["Hugo", "博客"]
thumbnail: "img/post-thumb.jpg"  # 文章缩略图
author: "作者名"
---
```

### 自定义页面

- 归档页：创建`content/archives/_index.md`
- 关于页：创建`content/about/_index.md`

## 版本兼容性

支持Hugo版本：0.142-0.144

## 致谢

原Typecho主题作者：彼岸临窗  
Hugo转换：扣子空间