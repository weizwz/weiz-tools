import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default function AboutPage() {
  return (
    <div className='min-h-screen bg-[#f5f7fa]'>
      <Navbar />

      <main className='pt-32 pb-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-4xl mx-auto'>
          {/* Header */}
          <div className='mb-16 text-center'>
            <h1 className='text-6xl md:text-7xl font-black text-main mb-6'>关于我们</h1>
            <p className='text-2xl font-semibold text-gray-600 mt-8'>打造最简洁高效的在线工具集</p>
          </div>

          {/* Mission */}
          <Card className='bg-white rounded-3xl border border-slate-200 shadow-md shadow-slate-200 hover:shadow-xl transition-all duration-300 mb-8'>
            <CardHeader className='p-6 md:p-8'>
              <CardTitle className='text-3xl font-black text-gray-900 mb-4'>🎯 我们的使命</CardTitle>
              <CardDescription className='text-lg font-medium text-gray-700'>
                为开发者和创作者提供简洁、快速、无广告的在线工具, 让日常工作更加高效便捷。所有工具完全免费,无需注册, 即开即用。
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Features */}
          <div className='grid md:grid-cols-2 gap-6 mb-12'>
            <Card className='bg-white rounded-3xl border border-slate-200 shadow-md shadow-slate-200 hover:shadow-xl transition-all duration-300'>
              <CardHeader className='p-6 md:p-8'>
                <CardTitle className='text-2xl font-bold text-gray-900 mb-2'>⚡ 极速体验</CardTitle>
                <CardDescription className='text-base font-medium text-gray-600'>
                  所有工具均在浏览器本地运行,无需上传数据,保护隐私的同时提供极速体验
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className='bg-white rounded-3xl border border-slate-200 shadow-md shadow-slate-200 hover:shadow-xl transition-all duration-300'>
              <CardHeader className='p-6 md:p-8'>
                <CardTitle className='text-2xl font-bold text-gray-900 mb-2'>🎨 现代设计</CardTitle>
                <CardDescription className='text-base font-medium text-gray-600'>采用简约清爽的设计风格,蓝白灰配色,流畅的交互体验</CardDescription>
              </CardHeader>
            </Card>

            <Card className='bg-white rounded-3xl border border-slate-200 shadow-md shadow-slate-200 hover:shadow-xl transition-all duration-300'>
              <CardHeader className='p-6 md:p-8'>
                <CardTitle className='text-2xl font-bold text-gray-900 mb-2'>🔒 隐私优先</CardTitle>
                <CardDescription className='text-base font-medium text-gray-600'>不收集任何用户数据,所有处理均在本地完成,保护你的隐私安全</CardDescription>
              </CardHeader>
            </Card>

            <Card className='bg-white rounded-3xl border border-slate-200 shadow-md shadow-slate-200 hover:shadow-xl transition-all duration-300'>
              <CardHeader className='p-6 md:p-8'>
                <CardTitle className='text-2xl font-bold text-gray-900 mb-2'>📱 响应式设计</CardTitle>
                <CardDescription className='text-base font-medium text-gray-600'>完美适配桌面、平板和手机,随时随地使用你需要的工具</CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Tech Stack */}
          <div className='mb-12'>
            <h2 className='text-4xl font-black text-gray-900 mb-6'>🛠️ 技术栈</h2>
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
              <CardTitle className='text-3xl font-black text-gray-900 mb-4'>📬 联系我们</CardTitle>
              <CardDescription className='text-lg font-medium text-gray-700 leading-relaxed'>
                有任何建议或反馈?欢迎通过以下方式联系我们:
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
