<template>
  <div v-if="seriesInfo" class="series-nav my-8 p-6 rounded-lg border-2 border-indigo-200 dark:border-indigo-800 bg-indigo-50/50 dark:bg-indigo-950/30">
    <div class="flex items-center gap-2 mb-4">
      <svg class="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
      </svg>
      <h4 class="text-lg font-bold text-indigo-900 dark:text-indigo-100">
        系列：{{ seriesInfo.name }}
      </h4>
    </div>
    
    <nav class="space-y-2">
      <a
        v-for="post in seriesArticles"
        :key="post.url"
        :href="post.url"
        :class="[
          'block px-4 py-2 rounded-md transition-all',
          isCurrentArticle(post.url)
            ? 'bg-indigo-600 text-white font-semibold shadow-md'
            : 'hover:bg-indigo-100 dark:hover:bg-indigo-900/50 text-gray-700 dark:text-slate-300'
        ]"
      >
        <span class="font-mono text-sm mr-2">Part {{ post.series?.order }}</span>
        {{ post.title }}
      </a>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'
import { data as posts } from '../posts.data.mts'
import type { Post } from '../posts.data.mts'

const route = useRoute()
const { frontmatter } = useData()

// 当前文章的系列信息
const seriesInfo = computed(() => frontmatter.value.series)

// 同系列的所有文章，按 order 排序
const seriesArticles = computed<Post[]>(() => {
  if (!seriesInfo.value) return []
  
  const seriesName = typeof seriesInfo.value === 'string' 
    ? seriesInfo.value 
    : seriesInfo.value.name
  
  return posts
    .filter(post => {
      if (!post.series) return false
      return post.series.name === seriesName
    })
    .sort((a, b) => (a.series?.order || 0) - (b.series?.order || 0))
})

// 判断是否为当前文章
const isCurrentArticle = (url: string) => {
  return route.path === url
}
</script>

<style scoped>
.series-nav {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
