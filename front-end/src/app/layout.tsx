import ClientOnly from '@/components/ClientOnly'
import LoadingOnClick from '@/components/loadings/LoadingOnClick'
import ToasterProvider from '@/components/providers/ToasterProvider'
import { ConfettiProvider } from '@/components/providers/confetti-provider'
import AppProvider from '@/hooks'
import { Metadata } from 'next'
import { IBM_Plex_Serif, Inter } from 'next/font/google'
import { ReactNode } from 'react'
import '../styles/globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-ibm-plex-serif',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Home | Choa 2024',
    absolute: 'Choa 2024',
  },
  description: 'Horizon is a modern banking platform for everyone.',
  icons: {
    icon: '/images/logo.png',
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${ibmPlexSerif.variable} tracking-normal antialiased`}
      >
        <ClientOnly>
          <ToasterProvider />
          <ConfettiProvider />
        </ClientOnly>
        <LoadingOnClick />
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}
