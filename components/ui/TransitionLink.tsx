"use client";

import { useTransitionStore } from "@/store/useTransitionStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

interface TransitionLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export default function TransitionLink({
  href,
  className,
  children,
}: TransitionLinkProps) {
  const router = useRouter();
  const startTransition = useTransitionStore((state) => state.startTransition);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    startTransition();

    // Wait for the animation to complete before navigation
    // Animation duration (1s) + second layer delay (0.1s) + small buffer (0.2s)
    setTimeout(() => {
      router.push(href);
    }, 800); // Adjusted to 800ms to start navigation slightly before animation ends
  };

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
