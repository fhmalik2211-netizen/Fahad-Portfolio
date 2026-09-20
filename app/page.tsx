"use client";

import { motion, useReducedMotion } from "framer-motion";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import ExperienceSection from "./components/ExperienceSection";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import SkillsSection from "./components/SkillsSection";
import ServicesSection from "./components/ServicesSection";

const sectionAnimation = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  const shouldReduceMotion = useReducedMotion();

  const revealTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <main>
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
  );
}
