"use client";

import { useState } from "react";

const projects = [
  {
    name: "Northstar",
    role: "Full-stack platform",
    year: "2025",
    description:
      "Multi-tenant SaaS dashboard with real-time analytics — built the API, database schema, and the interface that reads them.",
    stack: ["Next.js", "PostgreSQL", "Node.js", "Redis"],
    href: "#contact",
  },
  {
    name: "Field Notes",
    role: "Content platform & CMS",
    year: "2024",
    description:
      "Editorial publishing tool with a custom headless CMS, scheduled publishing, and a fast, ad-free reading experience.",
    stack: ["React", "Express", "MongoDB"],
    href: "#contact",
  },
  {
    name: "Morrow",
    role: "Ecommerce & checkout",
    year: "2024",
    description:
      "Storefront and checkout flow handling inventory, payments, and order fulfillment for a small retail brand.",
    stack: ["Next.js", "Stripe", "PostgreSQL"],
    href: "#contact",
  },
];

export default function WorkSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      className="mx-auto max-w-[1240px] border-t border-[var(--line)] px-[5vw] pb-32 pt-16"
      id="work"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="m-0 text-[1.9rem] font-medium tracking-[-.03em]">
          Selected work
        </h2>
        <p className="m-0 max-w-[320px] text-[.88rem] leading-[1.5] text-[var(--muted)] sm:text-right">
          Products I&apos;ve built end to end — architecture, backend, and
          interface.
        </p>
      </div>

      <div className="mt-14 border-t border-[var(--line)]">
        {projects.map((project, index) => {
          const isOpen = openIndex === index;
          return (
            <a
              key={project.name}
              href={project.href}
              className="group block border-b border-[var(--line)] py-8 transition-colors"
              onMouseEnter={() => setOpenIndex(index)}
              onMouseLeave={() => setOpenIndex(null)}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-baseline gap-4">
                  <h3 className="m-0 text-[1.65rem] font-medium tracking-[-.025em] transition-colors group-hover:text-[var(--accent)] sm:text-[2rem]">
                    {project.name}
                  </h3>
                  <span className="text-[.8rem] text-[var(--muted)]">
                    {project.year}
                  </span>
                </div>

                <div className="flex items-center gap-6">
                  <span className="hidden text-[.82rem] text-[var(--muted)] sm:block">
                    {project.role}
                  </span>
                  <span
                    className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-[var(--line)] text-base transition-all duration-300 group-hover:border-[var(--accent)] group-hover:text-[var(--accent)] ${
                      isOpen ? "rotate-45" : ""
                    }`}
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </div>
              </div>

              <div
                className={`grid overflow-hidden transition-all duration-300 ease-out ${
                  isOpen
                    ? "mt-5 grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="min-h-0">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <p className="m-0 max-w-[480px] text-[.92rem] leading-[1.6] text-[var(--muted)]">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 sm:justify-end">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-[var(--line)] px-3 py-1 text-[.72rem] text-[var(--muted)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}