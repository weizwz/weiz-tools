import { escapeHtml, hexToRgba } from '../tokens'
import { LayoutTheme, RenderContext } from '../types'

export const oliveJournalTheme: LayoutTheme = {
  id: 'olive-journal',
  name: '橄榄手记',
  subtitle: '内刊手记风·涂鸦眨眼动效',
  defaultPalette: {
    id: 'default',
    name: '默认',
    subtitle: '橄榄手记 · 麦芽原配色',
    colors: {
      bg: '#fdfdf8',
      heading: '#23251d',
      strong: '#b45309',
      headingDecor: '#d97706',
      divider: '#bfc1b7',
      listMarker: '#d97706',
      codeBlockBg: '#23251d',
      tableAccent: '#eeefe9',
      inlineCodeText: '#3f4234',
      inlineCodeBg: '#eeefe9',
      blockquoteAccent: '#d97706'
    }
  },
  text: '#4d4f46',
  textMuted: '#9ea096',
  borderColor: '#bfc1b7',
  codeBorder: '#b6b7af',
  preHeaderBg: '#181a14',
  slots: {
    renderBanner(title: string, ctx: RenderContext): string {
      const { colors, capabilities, author, theme, dateStr } = ctx
      const authorLabel = author.trim() || '橄榄手记'
      const parts = title
        .split(/[：:]/)
        .map((s) => s.trim())
        .filter(Boolean)
      const mainTitle = parts[0] || title
      const emphasis = parts[1] || ''

      const eyeBlinkLeft = capabilities.useMotion
        ? `<animate attributeName="ry" values="3;0.4;3;3" keyTimes="0;0.05;0.1;1" dur="4s" repeatCount="indefinite"/>`
        : ''
      const eyeBlinkRight = capabilities.useMotion
        ? `<animate attributeName="ry" values="3;0.4;3;3" keyTimes="0;0.05;0.1;1" dur="4s" repeatCount="indefinite"/>`
        : ''
      const waveAnim = capabilities.useMotion
        ? `<animate attributeName="d" values="M0,5 Q30,1 60,5 T120,5;M0,5 Q30,9 60,5 T120,5;M0,5 Q30,1 60,5 T120,5" dur="4s" repeatCount="indefinite"/>`
        : ''

      return `
        <section style="margin:0 0 24px 0;background:${colors.bg};border:1px solid ${theme.borderColor};border-radius:6px;overflow:hidden;">
          <section style="padding:22px 20px 18px;">
            <section style="display:flex;align-items:center;gap:8px;margin-bottom:18px;">
              <span style="width:8px;height:8px;background:${colors.headingDecor};border-radius:50%;display:inline-block;"><span leaf="">&nbsp;</span></span>
              <span style="font-size:10px;font-weight:700;letter-spacing:2.5px;color:#65675e;">橄榄手记 · 专栏观察</span>
              <span style="flex:1;height:1px;background:${theme.borderColor};display:inline-block;"><span leaf="">&nbsp;</span></span>
              <span style="font-size:10px;color:${theme.textMuted};font-weight:500;">${dateStr}</span>
            </section>
            <section style="display:flex;align-items:stretch;gap:14px;">
              <section style="flex:1;min-width:0;">
                <p style="font-size:20px;font-weight:800;color:${colors.heading};margin:0 0 10px;line-height:1.25;letter-spacing:-0.4px;">
                  ${escapeHtml(mainTitle)}${emphasis ? ` · <span style="border-bottom:3px solid ${colors.headingDecor};">${escapeHtml(emphasis)}</span>` : ''}
                </p>
                <section style="display:flex;align-items:center;gap:4px;margin-bottom:8px;">
                  <span style="width:22px;height:3px;background:${colors.headingDecor};border-radius:2px;display:inline-block;"></span>
                  <span style="width:8px;height:3px;background:${colors.strong};border-radius:2px;display:inline-block;"></span>
                </section>
                <svg width="120" height="10" viewBox="0 0 120 10" style="display:block;">
                  <path d="M0,5 Q30,1 60,5 T120,5" fill="none" stroke="${colors.headingDecor}" stroke-width="1.5" stroke-opacity="0.6">${waveAnim}</path>
                </svg>
              </section>
              <section style="flex-shrink:0;width:84px;display:flex;flex-direction:column;align-items:center;justify-content:center;background:${colors.tableAccent};border:1px dashed ${theme.borderColor};border-radius:6px;padding:6px;">
                <svg width="52" height="52" viewBox="0 0 64 64" style="display:block;">
                  <ellipse cx="32" cy="36" rx="22" ry="18" fill="none" stroke="${theme.text}" stroke-width="2"></ellipse>
                  <ellipse cx="26" cy="30" rx="2.8" ry="3" fill="${theme.text}">${eyeBlinkLeft}</ellipse>
                  <ellipse cx="38" cy="30" rx="2.8" ry="3" fill="${theme.text}">${eyeBlinkRight}</ellipse>
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
    },

    renderToc(headings: string[], ctx: RenderContext): string {
      const { colors, theme } = ctx
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
    },

    renderH2(content: string, index: number, ctx: RenderContext): string {
      const { colors, fontSize } = ctx
      const num = String(index).padStart(2, '0')
      const marginTop = index === 1 ? '18px' : '34px'
      return `
        <section style="margin:${marginTop} 0 18px 0;display:flex;align-items:center;gap:14px;">
          <section style="text-align:center;flex-shrink:0;">
            <p style="margin:0;font-size:24px;font-weight:800;color:${colors.heading};line-height:1;letter-spacing:-1.5px;">${num}</p>
            <p style="margin:2px 0 0;font-size:8px;font-weight:700;color:${colors.headingDecor};letter-spacing:2px;">PART</p>
          </section>
          <span style="width:1px;height:32px;background:${colors.divider};flex-shrink:0;display:inline-block;"></span>
          <h2 style="margin:0;font-size:${fontSize + 2}px;font-weight:800;color:${colors.heading};line-height:1.35;letter-spacing:0.2px;">${content}</h2>
        </section>
      `
    },

    renderBlockquote(content: string, ctx: RenderContext): string {
      const { theme, colors, fontSize } = ctx
      const bg = hexToRgba(colors.blockquoteAccent, 0.06)
      return `
        <section style="margin:18px 0;padding:14px 16px;background:${bg};border:1px solid ${hexToRgba(colors.blockquoteAccent, 0.25)};border-left:3px solid ${colors.blockquoteAccent};border-radius:6px;color:${theme.text};font-size:${Math.max(13, fontSize - 1)}px;line-height:1.8;">
          ${content}
        </section>
      `
    },

    renderDivider(ctx: RenderContext): string {
      const { theme, colors, capabilities } = ctx
      if (!capabilities.useFancyDivider) {
        return `<hr style="margin:24px 0;border:none;border-top:1px dashed ${colors.divider};" />`
      }
      if (!capabilities.useMotion) {
        return `
          <section style="margin:26px 0;display:flex;align-items:center;justify-content:center;gap:10px;">
            <span style="width:8px;height:8px;border-radius:50%;background:${theme.text};display:inline-block;"></span>
            <span style="width:8px;height:8px;border-radius:50%;background:${colors.divider};display:inline-block;"></span>
            <span style="width:8px;height:8px;border-radius:50%;background:${colors.headingDecor};display:inline-block;"></span>
          </section>
        `
      }
      return `
        <section style="margin:26px 0;text-align:center;">
          <svg width="64" height="12" viewBox="0 0 64 12" style="display:inline-block;">
            <circle cx="12" cy="6" r="3.5" fill="${theme.text}"><animate attributeName="opacity" values="1;0.3;1" dur="2.1s" repeatCount="indefinite"/></circle>
            <circle cx="32" cy="6" r="3.5" fill="${colors.divider}"><animate attributeName="opacity" values="0.3;1;0.3" dur="2.1s" begin="0.35s" repeatCount="indefinite"/></circle>
            <circle cx="52" cy="6" r="3.5" fill="${colors.headingDecor}"><animate attributeName="opacity" values="0.3;1;0.3" dur="2.1s" begin="0.7s" repeatCount="indefinite"/></circle>
          </svg>
        </section>
      `
    },

    renderImage(href: string, text: string, ctx: RenderContext): string {
      const { theme, colors } = ctx
      return `
        <figure style="margin:18px 0;text-align:center;">
          <section style="background:${colors.bg};border-radius:6px;padding:6px;border:1px solid ${theme.borderColor};">
            <img src="${escapeHtml(href)}" alt="${escapeHtml(text)}" style="max-width:100%;height:auto;border-radius:6px;display:block;margin:0 auto;" />
          </section>
          ${text ? `<figcaption style="margin-top:8px;font-size:12px;color:${theme.textMuted};">— ${escapeHtml(text)}</figcaption>` : ''}
        </figure>
      `
    }
  }
}
