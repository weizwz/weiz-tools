'use client'

import { useRef } from 'react'
import { LayoutTemplate, StyleConfig, CARD_SIZES, CardSlot, isTiltLayout } from './types'
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

  // 获取 tilt 布局的配置
  const tiltConfig = isTiltLayout(style.layout) ? style.layout.config : null
  const rotateAngle = tiltConfig?.angle ?? 27

  return (
    <div className='flex-1 flex items-center justify-center bg-gray-100 overflow-auto p-8'>
      {/* 画布容器 */}
      <div
        style={{
          width: 1440 * PREVIEW_SCALE,
          height: 3216 * PREVIEW_SCALE,
          backgroundColor: style.base.background.color,
          backgroundImage: style.base.background.image ? `url(${style.base.background.image})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: style.base.card.cornerRadius * PREVIEW_SCALE,
          overflow: 'hidden'
        }}>
        {/* 卡片容器背景层 */}
        <div
          className='h-full flex items-center justify-center'
          style={{
            padding: `${style.base.card.spacing * PREVIEW_SCALE}px`
          }}>
          <div
            className={cn('flex flex-col items-center justify-center', layout.type === 'tilt' && 'scale-110')}
            style={{
              backgroundColor: `${style.base.cardContainer.color}${Math.round(style.base.cardContainer.opacity * 2.55)
                .toString(16)
                .padStart(2, '0')}`,
              borderRadius: style.base.cardContainer.cornerRadius * PREVIEW_SCALE,
              padding: style.base.card.spacing * PREVIEW_SCALE,
              gap: style.base.card.spacing * PREVIEW_SCALE,
              transform: layout.type === 'tilt' ? `rotate(-${rotateAngle}deg)` : undefined
            }}>
            {layout.rows.map((row, rowIndex) => (
              <div key={rowIndex} className='flex items-center justify-center' style={{ gap: style.base.card.spacing * PREVIEW_SCALE }}>
                {row.map((slot) => (
                  <CardSlotItem key={slot.id} slot={slot} image={cards.get(slot.id)} style={style} onUpload={(file) => handleFileUpload(slot.id, file)} />
                ))}
              </div>
            ))}
          </div>
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
        borderRadius: style.base.card.cornerRadius * PREVIEW_SCALE,
        backgroundColor: image ? 'transparent' : 'rgba(255,255,255,0.8)'
      }}
      onClick={handleClick}>
      {image ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt='卡片图片' className='w-full h-full object-cover' style={{ borderRadius: style.base.card.cornerRadius * PREVIEW_SCALE }} />
          {/* 悬停遮罩 */}
          <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
            <span className='text-white text-xs'>点击更换</span>
          </div>
        </>
      ) : (
        <div
          className='w-full h-full flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-300 hover:border-[#409eff] transition-colors'
          style={{ borderRadius: style.base.card.cornerRadius * PREVIEW_SCALE }}>
          <Plus className='w-6 h-6 mb-1' />
          <span className='text-xs'>{slot.size === 'small' ? '小卡' : slot.size === 'medium' ? '中卡' : '大卡'}</span>
        </div>
      )}

      <input ref={inputRef} type='file' accept='image/png,image/jpeg,image/webp' className='hidden' onChange={handleChange} />
    </div>
  )
}
