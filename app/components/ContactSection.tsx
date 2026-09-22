"use client";

import { motion, useReducedMotion } from "framer-motion";
import { FormEvent, useState } from "react";
import SubmissionModal, { SubmissionStatus } from "./SubmissionModal";

export default function ContactSection() {
  const [result, setResult] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus | null>(null);
  const shouldReduceMotion = useReducedMotion();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSending(true);
    setResult("");
    setSubmissionStatus(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", "58468ebe-17ff-426c-8ae7-f4614e7e8169");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        setResult("Thanks, your message is on its way.");
        setSubmissionStatus("success");
        form.reset();
      } else {
        setResult("Something went wrong. Please email me directly.");
        setSubmissionStatus("error");
      }
    } catch {
      setResult("Something went wrong. Please email me directly.");
      setSubmissionStatus("error");
    } finally {
      setIsSending(false);
    }
  }

  const revealTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <>
      <motion.section
        className="relative overflow-hidden border-t border-[var(--line)] bg-[var(--background)] px-[5vw] pb-24 pt-8 sm:pb-32 sm:pt-12"
        id="contact"
        aria-labelledby="contact-heading"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
      >
        <div className="pointer-events-none absolute right-[-8rem] top-[-8rem] h-[24rem] w-[24rem] rounded-full border border-[var(--line)] opacity-60" />
        <div className="pointer-events-none absolute bottom-[-11rem] left-[-7rem] h-[25rem] w-[25rem] rounded-full bg-[var(--art-yellow)] opacity-25 blur-3xl" />

        <div className="relative mx-auto max-w-[1240px]">
          <motion.p
            className="m-0 text-[.69rem] font-bold uppercase tracking-[.16em] text-[var(--muted)]"
            variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
            transition={revealTransition}
          >
            05 / Start a conversation
          </motion.p>

          <div className="mt-14 grid gap-14 lg:grid-cols-[1.2fr_.8fr] lg:gap-20">
            <motion.div
              variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0 } }}
              transition={{ ...revealTransition, delay: shouldReduceMotion ? 0 : 0.05 }}
            >
              <h1
                className="m-0 max-w-[800px] text-[clamp(3.25rem,8vw,7.8rem)] font-medium leading-[.89] tracking-[-.085em] text-[var(--foreground)]"
                id="contact-heading"
              >
                Let&apos;s make something <span className="text-[var(--accent)]">useful.</span>
              </h1>
              <p className="mt-8 max-w-[570px] text-[1rem] leading-[1.8] text-[var(--muted)] sm:text-[1.08rem]">
                Have a product in mind, a website that needs a sharper direction, or a tricky problem to untangle? Tell me what you&apos;re working on and I&apos;ll get back to you within two business days.
              </p>
              <motion.a
                className="group mt-9 inline-flex items-center gap-3 rounded-full bg-[var(--accent)] px-6 py-4 text-[.76rem] font-semibold uppercase tracking-[.12em] text-[var(--background)] shadow-[0_16px_35px_rgba(35,131,79,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                href="mailto:unknownfahai@gmail.com"
                whileHover={shouldReduceMotion ? undefined : { y: -3 }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }}
              >
                Send an email
                <span className="text-[1.1rem] transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                  ↗
                </span>
              </motion.a>
            </motion.div>

            <motion.div
              className="border-t border-[var(--line)] pt-5 lg:mt-2"
              variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0 } }}
              transition={{ ...revealTransition, delay: shouldReduceMotion ? 0 : 0.09 }}
            >
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
                {[
                  { label: "Email", value: "unknownfahai@gmail.com", href: "mailto:unknownfahai@gmail.com" },
                  { label: "Based in", value: "Chiniot, Sargodha" },
                  { label: "Best for", value: "Websites, product builds, and thoughtful fixes." },
                ].map((item) => (
                  <motion.div
                    key={item.label}
                    whileHover={shouldReduceMotion ? undefined : { x: 4, transition: { duration: 0.2 } }}
                  >
                    <p className="m-0 text-[.68rem] font-bold uppercase tracking-[.15em] text-[var(--muted)]">{item.label}</p>
                    {item.href ? (
                      <a className="mt-3 inline-block text-[1.05rem] text-[var(--foreground)] underline decoration-[var(--line)] underline-offset-8 transition-colors hover:text-[var(--accent)] hover:decoration-[var(--accent)]" href={item.href}>
                        {item.value}
                      </a>
                    ) : (
                      <p className="mt-3 text-[1.05rem] text-[var(--foreground)]">{item.value}</p>
                    )}
                  </motion.div>
                ))}
              </div>

              <motion.form
                className="mt-10 rounded-[22px] border border-[var(--line)] bg-[color-mix(in_srgb,var(--background)_72%,white_28%)] p-5 sm:p-6 dark:bg-[color-mix(in_srgb,var(--background)_92%,var(--accent)_8%)]"
                onSubmit={onSubmit}
                whileHover={shouldReduceMotion ? undefined : { y: -3 }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2 }}
              >
                <div className="flex items-center justify-between gap-4 border-b border-[var(--line)] pb-4">
                  <p className="m-0 text-[.68rem] font-bold uppercase tracking-[.15em] text-[var(--muted)]">
                    Project enquiry
                  </p>
                  <span className="text-[.68rem] uppercase tracking-[.12em] text-[var(--muted)]">Takes 2 min</span>
                </div>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-[.68rem] font-semibold uppercase tracking-[.12em] text-[var(--muted)]">Your name</span>
                    <input
                      className="mt-2 w-full rounded-xl border border-[var(--line)] bg-[var(--background)] px-4 py-3 text-[.92rem] text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted)]/70 focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/15"
                      type="text"
                      name="name"
                      placeholder="Fahad Hassan"
                      autoComplete="name"
                      required
                    />
                  </label>
                  <label className="block">
                    <span className="text-[.68rem] font-semibold uppercase tracking-[.12em] text-[var(--muted)]">Email address</span>
                    <input
                      className="mt-2 w-full rounded-xl border border-[var(--line)] bg-[var(--background)] px-4 py-3 text-[.92rem] text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted)]/70 focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/15"
                      type="email"
                      name="email"
                      placeholder="you@company.com"
                      autoComplete="email"
                      required
                    />
                  </label>
                </div>

                <label className="mt-5 block">
                  <span className="text-[.68rem] font-semibold uppercase tracking-[.12em] text-[var(--muted)]">Project details</span>
                  <textarea
                    className="mt-2 min-h-32 w-full resize-y rounded-xl border border-[var(--line)] bg-[var(--background)] px-4 py-3 text-[.92rem] leading-[1.6] text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted)]/70 focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/15"
                    name="message"
                    placeholder="What are you building, and where can I help?"
                    required
                  />
                </label>

                <div className="mt-5 flex flex-col gap-4 border-t border-[var(--line)] pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="m-0 text-[.72rem] leading-[1.5] text-[var(--muted)]" role="status" aria-live="polite">
                    {result || "I usually reply within two business days."}
                  </p>
                  <button
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-3.5 text-[.72rem] font-bold uppercase tracking-[.12em] text-[var(--background)] shadow-[0_10px_20px_rgba(35,131,79,0.16)] transition-all hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-wait disabled:opacity-60 sm:w-auto"
                    type="submit"
                    disabled={isSending}
                  >
                    {isSending ? "Sending..." : "Send message"}
                    <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">↗</span>
                  </button>
                </div>
              </motion.form>
            </motion.div>
          </div>

          <div className="mt-16 border-y border-[var(--line)]">
            <div className="grid sm:grid-cols-3">
              {[
                ["01", "Share the brief", "A few sentences about the goal, timeline, and where you need help."],
                ["02", "Find the shape", "We clarify the right scope and a practical way to move forward."],
                ["03", "Build with care", "I bring the system, interface, and details together for launch."],
              ].map(([number, title, description], index) => (
                <motion.article
                  className={`group relative border-b border-[var(--line)] py-7 sm:border-b-0 sm:px-7 sm:py-9 ${
                    index < 2 ? "sm:border-r" : ""
                  }`}
                  key={number}
                  variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
                  transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={shouldReduceMotion ? undefined : { y: -3 }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[.68rem] font-bold tracking-[.16em] text-[var(--accent)]">STEP {number}</span>
                    <span className="text-[1.35rem] text-[var(--accent)] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true">
                      ↗
                    </span>
                  </div>
                  <div className="mt-10 flex items-start gap-4">
                    <span className="text-[3.4rem] font-medium leading-[.8] tracking-[-.08em] text-[var(--line)] transition-colors duration-300 group-hover:text-[var(--accent)]">
                      {number}
                    </span>
                    <div>
                      <h2 className="m-0 pt-1 text-[1.2rem] font-medium leading-[1.05] tracking-[-.035em] text-[var(--foreground)]">{title}</h2>
                      <p className="mt-4 max-w-[240px] text-[.84rem] leading-[1.7] text-[var(--muted)]">{description}</p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {submissionStatus && (
        <SubmissionModal status={submissionStatus} onClose={() => setSubmissionStatus(null)} />
      )}
    </>
  );
}
