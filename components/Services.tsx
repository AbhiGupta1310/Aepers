"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useIsometricCanvas } from "../lib/isometric/useIsometricCanvas";
import { tiles } from "../lib/isometric/tileData";

interface ServiceDetail {
  badge: string;
  title: string;
  tagline: string;
  description: string;
  metric: string;
  visualType: "voice" | "chat" | "workflow" | "data";
}

const serviceDetails: Record<string, ServiceDetail> = {
  voice: {
    badge: "LIVE VOICE · NEW",
    title: "AI Receptionist & Voice Agent",
    tagline: "Answers every call. Books appointments. Never takes a day off.",
    description: "We build AI phone agents that handle inbound calls for your business — in a natural human voice, 24/7. The agent understands callers, takes action (booking, SMS, CRM updates), and escalates only when needed.",
    metric: "↓ 80% of calls handled without human involvement",
    visualType: "voice",
  },
  chat: {
    badge: "WEB CHAT · ACTIVE",
    title: "Intelligent Website Chatbot",
    tagline: "Instant site responses, qualified lead capture, and automated support.",
    description: "Our custom-trained chat agents digest your knowledge base, PDFs, and website to answer user questions, qualify leads, schedule appointments, and smoothly escalate to humans.",
    metric: "→ 3x faster response times on support tickets",
    visualType: "chat",
  },
  workflow: {
    badge: "WORKFLOWS · ACTIVE",
    title: "Automated Operations & Integrations",
    tagline: "Integrate tools, automate repeating tasks, and build custom pipelines.",
    description: "We connect your entire tech stack (CRMs, sheets, email, calendar) to automatically sync data, route tickets, and execute background tasks. Zero manual copying required.",
    metric: "↑ 12+ hours saved weekly per active employee",
    visualType: "workflow",
  },
  data: {
    badge: "ANALYTICS · LIVE",
    title: "Interactive Data Dashboards",
    tagline: "Real-time KPIs, automated calculations, and custom BI portals.",
    description: "Get a single pane of glass into your operations. We build clean, real-time analytics dashboards that calculate conversion rates, customer lifetime value, and automate weekly PDF reports.",
    metric: "★ 100% automated real-time performance tracking",
    visualType: "data",
  },
};

export default function Services() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeTile, setActiveTile] = useState<string | null>(null);
  const [hoveredTile, setHoveredTile] = useState<string | null>(null);

  const { initCanvas, handleMouseMove, handleClick } = useIsometricCanvas({
    canvasRef,
    activeTile,
    hoveredTile,
    setActiveTile,
    setHoveredTile,
  });

  useEffect(() => {
    const cleanup = initCanvas();
    return cleanup;
  }, [initCanvas]);

  // Which tile to show details for — hover takes priority, then active, then first
  const displayId = hoveredTile && hoveredTile !== "aepers"
    ? hoveredTile
    : activeTile ?? null;

  const displayTile = displayId ? tiles.find((t) => t.id === displayId) : null;
  const displayDetails = displayId ? serviceDetails[displayId] : null;

  const renderVisualDemo = (type: "voice" | "chat" | "workflow" | "data", accent: string) => {
    switch (type) {
      case "voice":
        return (
          <div className="svc-visual-box" style={{ borderColor: `${accent}15`, backgroundColor: `${accent}04` }}>
            <div className="svc-voice-waves">
              <span style={{ backgroundColor: accent, animationDelay: "0.1s" }}></span>
              <span style={{ backgroundColor: accent, animationDelay: "0.3s" }}></span>
              <span style={{ backgroundColor: accent, animationDelay: "0.5s" }}></span>
              <span style={{ backgroundColor: accent, animationDelay: "0.2s" }}></span>
              <span style={{ backgroundColor: accent, animationDelay: "0.4s" }}></span>
            </div>
            <p className="svc-visual-text" style={{ color: accent }}>Active call in progress</p>
          </div>
        );
      case "chat":
        return (
          <div className="svc-visual-box" style={{ borderColor: `${accent}15`, backgroundColor: `${accent}04` }}>
            <div className="svc-chat-bubbles">
              <div className="svc-chat-bubble user">How can I book a demo?</div>
              <div className="svc-chat-bubble bot" style={{ borderColor: `${accent}20` }}>
                <span className="typing-dot" style={{ backgroundColor: accent }}></span>
                <span className="typing-dot" style={{ backgroundColor: accent, animationDelay: "0.2s" }}></span>
                <span className="typing-dot" style={{ backgroundColor: accent, animationDelay: "0.4s" }}></span>
              </div>
            </div>
            <p className="svc-visual-text" style={{ color: accent }}>Bot is preparing response</p>
          </div>
        );
      case "workflow":
        return (
          <div className="svc-visual-box" style={{ borderColor: `${accent}15`, backgroundColor: `${accent}04` }}>
            <div className="svc-flow-nodes">
              <div className="flow-node" style={{ borderColor: accent }}>Webhook</div>
              <div className="flow-line"><span style={{ background: accent }}></span></div>
              <div className="flow-node active" style={{ backgroundColor: accent }}>Filter</div>
              <div className="flow-line"><span style={{ background: accent }}></span></div>
              <div className="flow-node" style={{ borderColor: accent }}>CRM</div>
            </div>
            <p className="svc-visual-text" style={{ color: accent }}>Automated action executed</p>
          </div>
        );
      case "data":
        return (
          <div className="svc-visual-box" style={{ borderColor: `${accent}15`, backgroundColor: `${accent}04` }}>
            <div className="svc-bar-chart">
              <div className="chart-bar" style={{ height: "40%", backgroundColor: `${accent}30` }}></div>
              <div className="chart-bar" style={{ height: "75%", backgroundColor: `${accent}60` }}></div>
              <div className="chart-bar" style={{ height: "95%", backgroundColor: accent }}></div>
              <div className="chart-bar" style={{ height: "55%", backgroundColor: `${accent}40` }}></div>
            </div>
            <p className="svc-visual-text" style={{ color: accent }}>Recalculating conversion metrics</p>
          </div>
        );
    }
  };

  return (
    <section className="section" id="services" aria-label="Services">
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <span className="badge">SYSTEM MATRIX</span>
          <h2 className="section-heading" style={{ marginTop: "12px" }}>
            Four services. One outcome —{" "}
            <span className="script-text text-accent" style={{ fontSize: "1.15em" }}>
              less manual work
            </span>
          </h2>
          <p className="section-sub">
            Pick the ones that fit your business, or let us audit and recommend.
          </p>
        </div>

        {/* Two-column layout: Canvas left, Detail panel right */}
        <div className="services-layout-grid">

          {/* Left: Isometric Canvas */}
          <div className="canvas-wrapper">
            <canvas
              ref={canvasRef}
              className="isometric-canvas"
              width={680}
              height={520}
              onMouseMove={handleMouseMove}
              onClick={handleClick}
            />
            <p className="canvas-hint">
              {activeTile
                ? "✦ Click the tile again to close"
                : "✦ Hover to explore — click to lock"}
            </p>
          </div>

          {/* Right: Single animated detail card */}
          <div className="svc-detail-panel">
            {displayTile && displayDetails ? (
              <div
                key={displayId}
                className="svc-detail-card"
                style={{ borderTopColor: displayTile.accent }}
              >
                {/* 1. Pill top-badge with active pulse dot */}
                <span
                  className="svc-detail-badge-pill"
                  style={{
                    backgroundColor: `${displayTile.accent}12`,
                    color: displayTile.accent,
                  }}
                >
                  <span
                    className="svc-detail-badge-dot"
                    style={{ backgroundColor: displayTile.accent }}
                  ></span>
                  {displayDetails.badge}
                </span>

                {/* 2. Large Heading */}
                <h3 className="svc-detail-title-large">{displayDetails.title}</h3>

                {/* 3. Subtitle tagline */}
                <p className="svc-detail-subtitle-italic">{displayDetails.tagline}</p>

                {/* 4. Description paragraph */}
                <p className="svc-detail-desc-paragraph">{displayDetails.description}</p>

                {/* 5. Animated Demonstration Block */}
                {renderVisualDemo(displayDetails.visualType, displayTile.accent)}

                {/* 6. Pill Domain Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", margin: "4px 0" }}>
                  {displayTile.domains.map((dom, idx) => (
                    <span
                      key={idx}
                      style={{
                        padding: "6px 14px",
                        fontSize: "0.82rem",
                        fontWeight: 500,
                        borderRadius: "100px",
                        border: `1px solid ${displayTile.accent}24`,
                        backgroundColor: `${displayTile.accent}05`,
                        color: "#4A4A4A",
                        display: "inline-flex",
                        alignItems: "center",
                      }}
                    >
                      {dom}
                    </span>
                  ))}
                </div>

                {/* 7. Footer - Only visible upon scroll! */}
                <div className="svc-detail-footer">
                  <div
                    className="svc-detail-metric-orange"
                    style={{ color: displayTile.accent }}
                  >
                    {displayDetails.metric}
                  </div>
                  <Link
                    href={displayTile.path}
                    className="svc-detail-cta"
                    style={{ color: displayTile.accent }}
                  >
                    See how it works →
                  </Link>
                </div>
              </div>
            ) : (
              /* Empty / placeholder state */
              <div className="svc-detail-empty">
                <div className="svc-empty-icon">◈</div>
                <p className="svc-empty-hint">
                  Hover over a tile to explore the service
                </p>
                <div className="svc-empty-pills">
                  {tiles.map((t) => (
                    <span
                      key={t.id}
                      className="svc-empty-pill"
                      style={{ borderColor: `${t.accent}40`, color: t.accent }}
                    >
                      {t.title}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
