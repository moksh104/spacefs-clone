"use client";

import React from "react";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";

/* ─────────────────────────────────────────────────────────────
   VoidFS FeatureSteps Section — Phase 3
   Recreates the signature editorial 3-step rhythm of SpaceFS:
   • Receives the Hero's rounded container canvas seamlessly:
     (Hero ends with 1360px wide top-rounded container peek)
   • Editorial index markers: 01, 02, 03 (monospace, tabular)
   • 3-column horizontal alignment on desktop: [Index] — [Title] — [Description]
   • Responsive vertical stacking on tablet and mobile
   • Original VoidFS copy communicating:
     01: Instant file access without traditional full download
     02: Real-time synchronization across devices and workspaces
     03: Native compatibility with creative video & 3D apps
   • Smooth hover transition (12px rightward slide on desktop)
   • Staggered scroll reveal respecting prefers-reduced-motion
───────────────────────────────────────────────────────────── */

interface FeatureItem {
  id: string;
  number: string;
  title: string;
  description: string;
}

const FEATURES: FeatureItem[] = [
  {
    id: "feature-access",
    number: "01",
    title: "Files open without downloading",
    description:
      "Start editing 50GB project files in seconds. VoidFS fetches byte ranges on demand as your software reads them, eliminating full transfers before you can begin.",
  },
  {
    id: "feature-sync",
    number: "02",
    title: "Real-time sync across workspaces",
    description:
      "Save in your editor and modifications reflect across all linked machines automatically. Collaborators see updated assets without manual uploads or zip archives.",
  },
  {
    id: "feature-workflows",
    number: "03",
    title: "Works with your existing tools",
    description:
      "Premiere, DaVinci Resolve, Final Cut, and Blender mount VoidFS as a high-speed local volume. No custom plugins, proprietary formats, or workflow changes required.",
  },
];

export function FeatureSteps() {
  return (
    <section
      id="features"
      aria-label="VoidFS Core Features"
      style={{
        position: "relative",
        width: "100%",
        backgroundColor: "#f5f6f8",
        paddingBottom: "clamp(5rem, 8vw, 8rem)",
        overflow: "hidden",
        fontFamily: "var(--font-inter, 'Inter', system-ui, -apple-system, sans-serif)",
      }}
    >
      {/* 
        ── Below-Hero Rounded Container Canvas ──
        Seamlessly continues the 1360px rounded top peek established at the bottom of Hero:
        Hero provides: borderTop, borderTopLeftRadius 28px, borderTopRightRadius 28px
        FeatureSteps provides: borderLeft, borderRight, borderBottom, borderBottomRadius 28px
      */}
      <div
        className="feature-steps-canvas"
        style={{
          width: "calc(100% - 32px)",
          maxWidth: "1360px",
          margin: "0 auto",
          backgroundColor: "rgba(255, 255, 255, 0.6)",
          borderLeft: "1px solid rgba(0, 0, 0, 0.05)",
          borderRight: "1px solid rgba(0, 0, 0, 0.05)",
          borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
          borderBottomLeftRadius: "28px",
          borderBottomRightRadius: "28px",
          boxShadow: "0 24px 60px rgba(0, 0, 0, 0.03)",
          paddingTop: "clamp(2.5rem, 5vw, 4.5rem)",
          paddingBottom: "clamp(3.5rem, 6vw, 5.5rem)",
          paddingInline: "clamp(1.25rem, 4.5vw, 3.75rem)",
        }}
      >
        {/* ── Section Header ── */}
        <div style={{ maxWidth: "44rem", marginBottom: "clamp(3rem, 5vw, 4.5rem)" }}>
          <AnimatedReveal variant="fade-up" delay={0}>
            <h2
              style={{
                fontSize: "clamp(1.875rem, 4.2vw, 3.25rem)", // 30px to 52px
                fontWeight: 500,
                lineHeight: 1.06,
                letterSpacing: "-0.035em",
                color: "#0a0a0a",
                margin: 0,
                textWrap: "balance",
              }}
            >
              Large files should feel instant.
            </h2>
          </AnimatedReveal>

          <AnimatedReveal variant="fade-up" delay={80}>
            <p
              style={{
                marginTop: "1.25rem",
                maxWidth: "36rem",
                fontSize: "clamp(0.9375rem, 1.2vw, 1.0625rem)", // 15px to 17px
                lineHeight: 1.65,
                color: "rgba(0, 0, 0, 0.58)",
                marginInline: 0,
                letterSpacing: "-0.01em",
              }}
            >
              VoidFS streams byte ranges on demand directly into your applications.
              Stop juggling external SSDs, waiting on progress bars, or wasting
              disk space on files you only need once.
            </p>
          </AnimatedReveal>
        </div>

        {/* ── Editorial Three-Step List ── */}
        <div
          role="list"
          aria-label="Primary product capabilities"
          style={{
            borderTop: "1px solid rgba(0, 0, 0, 0.08)",
            position: "relative",
          }}
        >
          {FEATURES.map((feature, index) => (
            <AnimatedReveal
              key={feature.id}
              variant="fade-up"
              delay={120 + index * 90}
            >
              <div
                role="listitem"
                className="feature-step-row group"
                style={{
                  borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
                  position: "relative",
                  transition: "background-color 300ms ease",
                }}
              >
                <div
                  className="feature-step-inner"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "clamp(1.25rem, 3vw, 2.5rem)",
                    paddingBlock: "clamp(1.75rem, 3.5vw, 3rem)", // 28px on mobile to 48px on desktop
                    width: "100%",
                  }}
                >
                  {/* Monospace Editorial Number Marker */}
                  <span
                    aria-hidden="true"
                    className="feature-number font-mono"
                    style={{
                      display: "inline-block",
                      width: "2.5rem", // 40px
                      flexShrink: 0,
                      fontSize: "0.8125rem", // 13px
                      fontWeight: 500,
                      letterSpacing: "0.04em",
                      color: "rgba(0, 0, 0, 0.42)",
                      transition: "color 300ms ease",
                      fontVariantNumeric: "tabular-nums",
                      userSelect: "none",
                    }}
                  >
                    {feature.number}
                  </span>

                  {/* Title & Description Content Block */}
                  <div
                    className="feature-content"
                    style={{
                      display: "flex",
                      flex: 1,
                      flexDirection: "column",
                      gap: "0.75rem",
                    }}
                  >
                    {/* Feature Title */}
                    <h3
                      className="feature-title"
                      style={{
                        margin: 0,
                        fontSize: "clamp(1.4rem, 2.5vw, 2.25rem)", // 22px to 36px
                        fontWeight: 500,
                        letterSpacing: "-0.025em",
                        lineHeight: 1.18,
                        color: "#0a0a0a",
                        transition: "transform 500ms cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                    >
                      {feature.title}
                    </h3>

                    {/* Feature Description */}
                    <p
                      className="feature-description"
                      style={{
                        margin: 0,
                        fontSize: "clamp(0.875rem, 1vw, 0.9375rem)", // 14px to 15px
                        lineHeight: 1.62,
                        color: "rgba(0, 0, 0, 0.58)",
                        maxWidth: "28rem",
                        transition:
                          "transform 500ms cubic-bezier(0.16, 1, 0.3, 1), color 500ms ease",
                      }}
                    >
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedReveal>
          ))}
        </div>
      </div>

      {/* ── Scoped CSS for responsive editorial columns & hover transitions ── */}
      <style jsx>{`
        /* Desktop (1024px+): 3-column rhythm within each row ([Number] - [Title] - [Description]) */
        @media (min-width: 1024px) {
          .feature-content {
            flex-direction: row !important;
            align-items: center !important;
            justify-content: space-between !important;
            gap: 3rem !important;
          }

          .feature-title {
            flex: 1 1 auto;
          }

          .feature-description {
            max-width: 22rem !important;
            flex-shrink: 0;
          }

          /* Hover interaction: title & description slide right subtly */
          .feature-step-row:hover .feature-title {
            transform: translateX(12px);
          }

          .feature-step-row:hover .feature-description {
            transform: translateX(12px);
            color: rgba(10, 10, 10, 0.88) !important;
          }

          .feature-step-row:hover .feature-number {
            color: rgba(10, 10, 10, 0.8) !important;
          }
        }

        /* Tablet (768px - 1023px): Stack title & description cleanly on right of number */
        @media (min-width: 768px) and (max-width: 1023px) {
          .feature-step-inner {
            align-items: flex-start !important;
          }
          .feature-number {
            padding-top: 0.35rem;
          }
          .feature-description {
            max-width: 34rem !important;
          }
        }

        /* Mobile (< 768px): Aligns number with top of title */
        @media (max-width: 767px) {
          .feature-steps-canvas {
            width: calc(100% - 20px) !important;
            border-radius: 20px !important;
          }
          .feature-step-inner {
            align-items: flex-start !important;
            gap: 1rem !important;
          }
          .feature-number {
            width: 1.75rem !important;
            padding-top: 0.2rem;
            font-size: 0.75rem !important;
          }
          .feature-content {
            gap: 0.5rem !important;
          }
          .feature-description {
            max-width: 100% !important;
          }
        }

        /* Prefers reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .feature-title,
          .feature-description,
          .feature-number {
            transition: none !important;
            transform: none !important;
          }
          .feature-step-row:hover .feature-title,
          .feature-step-row:hover .feature-description {
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}
