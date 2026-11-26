import { Marked, Renderer, Tokens } from 'marked'
import hljs from 'highlight.js'
import { WECHAT_THEMES } from './presets'
import { ComplianceIssue, RenderOptions, RenderResult, WechatTheme } from './types'

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

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function resolveTheme(options: RenderOptions): WechatTheme {
  const base = WECHAT_THEMES.find((t) => t.id === options.themeId) || WECHAT_THEMES[0]
  if (!options.customColor) return base

  return {
    ...base,
    primary: options.customColor,
    blockquoteBorder: options.customColor,
    codeText: options.customColor
  }
}

function renderTitleBanner(title: string, theme: WechatTheme, options: RenderOptions): string {
  const authorLabel = options.author.trim() || theme.name
  const motionSvg = options.enableMotion
    ? `<svg width="24" height="6" viewBox="0 0 24 6" style="display:inline-block;vertical-align:middle;margin-left:6px;"><circle cx="3" cy="3" r="2" fill="${theme.primary}"><animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite"/></circle><circle cx="11" cy="3" r="2" fill="${theme.primary}" opacity="0.6"><animate attributeName="opacity" values="0.6;1;0.6" dur="2s" begin="0.3s" repeatCount="indefinite"/></circle><circle cx="19" cy="3" r="2" fill="${theme.primary}" opacity="0.3"><animate attributeName="opacity" values="0.3;0.9;0.3" dur="2s" begin="0.6s" repeatCount="indefinite"/></circle></svg>`
    : ''

  return `
    <section style="margin:0 0 24px 0;padding:24px 20px;border:1px solid ${theme.primaryBorder};border-radius:8px;background:${theme.primarySoft};position:relative;text-align:center;">
      <p style="margin:0 0 10px 0;font-size:11px;letter-spacing:1.6px;font-weight:700;color:${theme.primary};text-transform:uppercase;">
        FULL ARTICLE &nbsp;|&nbsp; ${escapeHtml(authorLabel)}${motionSvg}
      </p>
      <h1 style="margin:0;font-size:${options.fontSize + 5}px;line-height:1.45;font-weight:700;color:${theme.headingColor};letter-spacing:-0.2px;">
        ${escapeHtml(title)}
      </h1>
    </section>
  `
}

function renderTocCard(headings: string[], theme: WechatTheme, author: string): string {
  if (headings.length < 2) return ''
  const items = headings
    .slice(0, 8)
    .map((text, idx) => {
      const num = String(idx + 1).padStart(2, '0')
      return `
        <p style="margin:0 0 8px 0;font-size:13px;line-height:1.6;color:${theme.text};">
          <span style="display:inline-block;width:24px;font-weight:700;color:${theme.primary};font-family:monospace;">${num}</span>
          <span>${escapeHtml(text)}</span>
        </p>
      `
    })
    .join('')

  return `
    <section style="margin:0 0 22px 0;padding:16px 18px;border:1px solid ${theme.primaryBorder};border-radius:8px;background:#ffffff;">
      <p style="margin:0 0 4px 0;font-size:10px;letter-spacing:1.5px;font-weight:700;color:${theme.primary};text-transform:uppercase;">
        CONTENTS &nbsp;|&nbsp; 篇幅导览
      </p>
      <p style="margin:0 0 12px 0;font-size:15px;font-weight:700;color:${theme.headingColor};">
        这篇文章将从哪里展开
      </p>
      ${items}
      <p style="margin:10px 0 0 0;padding-top:10px;border-top:1px dashed ${theme.primaryBorder};font-size:11px;color:${theme.textMuted};">
        — ${escapeHtml(author.trim() || '公众号排版工坊')} · 目录导览
      </p>
    </section>
  `
}

export function renderWechatArticle(markdown: string, options: RenderOptions): RenderResult {
  const theme = resolveTheme(options)
  const issues: ComplianceIssue[] = []
  const h2Headings: string[] = []
  let firstH1: string | null = null
  let externalLinkCount = 0

  const marked = new Marked({ gfm: true, breaks: true })
  const tokens = marked.lexer(markdown)

  // 提取首个 H1 与 H2 列表
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

  // 合规扫描
  if (/<script[\s>]/i.test(markdown) || /<iframe[\s>]/i.test(markdown)) {
    issues.push({ level: 'warning', message: '检测到 script/iframe 标签，微信编辑器将自动过滤' })
  }

  const renderer = new Renderer()
  const baseFont = options.fontSize

  renderer.heading = function ({ tokens: innerTokens, depth }: Tokens.Heading) {
    const content = this.parser.parseInline(innerTokens)
    if (depth === 1) {
      return `<h1 style="margin:24px 0 14px 0;font-size:${baseFont + 5}px;line-height:1.4;font-weight:700;color:${theme.headingColor};">${content}</h1>`
    }
    if (depth === 2) {
      return `
        <h2 style="margin:28px 0 14px 0;padding:0 0 8px 10px;border-left:4px solid ${theme.primary};border-bottom:1px solid ${theme.hrColor};font-size:${baseFont + 3}px;line-height:1.4;font-weight:700;color:${theme.headingColor};">
          ${content}
        </h2>
      `
    }
    return `<h3 style="margin:20px 0 10px 0;font-size:${baseFont + 1}px;line-height:1.45;font-weight:700;color:${theme.headingColor};">${content}</h3>`
  }

  renderer.paragraph = function ({ tokens: innerTokens }: Tokens.Paragraph) {
    const content = this.parser.parseInline(innerTokens)
    return `<p style="margin:0 0 16px 0;font-size:${baseFont}px;line-height:1.8;color:${theme.text};letter-spacing:0.2px;text-align:justify;">${content}</p>`
  }

  renderer.strong = function ({ tokens: innerTokens }: Tokens.Strong) {
    const content = this.parser.parseInline(innerTokens)
    return `<strong style="font-weight:700;color:${theme.headingColor};">${content}</strong>`
  }

  renderer.em = function ({ tokens: innerTokens }: Tokens.Em) {
    const content = this.parser.parseInline(innerTokens)
    return `<em style="font-style:italic;color:${theme.textMuted};">${content}</em>`
  }

  renderer.blockquote = function ({ tokens: innerTokens }: Tokens.Blockquote) {
    const content = this.parser.parse(innerTokens)
    return `
      <blockquote style="margin:18px 0;padding:14px 16px;border-left:4px solid ${theme.blockquoteBorder};background:${theme.blockquoteBg};border-radius:0 6px 6px 0;color:${theme.text};font-size:${baseFont - 1}px;line-height:1.75;">
        ${content}
      </blockquote>
    `
  }

  renderer.codespan = ({ text }: Tokens.Codespan) => {
    return `<code style="padding:2px 6px;margin:0 2px;border-radius:4px;background:${theme.codeBg};color:${theme.codeText};font-family:Menlo,Monaco,Consolas,monospace;font-size:${Math.max(12, baseFont - 2)}px;">${escapeHtml(text)}</code>`
  }

  renderer.code = ({ text, lang }: Tokens.Code) => {
    const language = lang && hljs.getLanguage(lang) ? lang : ''
    const highlighted = language
      ? hljs.highlight(text, { language }).value
      : hljs.highlightAuto(text).value
    const inlined = inlineHighlightHtml(highlighted)

    return `
      <section style="margin:18px 0;border-radius:8px;overflow:hidden;background:${theme.preBg};border:1px solid ${theme.preHeaderBg};">
        <section style="padding:8px 12px;background:${theme.preHeaderBg};display:flex;align-items:center;justify-content:space-between;">
          <span style="font-size:11px;color:#94a3b8;font-family:monospace;">
            <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#ef4444;margin-right:5px;"></span>
            <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#f59e0b;margin-right:5px;"></span>
            <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#10b981;margin-right:8px;"></span>
            ${escapeHtml(lang || 'code')}
          </span>
        </section>
        <pre style="margin:0;padding:14px;overflow-x:auto;font-family:Menlo,Monaco,Consolas,monospace;font-size:12.5px;line-height:1.6;color:#e2e8f0;white-space:pre;"><code>${inlined}</code></pre>
      </section>
    `
  }

  renderer.list = function (token: Tokens.List) {
    const tag = token.ordered ? 'ol' : 'ul'
    const items = token.items
      .map((item) => {
        const body = this.parser.parse(item.tokens)
        return `<li style="margin:0 0 8px 0;line-height:1.75;color:${theme.text};font-size:${baseFont}px;">${body}</li>`
      })
      .join('')
    return `<${tag} style="margin:0 0 16px 0;padding-left:22px;color:${theme.text};">${items}</${tag}>`
  }

  renderer.table = function (token: Tokens.Table) {
    const headerCells = token.header
      .map(
        (cell) =>
          `<th style="padding:10px 12px;border:1px solid ${theme.hrColor};background:${theme.primarySoft};color:${theme.headingColor};font-weight:700;text-align:${cell.align || 'left'};font-size:${baseFont - 1}px;">${this.parser.parseInline(cell.tokens)}</th>`
      )
      .join('')
    const rows = token.rows
      .map((row) => {
        const cells = row
          .map(
            (cell) =>
              `<td style="padding:9px 12px;border:1px solid ${theme.hrColor};color:${theme.text};text-align:${cell.align || 'left'};font-size:${baseFont - 1}px;">${this.parser.parseInline(cell.tokens)}</td>`
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
    return `<a href="${escapeHtml(href)}" style="color:${theme.primary};text-decoration:underline;word-break:break-all;">${text}</a>`
  }

  renderer.image = ({ href, text }: Tokens.Image) => {
    return `
      <figure style="margin:18px 0;text-align:center;">
        <img src="${escapeHtml(href)}" alt="${escapeHtml(text || '')}" style="max-width:100%;height:auto;border-radius:6px;display:block;margin:0 auto;border:1px solid ${theme.hrColor};" />
        ${text ? `<figcaption style="margin-top:8px;font-size:12px;color:${theme.textMuted};">${escapeHtml(text)}</figcaption>` : ''}
      </figure>
    `
  }

  renderer.hr = () => {
    return `<hr style="margin:24px 0;border:none;border-top:1px dashed ${theme.hrColor};" />`
  }

  const bodyHtml = marked.parser(filteredTokens, { renderer })

  if (externalLinkCount > 0) {
    issues.push({
      level: 'info',
      message: `包含 ${externalLinkCount} 个外链，公众号正文外链可能无法直接点击`
    })
  }
  const bannerHtml = firstH1 ? renderTitleBanner(firstH1, theme, options) : ''
  const tocHtml = renderTocCard(h2Headings, theme, options.author)

  const containerBgStyle = theme.gridBg
    ? `background-color:${theme.bg};background-image:${theme.gridBg};background-size:20px 20px;`
    : `background-color:${theme.bg};`

  const fullHtml = `
    <section id="wechat-article-root" style="padding:20px 18px;${containerBgStyle}font-family:-apple-system,BlinkMacSystemFont,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif;word-wrap:break-word;box-sizing:border-box;">
      ${bannerHtml}
      ${tocHtml}
      ${bodyHtml}
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
