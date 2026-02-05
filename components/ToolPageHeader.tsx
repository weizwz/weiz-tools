import { Badge } from '@/components/ui/badge'
import { Tool } from '@/data/tools'

interface ToolPageHeaderProps {
  tool: Tool
}

export function ToolPageHeader({ tool }: ToolPageHeaderProps) {
  return (
    <div className='mb-12 text-center'>
      <h1 className='text-3xl font-bold text-gray-900 mb-4'>{tool.name}</h1>
      <p className='text-xl text-gray-500 mb-6 max-w-2xl mx-auto'>{tool.description}</p>

      {tool.tags && tool.tags.length > 0 && (
        <div className='flex flex-wrap gap-2 justify-center'>
          {tool.tags.map((tag) => (
            <Badge key={tag} variant='secondary' className='px-3 py-1 text-sm bg-white border border-slate-200 shadow-sm text-slate-600 hover:bg-slate-50'>
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
