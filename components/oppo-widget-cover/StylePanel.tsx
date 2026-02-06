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
  const handleBorderChange = (key: 'top' | 'right' | 'bottom' | 'left', value: number) => {
    onStyleChange({
      ...style,
      border: { ...style.border, [key]: value }
    })
  }

  const handleBackgroundImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        onStyleChange({
          ...style,
          backgroundImage: event.target?.result as string
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const removeBackgroundImage = () => {
    onStyleChange({ ...style, backgroundImage: undefined })
  }

  return (
    <div className='w-72 bg-white border-l border-gray-200 p-4 overflow-y-auto'>
      <h3 className='text-sm font-semibold text-gray-700 mb-4'>样式调整</h3>

      {/* 边框设置 */}
      <div className='mb-6'>
        <label className='text-xs text-gray-500 block mb-2'>边框 (px)</label>
        <div className='grid grid-cols-4 gap-2'>
          {(['top', 'right', 'bottom', 'left'] as const).map((key) => (
            <div key={key} className='text-center'>
              <Input
                type='number'
                min={0}
                max={100}
                value={style.border[key]}
                onChange={(e) => handleBorderChange(key, Number(e.target.value))}
                className='w-full text-center text-sm h-8'
              />
              <span className='text-xs text-gray-400'>{key === 'top' ? '上' : key === 'right' ? '右' : key === 'bottom' ? '下' : '左'}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 间距设置 */}
      <div className='mb-6'>
        <label className='text-xs text-gray-500 block mb-2'>间距: {style.spacing}px</label>
        <input
          type='range'
          min={0}
          max={50}
          value={style.spacing}
          onChange={(e) => onStyleChange({ ...style, spacing: Number(e.target.value) })}
          className='w-full accent-[#409eff]'
        />
      </div>

      {/* 圆角设置 */}
      <div className='mb-6'>
        <label className='text-xs text-gray-500 block mb-2'>圆角: {style.cornerRadius}px</label>
        <input
          type='range'
          min={0}
          max={50}
          value={style.cornerRadius}
          onChange={(e) => onStyleChange({ ...style, cornerRadius: Number(e.target.value) })}
          className='w-full accent-[#409eff]'
        />
      </div>

      {/* 背景颜色 */}
      <div className='mb-6'>
        <label className='text-xs text-gray-500 block mb-2'>背景颜色</label>
        <div className='flex gap-2 items-center'>
          <input
            type='color'
            value={style.backgroundColor}
            onChange={(e) => onStyleChange({ ...style, backgroundColor: e.target.value })}
            className='w-10 h-10 rounded border border-gray-200 cursor-pointer'
          />
          <Input
            type='text'
            value={style.backgroundColor}
            onChange={(e) => onStyleChange({ ...style, backgroundColor: e.target.value })}
            className='flex-1 text-sm h-10'
          />
        </div>
      </div>

      {/* 背景图片 */}
      <div className='mb-6'>
        <label className='text-xs text-gray-500 block mb-2'>背景图片</label>
        {style.backgroundImage ? (
          <div className='relative'>
            <img src={style.backgroundImage} alt='背景' className='w-full h-24 object-cover rounded-lg border border-gray-200' />
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
