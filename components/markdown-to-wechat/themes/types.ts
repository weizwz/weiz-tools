export type ThemeId = 'blueprint' | 'minimal-tech' | 'editorial' | 'geek-dark'

export type PreviewWidth = 375 | 402 | 440

export type FontSizeOption = 14 | 15 | 16 | 17

export interface WechatTheme {
  id: ThemeId
  name: string
  badge: string
  description: string
  primary: string
  primarySoft: string
  primaryBorder: string
  text: string
  textMuted: string
  headingColor: string
  bg: string
  gridBg?: string
  blockquoteBg: string
  blockquoteBorder: string
  codeBg: string
  codeText: string
  preBg: string
  preHeaderBg: string
  hrColor: string
}

export interface RenderOptions {
  themeId: ThemeId
  customColor?: string
  fontSize: FontSizeOption
  enableMotion: boolean
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
