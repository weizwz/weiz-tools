'use client'

import { useEffect, useMemo, useState } from 'react'
import { EditorPanel } from './EditorPanel'
import { PreviewPanel } from './PreviewPanel'
import { SAMPLE_MARKDOWN } from './themes/presets'
import { renderWechatArticle } from './themes/renderer'
import { CustomColors, FontSizeOption, PreviewWidth, ThemeId, VisualLevel } from './themes/types'
import { exportHtmlFile } from './themes/wechat-inline'

const STORAGE_KEY = 'weiz-tools:wechat-layout-draft-v4'

interface DraftState {
  markdown: string
  author: string
  themeId: ThemeId
  visualLevel: VisualLevel
  paletteId: string
  customColors: CustomColors
  fontSize: FontSizeOption
  previewWidth: PreviewWidth
}

const DEFAULT_DRAFT: DraftState = {
  markdown: SAMPLE_MARKDOWN,
  author: '唯知AI',
  themeId: 'moyu-green',
  visualLevel: 'motion',
  paletteId: 'default',
  customColors: {},
  fontSize: 15,
  previewWidth: 'auto'
}

export function WechatStudio() {
  const [draft, setDraft] = useState<DraftState>(DEFAULT_DRAFT)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<DraftState>
        setDraft((prev) => ({ ...prev, ...parsed }))
      }
    } catch {
      // ignore storage errors
    } finally {
      setHydrated(true)
    }
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draft))
    } catch {
      // ignore storage errors
    }
  }, [draft, hydrated])

  const rendered = useMemo(
    () =>
      renderWechatArticle(draft.markdown, {
        themeId: draft.themeId,
        visualLevel: draft.visualLevel,
        paletteId: draft.paletteId,
        customColors: draft.customColors,
        fontSize: draft.fontSize,
        author: draft.author
      }),
    [
      draft.markdown,
      draft.themeId,
      draft.visualLevel,
      draft.paletteId,
      draft.customColors,
      draft.fontSize,
      draft.author
    ]
  )

  return (
    <div className='grid h-full min-h-0 grid-cols-1 grid-rows-[minmax(0,1fr)_minmax(0,1fr)] lg:grid-cols-2 lg:grid-rows-[minmax(0,1fr)] overflow-hidden bg-card'>
      <EditorPanel
        markdown={draft.markdown}
        author={draft.author}
        themeId={draft.themeId}
        visualLevel={draft.visualLevel}
        paletteId={draft.paletteId}
        customColors={draft.customColors}
        fontSize={draft.fontSize}
        wordCount={rendered.wordCount}
        readingMinutes={rendered.readingMinutes}
        onMarkdownChange={(markdown) => setDraft((prev) => ({ ...prev, markdown }))}
        onAuthorChange={(author) => setDraft((prev) => ({ ...prev, author }))}
        onThemeChange={(themeId) => setDraft((prev) => ({ ...prev, themeId }))}
        onVisualLevelChange={(visualLevel) => setDraft((prev) => ({ ...prev, visualLevel }))}
        onPaletteChange={(paletteId) => setDraft((prev) => ({ ...prev, paletteId }))}
        onCustomColorsChange={(customColors) => setDraft((prev) => ({ ...prev, customColors }))}
        onFontSizeChange={(fontSize) => setDraft((prev) => ({ ...prev, fontSize }))}
        onLoadSample={() => setDraft((prev) => ({ ...prev, markdown: SAMPLE_MARKDOWN }))}
        onClear={() => setDraft((prev) => ({ ...prev, markdown: '' }))}
        onExportHtml={() => exportHtmlFile(rendered.html)}
      />

      <PreviewPanel
        html={rendered.html}
        issues={rendered.issues}
        previewWidth={draft.previewWidth}
        onPreviewWidthChange={(previewWidth) => setDraft((prev) => ({ ...prev, previewWidth }))}
      />
    </div>
  )
}
