"use client";
import ScrollAnimation from "./ScrollAnimation";
import CalendarWidget from "./CalendarWidget";

export default function CTASection() {
  return (
    <section className="cta-section section-alt" id="contact" aria-label="Book a free audit">
      <div className="cta-glow" aria-hidden="true" />
      <div className="container" style={{ maxWidth: "1120px" }}>
        <div className="cta-content" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>
          <ScrollAnimation>
            <div className="section-label" style={{ justifyContent: "center" }}>
              <span className="badge">GET STARTED</span>
            </div>
          </ScrollAnimation>

          <ScrollAnimation delay={80}>
            <h2 className="cta-headline" style={{ textAlign: "center", margin: 0 }}>
              Ready to automate the{" "}
              <span className="script-text text-accent" style={{ fontSize: "1.1em", transform: "rotate(-2deg)" }}>boring work?</span>
            </h2>
          </ScrollAnimation>

          <ScrollAnimation delay={160}>
            <p className="cta-sub" style={{ textAlign: "center", maxWidth: "600px", margin: 0 }}>
              Book a free 30-minute audit. We&apos;ll show you exactly what you can automate
              and what the ROI looks like.
            </p>
          </ScrollAnimation>

          <ScrollAnimation delay={200}>
            <div className="cta-trust-signals" style={{ justifyContent: "center", gap: "24px" }}>
              <div className="cta-trust-item">
                <span className="cta-trust-check">✓</span>
                Free, no commitment
              </div>
              <div className="cta-trust-item">
                <span className="cta-trust-check">✓</span>
                Working prototype in 14 days
              </div>
              <div className="cta-trust-item">
                <span className="cta-trust-check">✓</span>
                You own 100% of the code
              </div>
            </div>
          </ScrollAnimation>

          {/* Embedded live interactive scheduler directly on the landing page */}
          <ScrollAnimation delay={240} style={{ width: "100%" }}>
            <CalendarWidget />
            <div style={{ textAlign: "center", marginTop: "32px" }}>
              <a href="mailto:iamabhids@gmail.com" style={{ fontSize: "14px", color: "var(--text-secondary)", textDecoration: "underline", fontWeight: 500 }}>
                Or contact us via email at iamabhids@gmail.com
              </a>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
