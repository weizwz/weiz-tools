'use client'

import { useEffect, useMemo, useState } from 'react'
import { EditorPanel } from './EditorPanel'
import { PreviewPanel } from './PreviewPanel'
import { SAMPLE_MARKDOWN } from './themes/presets'
import { renderWechatArticle } from './themes/renderer'
import { FontSizeOption, PreviewWidth, ThemeId } from './themes/types'
import { exportHtmlFile } from './themes/wechat-inline'

const STORAGE_KEY = 'weiz-tools:wechat-layout-draft'

interface DraftState {
  markdown: string
  author: string
  themeId: ThemeId
  customColor: string
  fontSize: FontSizeOption
  enableMotion: boolean
  previewWidth: PreviewWidth
}

const DEFAULT_DRAFT: DraftState = {
  markdown: SAMPLE_MARKDOWN,
  author: '极简工坊',
  themeId: 'blueprint',
  customColor: '',
  fontSize: 15,
  enableMotion: true,
  previewWidth: 402
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
        customColor: draft.customColor,
        fontSize: draft.fontSize,
        enableMotion: draft.enableMotion,
        author: draft.author
      }),
    [draft.markdown, draft.themeId, draft.customColor, draft.fontSize, draft.enableMotion, draft.author]
  )

  return (
    <div className='grid h-full grid-cols-1 lg:grid-cols-2 bg-card'>
      <EditorPanel
        markdown={draft.markdown}
        author={draft.author}
        themeId={draft.themeId}
        customColor={draft.customColor}
        fontSize={draft.fontSize}
        enableMotion={draft.enableMotion}
        wordCount={rendered.wordCount}
        readingMinutes={rendered.readingMinutes}
        onMarkdownChange={(markdown) => setDraft((prev) => ({ ...prev, markdown }))}
        onAuthorChange={(author) => setDraft((prev) => ({ ...prev, author }))}
        onThemeChange={(themeId) => setDraft((prev) => ({ ...prev, themeId }))}
        onCustomColorChange={(customColor) => setDraft((prev) => ({ ...prev, customColor }))}
        onFontSizeChange={(fontSize) => setDraft((prev) => ({ ...prev, fontSize }))}
        onMotionChange={(enableMotion) => setDraft((prev) => ({ ...prev, enableMotion }))}
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
