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
  accent: string,
  ink: string,
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
      <circle cx="0" cy="0" r="16" fill="none" stroke="${ink}" stroke-width="1.05" opacity="0.6">${outerPulse}</circle>
      <circle cx="0" cy="0" r="10" fill="none" stroke="${primary}" stroke-width="1.25">${midPulse}</circle>
      <circle cx="0" cy="0" r="3" fill="${accent}">${pulseAnim('r', '2.6;3.6;2.6', '3s', animated)}</circle>
    </g>
  `
}

function renderTocSvg(colors: PaletteColors, animated: boolean): string {
  const { primary, accent, muted, ink } = resolveMotionColors(colors)
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 84 60" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
      <path d="M10 46H74" stroke="${muted}" stroke-width="0.9" opacity="0.58"/>
      ${rippleRings(42, 28, 1.05, primary, accent, ink, animated)}
    </svg>
  `
}

function renderBadgeSvg(colors: PaletteColors, animated: boolean): string {
  const { primary, accent, ink } = resolveMotionColors(colors)
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 40" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
      ${rippleRings(28, 20, 0.92, primary, accent, ink, animated)}
    </svg>
  `
}

function renderPlaceholderSvg(colors: PaletteColors, animated: boolean): string {
  const { primary, accent, muted, ink } = resolveMotionColors(colors)
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 110" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
      <path d="M22 84H138" stroke="${muted}" stroke-width="0.9" opacity="0.52"/>
      ${flowTrailSvg('M22 84H138', primary, 1.6, '22 140', -162, '4.6s', animated)}
      ${rippleRings(80, 50, 1.55, primary, accent, ink, animated)}
    </svg>
  `
}

export const zenRippleMotion: MotionPreset = {
  id: 'zen-ripple',
  name: '静水涟漪',

  renderBannerMotion(colors: PaletteColors, animated: boolean): string {
    const { primary, accent, muted, ink } = resolveMotionColors(colors)
    const spine = 'M30 54C160 54 240 46 375 46C510 46 590 54 720 54'
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 84" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M30 64H720" stroke="${muted}" stroke-width="0.85" opacity="0.5"/>
        ${flowTrailSvg(spine, primary, 1.85, '88 840', -928, '4.8s', animated)}
        ${rippleRings(118, 44, 1.05, primary, accent, ink, animated)}
        ${rippleRings(632, 44, 1.05, primary, accent, ink, animated)}
        <circle cx="375" cy="46" r="3" fill="${accent}"/>
      </svg>
    `
  },

  renderBannerFrame(innerHtml: string, colors: PaletteColors, animated: boolean): string {
    const { primary, accent, ink } = resolveMotionColors(colors)
    const badge = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        ${rippleRings(28, 28, 1.15, primary, accent, ink, animated)}
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
    const dur = `${(4.6 + ((index - 1) % 3) * 0.4).toFixed(1)}s`
    const rail = 'M4 8C160 8 240 4 320 4C400 4 480 8 636 8'
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 14" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M120 11H520" stroke="${muted}" stroke-width="0.8" opacity="0.48"/>
        ${flowTrailSvg(rail, primary, 1.65, '80 720', -800, dur, animated)}
        <circle cx="320" cy="4" r="2.8" fill="${accent}"/>
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
        ${rippleRings(18, 12, 0.58, primary, accent, ink, animated)}
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
    const { primary, accent, ink } = resolveMotionColors(colors)
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 28" width="48" style="display:block;height:auto;max-width:100%;">
        ${rippleRings(24, 14, 0.72, primary, accent, ink, animated)}
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
    const { primary, accent, muted } = resolveMotionColors(colors)
    const d = 'M20 9C160 9 240 5 320 5C400 5 480 9 620 9'
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 16" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M180 12H460" stroke="${muted}" stroke-width="0.8" opacity="0.48"/>
        ${flowTrailSvg(d, primary, 1.7, '76 700', -776, '4.8s', animated)}
        <circle cx="320" cy="5" r="2.8" fill="${accent}"/>
      </svg>
    `
  },

  renderTail(colors: PaletteColors, animated: boolean, label = 'END · 继续阅读'): string {
    const { primary, accent, muted, ink } = resolveMotionColors(colors)
    const leftSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 84" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M14 58H186" stroke="${muted}" stroke-width="0.9" opacity="0.52"/>
        ${rippleRings(68, 42, 1.12, primary, accent, ink, animated)}
        <line x1="94" y1="42" x2="186" y2="42" stroke="${ink}" stroke-width="1.25"/>
      </svg>
    `
    const rightSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 84" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M14 58H186" stroke="${muted}" stroke-width="0.9" opacity="0.52"/>
        <line x1="14" y1="42" x2="106" y2="42" stroke="${ink}" stroke-width="1.25"/>
        ${rippleRings(132, 42, 1.12, primary, accent, ink, animated)}
      </svg>
    `
    const spine = 'M30 14C200 14 280 7 375 7C470 7 550 14 720 14'
    const spineSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 24" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        ${flowTrailSvg(spine, primary, 1.8, '96 840', -936, '4.8s', animated)}
      </svg>
    `
    return tailFrameHtml(leftSvg, rightSvg, spineSvg, label, colors)
  }
}
