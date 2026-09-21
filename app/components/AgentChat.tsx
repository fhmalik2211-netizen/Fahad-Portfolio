"use client";

import { FormEvent, useMemo, useState } from "react";

const quickPrompts = [
  "Tell me about your services",
  "What stack do you use?",
  "How can I hire you for a project?",
  "What kind of products do you build?",
];

type Message = {
  role: "assistant" | "user";
  content: string;
};

export default function AgentChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I’m Fahad’s portfolio assistant. Ask about services, project experience, stack, or collaboration.",
    },
  ]);

  const lastMessage = useMemo(
    () => messages[messages.length - 1],
    [messages],
  );

  const handleSubmit = async (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    const cleanedInput = input.trim();
    if (!cleanedInput || isLoading) {
      return;
    }

    const nextUserMessage: Message = { role: "user", content: cleanedInput };
    setMessages((current) => [...current, nextUserMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: cleanedInput }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Unable to get a response right now.");
      }

      setMessages((current) => [
        ...current,
        { role: "assistant", content: data.answer || "I’m here to help." },
      ]);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong while contacting the AI assistant.";

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: `I hit a small issue: ${message} Please try again or contact me directly through the contact section.`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[70]">
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          className="group flex h-16 w-16 items-center justify-center rounded-full bg-[var(--foreground)] text-xl text-[var(--background)] shadow-[0_20px_50px_rgba(16,42,28,0.22)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]"
          aria-label={isOpen ? "Close assistant panel" : "Open assistant panel"}
        >
          <span className="transition-transform duration-300 group-hover:rotate-12">✦</span>
        </button>

        {isOpen && (
          <div className="absolute bottom-20 right-0 w-[min(90vw,370px)] overflow-hidden rounded-[30px] border border-[var(--line)] bg-[color-mix(in_srgb,var(--background)_92%,white_8%)] shadow-[0_28px_80px_rgba(16,42,28,0.14)] backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--background)_88%,var(--accent)_12%)] px-4 py-3.5">
              <div>
                <p className="text-[0.64rem] font-semibold uppercase tracking-[.18em] text-[var(--muted)]">
                  Portfolio agent
                </p>
                <h3 className="mt-1 text-base font-medium tracking-[-.04em] text-[var(--foreground)]">
                  Fahad AI
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--line)] text-lg text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                aria-label="Close chat"
              >
                ×
              </button>
            </div>

            <div className="max-h-[420px] space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-6 ${
                      message.role === "user"
                        ? "bg-[var(--foreground)] text-[var(--background)]"
                        : "border border-[var(--line)] bg-[var(--background)]/80 text-[var(--foreground)]"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl border border-[var(--line)] bg-[var(--background)]/80 px-3.5 py-2.5 text-sm text-[var(--muted)]">
                    Thinking…
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-[var(--line)] px-3 py-3">
              <div className="mb-3 flex flex-wrap gap-2">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => {
                      setInput(prompt);
                      setTimeout(() => {
                        const form = document.getElementById("agent-chat-form") as HTMLFormElement | null;
                        form?.requestSubmit();
                      }, 20);
                    }}
                    className="rounded-full border border-[var(--line)] bg-[var(--background)]/70 px-2.5 py-1.5 text-[0.68rem] font-medium tracking-[.04em] text-[var(--muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--foreground)]"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              <form id="agent-chat-form" onSubmit={handleSubmit} className="flex gap-2">
                <textarea
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  rows={1}
                  placeholder="Ask about my work..."
                  className="min-h-[46px] flex-1 resize-none rounded-2xl border border-[var(--line)] bg-[var(--background)]/80 px-3 py-2.5 text-sm text-[var(--foreground)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      handleSubmit();
                    }
                  }}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="inline-flex h-[46px] w-[46px] items-center justify-center rounded-2xl bg-[var(--accent)] text-lg font-semibold text-[var(--background)] transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
                  aria-label="Send message"
                >
                  →
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {lastMessage && !isOpen && (
        <div className="mt-3 rounded-full border border-[var(--line)] bg-[var(--background)]/85 px-3 py-2 text-[0.7rem] font-medium uppercase tracking-[.12em] text-[var(--muted)] shadow-[0_12px_30px_rgba(16,42,28,0.08)] backdrop-blur-sm">
          AI ready
        </div>
      )}
    </div>
  );
}
