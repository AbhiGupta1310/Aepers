"use client";

import { Stethoscope, Home, Scale, Utensils, ShoppingCart, Users } from "lucide-react";
import ScrollAnimation from "./ScrollAnimation";

const industries = [
  {
    icon: <Stethoscope size={24} style={{ color: "var(--accent)" }} />,
    name: "Healthcare & Clinics",
    description:
      "Voice agent books appointments 24/7, sends SMS reminders, answers common patient FAQs, and reduces front-desk calls by 70% — without hiring extra staff.",
    example: "→ Dr. Sharma's clinic: 240 calls/month automated. 0 missed appointments.",
  },
  {
    icon: <Home size={24} style={{ color: "var(--accent)" }} />,
    name: "Real Estate",
    description:
      "Qualifies inbound leads via voice, schedules property viewings, updates CRM automatically, and follows up with WhatsApp messages — so agents focus on closing.",
    example: "→ Lead qualifier bot screens 50+ inquiries/day without agent time.",
  },
  {
    icon: <Scale size={24} style={{ color: "var(--accent)" }} />,
    name: "Legal & CA Firms",
    description:
      "Intake calls screen potential clients, answer document checklist FAQs, book consultations, and send follow-up emails automatically — freeing your team for billable work.",
    example: "→ Consultation bookings up 3x. Zero missed inquiries after hours.",
  },
  {
    icon: <Utensils size={24} style={{ color: "var(--accent)" }} />,
    name: "Restaurants & Hospitality",
    description:
      "AI receptionist takes table reservations, answers menu questions, handles cancellations, and sends confirmation messages — even during peak rush hours.",
    example: "→ 85% of reservations now handled without staff involvement.",
  },
  {
    icon: <ShoppingCart size={24} style={{ color: "var(--accent)" }} />,
    name: "E-commerce & Retail",
    description:
      "Chatbot answers order status, return policy, and product questions — integrated with your Shopify or WooCommerce store. Available 24/7 in multiple languages.",
    example: "→ Support tickets reduced by 60%. CSAT score up 28%.",
  },
  {
    icon: <Users size={24} style={{ color: "var(--accent)" }} />,
    name: "HR & Internal Ops",
    description:
      "Employee helpdesk bot answers leave policy, expense claims, and IT requests — reducing HR team tickets by 60% and letting your HR team focus on people.",
    example: "→ 200+ monthly HR queries automated. Response time: instant.",
  },
];

export default function UseCases() {
  return (
    <section className="section" id="use-cases" aria-label="Industries we serve">
      <div className="container">
        <div className="section-label">
          <span className="badge">WHO WE BUILD FOR</span>
        </div>
        <ScrollAnimation>
          <h2 className="section-heading">
            Built for businesses that run on{" "}
            <span className="gradient-text">people doing repetitive work</span>.
          </h2>
        </ScrollAnimation>
        <ScrollAnimation delay={100}>
          <p className="section-sub">
            If your team spends time on tasks a smart system could handle, we can automate it.
          </p>
        </ScrollAnimation>

        <div className="use-cases-grid">
          {industries.map((industry, i) => (
            <ScrollAnimation key={industry.name} delay={i * 70}>
              <div className="use-case-card" id={`industry-${industry.name.toLowerCase().replace(/[^a-z]/g, "-")}`}>
                <div className="use-case-icon" aria-hidden="true" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {industry.icon}
                </div>
                <h3 className="use-case-name">{industry.name}</h3>
                <p className="use-case-desc">{industry.description}</p>
                <div className="use-case-example">{industry.example}</div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
