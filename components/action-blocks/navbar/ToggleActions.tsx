"use client"
import ConnectPlus from '@/components/buttons/connect-plus';
import { LocaleToggler } from '@/components/togglers/LocaleToggler'
import { ThemeToggler } from '@/components/togglers/ThemeToggler'
import { cn } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'

export default function ToggleActions({className}:{className?: string}) {
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
        <div className={cn('rounded-sm flex gap-2 items-center', className)}>
            <ConnectPlus className='hidden md:flex' />
            <ThemeToggler 
               variant='rectangle' 
               start='bottom-up'
            />
            <LocaleToggler switchLocale={switchLocale} />
        </div>
    )
}


