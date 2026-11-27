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

function waveBars(
  cx: number,
  cy: number,
  scale: number,
  primary: string,
  primaryMid: string,
  accent: string,
  animated: boolean
): string {
  const heights = [10, 20, 28, 16, 24]
  const bars = heights
    .map((h, i) => {
      const x = (i - 2) * 7
      const col = i === 2 ? accent : i % 2 === 0 ? primary : primaryMid
      const anim = animated
        ? `<animate attributeName="height" values="${h};${Math.max(6, h - 8)};${h}" dur="${(2.2 + i * 0.25).toFixed(2)}s" repeatCount="indefinite"/><animate attributeName="y" values="${-h / 2};${-(Math.max(6, h - 8)) / 2};${-h / 2}" dur="${(2.2 + i * 0.25).toFixed(2)}s" repeatCount="indefinite"/>`
        : ''
      return `<rect x="${x - 1.5}" y="${-h / 2}" width="3" height="${h}" rx="1.5" fill="${col}">${anim}</rect>`
    })
    .join('')
  return `<g transform="translate(${cx} ${cy}) scale(${scale})">${bars}</g>`
}

function renderTocSvg(colors: PaletteColors, animated: boolean): string {
  const { primary, primarySoft, primaryMid, accent } = resolveMotionColors(colors)
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 84 32" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
      <path d="M8 16H76" stroke="${primarySoft}" stroke-width="0.9"/>
      ${flowTrailSvg('M8 16C22 7 32 25 42 16C52 7 62 25 76 16', primary, 1.45, '16 100', -116, '4.2s', animated)}
      ${waveBars(42, 16, 0.68, primary, primaryMid, accent, animated)}
    </svg>
  `
}

function renderBadgeSvg(colors: PaletteColors, animated: boolean): string {
  const { primary, primaryMid, accent } = resolveMotionColors(colors)
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 40" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
      ${waveBars(28, 20, 0.85, primary, primaryMid, accent, animated)}
    </svg>
  `
}

function renderPlaceholderSvg(colors: PaletteColors, animated: boolean): string {
  const { primary, primarySoft, primaryMid, accent } = resolveMotionColors(colors)
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 110" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
      <path d="M18 55H142" stroke="${primarySoft}" stroke-width="0.9"/>
      ${flowTrailSvg('M18 55C44 30 62 80 80 55C98 30 116 80 142 55', primary, 1.65, '24 150', -174, '4.2s', animated)}
      ${waveBars(80, 55, 1.45, primary, primaryMid, accent, animated)}
    </svg>
  `
}

export const acousticWaveMotion: MotionPreset = {
  id: 'acoustic-wave',
  name: '清弦声纹',

  renderBannerMotion(colors: PaletteColors, animated: boolean): string {
    const { primary, primaryMid, accent } = resolveMotionColors(colors)
    const spine1 = 'M30 48C140 28 240 68 375 48C510 28 610 68 720 48'
    const spine2 = 'M30 52C140 68 240 32 375 52C510 68 610 32 720 52'
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 84" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        ${flowTrailSvg(spine1, primary, 1.8, '96 860', -956, '4.4s', animated)}
        <path d="${spine2}" fill="none" stroke="${primaryMid}" stroke-width="1" stroke-dasharray="4 4"/>
        ${flowTrailSvg(spine2, accent, 1.35, '64 860', 924, '5.0s', animated)}
        ${waveBars(124, 48, 0.95, primary, primaryMid, accent, animated)}
        <g transform="translate(626 48)">
          <circle cx="0" cy="0" r="14" fill="none" stroke="${primaryMid}" stroke-width="1.2"/>
          <circle cx="0" cy="0" r="7" fill="none" stroke="${primary}" stroke-width="1.1">${pulseAnim('r', '6;9;6', '3s', animated)}</circle>
          <circle cx="0" cy="0" r="2.5" fill="${accent}"/>
        </g>
        <circle cx="375" cy="48" r="3" fill="${accent}"/>
      </svg>
    `
  },

  renderBannerFrame(innerHtml: string, colors: PaletteColors, animated: boolean): string {
    const { primary, primaryMid, accent } = resolveMotionColors(colors)
    const badge = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <circle cx="28" cy="28" r="18" fill="none" stroke="${primaryMid}" stroke-width="1.2"/>
        <circle cx="28" cy="28" r="10" fill="none" stroke="${primary}" stroke-width="1.4">${pulseAnim('r', '9;13;9', '3s', animated)}</circle>
        <circle cx="28" cy="28" r="3.2" fill="${accent}"/>
      </svg>
    `
    return bannerFrameHtml(innerHtml, colors, badge, this.renderBannerMotion(colors, animated), animated)
  },

  renderTocDecor(colors: PaletteColors, animated: boolean): string {
    return renderTocSvg(colors, animated)
  },

  renderSectionBadge(colors: PaletteColors, animated: boolean): string {
    const { primary, accent } = resolveMotionColors(colors)
    const lineSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 12" width="100%" style="display:block;flex:1;min-width:0;width:100%;height:12px;">
        <path d="M0 6C15 1 30 11 45 6C60 1 75 11 90 6C105 1 120 11 135 6C150 1 165 11 178 6" fill="none" stroke="${primary}" stroke-width="1.15" opacity="0.65"/>
        <circle cx="6" cy="6" r="2.2" fill="${accent}">${pulseAnim('opacity', '1;0.35;1', '2.4s', animated)}</circle>
      </svg>
    `
    return sectionBadgeHtml(renderBadgeSvg(colors, animated), colors, animated, lineSvg)
  },

  renderSectionRail(colors: PaletteColors, animated: boolean, index: number): string {
    const { primary, primaryMid, accent } = resolveMotionColors(colors)
    const dur = `${(4.0 + ((index - 1) % 3) * 0.4).toFixed(1)}s`
    const rail1 = 'M4 8C110 2 210 14 320 8C430 2 530 14 636 8'
    const rail2 = 'M4 8C110 14 210 2 320 8C430 14 530 2 636 8'
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 16" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        ${flowTrailSvg(rail1, primary, 1.55, '84 740', -824, dur, animated)}
        <path d="${rail2}" fill="none" stroke="${primaryMid}" stroke-width="0.9" stroke-dasharray="3 4"/>
        ${flowTrailSvg(rail2, accent, 1.3, '56 740', 796, '4.8s', animated)}
      </svg>
    `
  },

  renderImagePlaceholder(caption: string, ratio: string, colors: PaletteColors, animated: boolean): string {
    return imagePlaceholderHtml(renderPlaceholderSvg(colors, animated), this.name, caption, ratio, colors)
  },

  renderBlockquoteDecor(colors: PaletteColors, animated: boolean): string {
    const { primary, accent } = resolveMotionColors(colors)
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 24" width="36" style="display:block;height:auto;max-width:100%;">
        <circle cx="9" cy="12" r="2.2" fill="${primary}">${pulseAnim('opacity', '1;0.3;1', '2.4s', animated)}</circle>
        <circle cx="18" cy="12" r="3" fill="${accent}">${pulseAnim('r', '2.4;3.6;2.4', '2.4s', animated)}</circle>
        <circle cx="27" cy="12" r="2.2" fill="${primary}">${pulseAnim('opacity', '0.3;1;0.3', '2.4s', animated)}</circle>
      </svg>
    `
  },

  renderH3Marker(colors: PaletteColors, animated: boolean): string {
    const { primary, accent } = resolveMotionColors(colors)
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" width="14" style="display:block;height:auto;max-width:100%;">
        <rect x="2" y="4" width="2" height="6" rx="1" fill="${primary}"/>
        <rect x="6" y="2" width="2" height="10" rx="1" fill="${accent}">${pulseAnim('opacity', '1;0.4;1', '2.2s', animated)}</rect>
        <rect x="10" y="4" width="2" height="6" rx="1" fill="${primary}"/>
      </svg>
    `
  },

  renderEndingDecor(colors: PaletteColors, animated: boolean): string {
    const { primary, primaryMid, accent } = resolveMotionColors(colors)
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 28" width="48" style="display:block;height:auto;max-width:100%;">
        ${waveBars(24, 14, 0.72, primary, primaryMid, accent, animated)}
      </svg>
    `
  },

  renderCodeBadge(colors: PaletteColors, animated: boolean): string {
    const { primary, accent } = resolveMotionColors(colors)
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 14" width="28" style="display:block;height:auto;max-width:100%;">
        <rect x="4" y="4" width="2.5" height="6" rx="1" fill="${primary}"/>
        <rect x="9.5" y="2" width="2.5" height="10" rx="1" fill="${accent}">${pulseAnim('opacity', '1;0.35;1', '2s', animated)}</rect>
        <rect x="15" y="4" width="2.5" height="6" rx="1" fill="${primary}"/>
      </svg>
    `
  },

  renderDivider(colors: PaletteColors, animated: boolean): string {
    const { primary, primaryMid, accent } = resolveMotionColors(colors)
    const d = 'M20 8C140 2 240 14 320 8C400 2 500 14 620 8'
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 16" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M20 8H620" stroke="${primaryMid}" stroke-width="0.85" stroke-dasharray="3 4"/>
        ${flowTrailSvg(d, primary, 1.65, '78 700', -778, '4.2s', animated)}
        <circle cx="320" cy="8" r="2.8" fill="${accent}"/>
      </svg>
    `
  },

  renderTail(colors: PaletteColors, animated: boolean, label = 'END · 继续阅读'): string {
    const { primary, primarySoft, primaryMid, accent } = resolveMotionColors(colors)
    const leftSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 84" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <circle cx="72" cy="42" r="22" fill="none" stroke="${primaryMid}" stroke-width="1.3"/>
        <circle cx="72" cy="42" r="14" fill="none" stroke="${primary}" stroke-width="1.1">${pulseAnim('r', '12;16;12', '3.4s', animated)}</circle>
        <circle cx="72" cy="42" r="4" fill="${accent}"/>
        <path d="M98 42H186" stroke="${primarySoft}" stroke-width="1"/>
      </svg>
    `
    const rightSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 84" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M14 62H186" stroke="${primarySoft}" stroke-width="0.9"/>
        ${waveBars(136, 42, 1.25, primary, primaryMid, accent, animated)}
      </svg>
    `
    const spineSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 24" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        ${flowTrailSvg('M30 12C180 4 320 20 375 12C430 4 570 20 720 12', primary, 1.75, '96 840', -936, '4.4s', animated)}
        ${flowTrailSvg('M30 12C180 20 320 4 375 12C430 20 570 4 720 12', accent, 1.3, '64 840', 904, '5.0s', animated)}
      </svg>
    `
    return tailFrameHtml(leftSvg, rightSvg, spineSvg, label, colors)
  }
}
