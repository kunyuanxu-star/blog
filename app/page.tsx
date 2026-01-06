'use client';

import { useState, useEffect } from 'react';
import { Search, BookOpen } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Sidebar from '@/components/Sidebar';
import BlogCard from '@/components/BlogCard';

// Mock blog posts data
const BLOG_POSTS = [
  {
    slug: 'rust-ownership',
    title: "深入理解 Rust 所有权机制",
    excerpt: "Rust 的所有权系统是其最独特的功能。它让 Rust 无需垃圾回收即可保障内存安全。本文将通过实际代码示例，深入剖析 Move、Clone 和 Copy 的区别...",
    date: "2024-05-12",
    readTime: "8 min",
    category: "Rust",
    tags: ["Rust", "Memory Safety", "Programming"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1000",
    content: "",
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
    content: "",
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
    content: "",
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
    content: "",
  }
];

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["All", ...new Set(BLOG_POSTS.map(post => post.category))];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-slate-900 text-slate-100' : 'bg-gray-50 text-gray-900'
    }`}>
      <Navigation darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <Sidebar darkMode={darkMode} />

          <main className="lg:col-span-9">
            {/* Header Area */}
            <div className="mb-10">
              <h1 className="text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
                Writing & Thinking
              </h1>
              <p className={`text-lg ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                Sharing my journey in system programming and open source.
              </p>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                    darkMode
                      ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500'
                      : 'bg-white border-gray-200 text-gray-900'
                  }`}
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                      selectedCategory === cat
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                        : darkMode
                        ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Posts Grid */}
            <div className="grid gap-8">
              {filteredPosts.length > 0 ? (
                filteredPosts.map(post => (
                  <BlogCard key={post.slug} post={post} darkMode={darkMode} />
                ))
              ) : (
                <div className="text-center py-20">
                  <BookOpen size={48} className={`mx-auto mb-4 ${
                    darkMode ? 'text-slate-700' : 'text-gray-300'
                  }`} />
                  <p className={`text-lg ${darkMode ? 'text-slate-500' : 'text-gray-400'}`}>
                    No posts found matching your search.
                  </p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className={`py-8 mt-12 border-t ${
        darkMode ? 'bg-slate-900 border-slate-800 text-slate-500' : 'bg-gray-50 border-gray-200 text-gray-500'
      }`}>
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Kunyuan Xu. Built with Next.js & Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  );
}
