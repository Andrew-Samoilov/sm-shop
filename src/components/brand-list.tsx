'use client';

import Link from 'next/link';
import { sendGAEvent, normalizeUrl } from '@/lib';

import type { Brand } from '@/types';

export function BrandList({ brands }: { brands: Brand[] }) {
    return (
        <div className="flex flex-wrap justify-between gap-6">
            {brands.map((brand) => (
                <Link
                    key={brand.id}
                    href={`/brands/${normalizeUrl(brand.name)}`}
                    className="p-6 border-2 rounded-md border-border dark:border-darkmode-border hover:border-accent hover:no-underline
                     flex flex-col items-center justify-center gap-6"
                    onClick={() =>
                        sendGAEvent({
                            action: 'click_brand',
                            category: 'Brand',
                            label: brand.name,
                        })
                    }
                >
                    {brand.logo && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={brand.logo}
                            alt={brand.name}
                            height="auto"
                            className="min-w-[400px] max-w-[400px]"
                            style={{ viewTransitionName: `logo-${brand.name}` }}
                        />
                    )}
                    <p style={{ viewTransitionName: `title-${brand.name}` }}>{brand.name}</p>
                </Link>
            ))}
        </div>
    );
}
