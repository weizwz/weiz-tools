import { isPlaceholderImageSrc } from '../motions/helpers'
import { DEFAULT_ARTICLE_META, escapeHtml, hexToRgba } from '../tokens'
import { RenderContext } from '../types'

export const baseSlots = {
  renderH2(content: string, index: number, ctx: RenderContext): string {
    const { colors, fontSize, motion, animated, headingNumbering } = ctx
    const marginTop = index === 1 ? '18px' : '28px'
    const num = String(index).padStart(2, '0')
    const badge = `<section style="width:46px;flex-shrink:0;">${motion.renderSectionBadge(colors, animated, index)}</section>`
    const rail = `<section style="margin-top:2px;">${motion.renderSectionRail(colors, animated, index)}</section>`
    const prefix =
      headingNumbering === 'numeric'
        ? `<span style="font-size:${fontSize + 4}px;font-weight:900;color:${colors.headingDecor};font-family:Menlo,Monaco,Consolas,monospace;line-height:1;flex-shrink:0;">${num}</span>`
        : `<span style="width:4px;height:18px;border-radius:2px;background:${colors.headingDecor};flex-shrink:0;display:inline-block;"></span>`
    return `
      <section style="margin:${marginTop} 0 14px 0;max-width:100%;overflow:hidden;box-sizing:border-box;">
        <section style="display:flex;align-items:center;gap:10px;">
          ${prefix}
          <h2 style="margin:0;font-size:${fontSize + 2}px;line-height:1.4;font-weight:800;color:${colors.heading};flex:1;min-width:0;word-break:break-word;">
            ${content}
          </h2>
          ${badge}
        </section>
        ${rail}
      </section>
    `
  },

  renderH3(content: string, h2Index: number, h3Index: number, ctx: RenderContext): string {
    const { colors, fontSize, motion, animated, headingNumbering } = ctx
    const prefix =
      headingNumbering === 'numeric' && h2Index > 0
        ? `<span style="flex-shrink:0;font-family:Menlo,Monaco,Consolas,monospace;font-size:${Math.max(12, fontSize - 1)}px;font-weight:700;color:${colors.headingDecor};">${h2Index}.${h3Index}</span>`
        : `<span style="flex-shrink:0;display:inline-flex;align-items:center;">${motion.renderH3Marker(colors, animated)}</span>`
    return `
      <section style="margin:22px 0 10px 0;display:flex;align-items:center;gap:8px;max-width:100%;">
        ${prefix}
        <h3 style="margin:0;font-size:${fontSize + 1}px;line-height:1.45;font-weight:700;color:${colors.heading};flex:1;min-width:0;word-break:break-word;">${content}</h3>
      </section>
    `
  },

  renderH4(content: string, ctx: RenderContext): string {
    const { colors, fontSize } = ctx
    return `
      <section style="margin:16px 0 6px 0;display:flex;align-items:center;gap:7px;max-width:100%;">
        <span style="width:2px;height:13px;border-radius:1px;background:${hexToRgba(colors.headingDecor, 0.55)};flex-shrink:0;display:inline-block;"></span>
        <h4 style="margin:0;font-size:${fontSize}px;line-height:1.45;font-weight:700;color:${colors.heading};flex:1;min-width:0;word-break:break-word;">${content}</h4>
      </section>
    `
  },

  renderStrong(content: string, ctx: RenderContext): string {
    return `<strong style="font-weight:700;color:${ctx.colors.strong};">${content}</strong>`
  },

  renderBlockquote(content: string, ctx: RenderContext): string {
    const { theme, colors, fontSize, motion, animated } = ctx
    const bg = hexToRgba(colors.blockquoteAccent, 0.06)
    const decor = motion.renderBlockquoteDecor(colors, animated)
    return `
      <blockquote style="margin:14px 0;padding:12px 16px;border-left:4px solid ${colors.blockquoteAccent};background:${bg};border-radius:0 8px 8px 0;color:${theme.text};font-size:${Math.max(13, fontSize - 1)}px;line-height:1.65;">
        <section style="display:flex;justify-content:flex-start;margin-bottom:6px;line-height:0;"><section style="width:28px;">${decor}</section></section>
        ${content}
      </blockquote>
    `
  },

  renderDivider(ctx: RenderContext): string {
    return `<section style="margin:24px 0;">${ctx.motion.renderDivider(ctx.colors, ctx.animated)}</section>`
  },

  renderTail(ctx: RenderContext): string {
    return `<section style="margin:28px 0 6px;">${ctx.motion.renderTail(ctx.colors, ctx.animated)}</section>`
  },

  renderImage(href: string, text: string, ctx: RenderContext): string {
    const { theme, motion, colors, animated } = ctx
    const placeholderHtml = motion.renderImagePlaceholder(text, '16:9', colors, animated)
    if (isPlaceholderImageSrc(href)) {
      return placeholderHtml
    }
    return `
      <figure data-placeholder="${escapeHtml(encodeURIComponent(placeholderHtml))}" style="margin:18px 0;text-align:center;">
        <section style="background:#FFF;border-radius:12px;padding:6px;border:1px solid #E5E7EB;box-shadow:0 4px 12px -2px rgba(0,0,0,0.08);">
          <img src="${escapeHtml(href)}" alt="${escapeHtml(text)}" style="max-width:100%;height:auto;border-radius:6px;display:block;margin:0 auto;" />
        </section>
        ${text ? `<figcaption style="margin-top:8px;font-size:12px;color:${theme.textMuted};">— ${escapeHtml(text)}</figcaption>` : ''}
      </figure>
    `
  },

  renderEnding(ctx: RenderContext): string {
    const { meta, colors, theme, author, dateStr, motion, animated } = ctx
    const ending = meta.ending.trim()
    if (!ending) return ''
    const authorName = author.trim() || DEFAULT_ARTICLE_META.author
    const category = meta.category.trim() || DEFAULT_ARTICLE_META.category
    const avatar = meta.avatar.trim() || DEFAULT_ARTICLE_META.avatar
    const avatarHtml = avatar
      ? `<img src="${escapeHtml(avatar)}" alt="${escapeHtml(authorName)}" style="width:42px;height:42px;border-radius:50%;object-fit:cover;border:1px solid ${hexToRgba(colors.headingDecor, 0.35)};flex-shrink:0;" />`
      : ''
    const endingDecor = motion.renderEndingDecor(colors, animated)

    return `
      <section style="margin:28px 0 8px 0;padding:14px 16px;background:${colors.tableAccent};border:1px solid ${hexToRgba(colors.headingDecor, 0.22)};border-radius:12px;">
        <section style="display:flex;align-items:center;gap:12px;margin-bottom:8px;">
          ${avatarHtml}
          <section style="min-width:0;flex:1;">
            <p style="margin:0;font-size:13.5px;font-weight:800;color:${colors.heading};line-height:1.3;">${escapeHtml(authorName)}</p>
            <p style="margin:2px 0 0;font-size:11px;color:${theme.textMuted};line-height:1.2;">${escapeHtml(dateStr)}${category ? ` · ${escapeHtml(category)}` : ''}</p>
          </section>
          <section style="flex-shrink:0;">${endingDecor}</section>
        </section>
        <p style="margin:0;font-size:13px;line-height:1.75;color:${theme.text};">${escapeHtml(ending)}</p>
      </section>
    `
  }
}
