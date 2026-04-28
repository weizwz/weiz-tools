import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { I18nProvider } from '@/lib/i18n'

export const metadata: Metadata = {
  title: '知了工具箱 | 在线实用小工具',
  description: '我是一只小知了 | 为大家精心准备的实用小工具集合'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='zh-CN' suppressHydrationWarning>
      <head></head>
      <body className='bg-white text-slate-800 dark:bg-gray-900 dark:text-slate-200'>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
          <I18nProvider>{children}</I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
