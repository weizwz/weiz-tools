'use client'

import { StyleConfig } from './types'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Download, Upload, Trash2 } from 'lucide-react'

interface StylePanelProps {
  style: StyleConfig
  onStyleChange: (style: StyleConfig) => void
  onExport: () => void
  isExporting: boolean
}

export function StylePanel({ style, onStyleChange, onExport, isExporting }: StylePanelProps) {
  const handleBackgroundImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        onStyleChange({
          ...style,
          base: {
            ...style.base,
            background: {
              ...style.base.background,
              image: event.target?.result as string
            }
          }
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const removeBackgroundImage = () => {
    onStyleChange({
      ...style,
      base: {
        ...style.base,
        background: {
          ...style.base.background,
          image: undefined
        }
      }
    })
  }

  return (
    <div className='w-80 bg-background border-l border-border p-4 overflow-y-auto'>
      <h3 className='text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-4'>BACKGROUND · 全局背景</h3>

      {/* 背景颜色 */}
      <div className='mb-4'>
        <label className='text-xs text-muted-foreground block mb-2'>背景颜色</label>
        <div className='flex gap-2 items-center'>
          <input
            type='color'
            value={style.base.background.color}
            onChange={(e) =>
              onStyleChange({
                ...style,
                base: {
                  ...style.base,
                  background: { ...style.base.background, color: e.target.value }
                }
              })
            }
            className='w-9 h-9 rounded-md border border-border bg-transparent cursor-pointer'
          />
          <Input
            type='text'
            value={style.base.background.color}
            onChange={(e) =>
              onStyleChange({
                ...style,
                base: {
                  ...style.base,
                  background: { ...style.base.background, color: e.target.value }
                }
              })
            }
            className='flex-1 font-mono text-xs h-9'
          />
        </div>
      </div>

      {/* 背景图片 */}
      <div className='mb-6'>
        <label className='text-xs text-muted-foreground block mb-2'>背景图片</label>
        {style.base.background.image ? (
          <div className='relative'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={style.base.background.image} alt='背景' className='w-full h-24 object-cover rounded-md border border-border' />
            <Button variant='destructive' size='icon-xs' className='absolute top-1.5 right-1.5 rounded-sm' onClick={removeBackgroundImage}>
              <Trash2 className='w-3 h-3' />
            </Button>
          </div>
        ) : (
          <label className='flex items-center justify-center gap-2 w-full h-16 border border-dashed border-border rounded-md cursor-pointer hover:border-foreground/40 hover:bg-secondary/50 transition-colors'>
            <Upload className='w-3.5 h-3.5 text-muted-foreground' />
            <span className='text-xs text-muted-foreground'>上传图片</span>
            <input type='file' accept='image/*' className='hidden' onChange={handleBackgroundImageUpload} />
          </label>
        )}
      </div>

      {/* 分隔线 */}
      <div className='border-t border-border my-5' />

      {/* 布局拼图专属配置（仅在 regular 布局时显示） */}
      {style.layout.type === 'regular' && (
        <>
          {/* 卡片容器 */}
          <h3 className='text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-4'>CONTAINER · 卡片容器</h3>

          {/* 容器背景颜色 */}
          <div className='mb-4'>
            <label className='text-xs text-muted-foreground block mb-2'>背景颜色</label>
            <div className='flex gap-2 items-center'>
              <input
                type='color'
                value={style.base.cardContainer.color}
                onChange={(e) =>
                  onStyleChange({
                    ...style,
                    base: {
                      ...style.base,
                      cardContainer: { ...style.base.cardContainer, color: e.target.value }
                    }
                  })
                }
                className='w-8 h-8 rounded-md border border-border bg-transparent cursor-pointer'
              />
              <Input
                type='text'
                value={style.base.cardContainer.color}
                onChange={(e) =>
                  onStyleChange({
                    ...style,
                    base: {
                      ...style.base,
                      cardContainer: { ...style.base.cardContainer, color: e.target.value }
                    }
                  })
                }
                className='flex-1 font-mono text-xs h-8'
              />
            </div>
          </div>

          {/* 容器透明度 */}
          <div className='mb-3'>
            <label className='text-xs text-muted-foreground flex justify-between mb-1.5'>
              <span>透明度</span>
              <span className='font-mono tabular-nums'>{style.base.cardContainer.opacity}%</span>
            </label>
            <input
              type='range'
              min={0}
              max={100}
              value={style.base.cardContainer.opacity}
              onChange={(e) =>
                onStyleChange({
                  ...style,
                  base: {
                    ...style.base,
                    cardContainer: { ...style.base.cardContainer, opacity: Number(e.target.value) }
                  }
                })
              }
              className='w-full accent-foreground'
            />
          </div>

          {/* 容器圆角 */}
          <div className='mb-5'>
            <label className='text-xs text-muted-foreground flex justify-between mb-1.5'>
              <span>圆角</span>
              <span className='font-mono tabular-nums'>{style.base.cardContainer.cornerRadius}px</span>
            </label>
            <input
              type='range'
              min={0}
              max={100}
              value={style.base.cardContainer.cornerRadius}
              onChange={(e) =>
                onStyleChange({
                  ...style,
                  base: {
                    ...style.base,
                    cardContainer: { ...style.base.cardContainer, cornerRadius: Number(e.target.value) }
                  }
                })
              }
              className='w-full accent-foreground'
            />
          </div>

          {/* 分隔线 */}
          <div className='border-t border-border my-5' />
        </>
      )}

      <h3 className='text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-4'>CARD · 卡片样式</h3>

      {/* 间距设置 */}
      <div className='mb-3'>
        <label className='text-xs text-muted-foreground flex justify-between mb-1.5'>
          <span>间距</span>
          <span className='font-mono tabular-nums'>{style.base.card.spacing}px</span>
        </label>
        <input
          type='range'
          min={0}
          max={120}
          value={style.base.card.spacing}
          onChange={(e) =>
            onStyleChange({
              ...style,
              base: {
                ...style.base,
                card: { ...style.base.card, spacing: Number(e.target.value) }
              }
            })
          }
          className='w-full accent-foreground'
        />
      </div>

      {/* 圆角设置 */}
      <div className='mb-5'>
        <label className='text-xs text-muted-foreground flex justify-between mb-1.5'>
          <span>圆角</span>
          <span className='font-mono tabular-nums'>{style.base.card.cornerRadius}px</span>
        </label>
        <input
          type='range'
          min={0}
          max={100}
          value={style.base.card.cornerRadius}
          onChange={(e) =>
            onStyleChange({
              ...style,
              base: {
                ...style.base,
                card: { ...style.base.card, cornerRadius: Number(e.target.value) }
              }
            })
          }
          className='w-full accent-foreground'
        />
      </div>

      {/* 分隔线 */}
      <div className='border-t border-border my-5' />

      {/* 侧向排版专属配置（仅在 tilt 布局时显示） */}
      {style.layout.type === 'tilt' &&
        (() => {
          const tiltConfig = style.layout.config
          return (
            <>
              <h3 className='text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-4'>TILT · 侧向排版设置</h3>

              {/* 倾斜角度 */}
              <div className='mb-4'>
                <label className='text-xs text-muted-foreground flex justify-between mb-1.5'>
                  <span>倾斜角度</span>
                  <span className='font-mono tabular-nums'>{tiltConfig.angle}°</span>
                </label>
                <input
                  type='range'
                  min={0}
                  max={45}
                  value={tiltConfig.angle}
                  onChange={(e) =>
                    onStyleChange({
                      ...style,
                      layout: {
                        type: 'tilt',
                        config: { ...tiltConfig, angle: Number(e.target.value) }
                      }
                    })
                  }
                  className='w-full accent-foreground'
                />
              </div>

              {/* 分隔线 */}
              <div className='border-t border-border my-5' />
            </>
          )
        })()}

      {/* 导出设置 */}
      {style.layout.type === 'tilt' && (
        <>
          <h3 className='text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-4'>EXPORT · 导出设置</h3>

          <div className='flex items-center justify-between mb-4'>
            <span className='text-xs text-muted-foreground'>开启叠图</span>
            <label className='relative inline-flex items-center cursor-pointer'>
              <input
                type='checkbox'
                className='sr-only peer'
                checked={style.base.card.overlay}
                onChange={(e) =>
                  onStyleChange({
                    ...style,
                    base: {
                      ...style.base,
                      card: { ...style.base.card, overlay: e.target.checked }
                    }
                  })
                }
              />
              <div className="w-9 h-5 bg-muted border border-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-background after:content-[''] after:absolute after:top-0.5 after:start-0.5 after:bg-background after:border-border after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-foreground"></div>
            </label>
          </div>
        </>
      )}

      <Button className='w-full rounded-md font-medium cursor-pointer' onClick={onExport} disabled={isExporting}>
        <Download className='w-4 h-4 mr-2' />
        {isExporting ? (
          '导出中...'
        ) : (
          <>
            下载图片 <span className='font-mono text-[11px] opacity-75 ml-1 tabular-nums'>1440×3216</span>
          </>
        )}
      </Button>
    </div>
  )
}
