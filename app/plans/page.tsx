"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { plans } from "./plans-data";

const deliverables = [
  "Clear digital strategy rooted in your goals",
  "High-quality design that feels premium and trustworthy",
  "Fast, maintainable development with thoughtful UX",
  "A process that keeps feedback clear and actionable",
];

export default function PlansPage() {
  const router = useRouter();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  function handlePlanSelect(planName: string) {
    setLoadingPlan(planName);
    router.push(`/plans/checkout?plan=${encodeURIComponent(planName)}`);
    setLoadingPlan(null);
  }

  return (
    <>
      <a
        className="absolute left-4 top-4 z-[100] -translate-y-20 rounded-full bg-[var(--foreground)] px-4 py-2 text-sm font-medium text-[var(--background)] transition-transform focus:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        href="#main-content"
      >
        Skip to content
      </a>

      <main id="main-content">
        <Navbar />

        <section className="mx-auto max-w-6xl px-4 pb-10 pt-10 sm:px-6 lg:pt-16">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
              Flexible plans
            </p>
            <h1 className="text-4xl font-black tracking-[-0.08em] sm:text-5xl lg:text-6xl">
              Plans designed for momentum.
            </h1>
            <p className="mt-5 text-base leading-7 text-[var(--muted)] sm:text-lg">
              Whether you need a focused launch or a long-term product partner, each plan is built to
              bring clarity, polish, and measurable progress to your digital presence.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <article
                key={plan.name}
                className={`rounded-[30px] border p-6 shadow-[0_20px_60px_rgba(16,42,28,0.04)] transition-all duration-300 sm:p-7 ${
                  plan.featured
                    ? "border-[var(--accent)] bg-[color-mix(in_srgb,var(--foreground)_6%,var(--background))]"
                    : "border-[var(--line)] bg-[color-mix(in_srgb,var(--background)_88%,white_12%)]"
                }`}
              >
                <div className="mb-7 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                      {plan.name}
                    </p>
                    <div className="mt-4 flex items-end gap-2">
                      <span className="text-4xl font-black tracking-[-0.08em]">${plan.price}</span>
                      <span className="pb-1 text-sm text-[var(--muted)]">/ project</span>
                    </div>
                  </div>

                  {plan.featured && (
                    <span className="rounded-full bg-[var(--accent)] px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-[var(--background)]">
                      Most popular
                    </span>
                  )}
                </div>

                <p className="mb-6 min-h-[72px] text-sm leading-6 text-[var(--muted)]">{plan.description}</p>

                <ul className="space-y-3">
                  {plan.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-3 text-sm text-[var(--foreground)]">
                      <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent)]/10 text-[var(--accent)]">
                        ✓
                      </span>
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => handlePlanSelect(plan.name)}
                  disabled={loadingPlan === plan.name}
                  className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-4 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.12em] transition-all duration-200 ${
                    plan.featured
                      ? "hover:translate-y-[-1px]"
                      : "border hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  }`}
                  style={
                    plan.featured
                      ? {
                          backgroundColor: "var(--foreground)",
                          color: "var(--background)",
                          cursor: loadingPlan === plan.name ? "wait" : "pointer",
                        }
                      : {
                          backgroundColor: "color-mix(in srgb, var(--background) 80%, white 20%)",
                          borderColor: "var(--line)",
                          color: "var(--foreground)",
                          cursor: loadingPlan === plan.name ? "wait" : "pointer",
                        }
                  }
                >
                  {loadingPlan === plan.name ? "Preparing..." : plan.cta}
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[30px] border border-[var(--line)] bg-[color-mix(in_srgb,var(--background)_90%,white_10%)] p-6 sm:p-8">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                What you get
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-[-0.07em] sm:text-4xl">
                Thoughtful execution from start to finish.
              </h2>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {deliverables.map((item) => (
                  <div key={item} className="rounded-2xl border border-[var(--line)] bg-[var(--background)]/65 p-4">
                    <p className="text-sm leading-6 text-[var(--foreground)]">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[30px] border border-[var(--line)] bg-[var(--foreground)] p-6 text-[var(--background)] sm:p-8">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--art-yellow)]">
                Start here
              </p>
              <h3 className="mt-4 text-3xl font-black tracking-[-0.07em]">
                Need something custom?
              </h3>
              <p className="mt-4 text-sm leading-6 text-[color-mix(in_srgb,var(--background)_76%,white_24%)]">
                If your project sits outside the standard packages, I can scope a tailored engagement around
                your timeline, goals, and current product needs.
              </p>

              <button
                type="button"
                onClick={() => window.location.href = "/contact"}
                className="mt-8 inline-flex w-full items-center justify-center rounded-full px-4 py-3 text-[0.74rem] font-semibold uppercase tracking-[0.12em] transition-transform duration-200 hover:-translate-y-0.5"
                style={{
                  backgroundColor: "var(--background)",
                  color: "var(--foreground)",
                  display: "inline-flex",
                  width: "100%",
                  textAlign: "center",
                  opacity: 1,
                }}
              >
                Request a custom quote
              </button>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
