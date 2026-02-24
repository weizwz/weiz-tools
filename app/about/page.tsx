'use client'

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useI18n } from '@/lib/i18n'

export default function AboutPage() {
  const { t } = useI18n()

  return (
    <div className='min-h-screen bg-[#f5f7fa]'>
      <Navbar />

      <main className='pt-32 pb-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-4xl mx-auto'>
          {/* Header */}
          <div className='mb-16 text-center'>
            <h1 className='text-6xl md:text-7xl font-black text-main mb-6'>{t.about.title}</h1>
            <p className='text-2xl font-semibold text-gray-600 mt-8'>{t.about.subtitle}</p>
          </div>

          {/* Mission */}
          <Card className='bg-white rounded-3xl border border-slate-200 shadow-md shadow-slate-200 hover:shadow-xl transition-all duration-300 mb-8'>
            <CardHeader className='p-6 md:p-8'>
              <CardTitle className='text-3xl font-black text-gray-900 mb-4'>{t.about.missionTitle}</CardTitle>
              <CardDescription className='text-lg font-medium text-gray-700'>{t.about.missionDesc}</CardDescription>
            </CardHeader>
          </Card>

          {/* Features */}
          <div className='grid md:grid-cols-2 gap-6 mb-12'>
            <Card className='bg-white rounded-3xl border border-slate-200 shadow-md shadow-slate-200 hover:shadow-xl transition-all duration-300'>
              <CardHeader className='p-6 md:p-8'>
                <CardTitle className='text-2xl font-bold text-gray-900 mb-2'>{t.about.speedTitle}</CardTitle>
                <CardDescription className='text-base font-medium text-gray-600'>{t.about.speedDesc}</CardDescription>
              </CardHeader>
            </Card>

            <Card className='bg-white rounded-3xl border border-slate-200 shadow-md shadow-slate-200 hover:shadow-xl transition-all duration-300'>
              <CardHeader className='p-6 md:p-8'>
                <CardTitle className='text-2xl font-bold text-gray-900 mb-2'>{t.about.designTitle}</CardTitle>
                <CardDescription className='text-base font-medium text-gray-600'>{t.about.designDesc}</CardDescription>
              </CardHeader>
            </Card>

            <Card className='bg-white rounded-3xl border border-slate-200 shadow-md shadow-slate-200 hover:shadow-xl transition-all duration-300'>
              <CardHeader className='p-6 md:p-8'>
                <CardTitle className='text-2xl font-bold text-gray-900 mb-2'>{t.about.privacyTitle}</CardTitle>
                <CardDescription className='text-base font-medium text-gray-600'>{t.about.privacyDesc}</CardDescription>
              </CardHeader>
            </Card>

            <Card className='bg-white rounded-3xl border border-slate-200 shadow-md shadow-slate-200 hover:shadow-xl transition-all duration-300'>
              <CardHeader className='p-6 md:p-8'>
                <CardTitle className='text-2xl font-bold text-gray-900 mb-2'>{t.about.responsiveTitle}</CardTitle>
                <CardDescription className='text-base font-medium text-gray-600'>{t.about.responsiveDesc}</CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Tech Stack */}
          <div className='mb-12'>
            <h2 className='text-4xl font-black text-gray-900 mb-6'>{t.about.techStackTitle}</h2>
            <div className='flex flex-wrap gap-3'>
              {['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'shadcn/ui', 'pnpm'].map((tech) => (
                <Badge key={tech} className='bg-main text-white px-4 py-2 text-base font-semibold rounded-full border-0 shadow-md shadow-slate-200'>
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Contact */}
          <Card className='bg-white rounded-3xl border border-slate-200 shadow-md shadow-slate-200 hover:shadow-xl transition-all duration-300'>
            <CardHeader className='p-6 md:p-8'>
              <CardTitle className='text-3xl font-black text-gray-900 mb-4'>{t.about.contactTitle}</CardTitle>
              <CardDescription className='text-lg font-medium text-gray-700 leading-relaxed'>
                {t.about.contactDesc}
                <br />
                <br />
                📧 Email: hello@weiztools.com
                <br />
                🐙 GitHub: github.com/weiz
                <br />
                🐦 Twitter: @weiztools
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
