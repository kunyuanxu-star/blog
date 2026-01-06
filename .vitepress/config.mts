import { defineConfig } from 'vitepress'

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
    }
  },

  head: [
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@tailwindcss/typography@0.5.10/dist/typography.min.css' }],
    ['script', { src: 'https://cdn.tailwindcss.com' }]
  ]
})
