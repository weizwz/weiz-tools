'use client'

import { Input } from '@/components/ui/input'
import { Search, X } from 'lucide-react'
import { useI18n } from '@/lib/i18n'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchBar({ value, onChange, placeholder }: SearchBarProps) {
  const { t } = useI18n()
  const displayPlaceholder = placeholder || t.search.placeholder

  return (
    <div className='relative max-w-2xl mx-auto'>
      <Search className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
      <Input
        type='text'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={displayPlaceholder}
        className='h-12 text-base pl-10 pr-10 bg-card text-foreground placeholder:text-muted-foreground rounded-xl border border-border shadow-xs focus-visible:ring-2 focus-visible:ring-main/30 focus-visible:border-main transition-all'
      />
      {value && (
        <button
          type='button'
          onClick={() => onChange('')}
          className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-muted cursor-pointer'
          aria-label={t.search.clearLabel}>
          <X className='w-4 h-4' />
        </button>
      )}
    </div>
  )
}
