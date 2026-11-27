'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Pipette, RotateCcw } from 'lucide-react'
import { MOTION_PRESETS } from './engine/motions'
import { WECHAT_THEMES } from './engine/themes'
import { getThemePalettes, PALETTE_COLOR_FIELDS, resolvePaletteColors } from './engine/tokens'
import {
  CustomColors,
  FontSizeOption,
  MotionId,
  PaletteColorKey,
  PaletteColors,
  ThemeId
} from './engine/types'

interface ThemeSelectorProps {
  themeId: ThemeId
  motionId: MotionId
  animated: boolean
  paletteId: string
  customColors: CustomColors
  fontSize: FontSizeOption
  onThemeChange: (id: ThemeId) => void
  onMotionChange: (id: MotionId) => void
  onAnimatedChange: (animated: boolean) => void
  onPaletteChange: (paletteId: string) => void
  onCustomColorsChange: (colors: CustomColors) => void
  onFontSizeChange: (size: FontSizeOption) => void
}

type OpenMenu = 'theme' | 'motion' | 'palette' | null

const FONT_SIZES: FontSizeOption[] = [14, 15, 16, 17]

export function ThemeSelector({
  themeId,
  motionId,
  animated,
  paletteId,
  customColors,
  fontSize,
  onThemeChange,
  onMotionChange,
  onAnimatedChange,
  onPaletteChange,
  onCustomColorsChange,
  onFontSizeChange
}: ThemeSelectorProps) {
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null)
  const [showCustomEditor, setShowCustomEditor] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const activeTheme = WECHAT_THEMES.find((t) => t.id === themeId) || WECHAT_THEMES[0]
  const activeMotion = MOTION_PRESETS.find((m) => m.id === motionId) || MOTION_PRESETS[0]
  const themePalettes = getThemePalettes(activeTheme)
  const basePalette = themePalettes.find((p) => p.id === paletteId) || activeTheme.defaultPalette
  const resolvedColors: PaletteColors = resolvePaletteColors(activeTheme, paletteId, customColors)
  const activePaletteName = paletteId === 'custom' ? '自定义' : basePalette.name

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpenMenu(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleMenu = (menu: Exclude<OpenMenu, null>) => {
    setOpenMenu((prev) => (prev === menu ? null : menu))
  }

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
    <div ref={containerRef} className='relative flex flex-wrap items-center gap-1.5'>
      {/* 1. 基础排版 / 主题选择器 */}
      <div className='relative'>
        <button
          type='button'
          onClick={() => toggleMenu('theme')}
          className='inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1 text-xs hover:border-foreground/40 transition-colors cursor-pointer'>
          <span className='text-muted-foreground'>排版</span>
          <span className='inline-block h-2.5 w-2.5 rounded-full' style={{ backgroundColor: activeTheme.defaultPalette.colors.headingDecor }} />
          <span className='font-medium text-foreground'>{activeTheme.name}</span>
          <ChevronDown className='h-3 w-3 text-muted-foreground' />
        </button>

        {openMenu === 'theme' && (
          <div className='absolute left-0 top-full z-50 mt-2 w-120 max-w-[90vw] rounded-lg border border-border bg-popover p-3 shadow-xl'>
            <div className='mb-2.5 flex items-center justify-between px-1 font-mono text-[11px] tracking-wider text-muted-foreground'>
              <span>BASIC LAYOUTS · 基础排版</span>
              <span>{WECHAT_THEMES.length} THEMES</span>
            </div>
            <div className='grid max-h-85 grid-cols-2 gap-2 overflow-y-auto pr-1'>
              {WECHAT_THEMES.map((theme) => {
                const isSelected = theme.id === activeTheme.id
                return (
                  <button
                    key={theme.id}
                    type='button'
                    onClick={() => {
                      onThemeChange(theme.id)
                      setOpenMenu(null)
                    }}
                    className={`flex items-start gap-2.5 rounded-md border p-2.5 text-left transition-colors cursor-pointer ${
                      isSelected
                        ? 'border-foreground bg-secondary'
                        : 'border-border hover:border-foreground/35 hover:bg-secondary/50'
                    }`}>
                    <span className='mt-1 h-2.5 w-2.5 shrink-0 rounded-full' style={{ backgroundColor: theme.defaultPalette.colors.headingDecor }} />
                    <div className='min-w-0'>
                      <div className='text-xs font-semibold text-foreground'>{theme.name}</div>
                      <div className='mt-0.5 truncate text-[11px] text-muted-foreground'>{theme.subtitle}</div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* 2. 动效选择（与排版解耦） */}
      <div className='relative'>
        <button
          type='button'
          onClick={() => toggleMenu('motion')}
          className='inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1 text-xs hover:border-foreground/40 transition-colors cursor-pointer'>
          <span className='text-muted-foreground'>动效</span>
          <span className='font-medium text-foreground'>{activeMotion.name}</span>
          <ChevronDown className='h-3 w-3 text-muted-foreground' />
        </button>

        {openMenu === 'motion' && (
          <div className='absolute left-0 top-full z-50 mt-2 w-64 rounded-lg border border-border bg-popover p-2.5 shadow-xl'>
            <div className='mb-2 flex items-center justify-between px-1 font-mono text-[11px] tracking-wider text-muted-foreground'>
              <span>MOTION PRESETS · 动效</span>
              <span>{MOTION_PRESETS.length} PRESETS</span>
            </div>
            <div className='space-y-1.5'>
              {MOTION_PRESETS.map((preset) => {
                const isSelected = preset.id === activeMotion.id
                return (
                  <button
                    key={preset.id}
                    type='button'
                    onClick={() => {
                      onMotionChange(preset.id)
                      setOpenMenu(null)
                    }}
                    className={`flex w-full items-center justify-between gap-2 rounded-md border px-2.5 py-2 text-left transition-colors cursor-pointer ${
                      isSelected
                        ? 'border-foreground bg-secondary font-semibold'
                        : 'border-border hover:border-foreground/35 hover:bg-secondary/50'
                    }`}>
                    <span className='text-xs text-foreground'>{preset.name}</span>
                    <span className='font-mono text-[10px] text-muted-foreground'>{preset.id}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* 3. COLORWAYS · 主题配色 */}
      <div className='relative'>
        <button
          type='button'
          onClick={() => toggleMenu('palette')}
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

        {openMenu === 'palette' && (
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
                      setOpenMenu(null)
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
                    <div className='min-w-0'>
                      <div className='text-xs font-semibold text-foreground'>{p.name}</div>
                      <div className='truncate text-[11px] text-muted-foreground'>{p.subtitle}</div>
                    </div>
                  </button>
                )
              })}

              {/* 自定义配色（11 项细粒度控制） */}
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

      {/* 4. 字号选择 */}
      <div className='flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1 text-xs'>
        <span className='text-muted-foreground'>字号</span>
        <select
          value={fontSize}
          onChange={(e) => onFontSizeChange(Number(e.target.value) as FontSizeOption)}
          className='bg-transparent font-mono font-medium text-foreground outline-none cursor-pointer'>
          {FONT_SIZES.map((size) => (
            <option key={size} value={size} className='bg-card text-foreground'>
              {size}px
            </option>
          ))}
        </select>
      </div>

      {/* 5. 动态开关（字号后） */}
      <label
        className='inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1 text-xs hover:border-foreground/40 transition-colors cursor-pointer select-none'
        title='选中启用 SVG 动效，取消仅保留静态 SVG 装饰'>
        <input
          type='checkbox'
          checked={animated}
          onChange={(e) => onAnimatedChange(e.target.checked)}
          className='h-3.5 w-3.5 accent-foreground cursor-pointer'
        />
        <span className='font-medium text-foreground'>动态</span>
      </label>
    </div>
  )
}
