import { Marked, Renderer, Tokens } from 'marked'
import hljs from 'highlight.js'
import { getMotionById } from './motions'
import { getThemeById } from './themes'
import { baseSlots } from './themes/base'
import {
  escapeHtml,
  hexToRgba,
  resolvePaletteColors
} from './tokens'
import { ComplianceIssue, PaletteColors, RenderContext, RenderOptions, RenderResult } from './types'

function buildHljsInlineColors(colors: PaletteColors): Record<string, string> {
  return {
    'hljs-comment': `color:${hexToRgba(colors.heading, 0.5)};font-style:italic;`,
    'hljs-quote': `color:${hexToRgba(colors.heading, 0.5)};font-style:italic;`,
    'hljs-keyword': `color:${colors.strong};font-weight:600;`,
    'hljs-selector-tag': `color:${colors.strong};font-weight:600;`,
    'hljs-literal': 'color:#be185d;',
    'hljs-number': 'color:#c2410c;',
    'hljs-string': 'color:#15803d;',
    'hljs-regexp': 'color:#15803d;',
    'hljs-title': `color:${colors.headingDecor};font-weight:600;`,
    'hljs-section': `color:${colors.headingDecor};font-weight:600;`,
    'hljs-function': `color:${colors.headingDecor};`,
    'hljs-built_in': `color:${colors.inlineCodeText};`,
    'hljs-type': `color:${colors.inlineCodeText};`,
    'hljs-attr': 'color:#b45309;',
    'hljs-attribute': 'color:#b45309;',
    'hljs-variable': 'color:#dc2626;',
    'hljs-params': `color:${colors.heading};`,
    'hljs-meta': `color:${hexToRgba(colors.heading, 0.65)};`,
    'hljs-tag': `color:${hexToRgba(colors.heading, 0.65)};`,
    'hljs-name': 'color:#be185d;',
    'hljs-punctuation': `color:${hexToRgba(colors.heading, 0.65)};`
  }
}

function inlineHighlightHtml(html: string, colors: PaletteColors): string {
  const colorMap = buildHljsInlineColors(colors)
  return html.replace(/<span class="([^"]+)">/g, (_, classNames: string) => {
    const styles = classNames
      .split(/\s+/)
      .map((cls) => colorMap[cls] || '')
      .filter(Boolean)
      .join('')
    return styles ? `<span style="${styles}">` : '<span>'
  })
}

function isDarkHex(hex: string): boolean {
  const clean = hex.replace('#', '')
  const normalized =
    clean.length === 3
      ? clean
          .split('')
          .map((c) => c + c)
          .join('')
      : clean
  if (normalized.length !== 6) return false
  const r = parseInt(normalized.slice(0, 2), 16)
  const g = parseInt(normalized.slice(2, 4), 16)
  const b = parseInt(normalized.slice(4, 6), 16)
  if ([r, g, b].some(Number.isNaN)) return false
  return (r * 299 + g * 587 + b * 114) / 1000 < 140
}

export function renderWechatArticle(markdown: string, options: RenderOptions): RenderResult {
  const rawTheme = getThemeById(options.themeId)
  const motion = getMotionById(options.motionId)
  const colors = resolvePaletteColors(rawTheme, options.paletteId, options.customColors)
  const bgDark = isDarkHex(colors.bg)
  const textDark = isDarkHex(rawTheme.text)
  const theme =
    bgDark === textDark
      ? {
          ...rawTheme,
          text: bgDark ? '#E4E4E7' : '#27272A',
          textMuted: bgDark ? '#A1A1AA' : '#6B7280',
          borderColor: colors.divider,
          codeBorder: colors.divider
        }
      : rawTheme
  const now = new Date()
  const { meta } = options
  const dateStr = meta.date.trim() || `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}`

  const ctx: RenderContext = {
    theme,
    motion,
    animated: options.animated,
    headingNumbering: options.headingNumbering || 'numeric',
    colors,
    fontSize: options.fontSize,
    author: meta.author,
    dateStr,
    meta
  }

  const slots = { ...baseSlots, ...theme.slots }
  const issues: ComplianceIssue[] = []
  const h2Headings: string[] = []
  let firstH1: string | null = null
  let externalLinkCount = 0
  let h2Index = 0
  let h3Index = 0

  const marked = new Marked({ gfm: true, breaks: true })
  const tokens = marked.lexer(markdown)

  const filteredTokens = tokens.filter((token) => {
    if (token.type === 'heading') {
      const headingToken = token as Tokens.Heading
      if (headingToken.depth === 1 && firstH1 === null) {
        firstH1 = headingToken.text
        return false
      }
      if (headingToken.depth === 2) {
        h2Headings.push(headingToken.text)
      }
    }
    return true
  })

  if (/<script[\s>]/i.test(markdown) || /<iframe[\s>]/i.test(markdown)) {
    issues.push({ level: 'warning', message: '检测到 script/iframe 标签，微信编辑器将自动过滤' })
  }

  const renderer = new Renderer()
  const baseFont = options.fontSize

  renderer.heading = function ({ tokens: innerTokens, depth }: Tokens.Heading) {
    const content = this.parser.parseInline(innerTokens)
    if (depth === 1) {
      return `<h1 style="margin:24px 0 14px 0;font-size:${baseFont + 5}px;line-height:1.4;font-weight:800;color:${colors.heading};">${content}</h1>`
    }
    if (depth === 2) {
      h2Index++
      h3Index = 0
      return slots.renderH2(content, h2Index, ctx)
    }
    if (depth === 3) {
      h3Index++
      return slots.renderH3(content, h2Index, h3Index, ctx)
    }
    return slots.renderH4(content, ctx)
  }

  renderer.paragraph = function ({ tokens: innerTokens }: Tokens.Paragraph) {
    const content = this.parser.parseInline(innerTokens)
    return `<p style="margin:0 0 18px 0;font-size:${baseFont}px;line-height:1.85;color:${theme.text};letter-spacing:0.2px;text-align:justify;">${content}</p>`
  }

  renderer.strong = function ({ tokens: innerTokens }: Tokens.Strong) {
    return slots.renderStrong(this.parser.parseInline(innerTokens), ctx)
  }

  renderer.em = function ({ tokens: innerTokens }: Tokens.Em) {
    const content = this.parser.parseInline(innerTokens)
    return `<em style="font-style:italic;color:${theme.textMuted};">${content}</em>`
  }

  renderer.blockquote = function ({ tokens: innerTokens }: Tokens.Blockquote) {
    const raw = this.parser.parse(innerTokens).trim()
    const compact = raw
      .replace(/margin:0 0 18px 0;/g, 'margin:0 0 6px 0;')
      .replace(/line-height:1\.85;/g, 'line-height:1.65;')
      .replace(/(<p style="[^"]*margin:0 0 )6px( 0;[^"]*">)(?![\s\S]*<p )/i, '$10$2')
    return slots.renderBlockquote(compact, ctx)
  }

  renderer.codespan = ({ text }: Tokens.Codespan) => {
    const border = theme.codeBorder ? `border:1px solid ${theme.codeBorder};` : ''
    const shadow = `box-shadow:0 1px 2px ${hexToRgba(colors.inlineCodeText, 0.08)};`
    return `<span style="padding:2px 6px;margin:0 2px;border-radius:4px;background:${colors.inlineCodeBg};color:${colors.inlineCodeText};${border}${shadow}font-family:Menlo,Monaco,Consolas,monospace;font-size:${Math.max(12, baseFont - 2)}px;font-weight:600;">${escapeHtml(text)}</span>`
  }

  renderer.code = ({ text, lang }: Tokens.Code) => {
    const language = lang && hljs.getLanguage(lang) ? lang : ''
    const highlighted = language
      ? hljs.highlight(text, { language }).value
      : hljs.highlightAuto(text).value
    const inlined = inlineHighlightHtml(highlighted, colors)

    const lines = inlined
      .split('\n')
      .map((line) => {
        const safeLine =
          line.replace(/^ +/g, (spaces) => '　'.repeat(Math.ceil(spaces.length / 2))) || '&nbsp;'
        return `<p style="margin:0;font-family:'SF Mono',Consolas,Monaco,monospace;font-size:12.5px;line-height:1.6;color:${colors.heading};word-break:break-all;">${safeLine}</p>`
      })
      .join('')

    const codeBadge = motion.renderCodeBadge(colors, options.animated)
    const macHeader = `<section style="display:flex;align-items:center;justify-content:space-between;padding:9px 14px;background:${hexToRgba(colors.headingDecor, 0.08)};border-bottom:1px solid ${hexToRgba(colors.headingDecor, 0.14)};">
          <section style="display:flex;align-items:center;">
            <span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:#FF5F56;margin-right:6px;"></span>
            <span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:#FFBD2E;margin-right:6px;"></span>
            <span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:#27C93F;margin-right:10px;"></span>
            <span style="font-size:11px;color:${hexToRgba(colors.inlineCodeText, 0.85)};font-family:Consolas,Monaco,monospace;letter-spacing:1px;">${escapeHtml(lang || 'code')}</span>
          </section>
          <section style="flex-shrink:0;">${codeBadge}</section>
        </section>`

    return `
      <section style="margin:18px 0;border-radius:8px;overflow:hidden;background:${colors.inlineCodeBg};border:1px solid ${hexToRgba(colors.headingDecor, 0.2)};box-shadow:0 4px 16px -8px ${hexToRgba(colors.inlineCodeText, 0.16)};">
        ${macHeader}
        <section style="padding:12px 14px;">${lines}</section>
      </section>
    `
  }

  renderer.list = function (token: Tokens.List) {
    const items = token.items
      .map((item, idx) => {
        const body = this.parser
          .parse(item.tokens)
          .replace(/^<p[^>]*>([\s\S]*?)<\/p>\s*$/i, '$1')
        const marker = token.ordered ? `${idx + 1}.` : '•'
        return `
          <section style="display:flex;align-items:flex-start;margin:0 0 8px 0;line-height:1.75;color:${theme.text};font-size:${baseFont}px;">
            <span style="flex-shrink:0;min-width:18px;font-weight:700;color:${colors.listMarker};margin-right:4px;">${marker}</span>
            <section style="flex:1;min-width:0;">${body}</section>
          </section>
        `
      })
      .join('')
    return `<section style="margin:0 0 16px 0;">${items}</section>`
  }

  renderer.table = function (token: Tokens.Table) {
    const borderCol = hexToRgba(colors.headingDecor, 0.22)
    const headerCells = token.header
      .map(
        (cell) =>
          `<th style="padding:10px 12px;border:1px solid ${borderCol};background:${colors.tableAccent};color:${colors.heading};font-weight:700;text-align:${cell.align || 'left'};font-size:${baseFont - 1}px;">${this.parser.parseInline(cell.tokens)}</th>`
      )
      .join('')
    const rows = token.rows
      .map((row, rIdx) => {
        const rowBg = rIdx % 2 === 1 ? hexToRgba(colors.tableAccent, 0.5) : 'transparent'
        const cells = row
          .map(
            (cell) =>
              `<td style="padding:9px 12px;border:1px solid ${borderCol};background:${rowBg};color:${theme.text};text-align:${cell.align || 'left'};font-size:${baseFont - 1}px;">${this.parser.parseInline(cell.tokens)}</td>`
          )
          .join('')
        return `<tr>${cells}</tr>`
      })
      .join('')

    return `
      <section style="margin:18px 0;overflow-x:auto;">
        <table style="width:100%;border-collapse:collapse;border-spacing:0;">
          <thead><tr>${headerCells}</tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </section>
    `
  }

  renderer.link = function ({ href, tokens: innerTokens }: Tokens.Link) {
    const text = this.parser.parseInline(innerTokens)
    if (/^https?:\/\//i.test(href) && !href.includes('mp.weixin.qq.com')) {
      externalLinkCount++
    }
    return `<a href="${escapeHtml(href)}" style="color:${colors.headingDecor};text-decoration:underline;word-break:break-all;">${text}</a>`
  }

  renderer.image = ({ href, text }: Tokens.Image) => slots.renderImage(href, text || '', ctx)

  renderer.hr = () => slots.renderDivider(ctx)

  const bodyHtml = marked.parser(filteredTokens, { renderer })

  if (externalLinkCount > 0) {
    issues.push({
      level: 'info',
      message: `包含 ${externalLinkCount} 个外链，公众号正文外链可能无法直接点击`
    })
  }

  const bannerHtml =
    firstH1 && theme.slots.renderBanner
      ? theme.slots.renderBanner(firstH1, ctx)
      : ''
  const tocHtml =
    h2Headings.length >= 2 && theme.slots.renderToc
      ? theme.slots.renderToc(h2Headings, ctx)
      : ''

  const endingHtml = slots.renderEnding(ctx)
  const tailHtml = slots.renderTail(ctx)

  const fullHtml = `
    <section id="wechat-article-root" style="padding:20px 18px;background-color:${colors.bg};font-family:-apple-system,BlinkMacSystemFont,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif;word-wrap:break-word;max-width:100%;overflow:hidden;box-sizing:border-box;">
      ${bannerHtml}
      ${tocHtml}
      ${bodyHtml}
      ${endingHtml}
      ${tailHtml}
    </section>
  `.trim()

  const plainText = markdown.replace(/[#>*`~\-\[\]()!|]/g, '').trim()
  const wordCount = plainText.length
  const readingMinutes = Math.max(1, Math.ceil(wordCount / 400))

  return {
    html: fullHtml,
    issues,
    wordCount,
    readingMinutes
  }
}
