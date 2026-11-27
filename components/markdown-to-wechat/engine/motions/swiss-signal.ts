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

function signalCluster(
  primary: string,
  accent: string,
  ink: string,
  transform: string,
  clockwise: boolean,
  animated: boolean
): string {
  const rot = clockwise
    ? rotateAnim('0 0 0', '360 0 0', '7.2s', animated)
    : rotateAnim('0 0 0', '-360 0 0', '7.2s', animated)
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

function targetGraphic(
  tx: number,
  ty: number,
  scale: number,
  strokeCol: string,
  dotCol: string,
  clockwise: boolean,
  animated: boolean
): string {
  const rot = clockwise
    ? rotateAnim('0 0 0', '360 0 0', '7.2s', animated)
    : rotateAnim('0 0 0', '-360 0 0', '7.2s', animated)
  return `
    <g transform="translate(${tx} ${ty}) scale(${scale})">
      <g>
        <circle cx="0" cy="0" r="30" fill="none" stroke="${strokeCol}" stroke-width="0.8"/>
        <circle cx="0" cy="0" r="19" fill="none" stroke="${strokeCol}" stroke-width="0.65" opacity="0.75"/>
        <circle cx="0" cy="0" r="5" fill="${dotCol}"/>
        <path d="M-38 0H38M0-38V38M-26-26L26 26M26-26L-26 26" fill="none" stroke="${strokeCol}" stroke-width="0.55" opacity="0.65"/>
        ${rot}
      </g>
      <path d="M0 0L23-15" stroke="${dotCol}" stroke-width="1"/>
      <circle cx="23" cy="-15" r="2.8" fill="${dotCol}"/>
    </g>
  `
}

function renderBadgeSvg(colors: PaletteColors, animated: boolean): string {
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

  renderBannerFrame(innerHtml: string, colors: PaletteColors, animated: boolean): string {
    const { primary, accent, muted } = resolveMotionColors(colors)
    const ringSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100%" style="display:block;width:100%;height:auto;">
        <path d="M32 4V60M4 32H60" stroke="${muted}" stroke-width="1"/>
        <circle cx="32" cy="32" r="22" fill="none" stroke="${primary}" stroke-width="2.2"/>
        <circle cx="32" cy="32" r="6" fill="${accent}">${pulseAnim('r', '5.5;7.2;5.5', '2.8s', animated)}</circle>
      </svg>
    `
    return bannerFrameHtml(
      innerHtml,
      colors,
      ringSvg,
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
    const { primary, accent } = resolveMotionColors(colors)
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 24" width="36" style="display:block;height:auto;">
        <circle cx="12" cy="12" r="7" fill="none" stroke="${primary}" stroke-width="1.2"/>
        <circle cx="12" cy="12" r="2.5" fill="${accent}">${pulseAnim('opacity', '1;0.35;1', '2.4s', animated)}</circle>
        <rect x="24" y="6" width="8" height="3" fill="${primary}"/>
        <rect x="24" y="12" width="6" height="2.5" fill="${accent}"/>
      </svg>
    `
  },

  renderH3Marker(colors: PaletteColors, animated: boolean): string {
    const { primary, accent } = resolveMotionColors(colors)
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" width="14" style="display:block;height:auto;">
        <rect x="2" y="2" width="10" height="10" fill="none" stroke="${primary}" stroke-width="1.4"/>
        <circle cx="7" cy="7" r="2.5" fill="${accent}">${pulseAnim('r', '2;3;2', '2.6s', animated)}</circle>
      </svg>
    `
  },

  renderEndingDecor(colors: PaletteColors, animated: boolean): string {
    const { primary, accent, muted } = resolveMotionColors(colors)
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 28" width="48" style="display:block;height:auto;">
        <circle cx="14" cy="14" r="9" fill="none" stroke="${primary}" stroke-width="1.2"/>
        <path d="M14 2V26M2 14H26" stroke="${muted}" stroke-width="0.8"/>
        <circle cx="14" cy="14" r="2.6" fill="${accent}">${pulseAnim('opacity', '1;0.4;1', '2.8s', animated)}</circle>
        <rect x="30" y="7" width="12" height="3.5" fill="${primary}"/>
        <rect x="34" y="14" width="8" height="3.5" fill="${accent}"/>
      </svg>
    `
  },

  renderCodeBadge(colors: PaletteColors, animated: boolean): string {
    const { primary, accent } = resolveMotionColors(colors)
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 14" width="28" style="display:block;height:auto;">
        <circle cx="7" cy="7" r="3" fill="${primary}"/>
        <circle cx="18" cy="7" r="3" fill="${accent}">${pulseAnim('opacity', '1;0.3;1', '1.8s', animated)}</circle>
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

  renderTail(colors: PaletteColors, animated: boolean, label = 'END · 继续阅读'): string {
    const { primary, accent, muted, ink } = resolveMotionColors(colors)
    const leftSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 100" width="100%" style="display:block;width:100%;height:auto;">
        ${targetGraphic(72, 42, 0.72, ink, primary, true, animated)}
        <path d="M12 88H146L174 60H234" fill="none" stroke="${ink}" stroke-width="1.35"/>
        <circle cx="12" cy="88" r="4.5" fill="${primary}"/>
        <circle cx="174" cy="60" r="3.6" fill="${accent}"/>
        <circle cx="234" cy="60" r="3" fill="${primary}"/>
      </svg>
    `
    const rightSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 100" width="100%" style="display:block;width:100%;height:auto;">
        <path d="M12 72H68C91 72 102 48 125 48H230" fill="none" stroke="${primary}" stroke-width="1.45"/>
        <path d="M125 10V86M86 48H164" fill="none" stroke="${muted}" stroke-width="0.75" opacity="0.8"/>
        ${targetGraphic(125, 48, 0.48, primary, accent, false, animated)}
        <g fill="${ink}">
          <rect x="166" y="64" width="5" height="12"/><rect x="176" y="54" width="5" height="22"/>
          <rect x="186" y="60" width="5" height="16"/><rect x="196" y="45" width="5" height="31"/>
          <rect x="206" y="51" width="5" height="25"/>
        </g>
      </svg>
    `
    const spine = 'M30 14H223.2L264.6 7H485.4L526.8 14H720'
    const spineSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 28" width="100%" style="display:block;width:100%;height:auto;">
        ${flowTrailSvg(spine, primary, 1.9, '120 942', -1062, '3.8s', animated)}
        <path d="M57.6 22C188.7 18 257.7 24 347.4 21" fill="none" stroke="${accent}" stroke-width="0.65" opacity="0.62"/>
      </svg>
    `
    return tailFrameHtml(leftSvg, rightSvg, spineSvg, label, colors)
  }
}
