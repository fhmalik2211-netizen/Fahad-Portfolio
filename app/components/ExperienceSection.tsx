"use client";

import { motion, useReducedMotion } from "framer-motion";

const experiences = [
  {
    duration: "1 year +",
    company: "GoEnterprise",
    role: "Full-Stack Developer",
    description:
      "Built and maintained business-facing web applications, improved product workflows, and contributed to end-to-end product development across frontend and backend systems.",
  },
  {
    duration: "6 months",
    company: "WP Rogers",
    role: "Developer",
    description:
      "Worked on client-focused digital projects, supported implementation work, and contributed to polished, responsive interfaces and functional web experiences.",
  },
  {
    duration: "6 months",
    company: "Self Projects",
    role: "Independent Builder",
    description:
      "Designed and shipped personal product experiments, frontend interfaces, and full-stack prototypes to strengthen product thinking, execution, and UI craft.",
  },
];

export default function ExperienceSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      className="mx-auto max-w-[1240px] px-[5vw] py-24"
      id="experience"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
    >
      <motion.div
        className="mb-14 flex flex-col gap-3"
        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="m-0 text-[.69rem] font-bold uppercase tracking-[.16em] text-[var(--muted)]">
          04 / Experience
        </p>
        <h2 className="m-0 text-[clamp(2.2rem,4.2vw,4.4rem)] font-medium leading-[.98] tracking-[-.07em] text-[var(--foreground)]">
          Professional experience
        </h2>
      </motion.div>

      <div className="relative space-y-5 before:absolute before:bottom-0 before:left-[1.1rem] before:top-0 before:w-px before:bg-[var(--line)] before:content-[''] sm:before:left-[2.1rem]">
        {experiences.map((item, index) => (
          <motion.article
            key={item.company}
            className="relative rounded-[26px] border border-[var(--line)] bg-[color-mix(in_srgb,var(--background)_78%,white_22%)] p-5 shadow-[0_16px_40px_rgba(16,42,28,0.04)] backdrop-blur-sm sm:p-7 dark:bg-[color-mix(in_srgb,var(--background)_60%,#1d2a23_40%)]"
            variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            whileHover={shouldReduceMotion ? undefined : { y: -4, transition: { duration: 0.2 } }}
          >
            <div className="flex items-start gap-4 sm:gap-6">
              <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--background)] text-[.72rem] font-semibold text-[var(--accent)] sm:h-11 sm:w-11">
                {item.duration.split(" ")[0]}
              </div>

              <div className="w-full">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="m-0 text-[.68rem] font-bold uppercase tracking-[.16em] text-[var(--muted)]">
                      {item.duration}
                    </p>
                    <h3 className="mt-2 text-[1.7rem] font-medium tracking-[-.05em] text-[var(--foreground)] sm:text-[2rem]">
                      {item.company}
                    </h3>
                  </div>

                  <p className="m-0 text-[.72rem] uppercase tracking-[.12em] text-[var(--muted)]">
                    {item.role}
                  </p>
                </div>

                <p className="mt-5 max-w-[760px] text-[.96rem] leading-[1.8] text-[var(--muted)]">
                  {item.description}
                </p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}
