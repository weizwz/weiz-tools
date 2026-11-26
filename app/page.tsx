/* eslint-disable @next/next/no-img-element */
'use client'

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import Link from 'next/link'
import { Search, Pin, X, ArrowRight, Sparkles } from 'lucide-react'
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

      {/* Hero Section */}
      <section className='pt-24 pb-10 bg-card border-b border-border'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6'>
          <div className='flex flex-col lg:flex-row gap-10 items-start lg:items-center'>
            {/* 左侧：标语、搜索栏、热门工具 */}
            <div className='w-full lg:w-7/12'>
              <div className='mb-6'>
                <div className='inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-main-soft text-main text-xs font-semibold mb-3'>
                  <Sparkles className='w-3.5 h-3.5' />
                  <span>{t.home.heroTag}</span>
                </div>
                <h1 className='text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3 leading-tight'>{t.home.heroTitle}</h1>
                <p className='text-muted-foreground text-sm sm:text-base leading-relaxed max-w-xl'>{t.home.heroDescription}</p>
              </div>

              {/* 搜索栏 */}
              <div className='relative mb-6 max-w-xl'>
                <Search className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
                <input
                  ref={searchInputRef}
                  type='text'
                  placeholder={t.home.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='w-full pl-10 pr-14 py-3 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-main/30 focus:border-main transition-all'
                />
                {searchQuery ? (
                  <button
                    type='button'
                    onClick={() => setSearchQuery('')}
                    aria-label='Clear search'
                    className='absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer'>
                    <X className='w-4 h-4' />
                  </button>
                ) : (
                  <kbd className='hidden sm:inline-flex absolute right-3 top-1/2 -translate-y-1/2 items-center px-1.5 py-0.5 text-[11px] font-mono text-muted-foreground bg-muted border border-border rounded'>
                    /
                  </kbd>
                )}
              </div>

              {/* 常用工具 */}
              <div className='flex flex-wrap items-center gap-2'>
                <span className='text-xs font-medium text-muted-foreground mr-1'>{t.home.popularTools}:</span>
                {popularTools.map((tool) => {
                  const toolName = t.tools[tool.id]?.name || tool.name
                  return (
                    <Link
                      key={tool.id}
                      href={tool.href}
                      className='inline-flex items-center px-2.5 py-1 rounded-lg bg-muted/70 hover:bg-main-soft text-xs font-medium text-muted-foreground hover:text-main border border-transparent hover:border-main/20 transition-colors'>
                      {toolName}
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* 右侧：精选推荐 */}
            <div className='w-full lg:w-5/12'>
              <div className='space-y-2.5'>
                {recommendedProjects.map((project) => {
                  const toolLocale = t.tools[project.id]
                  const projectName = toolLocale?.name || project.name
                  const projectDesc = toolLocale?.description || project.description

                  return (
                    <Link key={project.id} href={project.href} className='block group'>
                      <div className='flex items-center gap-3.5 p-3 bg-background rounded-xl border border-border hover:border-main/40 hover:bg-card hover:shadow-sm transition-all'>
                        <div className='w-14 h-14 shrink-0 rounded-md bg-card border border-border overflow-hidden flex items-center justify-center'>
                          <img
                            src={project.previewImage}
                            alt={projectName}
                            className='w-full h-full object-contain group-hover:scale-120 transition-transform duration-200'
                          />
                        </div>
                        <div className='flex-1 min-w-0'>
                          <h3 className='font-semibold text-sm text-foreground group-hover:text-main transition-colors truncate'>{projectName}</h3>
                          <p className='text-xs text-muted-foreground line-clamp-1 mt-0.5'>{projectDesc}</p>
                        </div>
                        <ArrowRight className='w-4 h-4 text-muted-foreground group-hover:text-main group-hover:translate-x-0.5 transition-all shrink-0 mr-1' />
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 工具列表区 */}
      <section id='all-tools' className='flex-1 py-10'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6'>
          {/* 标题与分类胶囊 */}
          <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6'>
            <div className='flex items-baseline gap-2.5'>
              <h2 className='text-xl font-bold text-foreground'>{t.home.allTools}</h2>
              <span className='text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full'>{filteredTools.length}</span>
            </div>

            <div className='flex items-center gap-1.5 overflow-x-auto pb-1'>
              {categories.map((category) => {
                const isActive = selectedCategory === category
                return (
                  <button
                    key={category}
                    type='button'
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                      isActive ? 'bg-main text-white shadow-xs' : 'bg-card text-muted-foreground border border-border hover:text-foreground hover:bg-muted/60'
                    }`}>
                    {category === '首页' ? '全部' : category}
                  </button>
                )
              })}
            </div>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
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
                    className={`absolute top-3.5 right-3.5 z-10 p-1.5 rounded-lg transition-all cursor-pointer ${
                      isPinned
                        ? 'bg-main text-white shadow-xs'
                        : 'bg-muted/80 text-muted-foreground hover:text-main hover:bg-main-soft opacity-0 group-hover:opacity-100'
                    }`}
                    title={t.home.pinTool}
                    aria-label={t.home.pinTool}>
                    <Pin className={`w-3.5 h-3.5 ${isPinned ? 'fill-current' : ''}`} />
                  </button>

                  <Link href={tool.href} className='block h-full'>
                    <div className='card-style p-5 h-full flex flex-col justify-between gap-4'>
                      <div className='flex items-start gap-3.5 pr-7'>
                        <div className='w-11 h-11 shrink-0 rounded-sm bg-muted/60 border border-border flex items-center justify-center overflow-hidden'>
                          <img
                            src={tool.previewImage}
                            alt={toolName}
                            className='w-full h-full object-contain group-hover:scale-120 transition-transform duration-200'
                          />
                        </div>
                        <div className='min-w-0'>
                          <h3 className='text-sm font-semibold text-foreground group-hover:text-main transition-colors truncate'>{toolName}</h3>
                          <p className='text-xs text-muted-foreground line-clamp-2 mt-1 leading-relaxed'>{toolDesc}</p>
                        </div>
                      </div>

                      <div className='flex items-center justify-between pt-2 border-t border-border/60'>
                        <span className='text-[11px] font-medium text-muted-foreground bg-muted/70 px-2 py-0.5 rounded-md'>{tool.category}</span>
                        <span className='text-xs font-medium text-main opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-0.5'>
                          使用 <ArrowRight className='w-3 h-3' />
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>

          {filteredTools.length === 0 && (
            <div className='text-center py-16 bg-card rounded-xl border border-border'>
              <p className='text-sm text-muted-foreground'>{t.home.noMatchTools}</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
