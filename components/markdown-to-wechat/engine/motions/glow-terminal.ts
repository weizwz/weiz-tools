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
  accent: string,
  ink: string,
  animated: boolean
): string {
  const blink = pulseAnim('opacity', '1;1;0.15;0.15;1', '1.8s', animated)
  return `
    <g transform="translate(${cx} ${cy}) scale(${scale})">
      <rect x="-18" y="-12" width="36" height="24" rx="2.5" fill="none" stroke="${ink}" stroke-width="1.3"/>
      <path d="M-11 -4L-5 0L-11 4" fill="none" stroke="${primary}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <rect x="-1" y="-4" width="7" height="8" fill="${accent}">${blink}</rect>
    </g>
  `
}

function renderTocSvg(colors: PaletteColors, animated: boolean): string {
  const { primary, accent, muted, ink } = resolveMotionColors(colors)
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 84 60" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
      <path d="M10 46H74" stroke="${muted}" stroke-width="0.9" opacity="0.6"/>
      ${flowTrailSvg('M10 46H32L38 40H74', primary, 1.55, '16 100', -116, '3.6s', animated)}
      ${terminalPrompt(42, 24, 1, primary, accent, ink, animated)}
    </svg>
  `
}

function renderBadgeSvg(colors: PaletteColors, animated: boolean): string {
  const { primary, accent, ink } = resolveMotionColors(colors)
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 40" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
      ${terminalPrompt(28, 20, 0.9, primary, accent, ink, animated)}
    </svg>
  `
}

function renderPlaceholderSvg(colors: PaletteColors, animated: boolean): string {
  const { primary, accent, muted, ink } = resolveMotionColors(colors)
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 110" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
      <path d="M20 84H140" stroke="${muted}" stroke-width="0.9" opacity="0.55"/>
      ${flowTrailSvg('M20 84H56L66 74H140', primary, 1.65, '24 140', -164, '3.8s', animated)}
      ${terminalPrompt(80, 48, 1.45, primary, accent, ink, animated)}
    </svg>
  `
}

export const glowTerminalMotion: MotionPreset = {
  id: 'glow-terminal',
  name: '微光终端',

  renderBannerMotion(colors: PaletteColors, animated: boolean): string {
    const { primary, accent, muted, ink } = resolveMotionColors(colors)
    const spine = 'M30 56H210L224 44H526L540 56H720'
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 84" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M30 68H720" stroke="${muted}" stroke-width="0.85" opacity="0.5"/>
        ${flowTrailSvg(spine, primary, 1.85, '84 820', -904, '3.8s', animated)}
        ${terminalPrompt(115, 42, 1.05, primary, accent, ink, animated)}
        ${terminalPrompt(635, 42, 1.05, primary, accent, ink, animated)}
        <rect x="355" y="41" width="40" height="6" fill="none" stroke="${ink}" stroke-width="1.15"/>
        <rect x="359" y="42.5" width="10" height="3" fill="${accent}">${pulseAnim('opacity', '1;0.2;1', '1.8s', animated)}</rect>
      </svg>
    `
  },

  renderBannerFrame(innerHtml: string, colors: PaletteColors, animated: boolean): string {
    const { primary, accent, ink } = resolveMotionColors(colors)
    const badge = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        ${terminalPrompt(28, 28, 1.15, primary, accent, ink, animated)}
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
    const dur = `${(3.6 + ((index - 1) % 3) * 0.35).toFixed(2)}s`
    const rail = 'M4 8H240L250 4H390L400 8H636'
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 14" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M100 11H540" stroke="${muted}" stroke-width="0.8" opacity="0.5"/>
        ${flowTrailSvg(rail, primary, 1.65, '72 720', -792, dur, animated)}
        <rect x="314" y="2" width="12" height="4" fill="${accent}"/>
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
        <path d="M8 7L14 12L8 17" fill="none" stroke="${primary}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
        <rect x="18" y="8" width="8" height="8" fill="${accent}">${pulseAnim('opacity', '1;0.2;1', '1.8s', animated)}</rect>
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
    const { primary, accent, ink } = resolveMotionColors(colors)
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 28" width="48" style="display:block;height:auto;max-width:100%;">
        ${terminalPrompt(24, 14, 0.72, primary, accent, ink, animated)}
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
    const { primary, accent, muted } = resolveMotionColors(colors)
    const d = 'M20 9H246L256 5H384L394 9H620'
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 16" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M180 12H460" stroke="${muted}" stroke-width="0.8" opacity="0.5"/>
        ${flowTrailSvg(d, primary, 1.7, '72 700', -772, '3.8s', animated)}
        <rect x="314" y="2.5" width="12" height="5" fill="${accent}"/>
      </svg>
    `
  },

  renderTail(colors: PaletteColors, animated: boolean, label = 'END · 继续阅读'): string {
    const { primary, accent, muted, ink } = resolveMotionColors(colors)
    const leftSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 84" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M14 58H186" stroke="${muted}" stroke-width="0.9" opacity="0.55"/>
        ${terminalPrompt(62, 40, 1.15, primary, accent, ink, animated)}
        <path d="M90 40H186" stroke="${ink}" stroke-width="1.3"/>
      </svg>
    `
    const rightSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 84" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M14 58H186" stroke="${muted}" stroke-width="0.9" opacity="0.55"/>
        <path d="M14 40H110" stroke="${ink}" stroke-width="1.3"/>
        ${terminalPrompt(138, 40, 1.15, primary, accent, ink, animated)}
      </svg>
    `
    const spine = 'M30 14H234L248 7H502L516 14H720'
    const spineSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 24" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        ${flowTrailSvg(spine, primary, 1.8, '90 820', -910, '3.8s', animated)}
      </svg>
    `
    return tailFrameHtml(leftSvg, rightSvg, spineSvg, label, colors)
  }
}
