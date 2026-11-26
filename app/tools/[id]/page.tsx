import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ToolPageHeader } from '@/components/ToolPageHeader'
import { tools } from '@/data/tools'
import { Wrench, ArrowLeft } from 'lucide-react'

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
        <div className='max-w-4xl mx-auto'>
          <ToolPageHeader tool={tool} />

          <div className='rounded-lg bg-secondary/30 border border-border p-10 sm:p-14 text-center'>
            <div className='w-10 h-10 rounded-md bg-background border border-border text-foreground flex items-center justify-center mx-auto mb-4'>
              <Wrench className='w-4 h-4' />
            </div>
            <h2 className='text-sm font-semibold text-foreground mb-1.5'>工具正在打磨中</h2>
            <p className='text-xs sm:text-sm text-muted-foreground max-w-md mx-auto mb-6 leading-relaxed'>
              该工具模块正在开发中，敬请期待。您可以先返回首页浏览其他已上线的工具。
            </p>
            <Link
              href='/'
              className='inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-foreground text-background text-xs font-medium hover:opacity-90 transition-opacity'>
              <ArrowLeft className='w-3.5 h-3.5' />
              <span>返回工具列表</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
