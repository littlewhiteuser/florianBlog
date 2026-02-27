---
title: Git 工作流完全指南
date: 2026-01-10
tags: [Git, 工具, DevOps]
category: 工具
description: 详解 Git 常用工作流和实用技巧，让团队协作更高效。
---

# Git 工作流完全指南

Git 是每个开发者都需要掌握的工具。本文总结了常用的 Git 工作流和一些实用技巧。

<!-- more -->

## 常见工作流

### Git Flow

适合有明确版本发布计划的项目：

```
main ──────────────────────────────
  │                           ↑
  └── develop ────────────────┤
       │         ↑            │
       └── feature/xxx ───────┘
```

### GitHub Flow

适合持续部署的项目，更加简洁：

1. 从 `main` 创建功能分支
2. 提交代码并推送
3. 创建 Pull Request
4. 代码审查
5. 合并到 `main`

## 实用技巧

### 交互式 Rebase

```bash
# 整理最近 3 个提交
git rebase -i HEAD~3
```

### 暂存工作区

```bash
# 暂存当前改动
git stash

# 恢复暂存
git stash pop

# 查看暂存列表
git stash list
```

### Cherry Pick

```bash
# 将指定提交应用到当前分支
git cherry-pick abc123
```

### 查找问题提交

```bash
# 使用二分查找定位 bug 引入的提交
git bisect start
git bisect bad          # 当前版本有 bug
git bisect good v1.0    # v1.0 没有 bug
```

## 提交规范

推荐使用 Conventional Commits：

```
feat: 新增用户注册功能
fix: 修复登录页面样式问题
docs: 更新 API 文档
refactor: 重构权限校验逻辑
chore: 更新依赖版本
```

## 总结

选择合适的工作流，配合良好的提交规范，可以让团队协作事半功倍。
