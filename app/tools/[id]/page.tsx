import { notFound } from 'next/navigation'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ToolPageHeader } from '@/components/ToolPageHeader'
import { tools } from '@/data/tools'

export function generateStaticParams() {
  return tools.map((tool) => ({
    id: tool.id
  }))
}

export default async function ToolPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const tool = tools.find((t) => t.id === id)

  if (!tool) {
    notFound()
  }

  return (
    <div className='min-h-screen flex flex-col bg-background'>
      <Navbar />

      <main className='flex-1 pt-24 pb-16 px-4 sm:px-6'>
        <div className='max-w-5xl mx-auto'>
          <ToolPageHeader tool={tool} />
        </div>
      </main>

      <Footer />
    </div>
  )
}
