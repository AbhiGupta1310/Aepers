import type { Metadata } from "next";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import UseCases from "@/components/UseCases";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Aepers — AI Voice Agents & Automation for Small Businesses",
  description:
    "We build AI receptionists, intelligent chatbots, and workflow automation for businesses in 14 days. You own the code. Starting at ₹1.5L.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Services />
      <HowItWorks />
      <UseCases />
      <Testimonials />
      <CTASection />
    </>
  );
}
