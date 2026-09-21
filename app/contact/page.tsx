import type { Metadata } from "next";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Fahad Hassan about websites, product builds, and thoughtful fixes for digital products.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Fahad Hassan",
    description:
      "Start a conversation about your next website or digital product.",
    type: "website",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <a
        className="absolute left-4 top-4 z-[100] -translate-y-20 rounded-full bg-[var(--foreground)] px-4 py-2 text-sm font-medium text-[var(--background)] transition-transform focus:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        href="#main-content"
      >
        Skip to content
      </a>
      <main id="main-content">
        <Navbar />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}