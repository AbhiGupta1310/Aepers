"use client";
import Link from "next/link";
import { Mail, Bot, Database } from "lucide-react";
import ScrollAnimation from "./ScrollAnimation";

const services = [
  {
    id: "voice-agents",
    badgeClass: "badge-teal",
    badgeText: "⬤ Live Voice · NEW",
    title: "AI Receptionist & Voice Agent",
    tagline: "Answers every call. Books appointments. Never takes a day off.",
    description:
      "We build AI phone agents that handle inbound calls for your business — in a natural human voice, 24/7. The agent understands callers, takes action (booking, SMS, CRM updates), and escalates only when needed.",
    chips: ["Clinics", "Restaurants", "Real Estate", "Salons", "Law Firms"],
    metric: "↓ 80% of calls handled without human involvement",
    href: "/services/voice-agents",
    visual: "waveform",
  },
  {
    id: "chatbots",
    badgeClass: "",
    badgeText: "⬤ Knowledge AI",
    title: "Intelligent Q&A Chatbot",
    tagline: "Trained on your documents. Answers in seconds. No hallucinations.",
    description:
      "Upload your PDFs, wikis, SOPs, and product docs. We build a chatbot that reads all of it and answers questions accurately — for your customers or your internal team. Deployed as a web widget or Slack bot.",
    chips: ["Customer Support", "HR Helpdesk", "IT FAQ", "Knowledge Base", "Sales Enablement"],
    metric: "↓ 60% reduction in repetitive support tickets",
    href: "/services/chatbots",
    visual: "chat",
  },
  {
    id: "workflow",
    badgeClass: "",
    badgeText: "⬤ Process AI",
    title: "End-to-End Workflow Automation",
    tagline: "If it's repetitive and rule-based, we automate it.",
    description:
      "Invoice processing, employee onboarding, ticket routing, lead assignment — we map your manual processes and replace them with AI-powered pipelines that run themselves. Built with Python, n8n, and LangChain agents.",
    chips: ["Finance Ops", "HR Onboarding", "Sales CRM", "Ticket Routing", "Report Generation"],
    metric: "↓ 15+ hours saved per employee per week",
    href: "/services/workflow",
    visual: "flow",
  },
  {
    id: "dashboards",
    badgeClass: "",
    badgeText: "⬤ Data AI",
    title: "Data Pipelines & NL Dashboards",
    tagline: "Ask your business data a question. Get an answer.",
    description:
      "We connect your data sources, clean them, and build dashboards with natural language querying — type 'what were our top 5 products last month?' and get a chart back. No SQL required for your team.",
    chips: ["Business Intelligence", "Sales Analytics", "Finance Reports", "Ops Dashboards"],
    metric: "↓ Reports that used to take 4 hours now take 4 seconds",
    href: "/services/dashboards",
    visual: "chart",
  },
];

function WaveformVisual() {
  return (
    <div className="service-visual">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
        <div className="waveform" aria-label="Active call waveform">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="waveform-bar" />
          ))}
        </div>
        <span style={{ fontSize: "12px", color: "var(--accent-teal)" }}>Active call in progress</span>
      </div>
    </div>
  );
}

function ChatVisual() {
  return (
    <div className="service-visual">
      <div className="chat-mockup" aria-label="Chat demo">
        <div className="chat-msg user">
          <div className="chat-bubble user-bubble">What&apos;s our return policy?</div>
        </div>
        <div className="chat-msg">
          <div className="chat-bubble">
            Our return policy allows returns within 30 days of purchase with a full refund.
          </div>
        </div>
      </div>
    </div>
  );
}

function FlowVisual() {
  return (
    <div className="service-visual">
      <div className="flow-diagram" aria-label="Workflow diagram" style={{ gap: "6px" }}>
        <div className="flow-node" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Mail size={14} style={{ color: "var(--accent)" }} />
          <span>Email</span>
        </div>
        <div className="flow-arrow">→</div>
        <div className="flow-node" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Bot size={14} style={{ color: "var(--accent)" }} />
          <span>AI Agent</span>
        </div>
        <div className="flow-arrow">→</div>
        <div className="flow-node" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Database size={14} style={{ color: "var(--accent)" }} />
          <span>CRM</span>
        </div>
      </div>
    </div>
  );
}

function ChartVisual() {
  const heights = [40, 65, 30, 80, 55, 70, 45];
  return (
    <div className="service-visual" style={{ flexDirection: "column", alignItems: "stretch" }}>
      <div className="mini-chart" aria-label="Analytics chart">
        <div className="chart-bars">
          {heights.map((h, i) => (
            <div
              key={i}
              className="chart-bar"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <div className="chart-input">
          <span style={{ color: "var(--accent-teal)" }}>▸</span>
          Show revenue by region this quarter
          <span className="chart-cursor" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

const visualMap: Record<string, React.ReactNode> = {
  waveform: <WaveformVisual />,
  chat: <ChatVisual />,
  flow: <FlowVisual />,
  chart: <ChartVisual />,
};

export default function Services() {
  return (
    <section className="section" id="services" aria-label="Services">
      <div className="container">
        <div className="section-label">
          <span className="badge">WHAT WE BUILD</span>
        </div>
        <ScrollAnimation>
          <h2 className="section-heading">
            Four services. One outcome —{" "}
            <span className="script-text text-accent" style={{ fontSize: "1.15em" }}>less manual work</span>.
          </h2>
        </ScrollAnimation>
        <ScrollAnimation delay={100}>
          <p className="section-sub">
            Pick the ones that fit your business, or let us audit and recommend.
          </p>
        </ScrollAnimation>

        <div className="services-grid">
          {services.map((svc, i) => (
            <ScrollAnimation key={svc.id} delay={i * 80}>
              <div className="service-card" id={`service-${svc.id}`}>
                <div className="service-card-header">
                  <span className={`badge ${svc.badgeClass}`}>{svc.badgeText}</span>
                  <h3 className="service-title">{svc.title}</h3>
                  <p className="service-tagline">{svc.tagline}</p>
                </div>

                <p className="service-desc">{svc.description}</p>

                {visualMap[svc.visual]}

                <div className="service-chips">
                  {svc.chips.map((chip) => (
                    <span key={chip} className="service-chip">{chip}</span>
                  ))}
                </div>

                <p className="service-metric">{svc.metric}</p>

                <Link href={svc.href} className="service-cta-link">
                  See how it works →
                </Link>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
