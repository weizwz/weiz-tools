import { DEFAULT_ARTICLE_META, escapeHtml, hexToRgba, resolveTagList } from '../tokens'
import { LayoutTheme, RenderContext } from '../types'

export const techBriefTheme: LayoutTheme = {
  id: 'tech-brief',
  name: '星澜简报',
  defaultPalette: {
    id: 'default',
    name: '默认',
    colors: {
      bg: '#ffffff',
      heading: '#111827',
      strong: '#0284C7',
      headingDecor: '#0284C7',
      divider: '#BAE6FD',
      listMarker: '#0284C7',
      codeBlockBg: '#0F172A',
      tableAccent: '#F0F9FF',
      inlineCodeText: '#0369A1',
      inlineCodeBg: '#F0F9FF',
      blockquoteAccent: '#0284C7'
    }
  },
  text: '#374151',
  textMuted: '#6B7280',
  borderColor: '#E5E7EB',
  preHeaderBg: '#0B1120',
  slots: {
    renderBanner(title: string, ctx: RenderContext): string {
      const { colors, fontSize, author, theme, dateStr, meta } = ctx
      const authorLabel = author.trim() || DEFAULT_ARTICLE_META.author
      const category = meta.category.trim() || 'TECH BRIEF'
      const avatar = meta.avatar.trim() || DEFAULT_ARTICLE_META.avatar
      const avatarHtml = avatar
        ? `<img src="${escapeHtml(avatar)}" alt="${escapeHtml(authorLabel)}" style="width:18px;height:18px;border-radius:50%;object-fit:cover;flex-shrink:0;" />`
        : ''
      const badges = resolveTagList(meta.tags)
        .map(
          (t) =>
            `<span style="background:${colors.tableAccent};color:${colors.headingDecor};padding:2px 7px;border-radius:3px;font-size:10px;font-weight:600;border:1px solid ${hexToRgba(colors.headingDecor, 0.25)};">${escapeHtml(t)}</span>`
        )
        .join('')

      const titleCore = `
        <section style="text-align:left;">
          <p style="font-size:10px;font-weight:700;letter-spacing:1.8px;color:${colors.headingDecor};margin:0 0 8px;text-transform:uppercase;font-family:Menlo,Monaco,Consolas,monospace;">${escapeHtml(category)}</p>
          <p style="font-size:${fontSize + 5}px;font-weight:900;color:${colors.heading};margin:0;line-height:1.35;letter-spacing:-0.4px;">
            ${escapeHtml(title)}
          </p>
        </section>
      `
      const bannerFrame = ctx.motion.renderBannerFrame(titleCore, colors, ctx.animated)

      return `
        <section style="margin:0 0 24px 0;background:${colors.bg};border:1px solid ${theme.borderColor};border-radius:8px;padding:14px 14px 12px;max-width:100%;overflow:hidden;box-sizing:border-box;">
          ${bannerFrame}
          <section style="margin-top:12px;padding-top:10px;border-top:1px solid ${theme.borderColor};display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;">
            <section style="display:flex;align-items:center;gap:6px;">
              ${avatarHtml}
              <span style="font-size:12px;color:${theme.textMuted};font-weight:500;">${escapeHtml(authorLabel)} · ${escapeHtml(dateStr)}</span>
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
              ? `<span style="font-family:Menlo,Monaco,Consolas,monospace;font-size:11px;font-weight:700;color:${colors.headingDecor};margin-right:8px;">${num}/</span>`
              : `<span style="color:${colors.headingDecor};font-weight:700;margin-right:8px;">—</span>`
          return `
            <p style="margin:0 0 7px 0;font-size:13px;line-height:1.55;color:${theme.text};">
              ${prefix}<span>${escapeHtml(text)}</span>
            </p>
          `
        })
        .join('')

      const tocDecor = `<section style="width:70px;flex-shrink:0;">${ctx.motion.renderTocDecor(colors, ctx.animated)}</section>`

      return `
        <section style="margin:0 0 24px 0;padding:14px 16px;background:${colors.tableAccent};border-left:3px solid ${colors.headingDecor};border-radius:0 8px 8px 0;">
          <section style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:8px;">
            <p style="margin:0;font-size:10px;font-weight:800;letter-spacing:1.6px;color:${colors.headingDecor};font-family:Menlo,Monaco,Consolas,monospace;">BRIEFING · 本期要点</p>
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
      const badge = `<section style="width:46px;flex-shrink:0;">${motion.renderSectionBadge(colors, animated, index)}</section>`
      const rail = `<section style="margin-top:2px;">${motion.renderSectionRail(colors, animated, index)}</section>`
      const prefix =
        headingNumbering === 'numeric'
          ? `<span style="font-family:Menlo,Monaco,Consolas,monospace;font-size:13px;font-weight:800;color:${colors.headingDecor};flex-shrink:0;">[${num}]</span>`
          : `<span style="width:12px;height:3px;border-radius:1px;background:${colors.headingDecor};flex-shrink:0;display:inline-block;"></span>`

      return `
        <section style="margin:${marginTop} 0 14px 0;max-width:100%;overflow:hidden;">
          <section style="display:flex;align-items:center;gap:8px;">
            ${prefix}
            <h2 style="margin:0;font-size:${fontSize + 2}px;font-weight:800;color:${colors.heading};line-height:1.38;flex:1;min-width:0;word-break:break-word;">${content}</h2>
            ${badge}
          </section>
          ${rail}
        </section>
      `
    },

    renderStrong(content: string, ctx: RenderContext): string {
      const { colors } = ctx
      return `<strong style="font-weight:700;color:${colors.strong};background:${hexToRgba(colors.strong, 0.08)};padding:1px 4px;border-radius:3px;">${content}</strong>`
    }
  }
}
