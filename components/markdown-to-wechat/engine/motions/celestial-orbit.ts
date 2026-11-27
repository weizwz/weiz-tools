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

function sunMotif(
  cx: number,
  cy: number,
  scale: number,
  primary: string,
  accent: string,
  animated: boolean
): string {
  const rot = rotateAnim('0 0 0', '360 0 0', '20s', animated)
  const rays = Array.from({ length: 8 }, (_, i) => {
    const a = i * 45
    return `<line x1="0" y1="-11" x2="0" y2="-15" stroke="${primary}" stroke-width="1.25" stroke-linecap="round" transform="rotate(${a})"/>`
  }).join('')
  return `
    <g transform="translate(${cx} ${cy}) scale(${scale})">
      <g>${rays}${rot}</g>
      <circle cx="0" cy="0" r="7" fill="none" stroke="${primary}" stroke-width="1.35"/>
      <circle cx="0" cy="0" r="3" fill="${accent}">${pulseAnim('r', '2.5;3.8;2.5', '3.2s', animated)}</circle>
    </g>
  `
}

function crescentMotif(
  cx: number,
  cy: number,
  scale: number,
  primary: string,
  accent: string,
  animated: boolean
): string {
  return `
    <g transform="translate(${cx} ${cy}) scale(${scale})">
      <path d="M4 -11A11 11 0 1 0 11 5A8.5 8.5 0 1 1 4 -11Z" fill="none" stroke="${primary}" stroke-width="1.3" stroke-linejoin="round"/>
      <circle cx="8" cy="-6" r="2" fill="${accent}">${pulseAnim('opacity', '1;0.35;1', '2.8s', animated)}</circle>
    </g>
  `
}

function orbitSystem(
  cx: number,
  cy: number,
  scale: number,
  primary: string,
  primaryMid: string,
  accent: string,
  animated: boolean
): string {
  const m1 = animated
    ? `<animateMotion dur="14s" repeatCount="indefinite" path="M22,0 A22,9 0 1,1 -22,0 A22,9 0 1,1 22,0"/>`
    : ''
  const m2 = animated
    ? `<animateMotion dur="19s" repeatCount="indefinite" path="M-18,0 A18,7.5 0 1,1 18,0 A18,7.5 0 1,1 -18,0"/>`
    : ''
  return `
    <g transform="translate(${cx} ${cy}) scale(${scale})">
      <g transform="rotate(-22)">
        <ellipse cx="0" cy="0" rx="22" ry="9" fill="none" stroke="${primaryMid}" stroke-width="1.2"/>
        <circle cx="${animated ? 0 : 22}" cy="0" r="2.6" fill="${primary}">${m1}</circle>
      </g>
      <g transform="rotate(24)">
        <ellipse cx="0" cy="0" rx="18" ry="7.5" fill="none" stroke="${primary}" stroke-width="1" opacity="0.78"/>
        <circle cx="${animated ? 0 : -18}" cy="0" r="2.2" fill="${accent}">${m2}</circle>
      </g>
      <circle cx="0" cy="0" r="3.4" fill="${accent}">${pulseAnim('r', '3;4.2;3', '3.2s', animated)}</circle>
    </g>
  `
}

function renderTocSvg(colors: PaletteColors, animated: boolean): string {
  const { primary, primarySoft, primaryMid, accent } = resolveMotionColors(colors)
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 84 32" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
      <path d="M10 27Q42 20 74 27" fill="none" stroke="${primarySoft}" stroke-width="0.9"/>
      ${orbitSystem(42, 15, 0.78, primary, primaryMid, accent, animated)}
    </svg>
  `
}

function renderBadgeSvg(colors: PaletteColors, animated: boolean): string {
  const { primary, accent } = resolveMotionColors(colors)
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 40" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
      ${crescentMotif(28, 20, 1.05, primary, accent, animated)}
    </svg>
  `
}

function renderPlaceholderSvg(colors: PaletteColors, animated: boolean): string {
  const { primary, primarySoft, primaryMid, accent } = resolveMotionColors(colors)
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 110" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
      <path d="M18 82Q80 62 142 82" fill="none" stroke="${primarySoft}" stroke-width="0.9"/>
      ${flowTrailSvg('M18 82Q80 62 142 82', primary, 1.6, '22 140', -162, '4.8s', animated)}
      ${orbitSystem(80, 48, 1.48, primary, primaryMid, accent, animated)}
    </svg>
  `
}

export const celestialOrbitMotion: MotionPreset = {
  id: 'celestial-orbit',
  name: '星轨天象',

  renderBannerMotion(colors: PaletteColors, animated: boolean): string {
    const { primary, primaryMid, accent } = resolveMotionColors(colors)
    const spine = 'M30 56Q375 30 720 56'
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 84" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M30 64Q375 44 720 64" fill="none" stroke="${primaryMid}" stroke-width="0.9" stroke-dasharray="4 5"/>
        ${flowTrailSvg(spine, primary, 1.8, '92 840', -932, '4.8s', animated)}
        ${sunMotif(118, 42, 1.05, primary, accent, animated)}
        ${crescentMotif(632, 40, 1.15, primary, accent, animated)}
        <path d="M375 35L377.5 40.5L383 43L377.5 45.5L375 51L372.5 45.5L367 43L372.5 40.5Z" fill="${accent}"/>
      </svg>
    `
  },

  renderBannerFrame(innerHtml: string, colors: PaletteColors, animated: boolean): string {
    const { primary, primaryMid, accent } = resolveMotionColors(colors)
    const badge = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        ${orbitSystem(28, 28, 1.02, primary, primaryMid, accent, animated)}
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
        <path d="M0 7Q90 1 178 7" fill="none" stroke="${primaryMid}" stroke-width="1.1" stroke-dasharray="3 4"/>
        <circle cx="8" cy="6" r="2" fill="${accent}">${pulseAnim('opacity', '1;0.35;1', '2.6s', animated)}</circle>
      </svg>
    `
    return sectionBadgeHtml(renderBadgeSvg(colors, animated), colors, animated, lineSvg)
  },

  renderSectionRail(colors: PaletteColors, animated: boolean, index: number): string {
    const { primary, primaryMid, accent } = resolveMotionColors(colors)
    const dur = `${(4.6 + ((index - 1) % 3) * 0.4).toFixed(1)}s`
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 15" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M4 10Q320 14 636 10" fill="none" stroke="${primaryMid}" stroke-width="0.85" stroke-dasharray="4 5"/>
        ${flowTrailSvg('M4 9Q320 2 636 9', primary, 1.55, '80 720', -800, dur, animated)}
        <circle cx="320" cy="5.5" r="2.6" fill="${accent}"/>
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
        <path d="M16 4L18 9.5L23.5 11.5L18 13.5L16 19L14 13.5L8.5 11.5L14 9.5Z" fill="${primary}">${pulseAnim('opacity', '1;0.45;1', '2.8s', animated)}</path>
        <circle cx="28" cy="7" r="1.8" fill="${accent}"/>
      </svg>
    `
  },

  renderH3Marker(colors: PaletteColors, animated: boolean): string {
    const { primary, accent } = resolveMotionColors(colors)
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" width="14" style="display:block;height:auto;max-width:100%;">
        <path d="M7 1.5L8.5 5.5L12.5 7L8.5 8.5L7 12.5L5.5 8.5L1.5 7L5.5 5.5Z" fill="none" stroke="${primary}" stroke-width="1.15"/>
        <circle cx="7" cy="7" r="1.6" fill="${accent}">${pulseAnim('r', '1.4;2.2;1.4', '2.8s', animated)}</circle>
      </svg>
    `
  },

  renderEndingDecor(colors: PaletteColors, animated: boolean): string {
    const { primary, accent } = resolveMotionColors(colors)
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 28" width="48" style="display:block;height:auto;max-width:100%;">
        ${sunMotif(24, 14, 0.78, primary, accent, animated)}
      </svg>
    `
  },

  renderCodeBadge(colors: PaletteColors, animated: boolean): string {
    const { primary, accent } = resolveMotionColors(colors)
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 14" width="28" style="display:block;height:auto;max-width:100%;">
        <ellipse cx="10" cy="7" rx="6" ry="3" fill="none" stroke="${primary}" stroke-width="1.15"/>
        <circle cx="21" cy="7" r="2.2" fill="${accent}">${pulseAnim('opacity', '1;0.35;1', '2.2s', animated)}</circle>
      </svg>
    `
  },

  renderDivider(colors: PaletteColors, animated: boolean): string {
    const { primary, primaryMid, accent } = resolveMotionColors(colors)
    const d = 'M20 10Q320 2 620 10'
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 16" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M20 11H620" stroke="${primaryMid}" stroke-width="0.8" stroke-dasharray="4 4"/>
        ${flowTrailSvg(d, primary, 1.65, '76 700', -776, '4.8s', animated)}
        <circle cx="320" cy="6" r="2.8" fill="${accent}"/>
      </svg>
    `
  },

  renderTail(colors: PaletteColors, animated: boolean, label = 'END · 继续阅读'): string {
    const { primary, primarySoft, primaryMid, accent } = resolveMotionColors(colors)
    const leftSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 84" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M14 54Q100 38 186 48" fill="none" stroke="${primarySoft}" stroke-width="0.9"/>
        ${sunMotif(74, 42, 1.25, primary, accent, animated)}
      </svg>
    `
    const rightSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 84" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M14 48Q100 38 186 54" fill="none" stroke="${primarySoft}" stroke-width="0.9"/>
        ${crescentMotif(126, 40, 1.35, primary, accent, animated)}
        <circle cx="156" cy="28" r="2" fill="${accent}"/>
        <circle cx="102" cy="30" r="1.8" fill="${primary}"/>
      </svg>
    `
    const spineSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 24" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M30 18Q375 8 720 18" fill="none" stroke="${primaryMid}" stroke-width="0.9" stroke-dasharray="4 4"/>
        ${flowTrailSvg('M30 12Q375 2 720 12', primary, 1.75, '96 840', -936, '4.8s', animated)}
      </svg>
    `
    return tailFrameHtml(leftSvg, rightSvg, spineSvg, label, colors)
  }
}
