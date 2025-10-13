"use client"
import ConnectPlus from '@/components/buttons/connect-plus';
import { LocaleToggler } from '@/components/togglers/LocaleToggler'
import { ThemeToggler } from '@/components/togglers/ThemeToggler'
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'

export default function ToggleActions() {
    const pathname = usePathname();
    const router = useRouter();

    // Function to switch locales
    const switchLocale = (locale: string) => {
        // Get the current path without the locale prefix
        const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '')
        // Construct the new path with the selected locale
        const newPath = `/${locale}${pathWithoutLocale}`
        router.push(newPath)
        router.refresh()
    }
    return (
        <div className='p-2 rounded-sm flex gap-0.5 md:gap-2 items-center'>
            <ConnectPlus />
            <ThemeToggler 
               variant='rectangle' 
               start='bottom-up'
            />
            <LocaleToggler switchLocale={switchLocale} />
        </div>
    )
}


