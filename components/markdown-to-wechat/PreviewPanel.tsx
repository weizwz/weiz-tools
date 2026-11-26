'use client'

import { useState } from 'react'
import { AlertTriangle, Check, CheckCircle2, Copy, Info } from 'lucide-react'
import { ComplianceIssue, PreviewWidth } from './engine/types'
import { copyWechatHtml } from './engine/wechat-inline'

interface PreviewPanelProps {
  html: string
  issues: ComplianceIssue[]
  previewWidth: PreviewWidth
  onPreviewWidthChange: (width: PreviewWidth) => void
}

const WIDTH_OPTIONS: { label: string; value: PreviewWidth }[] = [
  { label: '适应', value: 'auto' },
  { label: '小屏 375', value: 375 },
  { label: '标准 402', value: 402 },
  { label: '大屏 440', value: 440 }
]

export function PreviewPanel({ html, issues, previewWidth, onPreviewWidthChange }: PreviewPanelProps) {
  const [copied, setCopied] = useState(false)

  const hasWarning = issues.some((i) => i.level === 'warning')

  const handleCopy = async () => {
    const ok = await copyWechatHtml(html)
    if (ok) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <section className='flex h-full min-h-0 flex-col bg-secondary/40 min-w-0'>
      {/* 顶部工具栏 */}
      <div className='flex flex-wrap items-center justify-between gap-2 border-b border-border bg-background px-4 py-2.5'>
        <div className='flex items-center gap-2.5'>
          <span className='text-[11px] font-mono uppercase tracking-wider text-muted-foreground'>PREVIEW</span>
          {hasWarning ? (
            <span className='inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700 border border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800'>
              <AlertTriangle className='h-3 w-3' />
              <span>存在兼容提示</span>
            </span>
          ) : (
            <span className='inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 border border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800'>
              <CheckCircle2 className='h-3 w-3' />
              <span>平台合规</span>
            </span>
          )}
        </div>

        <div className='flex flex-wrap items-center gap-2'>
          {/* 一键复制 */}
          <button
            type='button'
            onClick={handleCopy}
            className='inline-flex items-center gap-1.5 rounded-md bg-foreground px-3 py-1 text-xs font-medium text-background hover:opacity-90 transition-opacity cursor-pointer'>
            {copied ? <Check className='h-3.5 w-3.5' /> : <Copy className='h-3.5 w-3.5' />}
            <span>{copied ? '已复制' : '复制到公众号'}</span>
          </button>

          {/* 屏宽切换 */}
          <div className='flex items-center rounded-md border border-border bg-secondary/60 p-0.5'>
            {WIDTH_OPTIONS.map((opt) => (
              <button
                key={String(opt.value)}
                type='button'
                onClick={() => onPreviewWidthChange(opt.value)}
                className={`rounded-sm px-2 py-0.5 text-xs transition-colors cursor-pointer ${
                  previewWidth === opt.value
                    ? 'bg-foreground text-background font-medium'
                    : 'text-muted-foreground hover:text-foreground'
                }`}>
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 合规提示条 */}
      {issues.length > 0 && (
        <div className='border-b border-border bg-amber-50/70 dark:bg-amber-950/20 px-4 py-1.5 flex flex-wrap gap-3 text-xs text-amber-700 dark:text-amber-300'>
          {issues.map((issue, idx) => (
            <span key={idx} className='inline-flex items-center gap-1'>
              <Info className='h-3.5 w-3.5 shrink-0' />
              <span>{issue.message}</span>
            </span>
          ))}
        </div>
      )}

      {/* 居中手机预览画布 */}
      <div className='flex-1 min-h-0 overflow-y-auto px-4 py-6 sm:px-8'>
        <div
          className='mx-auto bg-white border border-border shadow-sm overflow-hidden transition-[width,padding] duration-200'
          style={
            previewWidth === 'auto'
              ? { width: '520px', maxWidth: '100%', paddingLeft: '52px', paddingRight: '52px' }
              : { width: `${previewWidth}px`, maxWidth: '100%', paddingLeft: '0px', paddingRight: '0px' }
          }
        >
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    </section>
  )
}
