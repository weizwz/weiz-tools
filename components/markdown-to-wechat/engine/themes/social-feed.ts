import { isPlaceholderImageSrc } from '../motions/helpers'
import { DEFAULT_ARTICLE_META, escapeHtml, hexToRgba, resolveTagList } from '../tokens'
import { LayoutTheme, RenderContext } from '../types'

export const socialFeedTheme: LayoutTheme = {
  id: 'social-feed',
  name: '即刻短笺',
  defaultPalette: {
    id: 'default',
    name: '默认',
    colors: {
      bg: '#FFFFFF',
      heading: '#18181B',
      strong: '#576B95',
      headingDecor: '#576B95',
      divider: '#E5E7EB',
      listMarker: '#576B95',
      tableAccent: '#F7F7F8',
      inlineCodeText: '#3B5284',
      inlineCodeBg: '#F0F3F9',
      blockquoteAccent: '#576B95'
    }
  },
  text: '#27272A',
  textMuted: '#888888',
  borderColor: '#EDEDED',
  slots: {
    renderBanner(title: string, ctx: RenderContext): string {
      const { colors, fontSize, author, theme, dateStr, meta } = ctx
      const authorLabel = author.trim() || DEFAULT_ARTICLE_META.author
      const category = meta.category.trim() || 'MOMENTS'
      const avatar = meta.avatar.trim() || DEFAULT_ARTICLE_META.avatar
      const avatarHtml = avatar
        ? `<img src="${escapeHtml(avatar)}" alt="${escapeHtml(authorLabel)}" style="width:36px;height:36px;border-radius:6px;object-fit:cover;border:1px solid ${theme.borderColor};flex-shrink:0;" />`
        : `<span style="width:36px;height:36px;border-radius:6px;background:${colors.headingDecor};color:#FFFFFF;font-size:14px;font-weight:800;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;">${escapeHtml(authorLabel.slice(0, 1))}</span>`
      const badges = resolveTagList(meta.tags)
        .map(
          (t) =>
            `<span style="background:${colors.tableAccent};color:${colors.headingDecor};padding:2px 8px;border-radius:4px;font-size:10px;font-weight:600;">#${escapeHtml(t)}</span>`
        )
        .join('')

      const titleCore = `
        <section style="text-align:left;">
          <p style="font-size:10px;font-weight:700;letter-spacing:1.4px;color:${colors.headingDecor};margin:0 0 6px;text-transform:uppercase;">${escapeHtml(category)}</p>
          <p style="font-size:${fontSize + 4}px;font-weight:800;color:${colors.heading};margin:0;line-height:1.45;">
            ${escapeHtml(title)}
          </p>
        </section>
      `
      const bannerFrame = ctx.motion.renderBannerFrame(titleCore, colors, ctx.animated)

      return `
        <section style="margin:0 0 24px 0;background:${colors.bg};border:1px solid ${theme.borderColor};border-radius:12px;padding:14px;box-shadow:0 2px 14px -6px rgba(0,0,0,0.08);max-width:100%;overflow:hidden;box-sizing:border-box;">
          <section style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:12px;">
            <section style="display:flex;align-items:center;gap:10px;min-width:0;">
              ${avatarHtml}
              <section style="min-width:0;">
                <p style="margin:0;font-size:14px;font-weight:700;color:${colors.headingDecor};line-height:1.25;">${escapeHtml(authorLabel)}</p>
                <p style="margin:2px 0 0;font-size:11px;color:${theme.textMuted};line-height:1.2;">${escapeHtml(dateStr)} · 发布动态</p>
              </section>
            </section>
            <span style="font-size:12px;color:${theme.textMuted};letter-spacing:2px;flex-shrink:0;">•••</span>
          </section>
          ${bannerFrame}
          <section style="margin-top:12px;padding-top:10px;border-top:1px solid ${theme.borderColor};display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;">
            <section style="display:flex;gap:5px;flex-wrap:wrap;">${badges}</section>
            <span style="font-size:11px;color:${colors.headingDecor};font-weight:600;">♡ 赞 · 评论</span>
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
              ? `<span style="color:${colors.headingDecor};font-weight:700;margin-right:6px;">${num}.</span>`
              : `<span style="display:inline-block;width:5px;height:5px;border-radius:50%;background:${colors.headingDecor};margin-right:7px;vertical-align:middle;"></span>`
          return `
            <p style="margin:0 0 6px 0;font-size:13px;line-height:1.55;color:${theme.text};">
              ${marker}<span>${escapeHtml(text)}</span>
            </p>
          `
        })
        .join('')

      const tocDecor = `<section style="width:70px;flex-shrink:0;">${ctx.motion.renderTocDecor(colors, ctx.animated)}</section>`

      return `
        <section style="margin:0 0 24px 0;padding:12px 14px;background:${colors.tableAccent};border-radius:8px;border:1px solid ${theme.borderColor};">
          <section style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:8px;padding-bottom:6px;border-bottom:1px solid ${theme.borderColor};">
            <p style="margin:0;font-size:10px;font-weight:800;letter-spacing:1.2px;color:${colors.headingDecor};">COMMENTS · 置顶导览</p>
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
          ? `<span style="display:inline-flex;align-items:center;justify-content:center;padding:2px 8px;border-radius:12px;background:${colors.tableAccent};border:1px solid ${hexToRgba(colors.headingDecor, 0.3)};color:${colors.headingDecor};font-size:11px;font-weight:800;flex-shrink:0;">#${num}</span>`
          : `<span style="width:8px;height:8px;border-radius:50%;background:${colors.headingDecor};flex-shrink:0;display:inline-block;"></span>`

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
        <section style="margin:14px 0;padding:12px 14px;background:${colors.tableAccent};border-radius:8px;border:1px solid ${theme.borderColor};color:${theme.text};font-size:${Math.max(13, fontSize - 1)}px;line-height:1.65;">
          <section style="display:flex;justify-content:flex-start;margin-bottom:6px;line-height:0;"><section style="width:28px;">${decor}</section></section>
          ${content}
        </section>
      `
    },

    renderImage(href: string, text: string, ctx: RenderContext): string {
      const { theme, colors, motion, animated } = ctx
      const placeholderHtml = motion.renderImagePlaceholder(text, '16:9', colors, animated)
      if (isPlaceholderImageSrc(href)) {
        return placeholderHtml
      }
      return `
        <figure data-placeholder="${escapeHtml(encodeURIComponent(placeholderHtml))}" style="margin:18px 0;text-align:center;">
          <section style="background:${colors.tableAccent};border-radius:8px;padding:6px;border:1px solid ${theme.borderColor};">
            <img src="${escapeHtml(href)}" alt="${escapeHtml(text)}" style="max-width:100%;height:auto;border-radius:6px;display:block;margin:0 auto;" />
          </section>
          ${text ? `<figcaption style="margin-top:8px;font-size:12px;color:${theme.textMuted};">${escapeHtml(text)}</figcaption>` : ''}
        </figure>
      `
    }
  }
}
