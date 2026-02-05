'use client'

import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { type Tool } from '@/data/tools'

interface ToolCardProps {
  tool: Tool
}

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link href={tool.href}>
      <Card className='card-style cursor-pointer overflow-hidden h-full group'>
        <CardHeader className='space-y-4 p-6'>
          <div className='flex items-center justify-between'>
            <div className='text-4xl font-bold group-hover:scale-110 transition-transform duration-300 uppercase'>{tool.name.charAt(0)}</div>
            <div className={`w-2 h-2 rounded-full bg-${tool.color}-400 opacity-0 group-hover:opacity-100 transition-opacity`} />
          </div>
          <div>
            <CardTitle className='text-gray-900 text-lg font-bold mb-2 group-hover:text-main transition-colors'>{tool.name}</CardTitle>
            <CardDescription className='text-gray-500 text-sm leading-relaxed'>{tool.description}</CardDescription>
          </div>
        </CardHeader>
      </Card>
    </Link>
  )
}
