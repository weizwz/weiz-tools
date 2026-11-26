export type ThemeId = 'moyu-green' | 'red-white' | 'olive-journal'

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

export interface WechatTheme {
  id: ThemeId
  name: string
  subtitle: string
  palette: ColorPalette
  palettes: ColorPalette[]
  text: string
  textMuted: string
  borderColor: string
  codeBorder?: string
  preHeaderBg: string
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
