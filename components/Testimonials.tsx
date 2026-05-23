"use client";
import ScrollAnimation from "./ScrollAnimation";

const featuredTestimonial = {
  quote:
    "We went from missing 40% of after-hours calls to zero missed calls. The voice agent paid for itself in the first month — and our front desk team can now focus on patients who are actually in the clinic.",
  name: "Dr. Priya Sharma",
  role: "Clinic Owner",
  company: "Bengaluru",
  initials: "PS",
  metric: "0",
  metricLabel: "missed calls since deployment",
};

const testimonials = [
  {
    stars: "★★★★★",
    text: "We were spending 3 hours a day answering the same WhatsApp questions about our products. The RAG chatbot handles all of it now. I haven't answered a basic product question in 6 weeks.",
    name: "Rahul Mehta",
    role: "Founder, D2C Brand",
    initials: "RM",
  },
  {
    stars: "★★★★★",
    text: "Our HR team was drowning in leave requests and policy questions. The internal helpdesk bot cut our ticket volume by 65% in the first month. Our HR head finally has time to do actual HR work.",
    name: "Anita Krishnan",
    role: "Operations Head, Tech Startup",
    initials: "AK",
  },
  {
    stars: "★★★★★",
    text: "The invoice processing automation alone saved us 20+ hours a week. What used to take our finance team a full day now runs overnight automatically. ROI was clear in week one.",
    name: "Suresh Patel",
    role: "CFO, Manufacturing Co.",
    initials: "SP",
  },
  {
    stars: "★★★★★",
    text: "We were skeptical — we'd tried two other agencies before. Aepers delivered a working prototype in 10 days. Clean code, great documentation, and they actually taught us how it works.",
    name: "Meera Joshi",
    role: "CEO, Real Estate Firm",
    initials: "MJ",
  },
];

export default function Testimonials() {
  return (
    <section className="section" id="testimonials" aria-label="Client testimonials">
      <div className="container">
        <div className="section-label">
          <span className="badge">RESULTS</span>
        </div>
        <ScrollAnimation>
          <h2 className="section-heading">
            What happens when you{" "}
            <span className="script-text text-accent" style={{ fontSize: "1.1em" }}>stop doing things manually</span>.
          </h2>
        </ScrollAnimation>

        {/* Featured testimonial */}
        <div className="testimonials-featured">
          <ScrollAnimation>
            <div className="testimonial-featured-card">
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "32px", flexWrap: "wrap" }}>
                <blockquote
                  className="testimonial-quote"
                  style={{ flex: "1", minWidth: "280px" }}
                >
                  &ldquo;{featuredTestimonial.quote}&rdquo;
                </blockquote>
                <div style={{ textAlign: "center", flexShrink: 0 }}>
                  <p className="testimonial-metric">{featuredTestimonial.metric}</p>
                  <p className="testimonial-metric-label">{featuredTestimonial.metricLabel}</p>
                </div>
              </div>
              <div className="testimonial-author">
                <div className="testimonial-avatar" aria-hidden="true">
                  {featuredTestimonial.initials}
                </div>
                <div className="testimonial-author-info">
                  <p className="testimonial-author-name">{featuredTestimonial.name}</p>
                  <p className="testimonial-author-role">
                    {featuredTestimonial.role} · {featuredTestimonial.company}
                  </p>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>

        {/* Grid */}
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <ScrollAnimation key={i} delay={i * 80}>
              <div className="testimonial-card">
                <p className="testimonial-stars" aria-label="5 out of 5 stars">{t.stars}</p>
                <blockquote className="testimonial-text">
                  &ldquo;{t.text}&rdquo;
                </blockquote>
                <div className="testimonial-author">
                  <div
                    className="testimonial-avatar"
                    style={{ width: "40px", height: "40px", fontSize: "14px" }}
                    aria-hidden="true"
                  >
                    {t.initials}
                  </div>
                  <div className="testimonial-author-info">
                    <p className="testimonial-author-name" style={{ fontSize: "14px" }}>{t.name}</p>
                    <p className="testimonial-author-role" style={{ fontSize: "12px" }}>{t.role}</p>
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
