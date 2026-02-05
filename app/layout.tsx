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
      <head>
        <link href='https://fonts.googleapis.com' rel='preconnect' />
        <link href='https://fonts.gstatic.com' crossOrigin='anonymous' rel='preconnect' />
        <link href='https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono&display=swap' rel='stylesheet' />
        <link href='https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap' rel='stylesheet' />
      </head>
      <body className='font-sans antialiased bg-[#f8fafc] text-slate-800 dark:bg-[#0f172a] dark:text-slate-200'>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
