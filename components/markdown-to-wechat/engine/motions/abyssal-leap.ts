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
  accent: string,
  ink: string,
  animated: boolean
): string {
  const swim = swayAnim('-4 0 0;4 0 0;-4 0 0', '4.2s', animated)
  const bubble = translateAnim('0 0;0 -6;0 0', '3.4s', animated)
  return `
    <g transform="translate(${cx} ${cy}) scale(${scale})">
      <g>
        <path d="M-16 4C-8 -9 6 -11 16 -2C8 4 -4 8 -16 4Z" fill="none" stroke="${ink}" stroke-width="1.35" stroke-linejoin="round"/>
        <path d="M-16 4L-23 -2L-21 4L-24 10Z" fill="none" stroke="${primary}" stroke-width="1.2" stroke-linejoin="round"/>
        <circle cx="8" cy="-2" r="1.8" fill="${accent}"/>
        ${swim}
      </g>
      <circle cx="20" cy="-10" r="2" fill="none" stroke="${primary}" stroke-width="1">${bubble}</circle>
    </g>
  `
}

function renderTocSvg(colors: PaletteColors, animated: boolean): string {
  const { primary, accent, muted, ink } = resolveMotionColors(colors)
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 84 60" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
      <ellipse cx="42" cy="44" rx="28" ry="6" fill="none" stroke="${muted}" stroke-width="0.9" opacity="0.6"/>
      ${flowTrailSvg('M10 44C26 36 58 36 74 44', primary, 1.5, '16 90', -106, '4s', animated)}
      ${leapingFish(42, 26, 0.9, primary, accent, ink, animated)}
    </svg>
  `
}

function renderBadgeSvg(colors: PaletteColors, animated: boolean): string {
  const { primary, accent, muted, ink } = resolveMotionColors(colors)
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 40" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
      <path d="M6 30C18 24 38 24 50 30" fill="none" stroke="${muted}" stroke-width="0.9" opacity="0.6"/>
      ${leapingFish(29, 18, 0.72, primary, accent, ink, animated)}
    </svg>
  `
}

function renderPlaceholderSvg(colors: PaletteColors, animated: boolean): string {
  const { primary, accent, muted, ink } = resolveMotionColors(colors)
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 110" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
      <ellipse cx="80" cy="82" rx="48" ry="10" fill="none" stroke="${muted}" stroke-width="0.9" opacity="0.55"/>
      <ellipse cx="80" cy="82" rx="30" ry="6" fill="none" stroke="${primary}" stroke-width="0.9" opacity="0.7">${pulseAnim('rx', '26;34;26', '3.8s', animated)}</ellipse>
      ${flowTrailSvg('M20 76C48 58 112 58 140 76', primary, 1.65, '24 140', -164, '4.2s', animated)}
      ${leapingFish(80, 46, 1.35, primary, accent, ink, animated)}
    </svg>
  `
}

export const abyssalLeapMotion: MotionPreset = {
  id: 'abyssal-leap',
  name: '沧溟鱼跃',

  renderBannerMotion(colors: PaletteColors, animated: boolean): string {
    const { primary, accent, muted, ink } = resolveMotionColors(colors)
    const wave = 'M30 58C130 40 230 72 375 54C520 36 620 68 720 50'
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 84" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M40 68C160 56 270 76 375 66C480 56 590 76 710 64" fill="none" stroke="${muted}" stroke-width="0.9" opacity="0.52"/>
        ${flowTrailSvg(wave, primary, 1.85, '90 820', -910, '4.6s', animated)}
        ${leapingFish(140, 38, 0.92, primary, accent, ink, animated)}
        ${leapingFish(610, 38, -0.92, primary, accent, ink, animated)}
        <circle cx="375" cy="54" r="3" fill="${accent}">${pulseAnim('r', '2.5;4;2.5', '3s', animated)}</circle>
      </svg>
    `
  },

  renderBannerFrame(innerHtml: string, colors: PaletteColors, animated: boolean): string {
    const { primary, accent, muted } = resolveMotionColors(colors)
    const badge = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <circle cx="28" cy="28" r="20" fill="none" stroke="${muted}" stroke-width="0.9" opacity="0.6"/>
        <circle cx="28" cy="28" r="12" fill="none" stroke="${primary}" stroke-width="1.5">${pulseAnim('r', '10;14;10', '3.4s', animated)}</circle>
        <path d="M18 28C23 22 33 22 38 28C33 32 23 32 18 28Z" fill="${accent}"/>
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
    const dur = `${(4.4 + ((index - 1) % 3) * 0.4).toFixed(1)}s`
    const rail = 'M4 8C110 4 210 12 320 7C430 2 530 12 636 7'
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 15" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M4 11H636" stroke="${muted}" stroke-width="0.8" opacity="0.48"/>
        ${flowTrailSvg(rail, primary, 1.65, '78 720', -798, dur, animated)}
        <circle cx="320" cy="7" r="2.6" fill="${accent}"/>
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
        <path d="M6 14C12 8 22 8 28 13C22 17 12 17 6 14Z" fill="none" stroke="${ink}" stroke-width="1.25"/>
        <path d="M6 14L2 10V18Z" fill="${primary}"/>
        <circle cx="22" cy="12.5" r="1.8" fill="${accent}">${pulseAnim('opacity', '1;0.35;1', '2.8s', animated)}</circle>
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
    const { primary, accent, ink } = resolveMotionColors(colors)
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 28" width="48" style="display:block;height:auto;max-width:100%;">
        <path d="M6 20C16 14 32 14 42 20" fill="none" stroke="${primary}" stroke-width="1.1" opacity="0.65"/>
        ${leapingFish(24, 12, 0.58, primary, accent, ink, animated)}
      </svg>
    `
  },

  renderCodeBadge(colors: PaletteColors, animated: boolean): string {
    const { primary, accent } = resolveMotionColors(colors)
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 14" width="28" style="display:block;height:auto;max-width:100%;">
        <path d="M3 8C8 4 14 4 19 8C14 11 8 11 3 8Z" fill="none" stroke="${primary}" stroke-width="1.2"/>
        <circle cx="23" cy="7" r="2.2" fill="${accent}">${pulseAnim('opacity', '1;0.35;1', '2.2s', animated)}</circle>
      </svg>
    `
  },

  renderDivider(colors: PaletteColors, animated: boolean): string {
    const { primary, accent, muted } = resolveMotionColors(colors)
    const d = 'M20 9C140 3 240 14 320 8C400 2 500 13 620 8'
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 16" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M20 12H620" stroke="${muted}" stroke-width="0.8" opacity="0.46"/>
        ${flowTrailSvg(d, primary, 1.7, '76 700', -776, '4.4s', animated)}
        <circle cx="320" cy="8" r="2.8" fill="${accent}"/>
      </svg>
    `
  },

  renderTail(colors: PaletteColors, animated: boolean, label = 'END · 继续阅读'): string {
    const { primary, accent, muted, ink } = resolveMotionColors(colors)
    const leftSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 84" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M14 58C60 44 130 66 188 52" fill="none" stroke="${muted}" stroke-width="1" opacity="0.65"/>
        ${leapingFish(82, 36, 1.05, primary, accent, ink, animated)}
      </svg>
    `
    const rightSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 84" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M12 52C70 66 140 44 186 58" fill="none" stroke="${muted}" stroke-width="1" opacity="0.65"/>
        ${leapingFish(118, 36, -1.05, primary, accent, ink, animated)}
      </svg>
    `
    const spine = 'M30 14C180 6 320 20 375 12C430 4 570 18 720 12'
    const spineSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 24" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        ${flowTrailSvg(spine, primary, 1.8, '96 840', -936, '4.6s', animated)}
      </svg>
    `
    return tailFrameHtml(leftSvg, rightSvg, spineSvg, label, colors)
  }
}
