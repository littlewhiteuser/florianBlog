---
title: 使用 VitePress 搭建个人博客
date: 2026-02-26
tags: [VitePress, Vue, 博客]
category: 前端
description: 手把手教你使用 VitePress 搭建一个简约美观的个人博客，包含自定义主题、标签系统和归档功能。
sticky: 1
---

# 使用 VitePress 搭建个人博客

VitePress 是一款基于 Vite 和 Vue 3 的静态站点生成器，非常适合搭建技术博客。

<!-- more -->

## 为什么选择 VitePress？

- **极速**: 基于 Vite，开发体验丝滑
- **简洁**: Markdown 驱动，专注内容创作
- **灵活**: 完全可自定义的 Vue 组件主题
- **高性能**: 静态生成 + SPA 导航

## 快速开始

### 1. 初始化项目

```bash
npm init -y
npm install -D vitepress vue
```

### 2. 创建配置文件

```ts
// .vitepress/config.mts
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "My Blog",
  description: '个人技术博客',
  lang: 'zh-CN',
})
```

### 3. 自定义主题

VitePress 允许完全自定义主题，你可以基于默认主题进行扩展：

```ts
// .vitepress/theme/index.ts
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册自定义组件
  },
} satisfies Theme
```

## 博客功能实现

### 文章数据加载

利用 VitePress 的 `createContentLoader` API 可以轻松加载所有文章数据：

```ts
import { createContentLoader } from 'vitepress'

export default createContentLoader('blog/posts/*.md', {
  excerpt: true,
  transform(raw) {
    return raw
      .map(({ url, frontmatter, excerpt }) => ({
        title: frontmatter.title,
        url,
        date: frontmatter.date,
        tags: frontmatter.tags || [],
      }))
      .sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      )
  },
})
```

### 标签系统

通过在 frontmatter 中定义 `tags` 字段，配合自定义组件即可实现标签筛选功能。

### 归档页面

按年份分组显示所有文章，一目了然。

## 部署

推荐使用 GitHub Pages 或 Vercel 进行部署：

```bash
npm run build
```

构建产物在 `.vitepress/dist` 目录下，可直接部署到静态服务器。

## 总结

VitePress 是搭建个人博客的绝佳选择，简洁高效，开发体验极佳。

> 代码即文档，文档即博客。
