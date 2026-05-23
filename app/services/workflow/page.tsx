import type { Metadata } from "next";
import Link from "next/link";
import CTASection from "@/components/CTASection";
import ScrollAnimation from "@/components/ScrollAnimation";

export const metadata: Metadata = {
  title: "Workflow Automation — Aepers",
  description:
    "Invoice processing, onboarding, ticket routing — we map your manual processes and replace them with AI-powered pipelines. 15+ hours saved per employee per week.",
};

const steps = [
  { step: "01", title: "Process mapping", body: "We document every step of your manual workflow — inputs, decisions, outputs, and exceptions." },
  { step: "02", title: "AI pipeline design", body: "We design a pipeline that handles each step automatically: document parsing, classification, routing, and action." },
  { step: "03", title: "Integration & testing", body: "We connect to your existing tools and run the pipeline in parallel with your manual process for 1 week to verify accuracy." },
  { step: "04", title: "Handoff & monitoring", body: "We deploy, set up monitoring dashboards, and hand over full documentation. You see everything the pipeline does." },
];

export default function WorkflowPage() {
  return (
    <>
      <section className="page-hero" style={{ background: "radial-gradient(ellipse at 70% 30%, rgba(91,127,255,0.08) 0%, transparent 60%), var(--bg)" }}>
        <div className="container">
          <div className="page-hero-content">
            <span className="badge">⬤ Process AI</span>
            <h1 className="page-hero-title">End-to-End <span className="gradient-text">Workflow Automation</span></h1>
            <p className="page-hero-sub">If it&apos;s repetitive and rule-based, we automate it. Invoice processing, onboarding, ticket routing, lead assignment — running themselves while your team focuses on real work.</p>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <Link href="/#contact" className="btn-primary">Book Free Audit →</Link>
              <Link href="/#how-it-works" className="btn-ghost">How It Works</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <ScrollAnimation>
            <div className="section-label"><span className="badge">HOW IT WORKS</span></div>
            <h2 className="section-heading">Manual process → <span className="gradient-text">runs itself</span>.</h2>
          </ScrollAnimation>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "56px", maxWidth: "800px", margin: "56px auto 0" }}>
            {steps.map((s, i) => (
              <ScrollAnimation key={s.step} delay={i * 80}>
                <div className="card" style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
                  <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "rgba(91,127,255,0.1)", border: "1px solid rgba(91,127,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: 600, color: "var(--accent)", flexShrink: 0 }}>
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

      <section className="section">
        <div className="container">
          <ScrollAnimation>
            <div className="section-label"><span className="badge">TECH STACK</span></div>
            <h2 className="section-heading">Built with <span className="gradient-text">best-in-class tools</span>.</h2>
          </ScrollAnimation>
          <div style={{ display: "flex", justifyContent: "center", marginTop: "48px" }}>
            <div className="tech-stack" style={{ justifyContent: "center" }}>
              {["n8n", "LangChain", "Python", "FastAPI", "OpenAI", "Zapier", "Slack", "HubSpot API", "Google Workspace"].map(t => (
                <span key={t} className="tech-chip">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

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
                  {["Finance team manually processes 200 invoices/month","Onboarding new employees takes 3 days of HR time","Lead assignment done by hand from a spreadsheet","Reports compiled manually every Monday morning","Errors from copy-paste and human fatigue"].map(i => (
                    <li key={i} className="before-after-item"><span className="before-after-icon">✗</span>{i}</li>
                  ))}
                </ul>
              </div>
            </ScrollAnimation>
            <ScrollAnimation delay={100}>
              <div className="before-after-card after-card">
                <p className="before-after-label">✓ After</p>
                <ul className="before-after-items">
                  {["Invoices processed and filed automatically overnight","Onboarding pipeline runs itself — accounts, docs, Slack","Leads assigned to reps in under 60 seconds","Reports generated and emailed automatically","Zero errors — every action is logged and auditable"].map(i => (
                    <li key={i} className="before-after-item"><span className="before-after-icon">✓</span>{i}</li>
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
