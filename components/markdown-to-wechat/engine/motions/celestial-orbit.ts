import { MotionPreset, PaletteColors } from '../types'
import {
  bannerFrameHtml,
  flowTrailSvg,
  imagePlaceholderHtml,
  pulseAnim,
  resolveMotionColors,
  rotateAnim,
  sectionBadgeHtml,
  tailFrameHtml
} from './helpers'

function orbitSystem(
  cx: number,
  cy: number,
  scale: number,
  primary: string,
  accent: string,
  ink: string,
  animated: boolean
): string {
  const rot1 = rotateAnim('0 0 0', '360 0 0', '16s', animated)
  const rot2 = rotateAnim('0 0 0', '-360 0 0', '22s', animated)
  return `
    <g transform="translate(${cx} ${cy}) scale(${scale})">
      <g transform="rotate(-22)">
        <ellipse cx="0" cy="0" rx="22" ry="9" fill="none" stroke="${ink}" stroke-width="1.2"/>
        <circle cx="22" cy="0" r="2.6" fill="${primary}">${rot1}</circle>
      </g>
      <g transform="rotate(24)">
        <ellipse cx="0" cy="0" rx="18" ry="7.5" fill="none" stroke="${primary}" stroke-width="1" opacity="0.78"/>
        <circle cx="-18" cy="0" r="2.2" fill="${accent}">${rot2}</circle>
      </g>
      <circle cx="0" cy="0" r="3.4" fill="${accent}">${pulseAnim('r', '3;4.2;3', '3.2s', animated)}</circle>
    </g>
  `
}

function renderTocSvg(colors: PaletteColors, animated: boolean): string {
  const { primary, accent, muted, ink } = resolveMotionColors(colors)
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 84 60" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
      <path d="M10 48Q42 36 74 48" fill="none" stroke="${muted}" stroke-width="0.9" opacity="0.6"/>
      ${orbitSystem(42, 26, 0.96, primary, accent, ink, animated)}
    </svg>
  `
}

function renderBadgeSvg(colors: PaletteColors, animated: boolean): string {
  const { primary, accent, ink } = resolveMotionColors(colors)
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 40" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
      ${orbitSystem(28, 20, 0.85, primary, accent, ink, animated)}
    </svg>
  `
}

function renderPlaceholderSvg(colors: PaletteColors, animated: boolean): string {
  const { primary, accent, muted, ink } = resolveMotionColors(colors)
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 110" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
      <path d="M18 82Q80 62 142 82" fill="none" stroke="${muted}" stroke-width="0.9" opacity="0.55"/>
      ${flowTrailSvg('M18 82Q80 62 142 82', primary, 1.6, '22 140', -162, '4.8s', animated)}
      ${orbitSystem(80, 48, 1.48, primary, accent, ink, animated)}
    </svg>
  `
}

export const celestialOrbitMotion: MotionPreset = {
  id: 'celestial-orbit',
  name: '星轨天象',

  renderBannerMotion(colors: PaletteColors, animated: boolean): string {
    const { primary, accent, muted, ink } = resolveMotionColors(colors)
    const spine = 'M30 56Q375 30 720 56'
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 84" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M30 64Q375 44 720 64" fill="none" stroke="${muted}" stroke-width="0.85" opacity="0.52"/>
        ${flowTrailSvg(spine, primary, 1.85, '92 840', -932, '4.8s', animated)}
        ${orbitSystem(120, 42, 0.95, primary, accent, ink, animated)}
        ${orbitSystem(630, 42, 0.95, primary, accent, ink, animated)}
        <circle cx="375" cy="43" r="3" fill="${accent}"/>
      </svg>
    `
  },

  renderBannerFrame(innerHtml: string, colors: PaletteColors, animated: boolean): string {
    const { primary, accent, ink } = resolveMotionColors(colors)
    const badge = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        ${orbitSystem(28, 28, 1.02, primary, accent, ink, animated)}
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
    const rail = 'M4 10Q320 2 636 10'
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 15" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M4 11H636" stroke="${muted}" stroke-width="0.8" opacity="0.48"/>
        ${flowTrailSvg(rail, primary, 1.65, '80 720', -800, dur, animated)}
        <circle cx="320" cy="6" r="2.8" fill="${accent}"/>
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
        ${orbitSystem(18, 12, 0.58, primary, accent, ink, animated)}
      </svg>
    `
  },

  renderH3Marker(colors: PaletteColors, animated: boolean): string {
    const { primary, accent } = resolveMotionColors(colors)
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" width="14" style="display:block;height:auto;max-width:100%;">
        <ellipse cx="7" cy="7" rx="5.5" ry="2.6" transform="rotate(-25 7 7)" fill="none" stroke="${primary}" stroke-width="1.2"/>
        <circle cx="7" cy="7" r="2" fill="${accent}">${pulseAnim('r', '1.6;2.4;1.6', '2.8s', animated)}</circle>
      </svg>
    `
  },

  renderEndingDecor(colors: PaletteColors, animated: boolean): string {
    const { primary, accent, ink } = resolveMotionColors(colors)
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 28" width="48" style="display:block;height:auto;max-width:100%;">
        ${orbitSystem(24, 14, 0.72, primary, accent, ink, animated)}
      </svg>
    `
  },

  renderCodeBadge(colors: PaletteColors, animated: boolean): string {
    const { primary, accent } = resolveMotionColors(colors)
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 14" width="28" style="display:block;height:auto;max-width:100%;">
        <ellipse cx="10" cy="7" rx="6" ry="3" fill="none" stroke="${primary}" stroke-width="1.15"/>
        <circle cx="21" cy="7" r="2.2" fill="${accent}">${pulseAnim('opacity', '1;0.35;1', '2.2s', animated)}</circle>
      </svg>
    `
  },

  renderDivider(colors: PaletteColors, animated: boolean): string {
    const { primary, accent, muted } = resolveMotionColors(colors)
    const d = 'M20 10Q320 2 620 10'
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 16" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M20 11H620" stroke="${muted}" stroke-width="0.8" opacity="0.46"/>
        ${flowTrailSvg(d, primary, 1.7, '76 700', -776, '4.8s', animated)}
        <circle cx="320" cy="6" r="2.8" fill="${accent}"/>
      </svg>
    `
  },

  renderTail(colors: PaletteColors, animated: boolean, label = 'END · 继续阅读'): string {
    const { primary, accent, muted, ink } = resolveMotionColors(colors)
    const leftSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 84" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M14 54Q100 38 186 48" fill="none" stroke="${muted}" stroke-width="0.9" opacity="0.55"/>
        ${orbitSystem(72, 42, 1.05, primary, accent, ink, animated)}
      </svg>
    `
    const rightSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 84" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M14 48Q100 38 186 54" fill="none" stroke="${muted}" stroke-width="0.9" opacity="0.55"/>
        ${orbitSystem(128, 42, 1.05, primary, accent, ink, animated)}
      </svg>
    `
    const spine = 'M30 14Q375 4 720 14'
    const spineSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 24" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        ${flowTrailSvg(spine, primary, 1.8, '96 840', -936, '4.8s', animated)}
      </svg>
    `
    return tailFrameHtml(leftSvg, rightSvg, spineSvg, label, colors)
  }
}
