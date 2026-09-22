"use client";

import { motion, useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";
import AgentChat from "./components/AgentChat";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

const AboutSection = dynamic(() => import("./components/AboutSection"));
const Footer = dynamic(() => import("./components/Footer"));
const SkillsSection = dynamic(() => import("./components/SkillsSection"));
const ServicesSection = dynamic(() => import("./components/ServicesSection"));
const ExperienceSection = dynamic(() => import("./components/ExperienceSection"));
const ContactSection = dynamic(() => import("./components/ContactSection"));

const sectionAnimation = {
  hidden: { opacity: 0, y: 42, scale: 0.985 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export default function Home() {
  const shouldReduceMotion = useReducedMotion();

  const revealTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const };

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
      <motion.div
        initial="hidden"
        animate="visible"
        transition={revealTransition}
        variants={sectionAnimation}
      >
        <Hero />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        transition={revealTransition}
        variants={sectionAnimation}
      >
        <AboutSection />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        transition={{ ...revealTransition, delay: shouldReduceMotion ? 0 : 0.06 }}
        variants={sectionAnimation}
      >
        <SkillsSection />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        transition={{ ...revealTransition, delay: shouldReduceMotion ? 0 : 0.08 }}
        variants={sectionAnimation}
      >
        <ServicesSection />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        transition={{ ...revealTransition, delay: shouldReduceMotion ? 0 : 0.1 }}
        variants={sectionAnimation}
      >
        <ExperienceSection />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        transition={{ ...revealTransition, delay: shouldReduceMotion ? 0 : 0.12 }}
        variants={sectionAnimation}
      >
        <ContactSection />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        transition={{ ...revealTransition, delay: shouldReduceMotion ? 0 : 0.08 }}
        variants={sectionAnimation}
      >
        <Footer />
      </motion.div>
      </main>

      <AgentChat />
    </>
  );
}
