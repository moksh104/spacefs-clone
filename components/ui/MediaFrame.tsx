import React from "react";

interface MediaFrameProps {
  children?: React.ReactNode;
  className?: string;
  /** Aspect ratio (CSS aspect-ratio value) */
  aspectRatio?: string;
  /** Alt text for accessibility */
  label?: string;
  /** Decorative gradient overlay */
  overlay?: boolean;
  /** Glow effect color (CSS color) */
  glow?: string;
}

/**
 * MediaFrame — styled container for images, videos, and browser mockups.
 * Adds a dark border, rounded corners, and optional glow/overlay effects.
 */
export function MediaFrame({
  children,
  className = "",
  aspectRatio = "16/9",
  label,
  overlay = false,
  glow,
}: MediaFrameProps) {
  return (
    <div
      className={`media-frame ${className}`}
      role={label ? "img" : undefined}
      aria-label={label}
      style={{
        aspectRatio,
        boxShadow: glow
          ? `0 0 80px ${glow}, 0 20px 60px rgba(0, 0, 0, 0.6)`
          : "0 20px 60px rgba(0, 0, 0, 0.6)",
      }}
    >
      {children}

      {/* Optional gradient overlay */}
      {overlay && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, transparent 60%, rgba(8, 12, 20, 0.8) 100%)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
      )}
    </div>
  );
}

/* ─── Browser Mockup ──────────────────────────────── */

interface BrowserMockupProps {
  children?: React.ReactNode;
  url?: string;
  className?: string;
}

/**
 * BrowserMockup — renders a simplified browser chrome wrapping content.
 * Useful for showing UI screenshots without using real proprietary screenshots.
 */
export function BrowserMockup({
  children,
  url = "voidfs.dev/drive",
  className = "",
}: BrowserMockupProps) {
  return (
    <div
      className={`media-frame overflow-hidden ${className}`}
      role="img"
      aria-label="Browser showing VoidFS drive interface"
    >
      {/* Chrome bar */}
      <div
        style={{
          background: "#1a1f2e",
          padding: "0.625rem 0.875rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Traffic lights */}
        <div style={{ display: "flex", gap: "0.375rem" }}>
          {["#ff5f57", "#ffbd2e", "#28c840"].map((c, i) => (
            <div
              key={i}
              aria-hidden="true"
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: c,
                opacity: 0.85,
              }}
            />
          ))}
        </div>
        {/* URL bar */}
        <div
          style={{
            flex: 1,
            background: "rgba(255,255,255,0.05)",
            borderRadius: "0.375rem",
            padding: "0.25rem 0.75rem",
            fontSize: "0.75rem",
            color: "rgba(255,255,255,0.4)",
            textAlign: "center",
            fontFamily: "var(--font-mono)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {url}
        </div>
      </div>

      {/* Content area */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        {children}
      </div>
    </div>
  );
}
