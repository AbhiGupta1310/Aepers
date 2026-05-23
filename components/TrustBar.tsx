"use client";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 14, suffix: " days", label: "to deployment" },
  { value: 100, suffix: "%", label: "code ownership" },
  { prefix: "₹", value: 0, suffix: "", label: "lock-in fees" },
];

const tickerItems = [
  "Dental clinic receptionist",
  "HR helpdesk bot",
  "Invoice automation",
  "Real estate lead qualifier",
  "Support chatbot",
  "Sales CRM updater",
  "Restaurant reservations",
  "Legal intake screening",
  "E-commerce FAQ bot",
  "Employee onboarding",
  "Appointment scheduling",
  "Automated follow-ups",
];

function CountUp({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const duration = 1500;
          const start = performance.now();

          const step = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // ease out
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="trust-stat-number" aria-label={`${prefix}${target}${suffix}`}>
      {prefix}{count}{suffix}
    </span>
  );
}

export default function TrustBar() {
  const doubledItems = [...tickerItems, ...tickerItems];

  return (
    <section className="trust-bar section-alt" aria-label="Stats and use cases">
      <div className="container">
        {/* Stats */}
        <div className="trust-stats">
          {stats.map((stat) => (
            <div key={stat.label} className="trust-stat">
              <CountUp target={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
              <p className="trust-stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Ticker */}
      <div className="ticker-wrapper" aria-label="Use case examples" aria-live="off">
        <div className="ticker-track" role="list">
          {doubledItems.map((item, i) => (
            <div key={i} className="ticker-item" role="listitem">
              <span className="ticker-dot" aria-hidden="true">✦</span>
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
