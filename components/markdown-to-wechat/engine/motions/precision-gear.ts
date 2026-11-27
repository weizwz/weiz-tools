import { MotionPreset, PaletteColors } from '../types'
import {
  bannerFrameHtml,
  flowTrailSvg,
  imagePlaceholderHtml,
  pulseAnim,
  resolveMotionColors,
  rotateAnim,
  sectionBadgeHtml,
  tailFrameHtml
} from './helpers'

function gearWheel(
  cx: number,
  cy: number,
  r: number,
  primary: string,
  accent: string,
  ink: string,
  clockwise: boolean,
  animated: boolean
): string {
  const rot = rotateAnim('0 0 0', clockwise ? '360 0 0' : '-360 0 0', '14s', animated)
  const teeth = Array.from({ length: 8 }, (_, i) => {
    const angle = i * 45
    return `<rect x="-2" y="${-r - 3.5}" width="4" height="5" fill="${ink}" transform="rotate(${angle})"/>`
  }).join('')
  return `
    <g transform="translate(${cx} ${cy})">
      <g>
        ${teeth}
        <circle cx="0" cy="0" r="${r}" fill="none" stroke="${ink}" stroke-width="1.35"/>
        <circle cx="0" cy="0" r="${Math.max(4, r * 0.48)}" fill="none" stroke="${primary}" stroke-width="1.1"/>
        ${rot}
      </g>
      <circle cx="0" cy="0" r="2.6" fill="${accent}"/>
    </g>
  `
}

function renderTocSvg(colors: PaletteColors, animated: boolean): string {
  const { primary, accent, muted, ink } = resolveMotionColors(colors)
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 84 60" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
      <path d="M10 48H74" stroke="${muted}" stroke-width="1" opacity="0.65"/>
      ${flowTrailSvg('M10 48H74', primary, 1.5, '12 80', -92, '4.5s', animated)}
      ${gearWheel(34, 28, 12, primary, accent, ink, true, animated)}
      ${gearWheel(55, 34, 8, primary, accent, ink, false, animated)}
    </svg>
  `
}

function renderBadgeSvg(colors: PaletteColors, animated: boolean): string {
  const { primary, accent, muted, ink } = resolveMotionColors(colors)
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 40" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
      <path d="M6 34H50" stroke="${muted}" stroke-width="0.9" opacity="0.6"/>
      ${gearWheel(28, 20, 10, primary, accent, ink, true, animated)}
    </svg>
  `
}

function renderPlaceholderSvg(colors: PaletteColors, animated: boolean): string {
  const { primary, accent, muted, ink } = resolveMotionColors(colors)
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 110" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
      <path d="M18 86H142" stroke="${muted}" stroke-width="1" opacity="0.55"/>
      ${flowTrailSvg('M18 86H142', primary, 1.65, '20 140', -160, '4.5s', animated)}
      ${gearWheel(66, 52, 18, primary, accent, ink, true, animated)}
      ${gearWheel(100, 62, 11, primary, accent, ink, false, animated)}
    </svg>
  `
}

export const precisionGearMotion: MotionPreset = {
  id: 'precision-gear',
  name: '精工齿轮',

  renderBannerMotion(colors: PaletteColors, animated: boolean): string {
    const { primary, accent, muted, ink } = resolveMotionColors(colors)
    const spine = 'M30 56H226L244 48H506L524 56H720'
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 84" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M40 66H710" stroke="${muted}" stroke-width="0.9" opacity="0.55"/>
        ${flowTrailSvg(spine, primary, 1.85, '88 840', -928, '4.8s', animated)}
        ${gearWheel(110, 42, 14, primary, accent, ink, true, animated)}
        ${gearWheel(140, 48, 9, primary, accent, ink, false, animated)}
        ${gearWheel(640, 42, 14, primary, accent, ink, false, animated)}
        ${gearWheel(610, 48, 9, primary, accent, ink, true, animated)}
        <rect x="365" y="44" width="20" height="8" fill="none" stroke="${ink}" stroke-width="1.2"/>
      </svg>
    `
  },

  renderBannerFrame(innerHtml: string, colors: PaletteColors, animated: boolean): string {
    const { primary, accent, ink } = resolveMotionColors(colors)
    const badge = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        ${gearWheel(28, 28, 15, primary, accent, ink, true, animated)}
      </svg>
    `
    return bannerFrameHtml(innerHtml, colors, badge, this.renderBannerMotion(colors, animated), animated)
  },

  renderTocDecor(colors: PaletteColors, animated: boolean): string {
    return renderTocSvg(colors, animated)
  },

  renderSectionBadge(colors: PaletteColors, animated: boolean): string {
    return sectionBadgeHtml(renderBadgeSvg(colors, animated), colors, animated)
  },

  renderSectionRail(colors: PaletteColors, animated: boolean, index: number): string {
    const { primary, accent, muted } = resolveMotionColors(colors)
    const dur = `${(4.5 + ((index - 1) % 3) * 0.4).toFixed(1)}s`
    const rail = 'M4 8H248L260 4H380L392 8H636'
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 14" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M120 11H520" stroke="${muted}" stroke-width="0.8" opacity="0.5"/>
        ${flowTrailSvg(rail, primary, 1.65, '80 720', -800, dur, animated)}
        <circle cx="320" cy="4" r="2.6" fill="${accent}"/>
      </svg>
    `
  },

  renderImagePlaceholder(caption: string, ratio: string, colors: PaletteColors, animated: boolean): string {
    return imagePlaceholderHtml(renderPlaceholderSvg(colors, animated), this.name, caption, ratio, colors)
  },

  renderBlockquoteDecor(colors: PaletteColors, animated: boolean): string {
    const { primary, accent, ink } = resolveMotionColors(colors)
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 24" width="36" style="display:block;height:auto;max-width:100%;">
        ${gearWheel(14, 12, 6, primary, accent, ink, true, animated)}
        <line x1="23" y1="12" x2="34" y2="12" stroke="${primary}" stroke-width="1.2"/>
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
    const { primary, accent, ink } = resolveMotionColors(colors)
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 28" width="48" style="display:block;height:auto;max-width:100%;">
        ${gearWheel(16, 14, 7, primary, accent, ink, true, animated)}
        ${gearWheel(31, 16, 5, primary, accent, ink, false, animated)}
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
    const { primary, accent, muted } = resolveMotionColors(colors)
    const d = 'M20 9H252L264 5H376L388 9H620'
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 16" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M220 12H420" stroke="${muted}" stroke-width="0.85" opacity="0.55"/>
        ${flowTrailSvg(d, primary, 1.7, '80 720', -800, '4.6s', animated)}
        <circle cx="320" cy="5" r="3" fill="${accent}"/>
      </svg>
    `
  },

  renderTail(colors: PaletteColors, animated: boolean, label = 'END · 继续阅读'): string {
    const { primary, accent, muted, ink } = resolveMotionColors(colors)
    const leftSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 84" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M16 62H186" stroke="${muted}" stroke-width="1" opacity="0.6"/>
        ${gearWheel(64, 40, 15, primary, accent, ink, true, animated)}
        ${gearWheel(95, 48, 9, primary, accent, ink, false, animated)}
        <line x1="112" y1="48" x2="186" y2="48" stroke="${ink}" stroke-width="1.25"/>
      </svg>
    `
    const rightSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 84" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M14 62H184" stroke="${muted}" stroke-width="1" opacity="0.6"/>
        <line x1="14" y1="48" x2="88" y2="48" stroke="${ink}" stroke-width="1.25"/>
        ${gearWheel(105, 48, 9, primary, accent, ink, true, animated)}
        ${gearWheel(136, 40, 15, primary, accent, ink, false, animated)}
      </svg>
    `
    const spine = 'M30 14H240L256 7H494L510 14H720'
    const spineSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 24" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        ${flowTrailSvg(spine, primary, 1.8, '96 840', -936, '4.8s', animated)}
      </svg>
    `
    return tailFrameHtml(leftSvg, rightSvg, spineSvg, label, colors)
  }
}
