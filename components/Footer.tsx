import { Zap, Wind, Layers, Cloud } from 'lucide-react'

export function Footer() {
  return (
    <footer className='py-12 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800'>
      <div className='container mx-auto px-6'>
        <div className='flex flex-col md:flex-row justify-between items-center gap-8'>
          <div className='flex flex-col gap-2'>
            <p className='text-sm text-slate-500'>
              © {new Date().getFullYear()} <span className='font-bold text-slate-900 dark:text-white uppercase tracking-wider'>weiz-tools</span>. All rights
              reserved.
            </p>
          </div>
          <div className='flex flex-wrap justify-center gap-4'>
            <TechBadge icon={<Zap size={14} />} label='NEXT.JS' />
            <TechBadge icon={<Wind size={14} />} label='TAILWIND' />
            <TechBadge icon={<Layers size={14} />} label='SHADCN' />
            <TechBadge icon={<Cloud size={14} />} label='VERCEL' />
          </div>
        </div>
      </div>
    </footer>
  )
}

function TechBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className='flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700 text-[11px] font-bold text-slate-600 dark:text-slate-300'>
      <span className='text-slate-500'>{icon}</span> {label}
    </div>
  )
}
