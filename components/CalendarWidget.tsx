"use client";

import { useEffect, useId, useRef } from "react";

const CAL_LINK = "abhi-gupta-eng/30min";

declare global {
  interface Window { Cal: any; }
}

export default function CalendarWidget() {
  const rawId = useId();
  const embedId = "cal-" + rawId.replace(/:/g, "");
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Official Cal.com inline snippet
    (function (C: any, A: string, L: string) {
      const p = (a: any, ar: any) => { a.q.push(ar); };
      const d = C.document;
      C.Cal = C.Cal || function (...args: any[]) {
        const cal = C.Cal;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q  = cal.q || [];
          const s = d.createElement("script");
          s.src  = A;
          d.head.appendChild(s);
          cal.loaded = true;
        }
        if (args[0] === L) {
          const api: any = (...a: any[]) => p(api, a);
          const ns = args[1];
          api.q = api.q || [];
          if (typeof ns === "string") {
            cal.ns[ns] = cal.ns[ns] || api;
            p(cal.ns[ns], args);
            p(cal, [L, ns, args[2]]);
          } else {
            p(cal, [L, ns]);
          }
          return;
        }
        p(cal, args);
      };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    window.Cal("init", { origin: "https://cal.com" });

    window.Cal("inline", {
      elementOrSelector: "#" + embedId,
      calLink: CAL_LINK,
      layout: "month_view",
    });

    // Force light theme + brand color so it matches the site
    window.Cal("ui", {
      theme: "light",
      hideEventTypeDetails: false,
      layout: "month_view",
      styles: {
        branding: { brandColor: "#F56211" },
      },
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    // Outer wrapper ensures the embed always has enough horizontal
    // space for the 3-column desktop layout (sidebar + calendar + slots).
    // On small viewports it scrolls horizontally instead of collapsing.
    <div
      style={{
        width: "100%",
        overflowX: "auto",
        borderRadius: "16px",
      }}
    >
      <div
        id={embedId}
        style={{
          minWidth: "900px",
          width: "100%",
          minHeight: "700px",
        }}
      />
    </div>
  );
}
