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
    <div className='w-80 bg-card border-r border-border p-4 overflow-y-auto'>
      <h3 className='text-sm font-semibold text-foreground mb-4'>布局选择</h3>

      {/* 布局类型切换 */}
      <div className='flex rounded-lg border border-border bg-muted/40 p-1 mb-6'>
        <button
          className={cn('flex-1 py-2 text-sm rounded-md transition-all cursor-pointer', layoutType === 'regular' ? 'bg-main text-white shadow-xs' : 'text-muted-foreground hover:text-foreground hover:bg-muted')}
          onClick={() => onLayoutTypeChange('regular')}>
          布局拼图
        </button>
        <button
          className={cn('flex-1 py-2 text-sm rounded-md transition-all cursor-pointer', layoutType === 'tilt' ? 'bg-main text-white shadow-xs' : 'text-muted-foreground hover:text-foreground hover:bg-muted')}
          onClick={() => onLayoutTypeChange('tilt')}>
          侧向排版
        </button>
      </div>

      {/* 正规排版布局列表 */}
      {layoutType === 'regular' && (
        <div className='space-y-6'>
          {Object.entries(layoutsByCardCount)
            .sort(([a], [b]) => Number(a) - Number(b))
            .map(([count, layouts]) => (
              <div key={count}>
                <h4 className='text-xs font-medium text-muted-foreground mb-2'>{count} 张图片</h4>
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

// 布局缩略图组件
function LayoutThumbnail({ layout, isSelected, onClick }: { layout: LayoutTemplate; isSelected: boolean; onClick: () => void }) {
  return (
    <button
      className={cn(
        'w-full aspect-9/16 border-2 rounded-lg p-2 transition-all hover:border-main/50 overflow-hidden cursor-pointer',
        isSelected ? 'border-main bg-main-soft' : 'border-border bg-muted/40'
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
                  'bg-gray-300 shrink-0 grow-0 basis-auto',
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
