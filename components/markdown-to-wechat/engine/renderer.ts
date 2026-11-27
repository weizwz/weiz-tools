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
import { ComplianceIssue, RenderContext, RenderOptions, RenderResult } from './types'

const HLJS_INLINE_COLORS: Record<string, string> = {
  'hljs-comment': 'color:#64748b;font-style:italic;',
  'hljs-quote': 'color:#64748b;font-style:italic;',
  'hljs-keyword': 'color:#c084fc;font-weight:600;',
  'hljs-selector-tag': 'color:#c084fc;font-weight:600;',
  'hljs-literal': 'color:#f472b6;',
  'hljs-number': 'color:#fb923c;',
  'hljs-string': 'color:#4ade80;',
  'hljs-regexp': 'color:#4ade80;',
  'hljs-title': 'color:#60a5fa;font-weight:600;',
  'hljs-section': 'color:#60a5fa;font-weight:600;',
  'hljs-function': 'color:#60a5fa;',
  'hljs-built_in': 'color:#38bdf8;',
  'hljs-type': 'color:#38bdf8;',
  'hljs-attr': 'color:#fbbf24;',
  'hljs-attribute': 'color:#fbbf24;',
  'hljs-variable': 'color:#f87171;',
  'hljs-params': 'color:#e2e8f0;',
  'hljs-meta': 'color:#94a3b8;',
  'hljs-tag': 'color:#94a3b8;',
  'hljs-name': 'color:#f472b6;',
  'hljs-punctuation': 'color:#94a3b8;'
}

function inlineHighlightHtml(html: string): string {
  return html.replace(/<span class="([^"]+)">/g, (_, classNames: string) => {
    const styles = classNames
      .split(/\s+/)
      .map((cls) => HLJS_INLINE_COLORS[cls] || '')
      .filter(Boolean)
      .join('')
    return styles ? `<span style="${styles}">` : '<span>'
  })
}

export function renderWechatArticle(markdown: string, options: RenderOptions): RenderResult {
  const theme = getThemeById(options.themeId)
  const motion = getMotionById(options.motionId)
  const colors = resolvePaletteColors(theme, options.paletteId, options.customColors)
  const now = new Date()
  const { meta } = options
  const dateStr = meta.date.trim() || `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}`

  const ctx: RenderContext = {
    theme,
    motion,
    animated: options.animated,
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
      return slots.renderH2(content, h2Index, ctx)
    }
    return slots.renderH3(content, ctx)
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
    return slots.renderBlockquote(this.parser.parse(innerTokens), ctx)
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
    const inlined = inlineHighlightHtml(highlighted)

    const lines = inlined
      .split('\n')
      .map((line) => {
        const safeLine =
          line.replace(/^ +/g, (spaces) => '　'.repeat(Math.ceil(spaces.length / 2))) || '&nbsp;'
        return `<p style="margin:0;font-family:'SF Mono',Consolas,Monaco,monospace;font-size:12.5px;line-height:1.6;color:#E2E8F0;word-break:break-all;">${safeLine}</p>`
      })
      .join('')

    const macHeader = `<section style="display:flex;align-items:center;padding:9px 14px;background:${theme.preHeaderBg};border-bottom:1px solid rgba(255,255,255,0.06);">
          <span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:#FF5F56;margin-right:6px;"></span>
          <span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:#FFBD2E;margin-right:6px;"></span>
          <span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:#27C93F;margin-right:10px;"></span>
          <span style="font-size:11px;color:#94A3B8;font-family:Consolas,Monaco,monospace;letter-spacing:1px;">${escapeHtml(lang || 'code')}</span>
        </section>`

    return `
      <section style="margin:18px 0;border-radius:8px;overflow:hidden;background:${colors.codeBlockBg};box-shadow:0 4px 16px -8px rgba(15,23,42,0.4);">
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
    <section id="wechat-article-root" style="padding:20px 18px;background-color:${colors.bg};font-family:-apple-system,BlinkMacSystemFont,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif;word-wrap:break-word;box-sizing:border-box;">
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
