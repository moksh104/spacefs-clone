"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  HardDrive,
  Film,
  Search,
  UploadCloud,
  Folder,
  SlidersHorizontal,
  Play,
  Sparkles,
  ChevronRight,
  Zap,
} from "lucide-react";


/* ─────────────────────────────────────────────────────────────
   VoidFS DriveShowcase — Phase 4
   Original Dark Cinematic Interactive Filesystem Showcase:
   • Single shared bespoke VoidFS Studio Window shell
   • 4 coordinated states:
     01: Native Mounted Volume with storage metrics & folders
     02: Non-Linear Video Editor & multi-track timeline
     03: Voidbar system-wide command palette search
     04: Live pipeline stream while files are actively uploading
   • Controlled via interactive progress capsules + auto-advance
   • Completely original UI system (no proprietary Apple/SpaceFS copy)
   • Pure HTML + CSS + SVG + React state animations
───────────────────────────────────────────────────────────── */

type ShowcaseStep = 1 | 2 | 3 | 4;

interface StepData {
  step: ShowcaseStep;
  number: string;
  badge: string;
  label: string;
  headline: string;
  description: string;
  metric: string;
}

const STEPS: StepData[] = [
  {
    step: 1,
    number: "01",
    badge: "Native Virtual Mount",
    label: "Mounted Drive",
    headline: "Mounts natively. Zero local disk.",
    description:
      "VoidFS mounts directly as a native high-throughput volume in your workstation's file tree. Petabytes of raw cinema assets appear instantly without occupying your local drive.",
    metric: "4.2 TB Mounted · 0 B Local Cache",
  },
  {
    step: 2,
    number: "02",
    badge: "Zero-Latency Playback",
    label: "Instant Editing",
    headline: "Cut, grade, and scrub with zero delay.",
    description:
      "Stream high-bitrate BRAW and ProRes directly into DaVinci Resolve or Premiere. VoidFS lazily fetches only the byte ranges your playhead asks for, keeping latency imperceptible.",
    metric: "4K 60fps Stream · 11ms Lazy Range Fetch",
  },
  {
    step: 3,
    number: "03",
    badge: "Sub-Millisecond Query",
    label: "Global Voidbar",
    headline: "Instant command palette for all studio assets.",
    description:
      "Summon Voidbar anywhere with ⌥ Space. Real-time distributed indexing across millions of studio clips delivers exact takes, metadata, and color passes in milliseconds.",
    metric: "Indexed in < 3ms · Across All Linked Nodes",
  },
  {
    step: 4,
    number: "04",
    badge: "Simultaneous Ingestion",
    label: "Live Pipeline Sync",
    headline: "Stream assets before uploads finish.",
    description:
      "On-set DITs and render farms write to VoidFS, and your creative team can immediately scrub, cut, and composite frames while the transfer is actively in progress.",
    metric: "Live Ingest Stream · 850 MB/s Fiber Pipe",
  },
];

const FOLDERS_DATA = [
  { name: "01_Cinema_RAW", size: "2.1 TB", files: "148 clips", color: "#38bdf8" },
  { name: "02_Sound_Design", size: "42 GB", files: "86 stems", color: "#a855f7" },
  { name: "03_VFX_Plates", size: "890 GB", files: "54 passes", color: "#ec4899" },
  { name: "04_Master_Renders", size: "640 GB", files: "19 reels", color: "#22c55e" },
  { name: "05_Color_Grades", size: "18 GB", files: "32 LUTs", color: "#f59e0b" },
  { name: "06_Archival_Vault", size: "1.2 TB", files: "110 assets", color: "#64748b" },
];

const SEARCH_RESULTS = [
  { name: "nyc_crosswalk_take02.braw", path: "VoidFS › 01_Cinema_RAW", size: "24.8 GB", type: "BRAW" },
  { name: "nyc_skyline_dusk_8k.mov", path: "VoidFS › 01_Cinema_RAW", size: "38.2 GB", type: "PRORES" },
  { name: "nyc_subway_reverb_stem.wav", path: "VoidFS › 02_Sound_Design", size: "3.4 GB", type: "AUDIO" },
  { name: "nyc_grade_filmic_v04.cube", path: "VoidFS › 05_Color_Grades", size: "14 MB", type: "LUT" },
];

export function DriveShowcase() {
  const [activeStep, setActiveStep] = useState<ShowcaseStep>(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [searchQuery, setSearchQuery] = useState("nyc_");
  const [uploadPercent, setUploadPercent] = useState(68);
  const [hoveredFolder, setHoveredFolder] = useState<number | null>(null);

  // Auto-advance loop (6 seconds per step)
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev === 4 ? 1 : ((prev + 1) as ShowcaseStep)));
    }, 6500);
    return () => clearInterval(timer);
  }, [isPlaying]);

  // Animated search typing effect when step 3 is active
  useEffect(() => {
    if (activeStep !== 3) return;
    let index = 4;
    const target = "nyc_crosswalk";
    const interval = setInterval(() => {
      if (index <= target.length) {
        setSearchQuery(target.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 180);
    return () => {
      clearInterval(interval);
      setSearchQuery("nyc_");
    };
  }, [activeStep]);

  // Animated upload progress simulation in step 4
  useEffect(() => {
    if (activeStep !== 4) return;
    const interval = setInterval(() => {
      setUploadPercent((p) => (p >= 98 ? 68 : p + 2));
    }, 450);
    return () => {
      clearInterval(interval);
      setUploadPercent(68);
    };
  }, [activeStep]);


  const currentStepData = STEPS.find((s) => s.step === activeStep) || STEPS[0];

  return (
    <section
      id="drive-showcase"
      aria-label="VoidFS Interactive Drive & Product Showcase"
      style={{
        position: "relative",
        width: "100%",
        backgroundColor: "#070a0f", // Deep obsidian dark canvas
        color: "#ffffff",
        overflow: "hidden",
        paddingTop: "clamp(5rem, 8vw, 8.5rem)",
        paddingBottom: "clamp(6rem, 10vw, 10rem)",
        fontFamily: "var(--font-inter, 'Inter', system-ui, -apple-system, sans-serif)",
      }}
    >
      {/* ── Seamless Top Transition from Light Editorial Canvas ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "60px",
          background: "linear-gradient(to bottom, #f5f6f8 0%, rgba(7, 10, 15, 0.6) 70%, #070a0f 100%)",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />

      {/* ── Ambient Radial Lighting Background ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          maxWidth: "1440px",
          height: "600px",
          backgroundImage: `
            radial-gradient(80% 50% at 50% 0%, rgba(56, 189, 248, 0.12) 0%, rgba(7, 10, 15, 0) 80%),
            radial-gradient(40% 40% at 85% 20%, rgba(168, 85, 247, 0.08) 0%, rgba(7, 10, 15, 0) 70%),
            radial-gradient(40% 40% at 15% 20%, rgba(56, 189, 248, 0.08) 0%, rgba(7, 10, 15, 0) 70%)
          `,
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
        {/* ── Top Header Statement ── */}
        <div style={{ maxWidth: "780px", marginBottom: "clamp(2.5rem, 4.5vw, 4rem)" }}>
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
            <span>Drive Engine · Interactive Architecture</span>
          </div>

          <h2
            style={{
              fontSize: "clamp(2.25rem, 4.2vw, 3.75rem)",
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: "-0.035em",
              color: "#ffffff",
              margin: 0,
            }}
          >
            The filesystem engineered for{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #ffffff 30%, #94a3b8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              heavy creative workflows.
            </span>
          </h2>
        </div>

        {/* ── Step Progress Navigation Pills (Top Controls) ── */}
        <div
          className="steps-tabs-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "0.875rem",
            marginBottom: "clamp(2.5rem, 4vw, 3.5rem)",
          }}
          role="tablist"
          aria-label="Drive showcase feature steps"
        >

          {STEPS.map((s) => {
            const isSelected = s.step === activeStep;
            return (
              <button
                key={s.step}
                role="tab"
                aria-selected={isSelected}
                onClick={() => {
                  setActiveStep(s.step);
                  setIsPlaying(false); // Pause auto-advance on manual interaction
                }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  padding: "1rem 1.15rem",
                  borderRadius: "16px",
                  backgroundColor: isSelected ? "rgba(255, 255, 255, 0.07)" : "rgba(255, 255, 255, 0.02)",
                  border: isSelected ? "1px solid rgba(56, 189, 248, 0.35)" : "1px solid rgba(255, 255, 255, 0.06)",
                  boxShadow: isSelected ? "0 8px 24px rgba(0, 0, 0, 0.4), 0 0 16px rgba(56, 189, 248, 0.12)" : "none",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 200ms ease",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Progress bar line for active item */}
                {isSelected && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "2px",
                      background: "linear-gradient(90deg, #38bdf8, #a855f7)",
                    }}
                  />
                )}

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    marginBottom: "0.4rem",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: isSelected ? "#38bdf8" : "rgba(255, 255, 255, 0.4)",
                      letterSpacing: "0.06em",
                      fontFamily: "var(--font-mono, monospace)",
                    }}
                  >
                    {s.number}
                  </span>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: isSelected ? "#ffffff" : "rgba(255, 255, 255, 0.5)",
                    }}
                  >
                    {s.label}
                  </span>
                </div>

                <div
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: isSelected ? "#ffffff" : "rgba(255, 255, 255, 0.6)",
                    lineHeight: 1.3,
                  }}
                >
                  {s.headline.split(".")[0]}
                </div>
              </button>
            );
          })}
        </div>

        {/* ── Two-Column Showcase Area (Left: Copy / Right: Bespoke Window Shell) ── */}
        <div
          className="showcase-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "clamp(2rem, 4vw, 3.5rem)",
            alignItems: "center",
          }}
        >
          {/* ── LEFT COLUMN: Dynamic Statement & Details ── */}
          <div style={{ maxWidth: "520px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.3rem 0.75rem",
                borderRadius: "8px",
                backgroundColor: "rgba(56, 189, 248, 0.1)",
                color: "#38bdf8",
                fontSize: "0.8125rem",
                fontWeight: 600,
                marginBottom: "1rem",
              }}
            >
              <Zap size={13} />
              <span>{currentStepData.badge}</span>
            </div>

            <h3
              style={{
                fontSize: "clamp(1.75rem, 3vw, 2.625rem)",
                fontWeight: 700,
                lineHeight: 1.12,
                letterSpacing: "-0.03em",
                color: "#ffffff",
                marginBottom: "1.25rem",
              }}
            >
              {currentStepData.headline}
            </h3>

            <p
              style={{
                fontSize: "clamp(1rem, 1.15vw, 1.125rem)",
                lineHeight: 1.62,
                color: "#94a3b8",
                marginBottom: "2rem",
                fontWeight: 400,
              }}
            >
              {currentStepData.description}
            </p>

            {/* Performance Metric Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.625rem",
                padding: "0.625rem 1.125rem",
                borderRadius: "12px",
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                color: "#e2e8f0",
                fontSize: "0.875rem",
                fontWeight: 500,
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "#22c55e",
                  boxShadow: "0 0 10px #22c55e",
                }}
              />
              <span>{currentStepData.metric}</span>
            </div>
          </div>

          {/* ── RIGHT COLUMN: Shared Bespoke VoidFS Studio Window Shell ── */}
          <div
            className="showcase-window"
            style={{
              position: "relative",
              width: "100%",
              minHeight: "520px",
              backgroundColor: "#0d131f",
              borderRadius: "24px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 30px 80px -15px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.04)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* ── Window Titlebar ── */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.875rem 1.25rem",
                backgroundColor: "rgba(15, 23, 42, 0.8)",
                borderBottom: "1px solid rgba(255, 255, 255, 0.07)",
                backdropFilter: "blur(16px)",
                userSelect: "none",
              }}
            >
              {/* Window Controls (Red/Amber/Emerald) */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ width: "11px", height: "11px", borderRadius: "50%", backgroundColor: "#ef4444" }} />
                <span style={{ width: "11px", height: "11px", borderRadius: "50%", backgroundColor: "#f59e0b" }} />
                <span style={{ width: "11px", height: "11px", borderRadius: "50%", backgroundColor: "#10b981" }} />
              </div>

              {/* Window Path Breadcrumb */}
              <div
                style={{
                  fontSize: "0.8125rem",
                  fontWeight: 500,
                  color: "#cbd5e1",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.35rem",
                }}
              >
                <HardDrive size={13} color="#38bdf8" />
                <span>VoidFS Volume</span>
                <ChevronRight size={12} color="#64748b" />
                <span style={{ color: "#ffffff", fontWeight: 600 }}>
                  {activeStep === 1 && "01_Production_Vault"}
                  {activeStep === 2 && "Sequence_04_NightWalk.braw"}
                  {activeStep === 3 && "Voidbar Query: nyc_crosswalk"}
                  {activeStep === 4 && "Live Ingest: Brand_Film_v12.mov"}
                </span>
              </div>

              {/* Status Pill & View Controls */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "3px 9px",
                    borderRadius: "9999px",
                    backgroundColor: "rgba(34, 197, 94, 0.12)",
                    border: "1px solid rgba(34, 197, 94, 0.25)",
                    fontSize: "0.6875rem",
                    fontWeight: 600,
                    color: "#4ade80",
                    letterSpacing: "0.02em",
                  }}
                >
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#22c55e" }} />
                  <span>4.2 TB / ∞</span>
                </div>
                <SlidersHorizontal size={14} color="#94a3b8" />
              </div>
            </div>

            {/* ── Window Canvas (Dynamic State Content) ── */}
            <div
              style={{
                flex: 1,
                position: "relative",
                display: "flex",
                minHeight: "440px",
                overflow: "hidden",
                backgroundColor: "#090e17",
              }}
            >
              {/* ── STATE 1: Mounted Volume & Folder Grid ── */}
              {activeStep === 1 && (
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  {/* Left Volume Sidebar */}
                  <div
                    style={{
                      width: "180px",
                      backgroundColor: "rgba(15, 23, 42, 0.5)",
                      borderRight: "1px solid rgba(255, 255, 255, 0.05)",
                      padding: "1rem 0.75rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "1.25rem",
                    }}
                    className="window-sidebar"
                  >
                    <div>
                      <div
                        style={{
                          fontSize: "0.6875rem",
                          fontWeight: 700,
                          color: "#64748b",
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                          marginBottom: "0.5rem",
                          paddingLeft: "0.5rem",
                        }}
                      >
                        Volumes
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          padding: "0.45rem 0.6rem",
                          borderRadius: "8px",
                          backgroundColor: "rgba(56, 189, 248, 0.12)",
                          color: "#38bdf8",
                          fontSize: "0.8125rem",
                          fontWeight: 600,
                        }}
                      >
                        <HardDrive size={14} />
                        <span>VoidFS Drive</span>
                      </div>
                    </div>

                    <div>
                      <div
                        style={{
                          fontSize: "0.6875rem",
                          fontWeight: 700,
                          color: "#64748b",
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                          marginBottom: "0.5rem",
                          paddingLeft: "0.5rem",
                        }}
                      >
                        Collections
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                        {["Raw Footage", "Timelines", "Audio Stems", "Color Passes"].map((item, idx) => (
                          <div
                            key={item}
                            style={{
                              padding: "0.35rem 0.6rem",
                              borderRadius: "6px",
                              fontSize: "0.75rem",
                              color: idx === 0 ? "#ffffff" : "#94a3b8",
                              fontWeight: idx === 0 ? 600 : 400,
                              cursor: "pointer",
                            }}
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Main File / Folder Browser */}
                  <div
                    style={{
                      flex: 1,
                      padding: "1.25rem",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    {/* Floating Mount Toast */}
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.625rem",
                        padding: "0.5rem 1rem",
                        borderRadius: "12px",
                        backgroundColor: "rgba(15, 23, 42, 0.9)",
                        border: "1px solid rgba(56, 189, 248, 0.3)",
                        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5)",
                        marginBottom: "1rem",
                        alignSelf: "flex-end",
                      }}
                    >
                      <HardDrive size={16} color="#38bdf8" />
                      <div>
                        <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#ffffff" }}>
                          VoidFS Mounted
                        </div>
                        <div style={{ fontSize: "0.6875rem", color: "#94a3b8" }}>
                          /Volumes/VoidFS-Studio · 4.2 TB Virtual
                        </div>
                      </div>
                    </div>

                    {/* Folder Grid */}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
                        gap: "1rem",
                      }}
                    >
                      {FOLDERS_DATA.map((f, idx) => (
                        <div
                          key={f.name}
                          onMouseEnter={() => setHoveredFolder(idx)}
                          onMouseLeave={() => setHoveredFolder(null)}
                          style={{
                            padding: "0.875rem",
                            borderRadius: "14px",
                            backgroundColor: hoveredFolder === idx ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0.03)",
                            border: hoveredFolder === idx ? "1px solid rgba(56, 189, 248, 0.35)" : "1px solid rgba(255, 255, 255, 0.05)",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            cursor: "pointer",
                            transition: "all 180ms ease",
                          }}
                        >
                          <div
                            style={{
                              width: "36px",
                              height: "36px",
                              borderRadius: "10px",
                              backgroundColor: `${f.color}18`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              marginBottom: "0.625rem",
                            }}
                          >
                            <Folder size={20} color={f.color} />
                          </div>
                          <div style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#ffffff", marginBottom: "2px" }}>
                            {f.name}
                          </div>
                          <div style={{ fontSize: "0.6875rem", color: "#94a3b8" }}>
                            {f.size} · {f.files}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Status strip */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingTop: "1rem",
                        borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                        fontSize: "0.75rem",
                        color: "#64748b",
                      }}
                    >
                      <span>6 directories · 4.89 TB Total</span>
                      <span style={{ color: "#38bdf8", fontWeight: 500 }}>Zero bytes on local disk</span>
                    </div>
                  </div>
                </div>
              )}

              {/* ── STATE 2: Video Editor & Multi-Track Timeline ── */}
              {activeStep === 2 && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  {/* Top Editor Split: Clip Bin & Video Player Monitor */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "190px 1fr",
                      borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                      height: "260px",
                    }}
                    className="editor-split"
                  >
                    {/* Media Bin */}
                    <div
                      style={{
                        backgroundColor: "rgba(15, 23, 42, 0.4)",
                        borderRight: "1px solid rgba(255, 255, 255, 0.06)",
                        padding: "0.75rem",
                        overflowY: "auto",
                      }}
                    >
                      <div style={{ fontSize: "0.6875rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                        Project Media Bin
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        {[
                          { name: "Take_01_Bridge.braw", dur: "04:12" },
                          { name: "Take_02_Editor.mov", dur: "02:45" },
                          { name: "Take_03_Skyline.braw", dur: "05:18" },
                        ].map((clip, i) => (
                          <div
                            key={clip.name}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                              padding: "0.4rem",
                              borderRadius: "8px",
                              backgroundColor: i === 0 ? "rgba(56, 189, 248, 0.15)" : "transparent",
                              border: i === 0 ? "1px solid rgba(56, 189, 248, 0.3)" : "none",
                              fontSize: "0.75rem",
                              color: i === 0 ? "#ffffff" : "#94a3b8",
                            }}
                          >
                            <Film size={14} color={i === 0 ? "#38bdf8" : "#64748b"} />
                            <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {clip.name}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Active Cinema Frame Monitor */}
                    <div
                      style={{
                        position: "relative",
                        backgroundColor: "#05070a",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        src="/images/hero/bridge.jpg"
                        alt="Cinema video monitor frame"
                        fill
                        sizes="600px"
                        style={{ objectFit: "cover", opacity: 0.85 }}
                      />
                      {/* Specs Badge */}
                      <div
                        style={{
                          position: "absolute",
                          top: "10px",
                          right: "12px",
                          padding: "4px 8px",
                          borderRadius: "6px",
                          backgroundColor: "rgba(0, 0, 0, 0.75)",
                          color: "#ffffff",
                          fontSize: "0.6875rem",
                          fontWeight: 600,
                          backdropFilter: "blur(8px)",
                        }}
                      >
                        4K DCI · 23.98 FPS · BRAW
                      </div>

                      {/* Timecode & Transport */}
                      <div
                        style={{
                          position: "absolute",
                          bottom: "10px",
                          left: "12px",
                          right: "12px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "4px 10px",
                          borderRadius: "8px",
                          backgroundColor: "rgba(0, 0, 0, 0.75)",
                          backdropFilter: "blur(10px)",
                          color: "#ffffff",
                          fontSize: "0.75rem",
                          fontFamily: "var(--font-mono, monospace)",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <Play size={12} color="#38bdf8" fill="#38bdf8" />
                          <span>00:01:24:18</span>
                        </div>
                        <span style={{ color: "#22c55e", fontWeight: 600 }}>Lazy Stream Active (0 B disk)</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Multi-Track NLE Timeline */}
                  <div
                    style={{
                      flex: 1,
                      backgroundColor: "rgba(10, 15, 26, 0.95)",
                      padding: "0.75rem 1.25rem",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      gap: "0.5rem",
                      position: "relative",
                    }}
                  >
                    {/* Time Ruler */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "0.625rem",
                        color: "#64748b",
                        fontFamily: "var(--font-mono, monospace)",
                        paddingBottom: "2px",
                        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                      }}
                    >
                      <span>00:00</span>
                      <span>00:30</span>
                      <span>01:00</span>
                      <span>01:30</span>
                      <span>02:00</span>
                      <span>02:30</span>
                      <span>03:00</span>
                    </div>

                    {/* V1 Video Track */}
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span style={{ fontSize: "0.6875rem", color: "#94a3b8", width: "24px" }}>V1</span>
                      <div
                        style={{
                          flex: 1,
                          height: "26px",
                          borderRadius: "6px",
                          backgroundColor: "#0284c7",
                          display: "flex",
                          alignItems: "center",
                          paddingLeft: "8px",
                          fontSize: "0.6875rem",
                          fontWeight: 600,
                          color: "#ffffff",
                        }}
                      >
                        Take_01_Bridge_4K.braw
                      </div>
                    </div>

                    {/* A1 Audio Waveform Track */}
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span style={{ fontSize: "0.6875rem", color: "#94a3b8", width: "24px" }}>A1</span>
                      <div
                        style={{
                          flex: 1,
                          height: "24px",
                          borderRadius: "6px",
                          backgroundColor: "rgba(16, 185, 129, 0.2)",
                          border: "1px solid rgba(16, 185, 129, 0.35)",
                          display: "flex",
                          alignItems: "center",
                          padding: "0 8px",
                          gap: "3px",
                        }}
                      >
                        {/* Procedural Audio Waveform Bars */}
                        {[12, 18, 8, 22, 14, 20, 16, 10, 24, 18, 14, 22, 10, 16, 20, 14, 18, 8, 12, 20].map((h, idx) => (
                          <span
                            key={idx}
                            style={{
                              width: "3px",
                              height: `${h}px`,
                              backgroundColor: "#10b981",
                              borderRadius: "1px",
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Playhead Scrubber Line */}
                    <div
                      style={{
                        position: "absolute",
                        top: "8px",
                        bottom: "8px",
                        left: "42%",
                        width: "2px",
                        backgroundColor: "#f59e0b",
                        boxShadow: "0 0 8px #f59e0b",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: "-4px",
                          width: "10px",
                          height: "10px",
                          backgroundColor: "#f59e0b",
                          clipPath: "polygon(50% 100%, 0% 0%, 100% 0%)",
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ── STATE 3: Voidbar Command Palette Search ── */}
              {activeStep === 3 && (
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "1.5rem",
                  }}
                >
                  {/* Frosted Background Canvas */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      backgroundColor: "rgba(9, 14, 23, 0.9)",
                      backdropFilter: "blur(20px)",
                    }}
                  />

                  {/* Centered Voidbar Search Modal */}
                  <div
                    style={{
                      position: "relative",
                      zIndex: 10,
                      width: "100%",
                      maxWidth: "520px",
                      borderRadius: "20px",
                      backgroundColor: "rgba(15, 23, 42, 0.95)",
                      border: "1px solid rgba(56, 189, 248, 0.4)",
                      boxShadow: "0 25px 60px -10px rgba(0, 0, 0, 0.8), 0 0 30px rgba(56, 189, 248, 0.15)",
                      overflow: "hidden",
                    }}
                  >
                    {/* Search Input Bar */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        padding: "1rem 1.25rem",
                        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                      }}
                    >
                      <Search size={18} color="#38bdf8" />
                      <div style={{ display: "flex", alignItems: "center", flex: 1, fontSize: "1rem", color: "#ffffff", fontWeight: 500 }}>
                        <span>{searchQuery}</span>
                        <span
                          style={{
                            width: "2px",
                            height: "18px",
                            backgroundColor: "#38bdf8",
                            marginLeft: "2px",
                            animation: "glow-pulse 1s infinite",
                          }}
                        />
                      </div>
                      <span
                        style={{
                          fontSize: "0.75rem",
                          color: "#64748b",
                          padding: "2px 8px",
                          borderRadius: "6px",
                          backgroundColor: "rgba(255, 255, 255, 0.05)",
                          fontFamily: "var(--font-mono, monospace)",
                        }}
                      >
                        ⌥ Space
                      </span>
                    </div>

                    {/* Search Filter Tags */}
                    <div
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        padding: "0.625rem 1.25rem",
                        backgroundColor: "rgba(0, 0, 0, 0.2)",
                        borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
                      }}
                    >
                      {["All (1,480)", "Cinema RAW (640)", "ProRes (410)", "LUTs (32)"].map((tag, idx) => (
                        <span
                          key={tag}
                          style={{
                            fontSize: "0.6875rem",
                            padding: "2px 8px",
                            borderRadius: "9999px",
                            backgroundColor: idx === 0 ? "rgba(56, 189, 248, 0.2)" : "transparent",
                            color: idx === 0 ? "#38bdf8" : "#94a3b8",
                            fontWeight: idx === 0 ? 600 : 400,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Instant Result Rows */}
                    <div style={{ padding: "0.5rem" }}>
                      {SEARCH_RESULTS.map((res, i) => (
                        <div
                          key={res.name}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "0.625rem 0.75rem",
                            borderRadius: "10px",
                            backgroundColor: i === 0 ? "rgba(56, 189, 248, 0.12)" : "transparent",
                            border: i === 0 ? "1px solid rgba(56, 189, 248, 0.2)" : "1px solid transparent",
                            cursor: "pointer",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                            <Film size={16} color={i === 0 ? "#38bdf8" : "#64748b"} />
                            <div>
                              <div style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#ffffff" }}>
                                {res.name}
                              </div>
                              <div style={{ fontSize: "0.6875rem", color: "#64748b" }}>
                                {res.path}
                              </div>
                            </div>
                          </div>

                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>{res.size}</span>
                            <span
                              style={{
                                fontSize: "0.6875rem",
                                fontWeight: 700,
                                padding: "2px 6px",
                                borderRadius: "4px",
                                backgroundColor: "rgba(255, 255, 255, 0.08)",
                                color: "#cbd5e1",
                              }}
                            >
                              {res.type}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Modal Footer */}
                    <div
                      style={{
                        padding: "0.5rem 1.25rem",
                        backgroundColor: "rgba(0, 0, 0, 0.3)",
                        borderTop: "1px solid rgba(255, 255, 255, 0.05)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        fontSize: "0.6875rem",
                        color: "#64748b",
                      }}
                    >
                      <span>Press ↵ to stream directly</span>
                      <span>Query matched in 2.1ms</span>
                    </div>
                  </div>
                </div>
              )}

              {/* ── STATE 4: Live Ingest & Upload Progress ── */}
              {activeStep === 4 && (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    padding: "1.5rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: "1.5rem",
                  }}
                >
                  {/* Ingest Card */}
                  <div
                    style={{
                      borderRadius: "18px",
                      backgroundColor: "rgba(15, 23, 42, 0.85)",
                      border: "1px solid rgba(34, 197, 94, 0.3)",
                      boxShadow: "0 15px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(34, 197, 94, 0.1)",
                      padding: "1.5rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "1rem",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <div
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "12px",
                            backgroundColor: "rgba(34, 197, 94, 0.15)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <UploadCloud size={22} color="#22c55e" />
                        </div>
                        <div>
                          <div style={{ fontSize: "0.9375rem", fontWeight: 700, color: "#ffffff" }}>
                            Brand_Film_RoughCut_v12.braw
                          </div>
                          <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>
                            Source: Studio DIT Station 01 · 74.2 GB Total
                          </div>
                        </div>
                      </div>

                      {/* Live Streaming Badge */}
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          padding: "4px 10px",
                          borderRadius: "9999px",
                          backgroundColor: "rgba(34, 197, 94, 0.15)",
                          border: "1px solid rgba(34, 197, 94, 0.35)",
                          color: "#4ade80",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                        }}
                      >
                        <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#22c55e" }} />
                        <span>Streaming Ready Now</span>
                      </div>
                    </div>

                    {/* Progress Bar with dynamic percentage */}
                    <div style={{ marginBottom: "0.75rem" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          color: "#cbd5e1",
                          marginBottom: "0.4rem",
                        }}
                      >
                        <span>Transferred: {((74.2 * uploadPercent) / 100).toFixed(1)} GB of 74.2 GB</span>
                        <span style={{ color: "#22c55e" }}>{uploadPercent}% · 850 MB/s</span>
                      </div>
                      <div
                        style={{
                          width: "100%",
                          height: "8px",
                          borderRadius: "9999px",
                          backgroundColor: "rgba(255, 255, 255, 0.08)",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            width: `${uploadPercent}%`,
                            height: "100%",
                            background: "linear-gradient(90deg, #10b981, #38bdf8)",
                            borderRadius: "9999px",
                            transition: "width 300ms ease",
                          }}
                        />
                      </div>
                    </div>

                    {/* Callout Info */}
                    <div
                      style={{
                        padding: "0.75rem 1rem",
                        borderRadius: "10px",
                        backgroundColor: "rgba(56, 189, 248, 0.08)",
                        border: "1px solid rgba(56, 189, 248, 0.2)",
                        fontSize: "0.75rem",
                        color: "#94a3b8",
                        lineHeight: 1.5,
                      }}
                    >
                      <strong style={{ color: "#38bdf8" }}>Zero-wait collaborative ingest:</strong> Editors on other
                      machines can scrub this 74GB file in their timelines right now while the upload finishes in the background.
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Scoped CSS for Responsive Adaptations ── */}
      <style jsx>{`
        @media (min-width: 1024px) {
          .showcase-grid {
            grid-template-columns: 0.9fr 1.1fr !important;
          }
        }
        @media (max-width: 768px) {
          .window-sidebar {
            display: none !important;
          }
          .editor-split {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 640px) {
          .steps-tabs-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 0.5rem !important;
          }
        }
      `}</style>

    </section>
  );
}
