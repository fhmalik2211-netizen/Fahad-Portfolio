const skills = [
  {
    category: "Frontend",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "UI Systems"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "API Design", "PostgreSQL", "MongoDB"],
  },
  {
    category: "Product",
    items: ["Architecture", "Design Systems", "Performance", "Testing", "Shipping"],
  },
];

export default function SkillsSection() {
  return (
    <section
      className="mx-auto max-w-[1240px] border-t border-[var(--line)] px-[5vw] pb-32 pt-16"
      id="skills"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="m-0 text-[1.9rem] font-medium tracking-[-.03em] text-[var(--foreground)]">
          Core skills
        </h2>
        <p className="m-0 max-w-[380px] text-[.88rem] leading-[1.5] text-[var(--muted)] sm:text-right">
          I like building systems that work cleanly for both users and teams.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {skills.map((group) => (
          <div
            key={group.category}
            className="rounded-2xl border border-[var(--line)] bg-[var(--background)] p-6"
          >
            <p className="m-0 mb-5 text-[.68rem] font-bold uppercase tracking-[.15em] text-[var(--muted)]">
              {group.category}
            </p>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[var(--line)] px-3 py-1.5 text-[.76rem] text-[var(--foreground)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}