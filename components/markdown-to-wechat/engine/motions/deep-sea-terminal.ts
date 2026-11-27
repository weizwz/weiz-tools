import { MotionPreset, PaletteColors } from '../types'
import {
  bannerFrameHtml,
  flowTrailSvg,
  imagePlaceholderHtml,
  pulseAnim,
  resolveMotionColors,
  rotateAnim,
  sectionBadgeHtml,
  swayAnim,
  tailFrameHtml
} from './helpers'

function coralBranch(
  primary: string,
  accent: string,
  transform: string,
  swayValues: string,
  animated: boolean,
  begin = '0s',
  flipX = false
): string {
  const inner = `
    <path d="M0 0C2-18 0-36-5-54M-2-27C-17-34-22-46-23-60M-5-43C9-51 15-63 17-77M-15-39C-29-43-36-52-40-64" fill="none" stroke="${primary}" stroke-width="1.2" stroke-linecap="round"/>
    <g fill="${accent}"><circle cx="-5" cy="-54" r="2.4"/><circle cx="-23" cy="-60" r="2.4"/><circle cx="17" cy="-77" r="2.4"/><circle cx="-40" cy="-64" r="2.4"/></g>
  `
  return `
    <g transform="${transform}">
      ${flipX ? `<g transform="scale(-1 1)">${inner}</g>` : inner}
      ${swayAnim(swayValues, '4.8s', animated, begin)}
    </g>
  `
}

function sonarTarget(
  primary: string,
  accent: string,
  transform: string,
  clockwise: boolean,
  animated: boolean
): string {
  const rot = clockwise
    ? rotateAnim('0 0 0', '360 0 0', '7.2s', animated)
    : rotateAnim('0 0 0', '-360 0 0', '7.2s', animated)
  return `
    <g transform="${transform}">
      <g>
        <circle cx="0" cy="0" r="30" fill="none" stroke="${primary}" stroke-width="0.8"/>
        <circle cx="0" cy="0" r="19" fill="none" stroke="${primary}" stroke-width="0.65" opacity="0.75"/>
        <circle cx="0" cy="0" r="5" fill="${accent}"/>
        <path d="M-38 0H38M0-38V38M-26-26L26 26M26-26L-26 26" fill="none" stroke="${primary}" stroke-width="0.55" opacity="0.65"/>
        ${rot}
      </g>
      <path d="M0 0L23-15" stroke="${accent}" stroke-width="1"/>
      <circle cx="23" cy="-15" r="2.8" fill="${accent}"/>
    </g>
  `
}

function renderBadgeSvg(colors: PaletteColors, animated: boolean): string {
  const { primary, accent, muted } = resolveMotionColors(colors)
  const spine =
    'M22 153C55 143 76.3 159 102.2 153C128.2 146 151.8 160 177.8 153C206.1 145 229.7 158 258 151'
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 180" width="100%" style="display:block;width:100%;height:auto;">
      ${flowTrailSvg(spine, primary, 1.9, '44.8 360', -404.8, '3.8s', animated)}
      <g transform="translate(46 30) scale(0.67)">
        <circle cx="138" cy="88" r="62" fill="none" stroke="${primary}" stroke-width="1.7"/>
        <circle cx="138" cy="88" r="42" fill="none" stroke="${muted}" stroke-width="1.1"/>
        <circle cx="138" cy="88" r="20" fill="none" stroke="${accent}" stroke-width="1.3"/>
        <path d="M138 20V156M70 88H206" fill="none" stroke="${muted}" stroke-width="1"/>
        <path d="M138 88L204 52" fill="none" stroke="${primary}" stroke-width="1.8"/>
        <circle cx="204" cy="52" r="7" fill="${accent}"/>
      </g>
      <g transform="translate(140 153) scale(0.48 0.48)">
        ${coralBranch(primary, accent, 'translate(-42 0) scale(0.72)', '0 0 0;5.6 0 0;0 0 0;-4.5 0 0;0 0 0', animated)}
        ${sonarTarget(primary, accent, 'translate(24 -39) scale(0.55)', true, animated)}
        <path d="M52-55C62-62 72-61 80-55C72-48 62-48 52-55ZM45-62L52-55L45-48Z" fill="${accent}"/>
      </g>
    </svg>
  `
}

export const deepSeaTerminalMotion: MotionPreset = {
  id: 'deep-sea-terminal',
  name: '深海终端',

  renderBannerMotion(colors: PaletteColors, animated: boolean): string {
    const { primary, accent } = resolveMotionColors(colors)
    const spine =
      'M30 82C126.6 72 188.7 88 264.6 82C340.5 75 409.5 89 485.4 82C568.2 74 637.2 87 720 80'
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 104" width="100%" style="display:block;width:100%;height:auto;">
        ${flowTrailSvg(spine, primary, 1.9, '120 942', -1062, '3.8s', animated)}
        <path d="M57.6 90C188.7 86 257.7 92 347.4 89" fill="none" stroke="${accent}" stroke-width="0.55" opacity="0.62"/>
        <g transform="translate(86 82) scale(0.44 0.44)">
          ${coralBranch(primary, accent, 'translate(-42 0) scale(0.72)', '0 0 0;5.6 0 0;0 0 0;-4.5 0 0;0 0 0', animated)}
          ${sonarTarget(primary, accent, 'translate(24 -39) scale(0.55)', true, animated)}
          <path d="M52-55C62-62 72-61 80-55C72-48 62-48 52-55ZM45-62L52-55L45-48Z" fill="${accent}"/>
        </g>
        <g transform="translate(664 82) scale(-0.3432 0.3432)">
          ${coralBranch(primary, accent, 'translate(-42 0) scale(0.72)', '0 0 0;-4.8 0 0;0 0 0;5.2 0 0;0 0 0', animated, '0.35s')}
          ${sonarTarget(primary, accent, 'translate(24 -39) scale(0.55)', false, animated)}
          <path d="M52-55C62-62 72-61 80-55C72-48 62-48 52-55ZM45-62L52-55L45-48Z" fill="${accent}"/>
        </g>
      </svg>
    `
  },

  renderBannerFrame(innerHtml: string, colors: PaletteColors, animated: boolean): string {
    const { primary, accent } = resolveMotionColors(colors)
    const sonarBadge = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="100%" style="display:block;width:100%;height:auto;">
        ${sonarTarget(primary, accent, 'translate(32 32) scale(0.68)', true, animated)}
      </svg>
    `
    return bannerFrameHtml(
      innerHtml,
      colors,
      sonarBadge,
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
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 42" width="100%" style="display:block;width:100%;height:auto;overflow:visible;">
        <g transform="translate(4 2) scale(0.85)">
          <circle cx="22" cy="22" r="15" fill="none" stroke="${primary}" stroke-width="0.9"/>
          <path d="M22 7V37M7 22H37M22 22L34 14" stroke="${primary}" stroke-width="0.7"/>
          <path d="M22 22A10 10 0 0 1 34 14" fill="none" stroke="${accent}" stroke-width="1.4"/>
          <circle cx="34" cy="14" r="2.2" fill="${accent}"/>
          ${pulseAnim('opacity', '1;0.48;1', '5.6s', animated)}
        </g>
        ${flowTrailSvg('M48 30C160 22 280 34 400 28C510 22 575 32 636 28', primary, 1.8, '102.4 803.84', -906.24, flowDur, animated)}
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
        <circle cx="14" cy="12" r="8" fill="none" stroke="${primary}" stroke-width="1.1"/>
        <path d="M14 12L21 7" stroke="${accent}" stroke-width="1.2"/>
        <circle cx="21" cy="7" r="2.2" fill="${accent}">${pulseAnim('opacity', '1;0.35;1', '2.4s', animated)}</circle>
      </svg>
    `
  },

  renderH3Marker(colors: PaletteColors, animated: boolean): string {
    const { primary, accent } = resolveMotionColors(colors)
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" width="14" style="display:block;height:auto;">
        <circle cx="7" cy="7" r="5" fill="none" stroke="${primary}" stroke-width="1.2"/>
        <circle cx="7" cy="7" r="2" fill="${accent}">${pulseAnim('r', '1.8;2.8;1.8', '2.2s', animated)}</circle>
      </svg>
    `
  },

  renderEndingDecor(colors: PaletteColors, animated: boolean): string {
    const { primary, accent } = resolveMotionColors(colors)
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 28" width="48" style="display:block;height:auto;">
        <circle cx="14" cy="14" r="9" fill="none" stroke="${primary}" stroke-width="1.1"/>
        <circle cx="14" cy="14" r="4" fill="none" stroke="${accent}" stroke-width="1"/>
        <path d="M28 14C34 10 38 10 43 14C38 18 34 18 28 14Z" fill="${accent}">${pulseAnim('opacity', '1;0.45;1', '2.5s', animated)}</path>
      </svg>
    `
  },

  renderCodeBadge(colors: PaletteColors, animated: boolean): string {
    const { primary, accent } = resolveMotionColors(colors)
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 14" width="28" style="display:block;height:auto;">
        <circle cx="8" cy="7" r="4" fill="none" stroke="${primary}" stroke-width="1.1"/>
        <circle cx="8" cy="7" r="1.5" fill="${accent}">${pulseAnim('opacity', '1;0.25;1', '1.6s', animated)}</circle>
        <circle cx="20" cy="7" r="2.2" fill="${primary}"/>
      </svg>
    `
  },

  renderDivider(colors: PaletteColors, animated: boolean): string {
    const { primary, accent } = resolveMotionColors(colors)
    const d = 'M20 11C120 4 220 18 320 11C420 4 520 18 620 11'
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 20" width="100%" style="display:block;width:100%;height:auto;">
        ${flowTrailSvg(d, primary, 1.8, '96 760', -856, '3.8s', animated)}
        <circle cx="320" cy="11" r="2.5" fill="${accent}"/>
      </svg>
    `
  },

  renderTail(colors: PaletteColors, animated: boolean, label = 'END · 继续阅读'): string {
    const { primary, accent, muted } = resolveMotionColors(colors)
    const tidal =
      'M16 14C77 3 134 7 191 18C250 29 300 18 361 11C421 4 472 24 531 16C591 8 648 8 734 19'
    const leftSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 110" width="100%" style="display:block;width:100%;height:auto;">
        ${sonarTarget(primary, accent, 'translate(88 46) scale(0.75)', true, animated)}
        ${coralBranch(primary, accent, 'translate(38 100) scale(0.75)', '0 0 0;5.6 0 0;0 0 0;-4.5 0 0;0 0 0', animated)}
        <circle cx="128" cy="28" r="3" fill="${accent}"/>
      </svg>
    `
    const rightSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 110" width="100%" style="display:block;width:100%;height:auto;">
        <g fill="${accent}">
          <path d="M65 36C72 31 79 32 84 36C79 40 72 41 65 36ZM60 31L65 36L60 41Z"/>
          <path d="M98 24C105 19 112 20 117 24C112 28 105 29 98 24ZM93 19L98 24L93 29Z"/>
          <path d="M132 42C139 37 146 38 151 42C146 46 139 47 132 42ZM127 37L132 42L127 47Z"/>
        </g>
        ${coralBranch(primary, accent, 'translate(200 100) scale(0.68)', '0 0 0;-4.8 0 0;0 0 0;5.2 0 0;0 0 0', animated, '0.35s', true)}
        <circle cx="42" cy="84" r="2.5" fill="${accent}"/>
      </svg>
    `
    const spineSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 28" width="100%" style="display:block;width:100%;height:auto;">
        ${flowTrailSvg(tidal, primary, 1.9, '120 942', -1062, '3.8s', animated)}
        <path d="M26 24C92 17 151 20 209 26M542 25C601 18 660 20 724 27" fill="none" stroke="${muted}" stroke-width="0.75"/>
      </svg>
    `
    return tailFrameHtml(leftSvg, rightSvg, spineSvg, label, colors)
  }
}
