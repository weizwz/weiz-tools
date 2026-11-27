import { MotionPreset, PaletteColors } from '../types'
import {
  bannerFrameHtml,
  flowTrailSvg,
  imagePlaceholderHtml,
  pulseAnim,
  resolveMotionColors,
  sectionBadgeHtml,
  tailFrameHtml,
  translateAnim
} from './helpers'

function gridMotif(
  cx: number,
  cy: number,
  size: number,
  primary: string,
  accent: string,
  ink: string,
  animated: boolean
): string {
  const half = size / 2
  const move = translateAnim('0 0;3 0;0 0;-3 0;0 0', '5.2s', animated)
  return `
    <g transform="translate(${cx} ${cy})">
      <rect x="${-half}" y="${-half}" width="${size}" height="${size}" fill="none" stroke="${ink}" stroke-width="1.25" opacity="0.85"/>
      <path d="M${-half - 5} 0H${half + 5}M0 ${-half - 5}V${half + 5}" fill="none" stroke="${primary}" stroke-width="0.9" opacity="0.75"/>
      <circle cx="0" cy="0" r="2.6" fill="${accent}">${pulseAnim('r', '2.2;3.2;2.2', '2.8s', animated)}</circle>
      <rect x="${-half - 2}" y="${-3}" width="4" height="6" fill="${primary}" opacity="0.9">${move}</rect>
    </g>
  `
}

function renderTocSvg(colors: PaletteColors, animated: boolean): string {
  const { primary, accent, muted, ink } = resolveMotionColors(colors)
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 84 60" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
      <path d="M8 14H76M8 30H76M8 46H76M22 6V54M42 6V54M62 6V54" fill="none" stroke="${muted}" stroke-width="0.8" opacity="0.55"/>
      ${flowTrailSvg('M10 46H32L42 30H74', primary, 1.6, '18 110', -128, '4.2s', animated)}
      ${gridMotif(42, 30, 18, primary, accent, ink, animated)}
    </svg>
  `
}

function renderBadgeSvg(colors: PaletteColors, animated: boolean): string {
  const { primary, accent, muted, ink } = resolveMotionColors(colors)
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 40" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
      <path d="M6 12H50M6 28H50M18 4V36M38 4V36" fill="none" stroke="${muted}" stroke-width="0.8" opacity="0.52"/>
      ${gridMotif(28, 20, 14, primary, accent, ink, animated)}
    </svg>
  `
}

function renderPlaceholderSvg(colors: PaletteColors, animated: boolean): string {
  const { primary, accent, muted, ink } = resolveMotionColors(colors)
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 110" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
      <path d="M16 25H144M16 55H144M16 85H144M40 12V98M80 12V98M120 12V98" fill="none" stroke="${muted}" stroke-width="0.85" opacity="0.5"/>
      ${flowTrailSvg('M18 85H58L80 55H142', primary, 1.7, '26 160', -186, '4s', animated)}
      ${gridMotif(80, 55, 28, primary, accent, ink, animated)}
      <circle cx="40" cy="25" r="2.2" fill="${primary}"/>
      <circle cx="120" cy="85" r="2.2" fill="${accent}"/>
    </svg>
  `
}

export const meridianGridMotion: MotionPreset = {
  id: 'meridian-grid',
  name: '经纬线网',

  renderBannerMotion(colors: PaletteColors, animated: boolean): string {
    const { primary, accent, muted, ink } = resolveMotionColors(colors)
    const spine = 'M30 56H220L248 44H502L530 56H720'
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 84" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M30 32H720M120 14V70M375 14V70M630 14V70" fill="none" stroke="${muted}" stroke-width="0.85" opacity="0.48"/>
        ${flowTrailSvg(spine, primary, 1.85, '96 860', -956, '4.4s', animated)}
        ${gridMotif(120, 44, 20, primary, accent, ink, animated)}
        ${gridMotif(630, 44, 20, primary, accent, ink, animated)}
        <rect x="366" y="40" width="18" height="8" fill="none" stroke="${ink}" stroke-width="1.2"/>
        <circle cx="375" cy="44" r="2.5" fill="${accent}"/>
      </svg>
    `
  },

  renderBannerFrame(innerHtml: string, colors: PaletteColors, animated: boolean): string {
    const { primary, accent, muted } = resolveMotionColors(colors)
    const badge = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M8 28H48M28 8V48" stroke="${muted}" stroke-width="0.9"/>
        <rect x="14" y="14" width="28" height="28" fill="none" stroke="${primary}" stroke-width="1.6"/>
        <circle cx="28" cy="28" r="4.5" fill="${accent}">${pulseAnim('r', '4;5.6;4', '2.8s', animated)}</circle>
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
    const rail = 'M4 8H240L256 4H384L400 8H636'
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 14" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M160 2V12M320 2V12M480 2V12" stroke="${muted}" stroke-width="0.85" opacity="0.65"/>
        ${flowTrailSvg(rail, primary, 1.65, '84 740', -824, dur, animated)}
        <rect x="316" y="1" width="8" height="6" fill="${accent}" opacity="0.9"/>
      </svg>
    `
  },

  renderImagePlaceholder(caption: string, ratio: string, colors: PaletteColors, animated: boolean): string {
    return imagePlaceholderHtml(renderPlaceholderSvg(colors, animated), this.name, caption, ratio, colors)
  },

  renderBlockquoteDecor(colors: PaletteColors, animated: boolean): string {
    const { primary, accent, muted } = resolveMotionColors(colors)
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 24" width="36" style="display:block;height:auto;max-width:100%;">
        <path d="M4 12H32M14 4V20" stroke="${muted}" stroke-width="0.85" opacity="0.65"/>
        <rect x="8" y="6" width="12" height="12" fill="none" stroke="${primary}" stroke-width="1.25"/>
        <circle cx="14" cy="12" r="2.4" fill="${accent}">${pulseAnim('opacity', '1;0.35;1', '2.6s', animated)}</circle>
      </svg>
    `
  },

  renderH3Marker(colors: PaletteColors, animated: boolean): string {
    const { primary, accent } = resolveMotionColors(colors)
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" width="14" style="display:block;height:auto;max-width:100%;">
        <path d="M1 7H13M7 1V13" stroke="${primary}" stroke-width="1.2"/>
        <rect x="4.5" y="4.5" width="5" height="5" fill="${accent}">${pulseAnim('opacity', '1;0.45;1', '2.8s', animated)}</rect>
      </svg>
    `
  },

  renderEndingDecor(colors: PaletteColors, animated: boolean): string {
    const { primary, accent, muted } = resolveMotionColors(colors)
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 28" width="48" style="display:block;height:auto;max-width:100%;">
        <path d="M4 14H44M16 4V24M32 4V24" stroke="${muted}" stroke-width="0.8" opacity="0.6"/>
        <rect x="10" y="8" width="12" height="12" fill="none" stroke="${primary}" stroke-width="1.25"/>
        <circle cx="32" cy="14" r="2.6" fill="${accent}">${pulseAnim('r', '2.2;3.2;2.2', '2.6s', animated)}</circle>
      </svg>
    `
  },

  renderCodeBadge(colors: PaletteColors, animated: boolean): string {
    const { primary, accent } = resolveMotionColors(colors)
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 14" width="28" style="display:block;height:auto;max-width:100%;">
        <path d="M2 7H26" stroke="${primary}" stroke-width="1" opacity="0.5"/>
        <rect x="4" y="4" width="6" height="6" fill="none" stroke="${primary}" stroke-width="1.2"/>
        <rect x="17" y="4.5" width="5" height="5" fill="${accent}">${pulseAnim('opacity', '1;0.35;1', '2s', animated)}</rect>
      </svg>
    `
  },

  renderDivider(colors: PaletteColors, animated: boolean): string {
    const { primary, accent, muted } = resolveMotionColors(colors)
    const d = 'M20 9H240L256 5H384L400 9H620'
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 16" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M180 3V13M460 3V13" stroke="${muted}" stroke-width="0.85" opacity="0.6"/>
        ${flowTrailSvg(d, primary, 1.7, '80 720', -800, '4.2s', animated)}
        <rect x="315" y="2.5" width="10" height="5" fill="${accent}"/>
      </svg>
    `
  },

  renderTail(colors: PaletteColors, animated: boolean, label = 'END · 继续阅读'): string {
    const { primary, accent, muted, ink } = resolveMotionColors(colors)
    const leftSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 84" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M12 24H188M12 60H188M60 12V72M130 12V72" stroke="${muted}" stroke-width="0.85" opacity="0.5"/>
        ${gridMotif(60, 42, 22, primary, accent, ink, animated)}
        <path d="M76 42H184" stroke="${ink}" stroke-width="1.3"/>
      </svg>
    `
    const rightSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 84" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M12 24H188M12 60H188M70 12V72M140 12V72" stroke="${muted}" stroke-width="0.85" opacity="0.5"/>
        <path d="M16 42H124" stroke="${ink}" stroke-width="1.3"/>
        ${gridMotif(140, 42, 22, primary, accent, ink, animated)}
      </svg>
    `
    const spine = 'M30 14H230L256 7H494L520 14H720'
    const spineSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 24" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        ${flowTrailSvg(spine, primary, 1.8, '100 840', -940, '4.4s', animated)}
      </svg>
    `
    return tailFrameHtml(leftSvg, rightSvg, spineSvg, label, colors)
  }
}
