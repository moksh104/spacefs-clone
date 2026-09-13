
"use client";

import React, { useEffect, useRef, useState } from "react";

interface AnimatedRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Animation variant */
  variant?: "fade" | "fade-up" | "fade-down" | "slide-left" | "slide-right" | "scale";
  /** Delay in ms */
  delay?: number;
  /** Intersection observer threshold */
  threshold?: number;
  /** Root margin for observer */
  rootMargin?: string;
  /** Whether to animate only once */
  once?: boolean;
  as?: React.ElementType;
}

const variantStyles: Record<string, React.CSSProperties> = {
  "fade":        { opacity: 0 },
  "fade-up":     { opacity: 0, transform: "translateY(32px)" },
  "fade-down":   { opacity: 0, transform: "translateY(-24px)" },
  "slide-left":  { opacity: 0, transform: "translateX(-40px)" },
  "slide-right": { opacity: 0, transform: "translateX(40px)" },
  "scale":       { opacity: 0, transform: "scale(0.92)" },
};

const activeStyles: React.CSSProperties = {
  opacity: 1,
  transform: "translateY(0) translateX(0) scale(1)",
};

/** Check prefers-reduced-motion on the client side */
function getPrefersReduced(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * AnimatedReveal — wraps children and animates them into view
 * when they enter the viewport. Respects prefers-reduced-motion.
 */
export function AnimatedReveal({
  children,
  className = "",
  variant = "fade-up",
  delay = 0,
  threshold = 0.15,
  rootMargin = "0px 0px -60px 0px",
  once = true,
  as: Tag = "div",
}: AnimatedRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Initialise to `true` immediately when the user prefers reduced motion,
  // so we never need to call setState inside a useEffect body.
  const [inView, setInView] = useState<boolean>(() => getPrefersReduced());

  const prefersReduced = getPrefersReduced();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Already visible (reduced motion) — nothing to observe.
    if (prefersReduced) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once, prefersReduced]);

  const style: React.CSSProperties = {
    transition: prefersReduced
      ? "none"
      : `opacity 600ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    ...(inView ? activeStyles : variantStyles[variant] ?? variantStyles["fade-up"]),
  };

  return (
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    <Tag ref={ref as any} className={className} style={style}>
      {children}
    </Tag>
  );
}
