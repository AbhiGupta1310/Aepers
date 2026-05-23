import type { Metadata } from "next";
import Link from "next/link";
import CTASection from "@/components/CTASection";
import ScrollAnimation from "@/components/ScrollAnimation";

export const metadata: Metadata = {
  title: "RAG Chatbots — Aepers",
  description:
    "Intelligent Q&A chatbots trained on your documents. No hallucinations. Deployed as a web widget or Slack bot in 14 days.",
};

const steps = [
  { step: "01", title: "Upload your documents", body: "PDFs, Word docs, Notion pages, website content, SOPs — any format. We ingest and structure everything." },
  { step: "02", title: "We build the knowledge base", body: "Your documents are chunked, embedded, and stored in a vector database. The system learns your exact terminology and content." },
  { step: "03", title: "User asks a question", body: "The chatbot retrieves only the relevant sections from your documents and answers with direct quotes and context — no hallucinations." },
  { step: "04", title: "Deployed to your channel", body: "We embed it on your website, Slack workspace, or any tool. Your team or customers can use it instantly." },
];

export default function ChatbotsPage() {
  return (
    <>
      <section className="page-hero" style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(91,127,255,0.1) 0%, transparent 60%), var(--bg)" }}>
        <div className="container">
          <div className="page-hero-content">
            <span className="badge">⬤ Knowledge AI</span>
            <h1 className="page-hero-title">Intelligent <span className="gradient-text">Q&A Chatbot</span></h1>
            <p className="page-hero-sub">Trained on your documents. Answers in seconds. No hallucinations — because it only answers from what you've given it.</p>
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
            <h2 className="section-heading">Your documents → <span className="gradient-text">instant answers</span>.</h2>
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
            <h2 className="section-heading">Built on <span className="gradient-text">RAG architecture</span>.</h2>
            <p className="section-sub">Retrieval-Augmented Generation — the gold standard for accurate, grounded AI answers.</p>
          </ScrollAnimation>
          <div style={{ display: "flex", justifyContent: "center", marginTop: "48px" }}>
            <div className="tech-stack" style={{ justifyContent: "center" }}>
              {["OpenAI GPT-4o", "Pinecone", "LangChain", "Python", "FastAPI", "Slack API", "React Widget", "Supabase", "Next.js"].map(t => (
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
                  {["Support team answers same questions 50x/day","New hires search 10 documents to find one answer","Response time: hours or days","No consistency — different answers from different people","Knowledge trapped in PDFs nobody reads"].map(i => (
                    <li key={i} className="before-after-item"><span className="before-after-icon">✗</span>{i}</li>
                  ))}
                </ul>
              </div>
            </ScrollAnimation>
            <ScrollAnimation delay={100}>
              <div className="before-after-card after-card">
                <p className="before-after-label">✓ After</p>
                <ul className="before-after-items">
                  {["60% of support queries handled automatically","New hires onboard 3x faster with instant answers","Response time: under 3 seconds, 24/7","Consistent, accurate answers every time","All your knowledge is searchable in plain English"].map(i => (
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
