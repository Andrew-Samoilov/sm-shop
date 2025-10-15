'use client'

import { useEffect, useState } from 'react'

type QuantitySelectorProps = {
    storageKey?: string
}

export function QuantitySelector({ storageKey = 'tyre' }: QuantitySelectorProps) {
    const [quantity, setQuantity] = useState<number>(4)

    // Зчитування з localStorage
    useEffect(() => {
        if (typeof window === 'undefined') return

        const stored = localStorage.getItem(storageKey)
        if (!stored) return

        try {

            
            // Якщо це просто число
            if (/^\d+$/.test(stored)) {
                const num = Number(stored)
                if (!isNaN(num)) setQuantity(Math.min(Math.max(num, 1), 20))
            } else {
                // Якщо це JSON
                const data = JSON.parse(stored)
                if (typeof data.quantity === 'number') {
                    setQuantity(Math.min(Math.max(data.quantity, 1), 20))
                }
            }
        } catch (err) {
            console.error('Помилка читання з localStorage:', err)
        }
    }, [storageKey])

    // Оновлення localStorage
    const updateQuantity = (newQty: number) => {
        const clamped = Math.max(1, Math.min(20, newQty))
        setQuantity(clamped)

        try {
            const stored = localStorage.getItem(storageKey)
            if (stored) {
                if (/^\d+$/.test(stored)) {
                    // Якщо там було просто число
                    localStorage.setItem(storageKey, String(clamped))
                } else {
                    // Якщо це JSON — оновлюємо поле quantity
                    const data = JSON.parse(stored)
                    data.quantity = clamped
                    localStorage.setItem(storageKey, JSON.stringify(data))
                }
            } else {
                // Якщо нічого не було
                localStorage.setItem(storageKey, String(clamped))
            }
        } catch (err) {
            console.error('Помилка запису в localStorage:', err)
        }

        window.dispatchEvent(
            new CustomEvent('quantityChange', {
                detail: { newQty: clamped, storageKey },
            })
        )
    }

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
