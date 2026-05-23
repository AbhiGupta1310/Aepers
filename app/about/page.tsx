import type { Metadata } from "next";
import Link from "next/link";
import { Zap, Unlock, BarChart3, Handshake } from "lucide-react";
import CTASection from "@/components/CTASection";
import ScrollAnimation from "@/components/ScrollAnimation";

export const metadata: Metadata = {
  title: "About — Aepers",
  description:
    "Aepers is an AI automation agency based in Bengaluru, India. We build voice agents, chatbots, and workflow automation for businesses globally.",
};

const values = [
  {
    icon: <Zap size={32} style={{ color: "var(--accent)" }} />,
    title: "Speed without shortcuts",
    desc: "14 days isn't just a promise — it's our process. We've built a delivery system that eliminates the wasted weeks that bloat most agency timelines.",
  },
  {
    icon: <Unlock size={32} style={{ color: "var(--accent)" }} />,
    title: "Full ownership, always",
    desc: "Every line of code we write is yours. No SaaS lock-in, no proprietary platform, no dependencies on us to keep your product running.",
  },
  {
    icon: <BarChart3 size={32} style={{ color: "var(--accent)" }} />,
    title: "ROI-first thinking",
    desc: "We don't build AI for the sake of AI. We start with the business problem and work backwards to the right solution — only if it genuinely improves your numbers.",
  },
  {
    icon: <Handshake size={32} style={{ color: "var(--accent)" }} />,
    title: "Radical transparency",
    desc: "Fixed-price proposals. Progress updates every 2 days. No hidden fees, no scope creep without your approval. You always know exactly where we are.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-content" style={{ maxWidth: "800px" }}>
            <span className="badge">ABOUT AEPERS</span>
            <h1 className="page-hero-title">
              Built by engineers who were tired of watching businesses waste hours on{" "}
              <span className="gradient-text">work that shouldn&apos;t exist</span>.
            </h1>
            <p className="page-hero-sub">
              We started Aepers after watching our own teams spend 30% of every workday on tasks that were obviously automatable — data entry, answering the same questions, scheduling, routing. We built the tools to fix it. Now we build them for you.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section section-alt">
        <div className="container">
          <div style={{ maxWidth: "760px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "28px" }}>
            <ScrollAnimation>
              <div className="section-label" style={{ justifyContent: "flex-start" }}>
                <span className="badge">OUR STORY</span>
              </div>
              <h2 style={{ fontSize: "36px", fontWeight: 600, lineHeight: 1.2, margin: "16px 0" }}>
                Why we started, and why it matters.
              </h2>
            </ScrollAnimation>
            <ScrollAnimation delay={80}>
              <p style={{ fontSize: "17px", color: "var(--text-secondary)", lineHeight: 1.8 }}>
                We&apos;re a small team of engineers and product builders from Bengaluru with backgrounds in AI, backend systems, and product. We&apos;ve built products used by millions of people — and we&apos;ve also spent years watching small and medium businesses struggle with problems that 2024-era AI should have already solved.
              </p>
            </ScrollAnimation>
            <ScrollAnimation delay={120}>
              <p style={{ fontSize: "17px", color: "var(--text-secondary)", lineHeight: 1.8 }}>
                The problem isn&apos;t that AI doesn&apos;t exist — it&apos;s that most businesses don&apos;t have the in-house engineering team to deploy it properly. And most agencies either take too long, charge too much, or leave you with a product you can&apos;t modify without paying them again.
              </p>
            </ScrollAnimation>
            <ScrollAnimation delay={160}>
              <p style={{ fontSize: "17px", color: "var(--text-secondary)", lineHeight: 1.8 }}>
                Aepers exists to change that. We deliver real, working automation in 14 days. We hand you the code. We charge a fair, fixed price. And we measure success by one thing: did your business actually get better?
              </p>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section">
        <div className="container">
          <ScrollAnimation>
            <div className="section-label"><span className="badge">OUR VALUES</span></div>
            <h2 className="section-heading">How we work.</h2>
          </ScrollAnimation>
          <div className="values-grid" style={{ marginTop: "48px" }}>
            {values.map((v, i) => (
              <ScrollAnimation key={v.title} delay={i * 80}>
                <div className="value-card">
                  <div className="value-icon" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {v.icon}
                  </div>
                  <h3 className="value-title">{v.title}</h3>
                  <p className="value-desc">{v.desc}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section section-alt">
        <div className="container">
          <ScrollAnimation>
            <div className="section-label"><span className="badge">THE TEAM</span></div>
            <h2 className="section-heading">Small team. <span className="gradient-text">Serious output</span>.</h2>
            <p className="section-sub">We keep the team small intentionally. Every project gets senior attention, not a junior handoff.</p>
          </ScrollAnimation>
          <div style={{ display: "flex", justifyContent: "center", marginTop: "48px" }}>
            <div className="card" style={{ maxWidth: "480px", textAlign: "center", display: "flex", flexDirection: "column", gap: "20px", alignItems: "center" }}>
              <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "var(--gradient)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px", fontWeight: 700, color: "white" }}>A</div>
              <div>
                <h3 style={{ fontSize: "20px", fontWeight: 600 }}>Founding Team</h3>
                <p style={{ fontSize: "14px", color: "var(--accent)", marginTop: "4px" }}>AI Engineers · Bengaluru, India</p>
              </div>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                Engineering background across AI/ML, backend systems, and product. We&apos;ve shipped production systems used at scale and now apply that experience to SMB automation.
              </p>
              <div style={{ display: "flex", gap: "12px" }}>
                <span className="tech-chip">AI / ML</span>
                <span className="tech-chip">Python</span>
                <span className="tech-chip">LangChain</span>
                <span className="tech-chip">Next.js</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
