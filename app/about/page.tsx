'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { Github, Mail, Twitter } from 'lucide-react';

export default function AboutPage() {
  const [darkMode, setDarkMode] = useState(false);

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

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-slate-900 text-slate-100' : 'bg-gray-50 text-gray-900'
    }`}>
      <Navigation darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className={`rounded-2xl border p-8 md:p-12 ${
          darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200 shadow-sm'
        }`}>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
            About Me
          </h1>

          <div className={`prose prose-lg max-w-none ${darkMode ? 'prose-invert' : ''}`}>
            <p className={`text-lg leading-relaxed ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>
              Hi, I'm <strong>Kunyuan Xu</strong>, a system software developer with a passion for low-level programming and open-source contributions.
            </p>

            <h2 className={`text-2xl font-bold mt-8 mb-4 ${darkMode ? 'text-slate-100' : 'text-gray-900'}`}>
              What I Do
            </h2>
            <p className={`leading-relaxed ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>
              I specialize in systems programming, with particular interests in:
            </p>
            <ul className={`list-disc list-inside space-y-2 ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>
              <li><strong>Rust Programming</strong> - Memory-safe systems development</li>
              <li><strong>Operating Systems</strong> - Kernel development and low-level architecture</li>
              <li><strong>RISC-V Architecture</strong> - Open-source hardware exploration</li>
              <li><strong>DevOps & CI/CD</strong> - Automation and deployment pipelines</li>
            </ul>

            <h2 className={`text-2xl font-bold mt-8 mb-4 ${darkMode ? 'text-slate-100' : 'text-gray-900'}`}>
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-3 my-6">
              {['Rust', 'C', 'C++', 'Assembly', 'Linux', 'Git', 'React', 'TypeScript', 'Next.js', 'Tailwind CSS'].map(tech => (
                <span key={tech} className={`px-4 py-2 rounded-lg font-medium ${
                  darkMode ? 'bg-indigo-500/20 text-indigo-300' : 'bg-indigo-50 text-indigo-600'
                }`}>
                  {tech}
                </span>
              ))}
            </div>

            <h2 className={`text-2xl font-bold mt-8 mb-4 ${darkMode ? 'text-slate-100' : 'text-gray-900'}`}>
              Contact
            </h2>
            <p className={`leading-relaxed mb-6 ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>
              Feel free to reach out to me through any of these platforms:
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/kunyuanxu-star"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  darkMode
                    ? 'bg-slate-700 hover:bg-slate-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                }`}
              >
                <Github size={20} />
                GitHub
              </a>
              <a
                href="#"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  darkMode
                    ? 'bg-slate-700 hover:bg-slate-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                }`}
              >
                <Twitter size={20} />
                Twitter
              </a>
              <a
                href="mailto:contact@example.com"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  darkMode
                    ? 'bg-slate-700 hover:bg-slate-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                }`}
              >
                <Mail size={20} />
                Email
              </a>
            </div>

            <div className={`mt-12 p-6 rounded-xl ${
              darkMode ? 'bg-slate-700/50' : 'bg-indigo-50'
            }`}>
              <p className={`text-center italic ${darkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                "The best way to predict the future is to invent it."
              </p>
              <p className={`text-center text-sm mt-2 ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                - Alan Kay
              </p>
            </div>
          </div>
        </article>
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
