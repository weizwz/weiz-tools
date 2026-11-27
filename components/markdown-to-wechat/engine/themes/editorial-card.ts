import { editorialVermilionMotion } from '../motions'
import { DEFAULT_ARTICLE_META, escapeHtml, hexToRgba } from '../tokens'
import { LayoutTheme, RenderContext } from '../types'

export const editorialCardTheme: LayoutTheme = {
  id: 'editorial-card',
  name: '社论卡片',
  subtitle: '社论卡片风·墨红社论动效',
  motionId: 'editorial-vermilion',
  defaultPalette: {
    id: 'default',
    name: '默认',
    subtitle: '社论卡片 · 朱砂原配色',
    colors: {
      bg: '#ffffff',
      heading: '#1C1917',
      strong: '#B91C1C',
      headingDecor: '#C81E1E',
      divider: '#FCA5A5',
      listMarker: '#C81E1E',
      codeBlockBg: '#1E293B',
      tableAccent: '#FEF2F2',
      inlineCodeText: '#991B1B',
      inlineCodeBg: '#FEF2F2',
      blockquoteAccent: '#C81E1E'
    }
  },
  text: '#374151',
  textMuted: '#9CA3AF',
  borderColor: '#FEE2E2',
  preHeaderBg: '#0F172A',
  slots: {
    renderBanner(title: string, ctx: RenderContext): string {
      const { colors, capabilities, author, theme, dateStr, meta } = ctx
      const authorLabel = author.trim() || DEFAULT_ARTICLE_META.author
      const shadowColor = hexToRgba(colors.headingDecor, 0.16)
      const avatar = meta.avatar.trim() || DEFAULT_ARTICLE_META.avatar
      const avatarHtml = avatar
        ? `<img src="${escapeHtml(avatar)}" alt="${escapeHtml(authorLabel)}" style="width:20px;height:20px;border-radius:50%;object-fit:cover;border:1px solid ${hexToRgba(colors.headingDecor, 0.3)};flex-shrink:0;" />`
        : ''
      const category = meta.category.trim() || DEFAULT_ARTICLE_META.category
      const parsedTags = meta.tags.split(/[,，]/).map((t) => t.trim()).filter(Boolean)
      const defaultTags = DEFAULT_ARTICLE_META.tags.split(/[,，]/).map((t) => t.trim()).filter(Boolean)
      const tagList = [category, ...(parsedTags.length > 0 ? parsedTags : defaultTags)].slice(0, 3)
      const tagsHtml = tagList.length
        ? `<section style="display:flex;gap:5px;flex-wrap:wrap;">${tagList
            .map(
              (t) =>
                `<span style="background:${colors.tableAccent};color:${colors.headingDecor};padding:2px 7px;border-radius:4px;font-size:10px;font-weight:700;border:1px solid ${colors.divider};">${escapeHtml(t)}</span>`
            )
            .join('')}</section>`
        : '<span></span>'

      const bannerMotion = capabilities.useMotion
        ? `<section style="margin-top:8px;">${editorialVermilionMotion.renderBannerMotion(colors, true)}</section>`
        : ''

      return `
        <section style="margin:6px 4px 26px;background:${colors.bg};border-radius:12px;box-shadow:0 4px 24px -4px ${shadowColor};border:1px solid ${colors.tableAccent};padding:24px 22px 16px;overflow:hidden;">
          <p style="font-size:36px;color:${colors.headingDecor};font-weight:900;margin:0;line-height:0.6;">“</p>
          <p style="font-size:17px;font-weight:800;color:${colors.heading};margin:12px 0 6px;line-height:1.65;">
            ${escapeHtml(title)}
          </p>
          ${bannerMotion}
          <section style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;margin-top:10px;">
            ${tagsHtml}
            <section style="display:flex;align-items:center;gap:6px;">
              ${avatarHtml}
              <span style="font-size:12px;color:${theme.textMuted};letter-spacing:0.6px;">—— ${escapeHtml(authorLabel)} · ${escapeHtml(dateStr)}</span>
            </section>
          </section>
        </section>
      `
    },

    renderToc(headings: string[], ctx: RenderContext): string {
      const { colors, theme, capabilities } = ctx
      const rows = headings
        .slice(0, 6)
        .map((text, idx) => {
          const num = String(idx + 1).padStart(2, '0')
          return `
            <p style="margin:0 0 8px 0;font-size:13px;line-height:1.6;color:${theme.text};">
              <span style="display:inline-block;background:${colors.headingDecor};color:#fff;font-size:10px;font-weight:800;padding:1px 6px;border-radius:4px;margin-right:8px;">${num}</span>
              <span>${escapeHtml(text)}</span>
            </p>
          `
        })
        .join('')

      const tocDecor = `<section style="width:62px;flex-shrink:0;">${editorialVermilionMotion.renderTocDecor(colors, capabilities.useMotion)}</section>`

      return `
        <section style="margin:0 0 24px 0;padding:16px 18px;border:1px solid ${colors.divider};border-radius:10px;background:${colors.tableAccent};">
          <section style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px;">
            <p style="margin:0;font-size:11px;font-weight:800;letter-spacing:1.5px;color:${colors.headingDecor};text-transform:uppercase;">CONTENTS · 篇幅导览</p>
            ${tocDecor}
          </section>
          ${rows}
        </section>
      `
    },

    renderH2(content: string, index: number, ctx: RenderContext): string {
      const { colors, capabilities, fontSize } = ctx
      const num = String(index).padStart(2, '0')
      const marginTop = index === 1 ? '18px' : '34px'
      const rail = capabilities.useFancyDivider
        ? `<section style="margin-top:6px;">${editorialVermilionMotion.renderSectionRail(colors, capabilities.useMotion, index)}</section>`
        : ''
      return `
        <section style="margin:${marginTop} 0 18px 0;padding-bottom:10px;border-bottom:2px solid ${colors.headingDecor};">
          <section style="display:flex;align-items:center;">
            <span style="display:inline-block;background:${colors.headingDecor};color:#FFFFFF;font-size:16px;font-weight:900;padding:3px 12px;border-radius:6px;margin-right:12px;line-height:1.3;">${num}</span>
            <h2 style="margin:0;font-size:${fontSize + 2}px;font-weight:800;color:${colors.heading};line-height:1.35;letter-spacing:0.4px;">${content}</h2>
          </section>
          ${rail}
        </section>
      `
    },

    renderStrong(content: string, ctx: RenderContext): string {
      const { colors } = ctx
      return `<strong style="font-weight:700;color:${colors.strong};border-bottom:2px solid ${hexToRgba(colors.strong, 0.35)};">${content}</strong>`
    },

    renderBlockquote(content: string, ctx: RenderContext): string {
      const { theme, colors, fontSize } = ctx
      const bg = hexToRgba(colors.blockquoteAccent, 0.06)
      return `
        <blockquote style="margin:18px 0;padding:14px 18px;border-left:4px solid ${colors.blockquoteAccent};background:${bg};border-radius:0 10px 10px 0;color:${theme.text};font-size:${fontSize}px;line-height:1.8;">
          ${content}
        </blockquote>
      `
    },

    renderDivider(ctx: RenderContext): string {
      const { colors, capabilities } = ctx
      if (!capabilities.useFancyDivider) {
        return `<hr style="margin:24px 0;border:none;border-top:1px dashed ${colors.divider};" />`
      }
      return `<section style="margin:24px 0;">${editorialVermilionMotion.renderDivider(colors, capabilities.useMotion)}</section>`
    },

    renderTail(ctx: RenderContext): string {
      const { colors, capabilities } = ctx
      return `<section style="margin:28px 0 6px;">${editorialVermilionMotion.renderTail(colors, capabilities.useMotion)}</section>`
    }
  }
}
