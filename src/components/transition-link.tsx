"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface TransitionLinkProps {
    href: string;
    children: ReactNode;
    className?: string;
}

export function TransitionLink({ href, children, className }: TransitionLinkProps) {
    const router = useRouter();

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault(); 
        if (document.startViewTransition) {
            document.startViewTransition(() => {
                router.push(href);
            });
        } else {
            router.push(href);
        }
    };

    return (
        <Link href={href} className={className} onClick={handleClick}>
            {children}
        </Link>
    );
}
