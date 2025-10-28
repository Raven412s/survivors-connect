import { Footer } from '@/components/layout/footer'
import MobileAccesibilityPanel from '@/components/layout/mobile-accesibility-panel'
import Navbar from '@/components/layout/navbar'
import { NextIntlClientProvider } from 'next-intl'
import type React from 'react'


const LayoutWithNavbarAndFooter = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main>
        <NextIntlClientProvider>
          {children}
        </NextIntlClientProvider>
      </main>
      <MobileAccesibilityPanel className='md:hidden' />
      <Footer />
    </>
  )
}

export default LayoutWithNavbarAndFooter
