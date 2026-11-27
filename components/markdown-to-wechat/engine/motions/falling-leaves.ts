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

function leafMotif(
  cx: number,
  cy: number,
  scale: number,
  angle: number,
  primary: string,
  primaryMid: string,
  accent: string,
  animated: boolean,
  swayDeg = 7,
  dur = '4.4s',
  begin = '0s'
): string {
  const sway = swayAnim(`-${swayDeg} 0 0;${swayDeg} 0 0;-${swayDeg} 0 0`, dur, animated, begin)
  const fillCol = swayDeg > 6 ? accent : primary
  return `
    <g transform="translate(${cx} ${cy}) rotate(${angle}) scale(${scale})">
      <g>
        <path d="M-12 0Q-16 1 -19 3" fill="none" stroke="${primary}" stroke-width="1.2" stroke-linecap="round"/>
        <path d="M-12 0C-5 -8 6 -8 13 0C6 8 -5 8 -12 0Z" fill="${fillCol}" fill-opacity="0.14" stroke="${primary}" stroke-width="1.25" stroke-linejoin="round"/>
        <path d="M-11 0H10M-3 0L2 -3.8M-1 0L4 3.5" fill="none" stroke="${primaryMid}" stroke-width="0.9" stroke-linecap="round"/>
        <circle cx="-2" cy="0" r="1.25" fill="${accent}"/>
        ${sway}
      </g>
    </g>
  `
}

function branchWithLeaves(
  cx: number,
  cy: number,
  scale: number,
  primary: string,
  primaryMid: string,
  accent: string,
  animated: boolean
): string {
  const leafSway1 = swayAnim('-5 -2 -1;5 -2 -1;-5 -2 -1', '4.2s', animated)
  const leafSway2 = swayAnim('4 10 -4;-4 10 -4;4 10 -4', '4.8s', animated, '0.6s')
  const leafSway3 = swayAnim('-4 20 1;4 20 1;-4 20 1', '4.5s', animated, '1.1s')
  return `
    <g transform="translate(${cx} ${cy}) scale(${scale})">
      <path d="M-24 6C-8 4 6 -2 24 -6" fill="none" stroke="${primary}" stroke-width="1.35" stroke-linecap="round"/>
      <path d="M-4 2L-10 -6M8 -2L14 -10M10 -3L17 4" fill="none" stroke="${primaryMid}" stroke-width="1.05" stroke-linecap="round"/>
      <g>
        <path d="M-10 -6C-15 -12 -12 -18 -5 -17C-2 -13 -4 -8 -10 -6Z" fill="${primary}" fill-opacity="0.14" stroke="${primary}" stroke-width="1.15" stroke-linejoin="round"/>
        ${leafSway1}
      </g>
      <g>
        <path d="M14 -10C15 -17 22 -19 25 -13C23 -8 18 -7 14 -10Z" fill="${accent}" fill-opacity="0.16" stroke="${primary}" stroke-width="1.15" stroke-linejoin="round"/>
        ${leafSway2}
      </g>
      <g>
        <path d="M17 4C23 2 28 7 25 12C20 12 16 9 17 4Z" fill="${primary}" fill-opacity="0.12" stroke="${primaryMid}" stroke-width="1.1" stroke-linejoin="round"/>
        ${leafSway3}
      </g>
    </g>
  `
}

function renderTocSvg(colors: PaletteColors, animated: boolean): string {
  const { primary, primarySoft, primaryMid, accent } = resolveMotionColors(colors)
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 84 32" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
      <path d="M10 26Q42 21 74 26" fill="none" stroke="${primarySoft}" stroke-width="0.9" stroke-linecap="round"/>
      ${branchWithLeaves(42, 16, 0.72, primary, primaryMid, accent, animated)}
    </svg>
  `
}

function renderBadgeSvg(colors: PaletteColors, animated: boolean): string {
  const { primary, primaryMid, accent } = resolveMotionColors(colors)
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 40" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
      ${branchWithLeaves(28, 22, 0.74, primary, primaryMid, accent, animated)}
    </svg>
  `
}

function renderPlaceholderSvg(colors: PaletteColors, animated: boolean): string {
  const { primary, primarySoft, primaryMid, accent } = resolveMotionColors(colors)
  const drift = translateAnim('0 0;6 5;0 0', '5.2s', animated)
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 110" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
      <path d="M18 80C56 64 104 92 142 74" fill="none" stroke="${primarySoft}" stroke-width="1"/>
      ${flowTrailSvg('M22 72C60 52 100 84 138 64', primary, 1.5, '22 140', -162, '4.6s', animated)}
      ${branchWithLeaves(54, 42, 1.05, primary, primaryMid, accent, animated)}
      <g>
        ${leafMotif(106, 56, 0.92, -26, primary, primaryMid, accent, animated, 8, '4.4s')}
        ${drift}
      </g>
    </svg>
  `
}

export const fallingLeavesMotion: MotionPreset = {
  id: 'falling-leaves',
  name: '落叶缤纷',

  renderBannerMotion(colors: PaletteColors, animated: boolean): string {
    const { primary, primaryMid, accent } = resolveMotionColors(colors)
    const breeze = 'M36 56C160 40 280 68 410 50C530 34 625 60 714 46'
    const drift = translateAnim('0 0;18 -4;0 0', '6.4s', animated)
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 84" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        ${flowTrailSvg(breeze, primary, 1.65, '84 820', -904, '5s', animated)}
        ${branchWithLeaves(132, 42, 1.05, primary, primaryMid, accent, animated)}
        <g>
          ${leafMotif(594, 38, 0.92, -18, primary, primaryMid, accent, animated, 7, '4.6s')}
          ${leafMotif(634, 48, 0.72, 22, primary, primaryMid, accent, animated, 8, '5.2s', '0.7s')}
          ${drift}
        </g>
      </svg>
    `
  },

  renderBannerFrame(innerHtml: string, colors: PaletteColors, animated: boolean): string {
    const { primary, primaryMid, accent } = resolveMotionColors(colors)
    const badge = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        ${leafMotif(22, 21, 0.92, -26, primary, primaryMid, accent, animated, 7, '4.4s')}
        ${leafMotif(36, 36, 0.74, 20, primary, primaryMid, accent, animated, 8, '5s', '0.8s')}
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
        <path d="M0 6C30 2 60 10 90 6C120 2 150 10 178 6" fill="none" stroke="${primary}" stroke-width="1.1" opacity="0.6"/>
        <path d="M84 6C87 3 91 3 94 6C91 9 87 9 84 6Z" fill="${accent}">${pulseAnim('opacity', '1;0.4;1', '2.8s', animated)}</path>
      </svg>
    `
    return sectionBadgeHtml(renderBadgeSvg(colors, animated), colors, animated, lineSvg)
  },

  renderSectionRail(colors: PaletteColors, animated: boolean, index: number): string {
    const { primary, primaryMid, accent } = resolveMotionColors(colors)
    const count = 22
    const durSec = 6.4 + ((index - 1) % 3) * 0.6
    const dur = `${durSec.toFixed(1)}s`
    const leaves = Array.from({ length: count }, (_, i) => {
      const cx = (18 + i * 28.6).toFixed(1)
      const cy = i % 2 === 0 ? 9.5 : 10.5
      const rot = i % 2 === 0 ? -12 : 12
      const fillCol = i % 3 === 1 ? accent : primary
      const begin = `${((durSec / count) * i).toFixed(2)}s`
      const sway = swayAnim('-6 0 0;6 0 0;-6 0 0', '4.2s', animated, `${(i * 0.18).toFixed(2)}s`)
      const fade = animated
        ? `<animate attributeName="opacity" values="0.48;0.95;0.48" keyTimes="0;0.2;1" dur="${dur}" begin="${begin}" repeatCount="indefinite"/>`
        : ''
      return `
        <g transform="translate(${cx} ${cy}) rotate(${rot})">
          <g opacity="${animated ? 0.52 : 0.72}">
            <path d="M-13 0H-10" stroke="${primaryMid}" stroke-width="1" stroke-linecap="round"/>
            <path d="M-10 0C-4 -5.5 4 -5.5 11 0C4 5.5 -4 5.5 -10 0Z" fill="${fillCol}" fill-opacity="0.16" stroke="${primary}" stroke-width="1.1" stroke-linejoin="round"/>
            <path d="M-9 0H8" stroke="${primaryMid}" stroke-width="0.8" stroke-linecap="round"/>
            ${sway}
            ${fade}
          </g>
        </g>
      `
    }).join('')
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 20" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        ${leaves}
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
        ${branchWithLeaves(18, 13, 0.56, primary, primaryMid, accent, animated)}
      </svg>
    `
  },

  renderH3Marker(colors: PaletteColors, animated: boolean): string {
    const { primary, accent } = resolveMotionColors(colors)
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" width="14" style="display:block;height:auto;max-width:100%;">
        <path d="M2 7C5 2.5 9 2.5 12 7C9 11.5 5 11.5 2 7Z" fill="none" stroke="${primary}" stroke-width="1.2" stroke-linejoin="round"/>
        <circle cx="7" cy="7" r="1.6" fill="${accent}">${pulseAnim('r', '1.3;2.1;1.3', '2.8s', animated)}</circle>
      </svg>
    `
  },

  renderEndingDecor(colors: PaletteColors, animated: boolean): string {
    const { primary, primaryMid, accent } = resolveMotionColors(colors)
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 28" width="48" style="display:block;height:auto;max-width:100%;">
        ${branchWithLeaves(24, 15, 0.68, primary, primaryMid, accent, animated)}
      </svg>
    `
  },

  renderCodeBadge(colors: PaletteColors, animated: boolean): string {
    const { primary, accent } = resolveMotionColors(colors)
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 14" width="28" style="display:block;height:auto;max-width:100%;">
        <path d="M3 7C6 3.5 11 3.5 14 7C11 10.5 6 10.5 3 7Z" fill="none" stroke="${primary}" stroke-width="1.1" stroke-linejoin="round"/>
        <circle cx="20" cy="7" r="2.2" fill="${accent}">${pulseAnim('opacity', '1;0.35;1', '2.4s', animated)}</circle>
      </svg>
    `
  },

  renderDivider(colors: PaletteColors, animated: boolean): string {
    const { primary, primaryMid, accent } = resolveMotionColors(colors)
    const d = 'M20 9C160 4 240 13 320 8C400 3 480 12 620 8'
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 16" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        ${flowTrailSvg(d, primary, 1.5, '72 700', -772, '4.8s', animated)}
        ${leafMotif(320, 8, 0.56, -10, primary, primaryMid, accent, animated, 5, '4.2s')}
      </svg>
    `
  },

  renderTail(colors: PaletteColors, animated: boolean, label = 'END · 继续阅读'): string {
    const { primary, primarySoft, primaryMid, accent } = resolveMotionColors(colors)
    const drift = translateAnim('0 0;8 4;0 0', '5.4s', animated)
    const leftSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 84" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M16 58Q88 48 182 58" fill="none" stroke="${primarySoft}" stroke-width="0.95"/>
        ${branchWithLeaves(92, 40, 1.12, primary, primaryMid, accent, animated)}
      </svg>
    `
    const rightSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 84" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M18 58Q112 48 184 58" fill="none" stroke="${primarySoft}" stroke-width="0.95"/>
        <g>
          ${leafMotif(96, 36, 0.95, -24, primary, primaryMid, accent, animated, 8, '4.4s')}
          ${leafMotif(132, 46, 0.72, 18, primary, primaryMid, accent, animated, 7, '5s', '0.7s')}
          ${drift}
        </g>
      </svg>
    `
    const spineSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 24" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        ${flowTrailSvg('M30 12C200 5 340 18 375 11C410 4 550 17 720 11', primary, 1.6, '92 840', -932, '4.8s', animated)}
      </svg>
    `
    return tailFrameHtml(leftSvg, rightSvg, spineSvg, label, colors)
  }
}
