
import './globals.css'
import type { Metadata } from 'next'
import { Urbanist } from 'next/font/google'

import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import ModalProvider from '@/providers/modal-provider'
import ToastProvider from '@/providers/toast-provider'
import getCategories from '@/actions/get-categories'

const font = Urbanist({ subsets: ['latin-ext'] })

export const metadata: Metadata = {
  title: 'Tienda Virtual Más Tinta y Papel',
  description: 'encuentra lo mejor y lo mas kawai en nuestra papeleria',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const categories = await getCategories();

  return (
      <html lang="es" suppressHydrationWarning>
        <body className={font.className}>
          <ModalProvider />
          <ToastProvider />
          <Navbar categories={categories} />
          {children}
          <Footer />
        </body>
      </html>
  )
}
