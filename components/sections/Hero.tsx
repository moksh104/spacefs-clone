"use client";

import React from "react";
import HeroFanGallery, {
  type HeroFanCard,
} from "./HeroFanGallery";

/* ─────────────────────────────────────────────────────────────
   VoidFS Hero Section — Phase 2 + 3D Vertical Orbit Gallery
   Recreates the SpaceFS hero composition with original branding:
   • 2-column desktop layout (Left: copy & CTAs; Right: 3D orbital gallery)
   • Responsive single-column on tablet & mobile
   • Original copy: "Limitless space / on your machine"
   • "Backed by Frontier / speedrun" pill badge
   • High-contrast primary "Download" & outlined "Book a demo" CTAs
   • 10 video media cards in continuous 3D vertical elliptical orbit
   • Bottom "Files in VoidFS take up zero bytes on disk" info indicator
   • Respects prefers-reduced-motion
───────────────────────────────────────────────────────────── */

/* ── Hero media cards — 10 video clips matching SpaceFS reference ── */
const VIDEO_BASE = "https://assets.spacefs.com/public/clips";

const heroCards: HeroFanCard[] = [
  {
    id: 1,
    content: (
      <video
        src={`${VIDEO_BASE}/chicago-summer.mp4`}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
    ),
  },
  {
    id: 2,
    content: (
      <video
        src={`${VIDEO_BASE}/carnival-night.mp4`}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
    ),
  },
  {
    id: 3,
    content: (
      <video
        src={`${VIDEO_BASE}/goldengate-sunset.mp4`}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
    ),
  },
  {
    id: 4,
    content: (
      <video
        src={`${VIDEO_BASE}/jason-lockedin.mp4`}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
    ),
  },
  {
    id: 5,
    content: (
      <video
        src={`${VIDEO_BASE}/toronto-islands.mp4`}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
    ),
  },
  {
    id: 6,
    content: (
      <video
        src={`${VIDEO_BASE}/nyc-drone.mp4`}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
    ),
  },
  {
    id: 7,
    content: (
      <video
        src={`${VIDEO_BASE}/field.mp4`}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
    ),
  },
  {
    id: 8,
    content: (
      <video
        src={`${VIDEO_BASE}/soho-summer.mp4`}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
    ),
  },
  {
    id: 9,
    content: (
      <video
        src={`${VIDEO_BASE}/matt-ari.mp4`}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
    ),
  },
  {
    id: 10,
    content: (
      <video
        src={`${VIDEO_BASE}/west-village.mp4`}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
    ),
  },
];

export function Hero() {
  return (
    <section
      id="hero"
      aria-label="VoidFS Hero — Limitless space on your machine"
      style={{
        position: "relative",
        minHeight: "100dvh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
        /* Subtle off-white base with soft cyan/blue ambient glow around perimeter */
        backgroundColor: "#f5f6f8",
        backgroundImage: `
          radial-gradient(110% 55% at 50% -8%, rgba(180, 215, 255, 0.42) 0%, rgba(245, 246, 248, 0) 70%),
          radial-gradient(40% 50% at 100% 25%, rgba(185, 220, 255, 0.28) 0%, rgba(245, 246, 248, 0) 65%),
          radial-gradient(40% 50% at 0% 25%, rgba(185, 220, 255, 0.28) 0%, rgba(245, 246, 248, 0) 65%)
        `,
        fontFamily: "var(--font-inter, 'Inter', system-ui, -apple-system, sans-serif)",
      }}
    >
      {/* ── Left Content Wrapper ── */}
      <div
        style={{
          width: "100%",
          maxWidth: "1440px",
          margin: "0 auto",
          paddingLeft: "clamp(1.25rem, 5vw, 6.5rem)",
          paddingRight: "clamp(1.25rem, 5vw, 6.5rem)",
          paddingTop: "clamp(6.5rem, 12vh, 10.5rem)",
          position: "relative",
          zIndex: 10,
        }}
        className="hero-grid"
      >
        {/* ── LEFT COLUMN: Text, Badge, CTAs ── */}
        <div
          style={{
            maxWidth: "600px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          {/* Backed-by Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.35rem 0.95rem",
              borderRadius: "9999px",
              backgroundColor: "rgba(255, 255, 255, 0.75)",
              border: "1px solid rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              marginBottom: "1.75rem",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.03)",
            }}
          >
            <span
              style={{
                fontSize: "0.8125rem",
                color: "#525f7f",
                fontWeight: 400,
                letterSpacing: "-0.01em",
              }}
            >
              Backed by
            </span>
            <span
              style={{
                fontSize: "0.8125rem",
                fontWeight: 700,
                color: "#1a1f36",
                letterSpacing: "-0.02em",
                fontStyle: "italic",
              }}
            >
              Frontier <span style={{ fontStyle: "normal", fontWeight: 400, color: "#94a3b8" }}>/</span> speedrun
            </span>
          </div>

          {/* Main Headline */}
          <h1
            style={{
              fontSize: "clamp(2.75rem, 5vw, 4.25rem)",
              lineHeight: 1.06,
              letterSpacing: "-0.035em",
              margin: 0,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span style={{ fontWeight: 700, color: "#0a0a0a" }}>
              Limitless space
            </span>
            <span style={{ fontWeight: 400, color: "#64748b", marginTop: "0.1em" }}>
              on your machine
            </span>
          </h1>

          {/* Supporting Subtitle */}
          <p
            style={{
              fontSize: "clamp(1rem, 1.25vw, 1.125rem)",
              lineHeight: 1.58,
              color: "#64748b",
              marginTop: "1.5rem",
              marginBottom: "2.25rem",
              maxWidth: "480px",
              fontWeight: 400,
            }}
          >
            The next-generation filesystem. Open and edit terabytes of files locally,
            while using zero disk space. Instant sync across devices.
          </p>

          {/* CTA Buttons */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.875rem",
              flexWrap: "wrap",
            }}
          >
            {/* Primary Download CTA */}
            <a
              href="#download"
              id="hero-cta-download"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                height: "48px",
                paddingLeft: "28px",
                paddingRight: "28px",
                borderRadius: "9999px",
                backgroundColor: "#0a0a0a",
                color: "#ffffff",
                fontSize: "0.9375rem",
                fontWeight: 500,
                textDecoration: "none",
                letterSpacing: "-0.01em",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.12)",
                transition: "opacity 160ms ease, transform 160ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.85";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Download
            </a>

            {/* Secondary Book Demo CTA */}
            <a
              href="#book-demo"
              id="hero-cta-demo"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                height: "48px",
                paddingLeft: "28px",
                paddingRight: "28px",
                borderRadius: "9999px",
                backgroundColor: "rgba(255, 255, 255, 0.72)",
                border: "1px solid rgba(0, 0, 0, 0.12)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                color: "#0a0a0a",
                fontSize: "0.9375rem",
                fontWeight: 500,
                textDecoration: "none",
                letterSpacing: "-0.01em",
                transition: "background-color 160ms ease, border-color 160ms ease, transform 160ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
                e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.22)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.72)";
                e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.12)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Book a demo
            </a>
          </div>
        </div>
      </div>

      {/* ── RIGHT COLUMN: 3D Vertical Orbital Gallery (Desktop Only) ── */}
      <div
        className="
          absolute
          inset-y-0
          right-0
          hidden
          w-1/2
          lg:block
        "
      >
        <HeroFanGallery
          cards={heroCards}
          radius={302}
          orbitDuration={26}
          tilt={8}
        />
      </div>

      {/* ── BOTTOM INFO BAR: "Files in VoidFS take up zero bytes on disk" ── */}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: "1.5rem",
          paddingTop: "2rem",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            color: "#0a0a0a",
            fontSize: "0.875rem",
            fontWeight: 500,
            letterSpacing: "-0.01em",
            userSelect: "none",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: 0,
              height: 0,
              borderTop: "4.5px solid transparent",
              borderBottom: "4.5px solid transparent",
              borderLeft: "7.5px solid #0a0a0a",
              marginRight: "2px",
            }}
            aria-hidden="true"
          />
          Files in VoidFS take up zero bytes on disk
        </div>

        <div
          style={{
            width: "calc(100% - 32px)",
            maxWidth: "1360px",
            height: "18px",
            marginTop: "1.25rem",
            backgroundColor: "rgba(255, 255, 255, 0.6)",
            borderTopLeftRadius: "28px",
            borderTopRightRadius: "28px",
            borderTop: "1px solid rgba(0, 0, 0, 0.08)",
            borderLeft: "1px solid rgba(0, 0, 0, 0.05)",
            borderRight: "1px solid rgba(0, 0, 0, 0.05)",
            boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.03)",
          }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
