'use client'

import { useEffect, useState } from 'react'

type TotalPriceProps = {
    price: number
    storageKey?: string
}

export function TotalPrice({ price, storageKey = 'page-quantity' }: TotalPriceProps) {
    const [quantity, setQuantity] = useState(1)

    // читаємо при кожній зміні localStorage
    useEffect(() => {
        const update = () => {
            const num = Number(localStorage.getItem(storageKey)) || 1
            setQuantity(num)
        }

        update() // одразу при mount
        window.addEventListener('storage', update)
        const interval = setInterval(update, 300) // 🔥 простий автопулінг (оновлення раз на 0.3 сек)

        return () => {
            window.removeEventListener('storage', update)
            clearInterval(interval)
        }
    }, [storageKey])

    if (quantity <= 1) return null

    return (
        <div className="text-center text-h4 text-light border-b border-theme-light">
            {(price * quantity).toLocaleString('uk-UA')} грн за комплект ({quantity})
        </div>
    )
}
