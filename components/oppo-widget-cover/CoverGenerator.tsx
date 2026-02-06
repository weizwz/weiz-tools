'use client'

import { useState, useCallback } from 'react'
import { LayoutType, LayoutTemplate, StyleConfig, DEFAULT_STYLE, CANVAS_SIZE, CARD_SIZES, createLayoutConfig, isTiltLayout } from './types'
import { LayoutPanel } from './LayoutPanel'
import { CanvasPreview } from './CanvasPreview'
import { StylePanel } from './StylePanel'
import { regularLayouts } from './layouts'

export function CoverGenerator() {
  // 状态管理
  const [layoutType, setLayoutType] = useState<LayoutType>('regular')
  const [selectedLayout, setSelectedLayout] = useState<LayoutTemplate | null>(regularLayouts[0])
  const [cards, setCards] = useState<Map<string, string>>(new Map())
  const [style, setStyle] = useState<StyleConfig>(DEFAULT_STYLE)
  const [isExporting, setIsExporting] = useState(false)

  // 处理布局类型切换
  const handleLayoutTypeChange = (type: LayoutType) => {
    setLayoutType(type)
    setSelectedLayout(null)
    setCards(new Map())
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

  // 处理图片上传
  const handleImageUpload = useCallback((slotId: string, imageDataUrl: string) => {
    setCards((prev) => {
      const next = new Map(prev)
      next.set(slotId, imageDataUrl)
      return next
    })
  }, [])

  // 处理导出
  const handleExport = async () => {
    if (!selectedLayout) return

    setIsExporting(true)

    try {
      // 创建离屏 Canvas
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
        // 取该行最高的卡片高度
        const maxHeight = Math.max(...row.map((slot) => CARD_SIZES[slot.size].height))
        rowHeights.push(maxHeight)
        totalRowHeight += maxHeight

        // 计算该行宽度
        const rowWidth = row.reduce((sum, slot) => sum + CARD_SIZES[slot.size].width, 0) + (row.length - 1) * style.base.card.spacing
        maxRowWidth = Math.max(maxRowWidth, rowWidth)
      }

      // 添加间距
      totalRowHeight += (selectedLayout.rows.length - 1) * style.base.card.spacing

      // 卡片容器背景尺寸（包含内边距）
      const containerWidth = maxRowWidth + style.base.card.spacing * 2
      const containerHeight = totalRowHeight + style.base.card.spacing * 2
      const containerX = (CANVAS_SIZE.width - containerWidth) / 2
      const containerY = (CANVAS_SIZE.height - containerHeight) / 2

      // 如果是侧向排版，应用旋转
      if (selectedLayout.type === 'tilt') {
        ctx.save()
        ctx.translate(CANVAS_SIZE.width / 2, CANVAS_SIZE.height / 2)
        // 使用配置中的角度
        const tiltAngle = isTiltLayout(style.layout) ? style.layout.config.angle : 27
        ctx.rotate((-tiltAngle * Math.PI) / 180)
        ctx.translate(-CANVAS_SIZE.width / 2, -CANVAS_SIZE.height / 2)
      }

      // 绘制卡片容器背景
      const containerOpacity = Math.round(style.base.cardContainer.opacity * 2.55)
      const containerColor = style.base.cardContainer.color
      // 将 hex 颜色转换为 rgba
      const r = parseInt(containerColor.slice(1, 3), 16)
      const g = parseInt(containerColor.slice(3, 5), 16)
      const b = parseInt(containerColor.slice(5, 7), 16)
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${containerOpacity / 255})`
      roundRect(ctx, containerX, containerY, containerWidth, containerHeight, style.base.cardContainer.cornerRadius)
      ctx.fill()

      // 起始 Y 位置（在容器内）
      let currentY = containerY + style.base.card.spacing

      // 绘制每一行
      for (let rowIndex = 0; rowIndex < selectedLayout.rows.length; rowIndex++) {
        const row = selectedLayout.rows[rowIndex]
        const rowHeight = rowHeights[rowIndex]

        // 计算该行总宽度
        let totalRowWidth = row.reduce((sum, slot) => sum + CARD_SIZES[slot.size].width, 0)
        totalRowWidth += (row.length - 1) * style.base.card.spacing

        // 起始 X 位置（在容器内居中）
        let currentX = containerX + (containerWidth - totalRowWidth) / 2

        // 绘制该行的每个卡片
        for (const slot of row) {
          const slotSize = CARD_SIZES[slot.size]
          const imageUrl = cards.get(slot.id)

          if (imageUrl) {
            const img = await loadImage(imageUrl)

            // 设置圆角裁剪
            ctx.save()
            roundRect(ctx, currentX, currentY, slotSize.width, slotSize.height, style.base.card.cornerRadius)
            ctx.clip()

            // 绘制图片（cover 效果）
            drawImageCover(ctx, img, currentX, currentY, slotSize.width, slotSize.height)

            ctx.restore()
          } else {
            // 绘制空白占位
            ctx.fillStyle = 'rgba(200, 200, 200, 0.5)'
            roundRect(ctx, currentX, currentY, slotSize.width, slotSize.height, style.base.card.cornerRadius)
            ctx.fill()
          }

          currentX += slotSize.width + style.base.card.spacing
        }

        currentY += rowHeight + style.base.card.spacing
      }

      // 如果是侧向排版，恢复变换
      if (selectedLayout.type === 'tilt') {
        ctx.restore()
      }

      // 导出为 PNG
      const dataUrl = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.download = 'thumbnail_16x9.png'
      link.href = dataUrl
      link.click()
    } catch (error) {
      console.error('导出失败:', error)
      alert('导出失败，请重试')
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className='flex h-full bg-white'>
      {/* 左侧布局选择面板 */}
      <LayoutPanel layoutType={layoutType} selectedLayout={selectedLayout} onLayoutTypeChange={handleLayoutTypeChange} onLayoutSelect={handleLayoutSelect} />

      {/* 中间画布预览 */}
      <CanvasPreview layout={selectedLayout} cards={cards} style={style} onImageUpload={handleImageUpload} />

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
    // 图片更宽，裁剪左右
    srcWidth = img.height * targetRatio
    srcX = (img.width - srcWidth) / 2
  } else {
    // 图片更高，裁剪上下
    srcHeight = img.width / targetRatio
    srcY = (img.height - srcHeight) / 2
  }

  ctx.drawImage(img, srcX, srcY, srcWidth, srcHeight, x, y, width, height)
}
