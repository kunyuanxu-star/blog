import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import BlogHome from './components/BlogHome.vue'
import SeriesNav from './components/SeriesNav.vue'
import { onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'
import mediumZoom from 'medium-zoom'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'home-features-after': () => h(BlogHome),
      // 在文章内容后添加系列导航
      'doc-after': () => h(SeriesNav)
    })
  },
  setup() {
    const route = useRoute()
    const initZoom = () => {
      mediumZoom('.main img', {
        background: 'var(--vp-c-bg)'
      })
    }
    onMounted(() => {
      initZoom()
    })
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    )
  }
} satisfies Theme
