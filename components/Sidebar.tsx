'use client';

import { Github, Twitter, Mail } from 'lucide-react';

interface SidebarProps {
  darkMode: boolean;
}

const PROFILE = {
  name: "Kunyuan Xu",
  bio: "System Software Developer. Enthusiast of Rust & OS Kernels.",
  github: "https://github.com/kunyuanxu-star",
  twitter: "#",
  email: "mailto:contact@example.com",
};

const TECH_STACK = ["Rust", "C++", "OS Kernel", "React", "Linux", "Git"];

export default function Sidebar({ darkMode }: SidebarProps) {
  return (
    <aside className="lg:col-span-3 lg:sticky lg:top-24 h-fit">
      <div className={`p-6 rounded-2xl border ${
        darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200 shadow-sm'
      }`}>
        <div className="flex flex-col items-center text-center">
          <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-1 mb-4">
            <div className={`w-full h-full rounded-full overflow-hidden flex items-center justify-center ${
              darkMode ? 'bg-slate-900' : 'bg-white'
            }`}>
              <span className="text-4xl font-bold text-indigo-500">KX</span>
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">{PROFILE.name}</h2>
          <p className={`text-sm mb-6 ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
            {PROFILE.bio}
          </p>

          <div className="flex space-x-4 mb-6">
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-full transition-all ${
                darkMode
                  ? 'hover:bg-slate-700 text-slate-400 hover:text-white'
                  : 'hover:bg-gray-100 text-gray-500 hover:text-black'
              }`}
            >
              <Github size={20} />
            </a>
            <a
              href={PROFILE.twitter}
              className={`p-2 rounded-full transition-all ${
                darkMode
                  ? 'hover:bg-slate-700 text-slate-400 hover:text-blue-400'
                  : 'hover:bg-gray-100 text-gray-500 hover:text-blue-500'
              }`}
            >
              <Twitter size={20} />
            </a>
            <a
              href={PROFILE.email}
              className={`p-2 rounded-full transition-all ${
                darkMode
                  ? 'hover:bg-slate-700 text-slate-400 hover:text-red-400'
                  : 'hover:bg-gray-100 text-gray-500 hover:text-red-500'
              }`}
            >
              <Mail size={20} />
            </a>
          </div>

          <button className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors font-medium">
            Follow
          </button>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 opacity-70">
          Tech Stack
        </h3>
        <div className="flex flex-wrap gap-2">
          {TECH_STACK.map((skill) => (
            <span
              key={skill}
              className={`text-xs px-3 py-1 rounded-full border ${
                darkMode
                  ? 'bg-slate-800 border-slate-700 text-slate-300'
                  : 'bg-white border-gray-200 text-gray-600'
              }`}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}
