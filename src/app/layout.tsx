import './globals.css'

import type { Metadata } from 'next'

import { Epilogue } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

import { cn } from '~/lib/utils'
import { Footer } from '~/components/layouts/footer'
import { Header } from '~/components/layouts/header'
import { ThemeProvider } from '~/components/theme-provider'

const epilogue = Epilogue({ subsets: ['latin'] })

const metainfo = {
  name: 'Oliver Cederborg',
  description: 'Full-stack developer and designer from Copenhagen, Denmark.',
  url: 'https://olivercederborg.com',
  image: '/meta/meta.png',
  twitter: '@olivercederborg',
}

export const metadata: Metadata = {
  metadataBase: new URL(metainfo.url),
  title: metainfo.name,
  description: metainfo.description,
  authors: {
    name: metainfo.name,
    url: metainfo.url,
  },
  creator: metainfo.name,
  openGraph: {
    type: 'website',
    url: metainfo.url,
    title: metainfo.name,
    description: metainfo.description,
    images: metainfo.image,
  },
  twitter: {
    card: 'summary_large_image',
    title: metainfo.name,
    description: metainfo.description,
    creator: metainfo.twitter,
    images: metainfo.image,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'bg-neutral-100 text-neutral-700 dark:bg-neutral-950 dark:text-neutral-300',
          epilogue.className,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="container flex min-h-screen max-w-2xl flex-col">
            <Header />
            <main className="flex flex-1 flex-col pb-20 pt-40 md:pt-48">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
        <div className="pointer-events-none fixed inset-0 z-[99] h-full w-full overflow-hidden bg-[url(/assets/noise.png)] opacity-30 dark:opacity-[0.17]" />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
