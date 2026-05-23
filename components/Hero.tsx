"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import AnimatedWaves from "./AnimatedWaves";

const industryLogos = [
  { icon: "🏥", label: "Clinics" },
  { icon: "🏠", label: "Real Estate" },
  { icon: "💰", label: "Finance" },
  { icon: "⚖️", label: "Legal" },
  { icon: "🛒", label: "E-commerce" },
];

const PHRASES = [
  "shouldn't be doing.",
  "spend hours on.",
  "can be automated.",
];

// ─── Reusable Brand SVG Icons ────────────────────────────────────────────────
function AepersBotLogo({ size = 18 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: "block" }}
    >
      <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" />
      <circle cx="12" cy="12" r="3" fill="currentColor" />
    </svg>
  );
}

function BotIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: "block" }}
    >
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v4" />
      <line x1="8" y1="16" x2="8" y2="16.01" />
      <line x1="16" y1="16" x2="16" y2="16.01" />
    </svg>
  );
}

function PhoneIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: "block" }}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

// ─── Slide 1: Slack Bot (Ticket UI) ──────────────────────────────────────────
function SlackSlide() {
  return (
    <div className="ticket-container">
      <div className="ticket-header">
        <div className="ticket-header-icon slack">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M19.167 15.004c.148 1.488.948 2.378 2.38 2.502.164 1.705-.286 3.14-1.34 4.316a1.996 1.996 0 0 1-1.282.684l-2.072.23c-1.334.15-2.28-.488-2.618-1.748l-.48-1.776-3.792.422.48 1.778c.338 1.258-.292 2.383-1.624 2.532l-2.074.23c-1.336.15-2.584-.528-2.924-1.786l-.422-1.572C1.942 19.34.814 18.712.664 17.38l-.23-2.074c-.15-1.336.526-2.586 1.786-2.926l1.57-.424L3.37 8.164l-1.572.422c-1.26.34-2.384-.29-2.534-1.626l-.23-2.072C-1.116 3.554-.44 2.304.82 1.964l2.072-.23C4.226 1.584 5.172 2.222 5.51 3.48l.48 1.778 3.792-.424-.48-1.776c-.338-1.26.292-2.384 1.626-2.534l2.072-.23c1.334-.148 2.582.528 2.922 1.786l.422 1.572c1.458.148 2.584.776 2.734 2.108l.23 2.074c.15 1.334-.528 2.582-1.786 2.922l-1.572.422.422 3.792 1.572-.422Zm-6.528-6.198-3.792.422.422 3.792 3.794-.422-.424-3.792Z" />
          </svg>
        </div>
        <div className="ticket-header-title">IT Support · Teams</div>
      </div>

      <div className="ticket-msg">
        <div className="ticket-avatar color-2">ET</div>
        <div className="ticket-msg-content">
          <div className="ticket-msg-meta">
            <span className="ticket-author">Ethan</span>
            <span className="ticket-time">Just now</span>
          </div>
          <div className="ticket-text">
            New engineer starting tomorrow — can you get their full dev environment ready by 9am?
          </div>
        </div>
      </div>

      <div className="ticket-reply-divider">1 reply</div>

      <div className="ticket-msg">
        <div className="ticket-avatar app-avatar">
          <AepersBotLogo size={18} />
        </div>
        <div className="ticket-msg-content">
          <div className="ticket-msg-meta">
            <span className="ticket-author">Aepers</span>
            <span className="ticket-app-badge">APP</span>
            <span className="ticket-time">Just now</span>
          </div>
          <div className="ticket-text">
            Done! A Figma Professional seat has been provisioned to <strong>sofia@company.com</strong>. Check your inbox for the activation link.
          </div>
          <div className="ticket-status-badge">Ticket resolved</div>
        </div>
      </div>
    </div>
  );
}

// ─── Slide 2: WhatsApp Integration ──────────────────────────────────────────
function WhatsAppSlide() {
  return (
    <div className="ticket-container">
      <div className="ticket-header">
        <div className="ticket-header-icon wa">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
          </svg>
        </div>
        <div className="ticket-header-title">Sales · WhatsApp</div>
      </div>

      <div className="ticket-msg">
        <div className="ticket-avatar color-3">SJ</div>
        <div className="ticket-msg-content">
          <div className="ticket-msg-meta">
            <span className="ticket-author">Sarah Jenkins</span>
            <span className="ticket-time">Just now</span>
          </div>
          <div className="ticket-text">
            Hi, do you offer enterprise pricing for 50+ seats? We're looking to switch providers.
          </div>
        </div>
      </div>

      <div className="ticket-reply-divider">1 reply</div>

      <div className="ticket-msg">
        <div className="ticket-avatar app-avatar">
          <AepersBotLogo size={18} />
        </div>
        <div className="ticket-msg-content">
          <div className="ticket-msg-meta">
            <span className="ticket-author">Aepers Sales Bot</span>
            <span className="ticket-app-badge">APP</span>
            <span className="ticket-time">Just now</span>
          </div>
          <div className="ticket-text">
            Absolutely! We have custom enterprise tiers. I've sent our pricing matrix to your email and booked a 15-min discovery call with an Account Executive.
          </div>
          <div className="ticket-status-badge">Lead captured</div>
        </div>
      </div>
    </div>
  );
}

// ─── Slide 3: Q&A Chatbot ───────────────────────────────────────────────────
function QASlide() {
  return (
    <div className="ticket-container">
      <div className="ticket-header">
        <div className="ticket-header-icon bot">
          <BotIcon size={18} />
        </div>
        <div className="ticket-header-title">Knowledge Base · Docs</div>
      </div>

      <div className="ticket-msg">
        <div className="ticket-avatar" style={{ background: '#333' }}>YK</div>
        <div className="ticket-msg-content">
          <div className="ticket-msg-meta">
            <span className="ticket-author">You</span>
            <span className="ticket-time">Just now</span>
          </div>
          <div className="ticket-text">
            What is the standard procedure for a digital product refund after 7 days?
          </div>
        </div>
      </div>

      <div className="ticket-reply-divider">1 reply</div>

      <div className="ticket-msg">
        <div className="ticket-avatar app-avatar">
          <AepersBotLogo size={18} />
        </div>
        <div className="ticket-msg-content">
          <div className="ticket-msg-meta">
            <span className="ticket-author">Aepers QA</span>
            <span className="ticket-app-badge">APP</span>
            <span className="ticket-time">Just now</span>
          </div>
          <div className="ticket-text">
            Based on <strong>Refund Policy v2.3</strong>, digital products are strictly non-refundable after 7 days or if the license has been activated. Exception requests require Manager approval.
          </div>
          <div className="qa-sources" style={{ marginTop: '10px' }}>
            <span className="qa-source-chip">📄 Refund Policy v2.3</span>
          </div>
          <div className="ticket-status-badge" style={{ color: '#0288D1', background: '#E1F5FE', borderColor: '#B3E5FC' }}>Answered</div>
        </div>
      </div>
    </div>
  );
}

// ─── Slide 4: AI Voice Agent ─────────────────────────────────────────────────
function VoiceSlide({ timerCount }: { timerCount: number }) {
  const mins = Math.floor(timerCount / 60);
  const secs = String(timerCount % 60).padStart(2, "0");
  return (
    <div className="ticket-container">
      <div className="ticket-header" style={{ justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div className="ticket-header-icon" style={{ background: "#FDE8D8", color: "#F56211" }}>
            <PhoneIcon size={16} />
          </div>
          <div className="ticket-header-title">Live Voice Agent</div>
        </div>
        <span className="slide-timer" style={{ color: "#F56211", fontWeight: 600 }}>{mins}:{secs}</span>
      </div>

      <div className="ticket-msg">
        <div className="ticket-avatar color-2">C</div>
        <div className="ticket-msg-content">
          <div className="ticket-msg-meta">
            <span className="ticket-author">Caller</span>
            <span className="ticket-time">0:12</span>
          </div>
          <div className="ticket-text">
            "I'd like to book a cleaning appointment for Friday."
          </div>
        </div>
      </div>

      <div className="ticket-reply-divider">Live transcript</div>

      <div className="ticket-msg">
        <div className="ticket-avatar app-avatar">
          <AepersBotLogo size={18} />
        </div>
        <div className="ticket-msg-content">
          <div className="ticket-msg-meta">
            <span className="ticket-author">Aepers AI Voice Agent</span>
            <span className="ticket-time">0:15</span>
          </div>
          <div className="ticket-text">
            "Of course! I have 10am and 2pm available. Which works better?"
          </div>
          <div className="waveform" style={{ marginTop: "12px" }}>
            {[0, 1, 2, 3, 4, 5, 6].map(i => <div key={i} className="waveform-bar" />)}
          </div>
        </div>
      </div>
    </div>
  );
}


// ─── Main Hero ───────────────────────────────────────────────────────────────
export default function Hero() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [timerCount, setTimerCount] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);

  // Use the slides directly
  const SLIDES = [
    { id: "slack", component: <SlackSlide /> },
    { id: "voice", component: <VoiceSlide timerCount={timerCount} /> },
    { id: "wa", component: <WhatsAppSlide /> },
    { id: "qa", component: <QASlide /> }
  ];

  // Word Flip Animation (replaces jarring typewriter)
  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex(i => (i + 1) % PHRASES.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Timer for voice slide
  useEffect(() => {
    const interval = setInterval(() => setTimerCount(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  // Auto-rotate slides every 4.5s
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide(s => (s + 1) % SLIDES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [SLIDES.length]);

  return (
    <section className="hero" id="hero" aria-label="Hero">
      {/* Background */}
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-dot-grid" />
        <div className="hero-noise" />
        {/* <AnimatedWaves /> */}
        <div className="hero-blob hero-blob-1" />
        <div className="hero-blob hero-blob-2" />
      </div>

      <div className="container">
        <div className="hero-inner">
          {/* ── Left Content ── */}
          <div className="hero-content">
            <h1 className="hero-headline">
              We{" "}
              <span
                className="script-text"
                style={{ color: "var(--accent)" }}
              >
                replace
              </span>{" "}
              the work<br />
              your team{" "}
              <span className="crossfade-text">
                {PHRASES.map((phrase, i) => (
                  <span
                    key={i}
                    className={`gradient-text crossfade-item${phraseIndex === i ? " active" : ""}`}
                  >
                    {phrase}
                  </span>
                ))}
              </span>
            </h1>

            <p className="hero-sub">
              Voice agents, intelligent chatbots, and automated workflows —
              built and deployed for your business in{" "}
              <strong style={{ color: "var(--text-primary)" }}>2 weeks</strong>.
            </p>

            <div className="hero-cta-row">
              <Link href="/calendar" className="btn-primary" id="hero-cta-primary">
                Book a Free Audit →
              </Link>
              <Link href="/contact" className="btn-ghost" id="hero-cta-demo">
                <span>▶</span> Watch Demo
              </Link>
            </div>

            <p className="hero-trust-line">
              No commitment. Working prototype in 14 days.
            </p>

            <div className="hero-logos">
              <p className="hero-logos-label">Automating businesses across</p>
              <div className="hero-logos-row">
                {industryLogos.map(item => (
                  <div key={item.label} className="hero-logo-item">
                    <div className="hero-logo-icon">{item.icon}</div>
                    <span className="hero-logo-label">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Stacked Cards Visual ── */}
          <div className="hero-visual">
            <div className="stacked-cards-container">
              {SLIDES.map((slide, i) => {
                const diff = (i - activeSlide + SLIDES.length) % SLIDES.length;
                let posClass = "card-hidden";
                if (diff === 0) posClass = "card-front";
                else if (diff === 1) posClass = "card-middle";
                else if (diff === 2) posClass = "card-back";
                else if (diff === 3) posClass = "card-outgoing";

                return (
                  <div
                    key={slide.id}
                    className={`stacked-card ${posClass}`}
                    onClick={() => setActiveSlide(i)}
                    style={{ cursor: "pointer" }}
                  >
                    {slide.component}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
