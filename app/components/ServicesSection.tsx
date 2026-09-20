"use client";

import { motion, useReducedMotion } from "framer-motion";

const services = [
  {
    number: "01",
    title: "Ecommerce websites",
    description:
      "Conversion-focused stores with thoughtful product flows, secure integrations, and a smooth experience from discovery to checkout.",
  },
  {
    number: "02",
    title: "Website redesign",
    description:
      "A sharper visual system, clearer structure, and a more useful interface for websites that have outgrown their first version.",
  },
  {
    number: "03",
    title: "Bug fixing and optimization",
    description:
      "Focused debugging, responsive fixes, and performance improvements that make an existing product more stable and dependable.",
  },
  {
    number: "04",
    title: "End-to-end websites",
    description:
      "Complete digital products shaped from idea to launch, including planning, interface design, development, and final polish.",
  },
  {
    number: "05",
    title: "Frontend development",
    description:
      "Responsive, accessible interfaces built with modern React, Next.js, TypeScript, and component-driven UI systems.",
  },
  {
    number: "06",
    title: "Backend development",
    description:
      "Reliable server-side systems, APIs, databases, and business logic designed to support real product workflows.",
  },
  {
    number: "07",
    title: "API and CMS integration",
    description:
      "Connected experiences that bring together content, payments, third-party services, and the tools your team already uses.",
  },
  {
    number: "08",
    title: "Performance and accessibility",
    description:
      "Practical improvements that help products load faster, work across devices, and feel better for every user.",
  },
];

export default function ServicesSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className="mx-auto max-w-[1240px] border-t border-[var(--line)] px-[5vw] pb-32 pt-16"
      id="services"
      aria-labelledby="services-heading"
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="m-0 mb-4 text-[.69rem] font-bold uppercase tracking-[.16em] text-[var(--muted)]">
            03 / Services
          </p>
          <h2
            className="m-0 max-w-[650px] text-[clamp(2.4rem,5vw,5rem)] font-medium leading-[.95] tracking-[-.07em] text-[var(--foreground)]"
            id="services-heading"
          >
            Useful work, built around your next move.
          </h2>
        </div>
        <p className="m-0 max-w-[360px] text-[.92rem] leading-[1.65] text-[var(--muted)] lg:pb-1 lg:text-right">
          From a focused fix to a complete product, I bring design thinking and dependable engineering to the same table.
        </p>
      </div>

      <motion.div
        className="mt-14 grid gap-px overflow-hidden rounded-[26px] border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: shouldReduceMotion ? 0 : 0.06 },
          },
        }}
      >
        {services.map((service) => (
          <motion.article
            key={service.number}
            className="group min-h-[220px] bg-[var(--background)] p-6 transition-colors duration-300 hover:bg-[color-mix(in_srgb,var(--background)_88%,var(--accent)_12%)] sm:p-7"
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
            }
          >
            <div className="flex items-start justify-between gap-4">
              <span className="text-[.68rem] font-bold tracking-[.14em] text-[var(--accent)]">
                {service.number}
              </span>
              <span
                className="text-[1.15rem] text-[var(--accent)] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                aria-hidden="true"
              >
                ↗
              </span>
            </div>
            <h3 className="mt-12 max-w-[220px] text-[1.22rem] font-medium leading-[1.05] tracking-[-.035em] text-[var(--foreground)]">
              {service.title}
            </h3>
            <p className="mt-4 text-[.82rem] leading-[1.65] text-[var(--muted)]">
              {service.description}
            </p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
