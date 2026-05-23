import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const posts: Record<string, {
  title: string;
  category: string;
  readTime: string;
  date: string;
  content: string;
}> = {
  "why-your-clinic-needs-an-ai-receptionist": {
    title: "Why Your Clinic Needs an AI Receptionist (And What It Costs)",
    category: "Voice Agents",
    readTime: "7 min read",
    date: "May 15, 2025",
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
<p>A full-time receptionist in Bengaluru costs Rs. 20,000–35,000/month. And they work 8 hours a day, 5 days a week. The AI works 24/7, handles every call, and doesn't take sick days.</p>
<p>Our voice agent implementation starts at <strong>Rs. 1.5L one-time setup</strong>, with optional Rs. 15,000/month for maintenance and monitoring. For most clinics, the ROI is positive within the first 30–60 days.</p>

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
<p>Fixed price: Rs. 2.2L. Timeline: 10 days. He signed off same day.</p>

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
<li><strong>1,847 calls handled</strong> — 0 missed</li>
<li><strong>86% resolved</strong> without human involvement</li>
<li><strong>423 appointments booked</strong> automatically</li>
<li><strong>100% SMS confirmation rate</strong> (vs. ~30% before)</li>
<li><strong>No-show rate dropped 31%</strong> due to reminders</li>
<li><strong>ROI positive in week 3</strong></li>
</ul>
<p>Dr. Anand's front desk team now handles 12 calls a day instead of 70. They spend the rest of their time with patients in the clinic.</p>

<h2>What we'd do differently</h2>
<p>If we were starting over, we'd add multi-language support from day one rather than as a patch. Also, we'd integrate WhatsApp for confirmations earlier — patients preferred it over SMS.</p>
<p>Both are now part of our standard voice agent package.</p>
    `,
  },

  "how-to-automate-invoice-processing-with-ai": {
    title: "How to Automate Invoice Processing with AI (No Accountant Required)",
    category: "Workflow Automation",
    readTime: "6 min read",
    date: "May 18, 2025",
    content: `
<h2>The hidden cost of manual invoices</h2>
<p>Most finance teams don't realise how much time they spend on invoices until they actually measure it. A typical SMB processes 50–200 invoices per month. Each one requires someone to open the PDF, read the vendor name, invoice number, line items, and amount, then type that into their accounting software.</p>
<p>At 5–10 minutes per invoice, that's 5–30 hours of manual data entry every month. Hours that could be spent on actual financial analysis, supplier negotiations, or cash flow planning.</p>
<p>And beyond the time cost: manual entry introduces errors. Wrong amounts, duplicate entries, missed invoices — all of which create reconciliation headaches at month end.</p>

<h2>What AI invoice automation looks like</h2>
<p>A well-built invoice automation pipeline does the following:</p>
<ol>
<li><strong>Ingestion</strong>: Invoices arrive via email, WhatsApp, or a shared folder. The system detects them automatically.</li>
<li><strong>Extraction</strong>: An AI model reads the document — whether it's a clean PDF, a scanned image, or a photo taken on someone's phone — and extracts structured data: vendor, date, invoice number, line items, GST, total.</li>
<li><strong>Validation</strong>: The extracted data is checked against your approved vendor list, purchase orders, and duplicate records.</li>
<li><strong>Routing</strong>: Clean invoices are pushed directly into your accounting system (Tally, Zoho Books, QuickBooks). Flagged ones go to a human reviewer with a highlighted explanation of what needs attention.</li>
<li><strong>Confirmation</strong>: A Slack or WhatsApp message notifies the right person that the invoice has been processed.</li>
</ol>
<p>The entire process — from email received to accounting entry created — takes under 60 seconds.</p>

<h2>The technology behind it</h2>
<p>We build these pipelines using a combination of:</p>
<ul>
<li><strong>Document AI</strong> (Google Document AI or AWS Textract) for OCR and initial extraction</li>
<li><strong>GPT-4o with vision</strong> for structured field extraction from complex or non-standard invoice layouts</li>
<li><strong>n8n or Python</strong> for the orchestration and routing logic</li>
<li><strong>Your existing accounting software API</strong> for the final push</li>
</ul>
<p>The system handles PDFs, images, and even photos of physical invoices. It works in English, Hindi, and most Indian regional languages used on vendor documents.</p>

<h2>What a real implementation looks like</h2>
<p>We built this for a manufacturing distributor in Pune that was processing 180 invoices per month across 40+ vendors. Their finance assistant was spending 3 full days a month on data entry alone.</p>
<p>After automation:</p>
<ul>
<li>Processing time dropped from 3 days to 4 hours (the human-review queue for edge cases)</li>
<li>Error rate dropped from ~8% to under 0.5%</li>
<li>Month-end close moved from Day 8 to Day 3</li>
</ul>

<h2>Is this right for your business?</h2>
<p>Invoice automation delivers the strongest ROI when:</p>
<ul>
<li>You process more than 30 invoices per month</li>
<li>Invoices come from multiple vendors in different formats</li>
<li>Your team manually re-enters data that's already in a document</li>
<li>You've had reconciliation errors or duplicate payment issues</li>
</ul>
<p>If any of that resonates, a 30-minute audit will tell you exactly how much time you can recover and what it'll cost to automate.</p>
    `,
  },

  "build-a-knowledge-chatbot-from-your-company-docs": {
    title: "How to Build a Knowledge Chatbot From Your Company Docs in a Week",
    category: "Chatbots",
    readTime: "7 min read",
    date: "May 12, 2025",
    content: `
<h2>The knowledge problem every growing company has</h2>
<p>As companies grow, knowledge gets scattered. SOPs live in Google Drive folders that nobody navigates correctly. Product specs are buried in email threads. HR policies are in a PDF that was last updated in 2022 and nobody can find.</p>
<p>The result: employees ask the same questions over and over. Customers get inconsistent answers from different support agents. New hires take months to get up to speed because institutional knowledge isn't accessible.</p>
<p>A knowledge chatbot solves this by making all of your documents instantly queryable — in plain English.</p>

<h2>How it works</h2>
<p>The technical approach is called RAG (Retrieval-Augmented Generation). Here's the simplified version:</p>
<ol>
<li>You upload your documents — PDFs, Word files, Notion exports, Google Docs, Confluence pages, whatever you have</li>
<li>The system breaks them into chunks and creates searchable embeddings (mathematical representations of meaning)</li>
<li>When someone asks a question, the system finds the most relevant chunks and passes them to a language model</li>
<li>The model generates a precise, grounded answer — citing which document it pulled from</li>
</ol>
<p>The key advantage: <strong>the model can only answer from your documents</strong>. It won't hallucinate information you haven't provided. And when you update a document, the bot automatically knows.</p>

<h2>What you can feed it</h2>
<ul>
<li>Product documentation and FAQs</li>
<li>HR policies and employee handbooks</li>
<li>SOPs and process guides</li>
<li>Legal and compliance documents</li>
<li>Sales playbooks and objection-handling guides</li>
<li>Technical specifications and integration docs</li>
<li>Historical email threads and support tickets</li>
</ul>
<p>Anything that's currently sitting in a folder, collecting digital dust, can become instantly searchable.</p>

<h2>Deployment options</h2>
<p>We deploy knowledge chatbots in three ways depending on the use case:</p>
<ul>
<li><strong>Web widget</strong> — a chat bubble on your website for customer-facing Q&A</li>
<li><strong>Slack or Teams bot</strong> — for internal team use, so employees can ask questions in the tools they already use</li>
<li><strong>API</strong> — if you want to embed the functionality into an existing product or CRM</li>
</ul>

<h2>A real example: HR helpdesk bot</h2>
<p>We built a knowledge bot for a 200-person IT services company in Hyderabad. Their HR team was fielding 40–60 repetitive questions per week: leave policy, reimbursement process, appraisal timelines, laptop replacement procedure.</p>
<p>After deploying a Slack-integrated knowledge bot trained on their HR handbook and policy documents:</p>
<ul>
<li>HR team's inbound query volume dropped 68%</li>
<li>Average response time went from 4 hours to under 10 seconds</li>
<li>Employee satisfaction scores for HR support increased</li>
</ul>
<p>The HR team now spends their time on actual HR work instead of answering "how many sick leaves do I have?"</p>

<h2>How long does it take?</h2>
<p>For a straightforward knowledge bot with a well-organised document set: 3–5 days from kick-off to deployment. For more complex setups with multiple data sources or custom integrations: 7–10 days.</p>
<p>The limiting factor is almost always document quality. The cleaner and more organised your source documents, the faster and more accurate the bot.</p>
    `,
  },

  "natural-language-dashboards-for-non-technical-teams": {
    title: "Natural Language Dashboards: Ask Your Business Data a Question, Get a Chart",
    category: "Data Pipelines",
    readTime: "5 min read",
    date: "April 22, 2025",
    content: `
<h2>The SQL problem</h2>
<p>Most business owners and managers have real questions about their data. "What were our top 10 products by revenue last quarter?" "Which sales rep closed the most deals in April?" "Show me monthly churn by customer segment."</p>
<p>Getting answers to these questions today requires either knowing SQL, having a data analyst on call, or waiting for someone to build a custom dashboard that may or may not have the exact filter you need.</p>
<p>Natural language dashboards eliminate that dependency. You type a question in plain English. You get a chart or table back in seconds.</p>

<h2>How NL dashboards work</h2>
<p>The system has three components:</p>
<ol>
<li><strong>Data connection</strong>: We connect your data sources — SQL databases, Google Sheets, Airtable, Shopify, CRMs — and create a clean, unified data model</li>
<li><strong>Query translation</strong>: A fine-tuned language model translates your natural language question into a precise SQL or API query against your data</li>
<li><strong>Visualisation</strong>: The result is rendered automatically as the most appropriate chart type — bar chart, line graph, table, pie chart — and displayed instantly</li>
</ol>
<p>You can also ask follow-up questions. "Now break that down by region." "Filter for enterprise customers only." "Compare to the same period last year." The system maintains context across your session.</p>

<h2>What this replaces</h2>
<p>Traditional BI tools like Tableau or Power BI are powerful — but they require a trained analyst to build dashboards, and those dashboards answer the questions someone thought to ask, not the questions you're asking right now.</p>
<p>NL dashboards complement or replace:</p>
<ul>
<li>Ad hoc SQL queries from your engineering team</li>
<li>Weekly "data pulls" from your analyst</li>
<li>Static dashboards that never have quite the right filter</li>
<li>Spreadsheet exports that are outdated by the time you open them</li>
</ul>

<h2>A real implementation: e-commerce analytics</h2>
<p>We built an NL dashboard for an e-commerce brand selling on Shopify with 15,000+ SKUs. Their marketing and ops team had constant data questions but no SQL skills and a part-time analyst who was always backlogged.</p>
<p>After deploying the NL dashboard connected to their Shopify store, Google Analytics, and a custom inventory database:</p>
<ul>
<li>The team went from waiting 2–3 days for data answers to getting them in under 30 seconds</li>
<li>Ad spend decisions that used to require analyst involvement were made independently by the marketing team</li>
<li>The part-time analyst shifted focus to deeper strategic analysis instead of routine data pulls</li>
</ul>

<h2>What data sources we connect</h2>
<ul>
<li>PostgreSQL, MySQL, Supabase, BigQuery</li>
<li>Google Sheets and Excel</li>
<li>Shopify, WooCommerce</li>
<li>HubSpot, Salesforce, Zoho CRM</li>
<li>Razorpay, Stripe</li>
<li>Custom REST APIs</li>
</ul>
<p>If your data lives somewhere, we can connect it. The setup typically takes 3–7 days depending on how many sources you have and how clean the data is.</p>
    `,
  },

  "ai-automation-for-real-estate-lead-qualification": {
    title: "How Real Estate Agencies Use AI to Qualify 3x More Leads Without Extra Staff",
    category: "Use Cases",
    readTime: "6 min read",
    date: "April 15, 2025",
    content: `
<h2>The lead problem in real estate</h2>
<p>Real estate agencies have a specific challenge: they generate a lot of leads from portals like Housing.com, MagicBricks, and 99acres — but the quality varies wildly. Agents spend hours calling leads who aren't serious buyers, have the wrong budget, or are looking in the wrong location.</p>
<p>Meanwhile, genuinely motivated buyers who called at 10pm on a Sunday get a response on Monday morning — and have already contacted three other agencies.</p>
<p>The result: agents are simultaneously overloaded with low-quality work and losing their best opportunities to slow response times.</p>

<h2>What AI lead qualification looks like</h2>
<p>An AI voice agent handles the first contact with every inbound lead — within 60 seconds of the enquiry, regardless of the time of day.</p>
<p>The agent conducts a structured conversation that covers:</p>
<ul>
<li>Property type and configuration they're looking for</li>
<li>Location preferences and flexibility</li>
<li>Budget range</li>
<li>Timeline (buying now, 3 months, just exploring)</li>
<li>Whether they're an end-user or investor</li>
<li>Financing status (pre-approved, planning to apply, cash buyer)</li>
</ul>
<p>Based on the responses, the lead is categorised — hot, warm, or cold — and routed accordingly. Hot leads get an immediate callback alert to the senior agent. Warm leads go into a nurture sequence. Cold leads get added to a long-term follow-up list.</p>

<h2>The numbers from a Mumbai agency</h2>
<p>We implemented this for a residential property agency in Mumbai with a team of 8 agents. They were receiving 200–300 portal leads per month and could realistically follow up with about 60% of them within 24 hours.</p>
<p>After deploying the AI qualification agent:</p>
<ul>
<li>100% of leads received a call within 60 seconds, 24/7</li>
<li>Agents' productive calling time focused on the 35% categorised as hot or warm</li>
<li>Site visit conversion rate increased from 12% to 31% (agents only met qualified buyers)</li>
<li>Average deal close time dropped from 45 days to 28 days</li>
<li>One agent who previously handled 25 leads/month was effectively managing 90</li>
</ul>

<h2>Beyond initial qualification</h2>
<p>The same system handles follow-up automatically. If a warm lead hasn't responded in 3 days, the agent calls again with a different approach. If a cold lead's budget range matches a new listing, they get an automated outreach.</p>
<p>Agents are notified only when a lead has crossed a threshold — ready to visit a property, ready to discuss pricing, or ready to sign. Everything before that is handled automatically.</p>

<h2>Other industries where this applies</h2>
<p>The lead qualification model we've described works well beyond real estate:</p>
<ul>
<li><strong>Financial services</strong> — qualifying loan or insurance enquiries before advisor time</li>
<li><strong>EdTech</strong> — qualifying course enquiries and scheduling demos</li>
<li><strong>Healthcare</strong> — triaging enquiries to the right specialist or department</li>
<li><strong>Recruitment</strong> — initial candidate screening before human interviews</li>
</ul>
<p>If your business generates inbound leads and your team spends significant time qualifying them before any real conversation happens, this system will work for you.</p>
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
            <h1 style={{ fontSize: "48px", fontWeight: 600, lineHeight: 1.1, marginBottom: "32px" }}>
              {post.title}
            </h1>
            {/* Clean accent bar replaces the emoji banner */}
            <div style={{
              height: "4px",
              background: "linear-gradient(90deg, #F56211 0%, #FF9A5C 100%)",
              borderRadius: "2px",
              marginBottom: "48px",
            }} />
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
                  <Link href="/calendar" className="btn-primary">Book Free Audit →</Link>
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
