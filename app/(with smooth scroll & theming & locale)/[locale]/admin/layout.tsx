import AdminLayout from '@/components/layout/admin-layout'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { verifyToken } from '@/lib/auth'
import { NextIntlClientProvider } from 'next-intl'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import type React from 'react'


const ADMINLAYOUT = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/admin/login');
  }

  try {
    const decoded = verifyToken(token);

    if (decoded.role !== 'admin') {
      redirect('/admin/unauthorized');
    }

    return (
      <main className='relative h-screen'>
        <NextIntlClientProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <AdminLayout user={decoded}>
              {children}
            </AdminLayout>
          </ThemeProvider>
        </NextIntlClientProvider>
      </main>
    )
  } catch (error) {
    redirect('/admin/login');
    console.log(error)
  }
}

export default ADMINLAYOUT


