import type { Metadata } from "next";
import Link from "next/link";
import CTASection from "@/components/CTASection";
import ScrollAnimation from "@/components/ScrollAnimation";

export const metadata: Metadata = {
  title: "AI Voice Agents — Aepers",
  description:
    "We build AI phone agents that handle inbound calls 24/7 — booking, SMS, CRM updates. Deployed in 14 days. Starting at ₹1.5L.",
};

const steps = [
  {
    step: "01",
    title: "Call comes in",
    body: "Your customer calls your business number. The AI answers in under 1 second — no hold music, no IVR maze.",
  },
  {
    step: "02",
    title: "AI understands intent",
    body: "Using advanced speech recognition and NLP, the agent understands what the caller wants — booking, FAQ, complaint, or escalation.",
  },
  {
    step: "03",
    title: "Action taken in real time",
    body: "The agent checks your calendar, CRM, or database and takes action — booking an appointment, updating a record, or answering the query.",
  },
  {
    step: "04",
    title: "Confirmation sent",
    body: "The caller gets an SMS or WhatsApp confirmation. Your CRM is updated. Your team gets notified if needed. The agent handled it end-to-end.",
  },
];

export default function VoiceAgentsPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="page-hero"
        style={{
          background: "radial-gradient(ellipse at 20% 50%, rgba(0,212,170,0.08) 0%, transparent 60%), var(--bg)",
        }}
      >
        <div className="container">
          <div className="page-hero-content">
            <span className="badge badge-teal">⬤ Live Voice · NEW</span>
            <h1 className="page-hero-title">
              AI Receptionist &{" "}
              <span className="gradient-text">Voice Agent</span>
            </h1>
            <p className="page-hero-sub">
              Answers every call. Books appointments. Handles FAQs. Never takes a day off, never puts callers on hold, never needs a lunch break.
            </p>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <Link href="/#contact" className="btn-primary">Book Free Audit →</Link>
              <Link href="/#how-it-works" className="btn-ghost">How It Works</Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section section-alt">
        <div className="container">
          <ScrollAnimation>
            <div className="section-label"><span className="badge">HOW IT WORKS</span></div>
            <h2 className="section-heading">A call comes in. <span className="gradient-text">AI handles it.</span></h2>
          </ScrollAnimation>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "56px", maxWidth: "800px", margin: "56px auto 0" }}>
            {steps.map((s, i) => (
              <ScrollAnimation key={s.step} delay={i * 80}>
                <div className="card" style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
                  <div style={{
                    width: "48px", height: "48px", borderRadius: "50%",
                    background: "rgba(0,212,170,0.1)", border: "1px solid rgba(0,212,170,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "16px", fontWeight: 600, color: "var(--accent-teal)", flexShrink: 0
                  }}>
                    {s.step}
                  </div>
                  <div>
                    <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "8px" }}>{s.title}</h3>
                    <p style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.7 }}>{s.body}</p>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Tech stack */}
      <section className="section">
        <div className="container">
          <ScrollAnimation>
            <div className="section-label"><span className="badge">TECH STACK</span></div>
            <h2 className="section-heading">Built on <span className="gradient-text">enterprise-grade tech</span>.</h2>
            <p className="section-sub">Every component is open-source, battle-tested, and yours to own.</p>
          </ScrollAnimation>
          <div style={{ display: "flex", justifyContent: "center", marginTop: "48px" }}>
            <div className="tech-stack" style={{ justifyContent: "center" }}>
              {["Twilio", "OpenAI Whisper", "GPT-4o", "ElevenLabs", "LangChain", "Python", "FastAPI", "Redis", "PostgreSQL"].map(t => (
                <span key={t} className="tech-chip">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Before / After */}
      <section className="section section-alt">
        <div className="container">
          <ScrollAnimation>
            <div className="section-label"><span className="badge">BEFORE & AFTER</span></div>
            <h2 className="section-heading">The <span className="gradient-text">transformation</span>.</h2>
          </ScrollAnimation>
          <div className="before-after">
            <ScrollAnimation>
              <div className="before-after-card before-card">
                <p className="before-after-label">✗ Before</p>
                <ul className="before-after-items">
                  {[
                    "Calls go to voicemail after hours",
                    "Receptionist handles 80+ calls/day manually",
                    "Booking errors and double-bookings",
                    "Callers wait on hold during peak hours",
                    "No data on call volume or patterns",
                  ].map(i => (
                    <li key={i} className="before-after-item">
                      <span className="before-after-icon">✗</span>{i}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollAnimation>
            <ScrollAnimation delay={100}>
              <div className="before-after-card after-card">
                <p className="before-after-label">✓ After</p>
                <ul className="before-after-items">
                  {[
                    "Every call answered in under 1 second, 24/7",
                    "80%+ of calls handled without human intervention",
                    "Zero booking errors — synced to your calendar",
                    "Instant response, no hold time ever",
                    "Full call analytics dashboard included",
                  ].map(i => (
                    <li key={i} className="before-after-item">
                      <span className="before-after-icon">✓</span>{i}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
