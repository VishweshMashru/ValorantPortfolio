'use client'
import dynamic from 'next/dynamic'
import Portfolio from '@/components/Portfolio'

const CustomCursor = dynamic(() => import('@/components/ui/CustomCursor'), { ssr: false })

export default function Home() {
  return (
    <>
      <CustomCursor />
      <div className="scanline" />
      <Portfolio />
    </>
  )
}
