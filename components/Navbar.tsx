'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun, Menu, X, Languages, ChevronDown } from 'lucide-react'
import { useI18n } from '@/lib/i18n'
import { categories, categoryIds, tools } from '@/data/tools'

export function Navbar() {
  const { resolvedTheme, setTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const { lang, setLang, t } = useI18n()

  const languages = [
    { code: 'zh' as const, label: '中文' },
    { code: 'en' as const, label: 'English' }
  ]

  const handleCategoryClick = (categoryIndex: number) => {
    const categoryId = categoryIds[categoryIndex]
    if (categoryId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      window.dispatchEvent(new CustomEvent('filterCategory', { detail: '首页' }))
      return
    }
    const category = categories[categoryIndex]
    window.dispatchEvent(new CustomEvent('filterCategory', { detail: category }))
    const section = document.getElementById('all-tools')
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const getToolsByCategory = (categoryIndex: number) => {
    const categoryId = categoryIds[categoryIndex]
    if (categoryId === 'home') return []
    const category = categories[categoryIndex]
    return tools
      .filter((tool) => tool.category === category)
      .map((tool) => ({
        id: tool.id,
        name: t.tools[tool.id]?.name || tool.name,
        href: tool.href
      }))
  }

  return (
    <header className='fixed top-0 inset-x-0 z-50 h-14 backdrop-blur-md bg-white/85 dark:bg-slate-950/85 border-b border-border transition-colors'>
      <nav className='max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between gap-6'>
        <Link href='/' className='flex items-center gap-2.5 hover:opacity-85 transition-opacity shrink-0'>
          <Image src='/logo.png' alt='logo' width={28} height={28} className='rounded-lg' />
          <span className='font-semibold text-base tracking-tight text-foreground whitespace-nowrap'>{t.common.siteName}</span>
        </Link>

        <div className='hidden lg:flex items-center gap-1 text-sm font-medium text-muted-foreground flex-1 justify-center'>
          {categories.map((category, index) => {
            const categoryId = categoryIds[index]
            const categoryTools = getToolsByCategory(index)
            const hasDropdown = categoryId !== 'home' && categoryTools.length > 0

            return (
              <div
                key={category}
                className='relative'
                onMouseEnter={() => hasDropdown && setActiveDropdown(index)}
                onMouseLeave={() => setActiveDropdown(null)}>
                {categoryId === 'home' ? (
                  <Link
                    href='/'
                    onClick={() => handleCategoryClick(index)}
                    className='flex items-center gap-1 px-3 py-1.5 rounded-lg hover:text-foreground hover:bg-muted/70 transition-colors whitespace-nowrap'>
                    {category}
                  </Link>
                ) : (
                  <button
                    type='button'
                    onClick={() => handleCategoryClick(index)}
                    className='flex items-center gap-1 px-3 py-1.5 rounded-lg hover:text-foreground hover:bg-muted/70 transition-colors whitespace-nowrap cursor-pointer'>
                    {category}
                    {hasDropdown && <ChevronDown className='w-3.5 h-3.5 opacity-60' />}
                  </button>
                )}

                {hasDropdown && activeDropdown === index && (
                  <div className='absolute top-full left-0 pt-1.5 min-w-[200px]'>
                    <div className='bg-popover text-popover-foreground rounded-xl shadow-lg shadow-slate-900/5 border border-border py-1.5'>
                      {categoryTools.map((tool) => (
                        <Link
                          key={tool.id}
                          href={tool.href}
                          className='block px-3.5 py-2 text-sm text-muted-foreground hover:bg-main-soft hover:text-main transition-colors'>
                          {tool.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className='flex items-center gap-1.5 shrink-0'>
          <div className='relative' onMouseEnter={() => setIsLangOpen(true)} onMouseLeave={() => setIsLangOpen(false)}>
            <button
              type='button'
              className='h-8 px-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-colors cursor-pointer flex items-center gap-1 text-xs font-medium'
              aria-label='Toggle Language'>
              <Languages className='w-4 h-4' />
              <span className='hidden sm:inline'>{lang === 'zh' ? '中文' : 'EN'}</span>
            </button>
            {isLangOpen && (
              <div className='absolute top-full right-0 pt-1.5 min-w-[110px]'>
                <div className='bg-popover rounded-xl shadow-lg shadow-slate-900/5 border border-border py-1'>
                  {languages.map((l) => (
                    <button
                      type='button'
                      key={l.code}
                      onClick={() => {
                        setLang(l.code)
                        setIsLangOpen(false)
                      }}
                      className={`w-full text-left px-3.5 py-1.5 text-sm transition-colors cursor-pointer ${
                        lang === l.code
                          ? 'text-main font-medium bg-main-soft'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}>
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            type='button'
            className='h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-colors cursor-pointer flex items-center justify-center'
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            aria-label='Toggle Dark Mode'>
            <Moon className='w-4 h-4 block dark:hidden' />
            <Sun className='w-4 h-4 hidden dark:block' />
          </button>

          <button
            type='button'
            aria-label='Toggle Menu'
            className='lg:hidden h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/70 flex items-center justify-center'
            onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className='w-5 h-5' /> : <Menu className='w-5 h-5' />}
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className='lg:hidden bg-card border-b border-border absolute w-full left-0 top-14 shadow-lg'>
          <div className='px-4 py-3 space-y-1 flex flex-col max-h-[calc(100vh-3.5rem)] overflow-y-auto'>
            {categories.map((category, index) => {
              const categoryId = categoryIds[index]
              const categoryTools = getToolsByCategory(index)

              return (
                <div key={category}>
                  {categoryId === 'home' ? (
                    <Link
                      href='/'
                      onClick={() => {
                        setIsMenuOpen(false)
                        handleCategoryClick(index)
                      }}
                      className='block w-full text-foreground font-medium hover:text-main text-left px-3 py-2 rounded-lg hover:bg-muted/70 transition-colors text-sm'>
                      {category}
                    </Link>
                  ) : (
                    <>
                      <button
                        type='button'
                        onClick={() => {
                          setIsMenuOpen(false)
                          handleCategoryClick(index)
                        }}
                        className='w-full text-foreground font-medium hover:text-main text-left px-3 py-2 rounded-lg hover:bg-muted/70 transition-colors text-sm'>
                        {category}
                      </button>

                      {categoryTools.length > 0 && (
                        <div className='ml-3 mt-0.5 space-y-0.5 border-l border-border pl-2'>
                          {categoryTools.map((tool) => (
                            <Link
                              key={tool.id}
                              href={tool.href}
                              onClick={() => setIsMenuOpen(false)}
                              className='block text-xs text-muted-foreground hover:text-main px-3 py-1.5 rounded-md hover:bg-muted/50 transition-colors'>
                              {tool.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
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
