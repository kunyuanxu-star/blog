import { defineConfig } from 'vitepress'
import { createContentLoader } from 'vitepress'
import { Feed } from 'feed'
import path from 'path'
import { writeFileSync } from 'fs'

export default defineConfig({
  title: "Kunyuan Xu",
  description: "System Software Developer. Enthusiast of Rust & OS Kernels.",
  base: '/blog/',
  
  themeConfig: {
    nav: [
      { text: 'Blog', link: '/' },
      { text: 'About', link: '/about' }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/kunyuanxu-star/blog' }
    ],

    search: {
      provider: 'local'
    },

    // 自定义配置：个人信息
    userBio: {
      name: 'Kunyuan Xu',
      title: 'KX',
      description: 'System Software Developer. Enthusiast of Rust & OS Kernels.',
      github: 'https://github.com/kunyuanxu-star',
      techStack: ['Rust', 'C++', 'OS Kernel', 'React', 'Linux', 'Git']
    }
  },

  head: [
    ['link', { rel: 'icon', href: '/blog/favicon.ico' }],
    ['link', { rel: 'alternate', type: 'application/rss+xml', title: 'RSS Feed', href: '/blog/feed.rss' }],
    ['meta', { name: 'theme-color', content: '#6366f1' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Kunyuan Xu Blog' }],
  ],

  sitemap: {
    hostname: 'https://kunyuanxu-star.github.io/blog/'
  },

  lastUpdated: true,

  async buildEnd(siteConfig) {
    const hostname = 'https://kunyuanxu-star.github.io/blog'
    const feed = new Feed({
      title: "Kunyuan Xu's Blog",
      description: "System Software Developer. Enthusiast of Rust & OS Kernels.",
      id: hostname,
      link: hostname,
      language: "zh-CN",
      favicon: `${hostname}/favicon.ico`,
      copyright: "Copyright (c) 2024-present, Kunyuan Xu",
      author: {
        name: "Kunyuan Xu",
        link: "https://github.com/kunyuanxu-star"
      }
    })

    // 加载所有文章
    const posts = await createContentLoader('posts/*.md', {
      excerpt: true,
      render: true
    }).load()

    // 按日期排序
    posts.sort(
      (a, b) => +new Date(b.frontmatter.date as string) - +new Date(a.frontmatter.date as string)
    )

    // 添加文章到 RSS
    for (const { url, excerpt, frontmatter, html } of posts) {
      feed.addItem({
        title: frontmatter.title,
        id: `${hostname}${url}`,
        link: `${hostname}${url}`,
        description: excerpt,
        content: html,
        author: [
          {
            name: "Kunyuan Xu",
            link: "https://github.com/kunyuanxu-star"
          }
        ],
        date: frontmatter.date
      })
    }

    // 写入 RSS 文件
    writeFileSync(path.join(siteConfig.outDir, 'feed.rss'), feed.rss2())
    siteConfig.logger.info('RSS feed generated at feed.rss')
  }
})
