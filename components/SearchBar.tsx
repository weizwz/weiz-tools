'use client'

import { Input } from '@/components/ui/input'
import { Search, X } from 'lucide-react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchBar({ value, onChange, placeholder = '搜索工具...' }: SearchBarProps) {
  return (
    <div className='relative max-w-2xl mx-auto'>
      <Search className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400' />
      <Input
        type='text'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className='shadow-soft h-14 text-lg pl-12 pr-12 bg-white text-gray-900 placeholder:text-gray-400 focus-visible:shadow-soft-lg transition-smooth font-medium rounded-full border-0 focus-visible:ring-2 focus-visible:ring-blue-500'
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-smooth p-1 rounded-full hover:bg-gray-100'
          aria-label='清除搜索'>
          <X className='w-5 h-5' />
        </button>
      )}
    </div>
  )
}
