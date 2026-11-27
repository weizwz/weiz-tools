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
  primaryMid: string,
  accent: string,
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
      <circle cx="0" cy="0" r="16" fill="none" stroke="${primaryMid}" stroke-width="1.05">${outerPulse}</circle>
      <circle cx="0" cy="0" r="10" fill="none" stroke="${primary}" stroke-width="1.25">${midPulse}</circle>
      <circle cx="0" cy="0" r="3" fill="${accent}">${pulseAnim('r', '2.6;3.6;2.6', '3s', animated)}</circle>
    </g>
  `
}

function waterDrop(
  cx: number,
  cy: number,
  scale: number,
  primary: string,
  accent: string,
  animated: boolean
): string {
  return `
    <g transform="translate(${cx} ${cy}) scale(${scale})">
      <path d="M0 -12C5 -4 9 1 9 6A9 9 0 1 1 -9 6C-9 1 -5 -4 0 -12Z" fill="none" stroke="${primary}" stroke-width="1.25"/>
      <circle cx="0" cy="6" r="2.5" fill="${accent}">${pulseAnim('r', '2;3.2;2', '3.2s', animated)}</circle>
    </g>
  `
}

function renderTocSvg(colors: PaletteColors, animated: boolean): string {
  const { primary, primarySoft, primaryMid, accent } = resolveMotionColors(colors)
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 84 32" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
      <path d="M10 27H74" stroke="${primarySoft}" stroke-width="0.9"/>
      ${rippleRings(42, 15, 0.68, primary, primaryMid, accent, animated)}
    </svg>
  `
}

function renderBadgeSvg(colors: PaletteColors, animated: boolean): string {
  const { primary, accent } = resolveMotionColors(colors)
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 40" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
      ${waterDrop(28, 17, 0.88, primary, accent, animated)}
      ${flowTrailSvg('M6 34C18 30 38 30 50 34', accent, 1.4, '12 48', -60, '3.6s', animated)}
    </svg>
  `
}

function renderPlaceholderSvg(colors: PaletteColors, animated: boolean): string {
  const { primary, primarySoft, primaryMid, accent } = resolveMotionColors(colors)
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 110" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
      <path d="M22 84H138" stroke="${primarySoft}" stroke-width="0.9"/>
      ${flowTrailSvg('M22 84H138', primary, 1.6, '22 140', -162, '4.6s', animated)}
      ${rippleRings(80, 50, 1.55, primary, primaryMid, accent, animated)}
    </svg>
  `
}

export const zenRippleMotion: MotionPreset = {
  id: 'zen-ripple',
  name: '静水涟漪',

  renderBannerMotion(colors: PaletteColors, animated: boolean): string {
    const { primary, primaryMid, accent } = resolveMotionColors(colors)
    const spine = 'M30 52C160 52 240 44 375 44C510 44 590 52 720 52'
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 84" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M30 64H720" stroke="${primaryMid}" stroke-width="0.85" stroke-dasharray="3 6"/>
        ${flowTrailSvg(spine, primary, 1.8, '88 840', -928, '4.8s', animated)}
        ${rippleRings(118, 44, 1.05, primary, primaryMid, accent, animated)}
        ${waterDrop(626, 40, 1.05, primary, accent, animated)}
        <circle cx="375" cy="44" r="3" fill="${accent}"/>
      </svg>
    `
  },

  renderBannerFrame(innerHtml: string, colors: PaletteColors, animated: boolean): string {
    const { primary, primaryMid, accent } = resolveMotionColors(colors)
    const badge = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        ${rippleRings(28, 28, 1.15, primary, primaryMid, accent, animated)}
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
        <line x1="20" y1="6" x2="178" y2="6" stroke="${primaryMid}" stroke-width="1" stroke-dasharray="2 6"/>
        <circle cx="170" cy="6" r="2" fill="${accent}">${pulseAnim('opacity', '1;0.35;1', '3s', animated)}</circle>
      </svg>
    `
    return sectionBadgeHtml(renderBadgeSvg(colors, animated), colors, animated, lineSvg)
  },

  renderSectionRail(colors: PaletteColors, animated: boolean, index: number): string {
    const { primary, primaryMid, accent } = resolveMotionColors(colors)
    const ringDurSec = 5.4 + ((index - 1) % 3) * 0.4
    const ringDur = `${ringDurSec.toFixed(1)}s`
    const arcDurSec = 7.2 + ((index - 1) % 3) * 0.5
    const arcDur = `${arcDurSec.toFixed(1)}s`
    const rings = animated
      ? [0, 1, 2]
          .map((i) => {
            const begin = `${((ringDurSec / 3) * i).toFixed(2)}s`
            const col = i === 1 ? accent : primary
            return `<ellipse cx="320" cy="7" rx="4" ry="1.4" fill="none" stroke="${col}" stroke-width="1.1" opacity="0"><animate attributeName="rx" values="4;30" dur="${ringDur}" begin="${begin}" repeatCount="indefinite"/><animate attributeName="ry" values="1.4;5.2" dur="${ringDur}" begin="${begin}" repeatCount="indefinite"/><animate attributeName="opacity" values="0;0.74;0.34;0" keyTimes="0;0.14;0.58;1" dur="${ringDur}" begin="${begin}" repeatCount="indefinite"/></ellipse>`
          })
          .join('')
      : [
          { rx: 10, ry: 2.3, col: primary, op: 0.78 },
          { rx: 19, ry: 3.8, col: accent, op: 0.56 },
          { rx: 29, ry: 5.1, col: primaryMid, op: 0.38 }
        ]
          .map(
            ({ rx, ry, col, op }) =>
              `<ellipse cx="320" cy="7" rx="${rx}" ry="${ry}" fill="none" stroke="${col}" stroke-width="1.1" opacity="${op}"/>`
          )
          .join('')
    const arcCount = 10
    const arcs = animated
      ? Array.from({ length: arcCount }, (_, i) => {
          const begin = `${((arcDurSec / arcCount) * i).toFixed(2)}s`
          const col = i % 2 === 1 ? accent : primary
          return `<g opacity="0"><animate attributeName="opacity" values="0;0.58;0.28;0" keyTimes="0;0.12;0.58;1" dur="${arcDur}" begin="${begin}" repeatCount="indefinite"/><path d="M288 2.5Q283.5 7 288 11.5" fill="none" stroke="${col}" stroke-width="1.1" stroke-linecap="round"><animateTransform attributeName="transform" type="translate" values="0 0;-268 0" dur="${arcDur}" begin="${begin}" repeatCount="indefinite"/></path><path d="M352 2.5Q356.5 7 352 11.5" fill="none" stroke="${col}" stroke-width="1.1" stroke-linecap="round"><animateTransform attributeName="transform" type="translate" values="0 0;268 0" dur="${arcDur}" begin="${begin}" repeatCount="indefinite"/></path></g>`
        }).join('')
      : [
          { dx: 18, col: primary, op: 0.48 },
          { dx: 48, col: accent, op: 0.4 },
          { dx: 82, col: primary, op: 0.34 },
          { dx: 120, col: primaryMid, op: 0.27 },
          { dx: 162, col: accent, op: 0.2 },
          { dx: 206, col: primaryMid, op: 0.14 },
          { dx: 252, col: primaryMid, op: 0.09 }
        ]
          .map(
            ({ dx, col, op }) =>
              `<g opacity="${op}"><path d="M${288 - dx} 2.5Q${283.5 - dx} 7 ${288 - dx} 11.5" fill="none" stroke="${col}" stroke-width="1.1" stroke-linecap="round"/><path d="M${352 + dx} 2.5Q${356.5 + dx} 7 ${352 + dx} 11.5" fill="none" stroke="${col}" stroke-width="1.1" stroke-linecap="round"/></g>`
          )
          .join('')
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 14" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        ${rings}
        ${arcs}
      </svg>
    `
  },

  renderImagePlaceholder(caption: string, ratio: string, colors: PaletteColors, animated: boolean): string {
    return imagePlaceholderHtml(renderPlaceholderSvg(colors, animated), this.name, caption, ratio, colors)
  },

  renderBlockquoteDecor(colors: PaletteColors, animated: boolean): string {
    const { primary, accent } = resolveMotionColors(colors)
    const wave1 = 'M2 9C8 4 14 14 20 9C26 4 30 13 34 9'
    const wave2 = 'M2 16C8 11 14 21 20 16C26 11 30 20 34 16'
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 24" width="36" style="display:block;height:auto;max-width:100%;">
        ${flowTrailSvg(wave1, primary, 1.35, '12 32', -44, '3.8s', animated)}
        ${flowTrailSvg(wave2, accent, 1.25, '10 32', 42, '4.4s', animated)}
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
    const { primary, accent } = resolveMotionColors(colors)
    const wave1 = 'M4 21C11 18.5 17 23.5 24 21C31 18.5 37 23.5 44 21'
    const wave2 = 'M4 25C11 22.5 17 27.5 24 25C31 22.5 37 27.5 44 25'
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 28" width="48" style="display:block;height:auto;max-width:100%;">
        ${waterDrop(24, 10, 0.56, primary, accent, animated)}
        ${flowTrailSvg(wave1, primary, 1.25, '14 42', -56, '3.8s', animated)}
        ${flowTrailSvg(wave2, accent, 1.15, '12 42', 54, '4.4s', animated)}
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
    const { primary, primaryMid, accent } = resolveMotionColors(colors)
    const d = 'M20 9C160 9 240 5 320 5C400 5 480 9 620 9'
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 16" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M180 12H460" stroke="${primaryMid}" stroke-width="0.85" stroke-dasharray="2 5"/>
        ${flowTrailSvg(d, primary, 1.65, '76 700', -776, '4.8s', animated)}
        <circle cx="320" cy="5" r="2.8" fill="${accent}"/>
      </svg>
    `
  },

  renderTail(colors: PaletteColors, animated: boolean, label = 'END · 继续阅读'): string {
    const { primary, primarySoft, primaryMid, accent } = resolveMotionColors(colors)
    const leftSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 84" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M14 58H186" stroke="${primarySoft}" stroke-width="0.9"/>
        ${rippleRings(68, 42, 1.15, primary, primaryMid, accent, animated)}
      </svg>
    `
    const rightSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 84" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M14 58H186" stroke="${primarySoft}" stroke-width="0.9"/>
        ${waterDrop(134, 36, 1.15, primary, accent, animated)}
      </svg>
    `
    const spineSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 24" width="100%" style="display:block;width:100%;height:auto;max-width:100%;">
        <path d="M30 17H720" stroke="${primaryMid}" stroke-width="0.85" stroke-dasharray="3 6"/>
        ${flowTrailSvg('M30 12C200 12 280 5 375 5C470 5 550 12 720 12', primary, 1.75, '96 840', -936, '4.8s', animated)}
      </svg>
    `
    return tailFrameHtml(leftSvg, rightSvg, spineSvg, label, colors)
  }
}
