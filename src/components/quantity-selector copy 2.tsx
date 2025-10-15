'use client'

import { useEffect, useState } from 'react'

type QuantitySelectorProps = {
    storageKey: string
    field?: string
    defaultQty?: number
}

export function QuantitySelector({
    storageKey,
    field,
    defaultQty = 4,
}: QuantitySelectorProps) {
    const [quantity, setQuantity] = useState<number | null>(null)
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        if (typeof window === 'undefined') return

        const stored = localStorage.getItem(storageKey)

        const saveToStorage = (value: number) => {
            if (field) {
                const data = JSON.parse(localStorage.getItem(storageKey) || '{}')
                data[field] = value
                localStorage.setItem(storageKey, JSON.stringify(data))
            } else {
                localStorage.setItem(storageKey, String(value))
            }
        }

        let finalQty = defaultQty

        if (stored) {
            try {
                let current: number | undefined
                if (field) {
                    const data = JSON.parse(stored)
                    if (typeof data[field] === 'number') current = data[field]
                } else {
                    const num = Number(stored)
                    if (!isNaN(num)) current = num
                }

                // 🧩 не нижче 1 і не вище defaultQty
                if (typeof current === 'number') {
                    finalQty = Math.max(1, Math.min(current, defaultQty))
                } else {
                    finalQty = defaultQty
                }

                saveToStorage(finalQty)
            } catch {
                finalQty = defaultQty
                saveToStorage(finalQty)
            }
        } else {
            // 🟢 якщо порожньо — створюємо з defaultQty
            finalQty = defaultQty
            saveToStorage(finalQty)
        }

        setQuantity(finalQty)
        setIsReady(true)
    }, [storageKey, field, defaultQty])

    const updateQuantity = (newQty: number) => {
        const clamped = Math.max(1, Math.min(defaultQty, newQty))
        setQuantity(clamped)

        if (field) {
            const data = JSON.parse(localStorage.getItem(storageKey) || '{}')
            data[field] = clamped
            localStorage.setItem(storageKey, JSON.stringify(data))
        } else {
            localStorage.setItem(storageKey, String(clamped))
        }

        window.dispatchEvent(
            new CustomEvent('quantityChange', {
                detail: { newQty: clamped, storageKey, field },
            })
        )
    }

    if (!isReady || quantity === null) return null

    return (
        <fieldset className="inline-flex items-center border border-theme-light dark:border-theme-dark rounded px-2">
            <button
                type="button"
                className="px-2 text-lg select-none"
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
