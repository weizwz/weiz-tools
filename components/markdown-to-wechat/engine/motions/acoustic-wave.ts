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
  accent: string,
  ink: string,
  animated: boolean
): string {
  const heights = [10, 20, 28, 16, 24]
  const bars = heights
    .map((h, i) => {
      const x = (i - 2) * 7
      const col = i === 2 ? accent : i % 2 === 0 ? primary : ink
      const anim = animated
        ? `<animate attributeName="height" values="${h};${Math.max(6, h - 8)};${h}" dur="${(2.2 + i * 0.25).toFixed(2)}s" repeatCount="indefinite"/><animate attributeName="y" values="${-h / 2};${-(Math.max(6, h - 8)) / 2};${-h / 2}" dur="${(2.2 + i * 0.25).toFixed(2)}s" repeatCount="indefinite"/>`
        : ''
      return `<rect x="${x - 1.5}" y="${-h / 2}" width="3" height="${h}" rx="1.5" fill="${col}">${anim}</rect>`
    })
    .join('')
  return `<g transform="translate(${cx} ${cy}) scale(${scale})">${bars}</g>`
}

function renderTocSvg(colors: PaletteColors, animated: boolean): string {
  const { primary, accent, muted, ink } = resolveMotionColors(colors)
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 84 60" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
      <path d="M8 30H76" stroke="${muted}" stroke-width="0.9" opacity="0.55"/>
      ${flowTrailSvg('M8 30C22 18 32 42 42 30C52 18 62 42 76 30', primary, 1.5, '16 100', -116, '4.2s', animated)}
      ${waveBars(42, 30, 0.9, primary, accent, ink, animated)}
    </svg>
  `
}

function renderBadgeSvg(colors: PaletteColors, animated: boolean): string {
  const { primary, accent, ink } = resolveMotionColors(colors)
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 40" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
      ${waveBars(28, 20, 0.85, primary, accent, ink, animated)}
    </svg>
  `
}

function renderPlaceholderSvg(colors: PaletteColors, animated: boolean): string {
  const { primary, accent, muted, ink } = resolveMotionColors(colors)
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 110" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
      <path d="M18 55H142" stroke="${muted}" stroke-width="0.9" opacity="0.5"/>
      ${flowTrailSvg('M18 55C44 30 62 80 80 55C98 30 116 80 142 55', primary, 1.65, '24 150', -174, '4.2s', animated)}
      ${waveBars(80, 55, 1.45, primary, accent, ink, animated)}
    </svg>
  `
}

export const acousticWaveMotion: MotionPreset = {
  id: 'acoustic-wave',
  name: '清弦声纹',

  renderBannerMotion(colors: PaletteColors, animated: boolean): string {
    const { primary, accent, muted, ink } = resolveMotionColors(colors)
    const spine = 'M30 48C140 28 240 68 375 48C510 28 610 68 720 48'
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 84" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M30 48H720" stroke="${muted}" stroke-width="0.85" opacity="0.5"/>
        ${flowTrailSvg(spine, primary, 1.85, '96 860', -956, '4.4s', animated)}
        ${waveBars(124, 48, 0.95, primary, accent, ink, animated)}
        ${waveBars(626, 48, 0.95, primary, accent, ink, animated)}
        <circle cx="375" cy="48" r="3" fill="${accent}"/>
      </svg>
    `
  },

  renderBannerFrame(innerHtml: string, colors: PaletteColors, animated: boolean): string {
    const { primary, accent, ink } = resolveMotionColors(colors)
    const badge = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        ${waveBars(28, 28, 1.05, primary, accent, ink, animated)}
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
    const dur = `${(4.0 + ((index - 1) % 3) * 0.4).toFixed(1)}s`
    const rail = 'M4 8C110 2 210 14 320 8C430 2 530 14 636 8'
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 16" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M4 8H636" stroke="${muted}" stroke-width="0.8" opacity="0.48"/>
        ${flowTrailSvg(rail, primary, 1.65, '84 740', -824, dur, animated)}
        <circle cx="320" cy="8" r="2.6" fill="${accent}"/>
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
        ${waveBars(18, 12, 0.56, primary, accent, ink, animated)}
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
    const { primary, accent, ink } = resolveMotionColors(colors)
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 28" width="48" style="display:block;height:auto;max-width:100%;">
        ${waveBars(24, 14, 0.72, primary, accent, ink, animated)}
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
    const { primary, accent, muted } = resolveMotionColors(colors)
    const d = 'M20 8C140 2 240 14 320 8C400 2 500 14 620 8'
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 16" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M20 8H620" stroke="${muted}" stroke-width="0.8" opacity="0.46"/>
        ${flowTrailSvg(d, primary, 1.7, '78 700', -778, '4.2s', animated)}
        <circle cx="320" cy="8" r="2.8" fill="${accent}"/>
      </svg>
    `
  },

  renderTail(colors: PaletteColors, animated: boolean, label = 'END · 继续阅读'): string {
    const { primary, accent, muted, ink } = resolveMotionColors(colors)
    const leftSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 84" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M14 42H186" stroke="${muted}" stroke-width="0.9" opacity="0.5"/>
        ${waveBars(64, 42, 1.1, primary, accent, ink, animated)}
        <line x1="94" y1="42" x2="186" y2="42" stroke="${ink}" stroke-width="1.25"/>
      </svg>
    `
    const rightSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 84" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M14 42H186" stroke="${muted}" stroke-width="0.9" opacity="0.5"/>
        <line x1="14" y1="42" x2="106" y2="42" stroke="${ink}" stroke-width="1.25"/>
        ${waveBars(136, 42, 1.1, primary, accent, ink, animated)}
      </svg>
    `
    const spine = 'M30 12C180 4 320 20 375 12C430 4 570 20 720 12'
    const spineSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 24" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        ${flowTrailSvg(spine, primary, 1.8, '96 840', -936, '4.4s', animated)}
      </svg>
    `
    return tailFrameHtml(leftSvg, rightSvg, spineSvg, label, colors)
  }
}
