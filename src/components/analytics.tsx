'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export function Analytics() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const GAKey = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!;

    useEffect(() => {
        const url = pathname + searchParams.toString()

        window.gtag?.('config', GAKey, {
            page_path: url,
        })
    }, [GAKey, pathname, searchParams])

    return null
}
