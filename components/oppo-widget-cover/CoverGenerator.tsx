'use client'

import { useState, useCallback } from 'react'
import {
  LayoutType,
  LayoutTemplate,
  StyleConfig,
  DEFAULT_STYLE,
  CANVAS_SIZE,
  CARD_SIZES,
  createLayoutConfig,
  isTiltLayout,
  TiltCard,
  TILT_GRID_SIZE,
  TILT_CANVAS_SIZE,
  TILT_CELL_SIZE,
  TILT_EXPORT_WIDTH,
  TILT_EXPORT_HEIGHT,
  CARD_GRID_SIZE
} from './types'
import { LayoutPanel } from './LayoutPanel'
import { CanvasPreview } from './CanvasPreview'
import { TiltCanvasPreview } from './TiltCanvasPreview'
import { StylePanel } from './StylePanel'
import { regularLayouts } from './layouts'

export function CoverGenerator() {
  // 状态管理
  const [layoutType, setLayoutType] = useState<LayoutType>('regular')
  const [selectedLayout, setSelectedLayout] = useState<LayoutTemplate | null>(regularLayouts[0])
  const [cards, setCards] = useState<Map<string, string>>(new Map())
  const [tiltCards, setTiltCards] = useState<TiltCard[]>([])
  const [style, setStyle] = useState<StyleConfig>(DEFAULT_STYLE)
  const [isExporting, setIsExporting] = useState(false)

  // 处理布局类型切换
  const handleLayoutTypeChange = (type: LayoutType) => {
    setLayoutType(type)
    setSelectedLayout(null)
    setCards(new Map())
    setTiltCards([])
    // 同步更新样式配置中的布局类型
    setStyle((prev) => ({
      ...prev,
      layout: createLayoutConfig(type)
    }))
  }

  // 处理布局选择
  const handleLayoutSelect = (layout: LayoutTemplate) => {
    setSelectedLayout(layout)
    setCards(new Map())
  }

  // 处理图片上传（regular 布局）
  const handleImageUpload = useCallback((slotId: string, imageDataUrl: string) => {
    setCards((prev) => {
      const next = new Map(prev)
      next.set(slotId, imageDataUrl)
      return next
    })
  }, [])

  // 处理侧向排版卡片变更
  const handleTiltCardsChange = useCallback((newCards: TiltCard[]) => {
    setTiltCards(newCards)
  }, [])

  // 处理导出
  const handleExport = async () => {
    if (layoutType === 'regular' && !selectedLayout) return
    if (layoutType === 'tilt' && tiltCards.length === 0) return

    setIsExporting(true)

    try {
      if (layoutType === 'tilt') {
        await exportTiltLayout()
      } else {
        await exportRegularLayout()
      }
    } catch (error) {
      console.error('导出失败:', error)
      alert('导出失败，请重试')
    } finally {
      setIsExporting(false)
    }
  }

  // 导出 regular 布局
  const exportRegularLayout = async () => {
    if (!selectedLayout) return

    const canvas = document.createElement('canvas')
    canvas.width = CANVAS_SIZE.width
    canvas.height = CANVAS_SIZE.height
    const ctx = canvas.getContext('2d')!

    // 绘制背景
    if (style.base.background.image) {
      const bgImg = await loadImage(style.base.background.image)
      ctx.drawImage(bgImg, 0, 0, CANVAS_SIZE.width, CANVAS_SIZE.height)
    } else {
      ctx.fillStyle = style.base.background.color
      ctx.fillRect(0, 0, CANVAS_SIZE.width, CANVAS_SIZE.height)
    }

    // 计算所有行的总高度和宽度
    let totalRowHeight = 0
    let maxRowWidth = 0
    const rowHeights: number[] = []

    for (const row of selectedLayout.rows) {
      const maxHeight = Math.max(...row.map((slot) => CARD_SIZES[slot.size].height))
      rowHeights.push(maxHeight)
      totalRowHeight += maxHeight
      const rowWidth = row.reduce((sum, slot) => sum + CARD_SIZES[slot.size].width, 0) + (row.length - 1) * style.base.card.spacing
      maxRowWidth = Math.max(maxRowWidth, rowWidth)
    }

    totalRowHeight += (selectedLayout.rows.length - 1) * style.base.card.spacing

    // 卡片容器背景尺寸
    const containerWidth = maxRowWidth + style.base.card.spacing * 2
    const containerHeight = totalRowHeight + style.base.card.spacing * 2
    const containerX = (CANVAS_SIZE.width - containerWidth) / 2
    const containerY = (CANVAS_SIZE.height - containerHeight) / 2

    // 绘制卡片容器背景
    const containerOpacity = Math.round(style.base.cardContainer.opacity * 2.55)
    const containerColor = style.base.cardContainer.color
    const r = parseInt(containerColor.slice(1, 3), 16)
    const g = parseInt(containerColor.slice(3, 5), 16)
    const b = parseInt(containerColor.slice(5, 7), 16)
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${containerOpacity / 255})`
    roundRect(ctx, containerX, containerY, containerWidth, containerHeight, style.base.cardContainer.cornerRadius)
    ctx.fill()

    // 起始 Y 位置
    let currentY = containerY + style.base.card.spacing

    // 绘制每一行
    for (let rowIndex = 0; rowIndex < selectedLayout.rows.length; rowIndex++) {
      const row = selectedLayout.rows[rowIndex]
      const rowHeight = rowHeights[rowIndex]
      let totalRowWidth = row.reduce((sum, slot) => sum + CARD_SIZES[slot.size].width, 0)
      totalRowWidth += (row.length - 1) * style.base.card.spacing
      let currentX = containerX + (containerWidth - totalRowWidth) / 2

      for (const slot of row) {
        const slotSize = CARD_SIZES[slot.size]
        const imageUrl = cards.get(slot.id)

        if (imageUrl) {
          const img = await loadImage(imageUrl)
          ctx.save()
          roundRect(ctx, currentX, currentY, slotSize.width, slotSize.height, style.base.card.cornerRadius)
          ctx.clip()
          drawImageCover(ctx, img, currentX, currentY, slotSize.width, slotSize.height)
          ctx.restore()
        } else {
          ctx.fillStyle = 'rgba(200, 200, 200, 0.5)'
          roundRect(ctx, currentX, currentY, slotSize.width, slotSize.height, style.base.card.cornerRadius)
          ctx.fill()
        }

        currentX += slotSize.width + style.base.card.spacing
      }

      currentY += rowHeight + style.base.card.spacing
    }

    // 导出
    downloadCanvas(canvas)
  }

  // 导出 tilt 布局
  const exportTiltLayout = async () => {
    const tiltAngle = isTiltLayout(style.layout) ? style.layout.config.angle : 27

    // 创建 3216×3216 的网格画布
    const gridCanvas = document.createElement('canvas')
    gridCanvas.width = TILT_CANVAS_SIZE
    gridCanvas.height = TILT_CANVAS_SIZE
    const gridCtx = gridCanvas.getContext('2d')!

    // 绘制背景
    if (style.base.background.image) {
      const bgImg = await loadImage(style.base.background.image)
      gridCtx.drawImage(bgImg, 0, 0, TILT_CANVAS_SIZE, TILT_CANVAS_SIZE)
    } else {
      gridCtx.fillStyle = style.base.background.color
      gridCtx.fillRect(0, 0, TILT_CANVAS_SIZE, TILT_CANVAS_SIZE)
    }

    // 应用旋转
    gridCtx.save()
    gridCtx.translate(TILT_CANVAS_SIZE / 2, TILT_CANVAS_SIZE / 2)
    gridCtx.rotate((-tiltAngle * Math.PI) / 180)
    gridCtx.translate(-TILT_CANVAS_SIZE / 2, -TILT_CANVAS_SIZE / 2)

    // 计算网格尺寸（含间距）
    const totalGridWidth = TILT_GRID_SIZE.cols * TILT_CELL_SIZE + (TILT_GRID_SIZE.cols - 1) * style.base.card.spacing
    const totalGridHeight = TILT_GRID_SIZE.rows * TILT_CELL_SIZE + (TILT_GRID_SIZE.rows - 1) * style.base.card.spacing
    const gridOffsetX = (TILT_CANVAS_SIZE - totalGridWidth) / 2
    const gridOffsetY = (TILT_CANVAS_SIZE - totalGridHeight) / 2

    // 绘制所有卡片
    for (const card of tiltCards) {
      const cardGridSize = CARD_GRID_SIZE[card.size]
      const cardWidth = cardGridSize.cols * TILT_CELL_SIZE + (cardGridSize.cols - 1) * style.base.card.spacing
      const cardHeight = cardGridSize.rows * TILT_CELL_SIZE + (cardGridSize.rows - 1) * style.base.card.spacing
      const cardX = gridOffsetX + card.position.col * (TILT_CELL_SIZE + style.base.card.spacing)
      const cardY = gridOffsetY + card.position.row * (TILT_CELL_SIZE + style.base.card.spacing)

      if (card.image) {
        const img = await loadImage(card.image)
        gridCtx.save()
        roundRect(gridCtx, cardX, cardY, cardWidth, cardHeight, style.base.card.cornerRadius)
        gridCtx.clip()
        drawImageCover(gridCtx, img, cardX, cardY, cardWidth, cardHeight)
        // 绘制叠图遮罩层
        if (style.base.card.overlay) {
          gridCtx.fillStyle = 'rgba(0, 0, 0, 0.5)'
          gridCtx.fillRect(cardX, cardY, cardWidth, cardHeight)
        }
        gridCtx.restore()
      } else {
        gridCtx.fillStyle = 'rgba(200, 200, 200, 0.5)'
        roundRect(gridCtx, cardX, cardY, cardWidth, cardHeight, style.base.card.cornerRadius)
        gridCtx.fill()
      }
    }

    gridCtx.restore()

    // 创建最终画布（1440×3216），从 3216×3216 中心裁剪
    const finalCanvas = document.createElement('canvas')
    finalCanvas.width = TILT_EXPORT_WIDTH
    finalCanvas.height = TILT_EXPORT_HEIGHT
    const finalCtx = finalCanvas.getContext('2d')!

    // 计算裁剪位置（中心区域）
    const cropX = (TILT_CANVAS_SIZE - TILT_EXPORT_WIDTH) / 2
    const cropY = (TILT_CANVAS_SIZE - TILT_EXPORT_HEIGHT) / 2

    // 从网格画布裁剪中心区域到最终画布
    finalCtx.drawImage(gridCanvas, cropX, cropY, TILT_EXPORT_WIDTH, TILT_EXPORT_HEIGHT, 0, 0, TILT_EXPORT_WIDTH, TILT_EXPORT_HEIGHT)

    // 导出
    downloadCanvas(finalCanvas)
  }

  // 下载画布
  const downloadCanvas = (canvas: HTMLCanvasElement) => {
    const dataUrl = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.download = 'thumbnail_16x9.png'
    link.href = dataUrl
    link.click()
  }

  return (
    <div className='flex h-full bg-white'>
      {/* 左侧布局选择面板 */}
      <LayoutPanel layoutType={layoutType} selectedLayout={selectedLayout} onLayoutTypeChange={handleLayoutTypeChange} onLayoutSelect={handleLayoutSelect} />

      {/* 中间画布预览 */}
      {layoutType === 'regular' ? (
        <CanvasPreview layout={selectedLayout} cards={cards} style={style} onImageUpload={handleImageUpload} />
      ) : (
        <TiltCanvasPreview cards={tiltCards} style={style} onCardsChange={handleTiltCardsChange} />
      )}

      {/* 右侧样式调整面板 */}
      <StylePanel style={style} onStyleChange={setStyle} onExport={handleExport} isExporting={isExporting} />
    </div>
  )
}

// 工具函数：加载图片
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

// 工具函数：绘制圆角矩形
function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.lineTo(x + width - radius, y)
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
  ctx.lineTo(x + width, y + height - radius)
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
  ctx.lineTo(x + radius, y + height)
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
  ctx.lineTo(x, y + radius)
  ctx.quadraticCurveTo(x, y, x + radius, y)
  ctx.closePath()
}

// 工具函数：以 cover 模式绘制图片
function drawImageCover(ctx: CanvasRenderingContext2D, img: HTMLImageElement, x: number, y: number, width: number, height: number) {
  const imgRatio = img.width / img.height
  const targetRatio = width / height

  let srcX = 0
  let srcY = 0
  let srcWidth = img.width
  let srcHeight = img.height

  if (imgRatio > targetRatio) {
    srcWidth = img.height * targetRatio
    srcX = (img.width - srcWidth) / 2
  } else {
    srcHeight = img.width / targetRatio
    srcY = (img.height - srcHeight) / 2
  }

  ctx.drawImage(img, srcX, srcY, srcWidth, srcHeight, x, y, width, height)
}
