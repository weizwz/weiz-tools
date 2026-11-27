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
      bg: '#FBF9F5',
      heading: '#292524',
      strong: '#B45309',
      headingDecor: '#B45309',
      divider: '#D6D3CD',
      listMarker: '#B45309',
      codeBlockBg: '#292524',
      tableAccent: '#F3EFE6',
      inlineCodeText: '#92400E',
      inlineCodeBg: '#F3EFE6',
      blockquoteAccent: '#B45309'
    }
  },
  text: '#44403C',
  textMuted: '#A8A29E',
  borderColor: '#E7E2D8',
  codeBorder: '#D6CFC2',
  preHeaderBg: '#1C1917',
  slots: {
    renderBanner(title: string, ctx: RenderContext): string {
      const { colors, fontSize, author, theme, dateStr, meta } = ctx
      const authorLabel = author.trim() || DEFAULT_ARTICLE_META.author
      const category = meta.category.trim() || 'BOOK NOTES'
      const avatar = meta.avatar.trim() || DEFAULT_ARTICLE_META.avatar
      const avatarHtml = avatar
        ? `<img src="${escapeHtml(avatar)}" alt="${escapeHtml(authorLabel)}" style="width:20px;height:20px;border-radius:50%;object-fit:cover;border:1px solid rgba(255,255,255,0.45);flex-shrink:0;" />`
        : ''
      const badges = resolveTagList(meta.tags)
        .map(
          (t) =>
            `<span style="background:rgba(255,255,255,0.14);color:#FBF9F5;padding:2px 7px;border-radius:3px;font-size:9px;font-weight:600;border:1px solid rgba(255,255,255,0.22);">${escapeHtml(t)}</span>`
        )
        .join('')

      const titleCore = `
        <section style="text-align:center;">
          <p style="font-size:10px;font-weight:700;letter-spacing:2.4px;color:${colors.headingDecor};margin:0 0 8px;text-transform:uppercase;">${escapeHtml(category)}</p>
          <p style="font-size:${fontSize + 5}px;font-weight:800;color:${colors.heading};margin:0;line-height:1.42;font-family:'Songti SC','Noto Serif SC',Georgia,serif;">
            ${escapeHtml(title)}
          </p>
        </section>
      `
      const bannerFrame = ctx.motion.renderBannerFrame(titleCore, colors, ctx.animated)

      return `
        <section style="margin:0 0 24px 0;background:${colors.bg};border:1px solid ${theme.borderColor};border-radius:6px;overflow:hidden;max-width:100%;box-sizing:border-box;">
          <section style="padding:14px 14px 10px;">
            ${bannerFrame}
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
              : `<span style="display:inline-block;width:16px;color:${colors.headingDecor};font-size:10px;">◆</span>`
          return `
            <p style="margin:0 0 7px 0;font-size:13px;line-height:1.6;color:${theme.text};">
              ${prefix}<span>${escapeHtml(text)}</span>
            </p>
          `
        })
        .join('')

      const tocDecor = `<section style="width:72px;flex-shrink:0;">${ctx.motion.renderTocDecor(colors, ctx.animated)}</section>`

      return `
        <section style="margin:0 0 24px 0;background:${colors.bg};border:1px solid ${theme.borderColor};border-radius:6px;overflow:hidden;">
          <section style="padding:9px 16px;background:${colors.tableAccent};border-bottom:1px solid ${theme.borderColor};display:flex;align-items:center;justify-content:space-between;gap:10px;">
            <p style="margin:0;font-size:10px;font-weight:800;letter-spacing:2px;color:${colors.heading};">READING NOTES · 书摘目录</p>
            <span style="font-size:10px;color:${theme.textMuted};">${headings.length} 节</span>
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
      const badge = `<section style="width:46px;flex-shrink:0;">${motion.renderSectionBadge(colors, animated, index)}</section>`
      const rail = `<section style="margin-top:2px;">${motion.renderSectionRail(colors, animated, index)}</section>`
      const prefix =
        headingNumbering === 'numeric'
          ? `<section style="text-align:center;flex-shrink:0;padding-right:10px;border-right:1px solid ${colors.divider};"><p style="margin:0;font-size:20px;font-weight:800;color:${colors.headingDecor};line-height:1;font-family:Georgia,serif;">${num}</p></section>`
          : `<span style="width:4px;height:18px;border-left:2px solid ${colors.headingDecor};border-right:1px solid ${hexToRgba(colors.headingDecor, 0.4)};flex-shrink:0;display:inline-block;"></span>`

      return `
        <section style="margin:${marginTop} 0 14px 0;max-width:100%;overflow:hidden;">
          <section style="display:flex;align-items:center;gap:10px;">
            ${prefix}
            <h2 style="margin:0;font-size:${fontSize + 2}px;font-weight:800;color:${colors.heading};line-height:1.4;font-family:'Songti SC','Noto Serif SC',Georgia,serif;flex:1;min-width:0;word-break:break-word;">${content}</h2>
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
        <section style="margin:14px 0;padding:10px 14px;background:${colors.tableAccent};border:1px dashed ${hexToRgba(colors.blockquoteAccent, 0.35)};border-left:3px solid ${colors.blockquoteAccent};border-radius:4px;color:${theme.text};font-size:${Math.max(13, fontSize - 1)}px;line-height:1.68;overflow:hidden;">
          <section style="float:right;width:28px;margin:-2px 0 2px 8px;line-height:0;">${decor}</section>
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
          <section style="background:#FFFFFF;border-radius:4px;padding:8px;border:1px solid ${theme.borderColor};">
            <img src="${escapeHtml(href)}" alt="${escapeHtml(text)}" style="max-width:100%;height:auto;border-radius:2px;display:block;margin:0 auto;" />
          </section>
          ${text ? `<figcaption style="margin-top:8px;font-size:12px;color:${theme.textMuted};">— ${escapeHtml(text)}</figcaption>` : ''}
        </figure>
      `
    }
  }
}
