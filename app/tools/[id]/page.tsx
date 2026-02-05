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
    <div className='min-h-screen bg-gray-50'>
      <Navbar />

      <main className='pt-32 pb-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-5xl mx-auto'>
          {/* Tool Header */}
          <ToolPageHeader tool={tool} />
        </div>
      </main>

      <Footer />
    </div>
  )
}
