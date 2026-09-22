"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const heroContent = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const heroContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.12 },
  },
};

export default function Hero() {
  const stats = [
    { label: "Years experience", value: "2+" },
    { label: "Projects shipped", value: "10+" },
    { label: "Core stack", value: "MERN" },
    { label: "Based in", value: "Chiniot, Sargodha" },
  ];
  const sectionRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const motionTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const };

  const glowY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const glowX = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, -24]);

  const floatingGlow = shouldReduceMotion
    ? undefined
    : { y: [0, -12, 0], scale: [1, 1.08, 1], transition: { duration: 10, repeat: Infinity, ease: [0.42, 0, 0.58, 1] as const } };

  return (
    <section
      ref={sectionRef}
      className="relative mx-auto mt-8 max-w-[1240px] overflow-hidden rounded-[32px] border border-[var(--line)] bg-[color-mix(in_srgb,var(--background)_90%,var(--accent)_10%)] px-[5vw] pb-20 pt-[5.5rem] shadow-[0_24px_70px_rgba(16,42,28,0.05)] md:mt-10 md:pb-24 md:pt-[6.5rem]"
      id="top"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute right-[-8%] top-[-20%] h-[34rem] w-[34rem] rounded-full bg-[var(--accent)] opacity-[0.06] blur-[100px]"
          style={shouldReduceMotion ? undefined : { y: glowY, x: glowX }}
          animate={floatingGlow}
        />
        <motion.div
          className="absolute bottom-[-8%] left-[-6%] h-[20rem] w-[20rem] rounded-full border border-[var(--line)] bg-[var(--background)]/60 blur-3xl"
          style={shouldReduceMotion ? undefined : { y: glowY, x: glowX }}
          animate={shouldReduceMotion ? undefined : { y: [0, 16, 0], x: [0, 8, 0], transition: { duration: 12, repeat: Infinity, ease: [0.42, 0, 0.58, 1] as const } }}
        />
        <motion.div
          className="absolute inset-0 opacity-[0.38]"
          style={shouldReduceMotion ? undefined : { y: gridY }}
          aria-hidden="true"
        >
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "linear-gradient(to right, var(--line) 1px, transparent 1px), linear-gradient(to bottom, var(--line) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
              maskImage:
                "radial-gradient(ellipse 60% 52% at 50% 0%, black 0%, transparent 72%)",
            }}
          />
        </motion.div>
      </div>

      <div className="grid items-center gap-12 lg:grid-cols-[1.22fr_0.78fr]">
        <motion.div
          className="relative z-[1]"
          initial="hidden"
          animate="visible"
          variants={heroContainer}
        >
          <motion.div
            className="mb-8 flex flex-wrap items-center justify-between gap-4"
            variants={heroContent}
            transition={{ ...motionTransition, delay: 0.02 }}
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-12 bg-[var(--accent)]" />
              <p className="text-[.7rem] font-bold uppercase tracking-[.18em] text-[var(--muted)]">
                Full-Stack Developer
              </p>
            </div>

            <motion.div
              className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--background)]/70 px-3.5 py-1.5 text-[.72rem] font-medium text-[var(--muted)] shadow-[0_8px_22px_rgba(16,42,28,0.03)] backdrop-blur-sm"
              whileHover={shouldReduceMotion ? undefined : { y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <span className="relative flex h-[7px] w-[7px]">
                <motion.span
                  className="absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"
                  animate={shouldReduceMotion ? undefined : { scale: [1, 1.8, 1], opacity: [0.8, 0.2, 0.8] }}
                  transition={shouldReduceMotion ? { duration: 0 } : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                />
                <span className="relative inline-flex h-[7px] w-[7px] rounded-full bg-[var(--accent)]" />
              </span>
              Available for new projects
            </motion.div>
          </motion.div>

          <motion.div className="max-w-[900px]" variants={heroContent} transition={motionTransition}>
            <h1 className="m-0 text-[clamp(3rem,6vw,6rem)] font-medium leading-[0.94] tracking-[-0.06em] text-[var(--foreground)]">
              I design and build full-stack products
              <span className="mt-2 block text-[var(--muted)]">
                from database to interface.
              </span>
            </h1>

            <p className="m-0 mt-7 max-w-[620px] text-[1.04rem] leading-[1.8] text-[var(--muted)]">
              I&apos;m Fahad, a full-stack developer helping teams ship complete digital products —
              strong backend systems, thoughtful product architecture, and polished interfaces that feel effortless.
            </p>
          </motion.div>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-4"
            variants={heroContent}
            transition={{ ...motionTransition, delay: 0.08 }}
          >
            <motion.a
              whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.01 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
              className="group inline-flex items-center gap-2.5 rounded-full bg-[var(--accent)] px-6 py-3.5 text-[.82rem] font-medium text-[var(--background)] shadow-[0_16px_35px_rgba(35,131,79,0.22)] transition-all duration-200 hover:brightness-110 hover:text-[var(--background)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              href="#contact"
            >
              Let&apos;s build something
              <motion.span
                className="text-[1rem] leading-none text-[var(--background)]"
                animate={shouldReduceMotion ? undefined : { x: [0, 4, 0] }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden="true"
              >
                →
              </motion.span>
            </motion.a>
            <motion.a
              whileHover={shouldReduceMotion ? undefined : { y: -2 }}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
              className="inline-flex items-center gap-2.5 rounded-full border border-[var(--line)] bg-[var(--background)]/60 px-6 py-3.5 text-[.82rem] font-medium text-[var(--foreground)] transition-all duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)]"
              href="#about"
            >
              More about me
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative z-[1]"
          initial="hidden"
          animate="visible"
          variants={heroContent}
          transition={{ ...motionTransition, delay: shouldReduceMotion ? 0 : 0.25 }}
        >
          <motion.div
            className="rounded-[28px] border border-[var(--line)] bg-[rgba(255,255,255,0.32)] p-5 shadow-[0_28px_80px_rgba(16,42,28,0.08)] backdrop-blur-md dark:bg-[color-mix(in_srgb,var(--background)_90%,var(--accent)_10%)]"
            whileHover={shouldReduceMotion ? undefined : { y: -6, rotateX: 2, transition: { duration: 0.28, ease: "easeOut" } }}
            style={{ transformPerspective: 1200 }}
          >
            <div className="mb-5 flex items-center justify-between">
              <span className="text-[.68rem] font-semibold uppercase tracking-[.18em] text-[var(--muted)]">
                Focus areas
              </span>
              <span className="rounded-full border border-[var(--line)] bg-[var(--background)]/70 px-2 py-1 text-[.62rem] font-medium tracking-[.12em] text-[var(--muted)] uppercase">
                2026
              </span>
            </div>

            <div className="rounded-[22px] border border-[var(--line)] bg-[var(--background)]/70 p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="m-0 text-[.62rem] uppercase tracking-[.16em] text-[var(--muted)]">Profile</p>
                  <h2 className="mt-2 text-[1.7rem] font-medium tracking-[-.05em] text-[var(--foreground)]">Fahad</h2>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent)]/12 text-lg text-[var(--accent)]">
                  ✦
                </div>
              </div>

              <ul className="space-y-3 text-[.78rem] text-[var(--muted)]">
                <li className="flex items-center justify-between gap-3 border-b border-[var(--line)] pb-2.5">
                  <span>Product strategy</span>
                  <span className="text-[var(--foreground)]">01</span>
                </li>
                <li className="flex items-center justify-between gap-3 border-b border-[var(--line)] pb-2.5">
                  <span>UI/UX systems</span>
                  <span className="text-[var(--foreground)]">02</span>
                </li>
                <li className="flex items-center justify-between gap-3 pb-1">
                  <span>Full-stack builds</span>
                  <span className="text-[var(--foreground)]">03</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="relative z-[1] mt-16 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        initial="hidden"
        animate="visible"
        variants={heroContainer}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="rounded-2xl border border-[var(--line)] bg-[rgba(255,255,255,0.24)] p-4 shadow-[0_12px_30px_rgba(16,42,28,0.04)] backdrop-blur-sm transition-all duration-300 hover:border-[var(--accent)]/50 dark:bg-[color-mix(in_srgb,var(--background)_92%,var(--accent)_8%)]"
            variants={heroContent}
            transition={{ ...motionTransition, delay: shouldReduceMotion ? 0 : index * 0.06 }}
            whileHover={shouldReduceMotion ? undefined : { y: -6, scale: 1.01 }}
          >
            <div className="mb-2 h-px w-10 bg-[var(--accent)]/80" />
            <span className="block text-[1.8rem] font-medium tracking-[-.05em] text-[var(--foreground)] sm:text-[2rem]">
              {stat.value}
            </span>
            <span className="mt-2 block text-[.68rem] uppercase tracking-[.12em] text-[var(--muted)]">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}