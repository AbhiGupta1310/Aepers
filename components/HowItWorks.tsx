"use client";
import ScrollAnimation from "./ScrollAnimation";

const steps = [
  {
    number: "01",
    icon: "🔍",
    title: "We audit your workflow",
    body: "30-minute call. We map exactly what your team does manually, identify the 3 highest-ROI automations, and give you a clear recommendation. No pitch. Just value.",
    badge: "Free · No commitment",
    dayRange: "Day 1–2",
  },
  {
    number: "02",
    icon: "📄",
    title: "You get a fixed-price proposal",
    body: "Exact scope, timeline, tech stack, and cost. No surprises. You approve before we start anything.",
    badge: "Transparent proposal",
    dayRange: "Day 3",
  },
  {
    number: "03",
    icon: "⌨️",
    title: "We build your prototype",
    body: "You get progress updates every 2 days. We deploy a working version by Day 10 for your review.",
    badge: "Agile delivery",
    dayRange: "Day 4–13",
  },
  {
    number: "04",
    icon: "🚀",
    title: "Live. You own everything.",
    body: "We deploy to production, hand you full code and documentation, and set up monitoring. You own 100% of the codebase.",
    badge: "Full ownership",
    dayRange: "Day 14",
  },
];

export default function HowItWorks() {
  return (
    <section className="section section-alt" id="how-it-works" aria-label="How it works">
      <div className="container">
        <div className="section-label">
          <span className="badge">THE PROCESS</span>
        </div>
        <ScrollAnimation>
          <h2 className="section-heading">
            From first call to live in{" "}
            <span className="script-text text-accent" style={{ fontSize: "1.15em" }}>14 days</span>.
          </h2>
        </ScrollAnimation>
        <ScrollAnimation delay={100}>
          <p className="section-sub">
            We&apos;ve made it as painless as possible. Here&apos;s exactly what happens.
          </p>
        </ScrollAnimation>

        <div className="how-steps">
          {steps.map((step, i) => (
            <ScrollAnimation key={step.number} delay={i * 100}>
              <div className="how-step">
                {/* Connector line (desktop) */}
                {i < steps.length - 1 && (
                  <div className="how-step-connector" aria-hidden="true" />
                )}

                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {/* Number + day range */}
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", justifyContent: "center" }}>
                    <div className="how-step-number" aria-label={`Step ${step.number}`}>
                      {step.number}
                    </div>
                  </div>
                  <p style={{ fontSize: "12px", color: "var(--accent)", textAlign: "center", fontWeight: 500 }}>
                    {step.dayRange}
                  </p>

                  <h3 className="how-step-title" style={{ textAlign: "center" }}>
                    {step.title}
                  </h3>

                  <p className="how-step-body" style={{ textAlign: "center" }}>
                    {step.body}
                  </p>

                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <span className="badge badge-teal" style={{ fontSize: "11px" }}>
                      {step.badge}
                    </span>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>


      </div>
    </section>
  );
}
