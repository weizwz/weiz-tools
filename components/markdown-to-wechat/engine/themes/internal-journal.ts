import { DEFAULT_ARTICLE_META, escapeHtml, hexToRgba, resolveTagList } from '../tokens'
import { LayoutTheme, RenderContext } from '../types'

export const internalJournalTheme: LayoutTheme = {
  id: 'internal-journal',
  name: '内刊手记',
  defaultPalette: {
    id: 'default',
    name: '默认',
    colors: {
      bg: '#fdfdf8',
      heading: '#23251d',
      strong: '#b45309',
      headingDecor: '#d97706',
      divider: '#bfc1b7',
      listMarker: '#d97706',
      codeBlockBg: '#23251d',
      tableAccent: '#eeefe9',
      inlineCodeText: '#3f4234',
      inlineCodeBg: '#eeefe9',
      blockquoteAccent: '#d97706'
    }
  },
  text: '#4d4f46',
  textMuted: '#9ea096',
  borderColor: '#bfc1b7',
  codeBorder: '#b6b7af',
  preHeaderBg: '#181a14',
  slots: {
    renderBanner(title: string, ctx: RenderContext): string {
      const { colors, author, theme, dateStr, meta } = ctx
      const authorLabel = author.trim() || DEFAULT_ARTICLE_META.author
      const parts = title
        .split(/[：:]/)
        .map((s) => s.trim())
        .filter(Boolean)
      const mainTitle = parts[0] || title
      const emphasis = parts[1] || ''
      const categoryLabel = meta.category.trim() || DEFAULT_ARTICLE_META.category
      const avatar = meta.avatar.trim() || DEFAULT_ARTICLE_META.avatar
      const avatarHtml = avatar
        ? `<img src="${escapeHtml(avatar)}" alt="${escapeHtml(authorLabel)}" style="width:20px;height:20px;border-radius:50%;object-fit:cover;border:1px solid rgba(255,255,255,0.4);flex-shrink:0;" />`
        : ''
      const badges = resolveTagList(meta.tags)
        .map(
          (t) =>
            `<span style="background:#e5e7e0;color:#23251d;padding:2px 7px;border-radius:4px;font-size:8px;font-weight:700;border:1px solid ${theme.borderColor};">${escapeHtml(t)}</span>`
        )
        .join('')

      const bannerMotion = `<section style="margin-top:10px;">${ctx.motion.renderBannerMotion(colors, ctx.animated)}</section>`

      return `
        <section style="margin:0 0 24px 0;background:${colors.bg};border:1px solid ${theme.borderColor};border-radius:6px;overflow:hidden;">
          <section style="padding:22px 20px 12px;">
            <section style="display:flex;align-items:center;gap:8px;margin-bottom:16px;">
              <span style="width:8px;height:8px;background:${colors.headingDecor};border-radius:50%;display:inline-block;"><span leaf="">&nbsp;</span></span>
              <span style="font-size:10px;font-weight:700;letter-spacing:2.5px;color:#65675e;">${escapeHtml(categoryLabel)}</span>
              <span style="flex:1;height:1px;background:${theme.borderColor};display:inline-block;"><span leaf="">&nbsp;</span></span>
              <span style="font-size:10px;color:${theme.textMuted};font-weight:500;">${escapeHtml(dateStr)}</span>
            </section>
            <p style="font-size:20px;font-weight:800;color:${colors.heading};margin:0 0 10px;line-height:1.25;letter-spacing:-0.4px;">
              ${escapeHtml(mainTitle)}${emphasis ? ` · <span style="border-bottom:3px solid ${colors.headingDecor};">${escapeHtml(emphasis)}</span>` : ''}
            </p>
            <section style="display:flex;align-items:center;gap:4px;">
              <span style="width:22px;height:3px;background:${colors.headingDecor};border-radius:2px;display:inline-block;"></span>
              <span style="width:8px;height:3px;background:${colors.strong};border-radius:2px;display:inline-block;"></span>
            </section>
            ${bannerMotion}
          </section>
          <section style="background:${colors.heading};padding:10px 20px;display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;">
            <section style="display:flex;align-items:center;gap:7px;">
              ${avatarHtml}
              <p style="font-size:12px;color:rgba(255,255,255,0.92);margin:0;font-weight:600;">${escapeHtml(authorLabel)}</p>
            </section>
            <section style="display:flex;gap:6px;flex-wrap:wrap;">
              ${badges}
            </section>
          </section>
        </section>
      `
    },

    renderToc(headings: string[], ctx: RenderContext): string {
      const { colors, theme } = ctx
      const items = headings
        .slice(0, 6)
        .map((text, idx) => {
          const num = String(idx + 1).padStart(2, '0')
          return `
            <p style="margin:0 0 6px 0;font-size:13px;line-height:1.6;color:${theme.text};">
              <span style="display:inline-block;width:24px;font-weight:700;color:${colors.headingDecor};font-family:monospace;">${num}</span>
              <span>${escapeHtml(text)}</span>
            </p>
          `
        })
        .join('')

      const tocDecor = `<section style="width:62px;flex-shrink:0;">${ctx.motion.renderTocDecor(colors, ctx.animated)}</section>`

      return `
        <section style="margin:0 0 24px 0;background:${colors.bg};border:1px solid ${theme.borderColor};border-radius:6px;overflow:hidden;">
          <section style="padding:10px 16px;background:${colors.heading};display:flex;align-items:center;justify-content:space-between;gap:10px;">
            <p style="margin:0;font-size:10px;font-weight:800;letter-spacing:2px;color:#ffffff;">EDITOR'S NOTE · 篇幅导览</p>
            <span style="font-size:10px;color:rgba(255,255,255,0.7);">${headings.length} 节</span>
          </section>
          <section style="padding:14px 16px;background:${colors.tableAccent};display:flex;align-items:flex-start;justify-content:space-between;gap:10px;">
            <section style="flex:1;min-width:0;">${items}</section>
            ${tocDecor}
          </section>
        </section>
      `
    },

    renderH2(content: string, index: number, ctx: RenderContext): string {
      const { colors, fontSize } = ctx
      const num = String(index).padStart(2, '0')
      const marginTop = index === 1 ? '18px' : '34px'
      const rail = `<section style="margin-top:4px;">${ctx.motion.renderSectionRail(colors, ctx.animated, index)}</section>`
      return `
        <section style="margin:${marginTop} 0 18px 0;">
          <section style="display:flex;align-items:center;gap:14px;">
            <section style="text-align:center;flex-shrink:0;">
              <p style="margin:0;font-size:24px;font-weight:800;color:${colors.heading};line-height:1;letter-spacing:-1.5px;">${num}</p>
              <p style="margin:2px 0 0;font-size:8px;font-weight:700;color:${colors.headingDecor};letter-spacing:2px;">PART</p>
            </section>
            <span style="width:1px;height:32px;background:${colors.divider};flex-shrink:0;display:inline-block;"></span>
            <h2 style="margin:0;font-size:${fontSize + 2}px;font-weight:800;color:${colors.heading};line-height:1.35;letter-spacing:0.2px;">${content}</h2>
          </section>
          ${rail}
        </section>
      `
    },

    renderBlockquote(content: string, ctx: RenderContext): string {
      const { theme, colors, fontSize } = ctx
      const bg = hexToRgba(colors.blockquoteAccent, 0.06)
      return `
        <section style="margin:18px 0;padding:14px 16px;background:${bg};border:1px solid ${hexToRgba(colors.blockquoteAccent, 0.25)};border-left:3px solid ${colors.blockquoteAccent};border-radius:6px;color:${theme.text};font-size:${Math.max(13, fontSize - 1)}px;line-height:1.8;">
          ${content}
        </section>
      `
    },

    renderImage(href: string, text: string, ctx: RenderContext): string {
      const { theme, colors } = ctx
      return `
        <figure style="margin:18px 0;text-align:center;">
          <section style="background:${colors.bg};border-radius:6px;padding:6px;border:1px solid ${theme.borderColor};">
            <img src="${escapeHtml(href)}" alt="${escapeHtml(text)}" style="max-width:100%;height:auto;border-radius:6px;display:block;margin:0 auto;" />
          </section>
          ${text ? `<figcaption style="margin-top:8px;font-size:12px;color:${theme.textMuted};">— ${escapeHtml(text)}</figcaption>` : ''}
        </figure>
      `
    }
  }
}
