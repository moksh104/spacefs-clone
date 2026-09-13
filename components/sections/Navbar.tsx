"use client";

import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────
   VoidFS Navbar — Phase 1
   Faithfully recreates the SpaceFS header composition:

   Desktop at top:
     [VoidFS logo pill]  [≡ Menu pill]  [Download] [Book a demo]

   Desktop scrolled:
     [VoidFS logo pill]  [≡ Menu pill]             [Book a demo ← dark]

   Mobile:
     [VoidFS logo pill]  [≡ icon pill]

   Menu opens a centred popover card (same as reference).
───────────────────────────────────────────────────── */

/* ── Icon: hamburger lines ── */
function HamburgerIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="16"
      height="12"
      viewBox="0 0 16 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <rect y="0"  width="16" height="1.5" rx="0.75" fill="currentColor" />
      <rect y="5"  width="16" height="1.5" rx="0.75" fill="currentColor" />
      <rect y="10" width="16" height="1.5" rx="0.75" fill="currentColor" />
    </svg>
  );
}

/* ── Icon: close X ── */
function CloseIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M1 1L13 13M13 1L1 13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ── VoidFS Logo mark — original abstract glyph ── */
function VoidMark() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Abstract V-shaped void mark — original design */}
      <path
        d="M3 4C3 4 5.5 10 7 13C8 15.5 10 17 10 17C10 17 12 15.5 13 13C14.5 10 17 4 17 4"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle
        cx="10"
        cy="8.5"
        r="2.5"
        stroke="white"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
}

/* ────────────────────────────────────────────────── */

const NAV_LINKS = [
  { label: "Overview",   href: "#overview" },
  { label: "Features",   href: "#features" },
  { label: "Pricing",    href: "#pricing" },
  { label: "FAQ",        href: "#faq" },
  { label: "Book a demo", href: "#book-demo" },
] as const;

const SOCIAL_LINKS = [
  { label: "X",        href: "https://x.com" },
  { label: "GitHub",   href: "https://github.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Contact",  href: "mailto:hello@voidfs.dev" },
] as const;

/* ── Pill base style shared across all header pills ── */
const pillBase: React.CSSProperties = {
  display:         "inline-flex",
  alignItems:      "center",
  justifyContent:  "center",
  borderRadius:    "9999px",
  border:          "1px solid rgba(0, 0, 0, 0.12)",
  backgroundColor: "rgba(255, 255, 255, 0.82)",
  backdropFilter:  "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  cursor:          "pointer",
  userSelect:      "none",
  WebkitTapHighlightColor: "transparent",
  transition:      "background-color 140ms ease, border-color 140ms ease, opacity 140ms ease",
  textDecoration:  "none",
  fontFamily:      "var(--font-inter, 'Inter', system-ui, sans-serif)",
};

export function Navbar() {
  const [menuOpen, setMenuOpen]       = useState(false);
  const [scrolled, setScrolled]       = useState(false);
  const menuRef                       = useRef<HTMLDivElement>(null);
  const menuBtnRef                    = useRef<HTMLButtonElement>(null);

  /* ── Scroll watcher ── */
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Close menu on Escape ── */
  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    // Return focus to the menu button
    requestAnimationFrame(() => menuBtnRef.current?.focus());
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen, closeMenu]);

  /* ── Click outside to close menu ── */
  useEffect(() => {
    if (!menuOpen) return;
    const onClick = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        menuBtnRef.current &&
        !menuBtnRef.current.contains(e.target as Node)
      ) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [menuOpen, closeMenu]);

  /* ── Lock body scroll when menu is open ── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen((o) => !o);

  return (
    <>
      {/* ─────────── HEADER ─────────── */}
      <header
        aria-label="Site header"
        style={{
          position:  "fixed",
          top:       0,
          left:      0,
          right:     0,
          zIndex:    50,
          pointerEvents: "none",        // let clicks pass through the transparent wrapper
        }}
      >
        <nav
          aria-label="Main navigation"
          style={{
            display:        "flex",
            alignItems:     "flex-start",
            justifyContent: "space-between",
            padding:        "16px 16px",
            position:       "relative",
          }}
        >
          {/* ── LEFT: Logo pill ── */}
          <Link
            href="/"
            aria-label="VoidFS — go to homepage"
            style={{
              ...pillBase,
              width:  44,
              height: 44,
              backgroundColor: "rgba(10, 10, 10, 0.92)",
              border:          "1px solid rgba(255,255,255,0.08)",
              pointerEvents:   "auto",
              flexShrink:      0,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.opacity = "0.82";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
            }}
          >
            <VoidMark />
          </Link>

          {/* ── CENTER: Menu pill ── */}
          <div
            style={{
              position:   "absolute",
              left:       "50%",
              top:        "16px",
              transform:  "translateX(-50%)",
              pointerEvents: "auto",
            }}
          >
            {/* Desktop: ≡ Menu  |  Mobile: ≡ icon only */}
            <button
              ref={menuBtnRef}
              id="nav-menu-btn"
              onClick={toggleMenu}
              aria-expanded={menuOpen}
              aria-controls="nav-menu-panel"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              style={{
                ...pillBase,
                height:       44,
                paddingLeft:  16,
                paddingRight: 16,
                gap:          8,
                fontSize:     14,
                fontWeight:   500,
                color:        "#0a0a0a",
                letterSpacing: "-0.01em",
                pointerEvents: "auto",
              }}
              className="nav-menu-pill"
            >
              <HamburgerIcon />
              {/* "Menu" text only visible on md+ */}
              <span className="nav-menu-label">Menu</span>
            </button>
          </div>

          {/* ── RIGHT: CTAs ── */}
          <div
            style={{
              display:   "flex",
              alignItems: "center",
              gap:        8,
              pointerEvents: "auto",
              flexShrink: 0,
            }}
          >
            {/* Download — hidden when scrolled */}
            <a
              href="#download"
              aria-label="Download VoidFS"
              className="nav-download-btn"
              style={{
                ...pillBase,
                height:         44,
                paddingLeft:    20,
                paddingRight:   20,
                fontSize:       14,
                fontWeight:     500,
                letterSpacing:  "-0.01em",
                color:          "#ffffff",
                backgroundColor: "rgba(10, 10, 10, 0.92)",
                border:         "1px solid rgba(255,255,255,0.08)",
                opacity:        scrolled ? 0 : 1,
                pointerEvents:  scrolled ? "none" : "auto",
                transform:      scrolled ? "translateY(-4px) scale(0.96)" : "translateY(0) scale(1)",
                transition:     "opacity 250ms ease, transform 250ms ease",
              }}
              onMouseEnter={(e) => {
                if (!scrolled) (e.currentTarget as HTMLAnchorElement).style.opacity = "0.78";
              }}
              onMouseLeave={(e) => {
                if (!scrolled) (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
              }}
            >
              Download
            </a>

            {/* Book a demo — always visible, style changes on scroll */}
            <a
              href="#book-demo"
              aria-label="Book a demo of VoidFS"
              style={{
                ...pillBase,
                height:          44,
                paddingLeft:     20,
                paddingRight:    20,
                fontSize:        14,
                fontWeight:      500,
                letterSpacing:   "-0.01em",
                color:           scrolled ? "#ffffff"  : "#0a0a0a",
                backgroundColor: scrolled
                  ? "rgba(10, 10, 10, 0.92)"
                  : "rgba(255, 255, 255, 0.82)",
                border: scrolled
                  ? "1px solid rgba(255,255,255,0.08)"
                  : "1px solid rgba(0, 0, 0, 0.12)",
                transition: "background-color 250ms ease, color 250ms ease, border-color 250ms ease, opacity 140ms ease",
              }}
              className="nav-demo-btn"
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.opacity = "0.80";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
              }}
            >
              Book a demo
            </a>
          </div>
        </nav>
      </header>

      {/* ─────────── MENU BACKDROP ─────────── */}
      {menuOpen && (
        <div
          aria-hidden="true"
          onClick={closeMenu}
          style={{
            position:        "fixed",
            inset:           0,
            zIndex:          48,
            backgroundColor: "rgba(0,0,0,0.08)",
            backdropFilter:  "blur(2px)",
            WebkitBackdropFilter: "blur(2px)",
            animation:       "fadeInBackdrop 200ms ease both",
          }}
        />
      )}

      {/* ─────────── MENU PANEL ─────────── */}
      <div
        id="nav-menu-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!menuOpen}
        ref={menuRef}
        style={{
          position:        "fixed",
          top:             "72px",
          left:            "50%",
          transform:       "translateX(-50%)",
          zIndex:          49,
          width:           "min(360px, calc(100vw - 32px))",
          backgroundColor: "rgba(255, 255, 255, 0.96)",
          backdropFilter:  "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border:          "1px solid rgba(0, 0, 0, 0.08)",
          borderRadius:    "20px",
          boxShadow:       "0 8px 40px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0,0,0,0.08)",
          padding:         "0",
          overflow:        "hidden",
          pointerEvents:   menuOpen ? "auto" : "none",
          opacity:         menuOpen ? 1 : 0,
          visibility:      menuOpen ? "visible" : "hidden",
          animation:       menuOpen ? "menuSlideIn 220ms cubic-bezier(0.16,1,0.3,1) both" : undefined,
          fontFamily:      "var(--font-inter, 'Inter', system-ui, sans-serif)",
        }}
        tabIndex={menuOpen ? 0 : -1}
      >
        {/* Close button row */}
        <div
          style={{
            display:         "flex",
            justifyContent:  "center",
            padding:         "12px 16px 4px",
          }}
        >
          <button
            onClick={closeMenu}
            aria-label="Close navigation menu"
            style={{
              display:         "inline-flex",
              alignItems:      "center",
              gap:             8,
              paddingInline:   16,
              paddingBlock:    8,
              borderRadius:    "9999px",
              border:          "1px solid rgba(0,0,0,0.10)",
              background:      "transparent",
              cursor:          "pointer",
              fontSize:        13,
              fontWeight:      500,
              color:           "#0a0a0a",
              fontFamily:      "inherit",
              transition:      "background 120ms ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.04)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <CloseIcon />
            Close
          </button>
        </div>

        {/* Nav links */}
        <nav
          aria-label="Site pages"
          style={{ padding: "8px 24px 16px" }}
        >
          <p
            style={{
              fontSize:      11,
              fontWeight:    600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color:         "rgba(0,0,0,0.35)",
              marginBottom:  12,
            }}
          >
            Menu
          </p>
          <ul role="list" style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  onClick={closeMenu}
                  style={{
                    display:         "block",
                    padding:         "4px 0",
                    fontSize:        26,
                    fontWeight:      500,
                    letterSpacing:   "-0.03em",
                    lineHeight:      1.2,
                    color:           "#0a0a0a",
                    textDecoration:  "none",
                    transition:      "color 120ms ease",
                  }}
                  className="nav-link-item"
                  onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(0,0,0,0.4)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#0a0a0a")}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Divider */}
        <div
          aria-hidden="true"
          style={{
            margin:      "0 24px",
            height:      1,
            background:  "rgba(0,0,0,0.08)",
          }}
        />

        {/* Social links */}
        <div style={{ padding: "16px 24px 20px" }}>
          <p
            style={{
              fontSize:      11,
              fontWeight:    600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color:         "rgba(0,0,0,0.35)",
              marginBottom:  12,
            }}
          >
            Social Media
          </p>
          <div
            style={{
              display:   "flex",
              flexWrap:  "wrap",
              gap:       "8px 20px",
            }}
          >
            {SOCIAL_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                onClick={closeMenu}
                style={{
                  fontSize:       14,
                  fontWeight:     500,
                  color:          "#0a0a0a",
                  textDecoration: "none",
                  transition:     "color 120ms ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(0,0,0,0.4)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#0a0a0a")}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ─────────── SCOPED STYLES ─────────── */}
      <style>{`
        /* Mobile: hide "Menu" text label, show only hamburger icon */
        @media (max-width: 767px) {
          .nav-menu-label {
            display: none;
          }
          .nav-menu-pill {
            width: 44px !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
          /* Hide both CTA buttons on mobile */
          .nav-download-btn,
          .nav-demo-btn {
            display: none !important;
          }
        }

        @keyframes menuSlideIn {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-8px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0) scale(1);
          }
        }

        @keyframes fadeInBackdrop {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .nav-menu-pill,
          .nav-download-btn,
          .nav-demo-btn {
            transition: none !important;
          }
        }

        /* Focus visible styles for accessibility */
        .nav-menu-pill:focus-visible,
        .nav-download-btn:focus-visible,
        .nav-demo-btn:focus-visible {
          outline: 2px solid #4a7cff;
          outline-offset: 3px;
        }
      `}</style>
    </>
  );
}
