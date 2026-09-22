"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function AboutSection() {
  const shouldReduceMotion = useReducedMotion();
  const transition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <motion.section
      className="mx-auto max-w-[1240px] border-t border-[var(--line)] px-[5vw] pb-32 pt-8"
      id="about"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
    >
      <motion.div
        variants={reveal}
        transition={transition}
      >
        <p className="m-0 mb-8 text-[.69rem] font-bold uppercase tracking-[.14em] text-[var(--muted)]">
          02 / A little about me
        </p>
      </motion.div>

      <div className="grid gap-10 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
        <motion.div
          className="relative"
          variants={reveal}
          transition={transition}
        >
          <motion.div
            className="rounded-[32px] border border-[var(--line)] bg-[rgba(255,255,255,0.18)] p-3 shadow-[0_24px_60px_rgba(16,42,28,0.08)] backdrop-blur-sm"
            whileHover={shouldReduceMotion ? undefined : { y: -6, transition: { duration: 0.25 } }}
          >
            <div className="overflow-hidden rounded-[24px] border border-[var(--line)] bg-[var(--background)]">
              <motion.div
                whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.4 }}
              >
                <Image
                  src="/ChatGPT Image Sep 20, 2026, 06_12_43 AM.png"
                  alt="Fahad Hassan in a formal suit"
                  width={1086}
                  height={1448}
                  sizes="(max-width: 1024px) 90vw, 600px"
                  className="h-[520px] w-full object-cover object-center md:h-[620px]"
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex flex-col justify-center"
          variants={reveal}
          transition={{ ...transition, delay: shouldReduceMotion ? 0 : 0.08 }}
        >
          <h2 className="m-0 text-[clamp(2.2rem,4vw,4.4rem)] font-medium leading-[.96] tracking-[-.075em] text-[var(--foreground)]">
            Good work lives somewhere between a sharp idea and a human feeling.
          </h2>

          <div className="mt-7 space-y-5">
            <p className="m-0 max-w-[480px] text-[.96rem] leading-[1.7] text-[var(--muted)]">
              I care about the details that make a digital product feel natural: clear words, useful motion, and interfaces that leave room for people to think.
            </p>
            <p className="m-0 max-w-[480px] text-[.96rem] leading-[1.7] text-[var(--muted)]">
              From early concept to final polish, I work closely with teams to make complex things feel simple and valuable.
            </p>
          </div>

          <motion.a
            className="mt-8 inline-flex w-fit items-center gap-2.5 border-b border-[var(--foreground)] pb-2 text-[.78rem] font-medium uppercase tracking-[.12em] text-[var(--foreground)] transition-transform duration-200 hover:translate-x-1"
            href="#contact"
            whileHover={shouldReduceMotion ? undefined : { x: 6 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }}
          >
            More about my approach
            <span className="text-[1.1rem] leading-[.65] text-[var(--accent)]" aria-hidden="true">
              ↘
            </span>
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
}
