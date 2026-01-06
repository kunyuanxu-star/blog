<template>
  <div class="blog-home max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <!-- Sidebar -->
      <aside class="lg:col-span-3 lg:sticky lg:top-24 h-fit">
        <div class="p-6 rounded-2xl border bg-white dark:bg-slate-800 dark:border-slate-700 shadow-sm">
          <div class="flex flex-col items-center text-center">
            <div class="w-32 h-32 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-1 mb-4">
              <div class="w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-white dark:bg-slate-900">
                <span class="text-4xl font-bold text-indigo-500">KX</span>
              </div>
            </div>
            <h2 class="text-2xl font-bold mb-2">Kunyuan Xu</h2>
            <p class="text-sm mb-6 text-gray-500 dark:text-slate-400">
              System Software Developer. Enthusiast of Rust & OS Kernels.
            </p>
            
            <div class="flex space-x-4 mb-6">
              <a href="https://github.com/kunyuanxu-star" target="_blank" rel="noopener noreferrer" 
                 class="p-2 rounded-full transition-all hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-500 dark:text-slate-400 hover:text-black dark:hover:text-white">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
            </div>

            <button class="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-medium">
              Follow
            </button>
          </div>
        </div>
        
        <div class="mt-6">
          <h3 class="text-sm font-semibold uppercase tracking-wider mb-4 opacity-70">Tech Stack</h3>
          <div class="flex flex-wrap gap-2">
            <span v-for="skill in techStack" :key="skill" 
                  class="text-xs px-3 py-1 rounded-full border bg-white dark:bg-slate-800 dark:border-slate-700 text-gray-600 dark:text-slate-300">
              {{ skill }}
            </span>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="lg:col-span-9">
        <div class="mb-10">
          <h1 class="text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
            Writing & Thinking
          </h1>
          <p class="text-lg text-gray-600 dark:text-slate-400">
            Sharing my journey in system programming and open source.
          </p>
        </div>

        <!-- Search and Filter -->
        <div class="flex flex-col sm:flex-row gap-4 mb-8">
          <div class="relative flex-grow">
            <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input 
              v-model="searchTerm"
              type="text"
              placeholder="Search articles..."
              class="w-full pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all bg-white dark:bg-slate-800 dark:border-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500"
            />
          </div>
          <div class="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
            <button
              v-for="cat in categories"
              :key="cat"
              @click="selectedCategory = cat"
              :class="[
                'px-4 py-2 rounded-xl whitespace-nowrap transition-all',
                selectedCategory === cat 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
                  : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-700'
              ]"
            >
              {{ cat }}
            </button>
          </div>
        </div>

        <!-- Blog Posts -->
        <div class="grid gap-8">
          <article
            v-for="post in filteredPosts"
            :key="post.slug"
            class="group rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-xl bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-slate-600 shadow-sm"
          >
            <div class="flex flex-col md:flex-row h-full">
              <div v-if="post.image" class="md:w-1/3 h-48 md:h-auto overflow-hidden relative">
                <div class="absolute inset-0 bg-indigo-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                <img 
                  :src="post.image" 
                  :alt="post.title" 
                  class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <div :class="['p-6 flex flex-col justify-between', post.image ? 'md:w-2/3' : 'w-full']">
                <div>
                  <div class="flex items-center gap-3 mb-3">
                    <span class="text-xs font-bold px-2 py-1 rounded uppercase tracking-wider bg-indigo-50 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300">
                      {{ post.category }}
                    </span>
                    <div class="flex items-center text-xs text-gray-400 dark:text-slate-500">
                      <svg class="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      {{ post.readTime }} read
                    </div>
                  </div>
                  
                  <a :href="post.link" class="block">
                    <h2 class="text-xl md:text-2xl font-bold mb-3 group-hover:text-indigo-500 transition-colors">
                      {{ post.title }}
                    </h2>
                  </a>
                  
                  <p class="mb-4 line-clamp-2 text-gray-600 dark:text-slate-400">
                    {{ post.excerpt }}
                  </p>
                </div>

                <div class="flex items-center justify-between mt-4">
                  <div class="flex gap-2">
                    <span v-for="tag in post.tags.slice(0, 2)" :key="tag" 
                          class="text-xs flex items-center text-gray-500 dark:text-slate-500">
                      <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                      </svg>
                      {{ tag }}
                    </span>
                  </div>
                  <a :href="post.link" 
                     class="flex items-center text-sm font-medium transition-colors text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">
                    Read Article
                    <svg class="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </article>

          <div v-if="filteredPosts.length === 0" class="text-center py-20">
            <svg class="w-12 h-12 mx-auto mb-4 text-gray-300 dark:text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
            </svg>
            <p class="text-lg text-gray-400 dark:text-slate-500">No posts found matching your search.</p>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const techStack = ['Rust', 'C++', 'OS Kernel', 'React', 'Linux', 'Git']

const searchTerm = ref('')
const selectedCategory = ref('All')

const blogPosts = [
  {
    slug: 'rust-ownership',
    title: "深入理解 Rust 所有权机制",
    excerpt: "Rust 的所有权系统是其最独特的功能。它让 Rust 无需垃圾回收即可保障内存安全。本文将通过实际代码示例，深入剖析 Move、Clone 和 Copy 的区别...",
    date: "2024-05-12",
    readTime: "8 min",
    category: "Rust",
    tags: ["Rust", "Memory Safety", "Programming"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000",
    link: "/posts/rust-ownership"
  },
  {
    slug: 'os-kernel-from-scratch',
    title: "从零开始编写一个简单的 OS Kernel",
    excerpt: "操作系统的引导过程发生了什么？如何从实模式切换到保护模式？让我们动手写一个 Hello World 级别的内核，探索计算机启动的奥秘...",
    date: "2024-04-28",
    readTime: "15 min",
    category: "OS",
    tags: ["Kernel", "C", "Assembly", "Low-level"],
    image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?auto=format&fit=crop&q=80&w=1000",
    link: "/posts/os-kernel-from-scratch"
  },
  {
    slug: 'github-actions-deployment',
    title: "GitHub Actions 自动化部署实践",
    excerpt: "CI/CD 是现代软件开发不可或缺的一部分。本文介绍如何配置 GitHub Actions，实现代码提交后自动运行测试并部署到 GitHub Pages...",
    date: "2024-04-15",
    readTime: "5 min",
    category: "DevOps",
    tags: ["GitHub", "CI/CD", "Automation"],
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=1000",
    link: "/posts/github-actions-deployment"
  },
  {
    slug: 'risc-v-intro',
    title: "RISC-V 架构初探：指令集与寄存器",
    excerpt: "RISC-V 正在改变芯片设计的格局。作为一种开源指令集架构，它简洁而强大。本文将带你了解 RISC-V 的基本寄存器约定和常用指令...",
    date: "2024-03-30",
    readTime: "12 min",
    category: "Arch",
    tags: ["RISC-V", "Assembly", "Hardware"],
    image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=1000",
    link: "/posts/risc-v-intro"
  }
]

const categories = computed(() => {
  const cats = new Set(blogPosts.map(post => post.category))
  return ['All', ...Array.from(cats)]
})

const filteredPosts = computed(() => {
  return blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchTerm.value.toLowerCase())
    const matchesCategory = selectedCategory.value === 'All' || post.category === selectedCategory.value
    return matchesSearch && matchesCategory
  })
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
