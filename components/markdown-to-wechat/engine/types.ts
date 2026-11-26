export type ThemeId = 'moyu-green' | 'red-white' | 'olive-journal'

export type MotionId =
  | 'blueprint-grid'
  | 'botanical-notes'
  | 'deep-sea-terminal'
  | 'editorial-vermilion'
  | 'swiss-signal'

export type VisualLevel = 'basic' | 'decorated' | 'motion'

export type PreviewWidth = 'auto' | 375 | 402 | 440

export type FontSizeOption = 14 | 15 | 16 | 17

export interface PaletteColors {
  bg: string // 正文底色
  heading: string // 标题
  strong: string // 重点加粗
  headingDecor: string // 标题装饰
  divider: string // 分割线
  listMarker: string // 列表标记
  codeBlockBg: string // 代码块
  tableAccent: string // 表格
  inlineCodeText: string // 行内代码文字
  inlineCodeBg: string // 行内代码底色/阴影
  blockquoteAccent: string // 引用
}

export type PaletteColorKey = keyof PaletteColors

export interface ColorPalette {
  id: string
  name: string
  subtitle: string
  colors: PaletteColors
}

export type CustomColors = Partial<PaletteColors>

export interface VisualCapabilities {
  showBanner: boolean
  showToc: boolean
  showCodeHeader: boolean
  useFancyDivider: boolean
  useMotion: boolean
}

export interface RenderContext {
  theme: LayoutTheme
  colors: PaletteColors
  capabilities: VisualCapabilities
  fontSize: FontSizeOption
  author: string
  dateStr: string
}

export interface MotionPreset {
  id: MotionId
  name: string
  renderBannerMotion: (colors: PaletteColors, animated: boolean) => string
  renderTocDecor: (colors: PaletteColors, animated: boolean) => string
  renderSectionRail: (colors: PaletteColors, animated: boolean, index: number) => string
  renderDivider: (colors: PaletteColors, animated: boolean) => string
  renderTail: (colors: PaletteColors, animated: boolean) => string
}

export interface LayoutTheme {
  id: ThemeId
  name: string
  subtitle: string
  motionId?: MotionId
  defaultPalette: ColorPalette
  text: string
  textMuted: string
  borderColor: string
  codeBorder?: string
  preHeaderBg: string
  slots: {
    renderBanner?: (title: string, ctx: RenderContext) => string
    renderToc?: (headings: string[], ctx: RenderContext) => string
    renderH2?: (content: string, index: number, ctx: RenderContext) => string
    renderH3?: (content: string, ctx: RenderContext) => string
    renderStrong?: (content: string, ctx: RenderContext) => string
    renderBlockquote?: (content: string, ctx: RenderContext) => string
    renderDivider?: (ctx: RenderContext) => string
    renderImage?: (href: string, text: string, ctx: RenderContext) => string
    renderTail?: (ctx: RenderContext) => string
  }
}

export interface RenderOptions {
  themeId: ThemeId
  visualLevel: VisualLevel
  paletteId: string
  customColors: CustomColors
  fontSize: FontSizeOption
  author: string
}

export interface ComplianceIssue {
  level: 'warning' | 'info'
  message: string
}

export interface RenderResult {
  html: string
  issues: ComplianceIssue[]
  wordCount: number
  readingMinutes: number
}
