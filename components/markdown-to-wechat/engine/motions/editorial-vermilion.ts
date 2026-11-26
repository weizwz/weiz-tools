import { MotionPreset, PaletteColors } from '../types'
import { flowTrailSvg, pulseAnim, resolveMotionColors, swayAnim } from './helpers'

function reedCluster(
  primary: string,
  muted: string,
  transform: string,
  swayValues: string,
  animated: boolean,
  begin = '0s'
): string {
  const leaf = (tx: number, ty: number, rot: number) => `
    <g transform="translate(${tx} ${ty}) rotate(${rot})">
      <path d="M0 0C8-3 13-10 14-18C6-17 0-10 0 0Z" fill="${muted}" stroke="${primary}" stroke-width="0.5"/>
      <path d="M1-2L11-15" stroke="${primary}" stroke-width="0.45"/>
    </g>
  `
  return `
    <g transform="${transform}">
      <path d="M0 0C2-21 1-39-4-58M10 0C13-25 14-47 10-70M20 0C24-18 28-36 26-54" fill="none" stroke="${primary}" stroke-width="0.9"/>
      ${leaf(-4, -58, -18)}
      ${leaf(10, -70, 2)}
      ${leaf(26, -54, 16)}
      ${swayAnim(swayValues, '4.8s', animated, begin)}
    </g>
  `
}

function folioIcon(primary: string, muted: string, ink: string, transform: string): string {
  return `
    <g transform="${transform}">
      <path d="M0 0L46 0L58 12V72H0Z" fill="${muted}" stroke="${ink}" stroke-width="0.8"/>
      <path d="M46 0V12H58" fill="none" stroke="${ink}" stroke-width="0.65"/>
      <path d="M9 24H45M9 33H49M9 42H40M9 51H47M9 60H32" fill="none" stroke="${primary}" stroke-width="0.65"/>
    </g>
  `
}

export const editorialVermilionMotion: MotionPreset = {
  id: 'editorial-vermilion',
  name: '墨红社论',

  renderBannerMotion(colors: PaletteColors, animated: boolean): string {
    const { primary, muted, ink } = resolveMotionColors(colors)
    const spine = 'M30 82C154.2 75 223.2 86 306.0 82C395.7 77 471.6 87 554.4 82C623.4 78 671.7 84 720 81'
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 104" width="100%" style="display:block;width:100%;height:auto;">
        ${flowTrailSvg(spine, primary, 1.9, '120 942', -1062, '3.8s', animated)}
        <path d="M57.6 90C188.7 86 257.7 92 347.4 89" fill="none" stroke="${muted}" stroke-width="0.55" opacity="0.62"/>
        <g transform="translate(86 82) scale(0.44 0.44)">
          <circle cx="-35" cy="-72" r="15" fill="${primary}" opacity="0.75">${pulseAnim('opacity', '0.75;0.3;0.75', '2.6s', animated)}</circle>
          ${folioIcon(primary, muted, ink, 'translate(-8 -75) rotate(-4) scale(0.85)')}
          ${reedCluster(primary, muted, 'translate(-55 0) scale(0.68)', '0 0 0;5.8 0 0;0 0 0;-4.6 0 0;0 0 0', animated)}
        </g>
        <g transform="translate(664 82) scale(-0.3432 0.3432)">
          <circle cx="-35" cy="-72" r="15" fill="${primary}" opacity="0.75"/>
          ${folioIcon(primary, muted, ink, 'translate(-8 -75) rotate(-4) scale(0.85)')}
          ${reedCluster(primary, muted, 'translate(-55 0) scale(0.68)', '0 0 0;-4.8 0 0;0 0 0;5.4 0 0;0 0 0', animated, '0.35s')}
        </g>
      </svg>
    `
  },

  renderTocDecor(colors: PaletteColors, animated: boolean): string {
    const { primary, muted, ink } = resolveMotionColors(colors)
    const spine = 'M22 153C64.5 146 88.1 157 116.4 153C147.1 148 173.0 158 201.4 153C225.0 149 241.5 155 258 152'
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 180" width="100%" style="display:block;width:100%;height:auto;">
        ${flowTrailSvg(spine, primary, 1.9, '44.8 360', -404.8, '3.8s', animated)}
        <g transform="translate(46 30) scale(0.67)">
          <circle cx="138" cy="86" r="46" fill="${primary}" opacity="0.12"/>
          <circle cx="138" cy="86" r="30" fill="none" stroke="${primary}" stroke-width="1.8"/>
          <path d="M30 42H108M30 50H78M168 122H250M198 130H250" fill="none" stroke="${ink}" stroke-width="1.4"/>
          <path d="M138 22V150M74 86H202" fill="none" stroke="${muted}" stroke-width="1"/>
          <circle cx="202" cy="86" r="7" fill="${primary}"/>
          <rect x="44" y="116" width="30" height="8" fill="${ink}"/>
        </g>
        <g transform="translate(140 153) scale(0.48 0.48)">
          <circle cx="-35" cy="-72" r="15" fill="${primary}" opacity="0.75"/>
          ${folioIcon(primary, muted, ink, 'translate(-8 -75) rotate(-4) scale(0.85)')}
          ${reedCluster(primary, muted, 'translate(-55 0) scale(0.68)', '0 0 0;5.8 0 0;0 0 0;-4.6 0 0;0 0 0', animated)}
        </g>
      </svg>
    `
  },

  renderSectionRail(colors: PaletteColors, animated: boolean, index: number): string {
    const { primary, muted } = resolveMotionColors(colors)
    const flowDur = `${(3.8 + ((index - 1) % 3) * 0.35).toFixed(2)}s`
    const rail = 'M4 13H188C248 13 278 9 332 11C406 14 482 13 636 13'
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 20" width="100%" style="display:block;width:100%;height:auto;overflow:visible;">
        ${flowTrailSvg(rail, muted, 1.72, '102.4 803.84', -906.24, flowDur, animated)}
        <circle cx="594" cy="10" r="2.8" fill="${primary}" opacity="0.85">${pulseAnim('opacity', '0.85;0.25;0.85', '2.2s', animated)}</circle>
      </svg>
    `
  },

  renderDivider(colors: PaletteColors, animated: boolean): string {
    const { primary, muted } = resolveMotionColors(colors)
    const d = 'M20 11C140 6 230 15 320 11C410 7 500 15 620 11'
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 20" width="100%" style="display:block;width:100%;height:auto;">
        ${flowTrailSvg(d, primary, 1.85, '96 760', -856, '3.8s', animated)}
        <circle cx="320" cy="11" r="3" fill="${primary}"/>
        <circle cx="320" cy="11" r="6" fill="none" stroke="${muted}" stroke-width="0.9"/>
      </svg>
    `
  },

  renderTail(colors: PaletteColors, animated: boolean): string {
    const { primary, muted, ink } = resolveMotionColors(colors)
    const leftHorizon = 'M30 136C75 126 112 127 148 137C184 147 214 137 246 124'
    const rightHorizon = 'M504 133C540 125 570 127 598 137C627 147 664 136 716 115'
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 160" width="100%" style="display:block;width:100%;height:auto;">
        <path d="M30 151C154.2 144 223.2 155 306.0 151C395.7 146 471.6 156 554.4 151C623.4 147 671.7 153 720 150" fill="none" stroke="${primary}" stroke-width="0.9" opacity="0.9"/>
        <circle cx="82" cy="49" r="18" fill="${primary}" opacity="0.18">${pulseAnim('r', '15;21;15', '3.2s', animated)}</circle>
        <circle cx="82" cy="49" r="9" fill="${primary}" opacity="0.9"/>
        ${folioIcon(primary, muted, ink, 'translate(108 57) rotate(-4) scale(0.72)')}
        ${reedCluster(primary, muted, 'translate(48 132) scale(0.82)', '0 0 0;5.8 0 0;0 0 0;-4.6 0 0;0 0 0', animated)}
        ${flowTrailSvg(leftHorizon, primary, 2.15, '120 942', -1062, '3.8s', animated)}
        ${flowTrailSvg(rightHorizon, primary, 2.15, '120 942', -1062, '3.8s', animated, '0.22s')}
        ${reedCluster(primary, muted, 'translate(688 134) scale(0.68)', '0 0 0;5.8 0 0;0 0 0;-4.6 0 0;0 0 0', animated)}
        <path d="M504 146H564M180 148H246" fill="none" stroke="${muted}" stroke-width="0.75" opacity="0.9"/>
      </svg>
    `
  }
}
