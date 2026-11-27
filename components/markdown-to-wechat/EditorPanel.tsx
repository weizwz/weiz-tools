'use client'

import { Button } from '@/components/ui/button'
import { Download, FileText, Trash2 } from 'lucide-react'
import { ArticleMetaPopover } from './ArticleMetaPopover'
import { ThemeSelector } from './ThemeSelector'
import { ArticleMeta, CustomColors, FontSizeOption, MotionId, ThemeId } from './engine/types'

interface EditorPanelProps {
  markdown: string
  meta: ArticleMeta
  themeId: ThemeId
  motionId: MotionId
  animated: boolean
  paletteId: string
  customColors: CustomColors
  fontSize: FontSizeOption
  wordCount: number
  readingMinutes: number
  onMarkdownChange: (value: string) => void
  onMetaChange: (meta: ArticleMeta) => void
  onThemeChange: (id: ThemeId) => void
  onMotionChange: (id: MotionId) => void
  onAnimatedChange: (animated: boolean) => void
  onPaletteChange: (paletteId: string) => void
  onCustomColorsChange: (colors: CustomColors) => void
  onFontSizeChange: (size: FontSizeOption) => void
  onLoadSample: () => void
  onClear: () => void
  onExportHtml: () => void
}

export function EditorPanel({
  markdown,
  meta,
  themeId,
  motionId,
  animated,
  paletteId,
  customColors,
  fontSize,
  wordCount,
  readingMinutes,
  onMarkdownChange,
  onMetaChange,
  onThemeChange,
  onMotionChange,
  onAnimatedChange,
  onPaletteChange,
  onCustomColorsChange,
  onFontSizeChange,
  onLoadSample,
  onClear,
  onExportHtml
}: EditorPanelProps) {
  return (
    <section className='flex h-full min-h-0 flex-col bg-background border-r border-border min-w-0'>
      {/* 顶部控制栏 */}
      <div className='border-b border-border px-4 py-2.5 space-y-2'>
        <div className='flex flex-wrap items-center justify-between gap-2'>
          <span className='text-[11px] font-mono tracking-wider text-muted-foreground uppercase'>
            MARKDOWN
          </span>
          <ThemeSelector
            themeId={themeId}
            motionId={motionId}
            animated={animated}
            paletteId={paletteId}
            customColors={customColors}
            fontSize={fontSize}
            onThemeChange={onThemeChange}
            onMotionChange={onMotionChange}
            onAnimatedChange={onAnimatedChange}
            onPaletteChange={onPaletteChange}
            onCustomColorsChange={onCustomColorsChange}
            onFontSizeChange={onFontSizeChange}
          />
        </div>

        {/* 第二行：文章信息与快捷操作 */}
        <div className='flex flex-wrap items-center justify-between gap-2'>
          <ArticleMetaPopover meta={meta} onChange={onMetaChange} />

          <div className='flex items-center gap-1.5'>
            <Button
              type='button'
              variant='outline'
              size='xs'
              onClick={onLoadSample}
              className='rounded-md cursor-pointer'
            >
              <FileText className='h-3 w-3' />
              <span>载入示例</span>
            </Button>
            <Button
              type='button'
              variant='outline'
              size='xs'
              onClick={onClear}
              className='rounded-md cursor-pointer'
            >
              <Trash2 className='h-3 w-3' />
              <span>清空</span>
            </Button>
            <Button
              type='button'
              variant='outline'
              size='xs'
              onClick={onExportHtml}
              className='rounded-md cursor-pointer'
            >
              <Download className='h-3 w-3' />
              <span>导出 HTML</span>
            </Button>
          </div>
        </div>
      </div>

      {/* 编辑区 */}
      <div className='relative flex-1 min-h-0'>
        <textarea
          value={markdown}
          onChange={(e) => onMarkdownChange(e.target.value)}
          placeholder='在此输入或粘贴 Markdown 内容，右侧实时生成公众号排版...'
          spellCheck={false}
          className='h-full w-full resize-none overflow-y-auto bg-transparent p-5 font-mono text-sm leading-7 text-foreground placeholder:text-muted-foreground/60 focus:outline-none'
        />
      </div>

      {/* 底部统计栏 */}
      <div className='flex items-center justify-between border-t border-border px-4 py-1.5 font-mono text-[11px] tabular-nums text-muted-foreground bg-secondary/40'>
        <span>纯前端本地渲染 · 自动保存草稿</span>
        <span>
          {wordCount} 字 · 预计阅读 {readingMinutes} 分钟
        </span>
      </div>
    </section>
  )
}
