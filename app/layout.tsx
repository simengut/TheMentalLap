import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'The Mental Lap - For athletes. By elite college athletes.',
  description: 'Mental performance tools, track & field form analysis, recruiting guidance, and live workshops—built by and for competitors.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-green-50/20 via-stone-50 to-emerald-50/15`}>
        <Providers>
          <div className="flex min-h-screen flex-col relative">
            <div className="fixed inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
            <Header />
            <main className="flex-1 relative z-10">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}