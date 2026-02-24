'use client'

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import Link from 'next/link'
import { ArrowRight, Code } from 'lucide-react'
import { tools } from '@/data/tools'
import { useI18n } from '@/lib/i18n'

export default function Home() {
  const { t } = useI18n()

  return (
    <div className='min-h-screen'>
      <Navbar />

      {/* Hero Section */}
      <section className='relative pt-32 pb-20 overflow-hidden bg-[radial-gradient(var(--pattern-fg)_1px,transparent_0)] bg-size-[10px_10px] bg-fixed [--pattern-fg:var(--color-gray-950)]/5 dark:[--pattern-fg:var(--color-white)]/10'>
        <div className='absolute inset-0 hero-pattern opacity-10 dark:opacity-5'></div>
        <div className='container mx-auto px-6 text-center relative z-10'>
          <h1 className='text-6xl md:text-8xl font-extrabold tracking-tighter mb-4 text-slate-900 dark:text-white'>{t.home.heroTitle}</h1>
          <h2 className='text-4xl md:text-6xl font-extrabold tracking-tighter mb-8 gradient-text'>{t.home.heroSubtitle}</h2>
          <p className='max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400 mb-10'>{t.home.heroDescription}</p>
          <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
            <button
              className='bg-main cursor-pointer text-white px-8 py-3.5 rounded-full font-bold shadow-lg shadow-blue-500/20 hover:scale-105 transition-transform'
              onClick={() => document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' })}>
              {t.home.exploreAll}
            </button>
          </div>
        </div>
      </section>

      {/* New Feature Section (Snippet Manager) */}
      <section className='py-24 bg-slate-50 dark:bg-slate-900/50'>
        <div className='container mx-auto px-6'>
          <div className='flex flex-col lg:flex-row items-center gap-16'>
            <div className='w-full lg:w-1/2'>
              <div className='relative group'>
                <div className='relative rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 min-h-[300px] flex items-center justify-center text-slate-400'>
                  <Code className='w-16 h-16' />
                </div>
              </div>
            </div>
            <div className='w-full lg:w-1/2'>
              <span className='text-main font-bold text-sm uppercase tracking-widest mb-4 block'>{t.home.newFeature}</span>
              <h3 className='text-4xl font-bold mb-6 text-slate-900 dark:text-white'>{t.home.snippetTitle}</h3>
              <p className='text-slate-600 dark:text-slate-400 text-lg mb-8 leading-relaxed'>{t.home.snippetDesc}</p>
              <div className='flex flex-wrap gap-3 mb-10'>
                <span className='px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-medium text-slate-600 dark:text-slate-300'>
                  {t.home.cloudSync}
                </span>
                <span className='px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-medium text-slate-600 dark:text-slate-300'>
                  {t.home.teamLibrary}
                </span>
                <span className='px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-medium text-slate-600 dark:text-slate-300'>
                  {t.home.markdownReady}
                </span>
              </div>
              <div className='flex gap-4'>
                <button className='bg-main text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/30 transition-all'>
                  {t.home.tryDemo}
                </button>
                <button className='border border-slate-200 dark:border-slate-700 px-6 py-3 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-300'>
                  {t.home.documentation}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tools Section */}
      <section id='featured' className='py-20 bg-white dark:bg-gray-900/50'>
        <div className='container mx-auto px-6'>
          <div className='flex justify-between items-end mb-12'>
            <div>
              <h3 className='text-3xl font-bold mb-2 text-slate-900 dark:text-white'>{t.home.featuredTools}</h3>
              <p className='text-slate-500'>{t.home.featuredToolsDesc}</p>
            </div>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8'>
            {tools.map((tool) => {
              const toolLocale = t.tools[tool.id]
              const toolName = toolLocale?.name || tool.name
              const toolDesc = toolLocale?.description || tool.description
              return (
                <div
                  key={tool.id}
                  className='group bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-md shadow-slate-200 dark:shadow-slate-600 hover:shadow-xl transition-all duration-300'>
                  <div className='flex justify-between items-center gap-4 mb-4'>
                    <h4 className='text-xl font-bold'>{toolName}</h4>
                    <Link href={tool.href} className='text-main font-semibold text-sm flex items-center gap-1 transition-all duration-300 hover:text-hover'>
                      {t.common.enter} <ArrowRight className='w-4 h-4' />
                    </Link>
                  </div>
                  <p className='text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed w-full whitespace-nowrap overflow-hidden text-ellipsis'>
                    {toolDesc}
                  </p>

                  <div className='h-32 bg-slate-100 dark:bg-slate-800 rounded-lg w-full flex items-center justify-center text-slate-300 dark:text-slate-600 text-xs overflow-hidden'>
                    {tool.previewImage ? (
                      <div className='w-full h-full flex items-center justify-center text-slate-400'>{t.home.imgPreview}</div>
                    ) : (
                      t.home.imgPreview
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
