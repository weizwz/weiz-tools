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

function leapingFish(cx: number, cy: number, scale: number, primary: string, primaryMid: string, accent: string, animated: boolean): string {
  const swim = swayAnim('-3 0 0;3 0 0;-3 0 0', '3.2s', animated)
  const tailWag = swayAnim('-16 -14 2;16 -14 2;-16 -14 2', '0.68s', animated)
  const bubble = translateAnim('0 0;0 -5;0 0', '3.4s', animated)
  return `
    <g transform="translate(${cx} ${cy}) scale(${scale})">
      <g>
        <path d="M-14 2C-6 -9 7 -10 17 -1C9 7 -4 8 -14 2Z" fill="${primary}" fill-opacity="0.14" stroke="${primary}" stroke-width="1.3" stroke-linejoin="round"/>
        <g>
          <path d="M-14 2L-23 -5C-20 0 -20 4 -23 9L-14 2Z" fill="${primaryMid}" stroke="${primary}" stroke-width="1.1" stroke-linejoin="round"/>
          ${tailWag}
        </g>
        <path d="M-2 -6C1 -11 5 -11 7 -6" fill="none" stroke="${primary}" stroke-width="1.1" stroke-linecap="round"/>
        <path d="M5 -4C7 -1 7 2 5 4" fill="none" stroke="${primaryMid}" stroke-width="1" stroke-linecap="round"/>
        <circle cx="10.5" cy="-1.2" r="1.6" fill="${accent}"/>
        ${swim}
      </g>
      <circle cx="20" cy="-9" r="1.8" fill="none" stroke="${primary}" stroke-width="1">${bubble}</circle>
    </g>
  `
}

function lotusLeaf(cx: number, cy: number, scale: number, primary: string, primaryMid: string, accent: string, animated: boolean, swayDeg = 5): string {
  const sway = swayAnim(`-${swayDeg} 0 19;${swayDeg} 0 19;-${swayDeg} 0 19`, '4.6s', animated)
  return `
    <g transform="translate(${cx} ${cy}) scale(${scale})">
      <g>
        <path d="M0 7Q-1.8 13 -0.5 19" fill="none" stroke="${primary}" stroke-width="1.25" stroke-linecap="round"/>
        <path d="M0 8C-12 8 -18 1 -16 -6C-14 -12 -6 -13 -1 -9L0 -4L2 -10C8 -13 15 -11 16 -5C17 2 11 8 0 8Z" fill="${primary}" fill-opacity="0.11" stroke="${primary}" stroke-width="1.25" stroke-linejoin="round"/>
        <path d="M0 0L-9 -5M0 0L-11 2M0 0L10 -4M0 0L10 3M0 0L0 7" fill="none" stroke="${primaryMid}" stroke-width="0.85" stroke-linecap="round"/>
        <circle cx="0" cy="0" r="1.4" fill="${accent}"/>
        ${sway}
      </g>
    </g>
  `
}

function lotusFlower(cx: number, cy: number, scale: number, primary: string, primaryMid: string, accent: string, animated: boolean, swayDeg = 0): string {
  const sway = swayDeg > 0 ? swayAnim(`-${swayDeg} 0 10;${swayDeg} 0 10;-${swayDeg} 0 10`, '4.4s', animated) : ''
  return `
    <g transform="translate(${cx} ${cy}) scale(${scale})">
      <g>
        <path d="M0 7C-12 5 -16 -3 -13 -9C-9 -6 -4 0 0 7Z" fill="${primary}" fill-opacity="0.08" stroke="${primaryMid}" stroke-width="1.05" stroke-linejoin="round"/>
        <path d="M0 7C12 5 16 -3 13 -9C9 -6 4 0 0 7Z" fill="${primary}" fill-opacity="0.08" stroke="${primaryMid}" stroke-width="1.05" stroke-linejoin="round"/>
        <path d="M0 7C-8 2 -11 -6 -7 -12C-3 -8 -1 -2 0 7Z" fill="${primary}" fill-opacity="0.12" stroke="${primary}" stroke-width="1.15" stroke-linejoin="round"/>
        <path d="M0 7C8 2 11 -6 7 -12C3 -8 1 -2 0 7Z" fill="${primary}" fill-opacity="0.12" stroke="${primary}" stroke-width="1.15" stroke-linejoin="round"/>
        <path d="M0 -14C5 -7 5 2 0 7C-5 2 -5 -7 0 -14Z" fill="${accent}" fill-opacity="0.18" stroke="${primary}" stroke-width="1.25" stroke-linejoin="round"/>
        <path d="M-9 9Q0 11.5 9 9" fill="none" stroke="${primaryMid}" stroke-width="1" stroke-linecap="round"/>
        <circle cx="0" cy="-2" r="1.7" fill="${accent}">${pulseAnim('r', '1.4;2.1;1.4', '2.8s', animated)}</circle>
        ${sway}
      </g>
    </g>
  `
}

function renderTocSvg(colors: PaletteColors, animated: boolean): string {
  const { primary, primarySoft, primaryMid, accent } = resolveMotionColors(colors)
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 84 32" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
      <path d="M12 27Q42 23 72 27" fill="none" stroke="${primarySoft}" stroke-width="0.95" stroke-linecap="round"/>
      ${lotusLeaf(42, 13, 0.68, primary, primaryMid, accent, animated, 5)}
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
  id: 'lotus-leap',
  name: '荷下鱼跃',

  renderBannerMotion(colors: PaletteColors, animated: boolean): string {
    const { primary, primarySoft, primaryMid, accent } = resolveMotionColors(colors)
    const wave1 = 'M30 42C120 30 210 54 300 40C390 26 480 52 570 38C635 28 680 46 720 38'
    const wave2 = 'M30 55C140 44 240 66 340 52C440 38 540 64 640 50C680 44 702 56 720 52'
    const wave3 = 'M30 68C130 58 220 76 320 65C420 54 520 74 620 63C670 57 698 68 720 64'
    const fishPathAnim = animated
      ? `<animateTransform attributeName="transform" type="translate" values="120 51;290 47;460 53;620 50;460 54;290 48;120 51" keyTimes="0;0.17;0.34;0.5;0.67;0.84;1" dur="12s" repeatCount="indefinite"/>`
      : ''
    const fishFlipAnim = animated
      ? `<animateTransform attributeName="transform" type="scale" values="1 1;1 1;-1 1;-1 1;1 1" keyTimes="0;0.495;0.5;0.995;1" calcMode="discrete" dur="12s" repeatCount="indefinite"/>`
      : ''
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 84" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        ${flowTrailSvg(wave1, primarySoft, 1.35, '72 820', 892, '5.6s', animated)}
        ${flowTrailSvg(wave2, primary, 1.75, '90 820', -910, '4.6s', animated)}
        <g transform="${animated ? 'translate(120 51)' : 'translate(375 51)'}">
          ${fishPathAnim}
          <g>
            ${fishFlipAnim}
            ${leapingFish(0, 0, 0.94, primary, primaryMid, accent, animated)}
          </g>
        </g>
        ${flowTrailSvg(wave3, accent, 1.35, '56 820', 876, '5.2s', animated)}
      </svg>
    `
  },

  renderBannerFrame(innerHtml: string, colors: PaletteColors, animated: boolean): string {
    const { primary, primarySoft, primaryMid, accent } = resolveMotionColors(colors)
    const badge = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M10 42Q28 37 46 42" fill="none" stroke="${primarySoft}" stroke-width="1" stroke-linecap="round"/>
        ${lotusLeaf(28, 22, 1.02, primary, primaryMid, accent, animated, 6)}
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
        <circle cx="90" cy="6" r="2.4" fill="${accent}">${pulseAnim('opacity', '1;0.35;1', '2.6s', animated)}</circle>
      </svg>
    `
    return sectionBadgeHtml(renderBadgeSvg(colors, animated), colors, animated, lineSvg)
  },

  renderSectionRail(colors: PaletteColors, animated: boolean, index: number): string {
    const { primary, accent } = resolveMotionColors(colors)
    const dur = `${(4.4 + ((index - 1) % 3) * 0.4).toFixed(1)}s`
    const rail1 = 'M4 10C44 2 84 18 124 10C164 2 204 18 244 10C284 2 324 18 364 10C404 2 444 18 484 10C524 2 564 18 604 10C620 7 628 11 636 10'
    const rail2 = 'M4 15C44 22 84 7 124 15C164 22 204 7 244 15C284 22 324 7 364 15C404 22 444 7 484 15C524 22 564 7 604 15C620 18 628 14 636 15'
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 24" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        ${flowTrailSvg(rail1, primary, 1.65, '84 740', -824, dur, animated)}
        ${flowTrailSvg(rail2, accent, 1.4, '60 740', 800, '5.2s', animated)}
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
        ${lotusFlower(18, 13, 0.78, primary, primaryMid, accent, animated, 0)}
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
        <path d="M8 23Q24 20 40 23" fill="none" stroke="${primaryMid}" stroke-width="1" stroke-linecap="round"/>
        ${lotusFlower(24, 14, 0.88, primary, primaryMid, accent, animated, 5)}
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
        <path d="M12 56C70 68 140 48 186 58" fill="none" stroke="${primarySoft}" stroke-width="1"/>
        ${lotusLeaf(128, 34, 1.15, primary, primaryMid, accent, animated, 5)}
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
