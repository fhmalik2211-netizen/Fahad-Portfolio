"use client";

import { FormEvent, useState } from "react";

const quickPrompts = [
  { label: "Services", message: "Tell me about your services" },
  { label: "Tech stack", message: "What stack do you use?" },
  { label: "Experience", message: "How much experience does Fahad have?" },
  { label: "Start a project", message: "How can I hire you for a project?" },
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

  const sendMessage = async (message: string) => {
    const cleanedInput = message.trim();
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
        body: JSON.stringify({
          message: cleanedInput,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Assistant request failed.");
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

  const handleSubmit = (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    void sendMessage(input);
  };

  return (
    <div className="fixed bottom-4 right-4 z-[70] sm:bottom-6 sm:right-6">
      <div className="relative">
        {isOpen && (
          <div className="agent-panel absolute bottom-[4.5rem] right-0 w-[min(calc(100vw_-_2rem),430px)] overflow-hidden rounded-[30px] border border-[var(--line)] bg-[var(--background)] shadow-[0_30px_90px_rgba(16,42,28,0.22)] sm:bottom-20">
            <div className="border-b border-[var(--line)] px-5 pb-5 pt-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--foreground)] text-lg font-semibold text-[var(--background)]">
                    F
                    <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[var(--background)] bg-[var(--accent)]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-[1.05rem] font-semibold tracking-[-.045em] text-[var(--foreground)]">Fahad AI</h3>
                      <span className="text-[.58rem] font-bold uppercase tracking-[.14em] text-[var(--accent)]">Online</span>
                    </div>
                    <p className="mt-1 text-[.72rem] text-[var(--muted)]">A quick way to explore Fahad&apos;s work</p>
                  </div>
                </div>
                <button type="button" onClick={() => setIsOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--line)] text-xl leading-none text-[var(--muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--foreground)]" aria-label="Close chat">
                  ×
                </button>
              </div>
              {messages.length === 1 && (
                <div className="mt-5 rounded-2xl bg-[color-mix(in_srgb,var(--accent)_10%,var(--background)_90%)] px-4 py-3.5">
                  <p className="text-[.78rem] font-semibold text-[var(--foreground)]">What are you curious about?</p>
                  <p className="mt-1 text-[.75rem] leading-5 text-[var(--muted)]">Ask about experience, services, tech stack, or starting a project.</p>
                </div>
              )}
            </div>

            <div className="max-h-[360px] space-y-4 overflow-y-auto px-5 py-5 sm:max-h-[400px] sm:px-6">
              {messages.map((message, index) => (
                <div key={`${message.role}-${index}`} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`flex max-w-[90%] items-end gap-2 ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                    {message.role === "assistant" && <span className="mb-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[var(--accent)] text-[.64rem] font-bold text-[var(--background)]">F</span>}
                    <div className={`rounded-[18px] px-4 py-3 text-[.84rem] leading-[1.6] ${message.role === "user" ? "rounded-br-md bg-[var(--foreground)] text-[var(--background)]" : "rounded-bl-md border border-[var(--line)] bg-[color-mix(in_srgb,var(--background)_95%,var(--accent)_5%)] text-[var(--foreground)]"}`}>
                      {message.content}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-end gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[var(--accent)] text-[.64rem] font-bold text-[var(--background)]">F</span>
                  <div className="flex items-center gap-1 rounded-[18px] rounded-bl-md border border-[var(--line)] px-4 py-3">
                    {[0, 1, 2].map((dot) => <span key={dot} className="agent-dot h-1.5 w-1.5 rounded-full bg-[var(--accent)]" style={{ animationDelay: `${dot * 120}ms` }} />)}
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-[var(--line)] px-4 pb-4 pt-3 sm:px-5">
              <div className="mb-3 grid grid-cols-2 gap-2">
                {quickPrompts.map((prompt) => (
                  <button key={prompt.label} type="button" onClick={() => void sendMessage(prompt.message)} disabled={isLoading} className="rounded-xl border border-[var(--line)] bg-[var(--background)] px-3 py-2.5 text-left text-[.7rem] font-semibold text-[var(--muted)] transition-all hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--foreground)] disabled:cursor-not-allowed disabled:opacity-50">
                    {prompt.label}
                  </button>
                ))}
              </div>
              <form onSubmit={handleSubmit} className="flex items-end gap-2 rounded-2xl border border-[var(--line)] bg-[color-mix(in_srgb,var(--background)_88%,var(--accent)_12%)] p-1.5 pl-3 focus-within:border-[var(--accent)]">
                <textarea value={input} onChange={(event) => setInput(event.target.value)} rows={1} placeholder="Ask anything about Fahad..." className="min-h-[42px] flex-1 resize-none bg-transparent px-1 py-2.5 text-[.84rem] leading-5 text-[var(--foreground)] outline-none placeholder:text-[var(--muted)]" onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); handleSubmit(); } }} />
                <button type="submit" disabled={isLoading || !input.trim()} className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] bg-[var(--foreground)] text-lg text-[var(--background)] transition-all hover:bg-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-35" aria-label="Send message">
                  ↗
                </button>
              </form>
              <p className="mt-2 text-center text-[.59rem] uppercase tracking-[.13em] text-[var(--muted)]">Press Enter to send · Shift + Enter for a new line</p>
            </div>
          </div>
        )}

        <button type="button" onClick={() => setIsOpen((open) => !open)} className="group relative flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--foreground)] text-xl text-[var(--background)] shadow-[0_18px_45px_rgba(16,42,28,0.24)] transition-all duration-300 hover:-translate-y-1 hover:bg-[var(--accent)] sm:h-16 sm:w-16" aria-label={isOpen ? "Close assistant panel" : "Open assistant panel"}>
          <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-[var(--background)] bg-[var(--accent)]" />
          <span className="transition-transform duration-300 group-hover:rotate-12">{isOpen ? "×" : "✦"}</span>
        </button>
      </div>
    </div>
  );
}
