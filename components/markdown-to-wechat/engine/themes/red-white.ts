import { escapeHtml, hexToRgba } from '../tokens'
import { LayoutTheme, RenderContext } from '../types'

export const redWhiteTheme: LayoutTheme = {
  id: 'red-white',
  name: '红白风',
  subtitle: '社论卡片风·菱形流光动效',
  defaultPalette: {
    id: 'default',
    name: '默认',
    subtitle: '红白风 · 朱砂原配色',
    colors: {
      bg: '#ffffff',
      heading: '#1C1917',
      strong: '#B91C1C',
      headingDecor: '#C81E1E',
      divider: '#FCA5A5',
      listMarker: '#C81E1E',
      codeBlockBg: '#1E293B',
      tableAccent: '#FEF2F2',
      inlineCodeText: '#991B1B',
      inlineCodeBg: '#FEF2F2',
      blockquoteAccent: '#C81E1E'
    }
  },
  text: '#374151',
  textMuted: '#9CA3AF',
  borderColor: '#FEE2E2',
  preHeaderBg: '#0F172A',
  slots: {
    renderBanner(title: string, ctx: RenderContext): string {
      const { colors, capabilities, author, theme } = ctx
      const authorLabel = author.trim() || '红白风'
      const shadowColor = hexToRgba(colors.headingDecor, 0.16)

      const shimmerSvg = capabilities.useMotion
        ? `<svg width="100%" height="8" viewBox="0 0 240 8" preserveAspectRatio="none" style="display:block;margin:10px 0 4px;"><line x1="0" y1="4" x2="240" y2="4" stroke="${hexToRgba(colors.headingDecor, 0.2)}" stroke-width="1"/><rect x="0" y="2.5" width="46" height="3" rx="1.5" fill="${colors.headingDecor}"><animate attributeName="x" values="-46;240" dur="3.2s" repeatCount="indefinite"/></rect></svg>`
        : ''

      const sparkleSvg = capabilities.useMotion
        ? `<svg width="16" height="16" viewBox="0 0 16 16" style="display:inline-block;vertical-align:middle;margin-left:6px;"><polygon points="8,1 10,6 15,8 10,10 8,15 6,10 1,8 6,6" fill="${colors.headingDecor}"><animate attributeName="opacity" values="1;0.25;1" dur="2.2s" repeatCount="indefinite"/></polygon></svg>`
        : ''

      return `
        <section style="margin:6px 4px 26px;background:${colors.bg};border-radius:12px;box-shadow:0 4px 24px -4px ${shadowColor};border:1px solid ${colors.tableAccent};padding:24px 22px 18px;overflow:hidden;">
          <p style="font-size:36px;color:${colors.headingDecor};font-weight:900;margin:0;line-height:0.6;">“</p>
          <p style="font-size:17px;font-weight:800;color:${colors.heading};margin:12px 0 6px;line-height:1.65;">
            ${escapeHtml(title)}
          </p>
          ${shimmerSvg}
          <p style="text-align:right;font-size:12px;color:${theme.textMuted};margin:10px 0 0;letter-spacing:1px;">
            —— ${escapeHtml(authorLabel)}${sparkleSvg}
          </p>
        </section>
      `
    },

    renderToc(headings: string[], ctx: RenderContext): string {
      const { colors, theme, capabilities } = ctx
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

      const diamond = capabilities.useMotion
        ? `<svg width="10" height="10" viewBox="0 0 10 10" style="display:inline-block;vertical-align:middle;margin-right:6px;"><polygon points="5,0 10,5 5,10 0,5" fill="${colors.headingDecor}"><animateTransform attributeName="transform" type="scale" values="1;0.6;1" additive="sum" dur="2.4s" repeatCount="indefinite"/></polygon></svg>`
        : ''

      return `
        <section style="margin:0 0 24px 0;padding:16px 18px;border:1px solid ${colors.divider};border-radius:10px;background:${colors.tableAccent};">
          <p style="margin:0 0 10px 0;font-size:11px;font-weight:800;letter-spacing:1.5px;color:${colors.headingDecor};text-transform:uppercase;">${diamond}CONTENTS · 篇幅导览</p>
          ${rows}
        </section>
      `
    },

    renderH2(content: string, index: number, ctx: RenderContext): string {
      const { colors, fontSize } = ctx
      const num = String(index).padStart(2, '0')
      const marginTop = index === 1 ? '18px' : '34px'
      return `
        <section style="margin:${marginTop} 0 18px 0;padding-bottom:12px;border-bottom:3px solid ${colors.headingDecor};display:flex;align-items:center;">
          <span style="display:inline-block;background:${colors.headingDecor};color:#FFFFFF;font-size:16px;font-weight:900;padding:3px 12px;border-radius:6px;margin-right:12px;line-height:1.3;">${num}</span>
          <h2 style="margin:0;font-size:${fontSize + 2}px;font-weight:800;color:${colors.heading};line-height:1.35;letter-spacing:0.4px;">${content}</h2>
        </section>
      `
    },

    renderStrong(content: string, ctx: RenderContext): string {
      const { colors } = ctx
      return `<strong style="font-weight:700;color:${colors.strong};border-bottom:2px solid ${hexToRgba(colors.strong, 0.35)};">${content}</strong>`
    },

    renderBlockquote(content: string, ctx: RenderContext): string {
      const { theme, colors, fontSize } = ctx
      const bg = hexToRgba(colors.blockquoteAccent, 0.06)
      return `
        <blockquote style="margin:18px 0;padding:14px 18px;border-left:4px solid ${colors.blockquoteAccent};background:${bg};border-radius:0 10px 10px 0;color:${theme.text};font-size:${fontSize}px;line-height:1.8;">
          ${content}
        </blockquote>
      `
    },

    renderDivider(ctx: RenderContext): string {
      const { colors, capabilities } = ctx
      if (!capabilities.useFancyDivider) {
        return `<hr style="margin:24px 0;border:none;border-top:1px dashed ${colors.divider};" />`
      }
      if (!capabilities.useMotion) {
        return `
          <section style="margin:26px 0;">
            <section style="height:1px;background:linear-gradient(to right,transparent,${colors.divider},${colors.headingDecor},${colors.divider},transparent);"><span leaf="">&nbsp;</span></section>
          </section>
        `
      }
      return `
        <section style="margin:26px 0;text-align:center;">
          <svg width="100%" height="14" viewBox="0 0 240 14" preserveAspectRatio="none" style="display:block;">
            <line x1="16" y1="7" x2="106" y2="7" stroke="${colors.divider}" stroke-width="1"/>
            <line x1="134" y1="7" x2="224" y2="7" stroke="${colors.divider}" stroke-width="1"/>
            <polygon points="120,2 125,7 120,12 115,7" fill="${colors.headingDecor}">
              <animate attributeName="opacity" values="1;0.35;1" dur="2.2s" repeatCount="indefinite"/>
            </polygon>
          </svg>
        </section>
      `
    }
  }
}
