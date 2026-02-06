import { Navbar } from '@/components/Navbar'
import { CoverGenerator } from '@/components/oppo-widget-cover'
import { tools } from '@/data/tools'
import { notFound } from 'next/navigation'

export default function OppoWidgetCoverPage() {
  const tool = tools.find((t) => t.id === 'oppo-widget-cover')

  if (!tool) {
    notFound()
  }

  return (
    <div className='flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900'>
      <Navbar />

      <main className='mt-16 h-[calc(100vh-64px)] overflow-hidden'>
        {/* 封面生成器 */}
        <CoverGenerator />
      </main>
    </div>
  )
}
