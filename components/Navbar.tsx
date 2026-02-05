'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

export function Navbar() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className='fixed top-0 w-full z-50 backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300'>
      <nav className='container mx-auto px-6 h-16 flex items-center justify-between'>
        {/* Logo */}
        <div className='flex items-center gap-2'>
          <div className='w-8 h-8 bg-[#409eff] rounded flex items-center justify-center text-white font-bold text-sm'>WT</div>
          <span className='font-bold text-xl tracking-tight uppercase text-slate-800 dark:text-white'>weiz-tools</span>
        </div>

        {/* Desktop Links */}
        <div className='hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300'>
          <Link href='/#tools' className='hover:text-[#409eff] transition-colors'>
            Tools
          </Link>
          <Link href='#' className='hover:text-[#409eff] transition-colors'>
            Resources
          </Link>
          <Link href='#' className='hover:text-[#409eff] transition-colors'>
            Docs
          </Link>
          <Link href='/about' className='hover:text-[#409eff] transition-colors'>
            About
          </Link>
        </div>

        {/* Right Actions */}
        <div className='flex items-center gap-4'>
          <button
            className='p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors'
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label='Toggle Dark Mode'>
            {mounted && (
              <>
                <span className={`material-symbols-outlined text-[20px] ${theme === 'dark' ? 'hidden' : 'block'}`}>dark_mode</span>
                <span className={`material-symbols-outlined text-[20px] ${theme === 'dark' ? 'block' : 'hidden'}`}>light_mode</span>
              </>
            )}
            {!mounted && <span className='material-symbols-outlined text-[20px]'>dark_mode</span>} {/* Fallback */}
          </button>

          <Link
            href='#tools'
            className='bg-[#409eff] text-white px-5 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity hidden sm:block'>
            Get Started
          </Link>

          {/* Mobile Menu Toggle */}
          <button className='md:hidden p-2 text-slate-600 dark:text-slate-300' onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span className='material-symbols-outlined'>menu</span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Content */}
      {isMenuOpen && (
        <div className='md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 absolute w-full left-0 top-16'>
          <div className='px-6 py-4 space-y-4 flex flex-col'>
            <Link href='/#tools' onClick={() => setIsMenuOpen(false)} className='text-slate-600 dark:text-slate-300 font-medium hover:text-[#409eff]'>
              Tools
            </Link>
            <Link href='#' onClick={() => setIsMenuOpen(false)} className='text-slate-600 dark:text-slate-300 font-medium hover:text-[#409eff]'>
              Resources
            </Link>
            <Link href='#' onClick={() => setIsMenuOpen(false)} className='text-slate-600 dark:text-slate-300 font-medium hover:text-[#409eff]'>
              Docs
            </Link>
            <Link href='/about' onClick={() => setIsMenuOpen(false)} className='text-slate-600 dark:text-slate-300 font-medium hover:text-[#409eff]'>
              About
            </Link>
            <Link
              href='#tools'
              onClick={() => setIsMenuOpen(false)}
              className='bg-[#409eff] text-white px-5 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity text-center inline-block w-full'>
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
