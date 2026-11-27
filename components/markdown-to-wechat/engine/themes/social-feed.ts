import { DEFAULT_ARTICLE_META, escapeHtml, hexToRgba, resolveTagList } from '../tokens'
import { LayoutTheme, RenderContext } from '../types'

export const socialFeedTheme: LayoutTheme = {
  id: 'social-feed',
  name: '即刻短笺',
  defaultPalette: {
    id: 'default',
    name: '默认',
    colors: {
      bg: '#ffffff',
      heading: '#18181B',
      strong: '#6366F1',
      headingDecor: '#6366F1',
      divider: '#C7D2FE',
      listMarker: '#6366F1',
      tableAccent: '#EEF2FF',
      inlineCodeText: '#4F46E5',
      inlineCodeBg: '#EEF2FF',
      blockquoteAccent: '#6366F1'
    }
  },
  text: '#27272A',
  textMuted: '#71717A',
  borderColor: '#E4E4E7',
  slots: {
    renderBanner(title: string, ctx: RenderContext): string {
      const { colors, fontSize, author, theme, dateStr, meta } = ctx
      const authorLabel = author.trim() || DEFAULT_ARTICLE_META.author
      const category = meta.category.trim() || 'THREAD'
      const avatar = meta.avatar.trim() || DEFAULT_ARTICLE_META.avatar
      const avatarHtml = avatar
        ? `<img src="${escapeHtml(avatar)}" alt="${escapeHtml(authorLabel)}" style="width:24px;height:24px;border-radius:50%;object-fit:cover;border:1px solid ${hexToRgba(colors.headingDecor, 0.3)};flex-shrink:0;" />`
        : ''
      const badges = resolveTagList(meta.tags)
        .map(
          (t) =>
            `<span style="background:${colors.tableAccent};color:${colors.headingDecor};padding:2px 8px;border-radius:12px;font-size:10px;font-weight:600;">#${escapeHtml(t)}</span>`
        )
        .join('')

      const titleCore = `
        <section style="text-align:center;">
          <p style="font-size:10px;font-weight:700;letter-spacing:1.8px;color:${colors.headingDecor};margin:0 0 8px;text-transform:uppercase;">${escapeHtml(category)}</p>
          <p style="font-size:${fontSize + 5}px;font-weight:800;color:${colors.heading};margin:0;line-height:1.42;">
            ${escapeHtml(title)}
          </p>
        </section>
      `
      const bannerFrame = ctx.motion.renderBannerFrame(titleCore, colors, ctx.animated)

      return `
        <section style="margin:0 0 24px 0;background:${colors.bg};border:1px solid ${theme.borderColor};border-radius:16px;padding:14px;box-shadow:0 4px 18px -6px rgba(24,24,27,0.08);max-width:100%;overflow:hidden;box-sizing:border-box;">
          ${bannerFrame}
          <section style="margin-top:12px;display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;padding:0 4px;">
            <section style="display:flex;align-items:center;gap:8px;">
              ${avatarHtml}
              <section>
                <p style="margin:0;font-size:12px;font-weight:700;color:${colors.heading};line-height:1.2;">${escapeHtml(authorLabel)} · <span style="font-weight:500;color:${theme.textMuted};">${escapeHtml(dateStr)}</span></p>
              </section>
            </section>
            <section style="display:flex;gap:5px;flex-wrap:wrap;">${badges}</section>
          </section>
        </section>
      `
    },

    renderToc(headings: string[], ctx: RenderContext): string {
      const { colors, theme, headingNumbering } = ctx
      const pills = headings
        .slice(0, 6)
        .map((text, idx) => {
          const num = String(idx + 1).padStart(2, '0')
          const marker =
            headingNumbering === 'numeric'
              ? `<span style="color:${colors.headingDecor};font-weight:800;margin-right:6px;">#${num}</span>`
              : `<span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:${colors.headingDecor};margin-right:7px;vertical-align:middle;"></span>`
          return `
            <p style="margin:0 0 7px 0;font-size:13px;line-height:1.55;color:${theme.text};">
              ${marker}<span>${escapeHtml(text)}</span>
            </p>
          `
        })
        .join('')

      const tocDecor = `<section style="width:70px;flex-shrink:0;">${ctx.motion.renderTocDecor(colors, ctx.animated)}</section>`

      return `
        <section style="margin:0 0 24px 0;padding:14px 16px;background:${colors.bg};border:1px solid ${theme.borderColor};border-radius:14px;">
          <section style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:8px;">
            <p style="margin:0;font-size:10px;font-weight:800;letter-spacing:1.4px;color:${colors.headingDecor};">TOPICS · 动态导览</p>
            ${tocDecor}
          </section>
          ${pills}
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
          ? `<span style="display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;background:${colors.headingDecor};color:#fff;font-size:11px;font-weight:800;flex-shrink:0;">${num}</span>`
          : `<span style="width:10px;height:10px;border-radius:50%;background:${colors.headingDecor};flex-shrink:0;display:inline-block;"></span>`

      return `
        <section style="margin:${marginTop} 0 14px 0;max-width:100%;overflow:hidden;">
          <section style="display:flex;align-items:center;gap:10px;">
            ${prefix}
            <h2 style="margin:0;font-size:${fontSize + 2}px;font-weight:800;color:${colors.heading};line-height:1.4;flex:0 1 auto;min-width:0;word-break:break-word;overflow-wrap:anywhere;">${content}</h2>
            <section style="flex:1;min-width:52px;display:flex;align-items:center;">${badge}</section>
          </section>
          ${rail}
        </section>
      `
    },

    renderBlockquote(content: string, ctx: RenderContext): string {
      const { theme, colors, fontSize, motion, animated } = ctx
      const decor = motion.renderBlockquoteDecor(colors, animated)
      return `
        <section style="margin:14px 0;padding:12px 16px;background:${colors.tableAccent};border:1px solid ${hexToRgba(colors.blockquoteAccent, 0.25)};border-radius:12px;color:${theme.text};font-size:${Math.max(13, fontSize - 1)}px;line-height:1.65;">
          <section style="display:flex;justify-content:flex-start;margin-bottom:6px;line-height:0;"><section style="width:28px;">${decor}</section></section>
          ${content}
        </section>
      `
    }
  }
}
