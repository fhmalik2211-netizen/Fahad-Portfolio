export default function ContactSection() {
  return (
    <section
      className="border-t border-[var(--line)] bg-[var(--background)] px-[max(5vw,calc((100vw-1140px)/2))] pb-32 pt-[5.5rem]"
      id="contact"
    >
      <div className="mx-auto max-w-[1240px] rounded-[28px] border border-[var(--line)] bg-[var(--background)] px-6 py-10 text-[var(--foreground)] shadow-[0_28px_70px_rgba(16,42,28,0.08)] sm:px-8 md:px-10">
        <p className="m-0 text-[.69rem] font-bold uppercase tracking-[.16em] text-[var(--muted)]">
          05 / Start a conversation
        </p>

        <div className="mt-14 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="m-0 max-w-[760px] text-[clamp(3rem,6vw,7rem)] font-medium leading-[.92] tracking-[-.08em] text-[var(--foreground)]">
            Have a good idea?
            <span className="mt-3 block text-[var(--accent)]">Let&apos;s make it real.</span>
          </h2>

          <a
            className="group inline-flex items-center gap-3 rounded-full border border-[var(--accent)] bg-[var(--accent)] px-5 py-3 text-[.82rem] font-semibold uppercase tracking-[.12em] text-[var(--background)] shadow-[0_12px_28px_rgba(35,131,79,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            href="mailto:hello@fahad.dev"
          >
            hello@fahad.dev
            <span
              className="inline-flex text-[1.1rem] text-[var(--background)] transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            >
              ↗
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
