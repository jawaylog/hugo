---
title: "{{ replace .Name "-" " " | title }}"
layout: memo       # 关键：强制指定模板
type: memo         # 类型标识
categories: [memo] # 自动归类到memo
date: {{ .Date }}
lastmod: {{ now.Format "2006-01-02" }}
image: "https://img.xieha.cn/i/2024/12/09/6755eef805c87.jpg"
---