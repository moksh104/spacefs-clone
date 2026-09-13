/**
 * cn — utility to merge class names (similar to clsx/classnames).
 * Keeps the bundle lightweight without extra dependencies.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * lerp — linear interpolation between two values.
 */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * clamp — clamps a value between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * formatBytes — converts bytes to human-readable file size string.
 */
export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "KB", "MB", "GB", "TB", "PB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

/**
 * sleep — returns a promise that resolves after `ms` milliseconds.
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Design token values for use in JS contexts.
 */
export const tokens = {
  colors: {
    bgDark: "#080c14",
    bgDarkSecondary: "#0d1220",
    bgDarkCard: "#111827",
    accent: "#4a7cff",
    accentHover: "#3a6cf0",
    accentSecondary: "#a78bfa",
    textLight: "#f1f5f9",
    textMuted: "#94a3b8",
  },
  breakpoints: {
    xs:   320,
    sm:   375,
    md:   430,
    lg:   768,
    xl:  1024,
    "2xl": 1280,
    "3xl": 1440,
    "4xl": 1600,
    "5xl": 1920,
  },
  durations: {
    fast:   150,
    normal: 300,
    slow:   600,
    slower: 900,
  },
} as const;
