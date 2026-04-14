'use client'

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import Link from 'next/link'
import { Search, Pin, X } from 'lucide-react'
import { tools } from '@/data/tools'
import { useI18n } from '@/lib/i18n'
import { useState, useEffect } from 'react'
import { Badge } from '@/components/ui/badge'

// 推荐项目数据
const recommendedProjects = [
  {
    id: 1,
    title: '工具 1',
    description: '简洁、快速、一键即用的工具，提升、日工、用体。',
    image: '/previews/tool1.png'
  },
  {
    id: 2,
    title: '工具 2',
    description: '简洁、快速、一键即用的工具，提升、日工、用体。',
    image: '/previews/tool2.png'
  },
  {
    id: 3,
    title: '工具 3',
    description: '简洁、快速、一键即用的工具，提升、日工、用体。',
    image: '/previews/tool3.png'
  }
]

export default function Home() {
  const { t } = useI18n()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('首页')
  const [pinnedTools, setPinnedTools] = useState<string[]>([])

  // 监听分类筛选事件
  useEffect(() => {
    const handleFilterCategory = (e: Event) => {
      const customEvent = e as CustomEvent
      setSelectedCategory(customEvent.detail)
    }
    window.addEventListener('filterCategory', handleFilterCategory)
    return () => window.removeEventListener('filterCategory', handleFilterCategory)
  }, [])

  // 从 localStorage 加载置顶工具
  useEffect(() => {
    const loadPinnedTools = () => {
      const saved = localStorage.getItem('pinnedTools')
      if (saved) {
        try {
          setPinnedTools(JSON.parse(saved))
        } catch (e) {
          console.error('Failed to load pinned tools:', e)
        }
      }
    }
    loadPinnedTools()
  }, [])

  // 切换置顶状态
  const togglePin = (toolId: string) => {
    const newPinned = pinnedTools.includes(toolId) ? pinnedTools.filter((id) => id !== toolId) : [...pinnedTools, toolId]
    setPinnedTools(newPinned)
    localStorage.setItem('pinnedTools', JSON.stringify(newPinned))
  }

  // 筛选工具
  const filteredTools = tools
    .filter((tool) => {
      const matchesSearch =
        searchQuery === '' || tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || tool.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === '首页' || selectedCategory === '全部' || tool.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      const aPin = pinnedTools.includes(a.id) ? 1 : 0
      const bPin = pinnedTools.includes(b.id) ? 1 : 0
      return bPin - aPin
    })

  // 热门工具（前5个）
  const popularTools = tools.slice(0, 5)

  return (
    <div className='min-h-screen bg-slate-50 dark:bg-slate-900'>
      <Navbar />

      {/* 第一模块：Hero Section */}
      <section className='pt-24 pb-16 bg-white dark:bg-slate-900'>
        <div className='container mx-auto px-6'>
          <div className='flex flex-col lg:flex-row gap-12 items-start'>
            {/* 左侧：标语、搜索栏、热门工具 */}
            <div className='flex-1 w-full lg:w-1/2'>
              {/* 网站标语 */}
              <div className='mb-8'>
                <p className='text-sm text-main font-semibold mb-2 uppercase tracking-wider'>TINYASH TOOLBOX</p>
                <h1 className='text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white leading-tight'>
                  一站式实用工
                  <br />
                  具工作台
                </h1>
                <p className='text-slate-600 dark:text-slate-400 text-base leading-relaxed'>
                  整体实用工具，提升开发效率。探索、交流、提升您的技能，让工作更加高效便捷。
                </p>
              </div>

              {/* 搜索栏 */}
              <div className='relative mb-8'>
                <Search className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400' />
                <input
                  type='text'
                  placeholder={t.home.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='w-full pl-12 pr-12 py-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-main/50 transition-all'
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className='absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'>
                    <X className='w-5 h-5' />
                  </button>
                )}
              </div>

              {/* 使用量最多的工具 */}
              <div>
                <p className='text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3'>{t.home.popularTools}</p>
                <div className='flex flex-wrap gap-2'>
                  {popularTools.map((tool) => {
                    const toolLocale = t.tools[tool.id]
                    const toolName = toolLocale?.name || tool.name
                    return (
                      <Link key={tool.id} href={tool.href}>
                        <Badge variant='secondary' className='cursor-pointer hover:bg-main hover:text-white transition-colors px-3 py-1.5'>
                          {toolName}
                        </Badge>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* 右侧：推荐项目 */}
            <div className='flex-1 w-full lg:w-1/2'>
              <div className='space-y-4'>
                {recommendedProjects.map((project) => (
                  <div
                    key={project.id}
                    className='flex gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all cursor-pointer group'>
                    {/* 项目截图 */}
                    <div className='w-24 h-24 shrink-0 bg-slate-200 dark:bg-slate-700 rounded-lg overflow-hidden flex items-center justify-center'>
                      <div className='w-16 h-16 bg-linear-to-br from-main to-blue-600 rounded-lg opacity-20 group-hover:opacity-40 transition-opacity' />
                    </div>
                    {/* 项目信息 */}
                    <div className='flex-1 min-w-0'>
                      <h3 className='font-bold text-lg text-slate-900 dark:text-white mb-1 group-hover:text-main transition-colors'>{project.title}</h3>
                      <p className='text-sm text-slate-600 dark:text-slate-400 line-clamp-2'>{project.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 第二模块：所有工具 */}
      <section id='all-tools' className='py-16 bg-slate-50 dark:bg-slate-900/50'>
        <div className='container mx-auto px-6'>
          <div className='flex justify-between items-center mb-8'>
            <h2 className='text-2xl font-bold text-slate-900 dark:text-white'>{t.home.allTools}</h2>
            <p className='text-sm text-slate-500'>
              {filteredTools.length} {selectedCategory !== '首页' && selectedCategory !== '全部' && `· ${selectedCategory}`}
            </p>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6'>
            {filteredTools.map((tool) => {
              const toolLocale = t.tools[tool.id]
              const toolName = toolLocale?.name || tool.name
              const toolDesc = toolLocale?.description || tool.description
              const isPinned = pinnedTools.includes(tool.id)

              return (
                <div key={tool.id} className='relative group'>
                  {/* 置顶按钮 */}
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      togglePin(tool.id)
                    }}
                    className={`absolute top-3 right-3 z-10 p-2 rounded-lg transition-all ${
                      isPinned ? 'bg-main text-white shadow-lg' : 'bg-white/80 dark:bg-slate-800/80 text-slate-400 hover:text-main'
                    }`}
                    title={t.home.pinTool}>
                    <Pin className={`w-4 h-4 ${isPinned ? 'fill-current' : ''}`} />
                  </button>

                  {/* 工具卡片 */}
                  <Link href={tool.href} className='block h-full'>
                    <div className='bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:border-main/50 transition-all duration-300 h-full flex flex-col'>
                      <div className='flex-1'>
                        <h3 className='text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-main transition-colors'>{toolName}</h3>
                        <p className='text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2'>{toolDesc}</p>
                      </div>

                      {/* 工具预览区域 */}
                      <div className='mt-4 h-24 bg-slate-100 dark:bg-slate-700/50 rounded-lg flex items-center justify-center overflow-hidden'>
                        <div className='w-12 h-12 bg-linear-to-br from-main to-blue-600 rounded-lg opacity-20 group-hover:opacity-40 transition-opacity' />
                      </div>
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>

          {filteredTools.length === 0 && (
            <div className='text-center py-16'>
              <p className='text-slate-500 dark:text-slate-400'>未找到匹配的工具</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
