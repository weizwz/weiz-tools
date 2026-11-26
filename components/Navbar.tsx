'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun, Menu, X, Languages, ChevronDown, ArrowUpRight } from 'lucide-react'
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
    <header className='fixed top-0 inset-x-0 z-50 h-14 backdrop-blur-md bg-background/85 border-b border-border'>
      <nav className='max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between gap-4'>
        <div className='flex items-center gap-3 shrink-0'>
          <Link href='/' className='flex items-center gap-2.5 group'>
            <div className='w-6 h-6 rounded-md overflow-hidden border border-border bg-secondary flex items-center justify-center'>
              <Image src='/logo.png' alt='logo' width={24} height={24} className='w-full h-full object-cover' />
            </div>
            <span className='font-semibold text-sm tracking-[-0.02em] text-foreground whitespace-nowrap'>{t.common.siteName}</span>
          </Link>
          <span className='hidden sm:inline-block text-border select-none font-mono text-sm'>/</span>
          <span className='hidden sm:inline-block text-[11px] font-mono text-muted-foreground tracking-tight'>tools</span>
        </div>

        <div className='hidden lg:flex items-center gap-0.5 text-[13px] text-muted-foreground flex-1 justify-center'>
          {categories.map((category, index) => {
            const categoryId = categoryIds[index]
            const categoryTools = getToolsByCategory(index)
            const hasDropdown = categoryId !== 'home' && categoryTools.length > 0
            const isOpen = activeDropdown === index

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
                    className='flex items-center gap-1 px-3 py-1.5 rounded-md hover:text-foreground hover:bg-muted transition-colors whitespace-nowrap'>
                    {category}
                  </Link>
                ) : (
                  <button
                    type='button'
                    onClick={() => handleCategoryClick(index)}
                    className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      isOpen ? 'text-foreground bg-muted' : 'hover:text-foreground hover:bg-muted'
                    }`}>
                    {category}
                    {hasDropdown && (
                      <ChevronDown className={`w-3 h-3 opacity-50 transition-transform duration-150 ${isOpen ? 'rotate-180 opacity-100' : ''}`} />
                    )}
                  </button>
                )}

                {hasDropdown && isOpen && (
                  <div className='absolute top-full left-0 pt-2 min-w-[216px] animate-in fade-in-0 zoom-in-95 duration-100'>
                    <div className='bg-popover text-popover-foreground rounded-lg shadow-lg border border-border p-1'>
                      {categoryTools.map((tool) => (
                        <Link
                          key={tool.id}
                          href={tool.href}
                          className='flex items-center justify-between px-2.5 py-1.5 rounded-md text-[13px] text-muted-foreground hover:bg-muted hover:text-foreground transition-colors group/item'>
                          <span className='truncate'>{tool.name}</span>
                          <ArrowUpRight className='w-3.5 h-3.5 opacity-0 group-hover/item:opacity-80 transition-opacity shrink-0' />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className='flex items-center gap-1 shrink-0'>
          <Link
            href='/about'
            className='hidden sm:inline-flex items-center px-2.5 py-1.5 rounded-md text-[13px] text-muted-foreground hover:text-foreground hover:bg-muted transition-colors'>
            {t.nav.about}
          </Link>

          <div className='h-4 w-px bg-border hidden sm:block mx-1' />

          <div className='relative' onMouseEnter={() => setIsLangOpen(true)} onMouseLeave={() => setIsLangOpen(false)}>
            <button
              type='button'
              className='h-8 px-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-mono'
              aria-label='Toggle Language'>
              <Languages className='w-3.5 h-3.5' />
              <span className='hidden sm:inline'>{lang === 'zh' ? 'ZH' : 'EN'}</span>
            </button>
            {isLangOpen && (
              <div className='absolute top-full right-0 pt-2 min-w-[112px] animate-in fade-in-0 zoom-in-95 duration-100'>
                <div className='bg-popover rounded-lg shadow-lg border border-border p-1'>
                  {languages.map((l) => (
                    <button
                      type='button'
                      key={l.code}
                      onClick={() => {
                        setLang(l.code)
                        setIsLangOpen(false)
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-md text-[13px] transition-colors cursor-pointer ${
                        lang === l.code
                          ? 'text-foreground font-medium bg-muted'
                          : 'text-muted-foreground hover:bg-muted/70 hover:text-foreground'
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
            className='h-8 w-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer flex items-center justify-center'
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            aria-label='Toggle Dark Mode'>
            <Moon className='w-4 h-4 block dark:hidden' />
            <Sun className='w-4 h-4 hidden dark:block' />
          </button>

          <button
            type='button'
            aria-label='Toggle Menu'
            className='lg:hidden h-8 w-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted flex items-center justify-center cursor-pointer'
            onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className='w-4 h-4' /> : <Menu className='w-4 h-4' />}
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className='lg:hidden bg-background border-b border-border absolute w-full left-0 top-14 shadow-lg'>
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
                      className='block w-full text-foreground font-medium text-left px-3 py-2 rounded-md hover:bg-muted transition-colors text-sm'>
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
                        className='w-full text-foreground font-medium text-left px-3 py-2 rounded-md hover:bg-muted transition-colors text-sm'>
                        {category}
                      </button>

                      {categoryTools.length > 0 && (
                        <div className='ml-3 mt-0.5 space-y-0.5 border-l border-border pl-2.5'>
                          {categoryTools.map((tool) => (
                            <Link
                              key={tool.id}
                              href={tool.href}
                              onClick={() => setIsMenuOpen(false)}
                              className='block text-xs text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-md hover:bg-muted/70 transition-colors'>
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
            <div className='pt-2 mt-2 border-t border-border'>
              <Link
                href='/about'
                onClick={() => setIsMenuOpen(false)}
                className='block w-full text-muted-foreground font-medium hover:text-foreground text-left px-3 py-2 rounded-md hover:bg-muted transition-colors text-sm'>
                {t.nav.about}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
