import './globals.css'
import { Poppins } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Providers from '@/components/Providers'
import Toast from '@/components/Toast'

const poppins = Poppins({
  weight: ['300', '400', '600', '700'],
  subsets: ['latin'],
})

export const metadata = {
  title: 'DAM',
  description: 'DAM',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={poppins.className}>
        <Providers>
          <Toast />
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
