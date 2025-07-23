'use client'

import { useEffect, useState } from 'react'

type QuantitySelectorProps = {
    storageKey?: string // за замовчуванням 'tyre'
}

export function QuantitySelector({ storageKey = 'tyre' }: QuantitySelectorProps) {
    const [quantity, setQuantity] = useState<number>(1)

    // Завантаження початкового значення з localStorage
    useEffect(() => {
        if (typeof window === 'undefined') return
        const stored = localStorage.getItem(storageKey)
        if (stored) {
            try {
                const data = JSON.parse(stored)
                if (typeof data.quantity === 'number') {
                    setQuantity(data.quantity)
                }
            } catch (err) {
                console.error('Помилка читання з localStorage:', err)
            }
        }
    }, [storageKey])

    // Оновлення localStorage при зміні quantity
    const updateQuantity = (newQty: number) => {
        setQuantity(newQty)
        const stored = localStorage.getItem(storageKey)
        if (stored) {
            try {
                const data = JSON.parse(stored)
                data.quantity = newQty
                localStorage.setItem(storageKey, JSON.stringify(data))
            } catch (err) {
                console.error('Помилка оновлення localStorage:', err)
            }
        }
    }

    const increase = () => updateQuantity(quantity + 1)
    const decrease = () => {
        if (quantity > 1) updateQuantity(quantity - 1)
    }

    return (
        <fieldset
            className="inline-flex items-center border border-theme-light dark:border-theme-dark rounded px-2"
            role="group"
            aria-label="Кількість товару">
            
            <legend className="sr-only">Кількість товару</legend>

            <button
                type="button"
                onClick={decrease}
                className="text-xl px-2 py-1"
                aria-label="Зменшити кількість"
            >
                −
            </button>
            <span className="mx-2 min-w-[2ch] text-center">{quantity}</span>
            <button
                type="button"
                onClick={increase}
                className="text-xl px-2 py-1"
                aria-label="Збільшити кількість"
            >
                +
            </button>
        </fieldset>
    )
}
