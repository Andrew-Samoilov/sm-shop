'use client'

import { useEffect, useState } from 'react'

type TotalPriceProps = {
    price: number
    storageKey?: string
}

export function TotalPrice({ price, storageKey = 'tyre' }: TotalPriceProps) {
    const [quantity, setQuantity] = useState<number>(1)



    useEffect(() => {

        const loadQuantity = () => {
            const stored = localStorage.getItem(storageKey)
            if (stored) {
                const num = Number(stored)
                if (!isNaN(num)) setQuantity(num)
            }
        }

        loadQuantity()

        // 🔥 слухаємо подію від QuantitySelector
        const handler = (e: Event) => {
            const custom = e as CustomEvent<{ key: string; value: number }>
            if (custom.detail.key === storageKey) setQuantity(custom.detail.value)
        }

        window.addEventListener('quantityChange', handler)
        return () => window.removeEventListener('quantityChange', handler)
    }, [ storageKey])

    if (quantity === 1) return null

    const total = price * quantity

    return (
        <div className="text-center text-h4 text-light border-b border-theme-light">
            {total.toLocaleString('uk-UA')} грн за комплект ({quantity})
        </div>
    )
}
