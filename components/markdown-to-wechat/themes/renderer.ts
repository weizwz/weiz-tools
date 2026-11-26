import { Marked, Renderer, Tokens } from 'marked'
import hljs from 'highlight.js'
import { WECHAT_THEMES } from './presets'
import { ComplianceIssue, PaletteColors, RenderOptions, RenderResult, WechatTheme } from './types'

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

function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace('#', '')
  const normalized =
    clean.length === 3
      ? clean
          .split('')
          .map((c) => c + c)
          .join('')
      : clean
  const intVal = parseInt(normalized, 16)
  if (Number.isNaN(intVal)) return `rgba(37, 99, 235, ${alpha})`
  const r = (intVal >> 16) & 255
  const g = (intVal >> 8) & 255
  const b = intVal & 255
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
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

interface ResolvedStyle {
  theme: WechatTheme
  colors: PaletteColors
  primaryBorder: string
  blockquoteBg: string
  hasDecorations: boolean
  useMotion: boolean
}

function resolveStyle(options: RenderOptions): ResolvedStyle {
  const theme = WECHAT_THEMES.find((t) => t.id === options.themeId) || WECHAT_THEMES[0]
  const basePalette = theme.palettes.find((p) => p.id === options.paletteId) || theme.palette

  const colors: PaletteColors =
    options.paletteId === 'custom'
      ? { ...basePalette.colors, ...options.customColors }
      : basePalette.colors

  return {
    theme,
    colors,
    primaryBorder: hexToRgba(colors.headingDecor, 0.24),
    blockquoteBg: hexToRgba(colors.blockquoteAccent, 0.06),
    hasDecorations: options.visualLevel !== 'basic',
    useMotion: options.visualLevel === 'motion'
  }
}

function renderBannerMotionSvg(resolved: ResolvedStyle): string {
  const { colors, primaryBorder, useMotion } = resolved
  const pulse = useMotion
    ? '<animate attributeName="cx" values="10;150;10" dur="3.8s" repeatCount="indefinite"/>'
    : ''
  return `<svg width="160" height="10" viewBox="0 0 160 10" style="display:block;margin:8px 0 0 0;"><line x1="0" y1="5" x2="152" y2="5" stroke="${primaryBorder}" stroke-width="1.5"/><circle cx="10" cy="5" r="3" fill="${colors.headingDecor}">${pulse}</circle></svg>`
}

function renderTitleBanner(title: string, resolved: ResolvedStyle, options: RenderOptions): string {
  const { theme, colors, useMotion } = resolved
  const authorLabel = options.author.trim() || theme.name
  const now = new Date()
  const dateStr = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}`

  const statusDots = useMotion
    ? `<svg width="24" height="6" viewBox="0 0 24 6" style="display:inline-block;vertical-align:middle;margin-left:6px;"><circle cx="3" cy="3" r="2" fill="${colors.headingDecor}"><animate attributeName="opacity" values="1;0.25;1" dur="1.8s" repeatCount="indefinite"/></circle><circle cx="11" cy="3" r="2" fill="${colors.strong}" opacity="0.65"><animate attributeName="opacity" values="0.65;1;0.25;0.65" dur="1.8s" begin="0.25s" repeatCount="indefinite"/></circle><circle cx="19" cy="3" r="2" fill="${colors.headingDecor}" opacity="0.35"><animate attributeName="opacity" values="0.35;0.95;0.35" dur="1.8s" begin="0.5s" repeatCount="indefinite"/></circle></svg>`
    : ''

  if (theme.id === 'moyu-green') {
    const borderCol = hexToRgba(colors.headingDecor, 0.28)
    const tagBg = hexToRgba(colors.headingDecor, 0.08)
    return `
      <section style="margin:0 0 24px 0;background:${colors.bg};border-radius:16px;overflow:hidden;border:1px solid ${borderCol};box-shadow:0 4px 16px -6px ${hexToRgba(colors.headingDecor, 0.14)};">
        <section style="padding:24px 22px 16px;background:linear-gradient(135deg,${tagBg} 0%,${colors.bg} 70%);">
          <section style="display:flex;align-items:center;gap:6px;margin-bottom:14px;">
            <span style="width:7px;height:7px;background:${colors.headingDecor};border-radius:50%;display:inline-block;"><span leaf="">&nbsp;</span></span>
            <span style="font-size:10px;font-weight:700;letter-spacing:2px;color:${colors.headingDecor};">DEEP DIVE · 深度解析${statusDots}</span>
            <span style="flex:1;height:1px;background:linear-gradient(to right,${borderCol},transparent);display:inline-block;"><span leaf="">&nbsp;</span></span>
            <span style="font-size:10px;color:${theme.textMuted};font-weight:500;">${dateStr}</span>
          </section>
          <p style="font-size:${options.fontSize + 5}px;font-weight:900;color:${colors.heading};margin:0 0 12px;line-height:1.35;letter-spacing:-0.4px;">
            ${escapeHtml(title)}
          </p>
          <section style="width:48px;height:3px;background:linear-gradient(to right,${colors.headingDecor},${colors.strong});border-radius:2px;margin-bottom:10px;"><span leaf="">&nbsp;</span></section>
          ${renderBannerMotionSvg(resolved)}
        </section>
        <section style="background:${colors.headingDecor};padding:11px 22px;display:flex;align-items:center;justify-content:space-between;">
          <p style="font-size:12px;color:rgba(255,255,255,0.92);margin:0;font-weight:600;letter-spacing:0.5px;">${escapeHtml(authorLabel)}</p>
          <section style="display:flex;gap:4px;">
            <span style="background:rgba(255,255,255,0.2);padding:2px 7px;border-radius:3px;font-size:9px;color:#fff;font-weight:600;">深度拆解</span>
            <span style="background:rgba(255,255,255,0.2);padding:2px 7px;border-radius:3px;font-size:9px;color:#fff;font-weight:600;">实战</span>
          </section>
        </section>
      </section>
    `
  }

  if (theme.id === 'red-white') {
    const shadowColor = hexToRgba(colors.headingDecor, 0.16)
    return `
      <section style="margin:6px 4px 26px;background:${colors.bg};border-radius:12px;box-shadow:0 4px 24px -4px ${shadowColor};border:1px solid ${colors.tableAccent};padding:24px 22px 18px;overflow:hidden;">
        <p style="font-size:36px;color:${colors.headingDecor};font-weight:900;margin:0;line-height:0.6;">“</p>
        <p style="font-size:17px;font-weight:800;color:${colors.heading};margin:12px 0 8px;line-height:1.65;">
          ${escapeHtml(title)}
        </p>
        ${renderBannerMotionSvg(resolved)}
        <p style="text-align:right;font-size:12px;color:${theme.textMuted};margin:10px 0 0;letter-spacing:1px;">
          —— ${escapeHtml(authorLabel)}${statusDots}
        </p>
      </section>
    `
  }

  // olive-journal
  const parts = title.split(/[：:]/).map((s) => s.trim()).filter(Boolean)
  const mainTitle = parts[0] || title
  const emphasis = parts[1] || ''
  return `
    <section style="margin:0 0 24px 0;background:${colors.bg};border:1px solid ${theme.borderColor};border-radius:6px;overflow:hidden;">
      <section style="padding:22px 20px 18px;">
        <section style="display:flex;align-items:center;gap:8px;margin-bottom:18px;">
          <span style="width:8px;height:8px;background:${colors.headingDecor};border-radius:50%;display:inline-block;"><span leaf="">&nbsp;</span></span>
          <span style="font-size:10px;font-weight:700;letter-spacing:2.5px;color:#65675e;">橄榄手记 · 专栏观察${statusDots}</span>
          <span style="flex:1;height:1px;background:${theme.borderColor};display:inline-block;"><span leaf="">&nbsp;</span></span>
          <span style="font-size:10px;color:${theme.textMuted};font-weight:500;">${dateStr}</span>
        </section>
        <section style="display:flex;align-items:stretch;gap:14px;">
          <section style="flex:1;min-width:0;">
            <p style="font-size:20px;font-weight:800;color:${colors.heading};margin:0 0 10px;line-height:1.25;letter-spacing:-0.4px;">
              ${escapeHtml(mainTitle)}${emphasis ? ` · <span style="border-bottom:3px solid ${colors.headingDecor};">${escapeHtml(emphasis)}</span>` : ''}
            </p>
            <section style="display:flex;align-items:center;gap:4px;margin-bottom:10px;">
              <span style="width:22px;height:3px;background:${colors.headingDecor};border-radius:2px;display:inline-block;"></span>
              <span style="width:8px;height:3px;background:${colors.strong};border-radius:2px;display:inline-block;"></span>
            </section>
            ${renderBannerMotionSvg(resolved)}
          </section>
          <section style="flex-shrink:0;width:84px;display:flex;flex-direction:column;align-items:center;justify-content:center;background:${colors.tableAccent};border:1px dashed ${theme.borderColor};border-radius:6px;padding:6px;">
            <svg width="52" height="52" viewBox="0 0 64 64" style="display:block;">
              <ellipse cx="32" cy="36" rx="22" ry="18" fill="none" stroke="${theme.text}" stroke-width="2"></ellipse>
              <circle cx="26" cy="30" r="3" fill="${theme.text}"></circle>
              <circle cx="38" cy="30" r="3" fill="${theme.text}"></circle>
              <path d="M28 40 Q32 44 36 40" fill="none" stroke="${theme.text}" stroke-width="1.5"></path>
              <path d="M12 34 L8 28 M52 34 L56 28" stroke="${theme.borderColor}" stroke-width="2" stroke-linecap="round"></path>
            </svg>
            <span style="font-size:8px;font-weight:700;color:${theme.textMuted};letter-spacing:1px;margin-top:3px;">DOODLE</span>
          </section>
        </section>
      </section>
      <section style="background:${colors.heading};padding:10px 20px;display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;">
        <p style="font-size:12px;color:rgba(255,255,255,0.92);margin:0;font-weight:600;">${escapeHtml(authorLabel)}</p>
        <section style="display:flex;gap:6px;">
          <span style="background:#e5e7e0;color:#23251d;padding:2px 7px;border-radius:4px;font-size:8px;font-weight:700;border:1px solid ${theme.borderColor};">JOURNAL</span>
          <span style="background:#e5e7e0;color:#23251d;padding:2px 7px;border-radius:4px;font-size:8px;font-weight:700;border:1px solid ${theme.borderColor};">NOTES</span>
        </section>
      </section>
    </section>
  `
}

function renderTocCard(headings: string[], resolved: ResolvedStyle): string {
  if (headings.length < 2) return ''
  const { theme, colors } = resolved

  if (theme.id === 'moyu-green') {
    const cards = headings
      .slice(0, 6)
      .map((text, idx) => {
        const num = String(idx + 1).padStart(2, '0')
        if (idx === 0) {
          return `
            <section style="display:inline-block;white-space:normal;vertical-align:top;width:112px;background:${colors.headingDecor};border-radius:12px;padding:12px;margin-right:8px;">
              <p style="font-size:9px;font-weight:700;color:rgba(255,255,255,0.75);letter-spacing:1px;margin:0 0 5px;">PART ${num}</p>
              <p style="font-size:12.5px;font-weight:800;color:#fff;margin:0;line-height:1.4;">${escapeHtml(text)}</p>
            </section>
          `
        }
        return `
          <section style="display:inline-block;white-space:normal;vertical-align:top;width:112px;background:#fff;border:1px solid #E5E7EB;border-radius:12px;padding:12px;margin-right:8px;box-shadow:0 2px 6px rgba(0,0,0,0.04);">
            <p style="font-size:9px;font-weight:700;color:#9CA3AF;letter-spacing:1px;margin:0 0 5px;">PART ${num}</p>
            <p style="font-size:12.5px;font-weight:800;color:${colors.heading};margin:0;line-height:1.4;">${escapeHtml(text)}</p>
          </section>
        `
      })
      .join('')

    return `
      <section style="margin:0 0 28px 0;">
        <section style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
          <p style="font-size:10px;color:#9CA3AF;margin:0;text-transform:uppercase;letter-spacing:1.5px;font-weight:600;">📦 ${headings.length} PARTS + CONCLUSION</p>
          <p style="font-size:10px;color:#9CA3AF;margin:0;">👉 滑动</p>
        </section>
        <section style="overflow-x:auto;white-space:nowrap;padding-bottom:6px;">
          ${cards}
          <section style="display:inline-block;white-space:normal;vertical-align:top;width:112px;background:#fff;border:1px solid #E5E7EB;border-radius:12px;padding:12px;box-shadow:0 2px 6px rgba(0,0,0,0.04);">
            <p style="font-size:9px;font-weight:700;color:#9CA3AF;letter-spacing:1px;margin:0 0 5px;">PART ///</p>
            <p style="font-size:12.5px;font-weight:800;color:${colors.heading};margin:0;line-height:1.4;">写在最后</p>
          </section>
        </section>
      </section>
    `
  }

  if (theme.id === 'red-white') {
    const rows = headings
      .slice(0, 6)
      .map((text, idx) => {
        const num = String(idx + 1).padStart(2, '0')
        return `
          <p style="margin:0 0 8px 0;font-size:13px;line-height:1.6;color:${theme.text};">
            <span style="display:inline-block;background:${colors.headingDecor};color:#fff;font-size:10px;font-weight:800;padding:1px 6px;border-radius:4px;margin-right:8px;">${num}</span>
            <span>${escapeHtml(text)}</span>
          </p>
        `
      })
      .join('')

    return `
      <section style="margin:0 0 24px 0;padding:16px 18px;border:1px solid ${colors.divider};border-radius:10px;background:${colors.tableAccent};">
        <p style="margin:0 0 10px 0;font-size:11px;font-weight:800;letter-spacing:1.5px;color:${colors.headingDecor};text-transform:uppercase;">CONTENTS · 篇幅导览</p>
        ${rows}
      </section>
    `
  }

  // olive-journal
  const items = headings
    .slice(0, 6)
    .map((text, idx) => {
      const num = String(idx + 1).padStart(2, '0')
      return `
        <p style="margin:0 0 6px 0;font-size:13px;line-height:1.6;color:${theme.text};">
          <span style="display:inline-block;width:24px;font-weight:700;color:${colors.headingDecor};font-family:monospace;">${num}</span>
          <span>${escapeHtml(text)}</span>
        </p>
      `
    })
    .join('')

  return `
    <section style="margin:0 0 24px 0;background:${colors.bg};border:1px solid ${theme.borderColor};border-radius:6px;overflow:hidden;">
      <section style="padding:10px 16px;background:${colors.heading};display:flex;align-items:center;justify-content:space-between;gap:10px;">
        <p style="margin:0;font-size:10px;font-weight:800;letter-spacing:2px;color:#ffffff;">EDITOR'S NOTE · 篇幅导览</p>
        <span style="font-size:10px;color:rgba(255,255,255,0.7);">${headings.length} 节</span>
      </section>
      <section style="padding:14px 16px;background:${colors.tableAccent};">
        ${items}
      </section>
    </section>
  `
}

function renderDivider(resolved: ResolvedStyle): string {
  const { theme, colors, useMotion, hasDecorations } = resolved

  if (!hasDecorations) {
    return `<hr style="margin:24px 0;border:none;border-top:1px dashed ${colors.divider};" />`
  }

  if (theme.id === 'red-white' && !useMotion) {
    return `
      <section style="margin:26px 0;">
        <section style="height:1px;background:linear-gradient(to right,transparent,${colors.divider},${colors.headingDecor},${colors.divider},transparent);"><span leaf="">&nbsp;</span></section>
      </section>
    `
  }

  if (theme.id === 'olive-journal' && !useMotion) {
    return `
      <section style="margin:26px 0;display:flex;align-items:center;justify-content:center;gap:10px;">
        <span style="width:8px;height:8px;border-radius:50%;background:${theme.text};display:inline-block;"></span>
        <span style="width:8px;height:8px;border-radius:50%;background:${colors.divider};display:inline-block;"></span>
        <span style="width:8px;height:8px;border-radius:50%;background:${colors.headingDecor};display:inline-block;"></span>
      </section>
    `
  }

  if (!useMotion) {
    return `<hr style="margin:24px 0;border:none;border-top:1px dashed ${colors.divider};" />`
  }

  return `
    <section style="margin:24px 0;text-align:center;">
      <svg width="100%" height="14" viewBox="0 0 240 14" preserveAspectRatio="none" style="display:block;">
        <line x1="0" y1="7" x2="240" y2="7" stroke="${colors.divider}" stroke-width="1" stroke-dasharray="4 4"/>
        <circle cx="120" cy="7" r="3" fill="${colors.headingDecor}">
          <animate attributeName="cx" values="20;220;20" dur="5s" repeatCount="indefinite"/>
        </circle>
      </svg>
    </section>
  `
}

export function renderWechatArticle(markdown: string, options: RenderOptions): RenderResult {
  const resolved = resolveStyle(options)
  const { theme, colors, blockquoteBg } = resolved
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
      if (headingToken.depth === 1 && firstH1 === null && resolved.hasDecorations) {
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
      const num = String(h2Index).padStart(2, '0')
      const marginTop = h2Index === 1 ? '18px' : '34px'

      if (theme.id === 'moyu-green') {
        return `
          <section style="margin:${marginTop} 0 18px 0;display:flex;align-items:center;gap:14px;">
            <section style="text-align:center;flex-shrink:0;">
              <p style="margin:0;font-size:26px;font-weight:900;color:${colors.headingDecor};line-height:1;letter-spacing:-1.5px;">${num}</p>
              <p style="margin:2px 0 0;font-size:8px;font-weight:700;color:${colors.divider};letter-spacing:2px;">PART</p>
            </section>
            <span style="width:1px;height:32px;background:${colors.divider};flex-shrink:0;display:inline-block;"></span>
            <h2 style="margin:0;font-size:${baseFont + 2}px;font-weight:900;color:${colors.heading};line-height:1.35;letter-spacing:0.3px;">${content}</h2>
          </section>
        `
      }

      if (theme.id === 'red-white') {
        return `
          <section style="margin:${marginTop} 0 18px 0;padding-bottom:12px;border-bottom:3px solid ${colors.headingDecor};display:flex;align-items:center;">
            <span style="display:inline-block;background:${colors.headingDecor};color:#FFFFFF;font-size:16px;font-weight:900;padding:3px 12px;border-radius:6px;margin-right:12px;line-height:1.3;">${num}</span>
            <h2 style="margin:0;font-size:${baseFont + 2}px;font-weight:800;color:${colors.heading};line-height:1.35;letter-spacing:0.4px;">${content}</h2>
          </section>
        `
      }

      // olive-journal
      return `
        <section style="margin:${marginTop} 0 18px 0;display:flex;align-items:center;gap:14px;">
          <section style="text-align:center;flex-shrink:0;">
            <p style="margin:0;font-size:24px;font-weight:800;color:${colors.heading};line-height:1;letter-spacing:-1.5px;">${num}</p>
            <p style="margin:2px 0 0;font-size:8px;font-weight:700;color:${colors.headingDecor};letter-spacing:2px;">PART</p>
          </section>
          <span style="width:1px;height:32px;background:${colors.divider};flex-shrink:0;display:inline-block;"></span>
          <h2 style="margin:0;font-size:${baseFont + 2}px;font-weight:800;color:${colors.heading};line-height:1.35;letter-spacing:0.2px;">${content}</h2>
        </section>
      `
    }

    if (theme.id === 'moyu-green') {
      return `
        <section style="margin:24px 0 12px 0;display:flex;align-items:center;gap:8px;">
          <span style="display:inline-block;width:3px;height:14px;border-radius:2px;background:${colors.headingDecor};flex-shrink:0;"></span>
          <h3 style="margin:0;font-size:${baseFont + 1}px;font-weight:700;color:${colors.heading};line-height:1.4;">${content}</h3>
        </section>
      `
    }
    return `<h3 style="margin:22px 0 10px 0;font-size:${baseFont + 1}px;line-height:1.45;font-weight:800;color:${colors.heading};">${content}</h3>`
  }

  renderer.paragraph = function ({ tokens: innerTokens }: Tokens.Paragraph) {
    const content = this.parser.parseInline(innerTokens)
    return `<p style="margin:0 0 18px 0;font-size:${baseFont}px;line-height:1.85;color:${theme.text};letter-spacing:0.2px;text-align:justify;">${content}</p>`
  }

  renderer.strong = function ({ tokens: innerTokens }: Tokens.Strong) {
    const content = this.parser.parseInline(innerTokens)
    if (theme.id === 'red-white') {
      return `<strong style="font-weight:700;color:${colors.strong};border-bottom:2px solid ${hexToRgba(colors.strong, 0.35)};">${content}</strong>`
    }
    return `<strong style="font-weight:700;color:${colors.strong};">${content}</strong>`
  }

  renderer.em = function ({ tokens: innerTokens }: Tokens.Em) {
    const content = this.parser.parseInline(innerTokens)
    return `<em style="font-style:italic;color:${theme.textMuted};">${content}</em>`
  }

  renderer.blockquote = function ({ tokens: innerTokens }: Tokens.Blockquote) {
    const content = this.parser.parse(innerTokens)
    if (theme.id === 'moyu-green') {
      return `
        <section style="margin:18px 0;padding:12px 16px;background:${blockquoteBg};border:1px dashed ${hexToRgba(colors.blockquoteAccent, 0.35)};border-radius:8px;color:${theme.text};font-size:${Math.max(13, baseFont - 1)}px;line-height:1.7;">
          ${content}
        </section>
      `
    }
    if (theme.id === 'red-white') {
      return `
        <blockquote style="margin:18px 0;padding:14px 18px;border-left:4px solid ${colors.blockquoteAccent};background:${blockquoteBg};border-radius:0 10px 10px 0;color:${theme.text};font-size:${baseFont}px;line-height:1.8;">
          ${content}
        </blockquote>
      `
    }
    return `
      <section style="margin:18px 0;padding:14px 16px;background:${blockquoteBg};border:1px solid ${hexToRgba(colors.blockquoteAccent, 0.25)};border-left:3px solid ${colors.blockquoteAccent};border-radius:6px;color:${theme.text};font-size:${Math.max(13, baseFont - 1)}px;line-height:1.8;">
        ${content}
      </section>
    `
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
        const safeLine = line.replace(/^ +/g, (spaces) => '　'.repeat(Math.ceil(spaces.length / 2))) || '&nbsp;'
        return `<p style="margin:0;font-family:'SF Mono',Consolas,Monaco,monospace;font-size:12.5px;line-height:1.6;color:#E2E8F0;word-break:break-all;">${safeLine}</p>`
      })
      .join('')

    const macHeader = resolved.hasDecorations
      ? `<section style="display:flex;align-items:center;padding:9px 14px;background:${theme.preHeaderBg};border-bottom:1px solid rgba(255,255,255,0.06);">
          <span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:#FF5F56;margin-right:6px;"></span>
          <span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:#FFBD2E;margin-right:6px;"></span>
          <span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:#27C93F;margin-right:10px;"></span>
          <span style="font-size:11px;color:#94A3B8;font-family:Consolas,Monaco,monospace;letter-spacing:1px;">${escapeHtml(lang || 'code')}</span>
        </section>`
      : ''

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
        const body = this.parser.parse(item.tokens).replace(/^<p[^>]*>([\s\S]*?)<\/p>\s*$/i, '$1')
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

  renderer.image = ({ href, text }: Tokens.Image) => {
    const cardStyle =
      theme.id === 'olive-journal'
        ? `background:${colors.bg};border-radius:6px;padding:6px;border:1px solid ${theme.borderColor};`
        : `background:#FFF;border-radius:12px;padding:6px;border:1px solid #E5E7EB;box-shadow:0 4px 12px -2px rgba(0,0,0,0.08);`

    return `
      <figure style="margin:18px 0;text-align:center;">
        <section style="${cardStyle}">
          <img src="${escapeHtml(href)}" alt="${escapeHtml(text || '')}" style="max-width:100%;height:auto;border-radius:6px;display:block;margin:0 auto;" />
        </section>
        ${text ? `<figcaption style="margin-top:8px;font-size:12px;color:${theme.textMuted};">— ${escapeHtml(text)}</figcaption>` : ''}
      </figure>
    `
  }

  renderer.hr = () => renderDivider(resolved)

  const bodyHtml = marked.parser(filteredTokens, { renderer })

  if (externalLinkCount > 0) {
    issues.push({
      level: 'info',
      message: `包含 ${externalLinkCount} 个外链，公众号正文外链可能无法直接点击`
    })
  }

  const bannerHtml =
    firstH1 && resolved.hasDecorations ? renderTitleBanner(firstH1, resolved, options) : ''
  const tocHtml = resolved.hasDecorations ? renderTocCard(h2Headings, resolved) : ''

  const fullHtml = `
    <section id="wechat-article-root" style="padding:20px 18px;background-color:${colors.bg};font-family:-apple-system,BlinkMacSystemFont,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif;word-wrap:break-word;box-sizing:border-box;">
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
