// popular-sizes.tsx
"use client"
import Link from "next/link"

const popularSizes = [
    { width: 185, profile: 65, diameter: 15 },
    { width: 195, profile: 60, diameter: 15 },
    { width: 195, profile: 65, diameter: 15 },
    
    { width: 205, profile: 55, diameter: 16 },
    { width: 205, profile: 60, diameter: 16 },
    { width: 215, profile: 60, diameter: 16 },

    { width: 215, profile: 55, diameter: 17 },
    { width: 225, profile: 45, diameter: 17 },

    { width: 235, profile: 45, diameter: 18 },
]

export function PopularSizes() {
    return (
        <section className="section flex flex-col items-center rounded-md bg-theme-light dark:bg-darkmode-theme-dark text-theme-dark dark:text-theme-light">
            <h2>Популярні розміри:</h2>
            <div className="flex flex-wrap justify-center gap-4">
                {popularSizes.map((s) => {
                    const label = `${s.width}/${s.profile} R${s.diameter}`
                    const href = `/tyres?width=${s.width}&profile=${s.profile}&diameter=${s.diameter}`
                    return (
                        <Link
                            key={label}
                            href={href}
                            className="px-4 py-2 border-2 border-border dark:border-darkmode-border rounded-md hover:border-accent hover:no-underline group"
                        >
                            <span className="text-light group-hover:text-accent transition-colors">
                                {label}
                            </span>
                        </Link>
                    )
                })}
            </div>
        </section>
    )
}
