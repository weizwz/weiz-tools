'use client'

import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { type Tool } from '@/data/tools'
import { useToolI18n } from '@/lib/i18n'
import { Pin } from 'lucide-react'
import { useState, useEffect } from 'react'

interface ToolCardProps {
  tool: Tool
}

export function ToolCard({ tool }: ToolCardProps) {
  const { name, description } = useToolI18n(tool.id)
  const [isPinned, setIsPinned] = useState(false)

  useEffect(() => {
    const loadPinStatus = () => {
      const saved = localStorage.getItem('pinnedTools')
      if (saved) {
        try {
          const pinnedTools = JSON.parse(saved)
          setIsPinned(pinnedTools.includes(tool.id))
        } catch (e) {
          console.error('Failed to load pin status:', e)
        }
      }
    }
    loadPinStatus()
  }, [tool.id])

  const togglePin = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const saved = localStorage.getItem('pinnedTools')
    const pinnedTools = saved ? JSON.parse(saved) : []
    const newPinned = pinnedTools.includes(tool.id) ? pinnedTools.filter((id: string) => id !== tool.id) : [...pinnedTools, tool.id]
    localStorage.setItem('pinnedTools', JSON.stringify(newPinned))
    setIsPinned(!isPinned)
  }

  return (
    <div className='relative group'>
      {/* 置顶按钮 */}
      <button
        onClick={togglePin}
        className={`absolute top-3 right-3 z-10 p-2 rounded-lg transition-all ${
          isPinned ? 'bg-main text-white shadow-lg' : 'bg-white/80 dark:bg-slate-800/80 text-slate-400 hover:text-main opacity-0 group-hover:opacity-100'
        }`}>
        <Pin className={`w-4 h-4 ${isPinned ? 'fill-current' : ''}`} />
      </button>

      <Link href={tool.href} className='block h-full'>
        <Card className='card-style cursor-pointer overflow-hidden h-full group hover:shadow-xl hover:border-main/50 transition-all duration-300'>
          <CardHeader className='space-y-4 p-6'>
            <div className='flex items-center justify-between'>
              <div className='text-4xl font-bold group-hover:scale-110 transition-transform duration-300 uppercase'>{name.charAt(0)}</div>
              <div className={`w-2 h-2 rounded-full bg-${tool.color}-400 opacity-0 group-hover:opacity-100 transition-opacity`} />
            </div>
            <div>
              <CardTitle className='text-gray-900 dark:text-white text-lg font-bold mb-2 group-hover:text-main transition-colors'>{name}</CardTitle>
              <CardDescription className='text-gray-500 dark:text-gray-400 text-sm leading-relaxed'>{description}</CardDescription>
            </div>
          </CardHeader>
        </Card>
      </Link>
    </div>
  )
}
