
import './globals.css'
import type { Metadata } from 'next'
import { Urbanist } from 'next/font/google'


import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import ModalProvider from '@/providers/modal-provider'
import ToastProvider from '@/providers/toast-provider'


const font = Urbanist({ subsets: ['latin-ext'] })

export const metadata: Metadata = {
  title: 'Tienda Virtual Más Tinta y Papel',
  description: 'encuentra lo mejor y lo mas kawai en nuestra papeleria',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="es">
        <body className={font.className}>
          <ModalProvider />
          <ToastProvider />
          <Navbar />
          {children}
          <Footer />
        </body>
      </html>
  )
}
