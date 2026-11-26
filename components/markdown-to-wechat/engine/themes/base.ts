import { escapeHtml, hexToRgba } from '../tokens'
import { RenderContext } from '../types'

export const baseSlots = {
  renderH2(content: string, index: number, ctx: RenderContext): string {
    const { colors, fontSize } = ctx
    const marginTop = index === 1 ? '18px' : '32px'
    return `
      <h2 style="margin:${marginTop} 0 14px 0;padding:0 0 8px 10px;border-left:4px solid ${colors.headingDecor};border-bottom:1px solid ${colors.divider};font-size:${fontSize + 3}px;line-height:1.4;font-weight:800;color:${colors.heading};">
        ${content}
      </h2>
    `
  },

  renderH3(content: string, ctx: RenderContext): string {
    const { colors, fontSize } = ctx
    return `<h3 style="margin:22px 0 10px 0;font-size:${fontSize + 1}px;line-height:1.45;font-weight:800;color:${colors.heading};">${content}</h3>`
  },

  renderStrong(content: string, ctx: RenderContext): string {
    return `<strong style="font-weight:700;color:${ctx.colors.strong};">${content}</strong>`
  },

  renderBlockquote(content: string, ctx: RenderContext): string {
    const { theme, colors, fontSize } = ctx
    const bg = hexToRgba(colors.blockquoteAccent, 0.06)
    return `
      <blockquote style="margin:18px 0;padding:14px 16px;border-left:4px solid ${colors.blockquoteAccent};background:${bg};border-radius:0 8px 8px 0;color:${theme.text};font-size:${Math.max(13, fontSize - 1)}px;line-height:1.75;">
        ${content}
      </blockquote>
    `
  },

  renderDivider(ctx: RenderContext): string {
    return `<hr style="margin:24px 0;border:none;border-top:1px dashed ${ctx.colors.divider};" />`
  },

  renderImage(href: string, text: string, ctx: RenderContext): string {
    const { theme } = ctx
    return `
      <figure style="margin:18px 0;text-align:center;">
        <section style="background:#FFF;border-radius:12px;padding:6px;border:1px solid #E5E7EB;box-shadow:0 4px 12px -2px rgba(0,0,0,0.08);">
          <img src="${escapeHtml(href)}" alt="${escapeHtml(text)}" style="max-width:100%;height:auto;border-radius:6px;display:block;margin:0 auto;" />
        </section>
        ${text ? `<figcaption style="margin-top:8px;font-size:12px;color:${theme.textMuted};">— ${escapeHtml(text)}</figcaption>` : ''}
      </figure>
    `
  },

  renderEnding(ctx: RenderContext): string {
    const { meta, colors, theme, author, dateStr } = ctx
    const ending = meta.ending.trim()
    if (!ending) return ''
    const authorName = author.trim() || theme.name
    const avatarHtml = meta.avatar
      ? `<img src="${escapeHtml(meta.avatar)}" alt="${escapeHtml(authorName)}" style="width:42px;height:42px;border-radius:50%;object-fit:cover;border:1px solid ${hexToRgba(colors.headingDecor, 0.35)};flex-shrink:0;" />`
      : `<section style="width:42px;height:42px;border-radius:50%;background:${colors.headingDecor};color:#ffffff;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:800;flex-shrink:0;">${escapeHtml(authorName.slice(0, 1))}</section>`

    return `
      <section style="margin:28px 0 8px 0;padding:14px 16px;background:${colors.tableAccent};border:1px solid ${hexToRgba(colors.headingDecor, 0.22)};border-radius:12px;">
        <section style="display:flex;align-items:center;gap:12px;margin-bottom:8px;">
          ${avatarHtml}
          <section style="min-width:0;flex:1;">
            <p style="margin:0;font-size:13.5px;font-weight:800;color:${colors.heading};line-height:1.3;">${escapeHtml(authorName)}</p>
            <p style="margin:2px 0 0;font-size:11px;color:${theme.textMuted};line-height:1.2;">${escapeHtml(dateStr)}${meta.category.trim() ? ` · ${escapeHtml(meta.category.trim())}` : ''}</p>
          </section>
        </section>
        <p style="margin:0;font-size:13px;line-height:1.75;color:${theme.text};">${escapeHtml(ending)}</p>
      </section>
    `
  }
}
