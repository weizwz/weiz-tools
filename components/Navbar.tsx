'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun, Menu, Languages } from 'lucide-react'
import { useI18n } from '@/lib/i18n'

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t, lang, toggleLang } = useI18n()

  return (
    <header className='fixed top-0 w-full z-50 backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300'>
      <nav className='container mx-auto px-6 h-16 flex items-center justify-between'>
        {/* Logo */}
        <Link href='/'>
          <div className='flex items-center gap-2'>
            <div className='w-8 h-8 bg-main rounded-full flex items-center justify-center text-white font-bold text-sm'>WT</div>
            <span className='font-bold text-xl tracking-tight uppercase text-slate-800 dark:text-white'>weiz-tools</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className='hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300'>
          <Link href='/' className='hover:text-main transition-colors'>
            {t.nav.home}
          </Link>
          <Link href='#' className='hover:text-main transition-colors'>
            {t.nav.resources}
          </Link>
          <Link href='#' className='hover:text-main transition-colors'>
            {t.nav.docs}
          </Link>
          <Link href='/about' className='hover:text-main transition-colors'>
            {t.nav.about}
          </Link>
        </div>

        {/* Right Actions */}
        <div className='flex items-center gap-2'>
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

          <button
            className='bg-main cursor-pointer text-white px-5 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity hidden sm:block'
            onClick={() => document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' })}>
            {t.common.getStarted}
          </button>

          {/* Mobile Menu Toggle */}
          <button className='md:hidden p-2 text-slate-600 dark:text-slate-300' onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className='w-6 h-6' />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Content */}
      {isMenuOpen && (
        <div className='md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 absolute w-full left-0 top-16'>
          <div className='px-6 py-4 space-y-4 flex flex-col'>
            <Link href='/#tools' onClick={() => setIsMenuOpen(false)} className='text-slate-600 dark:text-slate-300 font-medium hover:text-main'>
              {t.nav.tools}
            </Link>
            <Link href='#' onClick={() => setIsMenuOpen(false)} className='text-slate-600 dark:text-slate-300 font-medium hover:text-main'>
              {t.nav.resources}
            </Link>
            <Link href='#' onClick={() => setIsMenuOpen(false)} className='text-slate-600 dark:text-slate-300 font-medium hover:text-main'>
              {t.nav.docs}
            </Link>
            <Link href='/about' onClick={() => setIsMenuOpen(false)} className='text-slate-600 dark:text-slate-300 font-medium hover:text-main'>
              {t.nav.about}
            </Link>
            <Link
              href='#tools'
              onClick={() => setIsMenuOpen(false)}
              className='bg-main text-white px-5 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity text-center inline-block w-full'>
              {t.common.getStarted}
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
