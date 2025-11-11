import AdminLayout from '@/components/layout/admin-layout'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { verifyToken } from '@/lib/auth'
import { NextIntlClientProvider } from 'next-intl'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import type React from 'react'


const ADMINLAYOUT = async ({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  const locale = (await params).locale || 'en';

  // Use locale-aware login path to avoid switching between localized and non-localized routes
  if (!token) {
    redirect(`/${locale}/admin/login`);
  }

  try {
    const decoded = verifyToken(token);
    console.log(decoded)
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
    redirect(`/${locale}/admin/login`);
    console.log(error)
  }
}

export default ADMINLAYOUT


