# 我的个人博客

基于 VitePress + Vue 3 + Tailwind CSS 构建的现代化个人博客网站，托管在 GitHub Pages。

## ✨ 特性

- 🎨 **现代化设计** - 极简主义风格，优雅的视觉体验
- 🌓 **深色模式** - VitePress 内置深色模式支持
- 📱 **响应式设计** - 完美适配手机、平板和桌面端
- 🔍 **本地搜索** - VitePress 内置本地搜索功能
- 🏷️ **分类过滤** - 按分类筛选文章
- 📝 **Markdown 支持** - 完整的 Markdown 语法支持
- 🎯 **代码高亮** - 多语言代码语法高亮
- ⚡️ **极速加载** - Vite 驱动，性能优异
- 🚀 **自动部署** - GitHub Actions 自动化部署

## 🛠️ 技术栈

- **框架**: [VitePress 1.x](https://vitepress.dev/) - Vue 驱动的静态站点生成器
- **UI**: [Vue 3](https://vuejs.org/) - 渐进式 JavaScript 框架
- **样式**: [Tailwind CSS](https://tailwindcss.com/) - 通过 CDN 引入
- **构建**: [Vite](https://vitejs.dev/) - 下一代前端构建工具
- **语言**: TypeScript
- **托管**: GitHub Pages
- **CI/CD**: GitHub Actions

## 📁 项目结构

```
.
├── .vitepress/               # VitePress 配置
│   ├── config.mts           # VitePress 配置文件
│   └── theme/               # 自定义主题
│       ├── index.ts         # 主题入口
│       ├── style.css        # 自定义样式
│       └── components/      # Vue 组件
│           └── BlogHome.vue # 博客首页组件
├── posts/                    # Markdown 文章
│   ├── rust-ownership.md
│   ├── os-kernel-from-scratch.md
│   └── *.md
├── index.md                  # 首页
├── about.md                  # 关于页面
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Actions 配置
└── package.json             # 项目依赖
```

## 🚀 快速开始

### 环境要求

- Node.js 18.17 或更高版本
- npm 或 yarn 或 pnpm

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

博客将运行在本地，默认端口 5173

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## ✍️ 撰写博客

在 `posts/` 目录下创建新的 `.md` 文件，添加 frontmatter：

```markdown
---
title: 你的文章标题
date: 2024-01-06
category: 分类
tags: [标签1, 标签2]
---

# 文章标题

这里是文章内容...
```

文件名会作为文章的 URL，例如 `rust-ownership.md` → `/posts/rust-ownership`

### Markdown 功能支持

- ✅ 标题 (H1-H6)
- ✅ 段落和换行
- ✅ **粗体** 和 *斜体*
- ✅ 代码块和语法高亮
- ✅ 引用
- ✅ 列表（有序/无序）
- ✅ 链接和图片
- ✅ 表格
- ✅ 任务列表

## 🎨 自定义配置

### 修改个人信息

编辑 `.vitepress/theme/components/BlogHome.vue` 中的个人信息。

### 修改站点配置

编辑 `.vitepress/config.mts`：

```typescript
export default defineConfig({
  title: "你的博客标题",
  description: "你的博客描述",
  base: '/blog/', // 修改为你的仓库名
})
```

### 修改文章数据

编辑 `.vitepress/theme/components/BlogHome.vue` 中的 `blogPosts` 数组，添加你的文章信息。

## 🌐 部署到 GitHub Pages

### 首次部署设置

1. 确保代码已推送到 GitHub 仓库
2. 进入 GitHub 仓库的 **Settings** > **Pages**
3. 在 **Source** 下选择 **GitHub Actions**
4. 推送代码到 `main` 分支会自动触发部署
5. 部署完成后，访问 `https://<你的用户名>.github.io/<仓库名>/`

### 自动部署

每次推送到 `main` 分支时，GitHub Actions 会自动：

1. 安装依赖
2. 构建项目
3. 部署到 GitHub Pages

你可以在 **Actions** 标签页查看部署状态。

## 🎯 核心功能说明

### 深色模式

- VitePress 内置深色模式
- 点击导航栏图标切换
- 自动保存用户偏好

### 搜索功能

- VitePress 内置本地搜索
- 支持全文搜索
- 快捷键：`Ctrl/Cmd + K`

### 自定义首页

- 使用 Vue 3 Composition API
- 响应式数据绑定
- 实时搜索和过滤

## 📝 开发建议

### 添加新页面

直接创建 `.md` 文件即可，VitePress 会自动生成路由。

### 添加新组件

在 `.vitepress/theme/components/` 目录创建 Vue 组件。

### 性能优化

- VitePress 自动进行代码分割
- 使用 Vite 的快速热更新
- 静态生成，SEO 友好

## 🐛 常见问题

### 1. 部署后样式异常

检查 `.vitepress/config.mts` 中的 `base` 是否与仓库名一致。

### 2. 构建失败

- 检查 Markdown 文件语法
- 查看是否有死链接
- 运行 `npm run build` 查看详细错误

### 3. 本地开发正常，部署后 404

- 确认 `base` 路径配置正确
- 查看 GitHub Actions 构建日志

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📧 联系方式

- GitHub: [@kunyuanxu-star](https://github.com/kunyuanxu-star)
- Email: contact@example.com

---

⭐️ 如果觉得这个项目有帮助，欢迎 Star！
