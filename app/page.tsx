/* eslint-disable @next/next/no-img-element */
'use client'

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import Link from 'next/link'
import { Search, Pin, X, ArrowUpRight, RotateCcw } from 'lucide-react'
import { tools, categories } from '@/data/tools'
import { useI18n } from '@/lib/i18n'
import { useState, useEffect, useRef } from 'react'

const recommendedProjectIds = ['oppo-widget-cover', 'markdown-to-wechat', 'json-formatter']

export default function Home() {
  const { t } = useI18n()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('首页')
  const [pinnedTools, setPinnedTools] = useState<string[]>([])
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleFilterCategory = (e: Event) => {
      const customEvent = e as CustomEvent
      setSelectedCategory(customEvent.detail)
    }
    window.addEventListener('filterCategory', handleFilterCategory)
    return () => window.removeEventListener('filterCategory', handleFilterCategory)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault()
        searchInputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem('pinnedTools')
    if (!saved) return
    Promise.resolve().then(() => {
      try {
        setPinnedTools(JSON.parse(saved))
      } catch {
        // ignore storage errors
      }
    })
  }, [])

  const togglePin = (toolId: string) => {
    const newPinned = pinnedTools.includes(toolId) ? pinnedTools.filter((id) => id !== toolId) : [...pinnedTools, toolId]
    setPinnedTools(newPinned)
    localStorage.setItem('pinnedTools', JSON.stringify(newPinned))
  }

  const filteredTools = tools
    .filter((tool) => {
      const toolLocale = t.tools[tool.id]
      const name = (toolLocale?.name || tool.name).toLowerCase()
      const desc = (toolLocale?.description || tool.description).toLowerCase()
      const q = searchQuery.trim().toLowerCase()
      const matchesSearch = q === '' || name.includes(q) || desc.includes(q)
      const matchesCategory = selectedCategory === '首页' || selectedCategory === '全部' || tool.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      const aPin = pinnedTools.includes(a.id) ? 1 : 0
      const bPin = pinnedTools.includes(b.id) ? 1 : 0
      return bPin - aPin
    })

  const popularTools = tools.slice(0, 5)
  const recommendedProjects = recommendedProjectIds.map((id) => tools.find((item) => item.id === id)).filter(Boolean) as typeof tools

  return (
    <div className='min-h-screen flex flex-col bg-background'>
      <Navbar />

      <section className='relative pt-24 pb-12 border-b border-border overflow-hidden bg-background'>
        <div
          aria-hidden='true'
          className='pointer-events-none absolute inset-0 geist-grid-bg opacity-45 mask-[radial-gradient(ellipse_80%_75%_at_50%_20%,#000_30%,transparent_100%)]'
        />

        <div className='relative max-w-7xl mx-auto px-4 sm:px-6'>
          <div className='relative border border-border bg-background/95 backdrop-blur-xs rounded-lg p-6 sm:p-8 lg:p-10'>
            <span aria-hidden='true' className='absolute -top-2.5 -left-1.5 font-mono text-sm text-muted-foreground/60 select-none'>
              +
            </span>
            <span aria-hidden='true' className='absolute -top-2.5 -right-1.5 font-mono text-sm text-muted-foreground/60 select-none'>
              +
            </span>
            <span aria-hidden='true' className='absolute -bottom-2.5 -left-1.5 font-mono text-sm text-muted-foreground/60 select-none'>
              +
            </span>
            <span aria-hidden='true' className='absolute -bottom-2.5 -right-1.5 font-mono text-sm text-muted-foreground/60 select-none'>
              +
            </span>

            <div className='flex flex-col lg:flex-row gap-10 lg:gap-12 items-start lg:items-center'>
              <div className='w-full lg:w-7/12'>
                <div className='mb-6'>
                  <div className='inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-secondary border border-border text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-4'>
                    <span className='w-1.5 h-1.5 rounded-full bg-main' />
                    <span>{t.home.heroTag}</span>
                  </div>
                  <h1 className='text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-[-0.04em] text-foreground mb-3 leading-[1.1]'>{t.home.heroTitle}</h1>
                  <p className='text-muted-foreground text-sm sm:text-base leading-relaxed max-w-xl'>{t.home.heroDescription}</p>
                </div>

                <div className='relative mb-5 max-w-xl group'>
                  <Search className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-foreground transition-colors' />
                  <input
                    ref={searchInputRef}
                    type='text'
                    placeholder={t.home.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className='w-full pl-10 pr-12 py-2.5 rounded-md border border-border bg-secondary/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:bg-background focus:border-foreground/50 focus:ring-2 focus:ring-foreground/10 transition-all'
                  />
                  {searchQuery ? (
                    <button
                      type='button'
                      onClick={() => setSearchQuery('')}
                      aria-label='Clear search'
                      className='absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-sm text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer transition-colors'>
                      <X className='w-3.5 h-3.5' />
                    </button>
                  ) : (
                    <kbd className='hidden sm:inline-flex absolute right-2.5 top-1/2 -translate-y-1/2 items-center justify-center min-w-5 h-5 px-1.5 text-[11px] font-mono text-muted-foreground bg-background border border-border rounded-sm'>
                      /
                    </kbd>
                  )}
                </div>

                <div className='flex flex-wrap items-center gap-1.5'>
                  <span className='text-[11px] font-mono uppercase tracking-wider text-muted-foreground mr-1'>{t.home.popularTools}</span>
                  {popularTools.map((tool) => {
                    const toolName = t.tools[tool.id]?.name || tool.name
                    return (
                      <Link
                        key={tool.id}
                        href={tool.href}
                        className='inline-flex items-center px-2.5 py-1 rounded-md bg-secondary hover:bg-muted text-xs font-medium text-muted-foreground hover:text-foreground border border-border transition-colors'>
                        {toolName}
                      </Link>
                    )
                  })}
                </div>
              </div>

              <div className='w-full lg:w-5/12'>
                <div className='rounded-md border border-border bg-secondary/40 overflow-hidden'>
                  <div className='flex items-center justify-between px-3.5 py-2.5 border-b border-border bg-secondary/80'>
                    <span className='text-[11px] font-mono uppercase tracking-wider text-muted-foreground'>{t.home.recommendedProjects}</span>
                    <span className='text-[11px] font-mono text-muted-foreground tabular-nums'>0{recommendedProjects.length}</span>
                  </div>
                  <div className='divide-y divide-border'>
                    {recommendedProjects.map((project, idx) => {
                      const toolLocale = t.tools[project.id]
                      const projectName = toolLocale?.name || project.name
                      const projectDesc = toolLocale?.description || project.description

                      return (
                        <Link key={project.id} href={project.href} className='block group'>
                          <div className='flex items-center gap-3 px-3.5 py-3 bg-background hover:bg-secondary/70 transition-colors'>
                            <span className='text-[11px] font-mono text-muted-foreground/70 tabular-nums w-4 shrink-0'>0{idx + 1}</span>
                            <div className='w-10 h-10 shrink-0 rounded-md bg-secondary border border-border overflow-hidden flex items-center justify-center p-1'>
                              <img src={project.previewImage} alt={projectName} className='w-full h-full object-contain' />
                            </div>
                            <div className='flex-1 min-w-0'>
                              <h3 className='font-medium text-sm text-foreground group-hover:text-main transition-colors truncate'>{projectName}</h3>
                              <p className='text-xs text-muted-foreground line-clamp-1 mt-0.5'>{projectDesc}</p>
                            </div>
                            <ArrowUpRight className='w-4 h-4 text-muted-foreground/60 group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0' />
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id='all-tools' className='flex-1 py-10 sm:py-12'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6'>
          <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-border'>
            <div className='flex items-center gap-2.5'>
              <h2 className='text-lg font-semibold tracking-[-0.02em] text-foreground'>{t.home.allTools}</h2>
              <span className='text-xs font-mono text-muted-foreground bg-secondary border border-border px-2 py-0.5 rounded-full tabular-nums'>
                {filteredTools.length}
              </span>
            </div>

            <div className='flex items-center gap-1 overflow-x-auto pb-1 no-scrollbar'>
              {categories.map((category) => {
                const isActive = selectedCategory === category
                return (
                  <button
                    key={category}
                    type='button'
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                      isActive ? 'bg-foreground text-background' : 'bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}>
                    {category === '首页' ? '全部' : category}
                  </button>
                )
              })}
            </div>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5'>
            {filteredTools.map((tool) => {
              const toolLocale = t.tools[tool.id]
              const toolName = toolLocale?.name || tool.name
              const toolDesc = toolLocale?.description || tool.description
              const isPinned = pinnedTools.includes(tool.id)

              return (
                <div key={tool.id} className='relative group'>
                  <button
                    type='button'
                    onClick={(e) => {
                      e.preventDefault()
                      togglePin(tool.id)
                    }}
                    className={`absolute top-3.5 right-3.5 z-10 p-1.5 rounded-md border transition-all cursor-pointer ${
                      isPinned
                        ? 'bg-foreground text-background border-foreground'
                        : 'bg-background text-muted-foreground border-border hover:text-foreground hover:border-foreground/40 opacity-0 group-hover:opacity-100'
                    }`}
                    title={t.home.pinTool}
                    aria-label={t.home.pinTool}>
                    <Pin className={`w-3 h-3 ${isPinned ? 'fill-current' : ''}`} />
                  </button>

                  <Link href={tool.href} className='block h-full'>
                    <div className='card-style p-4 sm:p-5 h-full flex flex-col justify-between gap-5'>
                      <div className='flex items-start gap-3 pr-7'>
                        <div className='w-10 h-10 shrink-0 rounded-md bg-secondary border border-border flex items-center justify-center overflow-hidden p-1.5'>
                          <img src={tool.previewImage} alt={toolName} className='w-full h-full object-contain' />
                        </div>
                        <div className='min-w-0'>
                          <h3 className='text-sm font-semibold tracking-[-0.01em] text-foreground truncate'>{toolName}</h3>
                          <p className='text-xs text-muted-foreground line-clamp-2 mt-1 leading-relaxed'>{toolDesc}</p>
                        </div>
                      </div>

                      <div className='flex items-center justify-between pt-3 border-t border-border'>
                        <span className='text-[11px] font-mono text-muted-foreground'>{tool.category}</span>
                        <ArrowUpRight className='w-3.5 h-3.5 text-muted-foreground/50 group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all' />
                      </div>
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>

          {filteredTools.length === 0 && (
            <div className='text-center py-16 px-4 bg-secondary/30 rounded-lg border border-border'>
              <p className='text-sm text-muted-foreground mb-4'>{t.home.noMatchTools}</p>
              <button
                type='button'
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('首页')
                }}
                className='inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-medium bg-foreground text-background hover:opacity-90 transition-opacity cursor-pointer'>
                <RotateCcw className='w-3.5 h-3.5' />
                <span>重置筛选</span>
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
