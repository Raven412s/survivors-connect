import Navbar from '@/components/layout/navbar'
import type React from 'react'

const LayoutWithNavbarAndFooter = ({children}:{children: React.ReactNode}) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <footer></footer>
    </>
  )
}

export default LayoutWithNavbarAndFooter
