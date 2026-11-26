'use client'

import { Zap, Wind, Layers, Cloud } from 'lucide-react'
import { useI18n } from '@/lib/i18n'

export function Footer() {
  const { t } = useI18n()

  return (
    <footer className='py-8 bg-card border-t border-border'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6'>
        <div className='flex flex-col sm:flex-row justify-between items-center gap-4'>
          <p className='text-xs text-muted-foreground'>
            © {new Date().getFullYear()} <span className='font-semibold text-foreground'>{t.common.siteName}</span> · {t.common.allRightsReserved}
          </p>
          <div className='flex flex-wrap justify-center gap-2'>
            <TechBadge icon={<Zap size={12} />} label='Next.js' />
            <TechBadge icon={<Wind size={12} />} label='Tailwind' />
            <TechBadge icon={<Layers size={12} />} label='shadcn/ui' />
            <TechBadge icon={<Cloud size={12} />} label='Cloudflare' />
          </div>
        </div>
      </div>
    </footer>
  )
}

function TechBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className='inline-flex items-center gap-1.5 px-2.5 py-1 bg-muted/60 rounded-md border border-border text-[11px] font-medium text-muted-foreground'>
      <span className='text-main'>{icon}</span>
      <span>{label}</span>
    </div>
  )
}
