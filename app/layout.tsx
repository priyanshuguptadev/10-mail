import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'] })

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://10mail.pryns.me'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: '10-Mail — Free 10-Minute Temporary Disposable Email',
    template: '%s | 10-Mail',
  },
  description:
    'Get an instant, disposable 10-minute temporary email address. Block spam, bypass verification gates, and keep your real inbox clean with zero registration.',
  keywords: [
    '10 minute mail',
    'temporary email',
    'disposable email',
    'burner email',
    'temp mail',
    'fake email',
    'throwaway email',
    'anonymous email',
    'disposable inbox',
    'temp inbox',
    'spam-free email',
  ],
  authors: [{ name: '10-Mail' }],
  creator: '10-Mail',
  publisher: '10-Mail',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: './',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: '10-Mail — Free 10-Minute Temporary Disposable Email',
    description:
      'Keep spam out of your real inbox. Instant, self-destructing temporary email with zero registration required.',
    url: baseUrl,
    siteName: '10-Mail',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '10-Mail — Free 10-Minute Temporary Disposable Email',
    description:
      'Keep spam out of your real inbox. Instant, self-destructing temporary email with zero registration required.',
  },
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${inter.className} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  )
}
