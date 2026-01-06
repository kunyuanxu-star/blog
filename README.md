# 我的个人博客

基于 Next.js + React + Tailwind CSS 构建的现代化个人博客网站，托管在 GitHub Pages。

## ✨ 特性

- 🎨 **现代化设计** - 极简主义风格，优雅的视觉体验
- 🌓 **深色模式** - 自动检测系统主题，支持手动切换
- 📱 **响应式设计** - 完美适配手机、平板和桌面端
- 🔍 **实时搜索** - 快速搜索文章内容
- 🏷️ **分类过滤** - 按分类筛选文章
- 📝 **Markdown 支持** - 完整的 Markdown/MDX 语法支持
- 🎯 **代码高亮** - 多语言代码语法高亮
- ⚡️ **极速加载** - Next.js 静态生成，性能优异
- 🚀 **自动部署** - GitHub Actions 自动化部署

## 🛠️ 技术栈

- **框架**: [Next.js 15](https://nextjs.org/) - React 全栈框架
- **样式**: [Tailwind CSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
- **图标**: [Lucide React](https://lucide.dev/) - 美观的 SVG 图标库
- **Markdown**: [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote) - MDX 渲染
- **语言**: TypeScript
- **托管**: GitHub Pages
- **CI/CD**: GitHub Actions

## 📁 项目结构

```
.
├── app/                      # Next.js App Router
│   ├── layout.tsx           # 根布局
│   ├── page.tsx             # 首页（博客列表）
│   ├── about/               # 关于页面
│   │   └── page.tsx
│   ├── blog/                # 博客文章
│   │   └── [slug]/         # 动态路由
│   │       └── page.tsx
│   └── globals.css          # 全局样式
├── components/               # React 组件
│   ├── Navigation.tsx       # 导航栏
│   ├── Sidebar.tsx          # 侧边栏
│   └── BlogCard.tsx         # 博客卡片
├── content/                  # Markdown 文章
│   └── *.md                 # 博客文章文件
├── lib/                      # 工具函数
│   └── blog.ts              # 博客数据处理
├── public/                   # 静态资源
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Actions 配置
├── next.config.js           # Next.js 配置
├── tailwind.config.ts       # Tailwind 配置
├── tsconfig.json            # TypeScript 配置
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

访问 http://localhost:3000 查看博客

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run start
```

## ✍️ 撰写博客

### 方式一：使用 Markdown 文件（推荐）

1. 在 `content/` 目录下创建新的 `.md` 或 `.mdx` 文件
2. 添加 frontmatter 元数据：

```markdown
---
title: "你的文章标题"
excerpt: "文章简介"
date: "2024-01-06"
readTime: "5 min"
category: "分类"
tags: ["标签1", "标签2"]
image: "封面图片URL"
---

# 文章标题

这里是文章内容...
```

3. 使用 Markdown 语法撰写内容
4. 文件名会作为文章的 URL slug

### 方式二：使用内置数据（快速测试）

编辑 `app/page.tsx` 中的 `BLOG_POSTS` 数组，添加新的文章对象。

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

编辑 `components/Sidebar.tsx` 中的 `PROFILE` 对象：

```typescript
const PROFILE = {
  name: "你的名字",
  bio: "你的简介",
  github: "https://github.com/你的用户名",
  // ...
};
```

### 修改技术栈标签

编辑 `components/Sidebar.tsx` 中的 `TECH_STACK` 数组。

### 自定义主题颜色

编辑 `app/globals.css` 修改 CSS 变量，或者编辑 `tailwind.config.ts` 调整 Tailwind 配置。

### 修改站点配置

编辑 `next.config.js`：

```javascript
const nextConfig = {
  output: 'export',
  basePath: '/blog', // 修改为你的仓库名
  // ...
}
```

编辑 `app/layout.tsx` 修改站点元数据：

```typescript
export const metadata: Metadata = {
  title: "你的博客标题",
  description: "你的博客描述",
};
```

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

- 自动检测系统主题偏好
- 支持手动切换
- 使用 `dark` class 实现
- 状态保存在组件 state 中

### 搜索功能

- 实时搜索文章标题和摘要
- 大小写不敏感
- 前端实现，无需后端

### 分类过滤

- 动态生成分类按钮
- 点击切换分类
- 支持 "All" 显示全部

### 响应式设计

- 移动端优先设计
- 使用 Tailwind 断点
- 侧边栏在移动端自动折叠
- 导航栏在移动端显示汉堡菜单

## 📝 开发建议

### 添加新功能

1. 在 `components/` 创建新组件
2. 在 `app/` 创建新页面
3. 在 `lib/` 添加工具函数

### 性能优化

- Next.js 自动进行代码分割
- 图片使用 CDN 链接
- 静态生成减少服务器压力

### SEO 优化

- 在 `app/layout.tsx` 配置 metadata
- 每个页面可以单独设置 metadata
- 使用语义化 HTML 标签

## 🐛 常见问题

### 1. 部署后 CSS 样式丢失

检查 `next.config.js` 中的 `basePath` 是否与仓库名一致。

### 2. 图片无法显示

- 确保使用完整的 URL（如 https://...）
- 或将图片放在 `public/` 目录
- GitHub Pages 可能有跨域限制，建议使用图床

### 3. 本地开发正常，部署后 404

- 检查路由路径是否正确
- 确认 `output: 'export'` 已配置
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
