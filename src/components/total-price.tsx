'use client'

import { useEffect, useState } from 'react'

type Props = {
    price: number
    storageKey?: string
}

export function TotalPrice({ price, storageKey = 'tyre' }: Props) {
    const [quantity, setQuantity] = useState<number>(4)

    // Зчитує кількість із localStorage
    useEffect(() => {
        const load = () => {
            const stored = localStorage.getItem(storageKey)
            if (stored) {
                try {
                    const data = JSON.parse(stored)
                    if (typeof data.quantity === 'number') {
                        setQuantity(data.quantity)
                    }
                } catch { }
            }
        }

        load()

        // ✅ Слухаємо подію з QuantitySelector
        const handler = (e: Event) => {
            const custom = e as CustomEvent<{ newQty: number; storageKey: string }>
            if (custom.detail.storageKey === storageKey) setQuantity(custom.detail.newQty)
        }

        window.addEventListener('quantityChange', handler)
        return () => window.removeEventListener('quantityChange', handler)
    }, [storageKey])

    const total = price * quantity

    return (
        <div className="text-center text-h4 text-light border-b border-theme-light">
            {total.toLocaleString('uk-UA')} за комплект ({quantity})
        </div>
    )
}
