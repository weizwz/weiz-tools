import { isPlaceholderImageSrc } from '../motions/helpers'
import { DEFAULT_ARTICLE_META, escapeHtml, hexToRgba, resolveTagList } from '../tokens'
import { LayoutTheme, RenderContext } from '../types'

export const inkScrollTheme: LayoutTheme = {
  id: 'ink-scroll',
  name: '山水画卷',
  defaultPalette: {
    id: 'default',
    name: '默认',
    colors: {
      bg: '#F7F6F2',
      heading: '#18181B',
      strong: '#27272A',
      headingDecor: '#27272A',
      divider: '#D4D3CE',
      listMarker: '#27272A',
      tableAccent: '#EEEDE7',
      inlineCodeText: '#18181B',
      inlineCodeBg: '#E6E4DC',
      blockquoteAccent: '#27272A'
    }
  },
  text: '#3F3F46',
  textMuted: '#787872',
  borderColor: '#D6D4CC',
  codeBorder: '#C7C4BA',
  slots: {
    renderBanner(title: string, ctx: RenderContext): string {
      const { colors, fontSize, author, theme, dateStr, meta } = ctx
      const authorLabel = author.trim() || DEFAULT_ARTICLE_META.author
      const category = meta.category.trim() || 'INK SCROLL'
      const avatar = meta.avatar.trim() || DEFAULT_ARTICLE_META.avatar
      const avatarHtml = avatar
        ? `<img src="${escapeHtml(avatar)}" alt="${escapeHtml(authorLabel)}" style="width:20px;height:20px;border-radius:50%;object-fit:cover;border:1px solid ${hexToRgba(colors.headingDecor, 0.35)};flex-shrink:0;" />`
        : ''
      const badges = resolveTagList(meta.tags)
        .map(
          (t) =>
            `<span style="background:${colors.tableAccent};color:${colors.headingDecor};padding:2px 8px;border-radius:2px;font-size:10px;font-weight:600;border:1px solid ${theme.borderColor};">${escapeHtml(t)}</span>`
        )
        .join('')

      const titleCore = `
        <section style="text-align:center;">
          <p style="font-size:10px;font-weight:700;letter-spacing:3.2px;color:${colors.headingDecor};margin:0 0 10px;text-transform:uppercase;">${escapeHtml(category)}</p>
          <p style="font-size:${fontSize + 5}px;font-weight:800;color:${colors.heading};margin:0;line-height:1.48;font-family:'Songti SC','Noto Serif SC',Georgia,serif;">
            ${escapeHtml(title)}
          </p>
        </section>
      `
      const bannerFrame = ctx.motion.renderBannerFrame(titleCore, colors, ctx.animated)

      return `
        <section style="margin:0 0 26px 0;background:${colors.bg};border:1px solid ${theme.borderColor};border-radius:3px;overflow:hidden;max-width:100%;box-sizing:border-box;">
          <section style="display:flex;align-items:stretch;">
            <section style="width:8px;flex-shrink:0;background:${colors.heading};border-right:2px solid ${theme.borderColor};"></section>
            <section style="flex:1;min-width:0;padding:14px 12px 10px;">
              ${bannerFrame}
            </section>
            <section style="width:8px;flex-shrink:0;background:${colors.heading};border-left:2px solid ${theme.borderColor};"></section>
          </section>
          <section style="padding:10px 16px;background:${colors.tableAccent};border-top:1px solid ${theme.borderColor};display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;">
            <section style="display:flex;gap:5px;flex-wrap:wrap;">${badges}</section>
            <section style="display:flex;align-items:center;gap:7px;">
              ${avatarHtml}
              <span style="font-size:12px;color:${theme.textMuted};font-family:'Songti SC','Noto Serif SC',serif;">${escapeHtml(authorLabel)} · ${escapeHtml(dateStr)}</span>
            </section>
          </section>
        </section>
      `
    },

    renderToc(headings: string[], ctx: RenderContext): string {
      const { colors, theme, headingNumbering } = ctx
      const items = headings
        .slice(0, 6)
        .map((text, idx) => {
          const num = String(idx + 1).padStart(2, '0')
          const prefix =
            headingNumbering === 'numeric'
              ? `<span style="display:inline-block;border:1px solid ${colors.headingDecor};font-family:Georgia,serif;font-size:10px;font-weight:700;color:${colors.headingDecor};padding:0 4px;margin-right:10px;border-radius:1px;">${num}</span>`
              : `<span style="display:inline-block;width:2px;height:11px;background:${colors.headingDecor};margin-right:10px;vertical-align:middle;"></span>`
          return `
            <p style="margin:0 0 8px 0;font-size:13px;line-height:1.7;color:${theme.text};">
              ${prefix}<span>${escapeHtml(text)}</span>
            </p>
          `
        })
        .join('')

      const tocDecor = `<section style="width:70px;flex-shrink:0;">${ctx.motion.renderTocDecor(colors, ctx.animated)}</section>`

      return `
        <section style="margin:0 0 26px 0;padding:16px 18px;background:${colors.tableAccent};border-top:2px solid ${colors.heading};border-bottom:2px solid ${colors.heading};border-left:1px solid ${theme.borderColor};border-right:1px solid ${theme.borderColor};">
          <section style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px;padding-bottom:6px;border-bottom:1px solid ${theme.borderColor};">
            <p style="margin:0;font-size:10px;font-weight:700;letter-spacing:2.8px;color:${colors.headingDecor};">卷首题跋 · 目录</p>
            ${tocDecor}
          </section>
          ${items}
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
          ? `<span style="border:1.5px solid ${colors.headingDecor};color:${colors.headingDecor};font-size:11px;font-weight:800;padding:2px 6px;border-radius:2px;font-family:Georgia,serif;flex-shrink:0;">${num}</span>`
          : `<span style="width:3px;height:18px;background:${colors.headingDecor};flex-shrink:0;display:inline-block;"></span>`

      return `
        <section style="margin:${marginTop} 0 14px 0;max-width:100%;overflow:hidden;">
          <section style="display:flex;align-items:center;gap:10px;">
            ${prefix}
            <h2 style="margin:0;font-size:${fontSize + 2}px;font-weight:800;color:${colors.heading};line-height:1.45;font-family:'Songti SC','Noto Serif SC',Georgia,serif;flex:0 1 auto;min-width:0;word-break:break-word;overflow-wrap:anywhere;">${content}</h2>
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
        <section style="margin:14px 0;padding:12px 16px;background:${colors.tableAccent};border-left:2px solid ${colors.blockquoteAccent};border-right:2px solid ${hexToRgba(colors.blockquoteAccent, 0.35)};color:${theme.text};font-size:${Math.max(13, fontSize - 1)}px;line-height:1.7;">
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
          <section style="background:${colors.tableAccent};border-radius:2px;padding:10px;border:1px solid ${theme.borderColor};">
            <img src="${escapeHtml(href)}" alt="${escapeHtml(text)}" style="max-width:100%;height:auto;border:1px solid ${hexToRgba(colors.heading, 0.2)};display:block;margin:0 auto;" />
          </section>
          ${text ? `<figcaption style="margin-top:8px;font-size:12px;color:${theme.textMuted};font-family:'Songti SC','Noto Serif SC',serif;">— ${escapeHtml(text)}</figcaption>` : ''}
        </figure>
      `
    }
  }
}
