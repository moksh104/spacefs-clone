// VoidFS Design Tokens — JS export
// Mirrors the CSS variables defined in globals.css for use in Framer Motion etc.

export const colors = {
  bgDark:           "#080c14",
  bgDarkSecondary:  "#0d1220",
  bgDarkCard:       "#111827",
  bgLight:          "#f9fafb",
  textLight:        "#f1f5f9",
  textMutedLight:   "#94a3b8",
  textMutedDark:    "#64748b",
  accent:           "#4a7cff",
  accentHover:      "#3a6cf0",
  accentGlow:       "rgba(74, 124, 255, 0.25)",
  accentSecondary:  "#a78bfa",
  borderDark:       "rgba(255, 255, 255, 0.08)",
} as const;

export const typography = {
  fontDisplay: "'Inter', system-ui, -apple-system, sans-serif",
  fontMono: "'JetBrains Mono', 'Fira Code', monospace",
  scale: {
    xs:   "0.75rem",
    sm:   "0.875rem",
    base: "1rem",
    lg:   "1.125rem",
    xl:   "1.25rem",
    "2xl":"1.5rem",
    "3xl":"1.875rem",
    "4xl":"2.25rem",
    "5xl":"3rem",
    "6xl":"3.75rem",
    "7xl":"4.5rem",
    "8xl":"6rem",
  },
} as const;

export const spacing = {
  sectionY:    "6rem",
  sectionYLg:  "8rem",
  containerPx: "1.5rem",
  containerMax:"1280px",
  gapSm:       "1rem",
  gapMd:       "2rem",
  gapLg:       "3rem",
  gapXl:       "4rem",
} as const;

export const motion = {
  durations: {
    fast:   0.15,
    normal: 0.3,
    slow:   0.6,
    slower: 0.9,
  },
  easing: {
    outExpo:  [0.16, 1, 0.3, 1] as [number, number, number, number],
    inExpo:   [0.7, 0, 0.84, 0] as [number, number, number, number],
    inOut:    [0.4, 0, 0.2, 1] as [number, number, number, number],
    spring:   [0.34, 1.56, 0.64, 1] as [number, number, number, number],
  },
  /** Pre-built Framer Motion variants */
  variants: {
    fadeUp: {
      hidden:  { opacity: 0, y: 32 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
    },
    fadeIn: {
      hidden:  { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.6 } },
    },
    scaleIn: {
      hidden:  { opacity: 0, scale: 0.92 },
      visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
    },
    stagger: {
      hidden:  {},
      visible: { transition: { staggerChildren: 0.1 } },
    },
  },
} as const;

export const breakpoints = {
  xs:    320,
  sm:    375,
  md:    430,
  lg:    768,
  xl:   1024,
  "2xl":1280,
  "3xl":1440,
  "4xl":1600,
  "5xl":1920,
} as const;
