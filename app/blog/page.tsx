import type { Metadata } from "next";
import Link from "next/link";
import { PhoneCall, Bot, Stethoscope } from "lucide-react";
import ScrollAnimation from "@/components/ScrollAnimation";

export const metadata: Metadata = {
  title: "Blog — Aepers",
  description:
    "Practical guides on AI automation for small businesses. Voice agents, RAG chatbots, workflow automation, and more.",
};

const posts = [
  {
    slug: "why-your-clinic-needs-an-ai-receptionist",
    icon: <PhoneCall size={36} style={{ color: "var(--accent)" }} />,
    category: "Voice Agents",
    readTime: "7 min read",
    date: "May 2025",
    title: "Why Your Clinic Needs an AI Receptionist (And What It Costs)",
    excerpt:
      "Your front desk team is overwhelmed. Calls go to voicemail after hours. Appointments get missed. Here's how AI receptionists solve all three — and cost less than a part-time hire.",
  },
  {
    slug: "rag-vs-fine-tuning-what-smbs-actually-need",
    icon: <Bot size={36} style={{ color: "var(--accent)" }} />,
    category: "Chatbots",
    readTime: "8 min read",
    date: "May 2025",
    title: "RAG vs Fine-Tuning: What SMBs Actually Need",
    excerpt:
      "Everyone's talking about fine-tuning. But for 95% of small businesses, RAG is cheaper, faster, and more accurate. Here's how to decide which one is right for your use case.",
  },
  {
    slug: "how-we-built-a-voice-agent-for-a-dental-clinic-in-10-days",
    icon: <Stethoscope size={36} style={{ color: "var(--accent)" }} />,
    category: "Case Study",
    readTime: "6 min read",
    date: "April 2025",
    title: "How We Built a Voice Agent for a Dental Clinic in 10 Days",
    excerpt:
      "A walkthrough of exactly how we built, tested, and deployed an AI receptionist for a busy dental clinic — the tech, the challenges, and the results after 30 days.",
  },
];

export default function BlogPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="page-hero-content">
            <span className="badge">BLOG</span>
            <h1 className="page-hero-title">
              Practical AI for{" "}
              <span className="gradient-text">real businesses</span>.
            </h1>
            <p className="page-hero-sub">
              No hype. Just practical guides on what works, what doesn&apos;t, and how to actually implement AI automation in your business.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="blog-grid">
            {posts.map((post, i) => (
              <ScrollAnimation key={post.slug} delay={i * 80}>
                <Link href={`/blog/${post.slug}`} className="blog-card" id={`blog-${post.slug}`}>
                  <div className="blog-card-image" aria-hidden="true" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {post.icon}
                  </div>
                  <div className="blog-card-body">
                    <div className="blog-meta">
                      <span className="blog-category">{post.category}</span>
                      <span>·</span>
                      <span>{post.readTime}</span>
                      <span>·</span>
                      <span>{post.date}</span>
                    </div>
                    <h2 className="blog-card-title">{post.title}</h2>
                    <p className="blog-card-excerpt">{post.excerpt}</p>
                    <span className="blog-read-more">Read article →</span>
                  </div>
                </Link>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
