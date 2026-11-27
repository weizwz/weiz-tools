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
  accent: string,
  ink: string,
  animated: boolean
): string {
  const breathe = scaleAnim('1 1;1.07 1.07;1 1', '4s', animated)
  return `
    <g transform="translate(${cx} ${cy}) scale(${scale})">
      <g>
        <polygon points="0,-18 16,0 0,18 -16,0" fill="none" stroke="${ink}" stroke-width="1.3" stroke-linejoin="round"/>
        <path d="M0 -18V18M-16 0H16" stroke="${primary}" stroke-width="1" opacity="0.8"/>
        <polygon points="0,-18 16,0 0,0" fill="${accent}" opacity="0.26"/>
        ${breathe}
      </g>
      <circle cx="0" cy="0" r="2.2" fill="${accent}"/>
    </g>
  `
}

function renderTocSvg(colors: PaletteColors, animated: boolean): string {
  const { primary, accent, muted, ink } = resolveMotionColors(colors)
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 84 60" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
      <path d="M10 46L30 30L54 30L74 46" fill="none" stroke="${muted}" stroke-width="0.9" opacity="0.58"/>
      ${prismMotif(42, 28, 0.96, primary, accent, ink, animated)}
    </svg>
  `
}

function renderBadgeSvg(colors: PaletteColors, animated: boolean): string {
  const { primary, accent, ink } = resolveMotionColors(colors)
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 40" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
      ${prismMotif(28, 20, 0.86, primary, accent, ink, animated)}
    </svg>
  `
}

function renderPlaceholderSvg(colors: PaletteColors, animated: boolean): string {
  const { primary, accent, muted, ink } = resolveMotionColors(colors)
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 110" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
      <path d="M18 82L54 54H106L142 82" fill="none" stroke="${muted}" stroke-width="0.9" opacity="0.55"/>
      ${flowTrailSvg('M18 82L54 54H106L142 82', primary, 1.65, '24 150', -174, '4.4s', animated)}
      ${prismMotif(80, 50, 1.45, primary, accent, ink, animated)}
    </svg>
  `
}

export const origamiPrismMotion: MotionPreset = {
  id: 'origami-prism',
  name: '折纸棱镜',

  renderBannerMotion(colors: PaletteColors, animated: boolean): string {
    const { primary, accent, muted, ink } = resolveMotionColors(colors)
    const spine = 'M30 56L190 42L240 56L510 56L560 42L720 56'
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 84" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M30 64H720" stroke="${muted}" stroke-width="0.85" opacity="0.5"/>
        ${flowTrailSvg(spine, primary, 1.85, '92 840', -932, '4.4s', animated)}
        ${prismMotif(118, 42, 0.95, primary, accent, ink, animated)}
        ${prismMotif(632, 42, 0.95, primary, accent, ink, animated)}
        <polygon points="375,44 385,52 375,60 365,52" fill="${accent}" opacity="0.85"/>
      </svg>
    `
  },

  renderBannerFrame(innerHtml: string, colors: PaletteColors, animated: boolean): string {
    const { primary, accent, ink } = resolveMotionColors(colors)
    const badge = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        ${prismMotif(28, 28, 1.05, primary, accent, ink, animated)}
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
    const dur = `${(4.2 + ((index - 1) % 3) * 0.4).toFixed(1)}s`
    const rail = 'M4 9L240 9L264 3L376 3L400 9L636 9'
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 14" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M120 12H520" stroke="${muted}" stroke-width="0.8" opacity="0.48"/>
        ${flowTrailSvg(rail, primary, 1.65, '80 720', -800, dur, animated)}
        <polygon points="320,1 325,5 320,9 315,5" fill="${accent}"/>
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
        ${prismMotif(18, 12, 0.56, primary, accent, ink, animated)}
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
    const { primary, accent, ink } = resolveMotionColors(colors)
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 28" width="48" style="display:block;height:auto;max-width:100%;">
        ${prismMotif(24, 14, 0.68, primary, accent, ink, animated)}
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
    const { primary, accent, muted } = resolveMotionColors(colors)
    const d = 'M20 9L240 9L264 4L376 4L400 9L620 9'
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 16" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M180 12H460" stroke="${muted}" stroke-width="0.8" opacity="0.48"/>
        ${flowTrailSvg(d, primary, 1.7, '76 700', -776, '4.4s', animated)}
        <polygon points="320,1 325,5 320,9 315,5" fill="${accent}"/>
      </svg>
    `
  },

  renderTail(colors: PaletteColors, animated: boolean, label = 'END · 继续阅读'): string {
    const { primary, accent, muted, ink } = resolveMotionColors(colors)
    const leftSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 84" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M14 58L74 42H186" fill="none" stroke="${muted}" stroke-width="0.9" opacity="0.55"/>
        ${prismMotif(68, 42, 1.1, primary, accent, ink, animated)}
        <line x1="92" y1="42" x2="186" y2="42" stroke="${ink}" stroke-width="1.25"/>
      </svg>
    `
    const rightSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 84" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M14 42H126L186 58" fill="none" stroke="${muted}" stroke-width="0.9" opacity="0.55"/>
        <line x1="14" y1="42" x2="108" y2="42" stroke="${ink}" stroke-width="1.25"/>
        ${prismMotif(132, 42, 1.1, primary, accent, ink, animated)}
      </svg>
    `
    const spine = 'M30 14L220 14L250 6L500 6L530 14L720 14'
    const spineSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 24" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        ${flowTrailSvg(spine, primary, 1.8, '96 840', -936, '4.4s', animated)}
      </svg>
    `
    return tailFrameHtml(leftSvg, rightSvg, spineSvg, label, colors)
  }
}
