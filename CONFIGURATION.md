# 配置指南

本文档包含需要你手动配置的功能说明。

## 1. Giscus 评论系统配置

### 步骤 1：启用 GitHub Discussions

1. 访问你的 GitHub 仓库：https://github.com/kunyuanxu-star/blog
2. 点击 **Settings** 标签
3. 向下滚动找到 **Features** 部分
4. 勾选 **Discussions** 选项

### 步骤 2：获取 Giscus 配置参数

1. 访问 https://giscus.app/zh-CN
2. 在 **配置** 部分输入：
   - 仓库：`kunyuanxu-star/blog`
   - 页面 ↔️ discussion 映射：选择 `pathname`
   - Discussion 分类：选择你创建的分类（如 `General`）
3. 页面会自动生成配置，复制以下参数：
   - `data-repo-id`
   - `data-category-id`

### 步骤 3：更新配置

编辑 `.vitepress/theme/components/GiscusComment.vue`：

```typescript
const repo = 'kunyuanxu-star/blog'
const repoId = 'YOUR_REPO_ID' // 替换为实际值
const category = 'General' // 或你的分类名称
const categoryId = 'YOUR_CATEGORY_ID' // 替换为实际值
```

当前文件中已经预填了一些值，你需要从 giscus.app 获取正确的 ID。

---

## 2. Google Analytics 配置

### 步骤 1：创建 GA 账号

1. 访问 https://analytics.google.com/
2. 使用 Google 账号登录
3. 点击 **开始测量** 创建新的媒体资源

### 步骤 2：获取追踪 ID

1. 创建数据流（选择 **网站**）
2. 输入网站 URL：`https://kunyuanxu-star.github.io/blog/`
3. 创建后会得到一个追踪 ID，格式类似：`G-XXXXXXXXXX`

### 步骤 3：更新配置

编辑 `.vitepress/config.mts`，找到以下行并替换：

```typescript
// 将 G-XXXXXXXXXX 替换为你的真实 GA 追踪 ID
['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX' }],
['script', {}, `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');`] // 这里也要替换
```

---

## 3. 功能验证

配置完成后，运行以下命令测试：

```bash
# 开发模式
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

### 验证 Giscus
- 访问任意文章页面
- 滚动到底部，应该看到评论框
- 尝试登录 GitHub 并发表评论

### 验证 Google Analytics
- 部署到生产环境后
- 访问 GA 控制台的实时报告
- 查看是否能看到当前访客

---

## 4. Assembly 语法高亮

已自动配置完成，使用方式：

在 Markdown 文章中使用：

\`\`\`asm
; x86 Assembly
mov rax, 1
syscall
\`\`\`

或：

\`\`\`asm
# RISC-V Assembly
li a0, 1
ecall
\`\`\`

---

## 5. 其他配置项

### RSS Feed
✅ 已自动生成：`https://kunyuanxu-star.github.io/blog/feed.rss`

### 文章目录导航
✅ 自动启用，在文章页面右侧显示

### 代码复制按钮
✅ 自动启用，鼠标悬停在代码块上会显示复制按钮

### 代码行号
✅ 自动显示

---

## 需要帮助？

如果配置过程中遇到问题，可以：

1. 查看 [VitePress 官方文档](https://vitepress.dev/)
2. 查看 [Giscus 文档](https://giscus.app/zh-CN)
3. 查看 [Google Analytics 帮助中心](https://support.google.com/analytics/)
