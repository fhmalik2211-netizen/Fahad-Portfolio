import Link from "next/link";

export default function PlansCancelPage({
  searchParams,
}: {
  searchParams?: { plan?: string };
}) {
  const planName = searchParams?.plan || "your plan";

  return (
    <main className="mx-auto flex min-h-screen max-w-4xl items-center justify-center px-4 py-12">
      <div className="w-full rounded-[30px] border border-[var(--line)] bg-[color-mix(in_srgb,var(--background)_80%,white_20%)] p-8 text-center shadow-[0_30px_80px_rgba(16,42,28,0.08)] sm:p-12">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
          Payment cancelled
        </p>
        <h1 className="mt-4 text-4xl font-black tracking-[-0.08em] sm:text-5xl">
          The {planName} plan is still available.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[var(--muted)]">
          The checkout was cancelled, and no charge was made. You can try again anytime or contact me directly if you want a custom scope.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/plans"
            className="inline-flex items-center justify-center rounded-full bg-[var(--foreground)] px-5 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-[var(--background)]"
          >
            Try another plan
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-[var(--line)] px-5 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-[var(--foreground)]"
          >
            Contact me
          </Link>
        </div>
      </div>
    </main>
  );
}
