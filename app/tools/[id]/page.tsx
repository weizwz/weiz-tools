import { notFound } from 'next/navigation'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { tools } from '@/data/tools'
import Link from 'next/link'

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
          {/* Back Button */}
          <Button variant='ghost' className='mb-8 text-gray-500 hover:text-gray-900 pl-0 hover:bg-transparent' asChild>
            <Link href='/'>← 返回首页</Link>
          </Button>

          {/* Tool Header */}
          <div className='mb-8'>
            <div className='inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white border border-gray-200 shadow-sm text-4xl mb-6'>
              {tool.icon}
            </div>
            <h1 className='text-3xl font-bold text-gray-900 mb-2'>{tool.name}</h1>
            <p className='text-xl text-gray-500'>{tool.description}</p>
          </div>

          {/* Tool Content */}
          <Card className='card-style mb-8 shadow-sm'>
            <CardHeader className='border-b border-gray-100 p-6'>
              <CardTitle className='text-lg font-bold text-gray-900'>工具说明</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4 text-lg font-medium text-gray-700 px-6 md:px-8 pb-6 md:pb-8'>
              <p>
                这是 <strong>{tool.name}</strong> 工具的详情页面。
              </p>
              <p>
                该工具属于 <strong>{tool.category}</strong> 分类, 可以帮助你快速完成相关任务。
              </p>
              <p className='text-gray-500 italic'>💡 提示:实际的工具功能将在后续版本中实现。 当前页面展示了工具的基本信息和布局设计。</p>
            </CardContent>
          </Card>

          {/* Demo Area Placeholder */}
          <Card className='card-style'>
            <CardHeader className='p-6 md:p-8'>
              <CardTitle className='text-3xl font-black text-gray-900'>🎯 工具演示区</CardTitle>
            </CardHeader>
            <CardContent className='px-6 md:px-8 pb-6 md:pb-8'>
              <div className='bg-gray-50 rounded-2xl p-12 text-center border border-slate-200'>
                <p className='text-2xl font-bold text-gray-400'>工具交互界面即将上线...</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
