import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";

export const metadata: Metadata = {
  title: "Aepers — AI Voice Agents & Automation for Small Businesses",
  description:
    "We build AI receptionists, intelligent chatbots, and workflow automation for businesses in 14 days. You own the code. Starting at ₹1.5L.",
  keywords: [
    "AI automation agency India",
    "voice agent for small business",
    "AI receptionist for clinic",
    "RAG chatbot for business",
    "workflow automation agency Bengaluru",
    "AI chatbot for customer support India",
  ],
  openGraph: {
    title: "Aepers — AI Voice Agents & Automation for Small Businesses",
    description:
      "We build AI receptionists, intelligent chatbots, and workflow automation for businesses in 14 days. You own the code.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* <LoadingScreen /> */}
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
