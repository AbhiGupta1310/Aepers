"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useIsometricCanvas } from "../lib/isometric/useIsometricCanvas";
import { tiles } from "../lib/isometric/tileData";

// ============ CHAT CONVERSATIONS ============
const chatConversations: Record<string, { question: string; answer: string }> = {
  "Customer Support": {
    question: "I placed an order 3 days ago but haven't received any tracking update yet.",
    answer: "I found your order #4821. It shipped yesterday via FedEx and is expected to arrive by Thursday. I've just sent the tracking link to your email. Would you like me to set up delivery notifications as well?",
  },
  "HR Helpdesk": {
    question: "How many casual leaves do I have left this quarter?",
    answer: "You have 4 casual leaves remaining out of 6 for this quarter. You've used 2 so far — one on March 12 and one on April 5. Would you like me to help you apply for a leave?",
  },
  "IT FAQ": {
    question: "I'm unable to connect to the company VPN from home. What should I do?",
    answer: "This is usually a DNS or certificate issue. First, try restarting your VPN client and clearing the cache. If that doesn't work, go to Settings > Network > Reset VPN Profile. I can also raise a ticket with IT support if the issue persists.",
  },
  "Sales Enablement": {
    question: "Can you pull up the latest pricing for our Enterprise plan?",
    answer: "The current Enterprise plan starts at $2,400/month for up to 50 users, with custom API access and a dedicated account manager. I can also share the updated comparison sheet with Growth and Starter plans. Want me to email it to you?",
  },
};

// ============ VOICE DEMOS ============
const voiceDemos: Record<string, { status: string; transcript: string }> = {
  "Clinics": {
    status: "Incoming Patient Call",
    transcript: "Booking appointment with Dr. Patel for Thursday at 2:00 PM. Sending SMS confirmation now...",
  },
  "Restaurants": {
    status: "Table Reservation",
    transcript: "Table for 4 reserved at 7:30 PM tonight. Confirmation sent via WhatsApp...",
  },
  "Salons": {
    status: "Appointment Booking",
    transcript: "Haircut with Sarah confirmed for Friday 3:00 PM. Added to your calendar...",
  },
  "Law Firms": {
    status: "Client Intake Call",
    transcript: "Consultation with Atty. Johnson scheduled Tuesday 10 AM. Intake form emailed...",
  },
};

// ============ WORKFLOW DEMOS ============
const workflowDemos: Record<string, { nodes: [string, string, string]; label: string }> = {
  "Finance Ops": { nodes: ["Invoice", "Approve", "QuickBooks"], label: "Auto-syncing approved invoices" },
  "HR Onboarding": { nodes: ["Application", "Verify", "Slack Alert"], label: "New hire onboarding triggered" },
  "Sales CRM": { nodes: ["Lead Form", "Qualify", "HubSpot"], label: "Lead routed to sales pipeline" },
  "Ticket Routing": { nodes: ["Email", "Classify", "Assign"], label: "Support ticket auto-assigned" },
};

// ============ DATA DASHBOARD DEMOS ============
const dataDemos: Record<string, {
  metrics: { label: string; value: string; change: string; positive: boolean }[];
  bars: number[];
}> = {
  "Business Intelligence": {
    metrics: [
      { label: "Revenue", value: "$284K", change: "+12%", positive: true },
      { label: "Active Users", value: "12.4K", change: "+8.3%", positive: true },
      { label: "Churn Rate", value: "2.1%", change: "-0.3%", positive: true },
    ],
    bars: [45, 62, 78, 85, 92],
  },
  "Sales Analytics": {
    metrics: [
      { label: "Pipeline", value: "$1.2M", change: "+18%", positive: true },
      { label: "Win Rate", value: "34%", change: "+5.2%", positive: true },
      { label: "Avg Deal", value: "$24K", change: "+$3K", positive: true },
    ],
    bars: [30, 55, 42, 70, 65],
  },
  "Finance Reports": {
    metrics: [
      { label: "Net Profit", value: "$89K", change: "+6.4%", positive: true },
      { label: "Burn Rate", value: "$42K/mo", change: "-8%", positive: true },
      { label: "Runway", value: "14 mo", change: "+2 mo", positive: true },
    ],
    bars: [80, 65, 72, 58, 48],
  },
  "Ops Dashboards": {
    metrics: [
      { label: "Uptime", value: "99.97%", change: "+0.02%", positive: true },
      { label: "Response", value: "124ms", change: "-18ms", positive: true },
      { label: "Errors", value: "0.03%", change: "-0.01%", positive: true },
    ],
    bars: [95, 88, 92, 97, 99],
  },
};

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
  const [activeTile, setActiveTile] = useState<string | null>("voice");
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
    : activeTile ?? "voice";

  const displayTile = displayId ? tiles.find((t) => t.id === displayId) : null;
  const displayDetails = displayId ? serviceDetails[displayId] : null;

  // Active domain per tile type (each tile remembers its own active pill)
  const [activeDomainMap, setActiveDomainMap] = useState<Record<string, string>>({
    voice: "Clinics",
    chat: "Customer Support",
    workflow: "Finance Ops",
    data: "Business Intelligence",
  });

  // Chat typing animation state
  const [chatPhase, setChatPhase] = useState<"typing" | "response">("typing");
  const [typedChars, setTypedChars] = useState(0);
  const chatTimerRef = useRef<NodeJS.Timeout | null>(null);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Reset chatbot animation whenever the chat domain changes or tile switches
  useEffect(() => {
    if (chatTimerRef.current) clearTimeout(chatTimerRef.current);
    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);

    if (displayId === "chat") {
      setChatPhase("typing");
      setTypedChars(0);

      chatTimerRef.current = setTimeout(() => {
        setChatPhase("response");
        let charIndex = 0;
        const responseText = chatConversations[activeDomainMap.chat].answer;
        typingIntervalRef.current = setInterval(() => {
          charIndex++;
          setTypedChars(charIndex);
          if (charIndex >= responseText.length) {
            if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
          }
        }, 20);
      }, 1200);
    } else {
      setChatPhase("typing");
      setTypedChars(0);
    }

    return () => {
      if (chatTimerRef.current) clearTimeout(chatTimerRef.current);
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    };
  }, [displayId, activeDomainMap.chat]);

  const renderVisualDemo = (type: "voice" | "chat" | "workflow" | "data", accent: string) => {
    switch (type) {
      case "voice": {
        const voiceDemo = voiceDemos[activeDomainMap.voice];
        return (
          <div key={activeDomainMap.voice} className="svc-visual-box" style={{ borderColor: `${accent}15`, backgroundColor: `${accent}04` }}>
            <div className="svc-voice-waves">
              <span style={{ backgroundColor: accent, animationDelay: "0.1s" }}></span>
              <span style={{ backgroundColor: accent, animationDelay: "0.3s" }}></span>
              <span style={{ backgroundColor: accent, animationDelay: "0.5s" }}></span>
              <span style={{ backgroundColor: accent, animationDelay: "0.2s" }}></span>
              <span style={{ backgroundColor: accent, animationDelay: "0.4s" }}></span>
            </div>
            <p className="svc-visual-text" style={{ color: accent }}>{voiceDemo.status}</p>
            <p className="svc-voice-transcript">{voiceDemo.transcript}</p>
          </div>
        );
      }
      case "chat": {
        const currentChat = chatConversations[activeDomainMap.chat];
        return (
          <div className="svc-visual-box svc-chat-demo-box" style={{ borderColor: `${accent}15`, backgroundColor: `${accent}04` }}>
            <div className="svc-chat-bubbles">
              <div className="svc-chat-bubble user">{currentChat.question}</div>
              {chatPhase === "typing" ? (
                <div className="svc-chat-bubble bot svc-chat-typing" style={{ borderColor: `${accent}20` }}>
                  <span className="typing-dot" style={{ backgroundColor: accent }}></span>
                  <span className="typing-dot" style={{ backgroundColor: accent, animationDelay: "0.2s" }}></span>
                  <span className="typing-dot" style={{ backgroundColor: accent, animationDelay: "0.4s" }}></span>
                </div>
              ) : (
                <div className="svc-chat-bubble bot svc-chat-response" style={{ borderColor: `${accent}20` }}>
                  {currentChat.answer.slice(0, typedChars)}
                  {typedChars < currentChat.answer.length && (
                    <span className="svc-chat-cursor" style={{ backgroundColor: accent }}>|</span>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      }
      case "workflow": {
        const wfDemo = workflowDemos[activeDomainMap.workflow];
        return (
          <div key={activeDomainMap.workflow} className="svc-visual-box" style={{ borderColor: `${accent}15`, backgroundColor: `${accent}04` }}>
            <div className="svc-flow-nodes">
              <div className="flow-node" style={{ borderColor: accent }}>{wfDemo.nodes[0]}</div>
              <div className="flow-line"><span style={{ background: accent }}></span></div>
              <div className="flow-node active" style={{ backgroundColor: accent }}>{wfDemo.nodes[1]}</div>
              <div className="flow-line"><span style={{ background: accent }}></span></div>
              <div className="flow-node" style={{ borderColor: accent }}>{wfDemo.nodes[2]}</div>
            </div>
            <p className="svc-visual-text" style={{ color: accent }}>{wfDemo.label}</p>
          </div>
        );
      }
      case "data": {
        const dataDemo = dataDemos[activeDomainMap.data];
        return (
          <div key={activeDomainMap.data} className="svc-visual-box svc-data-demo-box" style={{ borderColor: `${accent}15`, backgroundColor: `${accent}04` }}>
            <div className="svc-kpi-row">
              {dataDemo.metrics.map((m, i) => (
                <div
                  key={i}
                  className="svc-kpi-card"
                  style={{ animationDelay: `${i * 0.1}s`, borderTopColor: accent }}
                >
                  <span className="svc-kpi-label">{m.label}</span>
                  <span className="svc-kpi-value">{m.value}</span>
                  <span className={`svc-kpi-change ${m.positive ? "positive" : "negative"}`}>
                    {m.positive ? "↑" : "↓"} {m.change}
                  </span>
                </div>
              ))}
            </div>
            <div className="svc-mini-bars">
              {dataDemo.bars.map((h, i) => (
                <div
                  key={i}
                  className="svc-mini-bar"
                  style={{
                    height: `${h}%`,
                    backgroundColor: accent,
                    opacity: 0.25 + (h / 100) * 0.75,
                    animationDelay: `${i * 0.08}s`,
                  }}
                />
              ))}
            </div>
          </div>
        );
      }
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
              width={740}
              height={560}
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

                {/* 6. Clickable Domain Tags — ALL tiles */}
                <div className="svc-domain-pills-row">
                  {displayTile.domains.map((dom, idx) => {
                    const tileType = displayDetails.visualType;
                    const isActive = activeDomainMap[tileType] === dom;
                    return (
                      <button
                        key={idx}
                        className={`svc-domain-pill svc-domain-pill-clickable${isActive ? " svc-domain-pill-active" : ""}`}
                        style={{
                          borderColor: isActive ? displayTile.accent : `${displayTile.accent}24`,
                          backgroundColor: isActive ? `${displayTile.accent}14` : `${displayTile.accent}05`,
                          color: isActive ? displayTile.accent : "#4A4A4A",
                        }}
                        onClick={() => {
                          setActiveDomainMap(prev => ({ ...prev, [tileType]: dom }));
                        }}
                        type="button"
                      >
                        {dom}
                      </button>
                    );
                  })}
                </div>

                {/* 7. Footer */}
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
