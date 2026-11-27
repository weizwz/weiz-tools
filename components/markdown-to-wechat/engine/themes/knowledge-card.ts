import { DEFAULT_ARTICLE_META, escapeHtml, hexToRgba, resolveTagList } from '../tokens'
import { LayoutTheme, RenderContext } from '../types'

export const knowledgeCardTheme: LayoutTheme = {
  id: 'knowledge-card',
  name: '知微卡片',
  defaultPalette: {
    id: 'default',
    name: '默认',
    colors: {
      bg: '#ffffff',
      heading: '#0F172A',
      strong: '#2563EB',
      headingDecor: '#2563EB',
      divider: '#BFDBFE',
      listMarker: '#2563EB',
      tableAccent: '#EFF6FF',
      inlineCodeText: '#1D4ED8',
      inlineCodeBg: '#EFF6FF',
      blockquoteAccent: '#2563EB'
    }
  },
  text: '#334155',
  textMuted: '#94A3B8',
  borderColor: '#E2E8F0',
  slots: {
    renderBanner(title: string, ctx: RenderContext): string {
      const { colors, fontSize, author, dateStr, meta } = ctx
      const authorLabel = author.trim() || DEFAULT_ARTICLE_META.author
      const category = meta.category.trim() || 'FULL ARTICLE'
      const avatar = meta.avatar.trim() || DEFAULT_ARTICLE_META.avatar
      const avatarHtml = avatar
        ? `<img src="${escapeHtml(avatar)}" alt="${escapeHtml(authorLabel)}" style="width:20px;height:20px;border-radius:50%;object-fit:cover;border:1px solid rgba(255,255,255,0.6);flex-shrink:0;" />`
        : ''
      const badges = resolveTagList(meta.tags)
        .map(
          (t) =>
            `<span style="background:rgba(255,255,255,0.22);padding:2px 8px;border-radius:4px;font-size:10px;color:#fff;font-weight:600;">${escapeHtml(t)}</span>`
        )
        .join('')

      const titleCore = `
        <section style="text-align:center;">
          <p style="font-size:10px;font-weight:800;letter-spacing:2px;color:${colors.headingDecor};margin:0 0 8px;text-transform:uppercase;">${escapeHtml(category)}</p>
          <p style="font-size:${fontSize + 5}px;font-weight:800;color:${colors.heading};margin:0;line-height:1.38;letter-spacing:-0.3px;">
            ${escapeHtml(title)}
          </p>
        </section>
      `
      const bannerFrame = ctx.motion.renderBannerFrame(titleCore, colors, ctx.animated)

      return `
        <section style="margin:0 0 24px 0;background:${colors.bg};border-radius:14px;overflow:hidden;border:1px solid ${hexToRgba(colors.headingDecor, 0.22)};box-shadow:0 4px 16px -6px ${hexToRgba(colors.headingDecor, 0.16)};max-width:100%;box-sizing:border-box;">
          <section style="padding:14px 14px 10px;background:linear-gradient(135deg,${hexToRgba(colors.headingDecor, 0.06)} 0%,${colors.bg} 75%);">
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
      const { colors, headingNumbering } = ctx
      const cards = headings
        .slice(0, 6)
        .map((text, idx) => {
          const num = String(idx + 1).padStart(2, '0')
          const indicator =
            headingNumbering === 'numeric'
              ? `CARD ${num}`
              : `<span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:${idx === 0 ? '#fff' : colors.headingDecor};vertical-align:middle;margin-right:4px;"></span>SECTION`
          if (idx === 0) {
            return `
              <section style="display:inline-block;white-space:normal;vertical-align:top;width:116px;background:${colors.headingDecor};border-radius:10px;padding:12px;margin-right:8px;">
                <p style="font-size:9px;font-weight:700;color:rgba(255,255,255,0.8);letter-spacing:1px;margin:0 0 5px;">${indicator}</p>
                <p style="font-size:12.5px;font-weight:700;color:#fff;margin:0;line-height:1.4;">${escapeHtml(text)}</p>
              </section>
            `
          }
          return `
            <section style="display:inline-block;white-space:normal;vertical-align:top;width:116px;background:${colors.bg};border:1px solid ${hexToRgba(colors.headingDecor, 0.2)};border-radius:10px;padding:12px;margin-right:8px;">
              <p style="font-size:9px;font-weight:700;color:${ctx.theme.textMuted};letter-spacing:1px;margin:0 0 5px;">${indicator}</p>
              <p style="font-size:12.5px;font-weight:700;color:${colors.heading};margin:0;line-height:1.4;">${escapeHtml(text)}</p>
            </section>
          `
        })
        .join('')

      const tocDecor = `<section style="width:72px;flex-shrink:0;">${ctx.motion.renderTocDecor(colors, ctx.animated)}</section>`

      return `
        <section style="margin:0 0 26px 0;max-width:100%;overflow:hidden;">
          <section style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
            <p style="font-size:10px;color:${ctx.theme.textMuted};margin:0;text-transform:uppercase;letter-spacing:1.4px;font-weight:700;">KNOWLEDGE MAP · ${headings.length} 张知识卡</p>
            ${tocDecor}
          </section>
          <section style="overflow-x:auto;white-space:nowrap;padding-bottom:4px;">
            ${cards}
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
          ? `<span style="display:inline-flex;align-items:center;justify-content:center;background:${colors.tableAccent};color:${colors.headingDecor};border:1px solid ${hexToRgba(colors.headingDecor, 0.28)};font-size:13px;font-weight:800;font-family:Menlo,Monaco,Consolas,monospace;padding:3px 8px;border-radius:6px;flex-shrink:0;">${num}</span>`
          : `<span style="width:5px;height:20px;border-radius:3px;background:${colors.headingDecor};flex-shrink:0;display:inline-block;"></span>`

      return `
        <section style="margin:${marginTop} 0 14px 0;max-width:100%;overflow:hidden;">
          <section style="display:flex;align-items:center;gap:10px;">
            ${prefix}
            <h2 style="margin:0;font-size:${fontSize + 2}px;font-weight:800;color:${colors.heading};line-height:1.38;min-width:0;word-break:break-word;">${content}</h2>
            ${badge}
          </section>
          ${rail}
        </section>
      `
    },

    renderH4(content: string, ctx: RenderContext): string {
      const { colors, fontSize } = ctx
      return `
        <section style="margin:16px 0 6px 0;display:flex;align-items:center;gap:6px;">
          <span style="display:inline-block;padding:1px 7px;border-radius:4px;background:${colors.tableAccent};color:${colors.headingDecor};font-size:${Math.max(11, fontSize - 2)}px;font-weight:700;flex-shrink:0;">要点</span>
          <h4 style="margin:0;font-size:${fontSize}px;font-weight:700;color:${colors.heading};line-height:1.45;flex:1;min-width:0;word-break:break-word;">${content}</h4>
        </section>
      `
    },

    renderBlockquote(content: string, ctx: RenderContext): string {
      const { theme, colors, fontSize, motion, animated } = ctx
      const bg = hexToRgba(colors.blockquoteAccent, 0.05)
      const decor = motion.renderBlockquoteDecor(colors, animated)
      return `
        <section style="margin:14px 0;padding:12px 16px;background:${bg};border:1px solid ${hexToRgba(colors.blockquoteAccent, 0.2)};border-left:4px solid ${colors.blockquoteAccent};border-radius:8px;color:${theme.text};font-size:${Math.max(13, fontSize - 1)}px;line-height:1.65;">
          <section style="display:flex;justify-content:flex-start;margin-bottom:6px;line-height:0;"><section style="width:28px;">${decor}</section></section>
          ${content}
        </section>
      `
    }
  }
}
