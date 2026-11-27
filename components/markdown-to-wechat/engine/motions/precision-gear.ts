import { MotionPreset, PaletteColors } from '../types'
import {
  bannerFrameHtml,
  flowTrailSvg,
  imagePlaceholderHtml,
  pulseAnim,
  resolveMotionColors,
  rotateAnim,
  sectionBadgeHtml,
  tailFrameHtml,
  translateAnim
} from './helpers'

function gearWheel(
  cx: number,
  cy: number,
  r: number,
  primary: string,
  primaryMid: string,
  accent: string,
  clockwise: boolean,
  animated: boolean
): string {
  const rot = rotateAnim('0 0 0', clockwise ? '360 0 0' : '-360 0 0', '14s', animated)
  const teeth = Array.from({ length: 8 }, (_, i) => {
    const angle = i * 45
    return `<rect x="-2" y="${-r - 3.5}" width="4" height="5" fill="${primaryMid}" transform="rotate(${angle})"/>`
  }).join('')
  return `
    <g transform="translate(${cx} ${cy})">
      <g>
        ${teeth}
        <circle cx="0" cy="0" r="${r}" fill="none" stroke="${primary}" stroke-width="1.3"/>
        <circle cx="0" cy="0" r="${Math.max(4, r * 0.48)}" fill="none" stroke="${primaryMid}" stroke-width="1"/>
        ${rot}
      </g>
      <circle cx="0" cy="0" r="2.6" fill="${accent}"/>
    </g>
  `
}

function rollingGearWheel(
  cx: number,
  cy: number,
  r: number,
  travelX: number,
  dur: string,
  primary: string,
  primaryMid: string,
  accent: string,
  animated: boolean
): string {
  const outerR = r + 3.5
  const halfAngle = Math.round(((travelX * 2) / outerR) * (180 / Math.PI) * 0.5)
  const move = translateAnim(`-${travelX} 0;${travelX} 0;-${travelX} 0`, dur, animated)
  const spin = animated
    ? `<animateTransform attributeName="transform" type="rotate" values="-${halfAngle} 0 0;${halfAngle} 0 0;-${halfAngle} 0 0" dur="${dur}" repeatCount="indefinite" additive="sum"/>`
    : ''
  const teeth = Array.from({ length: 8 }, (_, i) => {
    const angle = i * 45
    return `<rect x="-2" y="${-outerR}" width="4" height="5" fill="${primaryMid}" transform="rotate(${angle})"/>`
  }).join('')
  return `
    <g transform="translate(${cx} ${cy})">
      <g>
        <g>
          ${teeth}
          <circle cx="0" cy="0" r="${r}" fill="none" stroke="${primary}" stroke-width="1.3"/>
          <circle cx="0" cy="0" r="${Math.max(4, r * 0.48)}" fill="none" stroke="${primaryMid}" stroke-width="1"/>
          ${spin}
        </g>
        <circle cx="0" cy="0" r="2.6" fill="${accent}"/>
        ${move}
      </g>
    </g>
  `
}

function renderTocSvg(colors: PaletteColors, animated: boolean): string {
  const { primary, primarySoft, primaryMid, accent } = resolveMotionColors(colors)
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 84 32" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
      <path d="M10 28H74" stroke="${primarySoft}" stroke-width="0.95"/>
      ${flowTrailSvg('M10 28H74', primary, 1.45, '12 80', -92, '4.5s', animated)}
      ${gearWheel(34, 15, 8.5, primary, primaryMid, accent, true, animated)}
      ${gearWheel(53, 18, 5.5, primary, primaryMid, accent, false, animated)}
    </svg>
  `
}

function renderBadgeSvg(colors: PaletteColors, animated: boolean): string {
  const { primary, primarySoft, primaryMid, accent } = resolveMotionColors(colors)
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 40" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
      <path d="M6 34H50" stroke="${primarySoft}" stroke-width="0.9"/>
      ${gearWheel(28, 20, 10, primary, primaryMid, accent, true, animated)}
    </svg>
  `
}

function renderPlaceholderSvg(colors: PaletteColors, animated: boolean): string {
  const { primary, primarySoft, primaryMid, accent } = resolveMotionColors(colors)
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 110" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
      <path d="M18 86H142" stroke="${primarySoft}" stroke-width="1"/>
      ${flowTrailSvg('M18 86H142', primary, 1.65, '20 140', -160, '4.5s', animated)}
      ${gearWheel(66, 52, 18, primary, primaryMid, accent, true, animated)}
      ${gearWheel(100, 62, 11, primary, primaryMid, accent, false, animated)}
    </svg>
  `
}

export const precisionGearMotion: MotionPreset = {
  id: 'precision-gear',
  name: '精工齿轮',

  renderBannerMotion(colors: PaletteColors, animated: boolean): string {
    const { primary, primaryMid, accent } = resolveMotionColors(colors)
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 84" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M30 56H720" stroke="${primary}" stroke-width="1.35" opacity="0.65"/>
        <path d="M40 66H710" stroke="${primaryMid}" stroke-width="0.9" stroke-dasharray="6 4"/>
        ${rollingGearWheel(375, 38.5, 14, 160, '10s', primary, primaryMid, accent, animated)}
        <circle cx="110" cy="56" r="2.8" fill="${accent}"/>
        <circle cx="640" cy="56" r="2.8" fill="${accent}"/>
      </svg>
    `
  },

  renderBannerFrame(innerHtml: string, colors: PaletteColors, animated: boolean): string {
    const { primary, primaryMid, accent } = resolveMotionColors(colors)
    const badge = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        ${gearWheel(28, 28, 15, primary, primaryMid, accent, true, animated)}
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
        <line x1="0" y1="6" x2="178" y2="6" stroke="${primaryMid}" stroke-width="1.2" stroke-dasharray="5 3"/>
        <rect x="4" y="3" width="10" height="6" fill="${accent}">${pulseAnim('opacity', '1;0.4;1', '2.6s', animated)}</rect>
      </svg>
    `
    return sectionBadgeHtml(renderBadgeSvg(colors, animated), colors, animated, lineSvg)
  },

  renderSectionRail(colors: PaletteColors, animated: boolean, index: number): string {
    const { primary, primaryMid, accent } = resolveMotionColors(colors)
    const dur = `${(9 + ((index - 1) % 3) * 0.6).toFixed(1)}s`
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 24" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M4 20H636" stroke="${primaryMid}" stroke-width="1.15"/>
        ${rollingGearWheel(320, 10.5, 6, 120, dur, primary, primaryMid, accent, animated)}
      </svg>
    `
  },

  renderImagePlaceholder(caption: string, ratio: string, colors: PaletteColors, animated: boolean): string {
    return imagePlaceholderHtml(renderPlaceholderSvg(colors, animated), this.name, caption, ratio, colors)
  },

  renderBlockquoteDecor(colors: PaletteColors, animated: boolean): string {
    const { primary, primaryMid, accent } = resolveMotionColors(colors)
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 24" width="36" style="display:block;height:auto;max-width:100%;">
        <polygon points="10,4 16,7.5 16,14.5 10,18 4,14.5 4,7.5" fill="none" stroke="${primary}" stroke-width="1.2"/>
        <circle cx="10" cy="11" r="2" fill="${accent}">${pulseAnim('opacity', '1;0.35;1', '2.6s', animated)}</circle>
        <line x1="20" y1="11" x2="34" y2="11" stroke="${primaryMid}" stroke-width="1.2" stroke-dasharray="3 2"/>
      </svg>
    `
  },

  renderH3Marker(colors: PaletteColors, animated: boolean): string {
    const { primary, accent } = resolveMotionColors(colors)
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" width="14" style="display:block;height:auto;max-width:100%;">
        <circle cx="7" cy="7" r="4.5" fill="none" stroke="${primary}" stroke-width="1.3" stroke-dasharray="2.5 2"/>
        <circle cx="7" cy="7" r="2" fill="${accent}">${pulseAnim('opacity', '1;0.4;1', '2.8s', animated)}</circle>
      </svg>
    `
  },

  renderEndingDecor(colors: PaletteColors, animated: boolean): string {
    const { primary, primaryMid, accent } = resolveMotionColors(colors)
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 28" width="48" style="display:block;height:auto;max-width:100%;">
        ${gearWheel(16, 14, 7, primary, primaryMid, accent, true, animated)}
        ${gearWheel(31, 16, 5, primary, primaryMid, accent, false, animated)}
      </svg>
    `
  },

  renderCodeBadge(colors: PaletteColors, animated: boolean): string {
    const { primary, accent } = resolveMotionColors(colors)
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 14" width="28" style="display:block;height:auto;max-width:100%;">
        <circle cx="8" cy="7" r="4" fill="none" stroke="${primary}" stroke-width="1.2" stroke-dasharray="2 1.8"/>
        <circle cx="20" cy="7" r="2.5" fill="${accent}">${pulseAnim('opacity', '1;0.35;1', '2.2s', animated)}</circle>
      </svg>
    `
  },

  renderDivider(colors: PaletteColors, animated: boolean): string {
    const { primary, primaryMid, accent } = resolveMotionColors(colors)
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 16" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M20 8H620" stroke="${primaryMid}" stroke-width="1" stroke-dasharray="4 4"/>
        ${flowTrailSvg('M20 8H252L264 4H376L388 8H620', primary, 1.65, '80 720', -800, '4.6s', animated)}
        <circle cx="320" cy="4" r="3" fill="${accent}"/>
      </svg>
    `
  },

  renderTail(colors: PaletteColors, animated: boolean, label = 'END · 继续阅读'): string {
    const { primary, primarySoft, primaryMid, accent } = resolveMotionColors(colors)
    const leftSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 84" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M16 60H186" stroke="${primarySoft}" stroke-width="1.1"/>
        ${rollingGearWheel(96, 42.5, 14, 28, '4.8s', primary, primaryMid, accent, animated)}
      </svg>
    `
    const rightSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 84" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M14 60H184" stroke="${primarySoft}" stroke-width="1.1"/>
        ${gearWheel(104, 42, 14, primary, primaryMid, accent, false, animated)}
      </svg>
    `
    const spineSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 24" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M30 16H720" stroke="${primaryMid}" stroke-width="0.9" stroke-dasharray="4 4"/>
        ${flowTrailSvg('M30 10H720', primary, 1.65, '96 840', -936, '4.8s', animated)}
      </svg>
    `
    return tailFrameHtml(leftSvg, rightSvg, spineSvg, label, colors)
  }
}
