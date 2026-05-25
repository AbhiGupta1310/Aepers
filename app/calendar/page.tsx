"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ScrollAnimation from "@/components/ScrollAnimation";
import CalendarWidget from "@/components/CalendarWidget";

export default function CalendarPage() {
  return (
    <section className="section" style={{ paddingTop: "60px", paddingBottom: "80px" }}>
      <div className="container" style={{ maxWidth: "1120px" }}>
        {/* Back button */}
        <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: "32px" }}>
          <Link href="/" className="btn-ghost" style={{ padding: "8px 16px", fontSize: "14px", display: "inline-flex", alignItems: "center", gap: "8px" }}>
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>

        {/* Cal.com style Book a Demo Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1 style={{ fontSize: "38px", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
            Book a <span style={{ color: "var(--accent)" }}>Demo</span>
          </h1>
          <p style={{ fontSize: "16px", color: "var(--text-secondary)", marginTop: "12px", maxWidth: "600px", marginLeft: "auto", marginRight: "auto", lineHeight: 1.5 }}>
            See how Aepers&apos;s AI agents can resolve IT tickets, manage access, and automate workflows for your team.
          </p>
        </div>

        <ScrollAnimation>
          <CalendarWidget />
        </ScrollAnimation>
      </div>
    </section>
  );
}
