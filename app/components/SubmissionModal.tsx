"use client";

import { useEffect } from "react";

export type SubmissionStatus = "success" | "error";

type SubmissionModalProps = {
  status: SubmissionStatus;
  onClose: () => void;
};

export default function SubmissionModal({ status, onClose }: SubmissionModalProps) {
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const isSuccess = status === "success";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(10,17,14,0.48)] p-5 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="w-full max-w-[430px] rounded-[26px] border border-[var(--line)] bg-[var(--background)] p-6 text-[var(--foreground)] shadow-[0_28px_80px_rgba(10,17,14,0.24)] sm:p-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="submission-dialog-title"
      >
        <div className="flex items-start justify-between gap-5">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-full text-xl ${
              isSuccess
                ? "bg-[color-mix(in_srgb,var(--accent)_16%,transparent)] text-[var(--accent)]"
                : "bg-[rgba(170,65,55,0.12)] text-[#aa4137]"
            }`}
            aria-hidden="true"
          >
            {isSuccess ? "✓" : "!"}
          </div>
          <button
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] text-lg text-[var(--muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            type="button"
            onClick={onClose}
            aria-label="Close message"
          >
            ×
          </button>
        </div>

        <h2 className="mt-7 text-[1.8rem] font-medium leading-none tracking-[-.055em]" id="submission-dialog-title">
          {isSuccess ? "Message received." : "Message not sent."}
        </h2>
        <p className="mt-4 text-[.92rem] leading-[1.7] text-[var(--muted)]">
          {isSuccess
            ? "Thanks for reaching out. I have your note and will get back to you within two business days."
            : "There was a problem sending your message. Please try again or email me directly at unknownfahai@gmail.com."}
        </p>

        <button
          className="mt-7 inline-flex w-full items-center justify-center rounded-xl bg-[var(--foreground)] px-5 py-3.5 text-[.72rem] font-bold uppercase tracking-[.12em] text-[var(--background)] transition-colors hover:bg-[var(--accent)]"
          type="button"
          onClick={onClose}
        >
          {isSuccess ? "Done" : "Try again"}
        </button>
      </div>
    </div>
  );
}