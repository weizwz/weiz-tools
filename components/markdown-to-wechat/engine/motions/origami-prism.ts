import { MotionPreset, PaletteColors } from '../types'
import {
  bannerFrameHtml,
  flowTrailSvg,
  imagePlaceholderHtml,
  pulseAnim,
  resolveMotionColors,
  scaleAnim,
  sectionBadgeHtml,
  tailFrameHtml
} from './helpers'

function prismMotif(
  cx: number,
  cy: number,
  scale: number,
  primary: string,
  primaryMid: string,
  accent: string,
  animated: boolean
): string {
  const breathe = scaleAnim('1 1;1.07 1.07;1 1', '4s', animated)
  return `
    <g transform="translate(${cx} ${cy}) scale(${scale})">
      <g>
        <polygon points="0,-18 16,0 0,18 -16,0" fill="none" stroke="${primary}" stroke-width="1.3" stroke-linejoin="round"/>
        <path d="M0 -18V18M-16 0H16" stroke="${primaryMid}" stroke-width="1"/>
        <polygon points="0,-18 16,0 0,0" fill="${accent}" opacity="0.28"/>
        ${breathe}
      </g>
      <circle cx="0" cy="0" r="2.2" fill="${accent}"/>
    </g>
  `
}

function foldedWing(
  cx: number,
  cy: number,
  scale: number,
  primary: string,
  primaryMid: string,
  accent: string,
  animated: boolean
): string {
  return `
    <g transform="translate(${cx} ${cy}) scale(${scale})">
      <polygon points="-16,6 0,-12 16,6 0,0" fill="none" stroke="${primary}" stroke-width="1.25" stroke-linejoin="round"/>
      <polygon points="0,-12 16,6 0,0" fill="${accent}" opacity="0.26"/>
      <line x1="0" y1="-12" x2="0" y2="8" stroke="${primaryMid}" stroke-width="0.95"/>
      <circle cx="0" cy="-12" r="2" fill="${accent}">${pulseAnim('opacity', '1;0.35;1', '2.8s', animated)}</circle>
    </g>
  `
}

function renderTocSvg(colors: PaletteColors, animated: boolean): string {
  const { primary, primarySoft, primaryMid, accent } = resolveMotionColors(colors)
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 84 32" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
      <path d="M10 27L30 16L54 16L74 27" fill="none" stroke="${primarySoft}" stroke-width="0.9"/>
      ${prismMotif(42, 16, 0.64, primary, primaryMid, accent, animated)}
    </svg>
  `
}

function renderBadgeSvg(colors: PaletteColors, animated: boolean): string {
  const { primary, primaryMid, accent } = resolveMotionColors(colors)
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 40" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
      ${foldedWing(28, 22, 1.05, primary, primaryMid, accent, animated)}
    </svg>
  `
}

function renderPlaceholderSvg(colors: PaletteColors, animated: boolean): string {
  const { primary, primarySoft, primaryMid, accent } = resolveMotionColors(colors)
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 110" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
      <path d="M18 82L54 54H106L142 82" fill="none" stroke="${primarySoft}" stroke-width="0.95"/>
      ${flowTrailSvg('M18 82L54 54H106L142 82', primary, 1.65, '24 150', -174, '4.4s', animated)}
      ${prismMotif(80, 50, 1.45, primary, primaryMid, accent, animated)}
    </svg>
  `
}

export const origamiPrismMotion: MotionPreset = {
  id: 'origami-prism',
  name: '折纸棱镜',

  renderBannerMotion(colors: PaletteColors, animated: boolean): string {
    const { primary, primaryMid, accent } = resolveMotionColors(colors)
    const spine = 'M30 56L190 42L240 56L510 56L560 42L720 56'
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 84" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M30 64H720" stroke="${primaryMid}" stroke-width="0.9" stroke-dasharray="5 4"/>
        ${flowTrailSvg(spine, primary, 1.8, '92 840', -932, '4.4s', animated)}
        ${prismMotif(118, 42, 0.95, primary, primaryMid, accent, animated)}
        ${foldedWing(626, 44, 1.1, primary, primaryMid, accent, animated)}
        <polygon points="375,44 385,52 375,60 365,52" fill="${accent}" opacity="0.85"/>
      </svg>
    `
  },

  renderBannerFrame(innerHtml: string, colors: PaletteColors, animated: boolean): string {
    const { primary, primaryMid, accent } = resolveMotionColors(colors)
    const badge = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        ${prismMotif(28, 28, 1.05, primary, primaryMid, accent, animated)}
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
        <path d="M0 9L24 3L48 9L72 3L96 9L120 3L144 9L168 3L178 6" fill="none" stroke="${primary}" stroke-width="1.1" opacity="0.62"/>
        <polygon points="6,3 10,6 6,9 2,6" fill="${accent}"/>
      </svg>
    `
    return sectionBadgeHtml(renderBadgeSvg(colors, animated), colors, animated, lineSvg)
  },

  renderSectionRail(colors: PaletteColors, animated: boolean, index: number): string {
    const { primary, primaryMid, accent } = resolveMotionColors(colors)
    const dur = `${(4.2 + ((index - 1) % 3) * 0.4).toFixed(1)}s`
    const rail = 'M4 9L160 9L180 3L200 9L440 9L460 3L480 9L636 9'
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 14" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M4 11H636" stroke="${primaryMid}" stroke-width="0.8" stroke-dasharray="4 4"/>
        ${flowTrailSvg(rail, primary, 1.55, '80 720', -800, dur, animated)}
        <polygon points="320,2 325,6 320,10 315,6" fill="${accent}"/>
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
        <polygon points="10,4 26,4 18,18" fill="none" stroke="${primary}" stroke-width="1.2" stroke-linejoin="round"/>
        <polygon points="18,4 26,4 18,18" fill="${accent}" opacity="0.32">${pulseAnim('opacity', '0.2;0.55;0.2', '2.8s', animated)}</polygon>
      </svg>
    `
  },

  renderH3Marker(colors: PaletteColors, animated: boolean): string {
    const { primary, accent } = resolveMotionColors(colors)
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" width="14" style="display:block;height:auto;max-width:100%;">
        <polygon points="7,1 13,7 7,13 1,7" fill="none" stroke="${primary}" stroke-width="1.25"/>
        <polygon points="7,4 10,7 7,10 4,7" fill="${accent}">${pulseAnim('opacity', '1;0.4;1', '2.8s', animated)}</polygon>
      </svg>
    `
  },

  renderEndingDecor(colors: PaletteColors, animated: boolean): string {
    const { primary, primaryMid, accent } = resolveMotionColors(colors)
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 28" width="48" style="display:block;height:auto;max-width:100%;">
        ${foldedWing(24, 15, 0.85, primary, primaryMid, accent, animated)}
      </svg>
    `
  },

  renderCodeBadge(colors: PaletteColors, animated: boolean): string {
    const { primary, accent } = resolveMotionColors(colors)
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 14" width="28" style="display:block;height:auto;max-width:100%;">
        <polygon points="9,2 14,7 9,12 4,7" fill="none" stroke="${primary}" stroke-width="1.2"/>
        <polygon points="21,4 24,7 21,10 18,7" fill="${accent}">${pulseAnim('opacity', '1;0.35;1', '2.2s', animated)}</polygon>
      </svg>
    `
  },

  renderDivider(colors: PaletteColors, animated: boolean): string {
    const { primary, primaryMid, accent } = resolveMotionColors(colors)
    const d = 'M20 9L240 9L264 4L376 4L400 9L620 9'
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 16" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M180 12H460" stroke="${primaryMid}" stroke-width="0.85" stroke-dasharray="4 4"/>
        ${flowTrailSvg(d, primary, 1.65, '76 700', -776, '4.4s', animated)}
        <polygon points="320,1 325,5 320,9 315,5" fill="${accent}"/>
      </svg>
    `
  },

  renderTail(colors: PaletteColors, animated: boolean, label = 'END · 继续阅读'): string {
    const { primary, primarySoft, primaryMid, accent } = resolveMotionColors(colors)
    const leftSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 84" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M14 58L74 42H186" fill="none" stroke="${primarySoft}" stroke-width="0.9"/>
        ${prismMotif(68, 42, 1.15, primary, primaryMid, accent, animated)}
      </svg>
    `
    const rightSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 84" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M14 58H186" fill="none" stroke="${primarySoft}" stroke-width="0.9"/>
        ${foldedWing(118, 46, 0.9, primary, primaryMid, accent, animated)}
        ${foldedWing(152, 36, 1.05, primary, primaryMid, accent, animated)}
      </svg>
    `
    const spineSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 24" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M30 17H720" stroke="${primaryMid}" stroke-width="0.85" stroke-dasharray="5 4"/>
        ${flowTrailSvg('M30 12L220 12L250 5L500 5L530 12L720 12', primary, 1.75, '96 840', -936, '4.4s', animated)}
      </svg>
    `
    return tailFrameHtml(leftSvg, rightSvg, spineSvg, label, colors)
  }
}
