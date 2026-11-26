'use client'

import Link from 'next/link'
import { useI18n } from '@/lib/i18n'

export function Footer() {
  const { t } = useI18n()

  return (
    <footer className='py-7 bg-background border-t border-border'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6'>
        <div className='flex flex-col sm:flex-row justify-between items-center gap-4'>
          <div className='flex items-center gap-3 text-xs text-muted-foreground'>
            <span className='inline-flex items-center gap-2'>
              <span className='w-1.5 h-1.5 rounded-full bg-emerald-500' />
              <span className='font-medium text-foreground'>{t.common.siteName}</span>
            </span>
            <span className='text-border'>·</span>
            <span>© {new Date().getFullYear()}</span>
            <span className='text-border'>·</span>
            <Link href='/about' className='hover:text-foreground transition-colors'>
              {t.nav.about}
            </Link>
          </div>
          <div className='flex flex-wrap justify-center gap-2 font-mono text-[11px] text-muted-foreground'>
            {['Next.js', 'Tailwind CSS', 'Geist UI', 'Cloudflare'].map((item) => (
              <span key={item} className='px-2 py-0.5 rounded-md bg-secondary border border-border'>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
