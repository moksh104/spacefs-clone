import { Navbar, Hero } from "@/components/sections";
import { Container } from "@/components/ui/Container";
import { GradientText } from "@/components/ui/GradientText";
import {
  CheckCircle2,
  Layers,
  Package,
  Palette,
  Play,
  Type,
  Zap,
  Grid3X3,
} from "lucide-react";

/* ──────────────────────────────────────────────
   VoidFS Landing Page
   Phase 1: Navbar (Complete)
   Phase 2: Hero (Complete)
────────────────────────────────────────────── */

const STATUS_ITEMS = [
  { icon: Palette,      label: "Design System",  value: "CSS variables + Tailwind v4",                 status: "ok" },
  { icon: Type,         label: "Typography",      value: "Inter · 8-level scale · clamp()",             status: "ok" },
  { icon: Layers,       label: "Color Tokens",    value: "Dark · Light · Accent · Muted",               status: "ok" },
  { icon: Zap,          label: "Animations",      value: "9 keyframes · IntersectionObserver",           status: "ok" },
  { icon: Grid3X3,      label: "Breakpoints",     value: "320px → 1920px (9 targets)",                  status: "ok" },
  { icon: Package,      label: "UI Components",   value: "Container · Section · Button · AnimatedReveal · GradientText · MediaFrame", status: "ok" },
  { icon: Play,         label: "Phase 1",         value: "Navbar — floating-pill layout, scroll, menu", status: "ok" },
  { icon: CheckCircle2, label: "Phase 2",         value: "Hero — typography, CTA, media collage, zero-bytes", status: "ok" },
] as const;

export default function HomePage() {
  return (
    <>
      {/* ── Navbar (Phase 1) ── */}
      <Navbar />

      {/* ── Hero (Phase 2) ── */}
      <Hero />

      {/* ── Temporary dev scroll & verification area below Hero ── */}
      <main
        style={{
          minHeight: "100vh",
          /* Match reference site's light grey background */
          background: "#eff1f5",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          paddingTop: "80px", // offset for fixed navbar
        }}
      >
        <Container
          style={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            paddingBlock: "4rem",
          }}
        >
          {/* Status badge */}
          <div style={{ marginBottom: "2rem", display: "flex", justifyContent: "center" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.375rem",
                padding: "0.25rem 0.75rem",
                borderRadius: "9999px",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase" as const,
                background: "rgba(74, 124, 255, 0.1)",
                color: "#4a7cff",
                border: "1px solid rgba(74, 124, 255, 0.2)",
              }}
            >
              <CheckCircle2 size={12} aria-hidden="true" />
              Phase 1 — Navbar Complete
            </span>
          </div>

          {/* Heading */}
          <h1
            style={{
              fontFamily: "var(--font-inter, 'Inter', system-ui, sans-serif)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              marginBottom: "1rem",
              maxWidth: 640,
              margin: "0 auto 1rem",
              color: "#0a0a0a",
            }}
          >
            <GradientText variant="accent">VoidFS</GradientText>
            {" "}foundation
            <br />is ready
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "1.125rem",
              color: "rgba(0,0,0,0.5)",
              maxWidth: 500,
              margin: "0 auto 3rem",
              lineHeight: 1.7,
              fontFamily: "var(--font-inter, 'Inter', system-ui, sans-serif)",
            }}
          >
            The floating-pill navbar from Phase 1 sits above.
            Phase 2 will implement the Hero section below it.
          </p>

          {/* Status grid */}
          <div
            role="list"
            aria-label="Foundation status checklist"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "0.75rem",
              maxWidth: 900,
              margin: "0 auto 3rem",
              textAlign: "left",
            }}
          >
            {STATUS_ITEMS.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                role="listitem"
                style={{
                  background: "rgba(255,255,255,0.7)",
                  border: "1px solid rgba(0,0,0,0.08)",
                  borderRadius: "1rem",
                  padding: "1rem 1.25rem",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.875rem",
                  backdropFilter: "blur(8px)",
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 36,
                    height: 36,
                    borderRadius: "0.5rem",
                    background: "rgba(74, 124, 255, 0.1)",
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                >
                  <Icon size={18} color="#4a7cff" aria-hidden="true" />
                </span>
                <div>
                  <p
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase" as const,
                      color: "rgba(0,0,0,0.4)",
                      marginBottom: 4,
                      fontFamily: "inherit",
                    }}
                  >
                    {label}
                  </p>
                  <p
                    style={{
                      fontSize: "0.8rem",
                      color: "#0a0a0a",
                      fontWeight: 500,
                      fontFamily: "inherit",
                    }}
                  >
                    {value}
                  </p>
                </div>
                <span style={{ marginLeft: "auto", flexShrink: 0, marginTop: 2 }}>
                  <CheckCircle2 size={16} color="#22c55e" aria-hidden="true" />
                </span>
              </div>
            ))}
          </div>

          <p
            style={{
              fontSize: "0.8rem",
              color: "rgba(0,0,0,0.4)",
              fontFamily: "inherit",
            }}
          >
            Next.js 16 · React 19 · Tailwind v4 · Framer Motion · Lucide React
          </p>
        </Container>

        {/* Dev badge */}
        <div
          role="status"
          aria-live="polite"
          aria-label="Development phase indicator"
          style={{
            position: "fixed",
            bottom: "1rem",
            right: "1rem",
            zIndex: 9999,
            background: "rgba(10, 10, 10, 0.82)",
            backdropFilter: "blur(12px)",
            color: "white",
            padding: "0.4rem 0.875rem",
            borderRadius: "9999px",
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            border: "1px solid rgba(255,255,255,0.1)",
            pointerEvents: "none",
            userSelect: "none",
            fontFamily: "var(--font-inter, 'Inter', system-ui, sans-serif)",
          }}
        >
          DEV · Phase 2 · Hero
        </div>
      </main>
    </>
  );
}
