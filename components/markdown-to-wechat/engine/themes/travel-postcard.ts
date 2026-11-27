import { isPlaceholderImageSrc } from '../motions/helpers'
import { DEFAULT_ARTICLE_META, escapeHtml, hexToRgba, resolveTagList } from '../tokens'
import { LayoutTheme, RenderContext } from '../types'

export const travelPostcardTheme: LayoutTheme = {
  id: 'travel-postcard',
  name: '行旅明信',
  defaultPalette: {
    id: 'default',
    name: '默认',
    colors: {
      bg: '#FDFBF7',
      heading: '#143326',
      strong: '#15803D',
      headingDecor: '#15803D',
      divider: '#BBF7D0',
      listMarker: '#15803D',
      codeBlockBg: '#143326',
      tableAccent: '#F0FDF4',
      inlineCodeText: '#166534',
      inlineCodeBg: '#DCFCE7',
      blockquoteAccent: '#15803D'
    }
  },
  text: '#374151',
  textMuted: '#6B7280',
  borderColor: '#D1FAE5',
  preHeaderBg: '#0B2017',
  slots: {
    renderBanner(title: string, ctx: RenderContext): string {
      const { colors, fontSize, author, dateStr, meta } = ctx
      const authorLabel = author.trim() || DEFAULT_ARTICLE_META.author
      const category = meta.category.trim() || 'TRAVELOGUE'
      const avatar = meta.avatar.trim() || DEFAULT_ARTICLE_META.avatar
      const avatarHtml = avatar
        ? `<img src="${escapeHtml(avatar)}" alt="${escapeHtml(authorLabel)}" style="width:20px;height:20px;border-radius:50%;object-fit:cover;border:1px solid rgba(255,255,255,0.5);flex-shrink:0;" />`
        : ''
      const badges = resolveTagList(meta.tags)
        .map(
          (t) =>
            `<span style="background:rgba(255,255,255,0.2);padding:2px 7px;border-radius:3px;font-size:9px;color:#fff;font-weight:600;border:1px dashed rgba(255,255,255,0.45);">${escapeHtml(t)}</span>`
        )
        .join('')

      const titleCore = `
        <section style="text-align:center;">
          <p style="font-size:10px;font-weight:800;letter-spacing:2.2px;color:${colors.headingDecor};margin:0 0 8px;text-transform:uppercase;">${escapeHtml(category)}</p>
          <p style="font-size:${fontSize + 5}px;font-weight:800;color:${colors.heading};margin:0;line-height:1.42;">
            ${escapeHtml(title)}
          </p>
        </section>
      `
      const bannerFrame = ctx.motion.renderBannerFrame(titleCore, colors, ctx.animated)

      return `
        <section style="margin:0 0 24px 0;background:#FFFFFF;border:1px solid ${hexToRgba(colors.headingDecor, 0.28)};border-radius:10px;overflow:hidden;box-shadow:0 4px 14px -6px ${hexToRgba(colors.headingDecor, 0.16)};max-width:100%;box-sizing:border-box;">
          <section style="padding:14px 14px 10px;">
            ${bannerFrame}
          </section>
          <section style="background:${colors.headingDecor};padding:10px 18px;display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;">
            <section style="display:flex;align-items:center;gap:7px;">
              ${avatarHtml}
              <p style="font-size:12px;color:rgba(255,255,255,0.95);margin:0;font-weight:600;">${escapeHtml(authorLabel)} · ${escapeHtml(dateStr)}</p>
            </section>
            <section style="display:flex;gap:5px;flex-wrap:wrap;">${badges}</section>
          </section>
        </section>
      `
    },

    renderToc(headings: string[], ctx: RenderContext): string {
      const { colors, theme, headingNumbering } = ctx
      const stops = headings
        .slice(0, 6)
        .map((text, idx) => {
          const num = String(idx + 1).padStart(2, '0')
          const prefix =
            headingNumbering === 'numeric'
              ? `<span style="font-family:Menlo,Monaco,Consolas,monospace;font-size:10px;font-weight:800;color:${colors.headingDecor};margin-right:8px;">STOP ${num}</span>`
              : `<span style="display:inline-block;width:7px;height:7px;border-radius:2px;background:${colors.headingDecor};margin-right:8px;vertical-align:middle;"></span>`
          return `
            <p style="margin:0 0 7px 0;font-size:13px;line-height:1.55;color:${theme.text};">
              ${prefix}<span>${escapeHtml(text)}</span>
            </p>
          `
        })
        .join('')

      const tocDecor = `<section style="width:72px;flex-shrink:0;">${ctx.motion.renderTocDecor(colors, ctx.animated)}</section>`

      return `
        <section style="margin:0 0 24px 0;padding:14px 16px;background:#FFFFFF;border:1px dashed ${hexToRgba(colors.headingDecor, 0.45)};border-radius:10px;">
          <section style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:8px;">
            <p style="margin:0;font-size:10px;font-weight:800;letter-spacing:1.6px;color:${colors.headingDecor};">ITINERARY · 行程坐标</p>
            ${tocDecor}
          </section>
          ${stops}
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
          ? `<span style="display:inline-block;border:1.5px solid ${colors.headingDecor};color:${colors.headingDecor};font-size:12px;font-weight:800;padding:2px 7px;border-radius:4px;font-family:Menlo,Monaco,Consolas,monospace;flex-shrink:0;">${num}</span>`
          : `<span style="width:8px;height:16px;border-radius:2px;background:${colors.headingDecor};flex-shrink:0;display:inline-block;"></span>`

      return `
        <section style="margin:${marginTop} 0 14px 0;max-width:100%;overflow:hidden;">
          <section style="display:flex;align-items:center;gap:10px;">
            ${prefix}
            <h2 style="margin:0;font-size:${fontSize + 2}px;font-weight:800;color:${colors.heading};line-height:1.4;min-width:0;word-break:break-word;">${content}</h2>
            ${badge}
          </section>
          ${rail}
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
          <section style="background:#FFFFFF;border-radius:6px;padding:10px 10px 14px;border:1px solid #E5E7EB;box-shadow:0 4px 12px -4px rgba(0,0,0,0.08);">
            <img src="${escapeHtml(href)}" alt="${escapeHtml(text)}" style="max-width:100%;height:auto;border-radius:3px;display:block;margin:0 auto;" />
            ${text ? `<p style="margin:10px 0 0;font-size:12px;color:${theme.textMuted};letter-spacing:0.4px;">${escapeHtml(text)}</p>` : ''}
          </section>
        </figure>
      `
    }
  }
}
