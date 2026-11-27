import { MotionId, MotionPreset } from '../types'
import { abyssalLeapMotion } from './abyssal-leap'
import { acousticWaveMotion } from './acoustic-wave'
import { celestialOrbitMotion } from './celestial-orbit'
import { glowTerminalMotion } from './glow-terminal'
import { meridianGridMotion } from './meridian-grid'
import { origamiPrismMotion } from './origami-prism'
import { precisionGearMotion } from './precision-gear'
import { zenRippleMotion } from './zen-ripple'

export const MOTION_PRESETS: MotionPreset[] = [
  meridianGridMotion,
  abyssalLeapMotion,
  precisionGearMotion,
  glowTerminalMotion,
  acousticWaveMotion,
  celestialOrbitMotion,
  origamiPrismMotion,
  zenRippleMotion
]

const MOTION_REGISTRY = new Map<MotionId, MotionPreset>(
  MOTION_PRESETS.map((preset) => [preset.id, preset])
)

export function getMotionById(id: MotionId): MotionPreset {
  return MOTION_REGISTRY.get(id) || meridianGridMotion
}
