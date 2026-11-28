import { DEFAULT_ARTICLE_META, escapeHtml, hexToRgba, resolveTagList } from '../tokens'
import { LayoutTheme, RenderContext } from '../types'

export const editorialJournalTheme: LayoutTheme = {
  id: 'editorial-journal',
  name: '画报期刊',
  defaultPalette: {
    id: 'default',
    name: '默认',
    colors: {
      bg: '#FFFFFF',
      heading: '#171717',
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
  text: '#333333',
  textMuted: '#737373',
  borderColor: '#E5E5E5',
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
            `<span style="background:${colors.tableAccent};color:${colors.headingDecor};padding:2px 7px;border-radius:2px;font-size:10px;font-weight:700;border:1px solid ${colors.divider};">${escapeHtml(t)}</span>`
        )
        .join('')

      const titleCore = `
        <section style="text-align:center;">
          <p style="font-size:10px;font-weight:800;letter-spacing:2.8px;color:${colors.headingDecor};margin:0 0 8px;text-transform:uppercase;">${escapeHtml(category)}</p>
          <p style="font-size:${fontSize + 5}px;font-weight:900;color:${colors.heading};margin:0;line-height:1.42;font-family:'Songti SC','Noto Serif SC',Georgia,serif;">
            ${escapeHtml(title)}
          </p>
        </section>
      `
      const bannerFrame = ctx.motion.renderBannerFrame(titleCore, colors, ctx.animated)

      return `
        <section style="margin:4px 0 26px;background:${colors.bg};border-top:3px solid ${colors.heading};border-bottom:2px solid ${colors.heading};padding:12px 4px 14px;max-width:100%;overflow:hidden;box-sizing:border-box;">
          <section style="display:flex;align-items:center;justify-content:space-between;padding:0 4px 10px;margin-bottom:12px;border-bottom:1px solid ${theme.borderColor};">
            <span style="font-size:10px;font-weight:800;letter-spacing:2px;color:${colors.heading};font-family:Georgia,serif;">JOURNAL · ISSUE</span>
            <span style="font-size:10px;font-weight:600;color:${theme.textMuted};letter-spacing:1px;">${escapeHtml(dateStr)}</span>
          </section>
          ${bannerFrame}
          <section style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;margin-top:12px;padding:10px 4px 0;border-top:1px solid ${theme.borderColor};">
            <section style="display:flex;gap:5px;flex-wrap:wrap;">${tagsHtml}</section>
            <section style="display:flex;align-items:center;gap:6px;">
              ${avatarHtml}
              <span style="font-size:12px;color:${theme.textMuted};letter-spacing:0.4px;">BY ${escapeHtml(authorLabel)}</span>
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
              ? `<span style="font-family:Georgia,serif;font-size:12px;font-weight:800;color:${colors.headingDecor};margin-right:10px;">P.${num}</span>`
              : `<span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:${colors.headingDecor};margin-right:8px;vertical-align:middle;"></span>`
          return `
            <p style="margin:0 0 8px 0;padding-bottom:6px;border-bottom:1px dotted ${theme.borderColor};font-size:13px;line-height:1.55;color:${theme.text};">
              ${prefix}<span>${escapeHtml(text)}</span>
            </p>
          `
        })
        .join('')

      const tocDecor = `<section style="width:72px;flex-shrink:0;">${ctx.motion.renderTocDecor(colors, ctx.animated)}</section>`

      return `
        <section style="margin:0 0 24px 0;padding:14px 16px;border-top:2px solid ${colors.headingDecor};border-bottom:1px solid ${colors.divider};background:${colors.tableAccent};">
          <section style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px;">
            <p style="margin:0;font-size:11px;font-weight:800;letter-spacing:1.8px;color:${colors.headingDecor};text-transform:uppercase;">CONTENTS · 本期目录</p>
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
          ? `<span style="font-size:22px;font-weight:900;color:${colors.headingDecor};line-height:1;font-family:Georgia,serif;flex-shrink:0;border-bottom:2px solid ${colors.headingDecor};padding-bottom:2px;">${num}</span>`
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
        <blockquote style="margin:14px 0;padding:12px 16px;border-top:1px solid ${colors.divider};border-bottom:1px solid ${colors.divider};border-left:4px solid ${colors.blockquoteAccent};background:${bg};color:${theme.text};font-size:${Math.max(13, fontSize - 1)}px;line-height:1.68;">
          <section style="display:flex;justify-content:flex-start;margin-bottom:6px;line-height:0;"><section style="width:28px;">${decor}</section></section>
          ${content}
        </blockquote>
      `
    }
  }
}
