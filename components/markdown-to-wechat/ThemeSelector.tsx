'use client'

import { COLOR_PRESETS, WECHAT_THEMES } from './themes/presets'
import { FontSizeOption, ThemeId } from './themes/types'
import { Sparkles } from 'lucide-react'

interface ThemeSelectorProps {
  themeId: ThemeId
  customColor: string
  fontSize: FontSizeOption
  enableMotion: boolean
  onThemeChange: (id: ThemeId) => void
  onCustomColorChange: (color: string) => void
  onFontSizeChange: (size: FontSizeOption) => void
  onMotionChange: (enabled: boolean) => void
}

const FONT_SIZES: FontSizeOption[] = [14, 15, 16, 17]

export function ThemeSelector({
  themeId,
  customColor,
  fontSize,
  enableMotion,
  onThemeChange,
  onCustomColorChange,
  onFontSizeChange,
  onMotionChange
}: ThemeSelectorProps) {
  const activeTheme = WECHAT_THEMES.find((t) => t.id === themeId) || WECHAT_THEMES[0]

  return (
    <div className='flex flex-wrap items-center gap-2'>
      {/* 主题选择 */}
      <div className='flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs'>
        <span className='text-muted-foreground'>主题</span>
        <span
          className='inline-block h-2.5 w-2.5 rounded-full'
          style={{ backgroundColor: customColor || activeTheme.primary }}
        />
        <select
          value={themeId}
          onChange={(e) => onThemeChange(e.target.value as ThemeId)}
          className='bg-transparent font-medium text-foreground outline-none cursor-pointer'
        >
          {WECHAT_THEMES.map((theme) => (
            <option key={theme.id} value={theme.id} className='bg-card text-foreground'>
              {theme.name}
            </option>
          ))}
        </select>
      </div>

      {/* 字号选择 */}
      <div className='flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs'>
        <span className='text-muted-foreground'>字号</span>
        <select
          value={fontSize}
          onChange={(e) => onFontSizeChange(Number(e.target.value) as FontSizeOption)}
          className='bg-transparent font-medium text-foreground outline-none cursor-pointer'
        >
          {FONT_SIZES.map((size) => (
            <option key={size} value={size} className='bg-card text-foreground'>
              {size}px
            </option>
          ))}
        </select>
      </div>

      {/* 配色选择 */}
      <div className='flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs'>
        <span className='text-muted-foreground'>配色</span>
        <select
          value={customColor}
          onChange={(e) => onCustomColorChange(e.target.value)}
          className='bg-transparent font-medium text-foreground outline-none cursor-pointer'
        >
          {COLOR_PRESETS.map((preset) => (
            <option key={preset.label} value={preset.value} className='bg-card text-foreground'>
              {preset.label}
            </option>
          ))}
        </select>
      </div>

      {/* 动效开关 */}
      <button
        type='button'
        onClick={() => onMotionChange(!enableMotion)}
        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition-colors cursor-pointer ${
          enableMotion
            ? 'bg-slate-900 text-white dark:bg-[#409eff] dark:text-white'
            : 'border border-border bg-background text-muted-foreground hover:text-foreground'
        }`}
        title='切换标题装饰 SVG 微动效'
      >
        <Sparkles className='h-3 w-3' />
        <span>{enableMotion ? '动态' : '静态'}</span>
      </button>
    </div>
  )
}
