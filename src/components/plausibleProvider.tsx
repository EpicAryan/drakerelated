'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import Plausible from 'plausible-tracker'

export default function PlausibleProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const { trackPageview } = Plausible()
    trackPageview()
  }, [pathname, searchParams])

  return <>{children}</>
}
