'use client'

import { useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import Link from 'next/link'
import { Search, ArrowRight, Code } from 'lucide-react'
import { tools } from '@/data/tools'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className='min-h-screen'>
      <Navbar />

      {/* Hero Section */}
      <section className='relative pt-32 pb-20 overflow-hidden bg-[radial-gradient(var(--pattern-fg)_1px,transparent_0)] bg-size-[10px_10px] bg-fixed [--pattern-fg:var(--color-gray-950)]/5 dark:[--pattern-fg:var(--color-white)]/10'>
        <div className='absolute inset-0 hero-pattern opacity-10 dark:opacity-5'></div>
        <div className='container mx-auto px-6 text-center relative z-10'>
          <h1 className='text-6xl md:text-8xl font-extrabold tracking-tighter mb-4 text-slate-900 dark:text-white'>ULTIMATE TOOLBOX</h1>
          <h2 className='text-4xl md:text-6xl font-extrabold tracking-tighter mb-8 gradient-text'>FOR DEVELOPERS</h2>
          <p className='max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400 mb-10'>
            A curated collection of productivity tools, code formatters, and design assets crafted to accelerate your modern web development workflow.
          </p>
          <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
            <button
              className='bg-main cursor-pointer text-white px-8 py-3.5 rounded-full font-bold shadow-lg shadow-blue-500/20 hover:scale-105 transition-transform'
              onClick={() => document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' })}>
              Explore All Tools
            </button>
            <div className='flex items-center gap-3 px-4 py-3 rounded-full border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur shadow-sm'>
              <Search className='text-slate-400 w-5 h-5' />
              <input
                className='bg-transparent border-none focus:ring-0 text-sm w-48 outline-none text-slate-700 dark:text-slate-200 placeholder-slate-400'
                placeholder='Search for a tool...'
                type='text'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tools Section */}
      <section id='featured' className='py-20 bg-slate-50 dark:bg-slate-900/50'>
        <div className='container mx-auto px-6'>
          <div className='flex justify-between items-end mb-12'>
            <div>
              <h3 className='text-3xl font-bold mb-2 text-slate-900 dark:text-white'>Featured Tools</h3>
              <p className='text-slate-500'>Most used tools by our community</p>
            </div>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8'>
            {tools.map((tool) => {
              return (
                <div
                  key={tool.id}
                  className='group bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-md shadow-slate-200 dark:shadow-slate-600 hover:shadow-xl transition-all duration-300'>
                  <div className='flex justify-between items-center gap-4 mb-4'>
                    <h4 className='text-xl font-bold'>{tool.name}</h4>
                    <Link href={tool.href} className='text-main font-semibold text-sm flex items-center gap-1 transition-all duration-300 hover:text-hover'>
                      进入 <ArrowRight className='w-4 h-4' />
                    </Link>
                  </div>
                  <p className='text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed w-full whitespace-nowrap overflow-hidden text-ellipsis'>
                    {tool.description}
                  </p>

                  <div className='h-32 bg-slate-100 dark:bg-slate-800 rounded-lg w-full flex items-center justify-center text-slate-300 dark:text-slate-600 text-xs overflow-hidden'>
                    {tool.previewImage ? (
                      <div className='w-full h-full flex items-center justify-center text-slate-400'>
                        {/* Use next/image if real image, for now text placeholder or maybe valid image tag if user provides src later */}
                        IMG PREVIEW
                      </div>
                    ) : (
                      'IMG PREVIEW'
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* New Feature Section (Snippet Manager) */}
      <section className='py-24 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-gray-900'>
        <div className='container mx-auto px-6'>
          <div className='flex flex-col lg:flex-row items-center gap-16'>
            <div className='w-full lg:w-1/2'>
              <div className='relative group'>
                <div className='absolute -inset-4 bg-linear-to-r from-main to-blue-600 opacity-20 blur-2xl group-hover:opacity-30 transition-opacity'></div>
                <div className='relative rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 min-h-[300px] flex items-center justify-center text-slate-400'>
                  <Code className='w-16 h-16' />
                </div>
              </div>
            </div>
            <div className='w-full lg:w-1/2'>
              <span className='text-main font-bold text-sm uppercase tracking-widest mb-4 block'>New Feature</span>
              <h3 className='text-4xl font-bold mb-6 text-slate-900 dark:text-white'>Snippet Manager Pro</h3>
              <p className='text-slate-600 dark:text-slate-400 text-lg mb-8 leading-relaxed'>
                Organize your most-used code blocks across all your projects. Sync with your workspace, share with your team, and access via a lightweight CLI
                tool.
              </p>
              <div className='flex flex-wrap gap-3 mb-10'>
                <span className='px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-medium text-slate-600 dark:text-slate-300'>Cloud Sync</span>
                <span className='px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-medium text-slate-600 dark:text-slate-300'>
                  Team Library
                </span>
                <span className='px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-medium text-slate-600 dark:text-slate-300'>
                  Markdown Ready
                </span>
              </div>
              <div className='flex gap-4'>
                <button className='bg-main text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/30 transition-all'>Try Demo</button>
                <button className='border border-slate-200 dark:border-slate-700 px-6 py-3 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300'>
                  Documentation
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
