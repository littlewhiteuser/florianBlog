---
title: Docker 入门与实战指南
date: 2026-01-28
tags: [Docker, DevOps, 容器]
category: DevOps
sticky: 3
description: 从零开始学习 Docker，掌握容器化技术的核心概念和常用命令。
---

# Docker 入门与实战指南

Docker 是现代开发中必不可少的工具，它让应用部署变得简单而可靠。

<!-- more -->

## 核心概念

| 概念 | 说明 |
|------|------|
| **镜像 (Image)** | 只读模板，包含运行应用的所有依赖 |
| **容器 (Container)** | 镜像的运行实例 |
| **Dockerfile** | 构建镜像的指令文件 |
| **Docker Compose** | 多容器编排工具 |

## 常用命令

### 镜像操作

```bash
# 拉取镜像
docker pull nginx:latest

# 构建镜像
docker build -t my-app:v1 .

# 查看镜像列表
docker images
```

### 容器操作

```bash
# 运行容器
docker run -d -p 8080:80 --name web nginx

# 查看运行中的容器
docker ps

# 停止容器
docker stop web

# 查看日志
docker logs -f web
```

## Dockerfile 最佳实践

```dockerfile
# 使用多阶段构建
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# 生产镜像
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Docker Compose 示例

```yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - db

  db:
    image: postgres:15
    volumes:
      - db_data:/var/lib/postgresql/data
    environment:
      POSTGRES_PASSWORD: secret

volumes:
  db_data:
```

## 总结

Docker 简化了开发、测试和部署流程。掌握容器化技术是现代开发者的必备技能。
