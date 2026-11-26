'use client'

import { LayoutType, LayoutTemplate } from './types'
import { tiltLayouts, layoutsByCardCount } from './layouts'
import { cn } from '@/lib/utils'

interface LayoutPanelProps {
  layoutType: LayoutType
  selectedLayout: LayoutTemplate | null
  onLayoutTypeChange: (type: LayoutType) => void
  onLayoutSelect: (layout: LayoutTemplate) => void
}

export function LayoutPanel({ layoutType, selectedLayout, onLayoutTypeChange, onLayoutSelect }: LayoutPanelProps) {
  return (
    <div className='w-76 bg-background border-r border-border p-4 overflow-y-auto'>
      <div className='flex items-center justify-between mb-3'>
        <h3 className='text-[11px] font-mono uppercase tracking-wider text-muted-foreground'>LAYOUT · 布局选择</h3>
      </div>

      {/* 布局类型切换 */}
      <div className='flex rounded-md border border-border bg-secondary/60 p-0.5 mb-6'>
        <button
          className={cn(
            'flex-1 py-1.5 text-xs font-medium rounded-sm transition-colors cursor-pointer',
            layoutType === 'regular' ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground'
          )}
          onClick={() => onLayoutTypeChange('regular')}>
          布局拼图
        </button>
        <button
          className={cn(
            'flex-1 py-1.5 text-xs font-medium rounded-sm transition-colors cursor-pointer',
            layoutType === 'tilt' ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground'
          )}
          onClick={() => onLayoutTypeChange('tilt')}>
          侧向排版
        </button>
      </div>

      {/* 正规排版布局列表 */}
      {layoutType === 'regular' && (
        <div className='space-y-5'>
          {Object.entries(layoutsByCardCount)
            .sort(([a], [b]) => Number(a) - Number(b))
            .map(([count, layouts]) => (
              <div key={count}>
                <h4 className='text-[11px] font-mono text-muted-foreground mb-2 tabular-nums'>{count} 张图片</h4>
                <div className='grid grid-cols-3 gap-2'>
                  {layouts.map((layout) => (
                    <LayoutThumbnail key={layout.id} layout={layout} isSelected={selectedLayout?.id === layout.id} onClick={() => onLayoutSelect(layout)} />
                  ))}
                </div>
              </div>
            ))}
        </div>
      )}

      {/* 侧向排版布局列表 */}
      {layoutType === 'tilt' && (
        <div className='space-y-2'>
          {tiltLayouts.map((layout) => (
            <LayoutThumbnail key={layout.id} layout={layout} isSelected={selectedLayout?.id === layout.id} onClick={() => onLayoutSelect(layout)} />
          ))}
        </div>
      )}
    </div>
  )
}

function LayoutThumbnail({ layout, isSelected, onClick }: { layout: LayoutTemplate; isSelected: boolean; onClick: () => void }) {
  return (
    <button
      className={cn(
        'w-full aspect-9/16 border rounded-md p-2 transition-colors overflow-hidden cursor-pointer',
        isSelected ? 'border-foreground bg-secondary ring-1 ring-foreground/20' : 'border-border bg-secondary/30 hover:border-foreground/40 hover:bg-secondary/60'
      )}
      onClick={onClick}
      title={layout.name}>
      <div className={cn('w-full h-full flex flex-col gap-1 justify-center', layout.type === 'tilt' && '-rotate-27 gap-3')}>
        {layout.rows.map((row, rowIndex) => (
          <div key={rowIndex} className={cn('flex gap-1 justify-center', layout.type === 'tilt' && 'gap-3')}>
            {row.map((slot) => (
              <div
                key={slot.id}
                className={cn(
                  'shrink-0 grow-0 basis-auto transition-colors',
                  isSelected ? 'bg-foreground/75' : 'bg-muted-foreground/30',
                  slot.size === 'small' && (layout.type === 'tilt' ? 'w-16 h-16 rounded-md' : 'w-4 h-4 rounded-xs'),
                  slot.size === 'medium' && (layout.type === 'tilt' ? 'w-36 h-16 rounded-md' : 'w-9 h-4 rounded-xs'),
                  slot.size === 'large' && (layout.type === 'tilt' ? 'w-36 h-36 rounded-md' : 'w-9 h-9 rounded-xs')
                )}
              />
            ))}
          </div>
        ))}
      </div>
    </button>
  )
}
