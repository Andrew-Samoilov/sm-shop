'use client'

import { sendGAEvent } from '@/lib/sendGAEvent'
import type { ReactNode } from 'react'

type Props = {
    href: string
    children: ReactNode
    eventLabel: string
    eventCategory?: string
    className?: string
    ariaLabel?: string
    target?: string
    rel?: string
}

export function ExternalLinkWithGA({
    href,
    children,
    eventLabel,
    eventCategory = 'external_link',
    className,
    ariaLabel,
    target = '_blank',
    rel = 'noopener noreferrer',
}: Props) {
    const handleClick = () => {
        sendGAEvent({
            action: 'click',
            category: eventCategory,
            label: eventLabel,
        })
    }

    return (
        <a
            href={href}
            onClick={handleClick}
            className={className}
            aria-label={ariaLabel}
            target={target}
            rel={rel}
        >
            {children}
        </a>
    )
}
