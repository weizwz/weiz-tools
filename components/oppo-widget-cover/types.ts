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

// ============ 样式配置类型（重构后） ============

// 通用背景配置
export interface BackgroundConfig {
  color: string
  image?: string
}

// 卡片容器样式
export interface CardContainerStyle {
  color: string
  opacity: number // 0-100
  cornerRadius: number
}

// 卡片样式
export interface CardStyle {
  spacing: number
  cornerRadius: number
}

// 基础样式配置（所有布局通用）
export interface BaseStyleConfig {
  background: BackgroundConfig
  cardContainer: CardContainerStyle
  card: CardStyle
}

// 布局拼图专属配置（regular）
export interface RegularLayoutConfig {
  alignment: 'center' | 'top' | 'bottom' // 垂直对齐
}

// 侧向排版专属配置（tilt）
export interface TiltLayoutConfig {
  angle: number // 倾斜角度，默认 27°
  offsetX: number // X 轴偏移
  offsetY: number // Y 轴偏移
  overflow: 'clip' | 'visible' // 溢出处理
}

// 布局专属样式 - 联合类型
export type LayoutSpecificStyle = { type: 'regular'; config: RegularLayoutConfig } | { type: 'tilt'; config: TiltLayoutConfig }

// 完整样式配置
export interface StyleConfig {
  base: BaseStyleConfig
  layout: LayoutSpecificStyle
}

// ============ 默认配置 ============

export const DEFAULT_REGULAR_CONFIG: RegularLayoutConfig = {
  alignment: 'center'
}

export const DEFAULT_TILT_CONFIG: TiltLayoutConfig = {
  angle: 27,
  offsetX: 0,
  offsetY: 0,
  overflow: 'clip'
}

export const DEFAULT_STYLE: StyleConfig = {
  base: {
    background: {
      color: '#ffffff',
      image: undefined
    },
    cardContainer: {
      color: '#6a7282',
      opacity: 50,
      cornerRadius: 50
    },
    card: {
      spacing: 50,
      cornerRadius: 50
    }
  },
  layout: {
    type: 'regular',
    config: DEFAULT_REGULAR_CONFIG
  }
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

// 默认导出配置
export const DEFAULT_EXPORT: ExportConfig = {
  format: 'png',
  quality: 'high',
  filename: 'thumbnail_16x9.png'
}

// ============ 辅助函数 ============

// 获取布局专属配置的类型守卫
export function isRegularLayout(style: LayoutSpecificStyle): style is { type: 'regular'; config: RegularLayoutConfig } {
  return style.type === 'regular'
}

export function isTiltLayout(style: LayoutSpecificStyle): style is { type: 'tilt'; config: TiltLayoutConfig } {
  return style.type === 'tilt'
}

// 根据布局类型创建默认配置
export function createLayoutConfig(type: LayoutType): LayoutSpecificStyle {
  if (type === 'tilt') {
    return { type: 'tilt', config: { ...DEFAULT_TILT_CONFIG } }
  }
  return { type: 'regular', config: { ...DEFAULT_REGULAR_CONFIG } }
}
