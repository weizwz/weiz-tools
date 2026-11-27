import { DEFAULT_ARTICLE_META, escapeHtml, hexToRgba, resolveTagList } from '../tokens'
import { LayoutTheme, RenderContext } from '../types'

export const hackerTerminalTheme: LayoutTheme = {
  id: 'hacker-terminal',
  name: '极客终端',
  defaultPalette: {
    id: 'default',
    name: '默认',
    colors: {
      bg: '#F8FAFC',
      heading: '#0F172A',
      strong: '#059669',
      headingDecor: '#059669',
      divider: '#A7F3D0',
      listMarker: '#059669',
      tableAccent: '#ECFDF5',
      inlineCodeText: '#047857',
      inlineCodeBg: '#D1FAE5',
      blockquoteAccent: '#059669'
    }
  },
  text: '#1E293B',
  textMuted: '#64748B',
  borderColor: '#CBD5E1',
  codeBorder: '#A7F3D0',
  slots: {
    renderBanner(title: string, ctx: RenderContext): string {
      const { colors, fontSize, author, dateStr, meta } = ctx
      const authorLabel = author.trim() || DEFAULT_ARTICLE_META.author
      const category = meta.category.trim() || 'SYSTEM.LOG'
      const avatar = meta.avatar.trim() || DEFAULT_ARTICLE_META.avatar
      const avatarHtml = avatar
        ? `<img src="${escapeHtml(avatar)}" alt="${escapeHtml(authorLabel)}" style="width:18px;height:18px;border-radius:4px;object-fit:cover;border:1px solid ${hexToRgba(colors.headingDecor, 0.5)};flex-shrink:0;" />`
        : ''
      const badges = resolveTagList(meta.tags)
        .map(
          (t) =>
            `<span style="background:rgba(16,185,129,0.16);color:#6EE7B7;padding:2px 7px;border-radius:3px;font-size:9px;font-weight:600;font-family:Menlo,Monaco,Consolas,monospace;">--${escapeHtml(t)}</span>`
        )
        .join('')

      const titleCore = `
        <section style="text-align:left;">
          <p style="font-size:10px;font-weight:700;letter-spacing:1.8px;color:${colors.headingDecor};margin:0 0 8px;text-transform:uppercase;font-family:Menlo,Monaco,Consolas,monospace;">&gt;_ ${escapeHtml(category)}</p>
          <p style="font-size:${fontSize + 5}px;font-weight:800;color:${colors.heading};margin:0;line-height:1.38;">
            ${escapeHtml(title)}
          </p>
        </section>
      `
      const bannerFrame = ctx.motion.renderBannerFrame(titleCore, colors, ctx.animated)

      return `
        <section style="margin:0 0 24px 0;background:#FFFFFF;border:1px solid ${colors.heading};border-radius:8px;overflow:hidden;max-width:100%;box-sizing:border-box;">
          <section style="padding:14px 14px 10px;">
            ${bannerFrame}
          </section>
          <section style="background:${colors.heading};padding:9px 16px;display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;">
            <section style="display:flex;align-items:center;gap:7px;">
              ${avatarHtml}
              <p style="font-size:11.5px;color:#E2E8F0;margin:0;font-family:Menlo,Monaco,Consolas,monospace;">$ ${escapeHtml(authorLabel)} · ${escapeHtml(dateStr)}</p>
            </section>
            <section style="display:flex;gap:5px;flex-wrap:wrap;">${badges}</section>
          </section>
        </section>
      `
    },

    renderToc(headings: string[], ctx: RenderContext): string {
      const { colors, theme, headingNumbering } = ctx
      const rows = headings
        .slice(0, 6)
        .map((text, idx) => {
          const num = String(idx + 1).padStart(2, '0')
          const prefix =
            headingNumbering === 'numeric'
              ? `<span style="color:${colors.headingDecor};font-weight:700;margin-right:8px;">[${num}]</span>`
              : `<span style="color:${colors.headingDecor};font-weight:700;margin-right:8px;">&gt;</span>`
          return `
            <p style="margin:0 0 6px 0;font-size:12.5px;line-height:1.6;color:${theme.text};font-family:Menlo,Monaco,Consolas,monospace;">
              ${prefix}<span>${escapeHtml(text)}</span>
            </p>
          `
        })
        .join('')

      const tocDecor = `<section style="width:70px;flex-shrink:0;">${ctx.motion.renderTocDecor(colors, ctx.animated)}</section>`

      return `
        <section style="margin:0 0 24px 0;padding:14px 16px;background:#FFFFFF;border:1px solid ${theme.borderColor};border-radius:8px;">
          <section style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:8px;">
            <p style="margin:0;font-size:10px;font-weight:800;letter-spacing:1.4px;color:${colors.headingDecor};font-family:Menlo,Monaco,Consolas,monospace;">TREE ./INDEX</p>
            ${tocDecor}
          </section>
          ${rows}
        </section>
      `
    },

    renderH2(content: string, index: number, ctx: RenderContext): string {
      const { colors, fontSize, motion, animated, headingNumbering } = ctx
      const num = String(index).padStart(2, '0')
      const marginTop = index === 1 ? '18px' : '28px'
      const badge = motion.renderSectionBadge(colors, animated, index)
      const rail = `<section style="margin-top:2px;">${motion.renderSectionRail(colors, animated, index)}</section>`
      const prefix =
        headingNumbering === 'numeric'
          ? `<span style="background:${colors.heading};color:#6EE7B7;font-family:Menlo,Monaco,Consolas,monospace;font-size:12px;font-weight:700;padding:3px 8px;border-radius:4px;flex-shrink:0;">${num}</span>`
          : `<span style="font-family:Menlo,Monaco,Consolas,monospace;font-size:14px;font-weight:900;color:${colors.headingDecor};flex-shrink:0;">&gt;_</span>`

      return `
        <section style="margin:${marginTop} 0 14px 0;max-width:100%;overflow:hidden;">
          <section style="display:flex;align-items:center;gap:10px;">
            ${prefix}
            <h2 style="margin:0;font-size:${fontSize + 2}px;font-weight:800;color:${colors.heading};line-height:1.38;min-width:0;word-break:break-word;">${content}</h2>
            ${badge}
          </section>
          ${rail}
        </section>
      `
    },

    renderBlockquote(content: string, ctx: RenderContext): string {
      const { theme, colors, fontSize, motion, animated } = ctx
      const decor = motion.renderBlockquoteDecor(colors, animated)
      return `
        <section style="margin:14px 0;padding:12px 16px;background:#FFFFFF;border:1px solid ${theme.borderColor};border-left:3px solid ${colors.blockquoteAccent};border-radius:6px;color:${theme.text};font-size:${Math.max(13, fontSize - 1)}px;line-height:1.65;">
          <section style="display:flex;justify-content:flex-start;margin-bottom:6px;line-height:0;"><section style="width:28px;">${decor}</section></section>
          ${content}
        </section>
      `
    }
  }
}
