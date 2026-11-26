import { MotionId, MotionPreset } from '../types'
import { blueprintGridMotion } from './blueprint-grid'
import { botanicalNotesMotion } from './botanical-notes'
import { deepSeaTerminalMotion } from './deep-sea-terminal'
import { editorialVermilionMotion } from './editorial-vermilion'
import { swissSignalMotion } from './swiss-signal'

export const MOTION_PRESETS: MotionPreset[] = [
  swissSignalMotion,
  botanicalNotesMotion,
  editorialVermilionMotion,
  blueprintGridMotion,
  deepSeaTerminalMotion
]

export const MOTION_REGISTRY = new Map<MotionId, MotionPreset>(
  MOTION_PRESETS.map((preset) => [preset.id, preset])
)

export function getMotionById(id: MotionId): MotionPreset {
  return MOTION_REGISTRY.get(id) || swissSignalMotion
}

export {
  blueprintGridMotion,
  botanicalNotesMotion,
  deepSeaTerminalMotion,
  editorialVermilionMotion,
  swissSignalMotion
}
