import { escapeHtml, hexToRgba } from '../tokens'
import { PaletteColors } from '../types'

export function isPlaceholderImageSrc(href: string): boolean {
  const src = href.trim()
  if (!src) return true
  if (/^(#|about:blank|javascript:|placeholder|empty|todo|tbd|pending|待补充|占位)/i.test(src)) {
    return true
  }
  if (/^(data:image\/|blob:)/i.test(src)) {
    return false
  }
  if (/^https?:\/\//i.test(src)) {
    try {
      const url = new URL(src)
      return (
        /(^|\.)example\.(com|org|net)$/i.test(url.hostname) ||
        url.hostname === 'via.placeholder.com'
      )
    } catch {
      return true
    }
  }
  if (src.startsWith('/') && !src.startsWith('//')) {
    return false
  }
  return true
}

export function resolveMotionColors(colors: PaletteColors) {
  const primary = colors.headingDecor
  return {
    primary,
    primarySoft: hexToRgba(primary, 0.28),
    primaryMid: hexToRgba(primary, 0.58),
    accent: colors.strong,
    muted: hexToRgba(primary, 0.45),
    ink: primary,
    bg: colors.bg
  }
}

export function flowTrailSvg(
  d: string,
  color: string,
  strokeWidth: number,
  dashArray: string,
  dashOffsetTo: number,
  dur: string,
  animated: boolean,
  begin = '0s'
): string {
  const base = `<path d="${d}" fill="none" stroke="${color}" stroke-width="${Math.max(0.85, strokeWidth - 0.8)}" stroke-linecap="round" stroke-linejoin="round" opacity="0.48"/>`
  if (!animated) return base
  return `${base}<path d="${d}" fill="none" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" opacity="0.94" stroke-dasharray="${dashArray}"><animate attributeName="stroke-dashoffset" from="0" to="${dashOffsetTo}" dur="${dur}" begin="${begin}" repeatCount="indefinite"/></path>`
}

export function rotateAnim(
  from: string,
  to: string,
  dur: string,
  animated: boolean,
  begin = '0s'
): string {
  if (!animated) return ''
  return `<animateTransform attributeName="transform" type="rotate" from="${from}" to="${to}" dur="${dur}" begin="${begin}" repeatCount="indefinite" additive="sum"/>`
}

export function swayAnim(
  values: string,
  dur: string,
  animated: boolean,
  begin = '0s'
): string {
  if (!animated) return ''
  return `<animateTransform attributeName="transform" type="rotate" values="${values}" dur="${dur}" begin="${begin}" repeatCount="indefinite" additive="sum"/>`
}

export function pulseAnim(
  attr: string,
  values: string,
  dur: string,
  animated: boolean,
  begin = '0s'
): string {
  if (!animated) return ''
  return `<animate attributeName="${attr}" values="${values}" dur="${dur}" begin="${begin}" repeatCount="indefinite"/>`
}

export function translateAnim(
  values: string,
  dur: string,
  animated: boolean,
  begin = '0s'
): string {
  if (!animated) return ''
  return `<animateTransform attributeName="transform" type="translate" values="${values}" dur="${dur}" begin="${begin}" repeatCount="indefinite" additive="sum"/>`
}

export function scaleAnim(
  values: string,
  dur: string,
  animated: boolean,
  begin = '0s'
): string {
  if (!animated) return ''
  return `<animateTransform attributeName="transform" type="scale" values="${values}" dur="${dur}" begin="${begin}" repeatCount="indefinite" additive="sum"/>`
}

export function bannerFrameHtml(
  innerHtml: string,
  colors: PaletteColors,
  topRightBadgeSvg: string,
  bottomMotionSvg: string,
  animated: boolean
): string {
  const { primary, primaryMid, accent } = resolveMotionColors(colors)
  const topBarSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 36" width="100%" style="display:block;width:100%;height:auto;">
      <path d="M22 18H40M31 9V27" stroke="${primaryMid}" stroke-width="1.2"/>
      <circle cx="31" cy="18" r="2.8" fill="${accent}"/>
      <rect x="38" y="10" width="6" height="2.5" fill="${primary}"/>
      <line x1="62" y1="18" x2="318" y2="18" stroke="${primaryMid}" stroke-width="1.35"/>
      <rect x="332" y="10" width="34" height="14" fill="${accent}" opacity="0.88"/>
      <rect x="376" y="10" width="34" height="14" fill="${primary}" opacity="0.85"/>
      <line x1="424" y1="18" x2="720" y2="18" stroke="${primaryMid}" stroke-width="1.35"/>
    </svg>
  `
  const sideRailLeft = `
    <section style="width:18px;flex-shrink:0;display:flex;flex-direction:column;justify-content:space-between;align-items:flex-start;padding:4px 0;">
      <section style="display:flex;align-items:flex-start;gap:6px;">
        <span style="display:inline-block;width:1.5px;height:68px;background:${primaryMid};"></span>
        <span style="display:inline-block;width:3px;height:62px;background:${primary};margin-top:6px;"></span>
      </section>
      <section style="width:14px;height:24px;border-left:1.5px solid ${primaryMid};border-bottom:1.5px solid ${primaryMid};"></section>
    </section>
  `
  const dotGrid = [0, 1, 2, 3, 4, 5]
    .map(
      (i) =>
        `<circle cx="${10 + (i % 3) * 14}" cy="${10 + Math.floor(i / 3) * 14}" r="2.6" fill="${primary}" opacity="${i % 2 === 0 ? '0.4' : '0.2'}"/>`
    )
    .join('')
  const sideRailRight = `
    <section style="width:52px;flex-shrink:0;display:flex;flex-direction:column;justify-content:space-between;align-items:flex-end;padding:2px 0;">
      <section style="display:flex;align-items:flex-start;gap:4px;">
        <section style="width:44px;">${topRightBadgeSvg}</section>
        <span style="display:inline-block;width:1.5px;height:44px;background:${primaryMid};margin-top:4px;"></span>
      </section>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 34" width="44" style="display:block;height:auto;margin-right:4px;">${dotGrid}</svg>
      <section style="width:16px;height:24px;border-right:1.5px solid ${primaryMid};border-bottom:1.5px solid ${primaryMid};"></section>
    </section>
  `
  void animated

  return `
    <section style="padding:6px 4px 2px;">
      ${topBarSvg}
      <section style="display:flex;align-items:stretch;gap:4px;margin-top:-4px;">
        ${sideRailLeft}
        <section style="flex:1;min-width:0;display:flex;flex-direction:column;justify-content:center;padding:14px 4px 12px;">
          ${innerHtml}
        </section>
        ${sideRailRight}
      </section>
      <section style="margin-top:-8px;">${bottomMotionSvg}</section>
    </section>
  `
}

export function sectionBadgeHtml(
  badgeSvg: string,
  colors: PaletteColors,
  animated: boolean,
  lineSvg?: string
): string {
  const { primary, accent } = resolveMotionColors(colors)
  const pulse = animated
    ? `<animate attributeName="opacity" values="0.92;0.48;0.92" dur="2.6s" repeatCount="indefinite"/>`
    : ''
  const defaultLine = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 12" width="100%" style="display:block;flex:1;min-width:0;width:100%;height:12px;">
      <rect x="0" y="4" width="18" height="4" fill="${accent}">${pulse}</rect>
      <line x1="24" y1="6" x2="178" y2="6" stroke="${primary}" stroke-width="1.2" opacity="0.65"/>
    </svg>
  `
  return `
    <section style="display:flex;align-items:center;gap:8px;flex:1;min-width:0;">
      ${lineSvg ?? defaultLine}
      <section style="width:52px;flex-shrink:0;">${badgeSvg}</section>
    </section>
  `
}

export function imagePlaceholderHtml(
  centerSvg: string,
  presetName: string,
  caption: string,
  ratio: string,
  colors: PaletteColors
): string {
  const { primary, accent, muted, ink } = resolveMotionColors(colors)
  const borderCol = hexToRgba(muted, 0.75)
  const bgTint = hexToRgba(primary, 0.03)
  const labelText = caption.trim() || `${presetName} · 图片待补充`
  return `
    <figure style="margin:18px 0;">
      <section style="background:${bgTint};border:1px solid ${borderCol};border-radius:6px;padding:28px 18px 24px;text-align:center;">
        <section style="width:156px;margin:0 auto 14px;">${centerSvg}</section>
        <p style="margin:0 0 6px;font-size:10px;font-weight:800;letter-spacing:2.4px;color:${accent};text-transform:uppercase;">VISUAL SLOT / ${escapeHtml(ratio)}</p>
        <p style="margin:0;font-size:14px;font-weight:700;color:${ink};line-height:1.5;">${escapeHtml(labelText)}</p>
      </section>
    </figure>
  `
}

export function tailFrameHtml(
  leftSvg: string,
  rightSvg: string,
  spineSvg: string,
  label: string,
  colors: PaletteColors
): string {
  const { ink } = resolveMotionColors(colors)
  const textColor = hexToRgba(ink, 0.68)
  return `
    <section style="padding:8px 0 4px;">
      <section style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
        <section style="width:32%;min-width:96px;flex-shrink:0;">${leftSvg}</section>
        <p style="margin:0;font-size:12px;font-weight:700;letter-spacing:2px;color:${textColor};text-align:center;white-space:nowrap;">${escapeHtml(label)}</p>
        <section style="width:32%;min-width:96px;flex-shrink:0;">${rightSvg}</section>
      </section>
      <section style="margin-top:-4px;">${spineSvg}</section>
    </section>
  `
}
