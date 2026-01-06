---
title: GitHub Actions 自动化部署实践
date: 2024-04-15
category: DevOps
tags: [GitHub, CI/CD, Automation]
---

# GitHub Actions 自动化部署实践

CI/CD 是现代软件开发不可或缺的一部分。本文介绍如何配置 GitHub Actions，实现代码提交后自动运行测试并部署到 GitHub Pages。

## 什么是 GitHub Actions？

GitHub Actions 是 GitHub 提供的持续集成和持续部署(CI/CD)平台，允许你自动化构建、测试和部署流程。

## 配置工作流

在项目根目录创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: .vitepress/dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## 关键配置说明

### 触发器

```yaml
on:
  push:
    branches: [main]
  workflow_dispatch:
```

- `push`: 当代码推送到 main 分支时触发
- `workflow_dispatch`: 允许手动触发工作流

### 权限设置

```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

这些权限确保工作流可以读取代码、写入 Pages 和生成身份令牌。

### 缓存依赖

```yaml
- name: Setup Node
  uses: actions/setup-node@v4
  with:
    node-version: 20
    cache: 'npm'
```

使用 npm 缓存可以显著加快构建速度。

## 仓库设置

在 GitHub 仓库中配置：

1. 进入 **Settings** → **Pages**
2. Source 选择 **GitHub Actions**
3. 保存设置

## 验证部署

提交代码后：

1. 进入 **Actions** 标签页
2. 查看工作流运行状态
3. 等待部署完成
4. 访问 `https://<username>.github.io/<repo>/`

## 常见问题

### 构建失败

检查日志中的错误信息：

```bash
# 本地测试构建
npm run build
```

### 权限错误

确保仓库 Settings → Actions → General 中启用了：
- ✅ Read and write permissions
- ✅ Allow GitHub Actions to create and approve pull requests

### 404 错误

检查 VitePress 配置中的 `base` 路径：

```ts
export default defineConfig({
  base: '/your-repo-name/',
  // ...
})
```

## 最佳实践

### 1. 本地预览

在推送前本地构建验证：

```bash
npm run build
npm run preview
```

### 2. 环境变量

使用 GitHub Secrets 存储敏感信息：

```yaml
env:
  API_KEY: ${{ secrets.API_KEY }}
```

### 3. 条件部署

仅在测试通过后部署：

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - run: npm test
  
  deploy:
    needs: test  # 依赖测试作业
    # ...
```

## 进阶配置

### 矩阵构建

在多个环境中测试：

```yaml
strategy:
  matrix:
    node-version: [18, 20, 22]

steps:
  - uses: actions/setup-node@v4
    with:
      node-version: ${{ matrix.node-version }}
```

### 定时任务

定期运行构建：

```yaml
on:
  schedule:
    - cron: '0 0 * * 0'  # 每周日午夜
```

## 总结

GitHub Actions 让部署变得简单而自动化：

- ✅ 推送代码即可自动部署
- ✅ 免费的 CI/CD 服务
- ✅ 与 GitHub 深度集成
- ✅ 丰富的 Actions 市场

现在你的博客每次提交都会自动部署了！🚀
