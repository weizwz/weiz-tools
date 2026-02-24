'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import zh, { type Locale } from './locales/zh'
import en from './locales/en'

export type Language = 'zh' | 'en'

const locales: Record<Language, Locale> = { zh, en }

interface I18nContextType {
  lang: Language
  t: Locale
  setLang: (lang: Language) => void
  toggleLang: () => void
}

const I18nContext = createContext<I18nContextType | null>(null)

const STORAGE_KEY = 'weiz-tools-lang'

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'zh'
    const stored = localStorage.getItem(STORAGE_KEY) as Language | null
    return stored && locales[stored] ? stored : 'zh'
  })

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang)
    localStorage.setItem(STORAGE_KEY, newLang)
    document.documentElement.lang = newLang === 'zh' ? 'zh-CN' : 'en'
  }, [])

  const toggleLang = useCallback(() => {
    setLang(lang === 'zh' ? 'en' : 'zh')
  }, [lang, setLang])

  const t = locales[lang]

  return <I18nContext.Provider value={{ lang, t, setLang, toggleLang }}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}

/**
 * 根据当前语言获取工具的本地化名称和描述
 */
export function useToolI18n(toolId: string) {
  const { t } = useI18n()
  const toolLocale = t.tools[toolId]
  return toolLocale || { name: toolId, description: '' }
}
