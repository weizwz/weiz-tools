'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Download, FileText, Trash2 } from 'lucide-react'
import { ThemeSelector } from './ThemeSelector'
import { CustomColors, FontSizeOption, ThemeId, VisualLevel } from './themes/types'

interface EditorPanelProps {
  markdown: string
  author: string
  themeId: ThemeId
  visualLevel: VisualLevel
  paletteId: string
  customColors: CustomColors
  fontSize: FontSizeOption
  wordCount: number
  readingMinutes: number
  onMarkdownChange: (value: string) => void
  onAuthorChange: (value: string) => void
  onThemeChange: (id: ThemeId) => void
  onVisualLevelChange: (level: VisualLevel) => void
  onPaletteChange: (paletteId: string) => void
  onCustomColorsChange: (colors: CustomColors) => void
  onFontSizeChange: (size: FontSizeOption) => void
  onLoadSample: () => void
  onClear: () => void
  onExportHtml: () => void
}

export function EditorPanel({
  markdown,
  author,
  themeId,
  visualLevel,
  paletteId,
  customColors,
  fontSize,
  wordCount,
  readingMinutes,
  onMarkdownChange,
  onAuthorChange,
  onThemeChange,
  onVisualLevelChange,
  onPaletteChange,
  onCustomColorsChange,
  onFontSizeChange,
  onLoadSample,
  onClear,
  onExportHtml
}: EditorPanelProps) {
  return (
    <section className='flex h-full min-h-0 flex-col bg-card border-r border-border min-w-0'>
      {/* 顶部控制栏 */}
      <div className='border-b border-border px-4 py-2.5 space-y-2'>
        <div className='flex flex-wrap items-center justify-between gap-2'>
          <span className='text-xs font-semibold tracking-wider text-muted-foreground uppercase'>
            MARKDOWN
          </span>
          <ThemeSelector
            themeId={themeId}
            visualLevel={visualLevel}
            paletteId={paletteId}
            customColors={customColors}
            fontSize={fontSize}
            onThemeChange={onThemeChange}
            onVisualLevelChange={onVisualLevelChange}
            onPaletteChange={onPaletteChange}
            onCustomColorsChange={onCustomColorsChange}
            onFontSizeChange={onFontSizeChange}
          />
        </div>

        {/* 第二行：署名与快捷操作 */}
        <div className='flex flex-wrap items-center justify-between gap-2'>
          <div className='flex items-center gap-2'>
            <span className='text-xs text-muted-foreground shrink-0'>署名</span>
            <Input
              value={author}
              onChange={(e) => onAuthorChange(e.target.value)}
              placeholder='公众号名称 / 作者'
              className='h-7 w-36 rounded-full px-3 text-xs'
            />
          </div>

          <div className='flex items-center gap-1.5'>
            <Button
              type='button'
              variant='outline'
              size='xs'
              onClick={onLoadSample}
              className='rounded-full cursor-pointer'
            >
              <FileText className='h-3 w-3' />
              <span>载入示例</span>
            </Button>
            <Button
              type='button'
              variant='outline'
              size='xs'
              onClick={onClear}
              className='rounded-full cursor-pointer'
            >
              <Trash2 className='h-3 w-3' />
              <span>清空</span>
            </Button>
            <Button
              type='button'
              variant='outline'
              size='xs'
              onClick={onExportHtml}
              className='rounded-full cursor-pointer'
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
      <div className='flex items-center justify-between border-t border-border px-4 py-1.5 text-xs text-muted-foreground bg-muted/30'>
        <span>纯前端本地渲染 · 自动保存草稿</span>
        <span>
          {wordCount} 字 · 预计阅读 {readingMinutes} 分钟
        </span>
      </div>
    </section>
  )
}
