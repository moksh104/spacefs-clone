import { Navbar, Hero, FeatureSteps, DriveShowcase, ImageTrailSection } from "@/components/sections";

/* ──────────────────────────────────────────────
   VoidFS Landing Page
   Phase 1: Navbar (Complete)
   Phase 2: Hero (Complete)
   Phase 3: FeatureSteps (Complete)
   Phase 4: DriveShowcase (Complete)
   React Bits: ImageTrail Component (Complete)
────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <>
      {/* ── Navbar (Phase 1) ── */}
      <Navbar />

      {/* ── Hero (Phase 2) ── */}
      <Hero />

      {/* ── Feature Steps (Phase 3) ── */}
      <FeatureSteps />

      {/* ── Drive Showcase (Phase 4) ── */}
      <DriveShowcase />

      {/* ── Interactive Image Trail (React Bits) ── */}
      <ImageTrailSection />
    </>
  );
}

