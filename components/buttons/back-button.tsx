"use client"
import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation';

export default function BackButton({ text }: { text: string }) {
    const router = useRouter();
    return (
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
                ← {text}
            </Button>
)
}
