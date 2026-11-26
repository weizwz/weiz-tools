import { PaletteColors } from '../types'

export function resolveMotionColors(colors: PaletteColors) {
  return {
    primary: colors.headingDecor,
    accent: colors.strong,
    muted: colors.divider,
    ink: colors.heading,
    bg: colors.bg
  }
}

export function flowTrailSvg(
  d: string,
  color: string,
  strokeWidth: number,
  dashArray: string,
  dashOffsetTo: number,
  dur: string,
  animated: boolean,
  begin = '0s'
): string {
  const base = `<path d="${d}" fill="none" stroke="${color}" stroke-width="${Math.max(0.8, strokeWidth - 1)}" stroke-linecap="round" stroke-linejoin="round" opacity="0.34"/>`
  if (!animated) return base
  return `${base}<path d="${d}" fill="none" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" opacity="0.94" stroke-dasharray="${dashArray}"><animate attributeName="stroke-dashoffset" from="0" to="${dashOffsetTo}" dur="${dur}" begin="${begin}" repeatCount="indefinite"/></path>`
}

export function rotateAnim(
  from: string,
  to: string,
  dur: string,
  animated: boolean,
  begin = '0s'
): string {
  if (!animated) return ''
  return `<animateTransform attributeName="transform" type="rotate" from="${from}" to="${to}" dur="${dur}" begin="${begin}" repeatCount="indefinite" additive="sum"/>`
}

export function swayAnim(
  values: string,
  dur: string,
  animated: boolean,
  begin = '0s'
): string {
  if (!animated) return ''
  return `<animateTransform attributeName="transform" type="rotate" values="${values}" dur="${dur}" begin="${begin}" repeatCount="indefinite" additive="sum"/>`
}

export function pulseAnim(
  attr: string,
  values: string,
  dur: string,
  animated: boolean,
  begin = '0s'
): string {
  if (!animated) return ''
  return `<animate attributeName="${attr}" values="${values}" dur="${dur}" begin="${begin}" repeatCount="indefinite"/>`
}
