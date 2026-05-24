import type { Metadata } from "next";
import Link from "next/link";
import { PhoneCall, Bot, Stethoscope, GitMerge, BarChart3, Building2, MessageSquare } from "lucide-react";
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
  {
    slug: "how-to-automate-invoice-processing-with-ai",
    icon: <GitMerge size={36} style={{ color: "var(--accent)" }} />,
    category: "Workflow Automation",
    readTime: "6 min read",
    date: "May 2025",
    title: "How to Automate Invoice Processing with AI (No Accountant Required)",
    excerpt:
      "Manual invoice entry costs your team hours every week and introduces errors. Here's how AI workflow automation can extract, validate, and file invoices — automatically.",
  },
  {
    slug: "build-a-knowledge-chatbot-from-your-company-docs",
    icon: <MessageSquare size={36} style={{ color: "var(--accent)" }} />,
    category: "Chatbots",
    readTime: "7 min read",
    date: "May 2025",
    title: "How to Build a Knowledge Chatbot From Your Company Docs in a Week",
    excerpt:
      "Your SOPs, product manuals, and HR policies are sitting in PDFs. A RAG chatbot can make all of that knowledge instantly accessible to your team or customers — no SQL required.",
  },
  {
    slug: "natural-language-dashboards-for-non-technical-teams",
    icon: <BarChart3 size={36} style={{ color: "var(--accent)" }} />,
    category: "Data Pipelines",
    readTime: "5 min read",
    date: "April 2025",
    title: "Natural Language Dashboards: Ask Your Business Data a Question, Get a Chart",
    excerpt:
      "Most business owners can't write SQL. But they have real questions about their data. NL dashboards let anyone query business data in plain English — and see the answer instantly.",
  },
  {
    slug: "ai-automation-for-real-estate-lead-qualification",
    icon: <Building2 size={36} style={{ color: "var(--accent)" }} />,
    category: "Use Cases",
    readTime: "6 min read",
    date: "April 2025",
    title: "How Real Estate Agencies Use AI to Qualify 3x More Leads Without Extra Staff",
    excerpt:
      "Real estate teams waste hours chasing cold leads. An AI voice agent can call, qualify, and categorise every inbound lead automatically — and only pass the hot ones to your agents.",
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
