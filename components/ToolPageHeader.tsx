'use client'

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
      <h1 className='text-3xl font-bold tracking-tight text-foreground mb-3'>{name}</h1>
      <p className='text-base sm:text-lg text-muted-foreground mb-5 max-w-2xl mx-auto'>{description}</p>

      {tool.tags && tool.tags.length > 0 && (
        <div className='flex flex-wrap gap-2 justify-center'>
          {tool.tags.map((tag) => (
            <Badge key={tag} variant='secondary' className='px-3 py-1 text-xs bg-card border border-border text-muted-foreground'>
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
