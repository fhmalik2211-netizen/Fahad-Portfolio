"use client";

import Link from "next/link";
import { useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { getPlanByName } from "../plans-data";

export default function CheckoutClient({ planName }: { planName?: string }) {
  const selectedPlan = getPlanByName(planName);

  const [form, setForm] = useState({
    name: "",
    email: "",
    projectScope: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fullAmount = selectedPlan.price;
  const advanceAmount = Math.round((fullAmount * 50) / 100);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.email.trim()) {
      alert("Please add your email so I can send the payment confirmation.");
      return;
    }

    setIsSubmitting(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
      const response = await fetch(`${apiUrl}/api/payments/create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planName: selectedPlan.name,
          email: form.email.trim(),
          name: form.name.trim(),
          projectScope: form.projectScope.trim(),
          notes: form.notes.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success || !data.checkoutUrl) {
        throw new Error(data.error || "Unable to start the payment flow.");
      }

      window.location.href = data.checkoutUrl;
    } catch (error) {
      console.error("Custom checkout error:", error);
      alert(error instanceof Error ? error.message : "Something went wrong while starting checkout.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <main id="main-content">
        <Navbar />

        <section className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 lg:pt-16">
          <div className="mb-8">
            <Link
              href="/plans"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[color-mix(in_srgb,var(--background)_86%,white_14%)] px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[var(--foreground)]"
            >
              ← Back to plans
            </Link>
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <aside className="rounded-[30px] border border-[var(--line)] bg-[color-mix(in_srgb,var(--background)_88%,white_12%)] p-6 shadow-[0_30px_80px_rgba(16,42,28,0.07)] sm:p-8">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                Selected plan
              </p>
              <h1 className="mt-4 text-4xl font-black tracking-[-0.08em]">{selectedPlan.name}</h1>
              <div className="mt-6 flex items-end gap-2">
                <span className="text-4xl font-black tracking-[-0.08em]">${fullAmount}</span>
                <span className="pb-1 text-sm text-[var(--muted)]">project total</span>
              </div>

              <p className="mt-5 text-sm leading-7 text-[var(--muted)]">{selectedPlan.description}</p>

              <div className="mt-8 rounded-[24px] border border-[var(--line)] bg-[var(--background)]/65 p-5">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                  Investment breakdown
                </p>

                <div className="mt-5 space-y-4 text-sm">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[var(--muted)]">Project total</span>
                    <span className="font-semibold text-[var(--foreground)]">${fullAmount}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[var(--muted)]">Advance payment</span>
                    <span className="font-semibold text-[var(--foreground)]">${advanceAmount}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4 border-t border-[var(--line)] pt-4">
                    <span className="text-[var(--muted)]">Balance due</span>
                    <span className="font-semibold text-[var(--foreground)]">${fullAmount - advanceAmount}</span>
                  </div>
                </div>
              </div>

              <ul className="mt-8 space-y-3">
                {selectedPlan.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-3 text-sm text-[var(--foreground)]">
                    <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent)]/10 text-[var(--accent)]">
                      ✓
                    </span>
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </aside>

            <form onSubmit={handleSubmit} className="rounded-[30px] border border-[var(--line)] bg-[var(--background)]/75 p-6 shadow-[0_30px_80px_rgba(16,42,28,0.06)] sm:p-8">
              <div className="mb-8">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                  Secure checkout
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-[-0.07em] sm:text-4xl">
                  Start your project
                </h2>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="text-sm font-medium text-[var(--foreground)] sm:col-span-1">
                  Full name
                  <input
                    type="text"
                    value={form.name}
                    onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                    placeholder="Your name"
                    className="mt-2 w-full rounded-2xl border border-[var(--line)] bg-[color-mix(in_srgb,var(--background)_90%,white_10%)] px-4 py-3 text-[var(--foreground)] outline-none transition focus:border-[var(--accent)]"
                  />
                </label>

                <label className="text-sm font-medium text-[var(--foreground)] sm:col-span-1">
                  Email address
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                    placeholder="you@example.com"
                    required
                    className="mt-2 w-full rounded-2xl border border-[var(--line)] bg-[color-mix(in_srgb,var(--background)_90%,white_10%)] px-4 py-3 text-[var(--foreground)] outline-none transition focus:border-[var(--accent)]"
                  />
                </label>

                <label className="text-sm font-medium text-[var(--foreground)] sm:col-span-2">
                  Project scope
                  <input
                    type="text"
                    value={form.projectScope}
                    onChange={(event) => setForm((current) => ({ ...current, projectScope: event.target.value }))}
                    placeholder="Landing page, brand site, product marketing, etc."
                    className="mt-2 w-full rounded-2xl border border-[var(--line)] bg-[color-mix(in_srgb,var(--background)_90%,white_10%)] px-4 py-3 text-[var(--foreground)] outline-none transition focus:border-[var(--accent)]"
                  />
                </label>

                <label className="text-sm font-medium text-[var(--foreground)] sm:col-span-2">
                  Project notes
                  <textarea
                    value={form.notes}
                    onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))}
                    placeholder="Tell me about your goals, timeline, and the type of experience you want to build..."
                    rows={5}
                    className="mt-2 w-full rounded-2xl border border-[var(--line)] bg-[color-mix(in_srgb,var(--background)_90%,white_10%)] px-4 py-3 text-[var(--foreground)] outline-none transition focus:border-[var(--accent)]"
                  />
                </label>
              </div>

              <div className="mt-8 rounded-[24px] border border-[var(--line)] bg-[color-mix(in_srgb,var(--background)_88%,white_12%)] p-4 sm:p-5">
                <div className="flex items-center justify-between gap-4 text-sm">
                  <span className="text-[var(--muted)]">Initial payment</span>
                  <span className="text-lg font-bold text-[var(--foreground)]">${advanceAmount}</span>
                </div>
                <p className="mt-2 text-xs leading-6 text-[var(--muted)]">
                  This secure payment reserves your project and confirms the engagement. The remaining balance can be discussed in the project kickoff.
                </p>
                <p className="mt-3 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">
                  Accepted cards: Visa, Mastercard, Amex, Discover, and other Stripe-supported methods
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-[var(--foreground)] px-5 py-4 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-[var(--background)] transition hover:translate-y-[-1px] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Preparing Secure Payment..." : `Pay $${advanceAmount} to continue`}
              </button>
            </form>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
