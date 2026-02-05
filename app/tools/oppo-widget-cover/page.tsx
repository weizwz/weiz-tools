import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { ToolPageHeader } from '@/components/ToolPageHeader'
import { tools } from '@/data/tools'
import { notFound } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function OppoWidgetCoverPage() {
  const tool = tools.find((t) => t.id === 'oppo-widget-cover')

  if (!tool) {
    notFound()
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <Navbar />

      <main className='pt-32 pb-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-5xl mx-auto'>
          {/* Shared Header */}
          <ToolPageHeader tool={tool} />

          {/* Specific Tool Interface */}
          <Card className='card-style shadow-sm bg-white'>
            <CardHeader className='border-b border-gray-100 p-6'>
              <CardTitle className='text-lg font-bold text-gray-900'>封面生成设置</CardTitle>
            </CardHeader>
            <CardContent className='p-8'>
              <div className='flex flex-col items-center justify-center min-h-[400px] border-2 border-dashed border-slate-200 rounded-xl bg-slate-50'>
                <p className='text-slate-400 font-medium mb-4'>这里是 OPPO 组件封面生成的具体操作界面</p>
                <Button className='bg-main text-white'>上传图片</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
