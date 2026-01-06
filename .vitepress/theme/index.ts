import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import BlogHome from './components/BlogHome.vue'
import GiscusComment from './components/GiscusComment.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'home-features-after': () => h(BlogHome),
      // 在文章内容后添加评论
      'doc-after': () => h(GiscusComment)
    })
  }
} satisfies Theme
