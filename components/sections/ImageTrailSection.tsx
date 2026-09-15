"use client";

import React, { useState } from "react";
import ImageTrail from "@/components/ui/ImageTrail";
import { Sparkles, MousePointer2, Layers, Cpu } from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   VoidFS ImageTrail Section (React Bits Integration)
   Showcases interactive cursor image trail with all 8 variants.
   Simulates zero-byte distributed media assets trailing the cursor.
───────────────────────────────────────────────────────────── */

const TRAIL_IMAGES = [
  "https://picsum.photos/id/287/400/400",
  "https://picsum.photos/id/1001/400/400",
  "https://picsum.photos/id/1025/400/400",
  "https://picsum.photos/id/1026/400/400",
  "https://picsum.photos/id/1027/400/400",
  "https://picsum.photos/id/1028/400/400",
  "https://picsum.photos/id/1029/400/400",
  "https://picsum.photos/id/1030/400/400",
  "https://picsum.photos/id/1031/400/400",
  "https://picsum.photos/id/1032/400/400",
  "https://picsum.photos/id/1033/400/400",
  "https://picsum.photos/id/1035/400/400",
];

interface VariantOption {
  id: number;
  label: string;
  desc: string;
}

const VARIANTS: VariantOption[] = [
  { id: 1, label: "01 · Fade", desc: "Classic fade & scale" },
  { id: 2, label: "02 · Flash Zoom", desc: "Flash brightness & inner scale" },
  { id: 3, label: "03 · Lift", desc: "Random drift & lift upward" },
  { id: 4, label: "04 · Velocity", desc: "Distance-based contrast glide" },
  { id: 5, label: "05 · Angular", desc: "Clockwise rotational trail" },
  { id: 6, label: "06 · Kinetic", desc: "Speed to blur, grayscale & size" },
  { id: 7, label: "07 · Cascade", desc: "Queued randomized card stack" },
  { id: 8, label: "08 · 3D Tilt", desc: "Interactive 3D depth & perspective" },
];

export function ImageTrailSection() {
  const [selectedVariant, setSelectedVariant] = useState<number>(1);

  return (
    <section
      id="interactive-trail"
      aria-label="Interactive Asset Trail Showcase"
      style={{
        position: "relative",
        width: "100%",
        backgroundColor: "#05070b",
        color: "#ffffff",
        overflow: "hidden",
        paddingTop: "clamp(4.5rem, 7vw, 7.5rem)",
        paddingBottom: "clamp(5rem, 8vw, 8rem)",
        fontFamily: "var(--font-inter, 'Inter', system-ui, -apple-system, sans-serif)",
      }}
    >
      {/* ── Ambient Glow Background ── */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          maxWidth: "1200px",
          height: "450px",
          backgroundImage:
            "radial-gradient(60% 50% at 50% 50%, rgba(56, 189, 248, 0.08) 0%, rgba(168, 85, 247, 0.05) 50%, rgba(5, 7, 11, 0) 80%)",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />

      {/* ── Section Container ── */}
      <div
        style={{
          width: "100%",
          maxWidth: "1440px",
          margin: "0 auto",
          paddingLeft: "clamp(1.25rem, 5vw, 4.5rem)",
          paddingRight: "clamp(1.25rem, 5vw, 4.5rem)",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* ── Section Header ── */}
        <div style={{ maxWidth: "800px", marginBottom: "2.5rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.35rem 0.85rem",
              borderRadius: "9999px",
              backgroundColor: "rgba(56, 189, 248, 0.08)",
              border: "1px solid rgba(56, 189, 248, 0.22)",
              color: "#38bdf8",
              fontSize: "0.8125rem",
              fontWeight: 600,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              marginBottom: "1.25rem",
            }}
          >
            <Sparkles size={14} />
            <span>React Bits · Image Trail Component</span>
          </div>

          <h2
            style={{
              fontSize: "clamp(2.25rem, 4vw, 3.5rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.035em",
              color: "#ffffff",
              margin: "0 0 1rem 0",
            }}
          >
            Scrub petabytes with{" "}
            <span
              style={{
                backgroundImage: "linear-gradient(135deg, #38bdf8 0%, #a855f7 60%, #ec4899 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              instant tactile feedback.
            </span>
          </h2>

          <p
            style={{
              fontSize: "clamp(1rem, 1.35vw, 1.1875rem)",
              lineHeight: 1.6,
              color: "#94a3b8",
              margin: 0,
              maxWidth: "680px",
            }}
          >
            Move your cursor across the interactive canvas below. High-bitrate studio takes, raw grades, and VFX plates
            materialize instantaneously using GSAP-powered motion algorithms.
          </p>
        </div>

        {/* ── Variant Selector Tabs ── */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            marginBottom: "1.5rem",
          }}
          role="tablist"
          aria-label="Image Trail Variants"
        >
          {VARIANTS.map((v) => {
            const isActive = selectedVariant === v.id;
            return (
              <button
                key={v.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedVariant(v.id)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.5rem 1rem",
                  borderRadius: "10px",
                  fontSize: "0.8125rem",
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? "#ffffff" : "#94a3b8",
                  backgroundColor: isActive ? "rgba(56, 189, 248, 0.15)" : "rgba(255, 255, 255, 0.03)",
                  border: isActive ? "1px solid rgba(56, 189, 248, 0.4)" : "1px solid rgba(255, 255, 255, 0.07)",
                  cursor: "pointer",
                  transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                  outline: "none",
                }}
              >
                <span>{v.label}</span>
                {isActive && (
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: "#38bdf8",
                      boxShadow: "0 0 8px #38bdf8",
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* ── Interactive Trail Playground Canvas ── */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "540px",
            borderRadius: "20px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            background:
              "radial-gradient(85% 70% at 50% 50%, rgba(15, 23, 42, 0.75) 0%, rgba(5, 7, 11, 0.95) 100%)",
            boxShadow:
              "0 25px 50px -12px rgba(0, 0, 0, 0.6), inset 0 1px 1px 0 rgba(255, 255, 255, 0.08)",
            overflow: "hidden",
            cursor: "crosshair",
          }}
        >
          {/* Subtle Grid Backdrop */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `
                linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
              pointerEvents: "none",
            }}
            aria-hidden="true"
          />

          {/* Centered Guide Badge */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.75rem",
              textAlign: "center",
              pointerEvents: "none",
              userSelect: "none",
              zIndex: 5,
            }}
          >
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "16px",
                backgroundColor: "rgba(56, 189, 248, 0.1)",
                border: "1px solid rgba(56, 189, 248, 0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#38bdf8",
              }}
            >
              <MousePointer2 size={24} />
            </div>

            <div>
              <div
                style={{
                  fontSize: "1.125rem",
                  fontWeight: 600,
                  color: "#f8fafc",
                  letterSpacing: "-0.01em",
                }}
              >
                Glide cursor across canvas
              </div>
              <div
                style={{
                  fontSize: "0.875rem",
                  color: "#64748b",
                  marginTop: "0.25rem",
                }}
              >
                Variant {selectedVariant} · {VARIANTS.find((v) => v.id === selectedVariant)?.desc}
              </div>
            </div>
          </div>

          {/* ── React Bits <ImageTrail /> Component ── */}
          <ImageTrail
            key={selectedVariant}
            items={TRAIL_IMAGES}
            variant={selectedVariant}
          />
        </div>

        {/* ── Footer Metadata / Metrics ── */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1.25rem",
            marginTop: "1.25rem",
            padding: "0.875rem 1.25rem",
            borderRadius: "12px",
            backgroundColor: "rgba(255, 255, 255, 0.02)",
            border: "1px solid rgba(255, 255, 255, 0.05)",
            fontSize: "0.8125rem",
            color: "#64748b",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
              <Layers size={14} color="#38bdf8" />
              <span>8 Animation Styles</span>
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
              <Cpu size={14} color="#a855f7" />
              <span>GSAP Timeline Engine</span>
            </span>
          </div>

          <div style={{ color: "#94a3b8" }}>
            Component source: <strong style={{ color: "#f8fafc" }}>React Bits</strong> · Integrated with Next.js 16 & React 19
          </div>
        </div>
      </div>
    </section>
  );
}
