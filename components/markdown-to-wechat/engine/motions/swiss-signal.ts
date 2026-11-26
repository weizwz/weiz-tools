import { MotionPreset, PaletteColors } from '../types'
import { flowTrailSvg, resolveMotionColors, rotateAnim } from './helpers'

function signalCluster(
  primary: string,
  accent: string,
  ink: string,
  transform: string,
  clockwise: boolean,
  animated: boolean
): string {
  const rot = clockwise ? rotateAnim('0 0 0', '360 0 0', '7.2s', animated) : rotateAnim('0 0 0', '-360 0 0', '7.2s', animated)
  return `
    <g transform="${transform}">
      <g transform="translate(-28 -40) scale(0.76)">
        <g>
          <circle cx="0" cy="0" r="30" fill="none" stroke="${ink}" stroke-width="0.8"/>
          <circle cx="0" cy="0" r="19" fill="none" stroke="${ink}" stroke-width="0.65" opacity="0.75"/>
          <circle cx="0" cy="0" r="5" fill="${primary}"/>
          <path d="M-38 0H38M0-38V38M-26-26L26 26M26-26L-26 26" fill="none" stroke="${ink}" stroke-width="0.55" opacity="0.65"/>
          ${rot}
        </g>
        <path d="M0 0L23-15" stroke="${primary}" stroke-width="1"/>
        <circle cx="23" cy="-15" r="2.8" fill="${primary}"/>
      </g>
      <g fill="${ink}">
        <rect x="18" y="-18" width="6" height="18"/><rect x="29" y="-32" width="6" height="32"/>
        <rect x="40" y="-25" width="6" height="25"/><rect x="51" y="-42" width="6" height="42"/>
      </g>
      <circle cx="68" cy="-34" r="5" fill="${accent}"/>
    </g>
  `
}

export const swissSignalMotion: MotionPreset = {
  id: 'swiss-signal',
  name: '瑞士信号',

  renderBannerMotion(colors: PaletteColors, animated: boolean): string {
    const { primary, accent, ink } = resolveMotionColors(colors)
    const spine = 'M30 82H223.2L264.6 75H485.4L526.8 82H720'
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 104" width="100%" style="display:block;width:100%;height:auto;">
        ${flowTrailSvg(spine, primary, 1.9, '120 942', -1062, '3.8s', animated)}
        <path d="M57.6 90C188.7 86 257.7 92 347.4 89" fill="none" stroke="${accent}" stroke-width="0.55" opacity="0.62"/>
        ${signalCluster(primary, accent, ink, 'translate(86 82) scale(0.44 0.44)', true, animated)}
        ${signalCluster(primary, accent, ink, 'translate(664 82) scale(-0.3432 0.3432)', false, animated)}
      </svg>
    `
  },

  renderTocDecor(colors: PaletteColors, animated: boolean): string {
    const { primary, accent, muted, ink } = resolveMotionColors(colors)
    const spine = 'M22 153H88.1L102.2 146H177.8L191.9 153H258'
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 180" width="100%" style="display:block;width:100%;height:auto;">
        ${flowTrailSvg(spine, primary, 1.9, '44.8 360', -404.8, '3.8s', animated)}
        <g transform="translate(46 30) scale(0.67)">
          <circle cx="140" cy="86" r="54" fill="none" stroke="${primary}" stroke-width="1.8"/>
          <circle cx="140" cy="86" r="8" fill="${accent}"/>
          <path d="M74 86H206M140 20V152" fill="none" stroke="${muted}" stroke-width="1"/>
          <path d="M34 138L98 38M46 146L110 46" fill="none" stroke="${ink}" stroke-width="1.5"/>
          <rect x="196" y="30" width="52" height="14" fill="${ink}"/><rect x="204" y="52" width="44" height="10" fill="${primary}"/>
        </g>
        ${signalCluster(primary, accent, ink, 'translate(140 153) scale(0.48 0.48)', true, animated)}
      </svg>
    `
  },

  renderSectionRail(colors: PaletteColors, animated: boolean, index: number): string {
    const { primary, muted } = resolveMotionColors(colors)
    const flowDur = `${(3.8 + ((index - 1) % 3) * 0.35).toFixed(2)}s`
    const rail = 'M4 13H224L244 7H416L436 13H636'
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 20" width="100%" style="display:block;width:100%;height:auto;overflow:visible;">
        ${flowTrailSvg(rail, muted, 1.72, '102.4 803.84', -906.24, flowDur, animated)}
        <circle cx="594" cy="10" r="2.8" fill="${primary}" opacity="0.82"/>
      </svg>
    `
  },

  renderDivider(colors: PaletteColors, animated: boolean): string {
    const { primary, accent } = resolveMotionColors(colors)
    const d = 'M20 12H230L256 6H384L410 12H620'
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 18" width="100%" style="display:block;width:100%;height:auto;">
        ${flowTrailSvg(d, primary, 1.85, '96 760', -856, '3.8s', animated)}
        <rect x="315" y="3.5" width="10" height="5" fill="${accent}"/>
      </svg>
    `
  },

  renderTail(colors: PaletteColors, animated: boolean): string {
    const { primary, accent, muted, ink } = resolveMotionColors(colors)
    const spine = 'M30 151H223.2L264.6 144H485.4L526.8 151H720'
    const target = (tx: number, ty: number, scale: number, strokeCol: string, dotCol: string, clockwise: boolean) => `
      <g transform="translate(${tx} ${ty}) scale(${scale})">
        <g>
          <circle cx="0" cy="0" r="30" fill="none" stroke="${strokeCol}" stroke-width="0.8"/>
          <circle cx="0" cy="0" r="19" fill="none" stroke="${strokeCol}" stroke-width="0.65" opacity="0.75"/>
          <circle cx="0" cy="0" r="5" fill="${dotCol}"/>
          <path d="M-38 0H38M0-38V38M-26-26L26 26M26-26L-26 26" fill="none" stroke="${strokeCol}" stroke-width="0.55" opacity="0.65"/>
          ${clockwise ? rotateAnim('0 0 0', '360 0 0', '7.2s', animated) : rotateAnim('0 0 0', '-360 0 0', '7.2s', animated)}
        </g>
        <path d="M0 0L23-15" stroke="${dotCol}" stroke-width="1"/>
        <circle cx="23" cy="-15" r="2.8" fill="${dotCol}"/>
      </g>
    `
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 160" width="100%" style="display:block;width:100%;height:auto;">
        ${flowTrailSvg(spine, primary, 1.9, '120 942', -1062, '3.8s', animated)}
        <path d="M57.6 159C188.7 155 257.7 161 347.4 158" fill="none" stroke="${accent}" stroke-width="0.55" opacity="0.62"/>
        ${target(94, 94, 0.72, ink, primary, true)}
        <path d="M32 137H166L194 109H246" fill="none" stroke="${ink}" stroke-width="1.15"/>
        <circle cx="32" cy="137" r="4.5" fill="${primary}"/>
        <circle cx="194" cy="109" r="3.5" fill="${accent}"/>
        <circle cx="246" cy="109" r="2.8" fill="${primary}"/>
        <path d="M504 128H560C583 128 594 103 617 103H716" fill="none" stroke="${primary}" stroke-width="1.25"/>
        ${target(617, 103, 0.48, primary, accent, false)}
        <g fill="${ink}">
          <rect x="656" y="120" width="5" height="12"/><rect x="666" y="110" width="5" height="22"/>
          <rect x="676" y="116" width="5" height="16"/><rect x="686" y="101" width="5" height="31"/>
          <rect x="696" y="107" width="5" height="25"/>
        </g>
        <path d="M617 64V142M578 103H656" fill="none" stroke="${muted}" stroke-width="0.65" opacity="0.8"/>
      </svg>
    `
  }
}
