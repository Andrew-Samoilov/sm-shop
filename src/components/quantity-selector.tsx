'use client'

import { useEffect, useState } from 'react'

type QuantitySelectorProps = {
    storageKey?: string
}

export function QuantitySelector({ storageKey = 'tyre' }: QuantitySelectorProps) {
    const [quantity, setQuantity] = useState<number>(4)

    // Зчитуємо з localStorage при завантаженні
    useEffect(() => {
        if (typeof window === 'undefined') return

        const stored = localStorage.getItem(storageKey)
        if (stored) {
            const num = Number(stored)
            if (!isNaN(num)) setQuantity(num)
        }
    }, [storageKey])

    // Записуємо просто число
    const updateQuantity = (newQty: number) => {
        setQuantity(newQty)
        localStorage.setItem(storageKey, String(newQty))
    }

    return (
        <fieldset className="inline-flex items-center border border-border dark:border-darkmode-border rounded px-2">
            <button
                type="button"
                className="px-2 text-lg select-none
                disabled:opacity-30 disabled:cursor-not-allowed"
                disabled={quantity <= 1}
                onClick={() => updateQuantity(quantity - 1)}
            >
                −
            </button>

            <span className="mx-2 min-w-[2ch] text-center">{quantity}</span>

            <button
                type="button"
                className="px-2 text-lg select-none"
                onClick={() => updateQuantity(quantity + 1)}
            >
                +
            </button>
        </fieldset>
    )
}
