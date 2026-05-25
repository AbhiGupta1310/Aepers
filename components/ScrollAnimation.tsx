"use client";
import { useEffect, useRef, ReactNode, CSSProperties } from "react";

interface ScrollAnimationProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
}

export default function ScrollAnimation({ children, delay = 0, className = "", style }: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If already in view on mount (above the fold), animate immediately
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setTimeout(() => el.classList.add("in-view"), delay);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("in-view");
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -20px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`animate-on-scroll ${className}`} style={style}>
      {children}
    </div>
  );
}
