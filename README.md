# 我的个人博客

基于 VitePress 构建的现代化个人博客网站，托管在 GitHub Pages。

## 特性

- ✨ 现代化的设计和用户体验
- 📝 完整的 Markdown 支持
- 🎨 明暗主题切换
- 🔍 内置全文搜索
- 📱 响应式设计，移动端友好
- ⚡️ 基于 Vite 的快速构建
- 🚀 自动化部署到 GitHub Pages

## 技术栈

- **框架**: [VitePress](https://vitepress.dev/) - 基于 Vue 3 和 Vite 的静态站点生成器
- **语言**: Markdown + TypeScript
- **托管**: GitHub Pages
- **CI/CD**: GitHub Actions

## 本地开发

### 环境要求

- Node.js 18+ 
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run docs:dev
```

访问 http://localhost:5173 查看博客

### 构建生产版本

```bash
npm run docs:build
```

### 预览生产版本

```bash
npm run docs:preview
```

## 撰写博客

1. 在 `posts/` 目录下创建新的 `.md` 文件
2. 使用 Markdown 语法撰写内容
3. 在 `.vitepress/config.mts` 中更新侧边栏配置（可选）
4. 提交并推送到 GitHub，自动触发部署

### Markdown 示例

```markdown
# 文章标题

这是正文内容。

## 二级标题

- 列表项 1
- 列表项 2

\`\`\`javascript
const greeting = 'Hello, World!';
console.log(greeting);
\`\`\`
```

## 部署

博客配置了 GitHub Actions 自动部署，当推送到 `main` 分支时会自动构建并部署到 GitHub Pages。

### 首次部署设置

1. 在 GitHub 仓库中，进入 **Settings** > **Pages**
2. 在 **Source** 下选择 **GitHub Actions**
3. 推送代码到 `main` 分支，自动触发部署
4. 部署完成后，访问 `https://<你的用户名>.github.io/blog/`

## 配置说明

主要配置文件：

- `.vitepress/config.mts` - VitePress 配置文件
- `.github/workflows/deploy.yml` - GitHub Actions 部署配置
- `package.json` - 项目依赖和脚本

### 自定义配置

编辑 `.vitepress/config.mts` 可以修改：

- 站点标题和描述
- 导航栏和侧边栏
- 主题颜色和样式
- 社交链接
- 搜索功能

## 目录结构

```
.
├── .github/
│   └── workflows/
│       └── deploy.yml        # GitHub Actions 部署配置
├── .vitepress/
│   ├── config.mts            # VitePress 配置
│   └── theme/                # 自定义主题（可选）
├── posts/                    # 博客文章目录
│   ├── index.md             # 文章列表页
│   ├── getting-started.md   # 示例文章
│   └── my-first-post.md     # 示例文章
├── index.md                  # 首页
├── about.md                  # 关于页面
├── package.json              # 项目配置
└── README.md                 # 本文件
```

## 许可证

MIT License

## 联系方式

- GitHub: [@kunyuanxu-star](https://github.com/kunyuanxu-star)

---

⭐️ 如果觉得这个项目有帮助，欢迎 Star！
