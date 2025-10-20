"use client";

import Link from "next/link";
import type { ReactNode } from "react";

type LinkWithGAProps = {
  href: string;
  children: ReactNode;
  eventLabel: string;
  eventCategory?: string;
  eventName?: string;
  eventParams?: Record<string, unknown>;
  className?: string;
  ariaLabel?: string;
  title?: string;
  target?: string;
  rel?: string;
};

export function LinkWithGA({
  href,
  children,
  className,
  ariaLabel,
  title,
  target,
  rel,
}: LinkWithGAProps) {
  const isExternal = href.startsWith("http") || href.startsWith("//");


  if (isExternal) {
    return (
      <a
        href={href}
        className={className}
        aria-label={ariaLabel}
        target={target ?? "_blank"}
        rel={rel ?? "noopener noreferrer"}
        {...(title ? { title } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={className}
      aria-label={ariaLabel}
      {...(title ? { title } : {})}
      {...(target ? { target } : {})}
      {...(rel ? { rel } : {})}
    >
      {children}
    </Link>
  );
}
