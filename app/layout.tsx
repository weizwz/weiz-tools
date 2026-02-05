import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

export const metadata: Metadata = {
  title: 'weiz-tools | Ultimate Developer Toolbox',
  description: 'A curated collection of productivity tools for developers.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head></head>
      <body className='font-sans antialiased bg-gray-50 text-slate-800 dark:bg-gray-900 dark:text-slate-200'>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
