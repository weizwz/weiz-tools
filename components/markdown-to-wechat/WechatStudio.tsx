'use client'

import { useEffect, useMemo, useState } from 'react'
import { EditorPanel } from './EditorPanel'
import { PreviewPanel } from './PreviewPanel'
import { renderWechatArticle } from './engine/renderer'
import { DEFAULT_ARTICLE_META, SAMPLE_MARKDOWN } from './engine/tokens'
import { ArticleMeta, CustomColors, FontSizeOption, MotionId, PreviewWidth, ThemeId } from './engine/types'
import { exportHtmlFile } from './engine/wechat-inline'

const STORAGE_KEY = 'weiz-tools:wechat-layout-draft-v5'

interface DraftState {
  markdown: string
  meta: ArticleMeta
  themeId: ThemeId
  motionId: MotionId
  animated: boolean
  paletteId: string
  customColors: CustomColors
  fontSize: FontSizeOption
  previewWidth: PreviewWidth
}

const DEFAULT_DRAFT: DraftState = {
  markdown: SAMPLE_MARKDOWN,
  meta: DEFAULT_ARTICLE_META,
  themeId: 'magazine-news',
  motionId: 'swiss-signal',
  animated: true,
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
        const parsed = JSON.parse(saved) as Partial<DraftState> & { author?: string }
        const mergedMeta: ArticleMeta = {
          ...DEFAULT_ARTICLE_META,
          ...(parsed.meta || {}),
          ...(parsed.author && !parsed.meta?.author ? { author: parsed.author } : {})
        }
        setDraft((prev) => ({ ...prev, ...parsed, meta: mergedMeta }))
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
        motionId: draft.motionId,
        animated: draft.animated,
        paletteId: draft.paletteId,
        customColors: draft.customColors,
        fontSize: draft.fontSize,
        meta: draft.meta
      }),
    [
      draft.markdown,
      draft.themeId,
      draft.motionId,
      draft.animated,
      draft.paletteId,
      draft.customColors,
      draft.fontSize,
      draft.meta
    ]
  )

  return (
    <div className='grid h-full min-h-0 grid-cols-1 grid-rows-[minmax(0,1fr)_minmax(0,1fr)] lg:grid-cols-2 lg:grid-rows-[minmax(0,1fr)] overflow-hidden bg-background'>
      <EditorPanel
        markdown={draft.markdown}
        meta={draft.meta}
        themeId={draft.themeId}
        motionId={draft.motionId}
        animated={draft.animated}
        paletteId={draft.paletteId}
        customColors={draft.customColors}
        fontSize={draft.fontSize}
        wordCount={rendered.wordCount}
        readingMinutes={rendered.readingMinutes}
        onMarkdownChange={(markdown) => setDraft((prev) => ({ ...prev, markdown }))}
        onMetaChange={(meta) => setDraft((prev) => ({ ...prev, meta }))}
        onThemeChange={(themeId) => setDraft((prev) => ({ ...prev, themeId }))}
        onMotionChange={(motionId) => setDraft((prev) => ({ ...prev, motionId }))}
        onAnimatedChange={(animated) => setDraft((prev) => ({ ...prev, animated }))}
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
