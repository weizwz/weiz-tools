'use client'

import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { type Tool } from '@/data/tools'
import { useToolI18n } from '@/lib/i18n'
import { Pin, ArrowUpRight } from 'lucide-react'
import { useState, useEffect } from 'react'

interface ToolCardProps {
  tool: Tool
}

const dotColorMap: Record<Tool['color'], string> = {
  yellow: 'bg-amber-400',
  cyan: 'bg-sky-400',
  magenta: 'bg-violet-400',
  white: 'bg-slate-400'
}

export function ToolCard({ tool }: ToolCardProps) {
  const { name, description } = useToolI18n(tool.id)
  const [isPinned, setIsPinned] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('pinnedTools')
    if (!saved) return
    Promise.resolve().then(() => {
      try {
        const pinnedTools = JSON.parse(saved)
        setIsPinned(pinnedTools.includes(tool.id))
      } catch {
        // ignore storage errors
      }
    })
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
    <div className='relative group h-full'>
      <button
        type='button'
        onClick={togglePin}
        aria-label='Pin tool'
        className={`absolute top-3.5 right-3.5 z-10 p-1.5 rounded-lg transition-all cursor-pointer ${
          isPinned
            ? 'bg-main text-white shadow-xs'
            : 'bg-muted/70 text-muted-foreground hover:text-main hover:bg-main-soft opacity-0 group-hover:opacity-100'
        }`}>
        <Pin className={`w-3.5 h-3.5 ${isPinned ? 'fill-current' : ''}`} />
      </button>

      <Link href={tool.href} className='block h-full'>
        <Card className='card-style cursor-pointer overflow-hidden h-full py-0'>
          <CardHeader className='space-y-3 p-5'>
            <div className='flex items-center justify-between'>
              <div className='w-10 h-10 rounded-xl bg-main-soft text-main flex items-center justify-center text-lg font-bold uppercase'>
                {name.charAt(0)}
              </div>
              <span className={`w-2 h-2 rounded-full ${dotColorMap[tool.color]} opacity-70 group-hover:opacity-100 transition-opacity`} />
            </div>
            <div>
              <CardTitle className='text-foreground text-base font-semibold mb-1.5 flex items-center gap-1 group-hover:text-main transition-colors'>
                <span className='truncate'>{name}</span>
                <ArrowUpRight className='w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0' />
              </CardTitle>
              <CardDescription className='text-muted-foreground text-xs leading-relaxed line-clamp-2'>{description}</CardDescription>
            </div>
          </CardHeader>
        </Card>
      </Link>
    </div>
  )
}
