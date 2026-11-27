'use client'

import { useState } from 'react'
import { ChevronDown, Pipette, RotateCcw } from 'lucide-react'
import { getThemePalettes, PALETTE_COLOR_FIELDS, resolvePaletteColors } from './engine/tokens'
import { CustomColors, LayoutTheme, PaletteColorKey, PaletteColors } from './engine/types'

interface PaletteMenuProps {
  activeTheme: LayoutTheme
  paletteId: string
  customColors: CustomColors
  isOpen: boolean
  onToggle: () => void
  onClose: () => void
  onPaletteChange: (paletteId: string) => void
  onCustomColorsChange: (colors: CustomColors) => void
}

export function PaletteMenu({
  activeTheme,
  paletteId,
  customColors,
  isOpen,
  onToggle,
  onClose,
  onPaletteChange,
  onCustomColorsChange
}: PaletteMenuProps) {
  const [showCustomEditor, setShowCustomEditor] = useState(false)

  const themePalettes = getThemePalettes(activeTheme)
  const basePalette = themePalettes.find((p) => p.id === paletteId) || themePalettes[0]
  const resolvedColors: PaletteColors = resolvePaletteColors(activeTheme, paletteId, customColors)
  const activePaletteName = paletteId === 'custom' ? '自定义' : basePalette.name

  const updateCustomField = (key: PaletteColorKey, value: string) => {
    onPaletteChange('custom')
    onCustomColorsChange({
      ...resolvedColors,
      ...customColors,
      [key]: value
    })
  }

  const resetCustomToThemeDefault = () => {
    onPaletteChange('custom')
    onCustomColorsChange({ ...activeTheme.defaultPalette.colors })
  }

  return (
    <div className='relative'>
      <button
        type='button'
        onClick={onToggle}
        className='inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1 text-xs hover:border-foreground/40 transition-colors cursor-pointer'>
        <span className='text-muted-foreground'>配色</span>
        <span className='flex items-center -space-x-1'>
          {[resolvedColors.bg, resolvedColors.headingDecor, resolvedColors.strong, resolvedColors.tableAccent].map((c, idx) => (
            <span key={idx} className='h-3 w-3 rounded-full border border-background' style={{ backgroundColor: c }} />
          ))}
        </span>
        <span className='font-medium text-foreground'>{activePaletteName}</span>
        <ChevronDown className='h-3 w-3 text-muted-foreground' />
      </button>

      {isOpen && (
        <div className='absolute right-0 top-full z-50 mt-2 w-80 max-w-[92vw] rounded-lg border border-border bg-popover p-3 shadow-xl'>
          <div className='mb-2 flex items-center justify-between px-1 font-mono text-[11px] tracking-wider text-muted-foreground'>
            <span>COLORWAYS · 主题配色</span>
            <span>{themePalettes.length + 1} PALETTES</span>
          </div>

          <div className='max-h-105 space-y-1.5 overflow-y-auto pr-0.5'>
            {themePalettes.map((p) => {
              const isSelected = paletteId === p.id
              return (
                <button
                  key={p.id}
                  type='button'
                  onClick={() => {
                    onPaletteChange(p.id)
                    setShowCustomEditor(false)
                    onClose()
                  }}
                  className={`flex w-full items-center gap-3 rounded-md border px-3 py-2 text-left transition-colors cursor-pointer ${
                    isSelected
                      ? 'border-foreground bg-secondary'
                      : 'border-border hover:border-foreground/35 hover:bg-secondary/50'
                  }`}>
                  <div className='flex shrink-0 items-center -space-x-1'>
                    {[p.colors.bg, p.colors.headingDecor, p.colors.strong, p.colors.tableAccent].map((c, idx) => (
                      <span key={idx} className='h-4 w-4 rounded-full border border-border' style={{ backgroundColor: c }} />
                    ))}
                  </div>
                  <div className='min-w-0 text-xs font-semibold text-foreground'>{p.name}</div>
                </button>
              )
            })}

            <div
              className={`rounded-md border transition-colors ${
                paletteId === 'custom' ? 'border-foreground bg-secondary' : 'border-border'
              }`}>
              <div className='flex items-center justify-between px-3 py-2'>
                <button
                  type='button'
                  onClick={() => {
                    onPaletteChange('custom')
                    setShowCustomEditor((prev) => !prev)
                  }}
                  className='flex flex-1 items-center gap-2.5 text-left cursor-pointer'>
                  <Pipette className='h-4 w-4 text-muted-foreground shrink-0' />
                  <div className='min-w-0 flex-1'>
                    <div className='text-xs font-semibold text-foreground'>自定义配色...</div>
                    <div className='text-[11px] text-muted-foreground'>逐项调整 11 处元素颜色</div>
                  </div>
                </button>

                {(showCustomEditor || paletteId === 'custom') && (
                  <button
                    type='button'
                    onClick={resetCustomToThemeDefault}
                    className='inline-flex items-center gap-1 rounded-md px-1.5 py-1 text-[11px] text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer'
                    title='重置为当前主题默认色'>
                    <RotateCcw className='h-3 w-3' />
                    <span>重置</span>
                  </button>
                )}
              </div>

              {(showCustomEditor || paletteId === 'custom') && (
                <div className='border-t border-border px-3 py-2 space-y-1.5'>
                  {PALETTE_COLOR_FIELDS.map(({ key, label }) => {
                    const val = resolvedColors[key]
                    return (
                      <label key={key} className='flex items-center justify-between gap-2 text-xs cursor-pointer hover:bg-muted/40 rounded-md px-1.5 py-1'>
                        <span className='text-foreground'>{label}</span>
                        <span className='flex items-center gap-2'>
                          <span className='font-mono text-[10px] text-muted-foreground uppercase'>{val}</span>
                          <input
                            type='color'
                            value={val}
                            onChange={(e) => updateCustomField(key, e.target.value)}
                            className='h-5 w-7 cursor-pointer rounded border border-border bg-transparent p-0'
                          />
                        </span>
                      </label>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          <div className='mt-2 border-t border-border pt-2 text-[10px] text-muted-foreground'>主题自带原配色 + 5 套流行配色 + 11 项全自定义。</div>
        </div>
      )}
    </div>
  )
}
