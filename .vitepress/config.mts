import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "我的个人博客",
  description: "Personal blogs and random thoughts",
  base: '/blog/', // 如果你的仓库名是 blog，这里填 /blog/
  
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '博客', link: '/posts/' },
      { text: '关于', link: '/about' }
    ],

    sidebar: {
      '/posts/': [
        {
          text: '博客文章',
          items: [
            { text: '开始使用', link: '/posts/getting-started' },
            { text: '我的第一篇博客', link: '/posts/my-first-post' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/kunyuanxu-star/blog' }
    ],

    footer: {
      message: '基于 VitePress 构建',
      copyright: 'Copyright © 2026-present'
    },

    // 搜索功能
    search: {
      provider: 'local'
    },

    // 编辑链接
    editLink: {
      pattern: 'https://github.com/kunyuanxu-star/blog/edit/main/:path',
      text: '在 GitHub 上编辑此页'
    },

    // 最后更新时间
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    }
  },

  // Markdown 配置
  markdown: {
    lineNumbers: true, // 代码块显示行号
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    }
  }
})
