import Link from "next/link";

export default function PlansSuccessPage({
  searchParams,
}: {
  searchParams?: { session_id?: string };
}) {
  const sessionId = searchParams?.session_id || "";

  return (
    <main className="mx-auto flex min-h-screen max-w-4xl items-center justify-center px-4 py-12">
      <div className="w-full rounded-[30px] border border-[var(--line)] bg-[color-mix(in_srgb,var(--background)_80%,white_20%)] p-8 text-center shadow-[0_30px_80px_rgba(16,42,28,0.08)] sm:p-12">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
          Payment received
        </p>
        <h1 className="mt-4 text-4xl font-black tracking-[-0.08em] sm:text-5xl">
          Thanks, your advance is confirmed.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[var(--muted)]">
          Your 50% advance has been processed successfully. I will reach out to confirm the next steps and begin the project.
        </p>

        {sessionId ? (
          <p className="mt-6 text-sm text-[var(--muted)]">Session ID: {sessionId}</p>
        ) : null}

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/plans"
            className="inline-flex items-center justify-center rounded-full bg-[var(--foreground)] px-5 py-3 text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-[var(--background)]"
          >
            Back to plans
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
