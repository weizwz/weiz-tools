'use client'

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useI18n } from '@/lib/i18n'

export default function AboutPage() {
  const { t } = useI18n()

  return (
    <div className='min-h-screen flex flex-col bg-background'>
      <Navbar />

      <main className='flex-1 pt-24 pb-16 px-4 sm:px-6'>
        <div className='max-w-4xl mx-auto'>
          <div className='mb-12 text-center'>
            <h1 className='text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-3'>{t.about.title}</h1>
            <p className='text-base sm:text-lg text-muted-foreground'>{t.about.subtitle}</p>
          </div>

          <Card className='card-style mb-6 py-0'>
            <CardHeader className='p-6 sm:p-8'>
              <CardTitle className='text-xl font-bold text-foreground mb-2'>{t.about.missionTitle}</CardTitle>
              <CardDescription className='text-sm sm:text-base text-muted-foreground leading-relaxed'>{t.about.missionDesc}</CardDescription>
            </CardHeader>
          </Card>

          <div className='grid md:grid-cols-2 gap-4 mb-10'>
            {[
              { title: t.about.speedTitle, desc: t.about.speedDesc },
              { title: t.about.designTitle, desc: t.about.designDesc },
              { title: t.about.privacyTitle, desc: t.about.privacyDesc },
              { title: t.about.responsiveTitle, desc: t.about.responsiveDesc }
            ].map((item) => (
              <Card key={item.title} className='card-style py-0'>
                <CardHeader className='p-6'>
                  <CardTitle className='text-lg font-semibold text-foreground mb-1.5'>{item.title}</CardTitle>
                  <CardDescription className='text-sm text-muted-foreground leading-relaxed'>{item.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className='mb-10'>
            <h2 className='text-xl font-bold text-foreground mb-4'>{t.about.techStackTitle}</h2>
            <div className='flex flex-wrap gap-2'>
              {['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'shadcn/ui', 'pnpm'].map((tech) => (
                <Badge key={tech} className='bg-main-soft text-main border border-main/20 px-3 py-1 text-xs font-medium rounded-lg'>
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <Card className='card-style py-0'>
            <CardHeader className='p-6 sm:p-8'>
              <CardTitle className='text-xl font-bold text-foreground mb-3'>{t.about.contactTitle}</CardTitle>
              <CardDescription className='text-sm text-muted-foreground leading-relaxed space-y-1.5'>
                <p>{t.about.contactDesc}</p>
                <p className='pt-2'>Email: hello@weiztools.com</p>
                <p>GitHub: github.com/weiz</p>
                <p>Twitter: @weiztools</p>
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
