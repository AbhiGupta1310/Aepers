import type { Metadata } from "next";
import Link from "next/link";
import CTASection from "@/components/CTASection";
import ScrollAnimation from "@/components/ScrollAnimation";

export const metadata: Metadata = {
  title: "Data Pipelines & Dashboards — Aepers",
  description:
    "Ask your business data a question. Get an answer. Natural language dashboards with no SQL required. Connected to all your data sources.",
};

const steps = [
  { step: "01", title: "Connect your data sources", body: "We connect to your databases, Google Sheets, Salesforce, Shopify, accounting tools, or any API. No data migration needed." },
  { step: "02", title: "Build the pipeline", body: "We clean, normalize, and structure your data. Set up automated sync so your dashboard is always up to date." },
  { step: "03", title: "Natural language interface", body: "We build an NL query layer — your team types questions in plain English and gets charts, tables, and insights back." },
  { step: "04", title: "Deploy & train your team", body: "Deployed to your preferred environment. We train your team to use it and set up automated weekly report emails." },
];

export default function DashboardsPage() {
  return (
    <>
      <section className="page-hero" style={{ background: "radial-gradient(ellipse at 80% 60%, rgba(91,127,255,0.08) 0%, transparent 60%), var(--bg)" }}>
        <div className="container">
          <div className="page-hero-content">
            <span className="badge">⬤ Data AI</span>
            <h1 className="page-hero-title">Data Pipelines & <span className="gradient-text">NL Dashboards</span></h1>
            <p className="page-hero-sub">Ask your business data a question. Get an answer. No SQL, no waiting for a data team — just type and get a chart.</p>
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
            <h2 className="section-heading">Your data → <span className="gradient-text">instant insights</span>.</h2>
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
            <h2 className="section-heading">Built on <span className="gradient-text">modern data stack</span>.</h2>
          </ScrollAnimation>
          <div style={{ display: "flex", justifyContent: "center", marginTop: "48px" }}>
            <div className="tech-stack" style={{ justifyContent: "center" }}>
              {["dbt", "Airbyte", "PostgreSQL", "BigQuery", "Python", "LangChain SQL", "Metabase", "OpenAI", "Apache Airflow"].map(t => (
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
                  {["Weekly reports take 4 hours to compile manually","Data sits in 5 different tools, never in one place","CEO has to ask data team for every insight","Month-end analysis takes 2 days","Business decisions made on stale data"].map(i => (
                    <li key={i} className="before-after-item"><span className="before-after-icon">✗</span>{i}</li>
                  ))}
                </ul>
              </div>
            </ScrollAnimation>
            <ScrollAnimation delay={100}>
              <div className="before-after-card after-card">
                <p className="before-after-label">✓ After</p>
                <ul className="before-after-items">
                  {["Reports generated in 4 seconds, delivered to your inbox","All data unified in one dashboard, always synced","Anyone can get answers by typing a question","Month-end closes instantly with automated analysis","Real-time data — decisions backed by fresh numbers"].map(i => (
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
