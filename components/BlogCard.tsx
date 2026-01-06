'use client';

import Link from 'next/link';
import { Clock, Tag, ChevronRight } from 'lucide-react';
import type { BlogPost } from '@/lib/blog';

interface BlogCardProps {
  post: BlogPost;
  darkMode: boolean;
}

export default function BlogCard({ post, darkMode }: BlogCardProps) {
  return (
    <article className={`group rounded-2xl overflow-hidden border transition-all duration-300 hover:shadow-xl ${
      darkMode
        ? 'bg-slate-800 border-slate-700 hover:border-slate-600'
        : 'bg-white border-gray-200 hover:border-indigo-200 shadow-sm'
    }`}>
      <div className="flex flex-col md:flex-row h-full">
        {/* Image Section */}
        {post.image && (
          <div className="md:w-1/3 h-48 md:h-auto overflow-hidden relative">
            <div className="absolute inset-0 bg-indigo-900/10 group-hover:bg-transparent transition-colors z-10"></div>
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}

        {/* Content Section */}
        <div className={`p-6 flex flex-col justify-between ${post.image ? 'md:w-2/3' : 'w-full'}`}>
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-wider ${
                darkMode ? 'bg-indigo-500/20 text-indigo-300' : 'bg-indigo-50 text-indigo-600'
              }`}>
                {post.category}
              </span>
              <div className={`flex items-center text-xs ${
                darkMode ? 'text-slate-500' : 'text-gray-400'
              }`}>
                <Clock size={14} className="mr-1" />
                {post.readTime} read
              </div>
            </div>

            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-indigo-500 transition-colors cursor-pointer">
                {post.title}
              </h2>
            </Link>

            <p className={`mb-4 line-clamp-2 ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>
              {post.excerpt}
            </p>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex gap-2 flex-wrap">
              {post.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className={`text-xs flex items-center ${
                    darkMode ? 'text-slate-500' : 'text-gray-500'
                  }`}
                >
                  <Tag size={12} className="mr-1" /> {tag}
                </span>
              ))}
            </div>
            <Link
              href={`/blog/${post.slug}`}
              className={`flex items-center text-sm font-medium transition-colors ${
                darkMode
                  ? 'text-indigo-400 hover:text-indigo-300'
                  : 'text-indigo-600 hover:text-indigo-700'
              }`}
            >
              Read Article{' '}
              <ChevronRight
                size={16}
                className="ml-1 group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
