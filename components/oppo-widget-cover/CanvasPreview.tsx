'use client'

import { useRef } from 'react'
import { LayoutTemplate, StyleConfig, CARD_SIZES, CardSlot } from './types'
import { cn } from '@/lib/utils'
import { Plus, Image as ImageIcon } from 'lucide-react'

interface CanvasPreviewProps {
  layout: LayoutTemplate | null
  cards: Map<string, string>
  style: StyleConfig
  onImageUpload: (slotId: string, imageDataUrl: string) => void
}

// 预览缩放比例
const PREVIEW_SCALE = 0.22

export function CanvasPreview({ layout, cards, style, onImageUpload }: CanvasPreviewProps) {
  const handleFileUpload = (slotId: string, file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      onImageUpload(slotId, e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  if (!layout) {
    return (
      <div className='flex-1 flex items-center justify-center bg-gray-100'>
        <div className='text-center text-gray-400'>
          <ImageIcon className='w-16 h-16 mx-auto mb-4 opacity-50' />
          <p>请从左侧选择一个布局模板</p>
        </div>
      </div>
    )
  }

  return (
    <div className='flex-1 flex items-center justify-center bg-gray-100 overflow-auto p-8'>
      {/* 画布容器 */}
      <div
        className='shadow-2xl'
        style={{
          width: 1440 * PREVIEW_SCALE,
          height: 3216 * PREVIEW_SCALE,
          backgroundColor: style.backgroundColor,
          backgroundImage: style.backgroundImage ? `url(${style.backgroundImage})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: style.cornerRadius * PREVIEW_SCALE,
          overflow: 'hidden'
        }}>
        {/* 内容区域（考虑边框） */}
        <div
          className={cn('h-full flex flex-col items-center justify-center', layout.type === 'tilt' && '-rotate-27 scale-110')}
          style={{
            padding: `${style.border.top * PREVIEW_SCALE}px ${style.border.right * PREVIEW_SCALE}px ${style.border.bottom * PREVIEW_SCALE}px ${style.border.left * PREVIEW_SCALE}px`,
            gap: style.spacing * PREVIEW_SCALE
          }}>
          {layout.rows.map((row, rowIndex) => (
            <div key={rowIndex} className='flex items-center justify-center' style={{ gap: style.spacing * PREVIEW_SCALE }}>
              {row.map((slot) => (
                <CardSlotItem key={slot.id} slot={slot} image={cards.get(slot.id)} style={style} onUpload={(file) => handleFileUpload(slot.id, file)} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// 卡片槽位组件
function CardSlotItem({ slot, image, style, onUpload }: { slot: CardSlot; image?: string; style: StyleConfig; onUpload: (file: File) => void }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const size = CARD_SIZES[slot.size]

  const handleClick = () => {
    inputRef.current?.click()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onUpload(file)
      // 清空 input 以允许重复上传同一文件
      e.target.value = ''
    }
  }

  return (
    <div
      className='relative cursor-pointer group overflow-hidden'
      style={{
        width: size.width * PREVIEW_SCALE,
        height: size.height * PREVIEW_SCALE,
        borderRadius: style.cornerRadius * PREVIEW_SCALE,
        backgroundColor: image ? 'transparent' : 'rgba(255,255,255,0.8)'
      }}
      onClick={handleClick}>
      {image ? (
        <>
          <img src={image} alt='卡片图片' className='w-full h-full object-cover' style={{ borderRadius: style.cornerRadius * PREVIEW_SCALE }} />
          {/* 悬停遮罩 */}
          <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
            <span className='text-white text-xs'>点击更换</span>
          </div>
        </>
      ) : (
        <div
          className='w-full h-full flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-300 hover:border-[#409eff] transition-colors'
          style={{ borderRadius: style.cornerRadius * PREVIEW_SCALE }}>
          <Plus className='w-6 h-6 mb-1' />
          <span className='text-xs'>{slot.size === 'small' ? '小卡' : slot.size === 'medium' ? '中卡' : '大卡'}</span>
        </div>
      )}

      <input ref={inputRef} type='file' accept='image/png,image/jpeg,image/webp' className='hidden' onChange={handleChange} />
    </div>
  )
}
