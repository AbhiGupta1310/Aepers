import Link from "next/link";

const services = [
  { label: "Voice Agents", href: "/services/voice-agents" },
  { label: "RAG Chatbots", href: "/services/chatbots" },
  { label: "Workflow Automation", href: "/services/workflow" },
  { label: "Data Dashboards", href: "/services/dashboards" },
  { label: "Free Audit", href: "/calendar" },
];

const company = [
  { label: "About", href: "/about" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const socials = [
  { icon: "in", label: "LinkedIn", href: "https://linkedin.com" },
  { icon: "𝕏", label: "Twitter / X", href: "https://twitter.com" },
  { icon: "⌥", label: "GitHub", href: "https://github.com" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" aria-label="Site footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <Link href="/" className="nav-logo" style={{ width: "fit-content" }} aria-label="Aepers home">
              <img src="/logo.png" alt="Aepers" className="nav-logo-icon" aria-hidden="true" />
<span className="brand-satoshi">aepers</span>
            </Link>
            <p className="footer-tagline">
              AI automation for businesses that want to move faster.
            </p>
            <div className="footer-socials">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="footer-social"
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.icon}
                </a>
              ))}
            </div>
            <p className="footer-made">Made in Bengaluru, India</p>
          </div>

          {/* Services */}
          <div>
            <p className="footer-col-title">Services</p>
            <ul className="footer-links">
              {services.map((s) => (
                <li key={s.label}>
                  <Link href={s.href}>{s.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="footer-col-title">Company</p>
            <ul className="footer-links">
              {company.map((c) => (
                <li key={c.label}>
                  <Link href={c.href}>{c.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="footer-col-title">Contact</p>
            <div className="footer-contact-info">
              <div className="footer-contact-item">
                <span className="footer-contact-label">Email</span>
                <p className="footer-contact-value">
                  <a href="mailto:iamabhids@gmail.com">iamabhids@gmail.com</a>
                </p>
              </div>
              <div className="footer-contact-item">
                <span className="footer-contact-label">Book a call</span>
                <p className="footer-contact-value">
                  <Link href="/calendar">
                    /calendar
                  </Link>
                </p>
              </div>
              <p className="footer-response">
                <span>⬤</span>
                We reply within 4 hours
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {year} Aepers. All rights reserved.
          </p>
          <div className="footer-legal">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
