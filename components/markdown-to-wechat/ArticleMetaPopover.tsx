'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronDown, ImagePlus, RotateCcw, User, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { DEFAULT_ARTICLE_META } from './engine/tokens'
import { ArticleMeta } from './engine/types'

interface ArticleMetaPopoverProps {
  meta: ArticleMeta
  onChange: (meta: ArticleMeta) => void
}

export function ArticleMetaPopover({ meta, onChange }: ArticleMetaPopoverProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const updateField = <K extends keyof ArticleMeta>(key: K, value: ArticleMeta[K]) => {
    onChange({ ...meta, [key]: value })
  }

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        updateField('avatar', reader.result)
      }
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const displayAuthor = meta.author.trim() || DEFAULT_ARTICLE_META.author
  const displayAvatar = meta.avatar.trim() || DEFAULT_ARTICLE_META.avatar

  return (
    <div ref={containerRef} className='relative'>
      <button
        type='button'
        onClick={() => setOpen((prev) => !prev)}
        className='inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1 text-xs hover:border-foreground/40 transition-colors cursor-pointer'>
        <span className='text-muted-foreground'>信息</span>
        {displayAvatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={displayAvatar} alt={displayAuthor} className='h-4 w-4 rounded-full object-cover border border-border' />
        ) : (
          <User className='h-3.5 w-3.5 text-muted-foreground' />
        )}
        <span className='font-medium text-foreground max-w-24 truncate'>{displayAuthor}</span>
        <ChevronDown className='h-3 w-3 text-muted-foreground' />
      </button>

      {open && (
        <div className='absolute left-0 top-full z-50 mt-2 w-80 max-w-[92vw] rounded-lg border border-border bg-popover p-3.5 shadow-xl space-y-3'>
          <div className='flex items-center justify-between'>
            <span className='font-mono text-[11px] font-medium tracking-wider text-muted-foreground uppercase'>ARTICLE META · 文章附加信息</span>
            <button
              type='button'
              onClick={() => onChange({ ...DEFAULT_ARTICLE_META })}
              className='inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer'
              title='恢复默认信息'>
              <RotateCcw className='h-3 w-3' />
              <span>重置</span>
            </button>
          </div>

          <div className='space-y-2.5 text-xs'>
            <div className='space-y-1'>
              <label className='text-[11px] font-medium text-muted-foreground block'>头像（本地上传或 URL）</label>
              <div className='flex items-center gap-1'>
                <div className='relative h-8 w-8 shrink-0 rounded-full border border-border bg-muted/40 flex items-center justify-center overflow-hidden'>
                  {meta.avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={meta.avatar} alt='avatar' className='h-full w-full object-cover' />
                  ) : (
                    <User className='h-4 w-4 text-muted-foreground' />
                  )}
                </div>
                <Input
                  value={meta.avatar.startsWith('data:') ? '' : meta.avatar}
                  onChange={(e) => updateField('avatar', e.target.value)}
                  placeholder={meta.avatar.startsWith('data:') ? '已上传本地图片' : DEFAULT_ARTICLE_META.avatar || 'https://...'}
                  className='h-7 flex-1 text-xs!'
                />
                <input ref={fileInputRef} type='file' accept='image/*' onChange={handleAvatarUpload} className='hidden' />
                <button
                  type='button'
                  onClick={() => fileInputRef.current?.click()}
                  className='inline-flex h-7 items-center gap-1 rounded-md border border-border bg-background px-2 text-xs! hover:bg-muted cursor-pointer shrink-0'
                  title='本地上传头像'>
                  <ImagePlus className='h-3.5 w-3.5' />
                  <span>上传</span>
                </button>
                {meta.avatar && (
                  <button
                    type='button'
                    onClick={() => updateField('avatar', '')}
                    className='inline-flex h-7 w-7 items-center justify-center rounded-md border border-border bg-background text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer shrink-0'
                    title='清除头像'>
                    <X className='h-3.5 w-3.5' />
                  </button>
                )}
              </div>
            </div>

            <div className='grid grid-cols-2 gap-2'>
              <div className='space-y-1'>
                <label className='text-[11px] font-medium text-muted-foreground block'>作者</label>
                <Input value={meta.author} onChange={(e) => updateField('author', e.target.value)} placeholder={DEFAULT_ARTICLE_META.author} className='h-7 text-xs!' />
              </div>
              <div className='space-y-1'>
                <label className='text-[11px] font-medium text-muted-foreground block'>日期</label>
                <Input value={meta.date} onChange={(e) => updateField('date', e.target.value)} placeholder={DEFAULT_ARTICLE_META.date} className='h-7 text-xs!' />
              </div>
            </div>

            <div className='grid grid-cols-2 gap-2'>
              <div className='space-y-1'>
                <label className='text-[11px] font-medium text-muted-foreground block'>分类</label>
                <Input value={meta.category} onChange={(e) => updateField('category', e.target.value)} placeholder={DEFAULT_ARTICLE_META.category} className='h-7 text-xs!' />
              </div>
              <div className='space-y-1'>
                <label className='text-[11px] font-medium text-muted-foreground block'>标签（逗号分隔）</label>
                <Input value={meta.tags} onChange={(e) => updateField('tags', e.target.value)} placeholder={DEFAULT_ARTICLE_META.tags} className='h-7 text-xs!' />
              </div>
            </div>

            <div className='space-y-1'>
              <label className='text-[11px] font-medium text-muted-foreground block'>结束语（留空则不显示）</label>
              <textarea
                value={meta.ending}
                onChange={(e) => updateField('ending', e.target.value)}
                rows={4}
                placeholder={DEFAULT_ARTICLE_META.ending}
                className='w-full resize-none rounded-md border border-input bg-transparent px-2.5 py-1.5 text-xs leading-relaxed outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-1'
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
