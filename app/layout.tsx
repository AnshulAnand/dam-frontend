import './globals.css'
import { Poppins } from 'next/font/google'
import Header from './components/Header'

const poppins = Poppins({
  weight: ['300', '400', '600', '700'],
  preload: false
})

export const metadata = {
  title: 'DAM | Home',
  description: 'DAM',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={`${poppins.className} min-h-screen bg-primaryBackgroundColor`}>
        <Header />
        {children}
      </body>
    </html>
  )
}
