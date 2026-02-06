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
    <div className='w-64 bg-white border-r border-gray-200 p-4 overflow-y-auto'>
      <h3 className='text-sm font-semibold text-gray-700 mb-4'>布局选择</h3>

      {/* 布局类型切换 */}
      <div className='flex rounded-lg border border-gray-200 p-1 mb-6'>
        <button
          className={cn('flex-1 py-2 text-sm rounded-md transition-all', layoutType === 'regular' ? 'bg-main text-white' : 'text-gray-600 hover:bg-gray-100')}
          onClick={() => onLayoutTypeChange('regular')}>
          布局拼图
        </button>
        <button
          className={cn('flex-1 py-2 text-sm rounded-md transition-all', layoutType === 'tilt' ? 'bg-main text-white' : 'text-gray-600 hover:bg-gray-100')}
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
                <h4 className='text-xs font-medium text-gray-500 mb-2'>{count} 张图片</h4>
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
        'w-full aspect-9/16 rounded-lg border-2 p-2 transition-all hover:border-main/50',
        isSelected ? 'border-main bg-main/10' : 'border-gray-200 bg-gray-50'
      )}
      onClick={onClick}
      title={layout.name}>
      <div className={cn('w-full h-full flex flex-col gap-1 justify-center', layout.type === 'tilt' && '-rotate-27 scale-75')}>
        {layout.rows.map((row, rowIndex) => (
          <div key={rowIndex} className='flex gap-1 justify-center'>
            {row.map((slot) => (
              <div
                key={slot.id}
                className={cn(
                  'bg-gray-300 rounded-xs',
                  slot.size === 'small' && 'w-4 h-4',
                  slot.size === 'medium' && 'w-9 h-4',
                  slot.size === 'large' && 'w-9 h-9'
                )}
              />
            ))}
          </div>
        ))}
      </div>
    </button>
  )
}
