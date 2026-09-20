export default function AboutSection() {
  return (
    <section className="mx-auto max-w-[1240px] border-t border-[var(--line)] px-[5vw] pb-32 pt-8" id="about">
      <div>
        <p className="m-0 mb-8 text-[.69rem] font-bold uppercase tracking-[.14em] text-[var(--muted)]">
          02 / A little about me
        </p>
      </div>

      <div className="grid gap-10 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
        <div className="relative">
          <div className="rounded-[32px] border border-[var(--line)] bg-[rgba(255,255,255,0.18)] p-3 shadow-[0_24px_60px_rgba(16,42,28,0.08)] backdrop-blur-sm">
            <div className="overflow-hidden rounded-[24px] border border-[var(--line)] bg-[var(--background)]">
              <img
                src="/ChatGPT Image Sep 20, 2026, 06_12_43 AM.png"
                alt="Fahad Ahmed in a formal suit"
                className="h-[520px] w-full object-cover object-center md:h-[620px]"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center">
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

          <a
            className="mt-8 inline-flex w-fit items-center gap-2.5 border-b border-[var(--foreground)] pb-2 text-[.78rem] font-medium uppercase tracking-[.12em] text-[var(--foreground)] transition-transform duration-200 hover:translate-x-1"
            href="#contact"
          >
            More about my approach
            <span className="text-[1.1rem] leading-[.65] text-[var(--accent)]" aria-hidden="true">
              ↘
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
