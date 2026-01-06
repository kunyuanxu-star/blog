<template>
  <div class="giscus-wrapper mt-12 pt-8 border-t border-gray-200 dark:border-slate-700">
    <Giscus
      :repo="repo"
      :repo-id="repoId"
      :category="category"
      :category-id="categoryId"
      :mapping="mapping"
      :strict="strict"
      :reactions-enabled="reactionsEnabled"
      :emit-metadata="emitMetadata"
      :input-position="inputPosition"
      :theme="theme"
      :lang="lang"
      :loading="loading"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import Giscus from '@giscus/vue'

const { isDark } = useData()

// Giscus 配置
// 注意：你需要先在 GitHub 仓库中启用 Discussions 功能
// 然后访问 https://giscus.app/zh-CN 获取这些配置信息
const repo = 'kunyuanxu-star/blog' // 你的 GitHub 仓库
const repoId = 'R_kgDONdiJ9g' // 从 giscus.app 获取
const category = 'General' // Discussions 分类名称
const categoryId = 'DIC_kwDONdiJ9s4ClqA1' // 从 giscus.app 获取
const mapping = 'pathname' // 页面 <-> discussion 映射关系
const strict = '0'
const reactionsEnabled = '1'
const emitMetadata = '0'
const inputPosition = 'top' // 'top' 或 'bottom'
const lang = 'zh-CN'
const loading = 'lazy'

// 根据深色模式切换主题
const theme = computed(() => isDark.value ? 'dark' : 'light')
</script>

<style scoped>
.giscus-wrapper {
  max-width: 100%;
}
</style>
