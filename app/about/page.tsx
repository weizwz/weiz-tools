'use client'

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useI18n } from '@/lib/i18n'
import { Zap, Palette, ShieldCheck, Smartphone } from 'lucide-react'

export default function AboutPage() {
  const { t } = useI18n()

  const pillars = [
    { icon: Zap, title: t.about.speedTitle, desc: t.about.speedDesc },
    { icon: Palette, title: t.about.designTitle, desc: t.about.designDesc },
    { icon: ShieldCheck, title: t.about.privacyTitle, desc: t.about.privacyDesc },
    { icon: Smartphone, title: t.about.responsiveTitle, desc: t.about.responsiveDesc }
  ]

  return (
    <div className='min-h-screen flex flex-col bg-background'>
      <Navbar />

      <main className='flex-1 pt-24 pb-16 px-4 sm:px-6'>
        <div className='max-w-4xl mx-auto'>
          <div className='mb-12 text-center'>
            <div className='inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-secondary border border-border text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-4'>
              <span className='w-1.5 h-1.5 rounded-full bg-main' />
              <span>{t.common.siteName}</span>
            </div>
            <h1 className='text-3xl sm:text-4xl font-bold tracking-[-0.04em] text-foreground mb-3'>{t.about.title}</h1>
            <p className='text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed'>{t.about.subtitle}</p>
          </div>

          <Card className='card-style mb-5 py-0 shadow-none'>
            <CardHeader className='p-6 sm:p-8'>
              <CardTitle className='text-base font-semibold tracking-[-0.01em] text-foreground mb-2'>{t.about.missionTitle}</CardTitle>
              <CardDescription className='text-sm sm:text-[15px] text-muted-foreground leading-relaxed'>{t.about.missionDesc}</CardDescription>
            </CardHeader>
          </Card>

          <div className='grid md:grid-cols-2 gap-3.5 mb-10'>
            {pillars.map(({ icon: Icon, title, desc }) => (
              <Card key={title} className='card-style py-0 shadow-none'>
                <CardHeader className='p-6'>
                  <div className='w-8 h-8 rounded-md bg-secondary border border-border text-foreground flex items-center justify-center mb-3'>
                    <Icon className='w-4 h-4' />
                  </div>
                  <CardTitle className='text-sm font-semibold text-foreground mb-1.5'>{title}</CardTitle>
                  <CardDescription className='text-xs sm:text-sm text-muted-foreground leading-relaxed'>{desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className='mb-10'>
            <h2 className='text-sm font-mono uppercase tracking-wider text-muted-foreground mb-3'>{t.about.techStackTitle}</h2>
            <div className='flex flex-wrap gap-2'>
              {['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'Geist Design', 'pnpm'].map((tech) => (
                <Badge
                  key={tech}
                  className='bg-secondary text-muted-foreground border border-border hover:text-foreground px-2.5 py-1 text-xs font-mono rounded-md transition-colors'>
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <Card className='card-style py-0 shadow-none'>
            <CardHeader className='p-6 sm:p-8'>
              <CardTitle className='text-base font-semibold text-foreground mb-2'>{t.about.contactTitle}</CardTitle>
              <CardDescription className='text-sm text-muted-foreground leading-relaxed space-y-2'>
                <p>{t.about.contactDesc}</p>
                <div className='pt-2 flex flex-wrap gap-x-6 gap-y-1.5 text-xs font-mono text-foreground'>
                  <span>Email: hello@weiztools.com</span>
                  <span>GitHub: github.com/weiz</span>
                  <span>Twitter: @weiztools</span>
                </div>
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
