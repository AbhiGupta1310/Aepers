"use client";
import Link from "next/link";
import { Mail, MessageSquare, MapPin } from "lucide-react";
import ScrollAnimation from "@/components/ScrollAnimation";

export default function ContactForm() {
  return (
    <div className="contact-grid">
      {/* Form */}
      <ScrollAnimation>
        <div>
          <h2 style={{ fontSize: "24px", fontWeight: 600, marginBottom: "8px" }}>Send a message</h2>
          <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginBottom: "32px" }}>
            Tell us about your business and what you want to automate.
          </p>
          <form
            className="contact-form"
            onSubmit={(e) => { e.preventDefault(); alert("Message sent! We'll reply within 4 hours."); }}
            aria-label="Contact form"
          >
            <div className="form-group">
              <label className="form-label" htmlFor="contact-name">Your name</label>
              <input id="contact-name" className="form-input" type="text" placeholder="Rahul Sharma" required />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="contact-email">Email address</label>
              <input id="contact-email" className="form-input" type="email" placeholder="rahul@company.com" required />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="contact-company">Company / Business</label>
              <input id="contact-company" className="form-input" type="text" placeholder="Sharma & Co." />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="contact-service">What are you interested in?</label>
              <select id="contact-service" className="form-input" style={{ cursor: "pointer" }}>
                <option value="">Select a service...</option>
                <option>AI Voice Agent</option>
                <option>RAG Chatbot</option>
                <option>Workflow Automation</option>
                <option>Data Dashboard</option>
                <option>Not sure — just want an audit</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="contact-message">What&apos;s the problem you want to solve?</label>
              <textarea
                id="contact-message"
                className="form-input form-textarea"
                placeholder="We currently spend 3 hours a day answering the same customer questions..."
                required
              />
            </div>
            <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
              Send Message →
            </button>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)", textAlign: "center" }}>
              We respond within 4 hours. No spam, ever.
            </p>
          </form>
        </div>
      </ScrollAnimation>

      {/* Info */}
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <ScrollAnimation delay={80}>
          <div className="contact-info-card">
            <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "4px" }}>Book a free audit call</h3>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "20px" }}>
              30 minutes. We&apos;ll map your workflow, identify the 3 highest-ROI automations, and give you a clear
              recommendation. No pitch.
            </p>
            <Link
              href="/calendar"
              className="btn-primary"
              style={{ width: "100%", justifyContent: "center" }}
              id="contact-book-call"
            >
              Open Booking Calendar →
            </Link>
          </div>
        </ScrollAnimation>

        <ScrollAnimation delay={120}>
          <div className="contact-info-card">
            <div className="contact-method">
              <div className="contact-method-icon" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Mail size={20} style={{ color: "var(--accent)" }} />
              </div>
              <div>
                <p className="contact-method-label">Email</p>
                <p className="contact-method-value">
                  <a href="mailto:iamabhids@gmail.com">iamabhids@gmail.com</a>
                </p>
              </div>
            </div>
            <div className="contact-method">
              <div className="contact-method-icon" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <MessageSquare size={20} style={{ color: "var(--accent)" }} />
              </div>
              <div>
                <p className="contact-method-label">WhatsApp</p>
                <p className="contact-method-value">
                  <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer">
                    +91 99999 99999
                  </a>
                </p>
              </div>
            </div>
            <div className="contact-method">
              <div className="contact-method-icon" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <MapPin size={20} style={{ color: "var(--accent)" }} />
              </div>
              <div>
                <p className="contact-method-label">Location</p>
                <p className="contact-method-value">Bengaluru, India</p>
              </div>
            </div>
            <p className="footer-response" style={{ marginTop: "8px" }}>
              <span>⬤</span> We reply within 4 hours
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation delay={160}>
          <div className="how-callout" style={{ marginTop: "0" }}>
            <div className="how-callout-inner">
              <p className="how-callout-text" style={{ fontSize: "16px" }}>
                <strong>Not sure what to automate?</strong>{" "}
                That&apos;s fine — the free audit is designed exactly for that. We&apos;ll tell you what&apos;s worth
                automating and what isn&apos;t.
              </p>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  );
}
