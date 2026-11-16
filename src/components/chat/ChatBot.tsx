"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import {
  QUICK_REPLIES,
  greetingReply,
  reply as answer,
  whatsappUrl,
  type BotReply,
  type ChatLink,
} from "@/lib/chatbot";
import { cn } from "@/lib/utils";

type Message = { id: number; from: "bot" | "user"; text: string; reply?: BotReply };

const linkClass =
  "inline-flex min-h-11 items-center gap-1.5 rounded-full border border-green-strong px-4 text-sm font-semibold text-green-strong transition hover:bg-green-strong hover:text-white";

/**
 * Small free chatbot. It runs entirely in the browser, answers from the site data only
 * (see src/lib/chatbot.ts) and keeps the conversation in memory only: nothing is saved or sent anywhere.
 */
export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>(() => [
    { id: 0, from: "bot", text: greetingReply().text, reply: greetingReply() },
  ]);
  const nextId = useRef(1);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);
  const titleId = useId();

  // Escape closes the panel; focus moves into the panel on open and back to the button on close.
  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      const onKey = (event: KeyboardEvent) => {
        if (event.key === "Escape") setOpen(false);
      };
      document.addEventListener("keydown", onKey);
      // Full-screen panel below the xl breakpoint: stop the page behind it from scrolling.
      const compact = window.matchMedia("(max-width: 1279px)").matches;
      const previous = document.body.style.overflow;
      if (compact) document.body.style.overflow = "hidden";
      wasOpen.current = true;
      return () => {
        document.removeEventListener("keydown", onKey);
        document.body.style.overflow = previous;
      };
    }
    if (wasOpen.current) {
      wasOpen.current = false;
      launcherRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ block: "end" });
  }, [messages, open]);

  function ask(text: string) {
    const question = text.trim();
    if (!question) return;
    const result = answer(question);
    setMessages((current) => [
      ...current,
      { id: nextId.current++, from: "user", text: question },
      { id: nextId.current++, from: "bot", text: result.text, reply: result },
    ]);
    setInput("");
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    ask(input);
  }

  function renderLink(link: ChatLink) {
    const external = /^(https?:|tel:)/.test(link.href);
    if (external) {
      return (
        <a
          key={link.href + link.label}
          href={link.href}
          {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className={linkClass}
        >
          {link.label}
        </a>
      );
    }
    return (
      <Link key={link.href + link.label} href={link.href} onClick={() => setOpen(false)} className={linkClass}>
        {link.label}
        <Icon name="arrow-right" size={14} />
      </Link>
    );
  }

  const lastBotId = [...messages].reverse().find((m) => m.from === "bot")?.id;

  return (
    <>
      {/* Launcher: sits above the mobile Call/WhatsApp bar, and above the desktop WhatsApp button. */}
      <button
        ref={launcherRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? "Close chat assistant" : "Open chat assistant"}
        className="fixed bottom-[calc(5.75rem+env(safe-area-inset-bottom))] right-4 z-40 flex size-14 items-center justify-center rounded-full bg-navy text-white shadow-lift ring-2 ring-green transition hover:bg-navy-deep motion-safe:hover:scale-105 xl:bottom-24 xl:right-6"
      >
        <Icon name={open ? "close" : "message-circle"} size={26} />
        <span aria-hidden="true" className="absolute -right-0.5 -top-0.5 size-3.5 rounded-full border-2 border-white bg-green" />
      </button>

      {open ? (
        <div
          role="dialog"
          aria-labelledby={titleId}
          className="fixed inset-0 z-[80] flex flex-col bg-white xl:inset-auto xl:bottom-[10rem] xl:right-6 xl:h-[min(36rem,calc(100dvh-12rem))] xl:w-[24rem] xl:overflow-hidden xl:rounded-panel xl:border xl:border-line xl:shadow-lift"
        >
          <div className="flex items-center justify-between gap-3 bg-navy-deep px-4 py-3 text-white">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-full bg-green-strong">
                <Icon name="message-circle" size={22} />
              </span>
              <div>
                <h2 id={titleId} className="font-heading text-base font-extrabold italic leading-tight">
                  Aziz Afridi Assistant
                </h2>
                <p className="text-xs text-white/80">Answers from our website information</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="flex size-11 items-center justify-center rounded-full hover:bg-white/10"
            >
              <Icon name="close" size={22} />
            </button>
          </div>

          <div role="log" aria-live="polite" aria-label="Chat messages" className="flex-1 space-y-4 overflow-y-auto bg-surface px-4 py-4">
            {messages.map((message) => (
              <div key={message.id} className={cn("flex", message.from === "user" ? "justify-end" : "justify-start")}>
                <div className={cn("max-w-[88%]", message.from === "bot" && "w-full max-w-[92%]")}>
                  <p
                    className={cn(
                      "whitespace-pre-line rounded-2xl px-4 py-3 text-sm leading-relaxed",
                      message.from === "user"
                        ? "rounded-br-md bg-navy text-white"
                        : "rounded-bl-md border border-line bg-white text-navy-deep",
                    )}
                  >
                    {message.text}
                  </p>
                  {message.reply?.links?.length || message.reply?.whatsapp ? (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {message.reply.links?.map(renderLink)}
                      {message.reply.whatsapp ? (
                        <a
                          href={whatsappUrl()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-green-strong px-4 text-sm font-semibold text-white transition hover:bg-green-deep"
                        >
                          <Icon name="whatsapp" size={18} />
                          Chat on WhatsApp
                        </a>
                      ) : null}
                    </div>
                  ) : null}
                  {message.from === "bot" && message.id === lastBotId ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {QUICK_REPLIES.map((label) => (
                        <button
                          key={label}
                          type="button"
                          onClick={() => ask(label)}
                          className="inline-flex min-h-11 items-center rounded-full border border-navy/30 bg-white px-4 text-sm font-semibold text-navy-deep transition hover:bg-navy hover:text-white"
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <form onSubmit={onSubmit} className="flex gap-2 border-t border-line bg-white p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
            <label htmlFor={`${titleId}-input`} className="sr-only">
              Type your question
            </label>
            <input
              id={`${titleId}-input`}
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Type your question..."
              autoComplete="off"
              className="block min-h-12 min-w-0 flex-1 rounded-xl border border-line bg-surface px-4 text-base text-navy-deep placeholder:text-muted focus:border-green-strong focus:bg-white sm:text-sm"
            />
            <button
              type="submit"
              aria-label="Send"
              className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-green-strong text-white transition hover:bg-green-deep"
            >
              <Icon name="send" size={20} />
            </button>
          </form>
        </div>
      ) : null}
    </>
  );
}
