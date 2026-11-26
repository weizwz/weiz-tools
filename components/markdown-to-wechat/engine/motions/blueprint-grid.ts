import { MotionPreset, PaletteColors } from '../types'
import { flowTrailSvg, resolveMotionColors, rotateAnim } from './helpers'

function cluster(
  primary: string,
  accent: string,
  muted: string,
  transform: string,
  clockwise: boolean,
  animated: boolean,
  dur = '7.2s'
): string {
  const rot = clockwise ? rotateAnim('0 0 0', '360 0 0', dur, animated) : rotateAnim('0 0 0', '-360 0 0', dur, animated)
  return `
    <g transform="${transform}">
      <g transform="translate(-34 -40) scale(0.75)">
        <g>
          <circle cx="0" cy="0" r="30" fill="none" stroke="${primary}" stroke-width="0.78"/>
          <circle cx="0" cy="0" r="18" fill="none" stroke="${muted}" stroke-width="0.62"/>
          <path d="M-38 0H38M0-38V38M-21-21L21 21M21-21L-21 21" fill="none" stroke="${primary}" stroke-width="0.52" opacity="0.8"/>
          ${rot}
        </g>
        <path d="M0 0L23-15L34-7" fill="none" stroke="${accent}" stroke-width="0.95"/>
        <circle cx="0" cy="0" r="4" fill="${accent}"/>
        <circle cx="23" cy="-15" r="2.7" fill="${accent}"/>
      </g>
      <g transform="translate(10 0) scale(0.62)">
        <path d="M0 0C17-11 25-29 40-37C55-45 65-23 82-19C99-15 109-36 126-42C144-49 151-18 176-9L176 8H0Z" fill="none" stroke="${primary}" stroke-width="0.75"/>
        <path d="M22-8C39-20 46-28 58-24M86-9C104-20 116-30 132-27M129-27C140-20 151-14 165-11" fill="none" stroke="${primary}" stroke-width="0.55" opacity="0.72"/>
      </g>
      <path d="M-72 4H76M-62-2V8M-42 0V8M58-2V8M72-2V8" stroke="${muted}" stroke-width="0.65"/>
    </g>
  `
}

export const blueprintGridMotion: MotionPreset = {
  id: 'blueprint-grid',
  name: '蓝图网格',

  renderBannerMotion(colors: PaletteColors, animated: boolean): string {
    const { primary, accent, muted } = resolveMotionColors(colors)
    const spine = 'M30 82H223.2L264.6 75H485.4L526.8 82H720'
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 104" width="100%" style="display:block;width:100%;height:auto;">
        ${flowTrailSvg(spine, primary, 1.9, '120 942', -1062, '3.8s', animated)}
        <path d="M57.6 90C188.7 86 257.7 92 347.4 89" fill="none" stroke="${accent}" stroke-width="0.55" opacity="0.62"/>
        ${cluster(primary, accent, muted, 'translate(86 82) scale(0.44 0.44)', true, animated)}
        ${cluster(primary, accent, muted, 'translate(664 82) scale(-0.3432 0.3432)', false, animated)}
        <path d="M54 71H164L188 60H274M476 68H558L584 56H696" fill="none" stroke="${muted}" stroke-width="0.62" stroke-linecap="round"/>
        <circle cx="188" cy="60" r="2.1" fill="${accent}"/>
        <circle cx="584" cy="56" r="2.1" fill="${accent}" opacity="0.78"/>
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
          <circle cx="138" cy="86" r="58" fill="none" stroke="${primary}" stroke-width="1.6"/>
          <circle cx="138" cy="86" r="36" fill="none" stroke="${muted}" stroke-width="1.1"/>
          <path d="M138 20V152M72 86H204M91 39L185 133M185 39L91 133" fill="none" stroke="${muted}" stroke-width="1"/>
          <path d="M138 36L150 74L188 86L150 98L138 136L126 98L88 86L126 74Z" fill="none" stroke="${accent}" stroke-width="1.4"/>
          <circle cx="226" cy="52" r="6" fill="${primary}"/>
          <path d="M210 126H258" fill="none" stroke="${ink}" stroke-width="1.2"/>
        </g>
        ${cluster(primary, accent, muted, 'translate(140 153) scale(0.48 0.48)', true, animated)}
        <path d="M24 158H94L112 149H186L204 156H258M42 129V143M232 126V143" fill="none" stroke="${muted}" stroke-width="0.62" stroke-linecap="round"/>
      </svg>
    `
  },

  renderSectionRail(colors: PaletteColors, animated: boolean, index: number): string {
    const { primary, accent, muted, bg } = resolveMotionColors(colors)
    const rotDur = `${(7.2 + ((index - 1) % 3) * 0.7).toFixed(1)}s`
    const flowDur = `${(3.8 + ((index - 1) % 3) * 0.35).toFixed(2)}s`
    const rail = 'M57 38H188C199 38 204 33 204 24V20C204 14 209 10 216 10H359C369 10 374 15 374 24V28C374 34 379 38 387 38H636'
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 48" width="100%" style="display:block;width:100%;height:auto;overflow:visible;">
        <g>
          <circle cx="30" cy="24" r="16" fill="none" stroke="${primary}" stroke-width="1"/>
          <path d="M30 4V44M10 24H50" fill="none" stroke="${primary}" stroke-width="0.65"/>
          <path d="M30 10L34 20L44 24L34 28L30 38L26 28L16 24L26 20Z" fill="none" stroke="${accent}" stroke-width="0.9" stroke-linejoin="round"/>
          <circle cx="30" cy="24" r="2" fill="${bg}" stroke="${primary}" stroke-width="0.8"/>
          ${rotateAnim('0 30 24', '360 30 24', rotDur, animated)}
        </g>
        ${flowTrailSvg(rail, primary, 2.05, '102.4 803.84', -906.24, flowDur, animated)}
        <circle cx="204" cy="24" r="2.1" fill="${accent}"/>
        <circle cx="374" cy="24" r="2.1" fill="${accent}"/>
        <circle cx="548" cy="38" r="3" fill="${bg}" stroke="${primary}" stroke-width="1"/>
        <circle cx="636" cy="38" r="3.1" fill="${bg}" stroke="${accent}" stroke-width="1"/>
        <path d="M566 29V43M580 29V43M594 29V43" stroke="${muted}" stroke-width="0.65"/>
      </svg>
    `
  },

  renderDivider(colors: PaletteColors, animated: boolean): string {
    const { primary, accent } = resolveMotionColors(colors)
    const d = 'M20 12H230L256 6H384L410 12H620'
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 18" width="100%" style="display:block;width:100%;height:auto;">
        ${flowTrailSvg(d, primary, 1.8, '96 760', -856, '3.8s', animated)}
        <circle cx="320" cy="6" r="2.6" fill="${accent}"/>
      </svg>
    `
  },

  renderTail(colors: PaletteColors, animated: boolean): string {
    const { primary, accent, muted } = resolveMotionColors(colors)
    const spine = 'M30 151H224L262 145H488L526 151H720'
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 160" width="100%" style="display:block;width:100%;height:auto;">
        ${flowTrailSvg(spine, primary, 1.9, '120 942', -1062, '3.8s', animated)}
        <g stroke="${muted}" stroke-width="0.55">
          <path d="M38 139V127M54 139V132M70 139V127M86 139V132M102 139V127M118 139V132M134 139V127M150 139V132M166 139V127M182 139V132M198 139V127M214 139V132M230 139V127"/>
        </g>
        <g transform="translate(96 91) scale(0.78)">
          <g>
            <circle cx="0" cy="0" r="30" fill="none" stroke="${primary}" stroke-width="0.78"/>
            <circle cx="0" cy="0" r="18" fill="none" stroke="${muted}" stroke-width="0.62"/>
            <path d="M-38 0H38M0-38V38M-21-21L21 21M21-21L-21 21" fill="none" stroke="${primary}" stroke-width="0.52" opacity="0.8"/>
            ${rotateAnim('0 0 0', '360 0 0', '7.2s', animated)}
          </g>
          <path d="M0 0L23-15L34-7" fill="none" stroke="${accent}" stroke-width="0.95"/>
          <circle cx="0" cy="0" r="4" fill="${accent}"/>
          <circle cx="23" cy="-15" r="2.7" fill="${accent}"/>
        </g>
        <path d="M30 139H180C205 139 221 124 246 108" fill="none" stroke="${primary}" stroke-width="1.05"/>
        <circle cx="246" cy="108" r="3" fill="${accent}"/>
        <path d="M504 142C526 134 542 112 559 97C578 80 590 107 608 112C629 118 644 97 660 82C676 66 691 79 704 94C711 101 716 104 722 106" fill="none" stroke="${primary}" stroke-width="1.05"/>
        <path d="M526 137C544 125 553 107 565 101C576 96 585 113 598 118M624 113C641 105 651 88 664 82C675 77 687 91 699 99" fill="none" stroke="${muted}" stroke-width="0.65"/>
        <path d="M512 147C544 139 570 138 595 144C621 150 646 143 670 136C689 131 705 134 720 139" fill="none" stroke="${muted}" stroke-width="0.65"/>
        <circle cx="660" cy="82" r="3.2" fill="${accent}"/>
        <circle cx="608" cy="112" r="2.2" fill="${primary}"/>
        <path d="M272 144H340L356 136H394L410 144H478M302 131V142M448 132V143" fill="none" stroke="${muted}" stroke-width="0.62" stroke-linecap="round"/>
      </svg>
    `
  }
}
