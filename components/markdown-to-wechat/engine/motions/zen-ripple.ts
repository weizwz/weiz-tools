import { MotionPreset, PaletteColors } from '../types'
import {
  bannerFrameHtml,
  flowTrailSvg,
  imagePlaceholderHtml,
  pulseAnim,
  resolveMotionColors,
  sectionBadgeHtml,
  tailFrameHtml
} from './helpers'

function rippleRings(
  cx: number,
  cy: number,
  scale: number,
  primary: string,
  primaryMid: string,
  accent: string,
  animated: boolean
): string {
  const outerPulse = animated
    ? `<animate attributeName="r" values="11;19;11" dur="4.2s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.8;0.2;0.8" dur="4.2s" repeatCount="indefinite"/>`
    : ''
  const midPulse = animated
    ? `<animate attributeName="r" values="7;13;7" dur="4.2s" begin="0.8s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.85;0.3;0.85" dur="4.2s" begin="0.8s" repeatCount="indefinite"/>`
    : ''
  return `
    <g transform="translate(${cx} ${cy}) scale(${scale})">
      <circle cx="0" cy="0" r="16" fill="none" stroke="${primaryMid}" stroke-width="1.05">${outerPulse}</circle>
      <circle cx="0" cy="0" r="10" fill="none" stroke="${primary}" stroke-width="1.25">${midPulse}</circle>
      <circle cx="0" cy="0" r="3" fill="${accent}">${pulseAnim('r', '2.6;3.6;2.6', '3s', animated)}</circle>
    </g>
  `
}

function waterDrop(
  cx: number,
  cy: number,
  scale: number,
  primary: string,
  accent: string,
  animated: boolean
): string {
  return `
    <g transform="translate(${cx} ${cy}) scale(${scale})">
      <path d="M0 -12C5 -4 9 1 9 6A9 9 0 1 1 -9 6C-9 1 -5 -4 0 -12Z" fill="none" stroke="${primary}" stroke-width="1.25"/>
      <circle cx="0" cy="6" r="2.5" fill="${accent}">${pulseAnim('r', '2;3.2;2', '3.2s', animated)}</circle>
    </g>
  `
}

function renderTocSvg(colors: PaletteColors, animated: boolean): string {
  const { primary, primarySoft, primaryMid, accent } = resolveMotionColors(colors)
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 84 60" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
      <path d="M10 46H74" stroke="${primarySoft}" stroke-width="0.9"/>
      ${rippleRings(42, 28, 1.05, primary, primaryMid, accent, animated)}
    </svg>
  `
}

function renderBadgeSvg(colors: PaletteColors, animated: boolean): string {
  const { primary, accent } = resolveMotionColors(colors)
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 40" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
      ${waterDrop(28, 17, 0.88, primary, accent, animated)}
      ${flowTrailSvg('M6 34C18 30 38 30 50 34', accent, 1.4, '12 48', -60, '3.6s', animated)}
    </svg>
  `
}

function renderPlaceholderSvg(colors: PaletteColors, animated: boolean): string {
  const { primary, primarySoft, primaryMid, accent } = resolveMotionColors(colors)
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 110" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
      <path d="M22 84H138" stroke="${primarySoft}" stroke-width="0.9"/>
      ${flowTrailSvg('M22 84H138', primary, 1.6, '22 140', -162, '4.6s', animated)}
      ${rippleRings(80, 50, 1.55, primary, primaryMid, accent, animated)}
    </svg>
  `
}

export const zenRippleMotion: MotionPreset = {
  id: 'zen-ripple',
  name: '静水涟漪',

  renderBannerMotion(colors: PaletteColors, animated: boolean): string {
    const { primary, primaryMid, accent } = resolveMotionColors(colors)
    const spine = 'M30 52C160 52 240 44 375 44C510 44 590 52 720 52'
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 84" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M30 64H720" stroke="${primaryMid}" stroke-width="0.85" stroke-dasharray="3 6"/>
        ${flowTrailSvg(spine, primary, 1.8, '88 840', -928, '4.8s', animated)}
        ${rippleRings(118, 44, 1.05, primary, primaryMid, accent, animated)}
        ${waterDrop(626, 40, 1.05, primary, accent, animated)}
        <circle cx="375" cy="44" r="3" fill="${accent}"/>
      </svg>
    `
  },

  renderBannerFrame(innerHtml: string, colors: PaletteColors, animated: boolean): string {
    const { primary, primaryMid, accent } = resolveMotionColors(colors)
    const badge = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        ${rippleRings(28, 28, 1.15, primary, primaryMid, accent, animated)}
      </svg>
    `
    return bannerFrameHtml(innerHtml, colors, badge, this.renderBannerMotion(colors, animated), animated)
  },

  renderTocDecor(colors: PaletteColors, animated: boolean): string {
    return renderTocSvg(colors, animated)
  },

  renderSectionBadge(colors: PaletteColors, animated: boolean): string {
    const { primaryMid, accent } = resolveMotionColors(colors)
    const lineSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 12" width="100%" style="display:block;flex:1;min-width:0;width:100%;height:12px;">
        <line x1="20" y1="6" x2="178" y2="6" stroke="${primaryMid}" stroke-width="1" stroke-dasharray="2 6"/>
        <circle cx="170" cy="6" r="2" fill="${accent}">${pulseAnim('opacity', '1;0.35;1', '3s', animated)}</circle>
      </svg>
    `
    return sectionBadgeHtml(renderBadgeSvg(colors, animated), colors, animated, lineSvg)
  },

  renderSectionRail(colors: PaletteColors, animated: boolean, index: number): string {
    void colors
    void animated
    void index
    return ''
  },

  renderImagePlaceholder(caption: string, ratio: string, colors: PaletteColors, animated: boolean): string {
    return imagePlaceholderHtml(renderPlaceholderSvg(colors, animated), this.name, caption, ratio, colors)
  },

  renderBlockquoteDecor(colors: PaletteColors, animated: boolean): string {
    const { primary, accent } = resolveMotionColors(colors)
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 24" width="36" style="display:block;height:auto;max-width:100%;">
        <path d="M6 12C12 7 24 7 30 12" fill="none" stroke="${primary}" stroke-width="1.2"/>
        <path d="M10 16C14 13 22 13 26 16" fill="none" stroke="${primary}" stroke-width="1" opacity="0.55"/>
        <circle cx="18" cy="10" r="2.2" fill="${accent}">${pulseAnim('opacity', '1;0.35;1', '2.8s', animated)}</circle>
      </svg>
    `
  },

  renderH3Marker(colors: PaletteColors, animated: boolean): string {
    const { primary, accent } = resolveMotionColors(colors)
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" width="14" style="display:block;height:auto;max-width:100%;">
        <circle cx="7" cy="7" r="5" fill="none" stroke="${primary}" stroke-width="1.2"/>
        <circle cx="7" cy="7" r="2" fill="${accent}">${pulseAnim('r', '1.6;2.4;1.6', '3s', animated)}</circle>
      </svg>
    `
  },

  renderEndingDecor(colors: PaletteColors, animated: boolean): string {
    const { primary, accent } = resolveMotionColors(colors)
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 28" width="48" style="display:block;height:auto;max-width:100%;">
        ${waterDrop(24, 13, 0.72, primary, accent, animated)}
      </svg>
    `
  },

  renderCodeBadge(colors: PaletteColors, animated: boolean): string {
    const { primary, accent } = resolveMotionColors(colors)
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 14" width="28" style="display:block;height:auto;max-width:100%;">
        <circle cx="9" cy="7" r="4.5" fill="none" stroke="${primary}" stroke-width="1.15"/>
        <circle cx="20" cy="7" r="2.4" fill="${accent}">${pulseAnim('opacity', '1;0.35;1', '2.4s', animated)}</circle>
      </svg>
    `
  },

  renderDivider(colors: PaletteColors, animated: boolean): string {
    const { primary, primaryMid, accent } = resolveMotionColors(colors)
    const d = 'M20 9C160 9 240 5 320 5C400 5 480 9 620 9'
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 16" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M180 12H460" stroke="${primaryMid}" stroke-width="0.85" stroke-dasharray="2 5"/>
        ${flowTrailSvg(d, primary, 1.65, '76 700', -776, '4.8s', animated)}
        <circle cx="320" cy="5" r="2.8" fill="${accent}"/>
      </svg>
    `
  },

  renderTail(colors: PaletteColors, animated: boolean, label = 'END · 继续阅读'): string {
    const { primary, primarySoft, primaryMid, accent } = resolveMotionColors(colors)
    const leftSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 84" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M14 58H186" stroke="${primarySoft}" stroke-width="0.9"/>
        ${rippleRings(68, 42, 1.15, primary, primaryMid, accent, animated)}
      </svg>
    `
    const rightSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 84" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M14 58H186" stroke="${primarySoft}" stroke-width="0.9"/>
        <circle cx="116" cy="46" r="2.5" fill="${primary}" opacity="0.65"/>
        <circle cx="134" cy="38" r="3.5" fill="${accent}"/>
        <circle cx="152" cy="46" r="2.5" fill="${primary}" opacity="0.65"/>
        ${waterDrop(134, 24, 0.72, primary, accent, animated)}
      </svg>
    `
    const spineSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 24" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M30 17H720" stroke="${primaryMid}" stroke-width="0.85" stroke-dasharray="3 6"/>
        ${flowTrailSvg('M30 12C200 12 280 5 375 5C470 5 550 12 720 12', primary, 1.75, '96 840', -936, '4.8s', animated)}
      </svg>
    `
    return tailFrameHtml(leftSvg, rightSvg, spineSvg, label, colors)
  }
}
