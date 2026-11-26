'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Tool } from '@/data/tools'
import { useToolI18n } from '@/lib/i18n'

interface ToolPageHeaderProps {
  tool: Tool
}

export function ToolPageHeader({ tool }: ToolPageHeaderProps) {
  const { name, description } = useToolI18n(tool.id)

  return (
    <div className='mb-10 text-center'>
      <div className='mb-5'>
        <Link
          href='/'
          className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary hover:bg-muted text-xs font-mono text-muted-foreground hover:text-foreground border border-border transition-colors'>
          <ArrowLeft className='w-3 h-3' />
          <span>{tool.category}</span>
        </Link>
      </div>
      <h1 className='text-3xl sm:text-4xl font-bold tracking-[-0.04em] text-foreground mb-3'>{name}</h1>
      <p className='text-sm sm:text-base text-muted-foreground mb-5 max-w-2xl mx-auto leading-relaxed'>{description}</p>

      {tool.tags && tool.tags.length > 0 && (
        <div className='flex flex-wrap gap-1.5 justify-center'>
          {tool.tags.map((tag) => (
            <Badge
              key={tag}
              variant='secondary'
              className='px-2.5 py-0.5 text-[11px] font-mono bg-secondary border border-border text-muted-foreground rounded-md'>
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
