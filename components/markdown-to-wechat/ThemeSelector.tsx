'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { MOTION_PRESETS } from './engine/motions'
import { WECHAT_THEMES } from './engine/themes'
import { CustomColors, FontSizeOption, HeadingNumbering, MotionId, ThemeId } from './engine/types'
import { PaletteMenu } from './PaletteMenu'

interface ThemeSelectorProps {
  themeId: ThemeId
  motionId: MotionId
  animated: boolean
  headingNumbering: HeadingNumbering
  paletteId: string
  customColors: CustomColors
  fontSize: FontSizeOption
  onThemeChange: (id: ThemeId) => void
  onMotionChange: (id: MotionId) => void
  onAnimatedChange: (animated: boolean) => void
  onHeadingNumberingChange: (mode: HeadingNumbering) => void
  onPaletteChange: (paletteId: string) => void
  onCustomColorsChange: (colors: CustomColors) => void
  onFontSizeChange: (size: FontSizeOption) => void
}

type OpenMenu = 'theme' | 'motion' | 'palette' | 'fontSize' | null

const FONT_SIZES: FontSizeOption[] = [14, 15, 16, 17]

export function ThemeSelector({
  themeId,
  motionId,
  animated,
  headingNumbering,
  paletteId,
  customColors,
  fontSize,
  onThemeChange,
  onMotionChange,
  onAnimatedChange,
  onHeadingNumberingChange,
  onPaletteChange,
  onCustomColorsChange,
  onFontSizeChange
}: ThemeSelectorProps) {
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const activeTheme = WECHAT_THEMES.find((t) => t.id === themeId) || WECHAT_THEMES[0]
  const activeMotion = MOTION_PRESETS.find((m) => m.id === motionId) || MOTION_PRESETS[0]

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

  return (
    <div ref={containerRef} className='relative flex flex-wrap items-center gap-1.5'>
      {/* 1. 基础排版选择器 */}
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
          <div className='absolute left-0 top-full z-50 mt-2 w-96 max-w-[90vw] rounded-lg border border-border bg-popover p-3 shadow-xl'>
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
                    className={`flex items-center gap-2.5 rounded-md border p-2.5 text-left transition-colors cursor-pointer ${
                      isSelected
                        ? 'border-foreground bg-secondary'
                        : 'border-border hover:border-foreground/35 hover:bg-secondary/50'
                    }`}>
                    <span className='h-2.5 w-2.5 shrink-0 rounded-full' style={{ backgroundColor: theme.defaultPalette.colors.headingDecor }} />
                    <span className='min-w-0 truncate text-xs font-semibold text-foreground'>{theme.name}</span>
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

      {/* 3. 主题配色 */}
      <PaletteMenu
        activeTheme={activeTheme}
        paletteId={paletteId}
        customColors={customColors}
        isOpen={openMenu === 'palette'}
        onToggle={() => toggleMenu('palette')}
        onClose={() => setOpenMenu(null)}
        onPaletteChange={onPaletteChange}
        onCustomColorsChange={onCustomColorsChange}
      />

      {/* 4. 字号选择 */}
      <div className='relative'>
        <button
          type='button'
          onClick={() => toggleMenu('fontSize')}
          className='inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1 text-xs hover:border-foreground/40 transition-colors cursor-pointer'>
          <span className='text-muted-foreground'>字号</span>
          <span className='font-mono font-medium tabular-nums text-foreground'>{fontSize}px</span>
          <ChevronDown className='h-3 w-3 text-muted-foreground' />
        </button>

        {openMenu === 'fontSize' && (
          <div className='absolute right-0 top-full z-50 mt-2 w-28 rounded-lg border border-border bg-popover p-1.5 shadow-xl'>
            <div className='space-y-1'>
              {FONT_SIZES.map((size) => {
                const isSelected = size === fontSize
                return (
                  <button
                    key={size}
                    type='button'
                    onClick={() => {
                      onFontSizeChange(size)
                      setOpenMenu(null)
                    }}
                    className={`flex w-full items-center justify-between rounded-md px-2.5 py-1.5 font-mono text-xs tabular-nums transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-secondary font-semibold text-foreground'
                        : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                    }`}>
                    <span>{size}px</span>
                    {isSelected && <Check className='h-3.5 w-3.5 text-foreground' />}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* 5. 章节编号开关 */}
      <label
        className='inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1 text-xs hover:border-foreground/40 transition-colors cursor-pointer select-none'
        title='切换二级/三级标题自动数字编号或无编号指示符'>
        <input
          type='checkbox'
          checked={headingNumbering === 'numeric'}
          onChange={(e) => onHeadingNumberingChange(e.target.checked ? 'numeric' : 'none')}
          className='h-3.5 w-3.5 accent-foreground cursor-pointer'
        />
        <span className='font-medium text-foreground'>编号</span>
      </label>

      {/* 6. 动态开关 */}
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
