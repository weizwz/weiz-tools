'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Download, FileText, Trash2 } from 'lucide-react'
import { ThemeSelector } from './ThemeSelector'
import { FontSizeOption, ThemeId } from './themes/types'

interface EditorPanelProps {
  markdown: string
  author: string
  themeId: ThemeId
  customColor: string
  fontSize: FontSizeOption
  enableMotion: boolean
  wordCount: number
  readingMinutes: number
  onMarkdownChange: (value: string) => void
  onAuthorChange: (value: string) => void
  onThemeChange: (id: ThemeId) => void
  onCustomColorChange: (color: string) => void
  onFontSizeChange: (size: FontSizeOption) => void
  onMotionChange: (enabled: boolean) => void
  onLoadSample: () => void
  onClear: () => void
  onExportHtml: () => void
}

export function EditorPanel({
  markdown,
  author,
  themeId,
  customColor,
  fontSize,
  enableMotion,
  wordCount,
  readingMinutes,
  onMarkdownChange,
  onAuthorChange,
  onThemeChange,
  onCustomColorChange,
  onFontSizeChange,
  onMotionChange,
  onLoadSample,
  onClear,
  onExportHtml
}: EditorPanelProps) {
  return (
    <section className='flex h-full flex-col bg-card border-r border-border min-w-0'>
      {/* 顶部控制栏 */}
      <div className='border-b border-border px-4 py-2.5 space-y-2'>
        <div className='flex flex-wrap items-center justify-between gap-2'>
          <span className='text-xs font-semibold tracking-wider text-muted-foreground uppercase'>
            MARKDOWN
          </span>
          <ThemeSelector
            themeId={themeId}
            customColor={customColor}
            fontSize={fontSize}
            enableMotion={enableMotion}
            onThemeChange={onThemeChange}
            onCustomColorChange={onCustomColorChange}
            onFontSizeChange={onFontSizeChange}
            onMotionChange={onMotionChange}
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
          className='h-full w-full resize-none bg-transparent p-5 font-mono text-sm leading-7 text-foreground placeholder:text-muted-foreground/60 focus:outline-none'
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
