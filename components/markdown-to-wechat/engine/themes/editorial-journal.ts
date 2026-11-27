import { DEFAULT_ARTICLE_META, escapeHtml, hexToRgba, resolveTagList } from '../tokens'
import { LayoutTheme, RenderContext } from '../types'

export const editorialJournalTheme: LayoutTheme = {
  id: 'editorial-journal',
  name: '画报期刊',
  defaultPalette: {
    id: 'default',
    name: '默认',
    colors: {
      bg: '#ffffff',
      heading: '#1C1917',
      strong: '#BE123C',
      headingDecor: '#BE123C',
      divider: '#FECDD3',
      listMarker: '#BE123C',
      tableAccent: '#FFF1F2',
      inlineCodeText: '#9F1239',
      inlineCodeBg: '#FFF1F2',
      blockquoteAccent: '#BE123C'
    }
  },
  text: '#374151',
  textMuted: '#9CA3AF',
  borderColor: '#FFE4E6',
  slots: {
    renderBanner(title: string, ctx: RenderContext): string {
      const { colors, fontSize, author, theme, dateStr, meta } = ctx
      const authorLabel = author.trim() || DEFAULT_ARTICLE_META.author
      const category = meta.category.trim() || 'EDITORIAL'
      const avatar = meta.avatar.trim() || DEFAULT_ARTICLE_META.avatar
      const avatarHtml = avatar
        ? `<img src="${escapeHtml(avatar)}" alt="${escapeHtml(authorLabel)}" style="width:20px;height:20px;border-radius:50%;object-fit:cover;border:1px solid ${hexToRgba(colors.headingDecor, 0.3)};flex-shrink:0;" />`
        : ''
      const tagsHtml = resolveTagList(meta.tags)
        .map(
          (t) =>
            `<span style="background:${colors.tableAccent};color:${colors.headingDecor};padding:2px 7px;border-radius:4px;font-size:10px;font-weight:700;border:1px solid ${colors.divider};">${escapeHtml(t)}</span>`
        )
        .join('')

      const titleCore = `
        <section style="text-align:center;">
          <p style="font-size:10px;font-weight:800;letter-spacing:2.4px;color:${colors.headingDecor};margin:0 0 8px;text-transform:uppercase;">${escapeHtml(category)}</p>
          <p style="font-size:${fontSize + 5}px;font-weight:800;color:${colors.heading};margin:0;line-height:1.45;font-family:'Songti SC','Noto Serif SC',Georgia,serif;">
            ${escapeHtml(title)}
          </p>
        </section>
      `
      const bannerFrame = ctx.motion.renderBannerFrame(titleCore, colors, ctx.animated)

      return `
        <section style="margin:4px 0 26px;background:${colors.bg};border-radius:12px;box-shadow:0 4px 22px -6px ${hexToRgba(colors.headingDecor, 0.16)};border:1px solid ${colors.tableAccent};padding:14px;max-width:100%;overflow:hidden;box-sizing:border-box;">
          ${bannerFrame}
          <section style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;margin-top:12px;padding:0 2px;">
            <section style="display:flex;gap:5px;flex-wrap:wrap;">${tagsHtml}</section>
            <section style="display:flex;align-items:center;gap:6px;">
              ${avatarHtml}
              <span style="font-size:12px;color:${theme.textMuted};letter-spacing:0.4px;">${escapeHtml(authorLabel)} · ${escapeHtml(dateStr)}</span>
            </section>
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
              ? `<span style="display:inline-block;background:${colors.headingDecor};color:#fff;font-size:10px;font-weight:800;padding:1px 6px;border-radius:3px;margin-right:8px;">${num}</span>`
              : `<span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:${colors.headingDecor};margin-right:8px;vertical-align:middle;"></span>`
          return `
            <p style="margin:0 0 8px 0;font-size:13px;line-height:1.6;color:${theme.text};">
              ${prefix}<span>${escapeHtml(text)}</span>
            </p>
          `
        })
        .join('')

      const tocDecor = `<section style="width:72px;flex-shrink:0;">${ctx.motion.renderTocDecor(colors, ctx.animated)}</section>`

      return `
        <section style="margin:0 0 24px 0;padding:16px 18px;border:1px solid ${colors.divider};border-radius:10px;background:${colors.tableAccent};">
          <section style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px;">
            <p style="margin:0;font-size:11px;font-weight:800;letter-spacing:1.5px;color:${colors.headingDecor};text-transform:uppercase;">CONTENTS · 期刊目录</p>
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
          ? `<span style="font-size:22px;font-weight:900;color:${colors.headingDecor};line-height:1;font-family:Georgia,serif;flex-shrink:0;">${num}</span>`
          : `<span style="width:4px;height:20px;background:${colors.headingDecor};flex-shrink:0;display:inline-block;"></span>`

      return `
        <section style="margin:${marginTop} 0 14px 0;max-width:100%;overflow:hidden;">
          <section style="display:flex;align-items:center;gap:10px;">
            ${prefix}
            <h2 style="margin:0;font-size:${fontSize + 2}px;font-weight:800;color:${colors.heading};line-height:1.38;font-family:'Songti SC','Noto Serif SC',Georgia,serif;flex:0 1 auto;min-width:0;word-break:break-word;overflow-wrap:anywhere;">${content}</h2>
            <section style="flex:1;min-width:52px;display:flex;align-items:center;">${badge}</section>
          </section>
          ${rail}
        </section>
      `
    },

    renderStrong(content: string, ctx: RenderContext): string {
      const { colors } = ctx
      return `<strong style="font-weight:700;color:${colors.strong};border-bottom:2px solid ${hexToRgba(colors.strong, 0.32)};">${content}</strong>`
    },

    renderBlockquote(content: string, ctx: RenderContext): string {
      const { theme, colors, fontSize, motion, animated } = ctx
      const bg = hexToRgba(colors.blockquoteAccent, 0.05)
      const decor = motion.renderBlockquoteDecor(colors, animated)
      return `
        <blockquote style="margin:14px 0;padding:12px 16px;border-left:4px solid ${colors.blockquoteAccent};background:${bg};border-radius:0 8px 8px 0;color:${theme.text};font-size:${Math.max(13, fontSize - 1)}px;line-height:1.68;">
          <section style="display:flex;justify-content:flex-start;margin-bottom:6px;line-height:0;"><section style="width:28px;">${decor}</section></section>
          ${content}
        </blockquote>
      `
    }
  }
}
