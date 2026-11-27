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

function gridCrosshair(
  cx: number,
  cy: number,
  size: number,
  primary: string,
  primaryMid: string,
  accent: string,
  animated: boolean
): string {
  const half = size / 2
  const move = translateAnim('0 0;3 0;0 0;-3 0;0 0', '5.2s', animated)
  return `
    <g transform="translate(${cx} ${cy})">
      <rect x="${-half}" y="${-half}" width="${size}" height="${size}" fill="none" stroke="${primaryMid}" stroke-width="1.2"/>
      <path d="M${-half - 5} 0H${half + 5}M0 ${-half - 5}V${half + 5}" fill="none" stroke="${primary}" stroke-width="0.95" opacity="0.8"/>
      <circle cx="0" cy="0" r="2.6" fill="${accent}">${pulseAnim('r', '2.2;3.2;2.2', '2.8s', animated)}</circle>
      <rect x="${-half - 2}" y="-3" width="4" height="6" fill="${primary}">${move}</rect>
    </g>
  `
}

function renderTocSvg(colors: PaletteColors, animated: boolean): string {
  const { primary, primarySoft, primaryMid, accent } = resolveMotionColors(colors)
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 84 32" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
      <path d="M8 8H76M8 16H76M8 24H76M22 3V29M42 3V29M62 3V29" fill="none" stroke="${primarySoft}" stroke-width="0.85"/>
      ${flowTrailSvg('M10 24H30L42 16H74', primary, 1.5, '18 110', -128, '4.2s', animated)}
      <g transform="translate(42 16)">
        <rect x="-6" y="-6" width="12" height="12" fill="none" stroke="${primaryMid}" stroke-width="1.1"/>
        <path d="M-10 0H10M0 -10V10" fill="none" stroke="${primary}" stroke-width="0.9" opacity="0.8"/>
        <circle cx="0" cy="0" r="2.2" fill="${accent}">${pulseAnim('r', '1.8;2.8;1.8', '2.8s', animated)}</circle>
      </g>
    </svg>
  `
}

function renderBadgeSvg(colors: PaletteColors, animated: boolean): string {
  const { primary, primarySoft, primaryMid, accent } = resolveMotionColors(colors)
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 40" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
      <path d="M6 10H50M6 30H50M14 4V36M42 4V36" fill="none" stroke="${primarySoft}" stroke-width="0.8"/>
      <g transform="translate(28 20)">
        <rect x="-8" y="-8" width="16" height="16" fill="none" stroke="${primaryMid}" stroke-width="1.2"/>
        <path d="M-12 0H12M0 -12V12" fill="none" stroke="${primary}" stroke-width="0.95" opacity="0.8"/>
        <circle cx="0" cy="0" r="2.4" fill="${accent}">${pulseAnim('r', '2;3;2', '2.8s', animated)}</circle>
      </g>
    </svg>
  `
}

function renderPlaceholderSvg(colors: PaletteColors, animated: boolean): string {
  const { primary, primarySoft, primaryMid, accent } = resolveMotionColors(colors)
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 110" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
      <path d="M16 25H144M16 55H144M16 85H144M40 12V98M80 12V98M120 12V98" fill="none" stroke="${primarySoft}" stroke-width="0.9"/>
      ${flowTrailSvg('M18 85H58L80 55H142', primary, 1.7, '26 160', -186, '4s', animated)}
      ${gridCrosshair(80, 55, 28, primary, primaryMid, accent, animated)}
      <circle cx="40" cy="25" r="2.2" fill="${primary}"/>
      <circle cx="120" cy="85" r="2.2" fill="${accent}"/>
    </svg>
  `
}

export const meridianGridMotion: MotionPreset = {
  id: 'meridian-grid',
  name: '经纬线网',

  renderBannerMotion(colors: PaletteColors, animated: boolean): string {
    const { primary, primarySoft, primaryMid, accent } = resolveMotionColors(colors)
    const topLine = 'M30 42H720'
    const bottomLine = 'M30 56H720'
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 84" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M120 14V70M375 18V66M630 14V70" fill="none" stroke="${primarySoft}" stroke-width="0.9"/>
        ${flowTrailSvg(topLine, primary, 1.75, '92 840', -932, '4.4s', animated)}
        <path d="${bottomLine}" fill="none" stroke="${primaryMid}" stroke-width="1" stroke-dasharray="4 4"/>
        ${flowTrailSvg(bottomLine, accent, 1.5, '64 840', 904, '4.8s', animated)}
        ${gridCrosshair(120, 42, 20, primary, primaryMid, accent, animated)}
        <rect x="371" y="38" width="8" height="8" fill="${accent}" opacity="0.88"/>
      </svg>
    `
  },

  renderBannerFrame(innerHtml: string, colors: PaletteColors, animated: boolean): string {
    const { primary, primaryMid, accent } = resolveMotionColors(colors)
    const badge = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M8 28H48M28 8V48" stroke="${primaryMid}" stroke-width="0.9"/>
        <rect x="14" y="14" width="28" height="28" fill="none" stroke="${primary}" stroke-width="1.5"/>
        <circle cx="28" cy="28" r="4.5" fill="${accent}">${pulseAnim('r', '4;5.6;4', '2.8s', animated)}</circle>
      </svg>
    `
    return bannerFrameHtml(innerHtml, colors, badge, this.renderBannerMotion(colors, animated), animated)
  },

  renderTocDecor(colors: PaletteColors, animated: boolean): string {
    return renderTocSvg(colors, animated)
  },

  renderSectionBadge(colors: PaletteColors, animated: boolean): string {
    const { primary, primaryMid, accent } = resolveMotionColors(colors)
    const lineSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 12" width="100%" style="display:block;flex:1;min-width:0;width:100%;height:12px;">
        <line x1="0" y1="4" x2="178" y2="4" stroke="${primaryMid}" stroke-width="1" stroke-dasharray="3 3"/>
        <line x1="0" y1="8" x2="178" y2="8" stroke="${primary}" stroke-width="1.15" opacity="0.7"/>
        <rect x="12" y="2" width="14" height="4" fill="${accent}">${pulseAnim('x', '12;96;12', '5.2s', animated)}</rect>
      </svg>
    `
    return sectionBadgeHtml(renderBadgeSvg(colors, animated), colors, animated, lineSvg)
  },

  renderSectionRail(colors: PaletteColors, animated: boolean, index: number): string {
    const { primary, primarySoft, accent } = resolveMotionColors(colors)
    const dur = `${(4.2 + ((index - 1) % 3) * 0.4).toFixed(1)}s`
    const railTop = 'M4 4H636'
    const railBot = 'M4 10H636'
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 14" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M160 1V13M320 1V13M480 1V13" stroke="${primarySoft}" stroke-width="0.9"/>
        ${flowTrailSvg(railTop, primary, 1.5, '84 740', -824, dur, animated)}
        ${flowTrailSvg(railBot, accent, 1.35, '64 740', 804, '4.8s', animated)}
      </svg>
    `
  },

  renderImagePlaceholder(caption: string, ratio: string, colors: PaletteColors, animated: boolean): string {
    return imagePlaceholderHtml(renderPlaceholderSvg(colors, animated), this.name, caption, ratio, colors)
  },

  renderBlockquoteDecor(colors: PaletteColors, animated: boolean): string {
    const { primary, primarySoft, primaryMid, accent } = resolveMotionColors(colors)
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 24" width="36" style="display:block;height:auto;max-width:100%;">
        <path d="M2 12H34M11 4V20M25 4V20" fill="none" stroke="${primarySoft}" stroke-width="0.9"/>
        <path d="M16 12H32" fill="none" stroke="${primaryMid}" stroke-width="1"/>
        <rect x="6.5" y="7.5" width="9" height="9" fill="none" stroke="${primary}" stroke-width="1.15"/>
        <circle cx="11" cy="12" r="2" fill="${accent}">${pulseAnim('r', '1.6;2.4;1.6', '2.8s', animated)}</circle>
        <rect x="23" y="10" width="4" height="4" fill="${primary}">${pulseAnim('opacity', '0.9;0.35;0.9', '2.8s', animated)}</rect>
      </svg>
    `
  },

  renderH3Marker(colors: PaletteColors, animated: boolean): string {
    const { primary, accent } = resolveMotionColors(colors)
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" width="14" style="display:block;height:auto;max-width:100%;">
        <path d="M1 7H13M7 1V13" stroke="${primary}" stroke-width="1.2"/>
        <circle cx="7" cy="7" r="2.2" fill="${accent}">${pulseAnim('r', '1.8;2.8;1.8', '2.8s', animated)}</circle>
      </svg>
    `
  },

  renderEndingDecor(colors: PaletteColors, animated: boolean): string {
    const { primary, primaryMid, accent } = resolveMotionColors(colors)
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 28" width="48" style="display:block;height:auto;max-width:100%;">
        <path d="M4 14H44M24 3V25" stroke="${primaryMid}" stroke-width="0.9"/>
        <rect x="16" y="6" width="16" height="16" fill="none" stroke="${primary}" stroke-width="1.2"/>
        <circle cx="24" cy="14" r="2.5" fill="${accent}">${pulseAnim('r', '2.2;3.2;2.2', '2.8s', animated)}</circle>
      </svg>
    `
  },

  renderCodeBadge(colors: PaletteColors, animated: boolean): string {
    const { primary, accent } = resolveMotionColors(colors)
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 14" width="28" style="display:block;height:auto;max-width:100%;">
        <path d="M2 7H26" stroke="${primary}" stroke-width="1" opacity="0.55"/>
        <rect x="4" y="4" width="6" height="6" fill="none" stroke="${primary}" stroke-width="1.2"/>
        <rect x="17" y="4.5" width="5" height="5" fill="${accent}">${pulseAnim('opacity', '1;0.35;1', '2s', animated)}</rect>
      </svg>
    `
  },

  renderDivider(colors: PaletteColors, animated: boolean): string {
    const { primary, primaryMid, accent } = resolveMotionColors(colors)
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 16" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M20 5H620" stroke="${primaryMid}" stroke-width="0.9" stroke-dasharray="4 4"/>
        ${flowTrailSvg('M20 11H620', primary, 1.5, '80 720', -800, '4.4s', animated)}
        <rect x="315" y="2.5" width="10" height="5" fill="${accent}"/>
      </svg>
    `
  },

  renderTail(colors: PaletteColors, animated: boolean, label = 'END · 继续阅读'): string {
    const { primary, primarySoft, primaryMid, accent } = resolveMotionColors(colors)
    const leftSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 84" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M12 24H188M12 60H188M68 12V72" stroke="${primarySoft}" stroke-width="0.9"/>
        ${gridCrosshair(68, 42, 22, primary, primaryMid, accent, animated)}
        <path d="M88 42H186" stroke="${primaryMid}" stroke-width="1.2"/>
      </svg>
    `
    const rightSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 84" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M14 26H186M14 42H186M14 58H186M110 14V70M142 14V70M174 14V70" stroke="${primarySoft}" stroke-width="0.9"/>
        <circle cx="110" cy="42" r="2.6" fill="${primary}"/>
        <circle cx="142" cy="26" r="3" fill="${accent}">${pulseAnim('r', '2.5;3.8;2.5', '3s', animated)}</circle>
        <circle cx="174" cy="58" r="2.6" fill="${primary}"/>
        <path d="M110 42L142 26L174 58" fill="none" stroke="${primaryMid}" stroke-width="1.2" stroke-dasharray="3 3"/>
      </svg>
    `
    const spineSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 24" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        ${flowTrailSvg('M30 8H720', primary, 1.65, '100 840', -940, '4.4s', animated)}
        ${flowTrailSvg('M30 16H720', accent, 1.35, '72 840', 912, '4.8s', animated)}
      </svg>
    `
    return tailFrameHtml(leftSvg, rightSvg, spineSvg, label, colors)
  }
}
