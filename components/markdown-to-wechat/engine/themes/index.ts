import { LayoutTheme, ThemeId } from '../types'
import { editorialCardTheme } from './editorial-card'
import { internalJournalTheme } from './internal-journal'
import { magazineNewsTheme } from './magazine-news'

export const WECHAT_THEMES: LayoutTheme[] = [
  magazineNewsTheme,
  editorialCardTheme,
  internalJournalTheme
]

const THEME_REGISTRY = new Map<ThemeId, LayoutTheme>(
  WECHAT_THEMES.map((theme) => [theme.id, theme])
)

export function getThemeById(id: ThemeId): LayoutTheme {
  return THEME_REGISTRY.get(id) || WECHAT_THEMES[0]
}
