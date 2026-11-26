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
    <div className='flex flex-col min-h-screen bg-background'>
      <Navbar />

      <main className='mt-14 h-[calc(100vh-56px)] overflow-hidden'>
        <CoverGenerator />
      </main>
    </div>
  )
}
