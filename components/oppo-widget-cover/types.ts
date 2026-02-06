/**
 * OPPO Widget 封面生成器类型定义
 */

// 卡片尺寸常量 (单位: px)
export const CARD_SIZES = {
  small: { width: 450, height: 450 }, // 2×2 小卡
  medium: { width: 954, height: 450 }, // 2×4 中卡
  large: { width: 954, height: 1050 } // 4×4 大卡
} as const

// 画布尺寸
export const CANVAS_SIZE = { width: 1440, height: 3216 }

// 卡片尺寸类型
export type CardSize = keyof typeof CARD_SIZES

// 布局类型
export type LayoutType = 'regular' | 'tilt'

// 卡片槽位
export interface CardSlot {
  id: string
  size: CardSize
  image?: string
  rowSpan?: number // 大卡跨行数
}

// 布局模板
export interface LayoutTemplate {
  id: string
  name: string
  type: LayoutType
  rows: CardSlot[][] // 二维数组，每个元素是一行的卡片
  cardCount: number // 需要的图片数量
}

// 样式配置
export interface StyleConfig {
  border: {
    top: number
    right: number
    bottom: number
    left: number
  }
  spacing: number // 卡片间距
  cornerRadius: number // 圆角
  backgroundColor: string // 背景颜色
  backgroundImage?: string // 背景图片
}

// 导出配置
export interface ExportConfig {
  format: 'png' | 'jpg'
  quality: 'high' | 'standard' | 'lossless'
  filename: string
}

// 封面生成器状态
export interface CoverState {
  layoutType: LayoutType
  selectedLayout: LayoutTemplate | null
  cards: Map<string, string> // slotId -> imageDataUrl
  style: StyleConfig
  export: ExportConfig
}

// 默认样式配置
export const DEFAULT_STYLE: StyleConfig = {
  border: { top: 10, right: 10, bottom: 10, left: 10 },
  spacing: 10,
  cornerRadius: 8,
  backgroundColor: '#ffffff'
}

// 默认导出配置
export const DEFAULT_EXPORT: ExportConfig = {
  format: 'png',
  quality: 'high',
  filename: 'thumbnail_16x9.png'
}
