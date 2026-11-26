import { LayoutTheme, ThemeId } from '../types'
import { moyuGreenTheme } from './moyu-green'
import { oliveJournalTheme } from './olive-journal'
import { redWhiteTheme } from './red-white'

export const WECHAT_THEMES: LayoutTheme[] = [
  moyuGreenTheme,
  redWhiteTheme,
  oliveJournalTheme
]

export const THEME_REGISTRY = new Map<ThemeId, LayoutTheme>(
  WECHAT_THEMES.map((theme) => [theme.id, theme])
)

export function getThemeById(id: ThemeId): LayoutTheme {
  return THEME_REGISTRY.get(id) || WECHAT_THEMES[0]
}
