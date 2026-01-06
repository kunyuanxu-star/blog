'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { Clock, Tag, ChevronLeft } from 'lucide-react';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

// Mock data - 实际使用时会从文件系统读取
const BLOG_POSTS: Record<string, any> = {
  'rust-ownership': {
    title: "深入理解 Rust 所有权机制",
    date: "2024-05-12",
    readTime: "8 min",
    category: "Rust",
    tags: ["Rust", "Memory Safety", "Programming"],
    content: `# 深入理解 Rust 所有权机制

Rust 的所有权系统是其最独特的功能。它让 Rust 无需垃圾回收即可保障内存安全。

## 什么是所有权？

所有权是 Rust 最为与众不同的特性，它让 Rust 无需垃圾回收（garbage collector）即可保障内存安全。

### 所有权规则

1. Rust 中的每一个值都有一个被称为其 **所有者**（owner）的变量。
2. 值在任一时刻有且只有一个所有者。
3. 当所有者（变量）离开作用域，这个值将被丢弃。

## 示例代码

\`\`\`rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1; // s1 的值被移动到 s2
    
    // println!("{}", s1); // 这会报错！
    println!("{}", s2); // 这是正确的
}
\`\`\`

## 借用与引用

Rust 使用借用（borrowing）机制来在不获取所有权的情况下访问数据。

\`\`\`rust
fn main() {
    let s1 = String::from("hello");
    let len = calculate_length(&s1);
    
    println!("The length of '{}' is {}.", s1, len);
}

fn calculate_length(s: &String) -> usize {
    s.len()
}
\`\`\`

## 总结

所有权系统是 Rust 的核心概念，理解它对于编写高效、安全的 Rust 代码至关重要。`
  },
  'os-kernel-from-scratch': {
    title: "从零开始编写一个简单的 OS Kernel",
    date: "2024-04-28",
    readTime: "15 min",
    category: "OS",
    tags: ["Kernel", "C", "Assembly", "Low-level"],
    content: `# 从零开始编写一个简单的 OS Kernel

让我们动手写一个 Hello World 级别的内核，探索计算机启动的奥秘。

## 引导过程

计算机启动时，BIOS 会加载引导扇区（Boot Sector）到内存地址 0x7c00。

### 编写引导代码

\`\`\`assembly
[org 0x7c00]
[bits 16]

start:
    mov si, hello
    call print_string
    jmp $

print_string:
    lodsb
    or al, al
    jz .done
    mov ah, 0x0e
    int 0x10
    jmp print_string
.done:
    ret

hello: db 'Hello, OS World!', 0

times 510-($-$$) db 0
dw 0xaa55
\`\`\`

## 从实模式到保护模式

实模式下只能访问 1MB 内存，我们需要切换到保护模式。

## 构建与运行

\`\`\`bash
nasm -f bin boot.asm -o boot.bin
qemu-system-x86_64 -drive format=raw,file=boot.bin
\`\`\`

这就是一个最简单的操作系统内核！`
  }
};

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [darkMode, setDarkMode] = useState(false);
  const [mdxSource, setMdxSource] = useState<any>(null);

  const post = BLOG_POSTS[slug];

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    if (post?.content) {
      serialize(post.content).then(setMdxSource);
    }
  }, [post]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  if (!post) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-slate-900 text-slate-100' : 'bg-gray-50 text-gray-900'}`}>
        <Navigation darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">文章未找到</h1>
          <Link href="/" className="text-indigo-500 hover:underline">返回首页</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-slate-900 text-slate-100' : 'bg-gray-50 text-gray-900'
    }`}>
      <Navigation darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/"
          className={`inline-flex items-center mb-8 transition-colors ${
            darkMode ? 'text-slate-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <ChevronLeft size={20} className="mr-1" />
          返回文章列表
        </Link>

        <article className={`rounded-2xl border p-8 md:p-12 ${
          darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200 shadow-sm'
        }`}>
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className={`text-xs font-bold px-3 py-1 rounded uppercase tracking-wider ${
                darkMode ? 'bg-indigo-500/20 text-indigo-300' : 'bg-indigo-50 text-indigo-600'
              }`}>
                {post.category}
              </span>
              <div className={`flex items-center text-sm ${
                darkMode ? 'text-slate-500' : 'text-gray-400'
              }`}>
                <Clock size={16} className="mr-1" />
                {post.readTime} read • {post.date}
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
              {post.title}
            </h1>

            <div className="flex gap-2 flex-wrap">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className={`text-sm flex items-center px-3 py-1 rounded-full ${
                    darkMode ? 'bg-slate-700 text-slate-300' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  <Tag size={14} className="mr-1" /> {tag}
                </span>
              ))}
            </div>
          </header>

          <div className={`prose prose-lg max-w-none ${
            darkMode
              ? 'prose-invert prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-700'
              : 'prose-pre:bg-gray-50'
          }`}>
            {mdxSource && <MDXRemote {...mdxSource} />}
          </div>
        </article>
      </div>

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
