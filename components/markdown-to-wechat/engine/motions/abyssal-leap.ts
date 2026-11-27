import { MotionPreset, PaletteColors } from '../types'
import {
  bannerFrameHtml,
  flowTrailSvg,
  imagePlaceholderHtml,
  pulseAnim,
  resolveMotionColors,
  sectionBadgeHtml,
  swayAnim,
  tailFrameHtml,
  translateAnim
} from './helpers'

function leapingFish(
  cx: number,
  cy: number,
  scale: number,
  primary: string,
  primaryMid: string,
  accent: string,
  animated: boolean
): string {
  const swim = swayAnim('-3.5 0 0;3.5 0 0;-3.5 0 0', '4s', animated)
  const bubble = translateAnim('0 0;0 -5;0 0', '3.4s', animated)
  return `
    <g transform="translate(${cx} ${cy}) scale(${scale})">
      <g>
        <path d="M-14 2C-6 -9 7 -10 17 -1C9 7 -4 8 -14 2Z" fill="${primary}" fill-opacity="0.14" stroke="${primary}" stroke-width="1.3" stroke-linejoin="round"/>
        <path d="M-14 2L-23 -5C-20 0 -20 4 -23 9L-14 2Z" fill="${primaryMid}" stroke="${primary}" stroke-width="1.1" stroke-linejoin="round"/>
        <path d="M-2 -6C1 -11 5 -11 7 -6" fill="none" stroke="${primary}" stroke-width="1.1" stroke-linecap="round"/>
        <path d="M5 -4C7 -1 7 2 5 4" fill="none" stroke="${primaryMid}" stroke-width="1" stroke-linecap="round"/>
        <circle cx="10.5" cy="-1.2" r="1.6" fill="${accent}"/>
        ${swim}
      </g>
      <circle cx="20" cy="-9" r="1.8" fill="none" stroke="${primary}" stroke-width="1">${bubble}</circle>
    </g>
  `
}

function bubbleCluster(
  cx: number,
  cy: number,
  primary: string,
  accent: string,
  animated: boolean
): string {
  const rise1 = translateAnim('0 0;0 -5;0 0', '3.2s', animated)
  const rise2 = translateAnim('0 0;0 -7;0 0', '3.8s', animated)
  return `
    <g transform="translate(${cx} ${cy})">
      <circle cx="-12" cy="4" r="3.5" fill="none" stroke="${primary}" stroke-width="1.15">${rise1}</circle>
      <circle cx="2" cy="-4" r="5" fill="none" stroke="${accent}" stroke-width="1.25">${rise2}</circle>
      <circle cx="14" cy="2" r="2.2" fill="${primary}" opacity="0.75"/>
    </g>
  `
}

function renderTocSvg(colors: PaletteColors, animated: boolean): string {
  const { primary, primarySoft, primaryMid, accent } = resolveMotionColors(colors)
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 84 60" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
      <ellipse cx="42" cy="44" rx="28" ry="6" fill="none" stroke="${primarySoft}" stroke-width="0.95"/>
      ${flowTrailSvg('M10 44C26 36 58 36 74 44', primary, 1.5, '16 90', -106, '4s', animated)}
      ${leapingFish(42, 26, 0.9, primary, primaryMid, accent, animated)}
    </svg>
  `
}

function renderBadgeSvg(colors: PaletteColors, animated: boolean): string {
  const { primary, primaryMid, accent } = resolveMotionColors(colors)
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 40" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
      ${leapingFish(28, 17, 0.72, primary, primaryMid, accent, animated)}
      ${flowTrailSvg('M6 34C18 29 38 29 50 34', accent, 1.35, '12 50', -62, '3.6s', animated)}
    </svg>
  `
}

function renderPlaceholderSvg(colors: PaletteColors, animated: boolean): string {
  const { primary, primarySoft, primaryMid, accent } = resolveMotionColors(colors)
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 110" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
      <ellipse cx="80" cy="82" rx="48" ry="10" fill="none" stroke="${primarySoft}" stroke-width="1"/>
      <ellipse cx="80" cy="82" rx="30" ry="6" fill="none" stroke="${primary}" stroke-width="0.95">${pulseAnim('rx', '26;34;26', '3.8s', animated)}</ellipse>
      ${flowTrailSvg('M20 76C48 58 112 58 140 76', primary, 1.65, '24 140', -164, '4.2s', animated)}
      ${leapingFish(80, 46, 1.35, primary, primaryMid, accent, animated)}
    </svg>
  `
}

export const abyssalLeapMotion: MotionPreset = {
  id: 'abyssal-leap',
  name: '沧溟鱼跃',

  renderBannerMotion(colors: PaletteColors, animated: boolean): string {
    const { primary, primaryMid, accent } = resolveMotionColors(colors)
    const wave1 = 'M30 56C130 40 230 70 375 52C520 34 620 66 720 48'
    const wave2 = 'M30 66C160 54 270 76 375 64C480 52 590 74 720 60'
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 84" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        ${flowTrailSvg(wave1, primary, 1.8, '90 820', -910, '4.6s', animated)}
        <path d="${wave2}" fill="none" stroke="${primaryMid}" stroke-width="1" stroke-dasharray="5 5"/>
        ${flowTrailSvg(wave2, accent, 1.4, '56 820', 876, '5.2s', animated)}
        ${leapingFish(132, 36, 0.95, primary, primaryMid, accent, animated)}
        ${bubbleCluster(620, 38, primary, accent, animated)}
        <circle cx="375" cy="52" r="3" fill="${accent}">${pulseAnim('r', '2.5;4;2.5', '3s', animated)}</circle>
      </svg>
    `
  },

  renderBannerFrame(innerHtml: string, colors: PaletteColors, animated: boolean): string {
    const { primary, primarySoft, primaryMid, accent } = resolveMotionColors(colors)
    const badge = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <circle cx="28" cy="28" r="21" fill="none" stroke="${primarySoft}" stroke-width="1"/>
        ${leapingFish(29, 28, 0.92, primary, primaryMid, accent, animated)}
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
        <path d="M0 6C30 2 60 10 90 6C120 2 150 10 178 6" fill="none" stroke="${primary}" stroke-width="1.15" opacity="0.6"/>
        <circle cx="14" cy="6" r="2.2" fill="${accent}">${pulseAnim('opacity', '1;0.35;1', '2.6s', animated)}</circle>
      </svg>
    `
    return sectionBadgeHtml(renderBadgeSvg(colors, animated), colors, animated, lineSvg)
  },

  renderSectionRail(colors: PaletteColors, animated: boolean, index: number): string {
    const { primary, primaryMid, accent } = resolveMotionColors(colors)
    const dur = `${(4.4 + ((index - 1) % 3) * 0.4).toFixed(1)}s`
    const rail1 = 'M4 6C110 1 210 11 320 6C430 1 530 11 636 6'
    const rail2 = 'M4 11C130 14 230 8 320 11C410 14 510 8 636 11'
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 16" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        ${flowTrailSvg(rail1, primary, 1.55, '78 720', -798, dur, animated)}
        <path d="${rail2}" fill="none" stroke="${primaryMid}" stroke-width="0.9" stroke-dasharray="4 4"/>
        ${flowTrailSvg(rail2, accent, 1.3, '52 720', 772, '5.2s', animated)}
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
        ${bubbleCluster(18, 12, primary, accent, animated)}
      </svg>
    `
  },

  renderH3Marker(colors: PaletteColors, animated: boolean): string {
    const { primary, accent } = resolveMotionColors(colors)
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" width="14" style="display:block;height:auto;max-width:100%;">
        <path d="M2 7C5 3 9 3 12 7C9 11 5 11 2 7Z" fill="none" stroke="${primary}" stroke-width="1.25"/>
        <circle cx="8" cy="7" r="1.8" fill="${accent}">${pulseAnim('r', '1.4;2.2;1.4', '2.8s', animated)}</circle>
      </svg>
    `
  },

  renderEndingDecor(colors: PaletteColors, animated: boolean): string {
    const { primary, primaryMid, accent } = resolveMotionColors(colors)
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 28" width="48" style="display:block;height:auto;max-width:100%;">
        <path d="M6 20C16 14 32 14 42 20" fill="none" stroke="${primaryMid}" stroke-width="1.1"/>
        ${leapingFish(24, 12, 0.58, primary, primaryMid, accent, animated)}
      </svg>
    `
  },

  renderCodeBadge(colors: PaletteColors, animated: boolean): string {
    const { primary, accent } = resolveMotionColors(colors)
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 14" width="28" style="display:block;height:auto;max-width:100%;">
        <circle cx="8" cy="7" r="3" fill="none" stroke="${primary}" stroke-width="1.15"/>
        <circle cx="19" cy="7" r="2.4" fill="${accent}">${pulseAnim('opacity', '1;0.35;1', '2.2s', animated)}</circle>
      </svg>
    `
  },

  renderDivider(colors: PaletteColors, animated: boolean): string {
    const { primary, primaryMid, accent } = resolveMotionColors(colors)
    const d = 'M20 9C140 3 240 14 320 8C400 2 500 13 620 8'
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 16" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M20 12H620" stroke="${primaryMid}" stroke-width="0.8" stroke-dasharray="4 4"/>
        ${flowTrailSvg(d, primary, 1.65, '76 700', -776, '4.4s', animated)}
        <circle cx="320" cy="8" r="2.8" fill="${accent}"/>
      </svg>
    `
  },

  renderTail(colors: PaletteColors, animated: boolean, label = 'END · 继续阅读'): string {
    const { primary, primarySoft, primaryMid, accent } = resolveMotionColors(colors)
    const leftSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 84" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M14 58C60 44 130 66 188 52" fill="none" stroke="${primarySoft}" stroke-width="1"/>
        ${leapingFish(82, 36, 1.05, primary, primaryMid, accent, animated)}
      </svg>
    `
    const rightSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 84" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M12 52C70 66 140 44 186 58" fill="none" stroke="${primarySoft}" stroke-width="1"/>
        ${bubbleCluster(128, 36, primary, accent, animated)}
      </svg>
    `
    const spineSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 24" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        ${flowTrailSvg('M30 12C180 4 320 18 375 10C430 2 570 16 720 10', primary, 1.75, '96 840', -936, '4.6s', animated)}
        ${flowTrailSvg('M30 18C200 22 320 12 375 18C430 22 550 14 720 18', accent, 1.25, '64 840', 904, '5.2s', animated)}
      </svg>
    `
    return tailFrameHtml(leftSvg, rightSvg, spineSvg, label, colors)
  }
}
