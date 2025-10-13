import React from 'react'
import ConnectPlus from '../buttons/connect-plus'
import { cn } from '@/lib/utils'
import ToggleActions from '../action-blocks/navbar/ToggleActions'

export default function MobileAccesibilityPanel({className}:{className?: string}) {
  return (
    <div className={cn(
      'fixed bottom-0 inset-x-2 h-16 z-[60]',
      "flex items-center justify-between",
      "px-4",
      "bg-accent/20 backdrop-blur-sm border-3 border-b-0 rounded-t-lg",
      className
      )}>
      <ConnectPlus/>
      <ToggleActions/>
    </div>
  )
}
