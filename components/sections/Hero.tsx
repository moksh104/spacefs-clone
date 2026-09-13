"use client";

import React, { useState } from "react";
import Image from "next/image";

/* ─────────────────────────────────────────────────────────────
   VoidFS Hero Section — Phase 2
   Recreates the SpaceFS hero composition with original branding:
   • 2-column desktop layout (Left: copy & CTAs; Right: tilted media collage)
   • Responsive single-column on tablet & mobile
   • Original copy: "Limitless space / on your machine"
   • "Backed by Frontier / speedrun" pill badge
   • High-contrast primary "Download" & outlined "Book a demo" CTAs
   • 5 floating tilted creative media cards with zero-bytes indicators
   • Bottom "Files in VoidFS take up zero bytes on disk" info indicator
   • Respects prefers-reduced-motion
───────────────────────────────────────────────────────────── */

export function Hero() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

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
      {/* ── Outer Content Wrapper ── */}
      <div
        style={{
          width: "100%",
          maxWidth: "1440px",
          margin: "0 auto",
          paddingLeft: "clamp(1.25rem, 5vw, 6.5rem)",
          paddingRight: "clamp(1.25rem, 5vw, 6.5rem)",
          paddingTop: "clamp(6.5rem, 12vh, 10.5rem)", // Clears navbar cleanly
          display: "grid",
          gridTemplateColumns: "1fr",
          alignItems: "center",
          gap: "2.5rem",
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
            <span
              style={{
                fontWeight: 700,
                color: "#0a0a0a",
              }}
            >
              Limitless space
            </span>
            <span
              style={{
                fontWeight: 400,
                color: "#64748b",
                marginTop: "0.1em",
              }}
            >
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

        {/* ── RIGHT COLUMN: Cascading Tilted Media Collage (Desktop Only) ── */}
        <div
          className="hero-collage"
          style={{
            position: "relative",
            width: "100%",
            height: "560px",
            display: "none", // enabled via CSS media query @media (min-width: 1024px)
          }}
          aria-hidden="true"
        >
          {/* Card 1: City Skyline (Top Right, tilted +8°) */}
          <div
            style={{
              position: "absolute",
              top: "-15px",
              right: "-10px",
              width: "330px",
              height: "205px",
              borderRadius: "18px",
              overflow: "hidden",
              boxShadow: "0 22px 45px -10px rgba(0, 0, 0, 0.18), 0 0 0 1px rgba(0, 0, 0, 0.05)",
              transform: hoveredCard === 1 ? "rotate(0deg) scale(1.04) translateY(-8px)" : "rotate(8deg)",
              transition: "transform 350ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 350ms ease",
              cursor: "pointer",
              zIndex: hoveredCard === 1 ? 30 : 2,
            }}
            onMouseEnter={() => setHoveredCard(1)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <Image
              src="/images/hero/skyline.jpg"
              alt="City skyline footage preview"
              fill
              sizes="330px"
              style={{ objectFit: "cover" }}
              priority
            />
            {/* Format badge */}
            <div
              style={{
                position: "absolute",
                top: "10px",
                left: "10px",
                padding: "3px 8px",
                borderRadius: "6px",
                backgroundColor: "rgba(0, 0, 0, 0.65)",
                backdropFilter: "blur(6px)",
                color: "#ffffff",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.05em",
              }}
            >
              BRAW 8K
            </div>
          </div>

          {/* Card 2: Workspace Video Editor (Upper Left, tilted -6°) */}
          <div
            style={{
              position: "absolute",
              top: "55px",
              left: "40px",
              width: "330px",
              height: "205px",
              borderRadius: "18px",
              overflow: "hidden",
              boxShadow: "0 22px 45px -10px rgba(0, 0, 0, 0.18), 0 0 0 1px rgba(0, 0, 0, 0.05)",
              transform: hoveredCard === 2 ? "rotate(0deg) scale(1.04) translateY(-8px)" : "rotate(-6deg)",
              transition: "transform 350ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 350ms ease",
              cursor: "pointer",
              zIndex: hoveredCard === 2 ? 30 : 4,
            }}
            onMouseEnter={() => setHoveredCard(2)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <Image
              src="/images/hero/editor.jpg"
              alt="Creative editing workstation"
              fill
              sizes="330px"
              style={{ objectFit: "cover" }}
              priority
            />
            {/* Format badge */}
            <div
              style={{
                position: "absolute",
                bottom: "10px",
                left: "10px",
                padding: "3px 8px",
                borderRadius: "6px",
                backgroundColor: "rgba(0, 0, 0, 0.65)",
                backdropFilter: "blur(6px)",
                color: "#ffffff",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.05em",
              }}
            >
              EDIT_V07.PRORES
            </div>
          </div>

          {/* Card 3: Center Foreground Bridge Sunset (Signature card, tilted +2°) */}
          <div
            style={{
              position: "absolute",
              top: "195px",
              left: "0px",
              width: "370px",
              height: "225px",
              borderRadius: "20px",
              overflow: "hidden",
              boxShadow: "0 30px 60px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.06)",
              transform: hoveredCard === 3 ? "rotate(0deg) scale(1.04) translateY(-8px)" : "rotate(2deg)",
              transition: "transform 350ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 350ms ease",
              cursor: "pointer",
              zIndex: hoveredCard === 3 ? 35 : 15,
            }}
            onMouseEnter={() => setHoveredCard(3)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <Image
              src="/images/hero/bridge.jpg"
              alt="Golden Gate sunset cinematics"
              fill
              sizes="370px"
              style={{ objectFit: "cover" }}
              priority
            />

            {/* Signature Dark Pill Badge: "3.7 GB Zero bytes on disk" */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                right: "22px",
                transform: "translateY(-50%)",
                backgroundColor: "rgba(15, 15, 17, 0.88)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                padding: "8px 16px",
                borderRadius: "9999px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.12)",
              }}
            >
              <span
                style={{
                  color: "#ffffff",
                  fontSize: "13px",
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                }}
              >
                3.7 GB
              </span>
              <span
                style={{
                  color: "#94a3b8",
                  fontSize: "13px",
                  fontWeight: 400,
                  letterSpacing: "-0.01em",
                }}
              >
                Zero bytes on disk
              </span>
            </div>
          </div>

          {/* Card 4: Night Carnival / Bokeh (Lower left, tilted -5°) */}
          <div
            style={{
              position: "absolute",
              top: "340px",
              left: "60px",
              width: "340px",
              height: "210px",
              borderRadius: "18px",
              overflow: "hidden",
              boxShadow: "0 22px 45px -10px rgba(0, 0, 0, 0.22), 0 0 0 1px rgba(0, 0, 0, 0.05)",
              transform: hoveredCard === 4 ? "rotate(0deg) scale(1.04) translateY(-8px)" : "rotate(-5deg)",
              transition: "transform 350ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 350ms ease",
              cursor: "pointer",
              zIndex: hoveredCard === 4 ? 30 : 6,
              background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
            }}
            onMouseEnter={() => setHoveredCard(4)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Rich procedural carnival night artwork with glowing bokeh and ferris wheel vector */}
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 340 210"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ display: "block" }}
            >
              <defs>
                <radialGradient id="carnivalGlow" cx="65%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ec4899" stopOpacity="0.8" />
                  <stop offset="60%" stopColor="#8b5cf6" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="amberGlow" cx="30%" cy="75%" r="40%">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="340" height="210" fill="#090d16" />
              <circle cx="230" cy="100" r="120" fill="url(#carnivalGlow)" />
              <circle cx="100" cy="160" r="90" fill="url(#amberGlow)" />
              {/* Geometric ferris wheel spokes */}
              <circle cx="230" cy="100" r="70" stroke="#f472b6" strokeWidth="1.5" strokeOpacity="0.6" />
              <circle cx="230" cy="100" r="45" stroke="#c084fc" strokeWidth="1" strokeOpacity="0.5" />
              <circle cx="230" cy="100" r="8" fill="#fbcfe8" />
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                <line
                  key={deg}
                  x1="230"
                  y1="100"
                  x2={230 + 70 * Math.cos((deg * Math.PI) / 180)}
                  y2={100 + 70 * Math.sin((deg * Math.PI) / 180)}
                  stroke="#e879f9"
                  strokeWidth="1"
                  strokeOpacity="0.45"
                />
              ))}
              {/* Bokeh circles */}
              <circle cx="45" cy="50" r="16" fill="#60a5fa" fillOpacity="0.25" />
              <circle cx="95" cy="80" r="24" fill="#fbbf24" fillOpacity="0.2" />
              <circle cx="150" cy="130" r="12" fill="#ec4899" fillOpacity="0.3" />
              <circle cx="290" cy="40" r="18" fill="#a78bfa" fillOpacity="0.25" />
            </svg>
            <div
              style={{
                position: "absolute",
                bottom: "10px",
                right: "12px",
                padding: "3px 8px",
                borderRadius: "6px",
                backgroundColor: "rgba(0, 0, 0, 0.65)",
                backdropFilter: "blur(6px)",
                color: "#ffffff",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.05em",
              }}
            >
              CARNIVAL_4K.MP4
            </div>
          </div>

          {/* Card 5: Boardwalk Walkway (Bottom right, tilted +12°) */}
          <div
            style={{
              position: "absolute",
              top: "400px",
              right: "-20px",
              width: "320px",
              height: "200px",
              borderRadius: "18px",
              overflow: "hidden",
              boxShadow: "0 22px 45px -10px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.05)",
              transform: hoveredCard === 5 ? "rotate(0deg) scale(1.04) translateY(-8px)" : "rotate(12deg)",
              transition: "transform 350ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 350ms ease",
              cursor: "pointer",
              zIndex: hoveredCard === 5 ? 30 : 8,
              background: "linear-gradient(145deg, #1e293b 0%, #334155 100%)",
            }}
            onMouseEnter={() => setHoveredCard(5)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* Architectural waterfront scene vector with perspective lines and warm daylight */}
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 320 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ display: "block" }}
            >
              <defs>
                <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#94a3b8" />
                  <stop offset="60%" stopColor="#cbd5e1" />
                  <stop offset="100%" stopColor="#f1f5f9" />
                </linearGradient>
                <linearGradient id="woodGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#b45309" />
                  <stop offset="100%" stopColor="#78350f" />
                </linearGradient>
              </defs>
              <rect width="320" height="200" fill="url(#skyGrad)" />
              {/* Distant water horizon */}
              <rect y="110" width="320" height="90" fill="#64748b" fillOpacity="0.4" />
              {/* Boardwalk deck perspective */}
              <path d="M0 200 L120 120 L320 120 L320 200 Z" fill="url(#woodGrad)" />
              {[130, 145, 160, 175, 190].map((y) => (
                <line
                  key={y}
                  x1={((y - 120) / 80) * 120}
                  y1={y}
                  x2="320"
                  y2={y}
                  stroke="#451a03"
                  strokeWidth="1.5"
                  strokeOpacity="0.3"
                />
              ))}
              {/* Modern railing & pedestrian silhouette */}
              <line x1="120" y1="120" x2="0" y2="200" stroke="#0f172a" strokeWidth="2.5" />
              <line x1="120" y1="108" x2="0" y2="188" stroke="#334155" strokeWidth="1.5" />
              {/* Silhouette figure walking */}
              <circle cx="210" cy="100" r="5" fill="#0f172a" />
              <path d="M206 106 L214 106 L212 125 L208 125 Z" fill="#0f172a" />
            </svg>
            <div
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                padding: "3px 8px",
                borderRadius: "6px",
                backgroundColor: "rgba(0, 0, 0, 0.65)",
                backdropFilter: "blur(6px)",
                color: "#ffffff",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.05em",
              }}
            >
              PIER_SHOT.RAW · 42MB
            </div>
          </div>
        </div>
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
          {/* Small black play triangle indicator matching SpaceFS */}
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

        {/* Peek top edge of rounded container for below-hero section */}
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

      {/* ── Scoped CSS for responsive grid & collage ── */}
      <style jsx>{`
        @media (min-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1.15fr 0.85fr !important;
          }
          .hero-collage {
            display: block !important;
          }
        }
        @media (max-width: 640px) {
          .hero-grid {
            padding-top: 6.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
