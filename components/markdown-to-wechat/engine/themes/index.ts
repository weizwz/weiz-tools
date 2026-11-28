import { LayoutTheme, ThemeId } from '../types'
import { bookNotesTheme } from './book-notes'
import { editorialJournalTheme } from './editorial-journal'
import { filmStripTheme } from './film-strip'
import { gameClearTheme } from './game-clear'
import { hackerTerminalTheme } from './hacker-terminal'
import { inkScrollTheme } from './ink-scroll'
import { knowledgeCardTheme } from './knowledge-card'
import { socialFeedTheme } from './social-feed'
import { techBriefTheme } from './tech-brief'
import { travelPostcardTheme } from './travel-postcard'

export const WECHAT_THEMES: LayoutTheme[] = [
  knowledgeCardTheme,
  bookNotesTheme,
  techBriefTheme,
  socialFeedTheme,
  editorialJournalTheme,
  travelPostcardTheme,
  hackerTerminalTheme,
  inkScrollTheme,
  filmStripTheme,
  gameClearTheme
]

const THEME_REGISTRY = new Map<ThemeId, LayoutTheme>(
  WECHAT_THEMES.map((theme) => [theme.id, theme])
)

export function getThemeById(id: ThemeId): LayoutTheme {
  return THEME_REGISTRY.get(id) || WECHAT_THEMES[0]
}
