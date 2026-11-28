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
      tableAccent: '#F0FDF4',
      inlineCodeText: '#166534',
      inlineCodeBg: '#DCFCE7',
      blockquoteAccent: '#15803D'
    }
  },
  text: '#374151',
  textMuted: '#6B7280',
  borderColor: '#D1FAE5',
  slots: {
    renderBanner(title: string, ctx: RenderContext): string {
      const { colors, fontSize, author, dateStr, meta } = ctx
      const authorLabel = author.trim() || DEFAULT_ARTICLE_META.author
      const category = meta.category.trim() || 'AIR MAIL'
      const avatar = meta.avatar.trim() || DEFAULT_ARTICLE_META.avatar
      const avatarHtml = avatar
        ? `<img src="${escapeHtml(avatar)}" alt="${escapeHtml(authorLabel)}" style="width:20px;height:20px;border-radius:50%;object-fit:cover;border:1px solid rgba(255,255,255,0.5);flex-shrink:0;" />`
        : ''
      const badges = resolveTagList(meta.tags)
        .map(
          (t) =>
            `<span style="background:rgba(255,255,255,0.18);padding:2px 7px;border-radius:2px;font-size:9px;color:#fff;font-weight:600;border:1px dashed rgba(255,255,255,0.5);">${escapeHtml(t)}</span>`
        )
        .join('')

      const airmailStripes = Array.from({ length: 12 })
        .map(
          (_, idx) =>
            `<span style="flex:1;height:5px;background:${idx % 2 === 0 ? colors.headingDecor : '#DC2626'};opacity:0.85;"></span>`
        )
        .join('')

      const titleCore = `
        <section style="text-align:center;">
          <section style="display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:8px;">
            <span style="border:1.5px dashed ${hexToRgba(colors.headingDecor, 0.6)};padding:2px 8px;font-size:9px;font-weight:800;letter-spacing:2px;color:${colors.headingDecor};text-transform:uppercase;">${escapeHtml(category)}</span>
          </section>
          <p style="font-size:${fontSize + 5}px;font-weight:800;color:${colors.heading};margin:0;line-height:1.42;">
            ${escapeHtml(title)}
          </p>
        </section>
      `
      const bannerFrame = ctx.motion.renderBannerFrame(titleCore, colors, ctx.animated)

      return `
        <section style="margin:0 0 24px 0;background:#FFFFFF;border:1.5px solid ${hexToRgba(colors.headingDecor, 0.35)};border-radius:8px;overflow:hidden;box-shadow:0 4px 16px -6px ${hexToRgba(colors.headingDecor, 0.16)};max-width:100%;box-sizing:border-box;">
          <section style="display:flex;gap:4px;">${airmailStripes}</section>
          <section style="padding:14px 14px 10px;">
            ${bannerFrame}
          </section>
          <section style="background:${colors.headingDecor};padding:10px 18px;display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;border-top:1px dashed rgba(255,255,255,0.35);">
            <section style="display:flex;align-items:center;gap:7px;">
              ${avatarHtml}
              <p style="font-size:12px;color:rgba(255,255,255,0.95);margin:0;font-weight:600;">FROM ${escapeHtml(authorLabel)} · ${escapeHtml(dateStr)}</p>
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
              ? `<span style="font-family:Menlo,Monaco,Consolas,monospace;font-size:10px;font-weight:800;color:${colors.headingDecor};margin-right:8px;">POST ${num}</span>`
              : `<span style="display:inline-block;width:7px;height:7px;border-radius:2px;background:${colors.headingDecor};margin-right:8px;vertical-align:middle;"></span>`
          return `
            <p style="margin:0 0 7px 0;padding-bottom:5px;border-bottom:1px dashed ${hexToRgba(colors.headingDecor, 0.2)};font-size:13px;line-height:1.55;color:${theme.text};">
              ${prefix}<span>${escapeHtml(text)}</span>
            </p>
          `
        })
        .join('')

      const tocDecor = `<section style="width:72px;flex-shrink:0;">${ctx.motion.renderTocDecor(colors, ctx.animated)}</section>`

      return `
        <section style="margin:0 0 24px 0;padding:14px 16px;background:#FFFFFF;border:1.5px dashed ${hexToRgba(colors.headingDecor, 0.45)};border-radius:8px;">
          <section style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:8px;">
            <p style="margin:0;font-size:10px;font-weight:800;letter-spacing:1.6px;color:${colors.headingDecor};">ITINERARY · 邮路坐标</p>
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
          ? `<span style="display:inline-block;border:1.5px dashed ${colors.headingDecor};color:${colors.headingDecor};font-size:12px;font-weight:800;padding:2px 7px;border-radius:3px;font-family:Menlo,Monaco,Consolas,monospace;flex-shrink:0;">${num}</span>`
          : `<span style="width:8px;height:16px;border-radius:2px;background:${colors.headingDecor};flex-shrink:0;display:inline-block;"></span>`

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
        <section style="margin:14px 0;padding:12px 16px;background:#FFFFFF;border:1px dashed ${hexToRgba(colors.blockquoteAccent, 0.45)};border-left:4px solid ${colors.blockquoteAccent};border-radius:6px;color:${theme.text};font-size:${Math.max(13, fontSize - 1)}px;line-height:1.68;">
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
          <section style="background:#FFFFFF;border-radius:6px;padding:10px 10px 14px;border:1px solid #E5E7EB;box-shadow:0 4px 12px -4px rgba(0,0,0,0.08);">
            <img src="${escapeHtml(href)}" alt="${escapeHtml(text)}" style="max-width:100%;height:auto;border-radius:3px;display:block;margin:0 auto;" />
            ${text ? `<p style="margin:10px 0 0;font-size:12px;color:${theme.textMuted};letter-spacing:0.4px;">${escapeHtml(text)}</p>` : ''}
          </section>
        </figure>
      `
    }
  }
}
