'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Terminal, Moon, Sun, Menu, X } from 'lucide-react';

interface NavigationProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function Navigation({ darkMode, onToggleDarkMode }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
      darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-gray-200'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${
              darkMode ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-100 text-indigo-600'
            }`}>
              <Terminal size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight">Kunyuan Xu</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="hover:text-indigo-500 transition-colors">
              Blog
            </Link>
            <Link href="/about" className="hover:text-indigo-500 transition-colors">
              About
            </Link>
            <button
              onClick={onToggleDarkMode}
              className={`p-2 rounded-full transition-colors ${
                darkMode ? 'hover:bg-slate-800 text-yellow-400' : 'hover:bg-gray-100 text-slate-600'
              }`}
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={onToggleDarkMode}
              className={`mr-4 p-2 rounded-full ${darkMode ? 'text-yellow-400' : 'text-slate-600'}`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className={`md:hidden px-4 pt-2 pb-4 border-t ${
          darkMode ? 'border-slate-800 bg-slate-900' : 'border-gray-200 bg-white'
        }`}>
          <Link href="/" className="block py-2 hover:text-indigo-500">
            Blog
          </Link>
          <Link href="/about" className="block py-2 hover:text-indigo-500">
            About
          </Link>
        </div>
      )}
    </nav>
  );
}
