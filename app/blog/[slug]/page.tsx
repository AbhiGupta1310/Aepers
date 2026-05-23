import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const posts: Record<string, {
  title: string;
  category: string;
  readTime: string;
  date: string;
  emoji: string;
  content: string;
}> = {
  "why-your-clinic-needs-an-ai-receptionist": {
    title: "Why Your Clinic Needs an AI Receptionist (And What It Costs)",
    category: "Voice Agents",
    readTime: "7 min read",
    date: "May 15, 2025",
    emoji: "🏥",
    content: `
<h2>The problem every clinic owner knows</h2>
<p>Your front desk team is talented, dedicated, and overworked. Between managing walk-ins, handling insurance queries, and trying to actually help patients, answering the phone is the task that breaks the day.</p>
<p>After-hours calls go to voicemail. Patients don't leave messages. They book with your competitor instead. You don't even know how many calls you're missing — because a missed call leaves no record.</p>
<p>This is a solvable problem. And the solution doesn't require hiring more staff.</p>

<h2>What an AI receptionist actually does</h2>
<p>An AI voice agent answers your clinic's phone number. In under 1 second. In a natural voice. And it handles the call from start to finish — without a human involved.</p>
<p>Here's what it does:</p>
<ul>
<li><strong>Books appointments</strong> — checks your calendar in real time and offers available slots</li>
<li><strong>Answers common questions</strong> — hours, location, accepted insurance, services offered</li>
<li><strong>Sends confirmations</strong> — SMS or WhatsApp to the patient after booking</li>
<li><strong>Handles reschedules and cancellations</strong> — updates your calendar automatically</li>
<li><strong>Escalates when needed</strong> — complex medical questions or emergencies get transferred to your staff</li>
</ul>
<p>It's not a phone tree. It's not a chatbot. It's a trained agent that speaks naturally and takes real action.</p>

<h2>Real numbers from a real clinic</h2>
<p>We deployed a voice agent for a multi-specialty clinic in Bengaluru. Here are the results after 30 days:</p>
<ul>
<li>240 calls handled automatically per month</li>
<li>0 missed calls — including evenings, weekends, and holidays</li>
<li>83% of calls resolved without human involvement</li>
<li>Front desk team's call volume dropped from 80+ calls/day to 14</li>
<li>Patient no-show rate dropped 22% (SMS reminders)</li>
</ul>
<p>The agent paid for itself in week two.</p>

<h2>What it costs</h2>
<p>A full-time receptionist in Bengaluru costs ₹20,000–35,000/month. And they work 8 hours a day, 5 days a week. The AI works 24/7, handles every call, and doesn't take sick days.</p>
<p>Our voice agent implementation starts at <strong>₹1.5L one-time setup</strong>, with optional ₹15,000/month for maintenance and monitoring. For most clinics, the ROI is positive within the first 30–60 days.</p>

<h2>Is it right for your clinic?</h2>
<p>A voice agent works well if:</p>
<ul>
<li>You receive more than 20 calls per day</li>
<li>You get after-hours calls that currently go unanswered</li>
<li>Your front desk team is stretched thin</li>
<li>Most of your calls are appointment booking or basic FAQs</li>
</ul>
<p>If that sounds like your clinic, we'd recommend starting with a free audit. We'll tell you exactly what we can automate and what the ROI looks like — before you commit to anything.</p>
    `,
  },
  "rag-vs-fine-tuning-what-smbs-actually-need": {
    title: "RAG vs Fine-Tuning: What SMBs Actually Need",
    category: "Chatbots",
    readTime: "8 min read",
    date: "May 10, 2025",
    emoji: "🤖",
    content: `
<h2>The confusion in the market</h2>
<p>If you've spent any time reading about AI for business, you've seen two terms thrown around constantly: RAG (Retrieval-Augmented Generation) and fine-tuning. Both are legitimate techniques. But for most small and medium businesses, one is dramatically more useful than the other.</p>
<p>Spoiler: it's RAG. Here's why.</p>

<h2>What is fine-tuning?</h2>
<p>Fine-tuning means taking a base model (like GPT-4) and training it further on your specific data. The model "memorizes" your content and incorporates it into its weights.</p>
<p>Fine-tuning is powerful for:</p>
<ul>
<li>Teaching a model a specific <strong>style or tone</strong></li>
<li>Training on very structured data with consistent patterns</li>
<li>Applications where you need the model to behave differently from its defaults</li>
</ul>
<p>But it has serious limitations for business use cases: it's expensive (thousands of dollars for a good fine-tune), it requires a large, clean dataset, and most critically — <strong>the knowledge is frozen at training time</strong>. If your pricing changes, or you add a new product, you have to re-fine-tune.</p>

<h2>What is RAG?</h2>
<p>RAG (Retrieval-Augmented Generation) is a different approach. Instead of baking knowledge into the model's weights, you keep your knowledge in a searchable database and retrieve the relevant parts at query time.</p>
<p>When a user asks a question:</p>
<ol>
<li>The system searches your knowledge base for the most relevant passages</li>
<li>Those passages are injected into the model's context</li>
<li>The model answers using that specific, grounded information</li>
</ol>
<p>This means: <strong>no hallucinations</strong> (the model only answers from your documents), <strong>always up to date</strong> (update your docs, the bot learns immediately), and <strong>dramatically cheaper to build and maintain</strong>.</p>

<h2>When fine-tuning actually makes sense</h2>
<p>Fine-tuning is worth it when:</p>
<ul>
<li>You have 10,000+ high-quality training examples</li>
<li>You need the model to adopt a very specific personality or format consistently</li>
<li>Your knowledge base is static (rarely changes)</li>
<li>You're building a product at scale where per-query costs matter</li>
</ul>
<p>For a customer support bot, an HR helpdesk, or a product FAQ bot — RAG is almost always the right answer.</p>

<h2>Our recommendation for SMBs</h2>
<p>Start with RAG. It's faster to build (days, not weeks), cheaper to maintain, more accurate for Q&A tasks, and immediately useful. If after 6 months you find you need fine-tuning on top, you'll know exactly why and have real data to justify it.</p>
<p>We've built both. For the businesses we work with, RAG has delivered better results in 19 out of 20 cases. The one exception was a legal firm that needed very specific citation formatting — and even there, we used RAG for retrieval and fine-tuning just for output formatting.</p>
    `,
  },
  "how-we-built-a-voice-agent-for-a-dental-clinic-in-10-days": {
    title: "How We Built a Voice Agent for a Dental Clinic in 10 Days",
    category: "Case Study",
    readTime: "6 min read",
    date: "April 28, 2025",
    emoji: "🦷",
    content: `
<h2>The brief</h2>
<p>Dr. Anand runs a busy 3-chair dental clinic in Koramangala, Bengaluru. His front desk team — two people — were getting 60–80 calls per day. Most calls were appointment bookings, questions about costs, and directions. They were spending 4+ hours a day just on the phone.</p>
<p>After-hours calls went to voicemail. Patients rarely left messages. New patient acquisitions were being lost.</p>
<p>He came to us wanting a simple solution: answer every call, book appointments automatically. He had 10 days before a planned staff leave that would make the problem worse.</p>

<h2>Day 1–2: Audit and scoping</h2>
<p>We did a 30-minute call with Dr. Anand and his front desk lead. We recorded and transcribed 20 real patient calls to understand the actual patterns:</p>
<ul>
<li>67% were appointment bookings (new and existing patients)</li>
<li>18% were cost inquiries (cleaning, filling, root canal prices)</li>
<li>9% were directions and parking questions</li>
<li>6% were other (insurance, records requests, complaints)</li>
</ul>
<p>We scoped the first version to handle the top 94% of calls automatically. Complex cases (complaints, records) would be transferred to staff.</p>

<h2>Day 3: System design and proposal</h2>
<p>We designed the architecture:</p>
<ul>
<li><strong>Call routing</strong>: Twilio handles incoming calls to his existing clinic number</li>
<li><strong>Speech recognition</strong>: OpenAI Whisper for transcription</li>
<li><strong>Language model</strong>: GPT-4o with a carefully engineered system prompt</li>
<li><strong>Calendar integration</strong>: Google Calendar API (he was already using it)</li>
<li><strong>SMS</strong>: Twilio for booking confirmations</li>
<li><strong>Voice synthesis</strong>: ElevenLabs for natural-sounding responses</li>
</ul>
<p>Fixed price: ₹2.2L. Timeline: 10 days. He signed off same day.</p>

<h2>Day 4–8: Build</h2>
<p>The actual build was straightforward. The most time-consuming parts:</p>
<ul>
<li><strong>System prompt engineering</strong> — getting the agent to handle edge cases gracefully took 3 iterations</li>
<li><strong>Calendar logic</strong> — handling doctor leave days, slot durations per procedure type, buffer time between appointments</li>
<li><strong>Escalation logic</strong> — building a reliable fallback when the agent wasn't confident</li>
</ul>
<p>We gave Dr. Anand a staging number on Day 6 and he called it 40+ times testing edge cases. His feedback: "it sounds more patient than my actual receptionist."</p>

<h2>Day 9–10: Testing and go-live</h2>
<p>We ran the agent in parallel for 2 days — real calls went to both the agent and the front desk, and we compared outcomes. Accuracy was 94%. The 6% failure rate was almost entirely calls in Kannada (we added basic Kannada support in a 2-hour patch).</p>
<p>We went live on Day 10.</p>

<h2>Results: 30 days later</h2>
<ul>
<li>📞 <strong>1,847 calls handled</strong> — 0 missed</li>
<li>✅ <strong>86% resolved</strong> without human involvement</li>
<li>📅 <strong>423 appointments booked</strong> automatically</li>
<li>💬 <strong>100% SMS confirmation rate</strong> (vs. ~30% before)</li>
<li>📉 <strong>No-show rate dropped 31%</strong> due to reminders</li>
<li>💰 <strong>ROI positive in week 3</strong></li>
</ul>
<p>Dr. Anand's front desk team now handles 12 calls a day instead of 70. They spend the rest of their time with patients in the clinic.</p>

<h2>What we'd do differently</h2>
<p>If we were starting over, we'd add multi-language support from day one rather than as a patch. Also, we'd integrate WhatsApp for confirmations earlier — patients preferred it over SMS.</p>
<p>Both are now part of our standard voice agent package.</p>
    `,
  },
};

export async function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) return {};
  return {
    title: `${post.title} — Aepers Blog`,
    description: post.title,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) notFound();

  return (
    <>
      {/* Hero */}
      <section className="blog-post-hero">
        <div className="container">
          <div style={{ maxWidth: "760px", margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "28px", flexWrap: "wrap" }}>
              <span className="badge">{post.category}</span>
              <span style={{ fontSize: "14px", color: "var(--text-secondary)" }}>{post.readTime}</span>
              <span style={{ fontSize: "14px", color: "var(--text-secondary)" }}>·</span>
              <span style={{ fontSize: "14px", color: "var(--text-secondary)" }}>{post.date}</span>
            </div>
            <h1 style={{ fontSize: "48px", fontWeight: 600, lineHeight: 1.1, marginBottom: "24px" }}>
              {post.title}
            </h1>
            <div style={{ height: "200px", background: "linear-gradient(135deg, rgba(91,127,255,0.15), rgba(0,212,170,0.1))", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "80px", marginBottom: "48px" }}>
              {post.emoji}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section style={{ paddingBottom: "120px" }}>
        <div className="container">
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* CTA */}
          <div style={{ maxWidth: "760px", margin: "64px auto 0" }}>
            <div className="how-callout">
              <div className="how-callout-inner">
                <p className="how-callout-text">
                  <strong>Want to explore this for your business?</strong>{" "}
                  Book a free 30-minute audit — we&apos;ll show you exactly what you can automate and what the ROI looks like.
                </p>
                <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "24px", flexWrap: "wrap" }}>
                  <Link href="/#contact" className="btn-primary">Book Free Audit →</Link>
                  <Link href="/blog" className="btn-ghost">← Back to Blog</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
