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
    },

    // 自定义配置：个人信息
    userBio: {
      name: 'Kunyuan Xu',
      title: 'KX',
      description: 'System Software Developer. Enthusiast of Rust & OS Kernels.',
      avatar: '/avatar.png',
      github: 'https://github.com/kunyuanxu-star',
      techStack: ['Rust', 'C++', 'OS Kernel', 'React', 'Linux', 'Git']
    }
  },

  head: [
    ['link', { rel: 'icon', href: '/blog/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#6366f1' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Kunyuan Xu Blog' }],
  ],

  sitemap: {
    hostname: 'https://kunyuanxu-star.github.io/blog/'
  },

  lastUpdated: true,
})
