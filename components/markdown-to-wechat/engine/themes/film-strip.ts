import { isPlaceholderImageSrc } from '../motions/helpers'
import { DEFAULT_ARTICLE_META, escapeHtml, hexToRgba, resolveTagList } from '../tokens'
import { LayoutTheme, RenderContext } from '../types'

function renderSprocketRow(bgColor: string, holeColor: string): string {
  const holes = Array.from({ length: 14 })
    .map(
      () =>
        `<span style="width:10px;height:6px;border-radius:1.5px;background:${holeColor};display:inline-block;"></span>`
    )
    .join('')
  return `<section style="background:${bgColor};padding:5px 10px;display:flex;align-items:center;justify-content:space-between;gap:4px;">${holes}</section>`
}

export const filmStripTheme: LayoutTheme = {
  id: 'film-strip',
  name: '电影胶片',
  defaultPalette: {
    id: 'default',
    name: '默认',
    colors: {
      bg: '#F4F4F5',
      heading: '#18181B',
      strong: '#3F3F46',
      headingDecor: '#52525B',
      divider: '#D4D4D8',
      listMarker: '#52525B',
      tableAccent: '#E4E4E7',
      inlineCodeText: '#27272A',
      inlineCodeBg: '#E4E4E7',
      blockquoteAccent: '#52525B'
    }
  },
  text: '#27272A',
  textMuted: '#71717A',
  borderColor: '#D4D4D8',
  codeBorder: '#A1A1AA',
  slots: {
    renderBanner(title: string, ctx: RenderContext): string {
      const { colors, fontSize, author, dateStr, meta } = ctx
      const authorLabel = author.trim() || DEFAULT_ARTICLE_META.author
      const category = meta.category.trim() || '35MM FILM'
      const avatar = meta.avatar.trim() || DEFAULT_ARTICLE_META.avatar
      const avatarHtml = avatar
        ? `<img src="${escapeHtml(avatar)}" alt="${escapeHtml(authorLabel)}" style="width:20px;height:20px;border-radius:2px;object-fit:cover;border:1px solid rgba(255,255,255,0.4);flex-shrink:0;" />`
        : ''
      const badges = resolveTagList(meta.tags)
        .map(
          (t) =>
            `<span style="background:rgba(255,255,255,0.12);color:#F4F4F5;padding:2px 7px;border-radius:2px;font-size:9px;font-weight:600;font-family:Menlo,Monaco,Consolas,monospace;border:1px solid rgba(255,255,255,0.22);">${escapeHtml(t)}</span>`
        )
        .join('')

      const titleCore = `
        <section style="text-align:center;">
          <p style="font-size:10px;font-weight:700;letter-spacing:2.4px;color:${colors.headingDecor};margin:0 0 8px;text-transform:uppercase;font-family:Menlo,Monaco,Consolas,monospace;">SCENE · ${escapeHtml(category)}</p>
          <p style="font-size:${fontSize + 5}px;font-weight:800;color:${colors.heading};margin:0;line-height:1.42;">
            ${escapeHtml(title)}
          </p>
        </section>
      `
      const bannerFrame = ctx.motion.renderBannerFrame(titleCore, colors, ctx.animated)

      return `
        <section style="margin:0 0 24px 0;background:${colors.bg};border:2px solid ${colors.heading};border-radius:4px;overflow:hidden;max-width:100%;box-sizing:border-box;">
          ${renderSprocketRow(colors.heading, colors.bg)}
          <section style="padding:14px 14px 10px;">
            ${bannerFrame}
          </section>
          ${renderSprocketRow(colors.heading, colors.bg)}
          <section style="background:${colors.heading};padding:9px 16px;display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;">
            <section style="display:flex;align-items:center;gap:7px;">
              ${avatarHtml}
              <p style="font-size:11.5px;color:${colors.bg};margin:0;font-family:Menlo,Monaco,Consolas,monospace;">DIR. ${escapeHtml(authorLabel)} · ${escapeHtml(dateStr)}</p>
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
              ? `<span style="font-family:Menlo,Monaco,Consolas,monospace;font-size:10px;font-weight:800;color:${colors.headingDecor};margin-right:8px;">TAKE ${num}</span>`
              : `<span style="display:inline-block;width:6px;height:6px;background:${colors.headingDecor};margin-right:8px;vertical-align:middle;"></span>`
          return `
            <p style="margin:0 0 7px 0;font-size:13px;line-height:1.55;color:${theme.text};">
              ${prefix}<span>${escapeHtml(text)}</span>
            </p>
          `
        })
        .join('')

      const tocDecor = `<section style="width:70px;flex-shrink:0;">${ctx.motion.renderTocDecor(colors, ctx.animated)}</section>`

      return `
        <section style="margin:0 0 24px 0;background:#FFFFFF;border:1.5px solid ${colors.headingDecor};border-radius:4px;overflow:hidden;">
          <section style="padding:8px 16px;background:${colors.tableAccent};border-bottom:1px solid ${theme.borderColor};display:flex;align-items:center;justify-content:space-between;gap:10px;">
            <p style="margin:0;font-size:10px;font-weight:800;letter-spacing:1.8px;color:${colors.heading};font-family:Menlo,Monaco,Consolas,monospace;">CLAPPERBOARD · 场次目录</p>
            ${tocDecor}
          </section>
          <section style="padding:12px 16px;">${rows}</section>
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
          ? `<span style="background:${colors.headingDecor};color:#FFFFFF;font-family:Menlo,Monaco,Consolas,monospace;font-size:11px;font-weight:800;padding:3px 8px;border-radius:2px;flex-shrink:0;">F${num}</span>`
          : `<span style="width:5px;height:18px;background:${colors.headingDecor};flex-shrink:0;display:inline-block;"></span>`

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
        <section style="margin:14px 0;padding:12px 16px;background:${colors.tableAccent};border-left:4px solid ${colors.blockquoteAccent};border-radius:3px;color:${theme.text};font-size:${Math.max(13, fontSize - 1)}px;line-height:1.68;">
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
          <section style="background:${colors.heading};border-radius:4px;overflow:hidden;border:1px solid ${colors.heading};">
            ${renderSprocketRow(colors.heading, colors.bg)}
            <section style="padding:4px 8px;background:${colors.heading};">
              <img src="${escapeHtml(href)}" alt="${escapeHtml(text)}" style="max-width:100%;height:auto;border-radius:2px;display:block;margin:0 auto;" />
            </section>
            ${renderSprocketRow(colors.heading, colors.bg)}
          </section>
          ${text ? `<figcaption style="margin-top:8px;font-size:12px;color:${theme.textMuted};font-family:Menlo,Monaco,Consolas,monospace;">[ ${escapeHtml(text)} ]</figcaption>` : ''}
        </figure>
      `
    }
  }
}
