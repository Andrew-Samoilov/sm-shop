"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { sendGAEvent } from "@/lib";
import type { ReactNode } from "react";

type SmartLinkWithGAProps = {
  href: string;
  children: ReactNode;
  eventLabel: string;
  eventCategory?: string;
  eventName?: string;
  eventParams?: Record<string, unknown>;
  className?: string;
  ariaLabel?: string;
  target?: string;
  rel?: string;
};

export function LinkWithGA({
  href,
  children,
  eventLabel,
  eventCategory,
  eventName,
  eventParams,
  className,
  ariaLabel,
  target,
  rel,
}: SmartLinkWithGAProps) {
  const [isClient, setIsClient] = useState(false);
  const [isExternal, setIsExternal] = useState(false);

  useEffect(() => {
    setIsClient(true);

    try {
      const url = new URL(href, window.location.origin);
      setIsExternal(url.origin !== window.location.origin);
    } catch {
      setIsExternal(false);
    }
  }, [href]);

  const handleClick = () => {
    sendGAEvent({
      action: eventName ?? "click",
      category: eventCategory ?? (isExternal ? "external_link" : "navigation"),
      label: eventLabel,
      params: eventParams,
    });
  };

  if (!isClient) {
    return (
      <Link href={href} className={className} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  if (isExternal) {
    return (
      <a
        href={href}
        onClick={handleClick}
        className={className}
        aria-label={ariaLabel}
        target={target ?? "_blank"}
        rel={rel ?? "noopener noreferrer"}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  );
}
