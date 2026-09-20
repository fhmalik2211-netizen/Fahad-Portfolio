export default function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--background)]/80">
      <div className="mx-auto flex max-w-[1240px] flex-col justify-between gap-6 px-[5vw] py-8 text-xs tracking-[.08em] text-[var(--muted)] uppercase sm:flex-row sm:items-center">
        <p className="m-0 font-medium">© 2026 Fahad Hassan</p>

        <div className="flex flex-wrap items-center gap-5 sm:gap-8">
          <a
            className="transition-colors duration-200 hover:text-[var(--foreground)]"
            href="#top"
          >
            Back to top ↑
          </a>
          <a
            className="transition-colors duration-200 hover:text-[var(--foreground)]"
            href="https://www.linkedin.com"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn ↗
          </a>
          <a
            className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-3 py-1.5 text-[.65rem] font-medium tracking-[.12em] text-[var(--foreground)] transition-all duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)]"
            href="mailto:unknownfahai@gmail.com"
          >
            unknownfahai@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}
