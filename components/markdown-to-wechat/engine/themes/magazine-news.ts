import { swissSignalMotion } from '../motions'
import { escapeHtml, hexToRgba } from '../tokens'
import { LayoutTheme, RenderContext } from '../types'

export const magazineNewsTheme: LayoutTheme = {
  id: 'magazine-news',
  name: '杂志资讯',
  subtitle: '杂志资讯风·瑞士信号动效',
  motionId: 'swiss-signal',
  defaultPalette: {
    id: 'default',
    name: '默认',
    subtitle: '杂志资讯 · 松青原配色',
    colors: {
      bg: '#ffffff',
      heading: '#0F172A',
      strong: '#0D9488',
      headingDecor: '#0D9488',
      divider: '#99F6E4',
      listMarker: '#0D9488',
      codeBlockBg: '#1E293B',
      tableAccent: '#F0FDFA',
      inlineCodeText: '#0F766E',
      inlineCodeBg: '#F0FDFA',
      blockquoteAccent: '#0D9488'
    }
  },
  text: '#374151',
  textMuted: '#9CA3AF',
  borderColor: '#E5E7EB',
  preHeaderBg: '#0F172A',
  slots: {
    renderBanner(title: string, ctx: RenderContext): string {
      const { colors, capabilities, fontSize, author, dateStr } = ctx
      const authorLabel = author.trim() || '杂志资讯'
      const borderCol = hexToRgba(colors.headingDecor, 0.28)
      const tagBg = hexToRgba(colors.headingDecor, 0.08)

      const bannerMotion = capabilities.useMotion
        ? `<section style="margin-top:8px;">${swissSignalMotion.renderBannerMotion(colors, true)}</section>`
        : ''

      return `
        <section style="margin:0 0 24px 0;background:${colors.bg};border-radius:16px;overflow:hidden;border:1px solid ${borderCol};box-shadow:0 4px 16px -6px ${hexToRgba(colors.headingDecor, 0.14)};">
          <section style="padding:24px 22px 12px;background:linear-gradient(135deg,${tagBg} 0%,${colors.bg} 70%);">
            <section style="display:flex;align-items:center;gap:6px;margin-bottom:14px;">
              <span style="width:7px;height:7px;background:${colors.headingDecor};border-radius:50%;display:inline-block;"><span leaf="">&nbsp;</span></span>
              <span style="font-size:10px;font-weight:700;letter-spacing:2px;color:${colors.headingDecor};">DEEP DIVE · 深度解析</span>
              <span style="flex:1;height:1px;background:linear-gradient(to right,${borderCol},transparent);display:inline-block;"><span leaf="">&nbsp;</span></span>
              <span style="font-size:10px;color:${ctx.theme.textMuted};font-weight:500;">${dateStr}</span>
            </section>
            <p style="font-size:${fontSize + 5}px;font-weight:900;color:${colors.heading};margin:0 0 12px;line-height:1.35;letter-spacing:-0.4px;">
              ${escapeHtml(title)}
            </p>
            <section style="width:48px;height:3px;background:linear-gradient(to right,${colors.headingDecor},${colors.strong});border-radius:2px;"><span leaf="">&nbsp;</span></section>
            ${bannerMotion}
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
    },

    renderToc(headings: string[], ctx: RenderContext): string {
      const { colors, capabilities } = ctx
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

      const tocDecor = `<section style="width:56px;flex-shrink:0;">${swissSignalMotion.renderTocDecor(colors, capabilities.useMotion)}</section>`

      return `
        <section style="margin:0 0 28px 0;">
          <section style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;gap:8px;">
            <p style="font-size:10px;color:#9CA3AF;margin:0;text-transform:uppercase;letter-spacing:1.5px;font-weight:600;">${headings.length} PARTS + CONCLUSION · 👉 滑动</p>
            ${tocDecor}
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
    },

    renderH2(content: string, index: number, ctx: RenderContext): string {
      const { colors, capabilities, fontSize } = ctx
      const num = String(index).padStart(2, '0')
      const marginTop = index === 1 ? '18px' : '34px'
      const rail = capabilities.useFancyDivider
        ? `<section style="margin-top:4px;">${swissSignalMotion.renderSectionRail(colors, capabilities.useMotion, index)}</section>`
        : ''
      return `
        <section style="margin:${marginTop} 0 18px 0;">
          <section style="display:flex;align-items:center;gap:14px;">
            <section style="text-align:center;flex-shrink:0;">
              <p style="margin:0;font-size:26px;font-weight:900;color:${colors.headingDecor};line-height:1;letter-spacing:-1.5px;">${num}</p>
              <p style="margin:2px 0 0;font-size:8px;font-weight:700;color:${colors.divider};letter-spacing:2px;">PART</p>
            </section>
            <span style="width:1px;height:32px;background:${colors.divider};flex-shrink:0;display:inline-block;"></span>
            <h2 style="margin:0;font-size:${fontSize + 2}px;font-weight:900;color:${colors.heading};line-height:1.35;letter-spacing:0.3px;">${content}</h2>
          </section>
          ${rail}
        </section>
      `
    },

    renderH3(content: string, ctx: RenderContext): string {
      const { colors, fontSize } = ctx
      return `
        <section style="margin:24px 0 12px 0;display:flex;align-items:center;gap:8px;">
          <span style="display:inline-block;width:3px;height:14px;border-radius:2px;background:${colors.headingDecor};flex-shrink:0;"></span>
          <h3 style="margin:0;font-size:${fontSize + 1}px;font-weight:700;color:${colors.heading};line-height:1.4;">${content}</h3>
        </section>
      `
    },

    renderBlockquote(content: string, ctx: RenderContext): string {
      const { theme, colors, fontSize } = ctx
      const bg = hexToRgba(colors.blockquoteAccent, 0.06)
      return `
        <section style="margin:18px 0;padding:12px 16px;background:${bg};border:1px dashed ${hexToRgba(colors.blockquoteAccent, 0.35)};border-radius:8px;color:${theme.text};font-size:${Math.max(13, fontSize - 1)}px;line-height:1.7;">
          ${content}
        </section>
      `
    },

    renderDivider(ctx: RenderContext): string {
      const { colors, capabilities } = ctx
      if (!capabilities.useFancyDivider) {
        return `<hr style="margin:24px 0;border:none;border-top:1px dashed ${colors.divider};" />`
      }
      return `<section style="margin:24px 0;">${swissSignalMotion.renderDivider(colors, capabilities.useMotion)}</section>`
    },

    renderTail(ctx: RenderContext): string {
      const { colors, capabilities } = ctx
      return `<section style="margin:28px 0 6px;">${swissSignalMotion.renderTail(colors, capabilities.useMotion)}</section>`
    }
  }
}
