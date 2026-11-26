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
    <div className='relative max-w-2xl mx-auto group'>
      <Search className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-foreground transition-colors' />
      <Input
        type='text'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={displayPlaceholder}
        className='h-11 text-sm pl-10 pr-10 bg-secondary/50 text-foreground placeholder:text-muted-foreground rounded-md border border-border focus-visible:bg-background focus-visible:ring-2 focus-visible:ring-foreground/10 focus-visible:border-foreground/50 transition-all'
      />
      {value && (
        <button
          type='button'
          onClick={() => onChange('')}
          className='absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1 rounded-sm hover:bg-muted cursor-pointer'
          aria-label={t.search.clearLabel}>
          <X className='w-3.5 h-3.5' />
        </button>
      )}
    </div>
  )
}
