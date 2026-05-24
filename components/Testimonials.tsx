"use client";
import Link from "next/link";
import ScrollAnimation from "./ScrollAnimation";

const scenarios = [
  {
    id: "voice",
    badge: "AI Voice Agent",
    before: "Your clinic phone rings at 7pm. Nobody answers. The patient calls a competitor, books there, and you never know it happened. Your front desk team is handling calls during appointments, putting people on hold, and manually typing bookings into your calendar. You're losing patients to missed calls every single day.",
    after: "Every call gets answered in 2 rings, any time of day or night, in a natural voice that knows your services and availability. Appointments book directly into your calendar. The caller gets an SMS confirmation. Your front desk team handles patients in the room — not the phone.",
  },
  {
    id: "chatbot",
    badge: "Q&A Chatbot",
    before: "Your team gets the same 15 questions over and over — \"what's our leave policy\", \"how do I raise an expense\", \"what's the return process\". Someone has to stop what they're doing to answer. The answer is already written down somewhere in a PDF nobody can find. This happens 20 times a day.",
    after: "A chatbot trained on every document you have answers those 15 questions instantly, any time, from a widget on your internal portal or Slack. Your team types the question and gets the exact answer in 3 seconds. Nobody interrupts anyone for basic information again.",
  },
  {
    id: "workflow",
    badge: "Workflow Automation",
    before: "An invoice arrives by email. Someone downloads it, reads it, copies the vendor name and amount into a spreadsheet, emails the finance team, and then moves it to a folder. This takes 12 minutes. It happens 30 times a week. That's 6 hours of your team doing copy-paste work that adds zero value.",
    after: "The invoice arrives by email and the automation reads it, extracts every field, updates the spreadsheet, notifies the finance team, and files it — in 40 seconds, with zero human involvement. Your team does 30 extra hours of actual work every week instead.",
  },
  {
    id: "dashboards",
    badge: "Data Dashboards",
    before: "Your head of sales asks \"what were our top products last month by region?\" Someone spends 2 hours pulling data from 3 different spreadsheets, cleaning it, and building a chart in Excel. By the time the chart is ready, the meeting it was needed for is over. This happens every week.",
    after: "They type the question into the dashboard. The answer — a chart, a table, the exact numbers — appears in 4 seconds, pulled from live data that updated overnight. No Excel, no waiting, no analyst needed. Every question your business has gets answered before the coffee gets cold.",
  },
];

export default function Testimonials() {
  return (
    <section className="section" id="testimonials" aria-label="Before and after scenarios">
      <style>{`
        .hide-scroll::-webkit-scrollbar {
          display: none;
        }
        .hide-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <div className="container">
        <div className="section-label">
          <span className="badge">SCENARIOS</span>
        </div>
        <ScrollAnimation>
          <h2 className="section-heading">
            Sound{" "}
            <span className="script-text text-accent" style={{ fontSize: "1.15em" }}>familiar</span>?
          </h2>
        </ScrollAnimation>
        <ScrollAnimation delay={100}>
          <p className="section-sub">
            These are the businesses we build for. If any of these sound like you, we should talk.
          </p>
        </ScrollAnimation>

        <div 
          className="hide-scroll"
          style={{ 
            display: 'flex', 
            overflowX: 'auto', 
            gap: '24px', 
            marginTop: '64px',
            paddingBottom: '32px',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            alignItems: 'stretch'
          }}
        >
          {scenarios.map((s, i) => (
            <div key={s.id} style={{ minWidth: '360px', width: '380px', flexShrink: 0, scrollSnapAlign: 'center', display: 'flex', flexDirection: 'column' }}>
              <ScrollAnimation delay={i * 80} className="h-full">
                <div className="testimonial-card" style={{ padding: '24px', gap: '16px', display: 'flex', flexDirection: 'column', height: '100%' }}>
                  
                  <div style={{ padding: '20px', background: 'rgba(0,0,0,0.02)', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.1em' }}>RIGHT NOW</span>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '8px', lineHeight: 1.6 }}>{s.before}</p>
                  </div>

                  <div style={{ padding: '20px', background: 'rgba(245, 98, 17, 0.04)', borderRadius: '12px', border: '1px solid rgba(245, 98, 17, 0.15)' }}>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.1em' }}>AFTER WE BUILD</span>
                    <p style={{ fontSize: '14px', color: 'var(--text-primary)', marginTop: '8px', lineHeight: 1.6 }}>{s.after}</p>
                  </div>

                  <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
                    <span className="badge">{s.badge}</span>
                  </div>

                </div>
              </ScrollAnimation>
            </div>
          ))}
        </div>

        <ScrollAnimation delay={400}>
          <div style={{ textAlign: 'center', marginTop: '64px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <p style={{ fontSize: '15px', color: 'var(--text-secondary)' }}>Don&apos;t see your situation here?</p>
            <Link href="/calendar" style={{ fontSize: '16px', fontWeight: 600, color: 'var(--accent)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              Tell us what you&apos;re dealing with → Book a free audit
            </Link>
          </div>
        </ScrollAnimation>

      </div>
    </section>
  );
}
