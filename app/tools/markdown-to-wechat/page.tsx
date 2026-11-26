import { Navbar } from '@/components/Navbar'
import { WechatStudio } from '@/components/markdown-to-wechat'
import { tools } from '@/data/tools'
import { notFound } from 'next/navigation'

export default function MarkdownToWechatPage() {
  const tool = tools.find((t) => t.id === 'markdown-to-wechat')

  if (!tool) {
    notFound()
  }

  return (
    <div className='flex flex-col min-h-screen bg-background'>
      <Navbar />

      <main className='mt-14 h-[calc(100vh-56px)] overflow-hidden'>
        <WechatStudio />
      </main>
    </div>
  )
}
