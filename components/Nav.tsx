"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Services", href: "/#services" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Use Cases", href: "/#use-cases" },
  { label: "About", href: "/about" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav className={`nav${scrolled ? " scrolled" : ""}`} role="navigation" aria-label="Main navigation">
        <div className="container">
          <div className="nav-inner">
            {/* Logo */}
            <Link href="/" className="nav-logo" aria-label="Aepers home">

              <img src="/logo.png" alt="aepers" className="nav-logo-icon" aria-hidden="true" />
              <span className="brand-satoshi">aepers</span>
            </Link>

            {/* Center links */}
            <ul className="nav-links">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={pathname === link.href ? "active" : ""}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* CTA buttons */}
            <div className="nav-actions">
              <Link href="/contact" className="btn-ghost" style={{ padding: "10px 20px", fontSize: "14px" }}>
                View Demo
              </Link>
              <Link href="/calendar" className="btn-primary" style={{ padding: "10px 20px", fontSize: "14px" }}>
                Book Free Audit →
              </Link>
            </div>

            {/* Hamburger */}
            <button
              className={`nav-hamburger${mobileOpen ? " open" : ""}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`nav-mobile-overlay${mobileOpen ? " open" : ""}`}
        aria-hidden={!mobileOpen}
      >
        <ul className="nav-mobile-links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "center" }}>
          <Link href="/calendar" className="btn-primary" onClick={() => setMobileOpen(false)}>
            Book Free Audit →
          </Link>
          <Link href="/contact" className="btn-ghost" onClick={() => setMobileOpen(false)}>
            View Demo
          </Link>
        </div>
      </div>
    </>
  );
}
