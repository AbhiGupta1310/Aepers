"use client";
import { useState } from "react";
import Link from "next/link";
import ScrollAnimation from "./ScrollAnimation";

const pricingPlans = [
  {
    id: "starter",
    badge: "For small businesses",
    name: "Starter",
    price: "Starting at ₹1.5L",
    priceSub: "one-time setup",
    featured: false,
    features: [
      "1 service (chatbot or voice agent)",
      "Up to 2 integrations",
      "Deployed and tested",
      "30-day support included",
      "Full code ownership",
    ],
    cta: "Book Free Audit →",
    ctaHref: "/#contact",
  },
  {
    id: "growth",
    badge: "Most popular",
    name: "Growth",
    price: "Starting at ₹3L",
    priceSub: "one-time setup + monthly retainer",
    featured: true,
    features: [
      "2–3 services bundled",
      "Unlimited integrations",
      "Priority 14-day delivery",
      "90-day support + monitoring",
      "Full code ownership",
      "Monthly performance reports",
    ],
    cta: "Book Free Audit →",
    ctaHref: "/#contact",
  },
  {
    id: "enterprise",
    badge: "For scaling teams",
    name: "Enterprise",
    price: "Custom",
    priceSub: "talk to us",
    featured: false,
    features: [
      "Full workflow audit",
      "Custom LLM fine-tuning",
      "White-label product options",
      "SLA-backed support",
      "Dedicated account manager",
      "Team training included",
    ],
    cta: "Schedule a Call →",
    ctaHref: "/contact",
  },
];

const faqs = [
  {
    q: "Do I own the code after you build it?",
    a: "Yes — 100%. We hand over the entire codebase, documentation, and all credentials at launch. No subscriptions, no platform lock-in. The code is yours to host, modify, or hand to any developer.",
  },
  {
    q: "What if I need changes after launch?",
    a: "All plans include post-launch support (30–90 days depending on tier). After that, we offer affordable monthly maintenance retainers or you can handle changes yourself with your own team — we'll document everything.",
  },
  {
    q: "How is this different from using ChatGPT directly?",
    a: "ChatGPT is a general-purpose tool. We build custom AI systems trained on your specific data, connected to your tools (CRM, calendar, Slack, etc.), and designed for your exact workflows. It's the difference between a hammer and a purpose-built machine.",
  },
  {
    q: "Can you integrate with our existing tools?",
    a: "Yes. We integrate with CRMs (HubSpot, Salesforce, Zoho), calendars (Google, Calendly), messaging (WhatsApp, Slack, Email), accounting tools (Tally, QuickBooks), and any tool with an API. We'll scope this in the free audit.",
  },
  {
    q: "What happens if the AI gets something wrong?",
    a: "We build fallback logic into every system — the AI knows when to escalate to a human. For voice agents, complex queries get transferred to your team. For chatbots, there's always a \"talk to a human\" option. We also include monitoring so you can see exactly what the AI is handling.",
  },
];

export default function Pricing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="section section-alt" id="pricing" aria-label="Pricing">
      <div className="container">
        <div className="section-label">
          <span className="badge">INVESTMENT</span>
        </div>
        <ScrollAnimation>
          <h2 className="section-heading">
            Clear pricing.{" "}
            <span className="gradient-text">No retainers you don&apos;t need.</span>
          </h2>
        </ScrollAnimation>
        <ScrollAnimation delay={100}>
          <p className="section-sub">
            Every engagement starts with a free audit. Pricing is fixed — no hourly billing, no surprises.
          </p>
        </ScrollAnimation>

        <div className="pricing-grid">
          {pricingPlans.map((plan, i) => (
            <ScrollAnimation key={plan.id} delay={i * 80}>
              {plan.featured ? (
                <div className="pricing-card featured" id={`pricing-${plan.id}`} aria-label="Most popular plan">
                  <div className="pricing-featured-border" aria-hidden="true" />
                  <div className="pricing-featured-inner">
                    <div className="pricing-header">
                      <span className="badge badge-gradient">{plan.badge}</span>
                      <h3 style={{ fontSize: "22px", fontWeight: 600, marginTop: "8px" }}>{plan.name}</h3>
                      <p className="pricing-price">{plan.price}</p>
                      <p className="pricing-price-sub">{plan.priceSub}</p>
                    </div>
                    <div className="pricing-divider" />
                    <ul className="pricing-features">
                      {plan.features.map((f) => (
                        <li key={f} className="pricing-feature">
                          <span className="pricing-feature-check">✓</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Link href={plan.ctaHref} className="btn-primary" style={{ textAlign: "center", justifyContent: "center" }}>
                      {plan.cta}
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="pricing-card" id={`pricing-${plan.id}`}>
                  <div className="pricing-header">
                    <span className="badge">{plan.badge}</span>
                    <h3 style={{ fontSize: "22px", fontWeight: 600, marginTop: "8px" }}>{plan.name}</h3>
                    <p className="pricing-price">{plan.price}</p>
                    <p className="pricing-price-sub">{plan.priceSub}</p>
                  </div>
                  <div className="pricing-divider" />
                  <ul className="pricing-features">
                    {plan.features.map((f) => (
                      <li key={f} className="pricing-feature">
                        <span className="pricing-feature-check">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={plan.ctaHref}
                    className={plan.featured ? "btn-primary" : "btn-ghost"}
                    style={{ textAlign: "center", justifyContent: "center" }}
                  >
                    {plan.cta}
                  </Link>
                </div>
              )}
            </ScrollAnimation>
          ))}
        </div>

        {/* FAQ */}
        <div className="faq-section">
          <h3 className="faq-title">Frequently Asked Questions</h3>
          <div className="faq-list" role="list">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`faq-item${openFaq === i ? " open" : ""}`}
                role="listitem"
              >
                <button
                  className="faq-question"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  id={`faq-q-${i}`}
                  aria-controls={`faq-a-${i}`}
                >
                  {faq.q}
                  <svg
                    className="faq-chevron"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 8l5 5 5-5" />
                  </svg>
                </button>
                <div
                  className="faq-answer"
                  id={`faq-a-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                >
                  <p className="faq-answer-inner">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
