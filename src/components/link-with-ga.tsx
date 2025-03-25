'use client'

import Link from 'next/link'
import { sendGAEvent } from '@/lib/sendGAEvent'
import type { LinkProps } from 'next/link'
import type { ReactNode } from 'react'

type LinkWithGAProps = LinkProps & {
    children: ReactNode
    eventLabel: string
    eventCategory?: string
    className?: string
    ariaLabel?: string
}

export function LinkWithGA({
    children,
    href,
    eventLabel,
    eventCategory = 'navigation',
    className,
    ariaLabel,
    ...rest
}: LinkWithGAProps) {

    const handleClick = () => {
        sendGAEvent({
            action: 'click',
            category: eventCategory,
            label: eventLabel,
            // value: 1 // якщо потрібно
        })
    }

    return (
        <Link
            href={href}
            onClick={handleClick}
            className={className}
            aria-label={ariaLabel}
            {...rest}
        >
            {children}
        </Link>
    )
}
