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

function terminalPrompt(
  cx: number,
  cy: number,
  scale: number,
  primary: string,
  primaryMid: string,
  accent: string,
  animated: boolean
): string {
  const blink = pulseAnim('opacity', '1;1;0.15;0.15;1', '1.8s', animated)
  return `
    <g transform="translate(${cx} ${cy}) scale(${scale})">
      <rect x="-18" y="-12" width="36" height="24" rx="2.5" fill="none" stroke="${primaryMid}" stroke-width="1.3"/>
      <path d="M-11 -4L-5 0L-11 4" fill="none" stroke="${primary}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <rect x="-1" y="-4" width="7" height="8" fill="${accent}">${blink}</rect>
    </g>
  `
}

function renderTocSvg(colors: PaletteColors, animated: boolean): string {
  const { primary, primarySoft, primaryMid, accent } = resolveMotionColors(colors)
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 84 32" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
      <path d="M10 27H74" stroke="${primarySoft}" stroke-width="0.9"/>
      ${flowTrailSvg('M10 27H74', primary, 1.45, '16 100', -116, '3.6s', animated)}
      ${terminalPrompt(42, 14, 0.76, primary, primaryMid, accent, animated)}
    </svg>
  `
}

function renderBadgeSvg(colors: PaletteColors, animated: boolean): string {
  const { primary, primaryMid, accent } = resolveMotionColors(colors)
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 40" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
      ${terminalPrompt(28, 17, 0.85, primary, primaryMid, accent, animated)}
      ${flowTrailSvg('M4 35H52', accent, 1.4, '12 48', -60, '3.2s', animated)}
    </svg>
  `
}

function renderPlaceholderSvg(colors: PaletteColors, animated: boolean): string {
  const { primary, primarySoft, primaryMid, accent } = resolveMotionColors(colors)
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 110" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
      <path d="M20 84H140" stroke="${primarySoft}" stroke-width="0.9"/>
      ${flowTrailSvg('M20 84H56L66 74H140', primary, 1.65, '24 140', -164, '3.8s', animated)}
      ${terminalPrompt(80, 48, 1.45, primary, primaryMid, accent, animated)}
    </svg>
  `
}

export const glowTerminalMotion: MotionPreset = {
  id: 'glow-terminal',
  name: '微光终端',

  renderBannerMotion(colors: PaletteColors, animated: boolean): string {
    const { primary, primaryMid, accent } = resolveMotionColors(colors)
    const spine = 'M30 56H210L224 44H526L540 56H720'
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 84" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M30 66H720" stroke="${primaryMid}" stroke-width="0.9" stroke-dasharray="2 5"/>
        ${flowTrailSvg(spine, primary, 1.8, '84 820', -904, '3.8s', animated)}
        ${terminalPrompt(115, 42, 1.05, primary, primaryMid, accent, animated)}
        <g transform="translate(618 42)">
          <rect x="-26" y="-8" width="10" height="16" fill="${primary}" opacity="0.65"/>
          <rect x="-12" y="-4" width="10" height="12" fill="${accent}">${pulseAnim('opacity', '1;0.3;1', '1.8s', animated)}</rect>
          <rect x="2" y="-11" width="10" height="19" fill="${primary}" opacity="0.85"/>
          <rect x="16" y="-6" width="10" height="14" fill="${primaryMid}"/>
        </g>
        <rect x="355" y="41" width="40" height="6" fill="none" stroke="${primaryMid}" stroke-width="1.15"/>
        <rect x="359" y="42.5" width="10" height="3" fill="${accent}">${pulseAnim('opacity', '1;0.2;1', '1.8s', animated)}</rect>
      </svg>
    `
  },

  renderBannerFrame(innerHtml: string, colors: PaletteColors, animated: boolean): string {
    const { primary, primaryMid, accent } = resolveMotionColors(colors)
    const badge = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        ${terminalPrompt(28, 28, 1.15, primary, primaryMid, accent, animated)}
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
        <line x1="0" y1="6" x2="178" y2="6" stroke="${primaryMid}" stroke-width="1.1" stroke-dasharray="2 5"/>
        <rect x="0" y="4" width="8" height="4" fill="${accent}">${pulseAnim('opacity', '1;0.2;1', '1.8s', animated)}</rect>
      </svg>
    `
    return sectionBadgeHtml(renderBadgeSvg(colors, animated), colors, animated, lineSvg)
  },

  renderSectionRail(colors: PaletteColors, animated: boolean, index: number): string {
    const { primary, primarySoft, accent } = resolveMotionColors(colors)
    const durSec = 11.2 + ((index - 1) % 3) * 1.2
    const dur = `${durSec.toFixed(1)}s`
    const count = 48
    const step = durSec / count
    const blocks = Array.from({ length: count }, (_, i) => {
      const x = (6 + i * 13.2).toFixed(1)
      const col = i % 2 === 0 ? accent : primary
      const begin = `${(i * step).toFixed(2)}s`
      const anim = animated
        ? `<animate attributeName="opacity" values="0.16;0.52;0.78;0.16;0.16" keyTimes="0;0.018;0.04;0.08;1" dur="${dur}" begin="${begin}" repeatCount="indefinite"/>`
        : ''
      return `<rect x="${x}" y="2" width="2.4" height="8" rx="0.7" fill="${col}" opacity="${animated ? 0.16 : 0.36}">${anim}</rect>`
    }).join('')
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 12" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M2 6H638" stroke="${primarySoft}" stroke-width="1" stroke-dasharray="2 2"/>
        ${blocks}
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
        <rect x="6" y="7" width="6" height="10" fill="${primary}" opacity="0.65"/>
        <rect x="15" y="7" width="6" height="10" fill="${accent}">${pulseAnim('opacity', '1;0.2;1', '1.8s', animated)}</rect>
        <rect x="24" y="7" width="6" height="10" fill="${primary}" opacity="0.35"/>
      </svg>
    `
  },

  renderH3Marker(colors: PaletteColors, animated: boolean): string {
    const { primary, accent } = resolveMotionColors(colors)
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" width="14" style="display:block;height:auto;max-width:100%;">
        <path d="M2 4L6 7L2 10" fill="none" stroke="${primary}" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round"/>
        <rect x="8" y="4" width="4" height="6" fill="${accent}">${pulseAnim('opacity', '1;0.25;1', '1.8s', animated)}</rect>
      </svg>
    `
  },

  renderEndingDecor(colors: PaletteColors, animated: boolean): string {
    const { primary, primaryMid, accent } = resolveMotionColors(colors)
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 28" width="48" style="display:block;height:auto;max-width:100%;">
        ${terminalPrompt(24, 14, 0.72, primary, primaryMid, accent, animated)}
      </svg>
    `
  },

  renderCodeBadge(colors: PaletteColors, animated: boolean): string {
    const { primary, accent } = resolveMotionColors(colors)
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 14" width="28" style="display:block;height:auto;max-width:100%;">
        <path d="M4 4L9 7L4 10" fill="none" stroke="${primary}" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
        <rect x="13" y="4" width="6" height="6" fill="${accent}">${pulseAnim('opacity', '1;0.2;1', '1.6s', animated)}</rect>
      </svg>
    `
  },

  renderDivider(colors: PaletteColors, animated: boolean): string {
    const { primary, primaryMid, accent } = resolveMotionColors(colors)
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 16" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M20 8H620" stroke="${primaryMid}" stroke-width="0.9" stroke-dasharray="2 5"/>
        ${flowTrailSvg('M20 8H246L256 4H384L394 8H620', primary, 1.65, '72 700', -772, '3.8s', animated)}
        <rect x="314" y="2" width="12" height="5" fill="${accent}"/>
      </svg>
    `
  },

  renderTail(colors: PaletteColors, animated: boolean, label = 'END · 继续阅读'): string {
    const { primary, primarySoft, primaryMid, accent } = resolveMotionColors(colors)
    const leftSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 84" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M14 58H186" stroke="${primarySoft}" stroke-width="0.9"/>
        ${terminalPrompt(62, 40, 1.15, primary, primaryMid, accent, animated)}
      </svg>
    `
    const rightSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 84" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M14 58H186" stroke="${primarySoft}" stroke-width="0.9"/>
        <rect x="96" y="28" width="76" height="22" rx="3" fill="none" stroke="${primaryMid}" stroke-width="1.2"/>
        <rect x="102" y="34" width="28" height="10" rx="1.5" fill="${primary}" opacity="0.7"/>
        <rect x="134" y="34" width="16" height="10" rx="1.5" fill="${accent}">${pulseAnim('opacity', '1;0.25;1', '1.8s', animated)}</rect>
      </svg>
    `
    const spineSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 24" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M30 16H720" stroke="${primaryMid}" stroke-width="0.9" stroke-dasharray="2 5"/>
        ${flowTrailSvg('M30 10H234L248 5H502L516 10H720', primary, 1.75, '90 820', -910, '3.8s', animated)}
      </svg>
    `
    return tailFrameHtml(leftSvg, rightSvg, spineSvg, label, colors)
  }
}
