"use client";

import { useEffect, useRef, useCallback, forwardRef } from "react";

/* ─────────────────────────────────────────────────────────────
   FinderDemo — Interactive macOS Finder window demo
   Shows a mock file browser with auto-playing demo sequence:
   1. File selection
   2. Context menu appears
   3. "Get Info" highlighted
   4. Info panel reveals "Zero bytes on disk"
   Scroll-driven scale animation on the window frame.
───────────────────────────────────────────────────────────── */

export function FinderDemo() {
  const stageRef = useRef<HTMLDivElement>(null);
  const frameWrapRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const ctxMenuRef = useRef<HTMLDivElement>(null);
  const infoPanelRef = useRef<HTMLDivElement>(null);
  const contentAreaRef = useRef<HTMLDivElement>(null);
  const targetItemRef = useRef<HTMLDivElement>(null);
  const ctxGetInfoRef = useRef<HTMLDivElement>(null);

  const sequenceStartedRef = useRef(false);
  const sequenceDoneRef = useRef(false);
  const sequenceTimersRef = useRef<number[]>([]);

  const positionMenusNearItem = useCallback(() => {
    const targetItem = targetItemRef.current;
    const contentArea = contentAreaRef.current;
    const ctxMenu = ctxMenuRef.current;
    if (!targetItem || !contentArea || !ctxMenu) return;

    const itemRect = targetItem.getBoundingClientRect();
    const areaRect = contentArea.getBoundingClientRect();
    const left = itemRect.right - areaRect.left - 40;
    const top = itemRect.top - areaRect.top + 10;
    ctxMenu.style.left = left + "px";
    ctxMenu.style.top = top + "px";
  }, []);

  const runDemoSequence = useCallback(() => {
    if (sequenceDoneRef.current) return;
    sequenceDoneRef.current = true;
    positionMenusNearItem();

    const targetItem = targetItemRef.current;
    const ctxMenu = ctxMenuRef.current;
    const ctxGetInfo = ctxGetInfoRef.current;
    const infoPanel = infoPanelRef.current;
    if (!targetItem || !ctxMenu || !ctxGetInfo || !infoPanel) return;

    // Clear old timers
    sequenceTimersRef.current.forEach(clearTimeout);
    sequenceTimersRef.current = [];

    // 1. Select the item
    targetItem.classList.add("finder-demo-selected");

    // 2. Open context menu
    sequenceTimersRef.current.push(
      window.setTimeout(() => {
        ctxMenu.classList.add("finder-demo-ctx-show");
      }, 500)
    );

    // 3. Hover "Get Info"
    sequenceTimersRef.current.push(
      window.setTimeout(() => {
        ctxGetInfo.classList.add("finder-demo-ctx-hover");
      }, 1300)
    );

    // 4. Click Get Info → close menu, show info panel
    sequenceTimersRef.current.push(
      window.setTimeout(() => {
        ctxMenu.classList.remove("finder-demo-ctx-show");
        ctxGetInfo.classList.remove("finder-demo-ctx-hover");
        infoPanel.classList.add("finder-demo-info-show");
      }, 1900)
    );

    // 5. Loop: reset and run again
    sequenceTimersRef.current.push(
      window.setTimeout(() => {
        infoPanel.classList.remove("finder-demo-info-show");
        targetItem.classList.remove("finder-demo-selected");
        sequenceTimersRef.current.push(
          window.setTimeout(() => {
            sequenceDoneRef.current = false;
            runDemoSequence();
          }, 900)
        );
      }, 5500)
    );
  }, [positionMenusNearItem]);

  useEffect(() => {
    const stage = stageRef.current;
    const frameWrap = frameWrapRef.current;
    const scrollHint = scrollHintRef.current;

    if (!stage || !frameWrap || !scrollHint) return;

    const onScroll = () => {
      const rect = stage.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.9;
      const end = vh * 0.35;
      let progress = (start - rect.top) / (start - end);
      progress = Math.max(0, Math.min(1, progress));
      const scale = 0.72 + progress * 0.28;
      const opacity = 0.5 + progress * 0.5;
      frameWrap.style.transform = `scale(${scale})`;
      frameWrap.style.opacity = String(opacity);

      if (progress > 0.9) {
        scrollHint.classList.add("finder-demo-scroll-hidden");
        if (!sequenceStartedRef.current) {
          sequenceStartedRef.current = true;
          window.setTimeout(runDemoSequence, 700);
        }
      } else {
        scrollHint.classList.remove("finder-demo-scroll-hidden");
      }
    };

    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", positionMenusNearItem);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", positionMenusNearItem);
      sequenceTimersRef.current.forEach(clearTimeout);
    };
  }, [runDemoSequence, positionMenusNearItem]);

  return (
    <section
      className="finder-demo-section"
      aria-label="File browser demonstration"
    >
      <div className="finder-demo-hero">
        <h2 className="finder-demo-title">
          Your files, your filesystem
        </h2>
        <p className="finder-demo-subtitle">
          Browse, open, and edit terabytes of media — all through your native file explorer.
          No upload portals. No web dashboards.
        </p>

        <div className="finder-demo-ctas">
          <button className="finder-demo-btn-primary">Download</button>
          <button className="finder-demo-btn-secondary">Book a demo</button>
        </div>

        <div className="finder-demo-stage" ref={stageRef}>
          <div className="finder-demo-scroll-hint" ref={scrollHintRef}>
            Scroll to explore
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              width="12"
              height="12"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>

          <div className="finder-demo-frame-wrap" ref={frameWrapRef}>
            <div className="finder-demo-win">
              {/* ── Title Bar ── */}
              <div className="finder-demo-titlebar">
                <div className="finder-demo-tb-left">
                  <div className="finder-demo-tb-dots">
                    <span /><span /><span />
                  </div>
                  <div className="finder-demo-tb-nav">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
                  </div>
                  <div className="finder-demo-tb-title">14_nyc-soho</div>
                </div>
                <div className="finder-demo-tb-right">
                  {[
                    { label: "View", icon: <><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></>, active: true },
                    { label: "Group", icon: <><path d="M4 6h16M4 12h16M4 18h16" /></> },
                    { label: "Share", icon: <><path d="M12 3v12m0 0l-4-4m4 4l4-4M4 19h16" /></> },
                    { label: "Action", icon: <><circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="19" r="1.5" /></> },
                    { label: "Search", icon: <><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></> },
                  ].map((action) => (
                    <div
                      key={action.label}
                      className={`finder-demo-tb-action${action.active ? " finder-demo-tb-active" : ""}`}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        {action.icon}
                      </svg>
                      {action.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Window Body ── */}
              <div className="finder-demo-body">
                {/* Sidebar */}
                <div className="finder-demo-sidebar">
                  <div className="finder-demo-sb-label">Favorites</div>
                  <SidebarItem icon={<path d="M3 12l9-9 9 9M5 10v10h14V10" />} label="Desktop" />
                  <SidebarItem icon={<path d="M6 2h9l5 5v15H6z" />} label="Documents" />

                  <div className="finder-demo-sb-label">Locations</div>
                  <SidebarItem icon={<rect x="3" y="4" width="18" height="16" rx="2" />} label="Space" />
                  <div className="finder-demo-sb-item finder-demo-sb-indent">2026</div>
                  <div className="finder-demo-sb-item finder-demo-sb-indent2">05</div>
                  <div className="finder-demo-sb-item finder-demo-sb-indent2">06</div>
                  <div className="finder-demo-sb-item finder-demo-sb-indent2 finder-demo-sb-active">14_nyc-soho</div>
                  <div className="finder-demo-sb-item finder-demo-sb-indent2">21_brooklyn-bri...</div>
                  <div className="finder-demo-sb-item finder-demo-sb-indent2">28_team-offsite</div>
                  <div className="finder-demo-sb-item finder-demo-sb-indent2">07</div>

                  <div className="finder-demo-sb-label">&nbsp;</div>
                  <SidebarItem icon={<><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" /></>} label="Macintosh HD" />
                  <SidebarItem icon={<circle cx="12" cy="12" r="9" />} label="AirDrop" />
                  <SidebarItem icon={<path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" />} label="Trash" />
                </div>

                {/* Content Area */}
                <div className="finder-demo-content" ref={contentAreaRef}>
                  <div className="finder-demo-grid">
                    {/* Folders */}
                    <FileItem type="folder" name="A-CAM" />
                    <FileItem type="folder" name="DRONE" />
                    <FileItem type="folder" name="AUDIO" />

                    {/* Files */}
                    <FileItem
                      ref={targetItemRef}
                      type="file"
                      name="A003_06141021_C001.braw"
                      size="24.3 GB"
                      badge="BRAW"
                      gradient="linear-gradient(135deg,#3a4550,#20262e)"
                    />
                    <FileItem type="file" name="C0043.MP4" size="4.2 GB" badge="MP4" gradient="linear-gradient(135deg,#6b3c46,#241318)" />
                    <FileItem type="file" name="A003_06141048_C002.braw" size="18.7 GB" badge="BRAW" gradient="linear-gradient(135deg,#4a6b8a,#22344a)" />
                    <FileItem type="file" name="C0044.MP4" size="3.8 GB" badge="MP4" gradient="linear-gradient(135deg,#c98a4b,#5c3a1c)" />
                    <FileItem type="file" name="A003_06141115_C007.braw" size="21.2 GB" badge="BRAW" gradient="linear-gradient(135deg,#8a4b4b,#331a1a)" />
                    <FileItem type="file" name="DJI_20260614_0042_D.MP4" size="5.6 GB" badge="MP4" gradient="linear-gradient(135deg,#5a7a95,#25333f)" />
                    <FileItem type="file" name="B002_06141132_C011.braw" size="16.8 GB" badge="BRAW" gradient="linear-gradient(135deg,#4f6a8c,#232d3a)" />
                    <FileItem type="file" name="C0051.MP4" size="2.9 GB" badge="MP4" gradient="linear-gradient(135deg,#3a5a72,#182530)" />
                    <FileItem type="file" name="B002_06141507_C019.braw" size="19.5 GB" badge="BRAW" gradient="linear-gradient(135deg,#4a7a5a,#1c2e21)" />
                    <FileItem type="file" name="DJI_20260614_0057_D.MP4" size="6.1 GB" badge="MP4" gradient="linear-gradient(135deg,#2a3038,#0f1216)" />
                    <FileItem type="file" name="A003_06141610_C023.braw" size="22.6 GB" badge="BRAW" gradient="linear-gradient(135deg,#6a8a5a,#2a3a22)" />
                    <FileItem type="file" name="DSC04231.ARW" size="62 MB" badge="ARW" gradient="linear-gradient(135deg,#7a8a6a,#333a2a)" />
                  </div>

                  {/* Context Menu */}
                  <div className="finder-demo-ctx-menu" ref={ctxMenuRef}>
                    <ContextMenuItem icon={<path d="M14 3h7v7M21 3l-9 9M5 5h6v2H7v10h10v-4h2v6H5z" />} label="Open" />
                    <ContextMenuItem icon={<path d="M14 3h7v7M21 3l-9 9M5 5h6v2H7v10h10v-4h2v6H5z" />} label="Open With" />
                    <div className="finder-demo-ctx-sep" />
                    <ContextMenuItem icon={<path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" />} label="Move to Trash" />
                    <div ref={ctxGetInfoRef}>
                      <ContextMenuItem icon={<><circle cx="12" cy="12" r="9" /><path d="M12 16v-5M12 8h.01" /></>} label="Get Info" />
                    </div>
                    <ContextMenuItem icon={<path d="M4 20h16M4 15l4-6 4 3 4-8 4 5" />} label="Rename" />
                    <ContextMenuItem icon={<><rect x="7" y="7" width="12" height="12" rx="2" /><path d="M5 15V5a2 2 0 012-2h10" /></>} label="Duplicate" />
                    <ContextMenuItem icon={<rect x="4" y="4" width="16" height="16" rx="2" />} label="Compress" />
                    <ContextMenuItem icon={<><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></>} label="Quick Look" />
                    <div className="finder-demo-ctx-sep" />
                    <ContextMenuItem icon={<><rect x="9" y="9" width="12" height="12" rx="2" /><path d="M5 15V5a2 2 0 012-2h10" /></>} label="Copy" />
                    <ContextMenuItem icon={<path d="M12 3v12m0 0l-4-4m4 4l4-4M4 19h16" />} label="Share" />
                  </div>

                  {/* Info Panel */}
                  <div className="finder-demo-info-panel" ref={infoPanelRef}>
                    <div className="finder-demo-info-titlebar">
                      <div className="finder-demo-info-dots">
                        <span className="finder-demo-dot-r" />
                        <span className="finder-demo-dot-y" />
                        <span className="finder-demo-dot-g" />
                      </div>
                      <div className="finder-demo-info-titlebar-text">
                        A003_06141021_C001.braw Info
                      </div>
                    </div>
                    <div className="finder-demo-info-head">
                      <div
                        className="finder-demo-info-icon"
                        style={{ background: "linear-gradient(135deg,#3a4550,#20262e)" }}
                      >
                        <span style={{ fontSize: "8px", color: "#fff", fontWeight: 700 }}>BRAW</span>
                      </div>
                      <div>
                        <div className="finder-demo-info-name">A003_06141021_C001.braw</div>
                        <div className="finder-demo-info-sub">Modified Today, 4:12 PM</div>
                      </div>
                      <div className="finder-demo-info-size-tag">24.3 GB</div>
                    </div>
                    <div className="finder-demo-info-rows">
                      <InfoRow label="Kind:" value="Blackmagic RAW movie" />
                      <InfoRow
                        label="Size:"
                        value={
                          <>
                            24,338,192,384 bytes (
                            <span className="finder-demo-highlight-pill">
                              Zero bytes on disk
                            </span>
                            )
                          </>
                        }
                      />
                      <InfoRow label="Where:" value="Space > 2026 > 06 > 14_nyc-soho" />
                      <InfoRow label="Created:" value="Yesterday, 9:42 AM" />
                      <InfoRow label="Modified:" value="Today, 4:12 PM" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Bar */}
              <div className="finder-demo-status-bar">
                <span>15 items</span>
                <span>Space &gt; 2026 &gt; 06 &gt; 14_nyc-soho</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Sub-components ── */

function SidebarItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="finder-demo-sb-item">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
        {icon}
      </svg>
      {label}
    </div>
  );
}

type FileItemProps = {
  type: "folder" | "file";
  name: string;
  size?: string;
  badge?: string;
  gradient?: string;
};

const FileItem = forwardRef<HTMLDivElement, FileItemProps>(
  function FileItem({ type, name, size, badge, gradient }, ref) {
    if (type === "folder") {
      return (
        <div className="finder-demo-item" ref={ref}>
          <div
            className="finder-demo-thumb finder-demo-folder-thumb"
            style={{ background: "linear-gradient(180deg,#5b9dff,#3a7fe6)" }}
          />
          <div className="finder-demo-item-name">{name}</div>
        </div>
      );
    }

    return (
      <div className="finder-demo-item" ref={ref}>
        <div className="finder-demo-thumb" style={{ background: gradient }}>
          {badge && <span className="finder-demo-badge">{badge}</span>}
        </div>
        <div className="finder-demo-item-name">{name}</div>
        {size && <div className="finder-demo-item-size">{size}</div>}
      </div>
    );
  }
);

function ContextMenuItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="finder-demo-ctx-item">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="13" height="13">
        {icon}
      </svg>
      {label}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="finder-demo-info-row">
      <span className="finder-demo-info-row-label">{label}</span>
      <span className="finder-demo-info-row-value">{value}</span>
    </div>
  );
}
