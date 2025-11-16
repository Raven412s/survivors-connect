"use client"
import React, { useState, useEffect } from 'react'
import { Button } from '../ui/button'
import { ArrowUp } from 'lucide-react'

export default function MoveToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <Button variant="secondary" size="icon" 
      className="fixed bottom-4 right-4 z-50"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}  
    >
     <ArrowUp className='size-5'/>
    </Button>
  )
}
