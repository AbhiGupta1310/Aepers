import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Aepers",
  description:
    "Book a free 30-minute audit or send us a message. We reply within 4 hours.",
};

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-content">
            <span className="badge">CONTACT</span>
            <h1 className="page-hero-title">
              Let&apos;s talk about what you can{" "}
              <span className="gradient-text">automate</span>.
            </h1>
            <p className="page-hero-sub">
              Book a free 30-minute audit or drop us a message. We&apos;ll respond within 4 hours.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
