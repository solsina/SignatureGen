import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { Header } from '@/components/layout/Header'
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SignatureGen - Générateur de signatures email professionnelles',
  description: 'Créez des signatures email professionnelles et modernes en quelques clics. Templates gratuits, export HTML, compatible Gmail, Outlook, Apple Mail. Commencez gratuitement !',
  keywords: 'signature email, générateur signature, template signature, Gmail signature, Outlook signature, signature professionnelle, HTML signature',
  authors: [{ name: 'SignatureGen Team' }],
  creator: 'SignatureGen',
  publisher: 'SignatureGen',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'SignatureGen - Générateur de signatures email professionnelles',
    description: 'Créez des signatures email professionnelles et modernes en quelques clics. Templates gratuits, export HTML, compatible Gmail, Outlook, Apple Mail.',
    url: '/',
    siteName: 'SignatureGen',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SignatureGen - Générateur de signatures email',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SignatureGen - Générateur de signatures email professionnelles',
    description: 'Créez des signatures email professionnelles et modernes en quelques clics.',
    images: ['/og-image.png'],
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
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
  },
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      appearance={{
        elements: {
          formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white',
          card: 'bg-white shadow-lg border border-gray-100',
          headerTitle: 'text-gray-900',
          headerSubtitle: 'text-gray-600',
          socialButtonsBlockButton: 'bg-white border border-gray-300 hover:bg-gray-50',
          formFieldInput: 'border border-gray-300 focus:border-blue-500 focus:ring-blue-500',
          footerActionLink: 'text-blue-600 hover:text-blue-700',
        },
        variables: {
          colorPrimary: '#2563eb',
          colorBackground: '#ffffff',
          colorText: '#1f2937',
          colorTextSecondary: '#6b7280',
        },
      }}
    >
      <html lang="fr">
        <head>
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <meta name="theme-color" content="#2563eb" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body className={inter.className}>
          <GoogleAnalytics />
          <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="flex-1">
              {children}
            </main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
} 