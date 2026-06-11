import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { I18nProvider } from '@/lib/i18n'

export const metadata: Metadata = {
  metadataBase: new URL('https://tools.weizwz.com'),
  title: '知了工具箱 | 在线实用小工具',
  description: '我是一只小知了 | 为大家精心准备的实用小工具集合',
  keywords: ['工具箱', '在线工具', '实用工具', '开发者工具', '效率工具', '知了工具箱'],
  authors: [{ name: '知了' }],
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png'
  },
  manifest: '/manifest.json',
  openGraph: {
    title: '知了工具箱 | 在线实用小工具',
    description: '我是一只小知了 | 为大家精心准备的实用小工具集合',
    url: 'https://tools.weizwz.com',
    siteName: '知了工具箱',
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: '知了工具箱 Logo'
      }
    ],
    locale: 'zh_CN',
    type: 'website'
  },
  twitter: {
    card: 'summary',
    title: '知了工具箱 | 在线实用小工具',
    description: '我是一只小知了 | 为大家精心准备的实用小工具集合',
    images: ['/logo.png']
  }
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
