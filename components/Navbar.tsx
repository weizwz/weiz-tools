'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun, Menu, Languages, ChevronDown } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import { categories, tools } from '@/data/tools'

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const { lang, toggleLang } = useI18n()

  const handleCategoryClick = (category: string) => {
    const section = document.getElementById('all-tools')
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
      // 触发分类筛选
      const event = new CustomEvent('filterCategory', { detail: category })
      window.dispatchEvent(event)
    }
  }

  // 根据分类获取工具列表
  const getToolsByCategory = (category: string) => {
    if (category === '全部') return tools
    return tools.filter((tool) => tool.category === category)
  }

  return (
    <header className='fixed top-0 w-full z-50 backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300'>
      <nav className='container mx-auto px-6 h-16 flex items-center justify-between gap-8'>
        {/* Logo */}
        <Link href='/' className='flex items-center gap-2 hover:opacity-80 transition-opacity shrink-0'>
          <div className='w-8 h-8 bg-main rounded-lg flex items-center justify-center text-white font-bold text-sm'>小</div>
          <span className='font-bold text-base tracking-tight text-slate-800 dark:text-white whitespace-nowrap'>小实验室工具</span>
        </Link>

        {/* Desktop Category Links with Dropdown */}
        <div className='hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 flex-1 justify-center'>
          {categories.map((category) => {
            const categoryTools = getToolsByCategory(category)
            const hasTools = categoryTools.length > 0

            return (
              <div key={category} className='relative group' onMouseEnter={() => setActiveDropdown(category)} onMouseLeave={() => setActiveDropdown(null)}>
                <button
                  onClick={() => handleCategoryClick(category)}
                  className='flex items-center gap-1 hover:text-main transition-colors whitespace-nowrap px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800'>
                  {category}
                  {hasTools && category !== '全部' && <ChevronDown className='w-3 h-3' />}
                </button>

                {/* Dropdown Menu */}
                {hasTools && category !== '全部' && activeDropdown === category && (
                  <div className='absolute top-full left-0 mt-1 min-w-[200px] bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700 py-2 animate-in fade-in slide-in-from-top-2 duration-200'>
                    {categoryTools.map((tool) => (
                      <Link
                        key={tool.id}
                        href={tool.href}
                        className='block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-main transition-colors'>
                        {tool.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Right Actions */}
        <div className='flex items-center gap-2 shrink-0'>
          {/* Language Toggle */}
          <button
            className='p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer flex items-center gap-1.5'
            onClick={toggleLang}
            aria-label='Toggle Language'
            title={lang === 'zh' ? 'Switch to English' : '切换到中文'}>
            <Languages className='w-5 h-5' />
            <span className='text-xs font-bold uppercase hidden sm:inline'>{lang === 'zh' ? 'EN' : '中'}</span>
          </button>

          {/* Theme Toggle */}
          <button
            className='p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer'
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label='Toggle Dark Mode'>
            <Moon className='w-5 h-5 block dark:hidden' />
            <Sun className='w-5 h-5 hidden dark:block' />
          </button>

          {/* Mobile Menu Toggle */}
          <button className='lg:hidden p-2 text-slate-600 dark:text-slate-300' onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className='w-6 h-6' />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Content */}
      {isMenuOpen && (
        <div className='lg:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 absolute w-full left-0 top-16 shadow-lg'>
          <div className='px-6 py-4 space-y-2 flex flex-col max-h-[calc(100vh-4rem)] overflow-y-auto'>
            {categories.map((category) => {
              const categoryTools = getToolsByCategory(category)
              const hasTools = categoryTools.length > 0

              return (
                <div key={category}>
                  <button
                    onClick={() => {
                      if (category === '全部') {
                        setIsMenuOpen(false)
                        handleCategoryClick(category)
                      }
                    }}
                    className='w-full text-slate-600 dark:text-slate-300 font-medium hover:text-main text-left px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors'>
                    {category}
                  </button>

                  {/* Mobile Submenu */}
                  {hasTools && category !== '全部' && (
                    <div className='ml-4 mt-1 space-y-1'>
                      {categoryTools.map((tool) => (
                        <Link
                          key={tool.id}
                          href={tool.href}
                          onClick={() => setIsMenuOpen(false)}
                          className='block text-sm text-slate-500 dark:text-slate-400 hover:text-main px-3 py-1.5 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors'>
                          {tool.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}
