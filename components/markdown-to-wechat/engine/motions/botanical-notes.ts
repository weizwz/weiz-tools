import { MotionPreset, PaletteColors } from '../types'
import {
  bannerFrameHtml,
  flowTrailSvg,
  imagePlaceholderHtml,
  pulseAnim,
  resolveMotionColors,
  sectionBadgeHtml,
  swayAnim,
  tailFrameHtml
} from './helpers'

function sprigSvg(
  primary: string,
  accent: string,
  muted: string,
  transform: string,
  roundLeaf: boolean,
  swayValues: string,
  dur: string,
  animated: boolean,
  begin = '0s',
  flipX = false
): string {
  const leafFill = roundLeaf ? muted : accent
  const leafPath = roundLeaf
    ? 'M0 0C-4-10-14-12-17-3C-18 5-8 10 0 0Z'
    : 'M0 0L-5-5L-9-4L-10-9L-15-8L-14-13C-7-15-2-10 0 0Z'
  const leaves = [
    'translate(14 -27) rotate(-20) scale(0.78)',
    'translate(26 -37) rotate(150) scale(0.72)',
    'translate(39 -51) rotate(155) scale(0.66)',
    'translate(17 -49) rotate(18) scale(0.74)',
    'translate(1 -63) rotate(-28) scale(0.72)',
    'translate(-6 -77) rotate(-18) scale(0.64)',
    'translate(18 -69) rotate(165) scale(0.7)',
    'translate(33 -84) rotate(150) scale(0.62)',
    'translate(11 -101) rotate(84) scale(0.62)'
  ]
    .map(
      (t) =>
        `<g transform="${t}"><path d="${leafPath}" fill="${leafFill}" stroke="${primary}" stroke-width="0.65"/><path d="M0 0L-15-5" fill="none" stroke="${primary}" stroke-width="0.55"/></g>`
    )
    .join('')

  const inner = `
    <path d="M0 0C10-16 18-39 18-68C18-82 15-94 10-104" fill="none" stroke="${primary}" stroke-width="1.05"/>
    <path d="M13-28C28-34 37-43 44-56M17-49C4-57-4-68-8-80M17-69C29-75 37-84 40-94" fill="none" stroke="${primary}" stroke-width="0.75"/>
    ${leaves}
    <g fill="${accent}" stroke="${primary}" stroke-width="0.45">
      <circle cx="42" cy="-57" r="2.8"/><circle cx="37" cy="-62" r="2.2"/><circle cx="-8" cy="-82" r="2.5"/>
    </g>
  `
  return `
    <g transform="${transform}">
      ${flipX ? `<g transform="scale(-1 1)">${inner}</g>` : inner}
      ${swayAnim(swayValues, dur, animated, begin)}
    </g>
  `
}

function fivePetalFlower(primary: string, accent: string, muted: string, transform: string): string {
  const petals = [0, 72, 144, 216, 288]
    .map(
      (deg) =>
        `<ellipse cx="0" cy="-7" rx="4.3" ry="7.2" transform="rotate(${deg})" fill="${muted}" stroke="${primary}" stroke-width="0.55"/>`
    )
    .join('')
  return `<g transform="${transform}">${petals}<circle cx="0" cy="0" r="2.8" fill="${accent}" stroke="${primary}" stroke-width="0.5"/></g>`
}

function renderBadgeSvg(colors: PaletteColors, animated: boolean): string {
  const { primary, accent, muted, ink } = resolveMotionColors(colors)
  const spine =
    'M22 153C64.5 146 88.1 157 116.4 153C147.1 148 173.0 158 201.4 153C225.0 149 241.5 155 258 152'
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 180" width="100%" style="display:block;width:100%;height:auto;">
      ${flowTrailSvg(spine, primary, 1.9, '44.8 360', -404.8, '3.8s', animated)}
      <g transform="translate(46 30) scale(0.67)">
        <path d="M72 154C116 116 144 70 154 18" fill="none" stroke="${primary}" stroke-width="2"/>
        <path d="M140 72C104 74 80 58 68 32C104 30 130 44 140 72ZM132 104C98 116 70 108 48 84C82 72 110 80 132 104ZM150 48C140 24 148 12 168 10C180 32 174 44 150 48Z" fill="${primary}" opacity="0.78"/>
        <circle cx="178" cy="72" r="7" fill="${accent}"/><circle cx="204" cy="52" r="4" fill="${accent}"/><circle cx="216" cy="84" r="5" fill="${accent}"/>
        <path d="M188 126H252M202 136H238" fill="none" stroke="${ink}" stroke-width="1.1"/>
      </g>
      <g transform="translate(140 153) scale(0.48 0.48)">
        ${sprigSvg(primary, accent, muted, 'translate(-24 0) scale(0.78)', false, '0 0 0;5.6 0 0;0 0 0;-4.5 0 0;0 0 0', '4.8s', animated)}
        ${fivePetalFlower(primary, accent, muted, 'translate(30 -42) scale(0.68)')}
      </g>
    </svg>
  `
}

export const botanicalNotesMotion: MotionPreset = {
  id: 'botanical-notes',
  name: '植物手记',

  renderBannerMotion(colors: PaletteColors, animated: boolean): string {
    const { primary, accent } = resolveMotionColors(colors)
    const spine = 'M28 84C105 74 175 90 252 82C329 74 397 90 474 82C555 74 622 87 722 78'
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 104" width="100%" style="display:block;width:100%;height:auto;">
        <g>
          <path d="M84 82C102 68 112 46 128 24" fill="none" stroke="${primary}" stroke-width="1.4" stroke-linecap="round"/>
          <path d="M0 0C10 -14 25 -15 30 0C22 12 8 11 0 0Z" fill="${primary}" transform="translate(106 54) rotate(-142)"/>
          <path d="M0 0C8 -11 20 -13 25 0C18 10 7 9 0 0Z" fill="${accent}" transform="translate(120 38) rotate(-28)"/>
          <circle cx="128" cy="24" r="2.6" fill="${accent}"/>
          ${swayAnim('0 84 82;5.2 84 82;0 84 82;-4.2 84 82;0 84 82', '4.8s', animated)}
        </g>
        <g>
          <path d="M666 80C646 62 642 42 652 20" fill="none" stroke="${accent}" stroke-width="1.25" stroke-linecap="round"/>
          <path d="M0 0C9 -12 22 -14 27 0C19 11 7 10 0 0Z" fill="${accent}" transform="translate(632 50) rotate(-30)"/>
          <path d="M0 0C7 -10 18 -11 22 0C16 9 6 8 0 0Z" fill="${primary}" transform="translate(646 32) rotate(-151)"/>
          <circle cx="652" cy="20" r="2.4" fill="${accent}"/>
          ${swayAnim('0 666 80;5.2 666 80;0 666 80;-4.2 666 80;0 666 80', '4.8s', animated, '0.35s')}
        </g>
        ${flowTrailSvg(spine, primary, 1.88, '120 942', -1062, '3.8s', animated)}
      </svg>
    `
  },

  renderBannerFrame(innerHtml: string, colors: PaletteColors, animated: boolean): string {
    const { primary, accent, muted } = resolveMotionColors(colors)
    const flowerBadge = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100%" style="display:block;width:100%;height:auto;">
        ${fivePetalFlower(primary, accent, muted, 'translate(32 32) scale(1.85)')}
      </svg>
    `
    return bannerFrameHtml(
      innerHtml,
      colors,
      flowerBadge,
      this.renderBannerMotion(colors, animated),
      animated
    )
  },

  renderTocDecor(colors: PaletteColors, animated: boolean): string {
    return renderBadgeSvg(colors, animated)
  },

  renderSectionBadge(colors: PaletteColors, animated: boolean): string {
    return sectionBadgeHtml(renderBadgeSvg(colors, animated), colors, animated)
  },

  renderSectionRail(colors: PaletteColors, animated: boolean, index: number): string {
    const { primary, accent } = resolveMotionColors(colors)
    const flowDur = `${(3.8 + ((index - 1) % 3) * 0.35).toFixed(2)}s`
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 50" width="100%" style="display:block;width:100%;height:auto;overflow:visible;">
        <g transform="translate(2 4) scale(0.62)">
          <path d="M91 67C61 68 40 58 32 43C23 25 34 10 53 6C65 3 77 5 89 11" fill="none" stroke="${primary}" stroke-width="1.12" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M42 55C31 54 24 48 23 39C33 40 41 45 42 55Z" fill="${primary}" opacity="0.88"/>
          <path d="M55 62C61 52 70 49 79 52C74 61 65 65 55 62Z" fill="${primary}" opacity="0.9"/>
          <path d="M31 38C21 35 16 28 18 20C27 22 33 29 31 38Z" fill="${primary}" opacity="0.86"/>
          <path d="M43 28C50 18 60 15 69 19C63 28 53 32 43 28Z" fill="${primary}" opacity="0.82"/>
          <path d="M65 7C74 -1 85 -1 93 5C85 12 75 13 65 7Z" fill="${primary}" opacity="0.86"/>
          <path d="M84 13C93 6 103 7 109 13C101 19 92 19 84 13Z" fill="${accent}" stroke="${primary}" stroke-width="0.42"/>
          ${swayAnim('0 91 67;5.6 91 67;0 91 67;-4.5 91 67;0 91 67', '4.8s', animated)}
        </g>
        ${flowTrailSvg('M64 38H636', primary, 1.68, '102.4 803.84', -906.24, flowDur, animated)}
      </svg>
    `
  },

  renderImagePlaceholder(
    caption: string,
    ratio: string,
    colors: PaletteColors,
    animated: boolean
  ): string {
    return imagePlaceholderHtml(
      renderBadgeSvg(colors, animated),
      this.name,
      caption,
      ratio,
      colors
    )
  },

  renderBlockquoteDecor(colors: PaletteColors, animated: boolean): string {
    const { primary, accent, muted } = resolveMotionColors(colors)
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 24" width="36" style="display:block;height:auto;">
        ${fivePetalFlower(primary, accent, muted, 'translate(18 12) scale(0.7)')}
        <circle cx="18" cy="12" r="2" fill="${accent}">${pulseAnim('opacity', '1;0.4;1', '2.8s', animated)}</circle>
      </svg>
    `
  },

  renderH3Marker(colors: PaletteColors, animated: boolean): string {
    const { primary, accent } = resolveMotionColors(colors)
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" width="14" style="display:block;height:auto;">
        <path d="M3 11C3 5 7 3 11 3C11 7 9 11 3 11Z" fill="${primary}" opacity="0.85"/>
        <circle cx="10.5" cy="3.5" r="1.8" fill="${accent}">${pulseAnim('opacity', '1;0.4;1', '2.6s', animated)}</circle>
      </svg>
    `
  },

  renderEndingDecor(colors: PaletteColors, animated: boolean): string {
    const { primary, accent, muted } = resolveMotionColors(colors)
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 28" width="48" style="display:block;height:auto;">
        ${fivePetalFlower(primary, accent, muted, 'translate(16 14) scale(0.8)')}
        <path d="M28 20C34 14 38 10 44 6" stroke="${primary}" stroke-width="1.2" fill="none"/>
        <circle cx="44" cy="6" r="2.2" fill="${accent}">${pulseAnim('opacity', '1;0.4;1', '2.4s', animated)}</circle>
      </svg>
    `
  },

  renderCodeBadge(colors: PaletteColors, animated: boolean): string {
    const { primary, accent } = resolveMotionColors(colors)
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 14" width="28" style="display:block;height:auto;">
        <path d="M4 10C4 5 8 4 12 4C12 8 9 10 4 10Z" fill="${primary}"/>
        <circle cx="20" cy="7" r="2.6" fill="${accent}">${pulseAnim('opacity', '1;0.35;1', '2s', animated)}</circle>
      </svg>
    `
  },

  renderDivider(colors: PaletteColors, animated: boolean): string {
    const { primary, accent, muted } = resolveMotionColors(colors)
    const wave = 'M24 12C110 6 196 18 282 12C368 6 454 18 540 12C574 9 598 13 616 11'
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 22" width="100%" style="display:block;width:100%;height:auto;">
        ${flowTrailSvg(wave, primary, 1.8, '96 760', -856, '3.8s', animated)}
        ${fivePetalFlower(primary, accent, muted, 'translate(320 11) scale(0.55)')}
      </svg>
    `
  },

  renderTail(colors: PaletteColors, animated: boolean, label = 'END · 继续阅读'): string {
    const { primary, accent, muted } = resolveMotionColors(colors)
    const leftSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 110" width="100%" style="display:block;width:100%;height:auto;">
        ${sprigSvg(primary, accent, muted, 'translate(66 100) scale(0.84)', false, '0 0 0;5.6 0 0;0 0 0;-4.5 0 0;0 0 0', '4.8s', animated)}
        ${sprigSvg(primary, accent, muted, 'translate(172 102) scale(0.56)', true, '0 0 0;-4.8 0 0;0 0 0;5.2 0 0;0 0 0', '4.8s', animated, '0.35s', true)}
        ${fivePetalFlower(primary, accent, muted, 'translate(108 58) scale(0.7)')}
        ${fivePetalFlower(primary, accent, muted, 'translate(150 82) rotate(18) scale(0.5)')}
      </svg>
    `
    const rightSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 110" width="100%" style="display:block;width:100%;height:auto;">
        ${sprigSvg(primary, accent, muted, 'translate(184 100) scale(0.8)', false, '0 0 0;5.6 0 0;0 0 0;-4.5 0 0;0 0 0', '4.8s', animated, '0.7s', true)}
        ${sprigSvg(primary, accent, muted, 'translate(76 100) scale(0.52)', true, '0 0 0;-4.8 0 0;0 0 0;5.2 0 0;0 0 0', '4.8s', animated, '1.05s')}
        ${fivePetalFlower(primary, accent, muted, 'translate(132 62) rotate(-12) scale(0.66)')}
      </svg>
    `
    const spine =
      'M30 14C154.2 7 223.2 18 306.0 14C395.7 9 471.6 19 554.4 14C623.4 10 671.7 16 720 13'
    const spineSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 28" width="100%" style="display:block;width:100%;height:auto;">
        ${flowTrailSvg(spine, primary, 1.9, '120 942', -1062, '3.8s', animated)}
        <path d="M57.6 22C188.7 18 257.7 24 347.4 21" fill="none" stroke="${accent}" stroke-width="0.65" opacity="0.62"/>
      </svg>
    `
    return tailFrameHtml(leftSvg, rightSvg, spineSvg, label, colors)
  }
}
