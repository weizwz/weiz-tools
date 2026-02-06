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
    <div className='w-72 bg-white border-l border-gray-200 p-4 overflow-y-auto'>
      <h3 className='text-sm font-semibold text-gray-700 mb-4'>全局背景</h3>

      {/* 背景颜色 */}
      <div className='mb-6'>
        <label className='text-xs text-gray-500 block mb-2'>背景颜色</label>
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
            className='w-10 h-10 rounded border border-gray-200 cursor-pointer'
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
            className='flex-1 text-sm h-10'
          />
        </div>
      </div>

      {/* 背景图片 */}
      <div className='mb-6'>
        <label className='text-xs text-gray-500 block mb-2'>背景图片</label>
        {style.base.background.image ? (
          <div className='relative'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={style.base.background.image} alt='背景' className='w-full h-24 object-cover rounded-lg border border-gray-200' />
            <Button variant='destructive' size='icon-xs' className='absolute top-1 right-1' onClick={removeBackgroundImage}>
              <Trash2 className='w-3 h-3' />
            </Button>
          </div>
        ) : (
          <label className='flex items-center justify-center gap-2 w-full h-16 border-2 border-dashed border-gray-200 rounded-lg cursor-pointer hover:border-[#409eff]/50 transition-colors'>
            <Upload className='w-4 h-4 text-gray-400' />
            <span className='text-sm text-gray-400'>上传图片</span>
            <input type='file' accept='image/*' className='hidden' onChange={handleBackgroundImageUpload} />
          </label>
        )}
      </div>

      {/* 分隔线 */}
      <div className='border-t border-gray-200 my-6' />

      {/* 卡片容器背景 */}
      <h3 className='text-sm font-semibold text-gray-700 mb-4'>卡片容器背景</h3>

      {/* 容器背景颜色 */}
      <div className='mb-4'>
        <label className='text-xs text-gray-500 block mb-2'>背景颜色</label>
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
            className='w-10 h-8 rounded border border-gray-200 cursor-pointer'
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
            className='flex-1 text-sm h-8'
          />
        </div>
      </div>

      {/* 容器透明度 */}
      <div className='mb-4'>
        <label className='text-xs text-gray-500 block mb-2'>透明度: {style.base.cardContainer.opacity}%</label>
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
          className='w-full accent-main'
        />
      </div>

      {/* 容器圆角 */}
      <div className='mb-4'>
        <label className='text-xs text-gray-500 block mb-2'>圆角: {style.base.cardContainer.cornerRadius}px</label>
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
          className='w-full accent-main'
        />
      </div>

      <h3 className='text-sm font-semibold text-gray-700 mb-4'>卡片样式</h3>

      {/* 间距设置 */}
      <div className='mb-6'>
        <label className='text-xs text-gray-500 block mb-2'>间距: {style.base.card.spacing}px</label>
        <input
          type='range'
          min={0}
          max={100}
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
          className='w-full accent-[#409eff]'
        />
      </div>

      {/* 圆角设置 */}
      <div className='mb-6'>
        <label className='text-xs text-gray-500 block mb-2'>圆角: {style.base.card.cornerRadius}px</label>
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
          className='w-full accent-[#409eff]'
        />
      </div>

      {/* 分隔线 */}
      <div className='border-t border-gray-200 my-6' />

      {/* 侧向排版专属配置（仅在 tilt 布局时显示） */}
      {style.layout.type === 'tilt' &&
        (() => {
          const tiltConfig = style.layout.config
          return (
            <>
              <h3 className='text-sm font-semibold text-gray-700 mb-4'>侧向排版设置</h3>

              {/* 倾斜角度 */}
              <div className='mb-4'>
                <label className='text-xs text-gray-500 block mb-2'>倾斜角度: {tiltConfig.angle}°</label>
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
                  className='w-full accent-[#409eff]'
                />
              </div>

              {/* X 轴偏移 */}
              <div className='mb-4'>
                <label className='text-xs text-gray-500 block mb-2'>X 轴偏移: {tiltConfig.offsetX}px</label>
                <input
                  type='range'
                  min={-200}
                  max={200}
                  value={tiltConfig.offsetX}
                  onChange={(e) =>
                    onStyleChange({
                      ...style,
                      layout: {
                        type: 'tilt',
                        config: { ...tiltConfig, offsetX: Number(e.target.value) }
                      }
                    })
                  }
                  className='w-full accent-[#409eff]'
                />
              </div>

              {/* Y 轴偏移 */}
              <div className='mb-4'>
                <label className='text-xs text-gray-500 block mb-2'>Y 轴偏移: {tiltConfig.offsetY}px</label>
                <input
                  type='range'
                  min={-200}
                  max={200}
                  value={tiltConfig.offsetY}
                  onChange={(e) =>
                    onStyleChange({
                      ...style,
                      layout: {
                        type: 'tilt',
                        config: { ...tiltConfig, offsetY: Number(e.target.value) }
                      }
                    })
                  }
                  className='w-full accent-[#409eff]'
                />
              </div>

              {/* 分隔线 */}
              <div className='border-t border-gray-200 my-6' />
            </>
          )
        })()}

      {/* 导出设置 */}
      <h3 className='text-sm font-semibold text-gray-700 mb-4'>导出设置</h3>

      <div className='mb-4'>
        <div className='text-xs text-gray-500 mb-1'>输出格式</div>
        <div className='text-sm'>PNG (1440 × 3216 px)</div>
      </div>

      <Button className='w-full' onClick={onExport} disabled={isExporting}>
        <Download className='w-4 h-4 mr-2' />
        {isExporting ? '导出中...' : '下载图片'}
      </Button>
    </div>
  )
}
