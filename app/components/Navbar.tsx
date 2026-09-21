"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = savedTheme ? savedTheme === "dark" : prefersDark;

    document.documentElement.classList.toggle("dark", shouldUseDark);
    const themeFrame = window.requestAnimationFrame(() => setIsDark(shouldUseDark));

    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(themeFrame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  function toggleTheme() {
    const nextIsDark = !isDark;
    document.documentElement.classList.toggle("dark", nextIsDark);
    window.localStorage.setItem("portfolio-theme", nextIsDark ? "dark" : "light");
    setIsDark(nextIsDark);
  }

  const navLinks = [
    { href: "/#about", label: "About" },
    { href: "/#skills", label: "Skills" },
    { href: "/#services", label: "Services" },
    { href: "/#experience", label: "Experience" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <nav
        className={`sticky top-3 z-50 mx-auto flex h-[72px] max-w-[1240px] items-center justify-between rounded-full border px-[1.05rem] transition-all duration-300 sm:px-[1.4rem] ${
          scrolled
            ? "border-[var(--line)] bg-[color-mix(in_srgb,var(--background)_86%,transparent)] shadow-[0_18px_40px_rgba(16,42,28,0.06)] backdrop-blur-xl"
            : "border-[var(--line)]/70 bg-[color-mix(in_srgb,var(--background)_72%,transparent)] backdrop-blur-md"
        }`}
        aria-label="Main navigation"
      >
        <a
          className="group flex items-center text-[1.25rem] font-extrabold tracking-[-.08em] text-[var(--foreground)]"
          href="#top"
          aria-label="Fahad home"
        >
          <span className="relative inline-flex items-center gap-0.5">
            FA
            <span className="inline-block text-[var(--accent)] transition-transform duration-300 group-hover:rotate-12">
              .
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-7 text-[.72rem] font-medium tracking-[.12em] text-[var(--muted)] uppercase sm:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative py-2 transition-colors duration-200 hover:text-[var(--foreground)]"
            >
              {link.label}
              <span className="absolute inset-x-0 -bottom-[7px] h-[1.5px] origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <a
            className="hidden items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--background)]/80 px-3 py-1.5 text-[.68rem] font-medium tracking-[.04em] text-[var(--muted)] shadow-[0_8px_20px_rgba(16,42,28,0.02)] transition-all duration-200 hover:border-[var(--accent)] hover:text-[var(--foreground)] sm:flex"
            href="/contact"
          >
            <span className="relative flex h-[7px] w-[7px]">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-75" />
              <span className="relative inline-flex h-[7px] w-[7px] rounded-full bg-[var(--accent)]" />
            </span>
            Available for work
          </a>

          <button
            className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-[var(--line)] bg-[var(--background)]/80 text-[var(--foreground)] shadow-[0_8px_20px_rgba(16,42,28,0.03)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent)] active:scale-95"
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            <span
              className={`absolute text-[15px] transition-all duration-300 ${
                isDark ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              ☼
            </span>
            <span
              className={`absolute text-[15px] transition-all duration-300 ${
                isDark ? "-translate-y-6 opacity-0" : "translate-y-0 opacity-100"
              }`}
            >
              ☾
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--background)]/80 text-[var(--foreground)] shadow-[0_8px_20px_rgba(16,42,28,0.03)] transition-all duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)] sm:hidden"
            aria-label={mobileOpen ? "Close mobile menu" : "Open mobile menu"}
            aria-expanded={mobileOpen}
          >
            <span className="flex flex-col gap-1.5">
              <span className={`block h-0.5 w-4 rounded-full bg-current transition-all ${mobileOpen ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-0.5 w-4 rounded-full bg-current transition-all ${mobileOpen ? "opacity-0" : "opacity-100"}`} />
              <span className={`block h-0.5 w-4 rounded-full bg-current transition-all ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
        <motion.div
          className="fixed inset-0 z-40 sm:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-[rgba(10,17,14,0.35)] backdrop-blur-[2px]"
          />

          <motion.aside
            className="absolute right-4 top-24 w-[min(82vw,320px)] rounded-[28px] border border-[var(--line)] bg-[color-mix(in_srgb,var(--background)_96%,white_4%)] p-5 shadow-[0_28px_80px_rgba(16,42,28,0.12)]"
            initial={{ opacity: 0, x: 18, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 18, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="text-[.68rem] font-semibold uppercase tracking-[.16em] text-[var(--muted)]">
                Menu
              </span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--line)] text-[var(--foreground)]"
                aria-label="Close menu"
              >
                ×
              </button>
            </div>

            <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-2xl border border-transparent px-3 py-3 text-[.82rem] font-medium tracking-[.08em] text-[var(--foreground)] uppercase transition-all hover:border-[var(--line)] hover:bg-[var(--background)]"
                >
                  {link.label}
                </a>
              ))}

              <a
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--foreground)] px-4 py-3 text-[.75rem] font-medium tracking-[.08em] text-[var(--background)] uppercase"
              >
                <span className="relative flex h-[7px] w-[7px]">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-75" />
                  <span className="relative inline-flex h-[7px] w-[7px] rounded-full bg-[var(--accent)]" />
                </span>
                Work with me
              </a>
            </nav>
          </motion.aside>
        </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}