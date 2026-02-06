'use client'

import { useRef, useMemo } from 'react'
import {
  StyleConfig,
  TiltCard,
  TILT_GRID_SIZE,
  TILT_CANVAS_SIZE,
  TILT_CELL_SIZE,
  TILT_EXPORT_WIDTH,
  CARD_GRID_SIZE,
  CardSize,
  getCardOccupiedCells,
  generateTiltCardId,
  isTiltLayout
} from './types'
import { cn } from '@/lib/utils'
import { Plus, Trash2 } from 'lucide-react'

interface TiltCanvasPreviewProps {
  cards: TiltCard[]
  style: StyleConfig
  onCardsChange: (cards: TiltCard[]) => void
}

// 预览缩放比例（3216px 画布需要缩小到适合预览，约 220px 高）
const PREVIEW_SCALE = 0.22

export function TiltCanvasPreview({ cards, style, onCardsChange }: TiltCanvasPreviewProps) {
  // 计算已占用的网格单元
  const occupiedCells = useMemo(() => {
    const cells = new Set<string>()
    cards.forEach((card) => {
      getCardOccupiedCells(card.position, card.size).forEach((pos) => {
        cells.add(`${pos.row}-${pos.col}`)
      })
    })
    return cells
  }, [cards])

  // 检查某个位置是否可以放置指定尺寸的卡片
  const canPlaceCard = (row: number, col: number, size: CardSize): boolean => {
    const gridSize = CARD_GRID_SIZE[size]
    if (row + gridSize.rows > TILT_GRID_SIZE.rows || col + gridSize.cols > TILT_GRID_SIZE.cols) {
      return false
    }
    for (let r = 0; r < gridSize.rows; r++) {
      for (let c = 0; c < gridSize.cols; c++) {
        if (occupiedCells.has(`${row + r}-${col + c}`)) {
          return false
        }
      }
    }
    return true
  }

  // 添加卡片（带图片）
  const handleAddCardWithImage = (row: number, col: number, imageDataUrl: string) => {
    if (!canPlaceCard(row, col, 'small')) return
    const newCard: TiltCard = {
      id: generateTiltCardId(),
      position: { row, col },
      size: 'small',
      image: imageDataUrl
    }
    onCardsChange([...cards, newCard])
  }

  // 删除卡片
  const handleDeleteCard = (cardId: string) => {
    onCardsChange(cards.filter((c) => c.id !== cardId))
  }

  // 上传图片
  const handleImageUpload = (cardId: string, file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const imageDataUrl = e.target?.result as string
      onCardsChange(cards.map((c) => (c.id === cardId ? { ...c, image: imageDataUrl } : c)))
    }
    reader.readAsDataURL(file)
  }

  // 获取 tilt 配置
  const tiltAngle = isTiltLayout(style.layout) ? style.layout.config.angle : 27

  // 画布尺寸（3216×3216 正方形）
  const canvasSize = TILT_CANVAS_SIZE * PREVIEW_SCALE
  // 导出区域尺寸（1440×3216）- 宽度小于画布，高度与画布相同
  const exportWidth = TILT_EXPORT_WIDTH * PREVIEW_SCALE
  // 导出区域水平偏移（居中），垂直方向与画布对齐（高度相同，无偏移）
  const exportOffsetX = (canvasSize - exportWidth) / 2

  return (
    <div className='flex-1 flex items-center justify-center bg-gray-100 overflow-hidden p-8'>
      {/* 整体画布容器 3216×3216 */}
      <div
        className='relative'
        style={{
          width: canvasSize,
          height: canvasSize,
          backgroundColor: style.base.background.color,
          backgroundImage: style.base.background.image ? `url(${style.base.background.image})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
        {/* 导出区域虚线框 1440×3216（全高，水平居中） */}
        <div
          className='absolute border-2 border-dashed border-blue-500 pointer-events-none z-20'
          style={{
            left: exportOffsetX,
            top: 0,
            width: exportWidth,
            height: canvasSize
          }}
        />

        {/* 导出区域标签 */}
        <div
          className='absolute text-xs text-blue-500 bg-white/80 px-1 rounded z-20'
          style={{
            left: exportOffsetX + 2,
            top: 2
          }}>
          导出区域
        </div>

        {/* 倾斜的网格容器 */}
        <div
          className='absolute inset-0 flex items-center justify-center'
          style={{
            transform: `rotate(-${tiltAngle}deg)`,
            transformOrigin: 'center center'
          }}>
          {/* 6×6 网格 */}
          <div
            className='grid'
            style={{
              gridTemplateColumns: `repeat(${TILT_GRID_SIZE.cols}, ${TILT_CELL_SIZE * PREVIEW_SCALE}px)`,
              gridTemplateRows: `repeat(${TILT_GRID_SIZE.rows}, ${TILT_CELL_SIZE * PREVIEW_SCALE}px)`,
              gap: style.base.card.spacing * PREVIEW_SCALE
            }}>
            {/* 渲染所有网格单元 */}
            {Array.from({ length: TILT_GRID_SIZE.rows * TILT_GRID_SIZE.cols }).map((_, index) => {
              const row = Math.floor(index / TILT_GRID_SIZE.cols)
              const col = index % TILT_GRID_SIZE.cols

              const cardAtCell = cards.find((card) => card.position.row === row && card.position.col === col)

              if (cardAtCell) {
                const gridSize = CARD_GRID_SIZE[cardAtCell.size]
                return (
                  <CardCell
                    key={cardAtCell.id}
                    card={cardAtCell}
                    style={style}
                    previewScale={PREVIEW_SCALE}
                    gridSize={gridSize}
                    onDelete={() => handleDeleteCard(cardAtCell.id)}
                    onImageUpload={(file) => handleImageUpload(cardAtCell.id, file)}
                  />
                )
              }

              const isCovered = occupiedCells.has(`${row}-${col}`)
              if (isCovered) {
                return null
              }

              const canAdd = canPlaceCard(row, col, 'small')
              return (
                <EmptyCell
                  key={`empty-${row}-${col}`}
                  canAdd={canAdd}
                  previewScale={PREVIEW_SCALE}
                  style={style}
                  onAddWithImage={(imageDataUrl) => handleAddCardWithImage(row, col, imageDataUrl)}
                />
              )
            })}
          </div>
        </div>

        {/* 导出区域外的遮罩（只有左右两侧，因为高度与画布相同） */}
        {/* 左侧遮罩 */}
        <div
          className='absolute bg-black/20 pointer-events-none z-10'
          style={{
            left: 0,
            top: 0,
            width: exportOffsetX,
            height: canvasSize
          }}
        />
        {/* 右侧遮罩 */}
        <div
          className='absolute bg-black/20 pointer-events-none z-10'
          style={{
            left: exportOffsetX + exportWidth,
            top: 0,
            width: exportOffsetX,
            height: canvasSize
          }}
        />
      </div>
    </div>
  )
}

// 卡片单元格组件
function CardCell({
  card,
  style,
  previewScale,
  gridSize,
  onDelete,
  onImageUpload
}: {
  card: TiltCard
  style: StyleConfig
  previewScale: number
  gridSize: { cols: number; rows: number }
  onDelete: () => void
  onImageUpload: (file: File) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    inputRef.current?.click()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onImageUpload(file)
      e.target.value = ''
    }
  }

  const width = TILT_CELL_SIZE * gridSize.cols * previewScale + (gridSize.cols - 1) * style.base.card.spacing * previewScale
  const height = TILT_CELL_SIZE * gridSize.rows * previewScale + (gridSize.rows - 1) * style.base.card.spacing * previewScale

  return (
    <div
      className='relative group cursor-pointer overflow-hidden'
      style={{
        width,
        height,
        gridColumn: `span ${gridSize.cols}`,
        gridRow: `span ${gridSize.rows}`,
        borderRadius: style.base.card.cornerRadius * previewScale,
        backgroundColor: card.image ? 'transparent' : 'rgba(255,255,255,0.9)'
      }}
      onClick={handleClick}>
      {card.image ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={card.image} alt='卡片图片' className='w-full h-full object-cover' style={{ borderRadius: style.base.card.cornerRadius * previewScale }} />
          <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
            <span className='text-white text-xs'>点击更换</span>
          </div>
        </>
      ) : (
        <div
          className='w-full h-full flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-300 hover:border-[#409eff] transition-colors'
          style={{ borderRadius: style.base.card.cornerRadius * previewScale }}>
          <Plus className='w-4 h-4' />
        </div>
      )}

      <button
        className='absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'
        onClick={(e) => {
          e.stopPropagation()
          onDelete()
        }}>
        <Trash2 className='w-2 h-2 text-white' />
      </button>

      <input ref={inputRef} type='file' accept='image/png,image/jpeg,image/webp' className='hidden' onChange={handleChange} />
    </div>
  )
}

// 空单元格组件
function EmptyCell({
  canAdd,
  previewScale,
  style,
  onAddWithImage
}: {
  canAdd: boolean
  previewScale: number
  style: StyleConfig
  onAddWithImage: (imageDataUrl: string) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    if (canAdd) {
      inputRef.current?.click()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const imageDataUrl = event.target?.result as string
        onAddWithImage(imageDataUrl)
      }
      reader.readAsDataURL(file)
      e.target.value = ''
    }
  }

  return (
    <div
      className={cn(
        'flex items-center justify-center border border-dashed transition-colors',
        canAdd ? 'border-gray-300 hover:border-[#409eff] cursor-pointer' : 'border-gray-200 cursor-not-allowed opacity-50'
      )}
      style={{
        width: TILT_CELL_SIZE * previewScale,
        height: TILT_CELL_SIZE * previewScale,
        borderRadius: style.base.card.cornerRadius * previewScale
      }}
      onClick={handleClick}>
      {canAdd && <Plus className='w-3 h-3 text-gray-400' />}
      <input ref={inputRef} type='file' accept='image/png,image/jpeg,image/webp' className='hidden' onChange={handleChange} />
    </div>
  )
}
