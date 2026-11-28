import { isPlaceholderImageSrc } from '../motions/helpers'
import { DEFAULT_ARTICLE_META, escapeHtml, hexToRgba, resolveTagList } from '../tokens'
import { LayoutTheme, RenderContext } from '../types'

export const hackerTerminalTheme: LayoutTheme = {
  id: 'hacker-terminal',
  name: '极客终端',
  defaultPalette: {
    id: 'default',
    name: '默认',
    colors: {
      bg: '#09090B',
      heading: '#FAFAFA',
      strong: '#FFFFFF',
      headingDecor: '#E4E4E7',
      divider: '#27272A',
      listMarker: '#A1A1AA',
      tableAccent: '#18181B',
      inlineCodeText: '#FAFAFA',
      inlineCodeBg: '#18181B',
      blockquoteAccent: '#E4E4E7'
    }
  },
  text: '#D4D4D8',
  textMuted: '#71717A',
  borderColor: '#27272A',
  codeBorder: '#3F3F46',
  slots: {
    renderBanner(title: string, ctx: RenderContext): string {
      const { colors, fontSize, author, theme, dateStr, meta } = ctx
      const authorLabel = author.trim() || DEFAULT_ARTICLE_META.author
      const category = meta.category.trim() || 'TTY0'
      const avatar = meta.avatar.trim() || DEFAULT_ARTICLE_META.avatar
      const avatarHtml = avatar
        ? `<img src="${escapeHtml(avatar)}" alt="${escapeHtml(authorLabel)}" style="width:18px;height:18px;border-radius:3px;object-fit:cover;border:1px solid ${hexToRgba(colors.headingDecor, 0.5)};flex-shrink:0;" />`
        : ''
      const badges = resolveTagList(meta.tags)
        .map(
          (t) =>
            `<span style="background:${hexToRgba(colors.headingDecor, 0.14)};color:${colors.heading};padding:2px 7px;border-radius:3px;font-size:9px;font-weight:600;font-family:Menlo,Monaco,Consolas,monospace;border:1px solid ${hexToRgba(colors.headingDecor, 0.32)};">--${escapeHtml(t)}</span>`
        )
        .join('')

      const titleCore = `
        <section style="text-align:left;">
          <p style="font-size:10px;font-weight:700;letter-spacing:1.8px;color:${colors.headingDecor};margin:0 0 8px;text-transform:uppercase;font-family:Menlo,Monaco,Consolas,monospace;">&gt;_ ${escapeHtml(category)}</p>
          <p style="font-size:${fontSize + 5}px;font-weight:800;color:${colors.heading};margin:0;line-height:1.38;font-family:-apple-system,BlinkMacSystemFont,'PingFang SC',sans-serif;">
            ${escapeHtml(title)}
          </p>
        </section>
      `
      const bannerFrame = ctx.motion.renderBannerFrame(titleCore, colors, ctx.animated)

      return `
        <section style="margin:0 0 24px 0;background:${colors.bg};border:1px solid ${hexToRgba(colors.headingDecor, 0.35)};border-radius:8px;overflow:hidden;max-width:100%;box-sizing:border-box;">
          <section style="background:${colors.tableAccent};padding:8px 14px;border-bottom:1px solid ${colors.divider};display:flex;align-items:center;justify-content:space-between;">
            <section style="display:flex;align-items:center;gap:6px;">
              <span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:${hexToRgba(colors.headingDecor, 0.35)};"></span>
              <span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:${hexToRgba(colors.headingDecor, 0.6)};"></span>
              <span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:${colors.headingDecor};"></span>
            </section>
            <span style="font-size:10px;color:${theme.textMuted};font-family:Menlo,Monaco,Consolas,monospace;">zsh — 80x24</span>
          </section>
          <section style="padding:14px 14px 10px;">
            ${bannerFrame}
          </section>
          <section style="background:${colors.tableAccent};border-top:1px solid ${colors.divider};padding:9px 16px;display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;">
            <section style="display:flex;align-items:center;gap:7px;">
              ${avatarHtml}
              <p style="font-size:11.5px;color:${colors.heading};margin:0;font-family:Menlo,Monaco,Consolas,monospace;">$ ${escapeHtml(authorLabel)} · ${escapeHtml(dateStr)}</p>
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
              ? `<span style="color:${colors.headingDecor};font-weight:700;margin-right:8px;">[${num}]</span>`
              : `<span style="color:${colors.headingDecor};font-weight:700;margin-right:8px;">├──</span>`
          return `
            <p style="margin:0 0 6px 0;font-size:12.5px;line-height:1.6;color:${theme.text};font-family:Menlo,Monaco,Consolas,monospace;">
              ${prefix}<span>${escapeHtml(text)}</span>
            </p>
          `
        })
        .join('')

      const tocDecor = `<section style="width:70px;flex-shrink:0;">${ctx.motion.renderTocDecor(colors, ctx.animated)}</section>`

      return `
        <section style="margin:0 0 24px 0;padding:14px 16px;background:${colors.tableAccent};border:1px solid ${colors.divider};border-radius:8px;">
          <section style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:8px;padding-bottom:6px;border-bottom:1px solid ${colors.divider};">
            <p style="margin:0;font-size:10px;font-weight:800;letter-spacing:1.4px;color:${colors.headingDecor};font-family:Menlo,Monaco,Consolas,monospace;">TREE ./INDEX</p>
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
          ? `<span style="background:${colors.headingDecor};color:${colors.bg};font-family:Menlo,Monaco,Consolas,monospace;font-size:12px;font-weight:800;padding:3px 8px;border-radius:4px;flex-shrink:0;">${num}</span>`
          : `<span style="font-family:Menlo,Monaco,Consolas,monospace;font-size:14px;font-weight:900;color:${colors.headingDecor};flex-shrink:0;">&gt;_</span>`

      return `
        <section style="margin:${marginTop} 0 14px 0;max-width:100%;overflow:hidden;">
          <section style="display:flex;align-items:center;gap:10px;">
            ${prefix}
            <h2 style="margin:0;font-size:${fontSize + 2}px;font-weight:800;color:${colors.heading};line-height:1.38;flex:0 1 auto;min-width:0;word-break:break-word;overflow-wrap:anywhere;">${content}</h2>
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
        <section style="margin:14px 0;padding:12px 16px;background:${colors.tableAccent};border:1px solid ${colors.divider};border-left:3px solid ${colors.blockquoteAccent};border-radius:6px;color:${theme.text};font-size:${Math.max(13, fontSize - 1)}px;line-height:1.65;">
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
          <section style="background:${colors.tableAccent};border-radius:8px;padding:6px;border:1px solid ${colors.divider};">
            <img src="${escapeHtml(href)}" alt="${escapeHtml(text)}" style="max-width:100%;height:auto;border-radius:4px;display:block;margin:0 auto;" />
          </section>
          ${text ? `<figcaption style="margin-top:8px;font-size:12px;color:${theme.textMuted};font-family:Menlo,Monaco,Consolas,monospace;">// ${escapeHtml(text)}</figcaption>` : ''}
        </figure>
      `
    }
  }
}
