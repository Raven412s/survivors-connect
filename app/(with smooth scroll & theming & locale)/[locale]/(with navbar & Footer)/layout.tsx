import MobileAccesibilityPanel from '@/components/layout/mobile-accesibility-panel'
import Navbar from '@/components/layout/navbar'
import type React from 'react'

const LayoutWithNavbarAndFooter = ({children}:{children: React.ReactNode}) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <MobileAccesibilityPanel className='md:hidden'/>
      <footer></footer>
    </>
  )
}

export default LayoutWithNavbarAndFooter
