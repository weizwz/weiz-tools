import { isPlaceholderImageSrc } from '../motions/helpers'
import { DEFAULT_ARTICLE_META, escapeHtml, hexToRgba, resolveTagList } from '../tokens'
import { LayoutTheme, RenderContext } from '../types'

export const bookNotesTheme: LayoutTheme = {
  id: 'book-notes',
  name: '札书手记',
  defaultPalette: {
    id: 'default',
    name: '默认',
    colors: {
      bg: '#FBF8F1',
      heading: '#2C221E',
      strong: '#B45309',
      headingDecor: '#B45309',
      divider: '#D6CFC2',
      listMarker: '#B45309',
      tableAccent: '#F3EDE0',
      inlineCodeText: '#92400E',
      inlineCodeBg: '#F3EDE0',
      blockquoteAccent: '#B45309'
    }
  },
  text: '#443B34',
  textMuted: '#8C8278',
  borderColor: '#E5DEC9',
  codeBorder: '#D6CFC2',
  slots: {
    renderBanner(title: string, ctx: RenderContext): string {
      const { colors, fontSize, author, theme, dateStr, meta } = ctx
      const authorLabel = author.trim() || DEFAULT_ARTICLE_META.author
      const category = meta.category.trim() || 'NOTEBOOK'
      const avatar = meta.avatar.trim() || DEFAULT_ARTICLE_META.avatar
      const avatarHtml = avatar
        ? `<img src="${escapeHtml(avatar)}" alt="${escapeHtml(authorLabel)}" style="width:20px;height:20px;border-radius:50%;object-fit:cover;border:1px solid rgba(255,255,255,0.45);flex-shrink:0;" />`
        : ''
      const badges = resolveTagList(meta.tags)
        .map(
          (t) =>
            `<span style="background:rgba(255,255,255,0.14);color:#FBF8F1;padding:2px 7px;border-radius:3px;font-size:9px;font-weight:600;border:1px solid rgba(255,255,255,0.22);">${escapeHtml(t)}</span>`
        )
        .join('')

      const ringDots = Array.from({ length: 5 })
        .map(
          () =>
            `<span style="width:7px;height:7px;border-radius:50%;background:${colors.bg};border:1.5px solid ${hexToRgba(colors.headingDecor, 0.55)};display:inline-block;"></span>`
        )
        .join('')

      const titleCore = `
        <section style="text-align:center;">
          <p style="font-size:10px;font-weight:700;letter-spacing:2.4px;color:${colors.headingDecor};margin:0 0 8px;text-transform:uppercase;">${escapeHtml(category)}</p>
          <p style="font-size:${fontSize + 5}px;font-weight:800;color:${colors.heading};margin:0;line-height:1.45;font-family:'Songti SC','Noto Serif SC',Georgia,serif;">
            ${escapeHtml(title)}
          </p>
        </section>
      `
      const bannerFrame = ctx.motion.renderBannerFrame(titleCore, colors, ctx.animated)

      return `
        <section style="margin:0 0 24px 0;background:${colors.bg};border:1px solid ${theme.borderColor};border-radius:4px 8px 8px 4px;overflow:hidden;box-shadow:0 4px 16px -6px rgba(44,34,30,0.12);max-width:100%;box-sizing:border-box;">
          <section style="display:flex;align-items:stretch;">
            <section style="width:16px;flex-shrink:0;background:${colors.tableAccent};border-right:1px dashed ${hexToRgba(colors.headingDecor, 0.35)};display:flex;flex-direction:column;align-items:center;justify-content:space-evenly;padding:12px 0;">
              ${ringDots}
            </section>
            <section style="flex:1;min-width:0;padding:14px 14px 10px;">
              ${bannerFrame}
            </section>
          </section>
          <section style="background:${colors.heading};padding:10px 18px;display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;">
            <section style="display:flex;align-items:center;gap:7px;">
              ${avatarHtml}
              <p style="font-size:12px;color:rgba(255,255,255,0.92);margin:0;font-weight:500;">${escapeHtml(authorLabel)} · ${escapeHtml(dateStr)}</p>
            </section>
            <section style="display:flex;gap:5px;flex-wrap:wrap;">${badges}</section>
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
              ? `<span style="display:inline-block;width:24px;font-weight:700;color:${colors.headingDecor};font-family:Menlo,Monaco,Consolas,monospace;">${num}</span>`
              : `<span style="display:inline-block;width:16px;color:${colors.headingDecor};font-size:10px;">✦</span>`
          return `
            <p style="margin:0 0 7px 0;padding-bottom:5px;border-bottom:1px dashed ${hexToRgba(colors.divider, 0.7)};font-size:13px;line-height:1.6;color:${theme.text};">
              ${prefix}<span>${escapeHtml(text)}</span>
            </p>
          `
        })
        .join('')

      const tocDecor = `<section style="width:72px;flex-shrink:0;">${ctx.motion.renderTocDecor(colors, ctx.animated)}</section>`

      return `
        <section style="margin:0 0 24px 0;background:${colors.bg};border:1px solid ${theme.borderColor};border-left:4px solid ${colors.headingDecor};border-radius:4px 8px 8px 4px;overflow:hidden;">
          <section style="padding:9px 16px;background:${colors.tableAccent};border-bottom:1px solid ${theme.borderColor};display:flex;align-items:center;justify-content:space-between;gap:10px;">
            <p style="margin:0;font-size:10px;font-weight:800;letter-spacing:2px;color:${colors.heading};">NOTEBOOK · 手记目录</p>
            <span style="font-size:10px;color:${theme.textMuted};">${headings.length} 篇</span>
          </section>
          <section style="padding:14px 16px;display:flex;align-items:flex-start;justify-content:space-between;gap:10px;">
            <section style="flex:1;min-width:0;">${items}</section>
            ${tocDecor}
          </section>
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
          ? `<span style="display:inline-flex;align-items:center;padding:2px 8px;background:${colors.tableAccent};border:1px solid ${hexToRgba(colors.headingDecor, 0.35)};border-left:3px solid ${colors.headingDecor};border-radius:3px;font-size:13px;font-weight:800;color:${colors.headingDecor};font-family:Georgia,serif;flex-shrink:0;">${num}</span>`
          : `<span style="width:5px;height:18px;border-left:3px solid ${colors.headingDecor};border-right:1px solid ${hexToRgba(colors.headingDecor, 0.45)};flex-shrink:0;display:inline-block;"></span>`

      return `
        <section style="margin:${marginTop} 0 14px 0;max-width:100%;overflow:hidden;">
          <section style="display:flex;align-items:center;gap:10px;">
            ${prefix}
            <h2 style="margin:0;font-size:${fontSize + 2}px;font-weight:800;color:${colors.heading};line-height:1.4;font-family:'Songti SC','Noto Serif SC',Georgia,serif;flex:0 1 auto;min-width:0;word-break:break-word;overflow-wrap:anywhere;">${content}</h2>
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
        <section style="margin:14px 0;padding:12px 16px;background:${colors.tableAccent};border:1px dashed ${hexToRgba(colors.blockquoteAccent, 0.4)};border-left:4px solid ${colors.blockquoteAccent};border-radius:4px;color:${theme.text};font-size:${Math.max(13, fontSize - 1)}px;line-height:1.68;">
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
          <section style="background:#FFFFFF;border-radius:4px;padding:8px 8px 12px;border:1px solid ${theme.borderColor};box-shadow:0 3px 10px -4px rgba(44,34,30,0.1);">
            <img src="${escapeHtml(href)}" alt="${escapeHtml(text)}" style="max-width:100%;height:auto;border-radius:2px;display:block;margin:0 auto;" />
            ${text ? `<p style="margin:8px 0 0;font-size:12px;color:${theme.textMuted};font-family:'Songti SC','Noto Serif SC',serif;">— ${escapeHtml(text)}</p>` : ''}
          </section>
        </figure>
      `
    }
  }
}
