import { Navbar, Hero, FeatureSteps } from "@/components/sections";

/* ──────────────────────────────────────────────
   VoidFS Landing Page
   Phase 1: Navbar (Complete)
   Phase 2: Hero (Complete)
   Phase 3: FeatureSteps (Complete)
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
    </>
  );
}
