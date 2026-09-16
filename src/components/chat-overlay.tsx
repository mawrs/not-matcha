"use client";

import { useEffect, useRef, useState } from "react";
import { Button, Container, Text, Textarea } from "@/components/ui";
import { cn } from "@/lib/cn";
import { ArrowUpIcon } from "./icons";
import { Logo } from "./header";

type Message = { role: "user" | "assistant"; content: string };
type Phase = "chatting" | "awaitingLinkedIn" | "awaitingEmail" | "complete";

const emailRe = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;

export function ChatOverlay({
  initialMessage,
  onClose,
}: {
  initialMessage: string;
  onClose?: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "user", content: initialMessage },
  ]);
  const [draft, setDraft] = useState("");
  const [thinking, setThinking] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const [phase, setPhase] = useState<Phase>("chatting");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!thinking) {
      setSeconds(0);
      return;
    }
    setSeconds(0);
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [thinking]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, thinking]);

  useEffect(() => {
    const t = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Cool, quick questions:\n\n— What's your current title and years of experience?\n\n— Any locations you cannot work from?\n\n— Compensation range?",
        },
      ]);
      setThinking(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }, 1400);
    return () => clearTimeout(t);
  }, []);

  const send = () => {
    const value = draft.trim();
    if (!value || thinking) return;

    if (phase === "awaitingLinkedIn") {
      const next = [...messages, { role: "user" as const, content: value }];
      setMessages(next);
      setDraft("");
      setThinking(true);
      setTimeout(() => {
        setMessages([
          ...next,
          {
            role: "assistant",
            content:
              "Perfect, what's your email? I'll get back to you in a few mins with some good fits ;)",
          },
        ]);
        setPhase("awaitingEmail");
        setThinking(false);
        setTimeout(() => inputRef.current?.focus(), 100);
      }, 1000);
      return;
    }

    if (phase === "awaitingEmail") {
      const next = [...messages, { role: "user" as const, content: value }];
      setMessages(next);
      setDraft("");
      const match = value.match(emailRe);
      if (!match) {
        setMessages([
          ...next,
          {
            role: "assistant",
            content: "I didn't catch an email address, could you try again?",
          },
        ]);
        setTimeout(() => inputRef.current?.focus(), 100);
        return;
      }
      setThinking(true);
      setTimeout(() => {
        setMessages([
          ...next,
          {
            role: "assistant",
            content: "Thanks! You'll get an email from me in the next 3 minutes",
          },
        ]);
        setPhase("complete");
        setThinking(false);
      }, 1000);
      return;
    }

    if (phase === "complete") return;

    const next = [...messages, { role: "user" as const, content: value }];
    setMessages(next);
    setDraft("");
    setPhase("awaitingLinkedIn");
    setThinking(true);
    setTimeout(() => {
      setMessages([
        ...next,
        {
          role: "assistant",
          content: "What's your linkedin so I better understand your experience?",
        },
      ]);
      setThinking(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-overlay flex flex-col bg-surface">
      <div className="px-header-x py-header-y">
        <Logo onClick={onClose} />
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <Container variant="composer" className="w-full space-y-4 p-4">
          {messages.map((message, i) => (
            <div
              key={i}
              className={cn(
                "flex",
                message.role === "user" ? "justify-end" : "justify-start",
              )}
            >
              <Text
                as="div"
                className={cn(
                  "max-w-bubble rounded-composer px-4 py-2 whitespace-pre-wrap",
                  message.role === "user" && "bg-surface-muted",
                )}
                tone="secondary"
              >
                {message.content}
              </Text>
            </div>
          ))}
          {thinking && (
            <div className="flex justify-start">
              <div className="flex items-center gap-2 px-4 py-2">
                <span className="block size-dot animate-pulse rounded-pill bg-linear-to-br from-brand-soft to-brand-hover" />
                <Text as="span" size="caption" tone="brand" weight="label" className="animate-pulse">
                  Thinking ({seconds}s)
                </Text>
              </div>
            </div>
          )}
        </Container>
      </div>
      <Container variant="composer" className="w-full p-2">
        <div className="relative rounded-field border border-brand bg-surface">
          <Textarea
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            placeholder={
              phase === "awaitingEmail"
                ? "Enter your email..."
                : phase === "awaitingLinkedIn"
                  ? "Paste your LinkedIn URL..."
                  : "Type your answer..."
            }
            rows={2}
            disabled={thinking}
          />
          <Button
            variant="send"
            onClick={send}
            disabled={thinking}
            className="absolute right-3 bottom-3"
          >
            <ArrowUpIcon />
          </Button>
        </div>
      </Container>
    </div>
  );
}
