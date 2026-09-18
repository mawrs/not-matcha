"use client";

import { useEffect, useRef, useState } from "react";
import { Button, Text, Textarea } from "@/components/ui";
import { fallbackTurn, type ChatMessage, type ChatTurn } from "@/lib/chat";
import { cn } from "@/lib/cn";
import type { Job } from "@/lib/data";
import { matchJobs, similarJobs } from "@/lib/jobs";
import { ArrowUpIcon, CloseIcon } from "./icons";
import { Logo } from "./header";
import { JobCard, JobList } from "./job-list";

type OverlayMessage = ChatMessage & {
  listingsLink?: boolean;
  job?: Job;
};

type Phase =
  | "chatting"
  | "matching"
  | "awaitingLinkedIn"
  | "reviewingLinkedIn"
  | "complete";

const linkedinRe = /linkedin\.com/i;
const MATCH_MS = 4000;
const matchLabels = [
  "Matching your preferences",
  "Scanning listings",
  "Ranking the strongest fits",
];
const linkedInLabels = [
  "Reading your LinkedIn profile",
  "Checking experience against listings",
  "Prioritizing the strongest fits",
];

async function requestTurn(history: ChatMessage[], jobId?: string): Promise<ChatTurn> {
  try {
    const response = await fetch("/api/open/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: history, jobId }),
    });
    if (!response.ok) return fallbackTurn(history);
    const data = await response.json();
    if (typeof data.reply !== "string") return fallbackTurn(history);
    return {
      reply: data.reply.trim(),
      readyForContact: data.readyForContact === true,
    };
  } catch {
    return fallbackTurn(history);
  }
}

function foundCopy(count: number) {
  return `${count} job listings found. If you'd like us to prioritize the top 5 you'd be a strong fit for, drop your LinkedIn below and we'll narrow the list even further.`;
}

function MatchingStatus({ labels }: { labels: string[] }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setStep((current) => Math.min(current + 1, labels.length - 1));
    }, MATCH_MS / labels.length);
    return () => clearInterval(id);
  }, [labels.length]);

  return (
    <div className="max-w-[85%] space-y-3 px-4 py-2">
      <div className="h-1 overflow-hidden rounded-pill bg-surface-muted">
        <div className="h-full w-0 rounded-pill bg-linear-to-r from-brand-soft to-brand animate-match-bar" />
      </div>
      <div className="flex items-center gap-2">
        <span className="block size-dot animate-pulse rounded-pill bg-linear-to-br from-brand-soft to-brand-hover" />
        <Text as="span" size="caption" tone="brand" weight="label">
          {labels[step]}
        </Text>
      </div>
    </div>
  );
}

export function ChatOverlay({
  initialMessage,
  initialJob,
  onClose,
}: {
  initialMessage: string;
  initialJob?: Job;
  onClose?: () => void;
}) {
  const [messages, setMessages] = useState<OverlayMessage[]>([
    { role: "user", content: initialMessage, job: initialJob },
  ]);
  const [draft, setDraft] = useState("");
  const [thinking, setThinking] = useState(true);
  const [seconds, setSeconds] = useState(0);
  const [phase, setPhase] = useState<Phase>("chatting");
  const [listingsOpen, setListingsOpen] = useState(false);
  const [results, setResults] = useState<Job[] | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const turnRef = useRef(0);
  const matchesRef = useRef<Job[]>([]);
  const preferTop5Ref = useRef(false);

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
  }, [messages, thinking, phase, listingsOpen]);

  const startMatching = (history: ChatMessage[]) => {
    const prefs = history
      .filter((message) => message.role === "user")
      .map((message) => message.content)
      .join("\n");
    matchesRef.current = matchJobs(prefs);
    setPhase("matching");
    setThinking(false);
  };

  const applyTurn = (history: ChatMessage[], turn: ChatTurn) => {
    if (initialJob) {
      const matches = similarJobs(initialJob);
      matchesRef.current = matches;
      setMessages([
        { role: "user", content: initialMessage, job: initialJob },
        ...history.slice(1),
        { role: "assistant", content: turn.reply, listingsLink: true },
      ]);
      setPhase("awaitingLinkedIn");
      setThinking(false);
      setTimeout(() => inputRef.current?.focus(), 100);
      return;
    }

    const next = turn.reply
      ? [...history, { role: "assistant" as const, content: turn.reply }]
      : history;
    setMessages(next);
    if (turn.readyForContact) {
      startMatching(next);
      return;
    }
    setThinking(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  useEffect(() => {
    if (phase === "matching") {
      const id = setTimeout(() => {
        const count = matchesRef.current.length;
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: foundCopy(count), listingsLink: true },
        ]);
        setPhase("awaitingLinkedIn");
        setTimeout(() => inputRef.current?.focus(), 100);
      }, MATCH_MS);
      return () => clearTimeout(id);
    }

    if (phase === "reviewingLinkedIn") {
      const id = setTimeout(() => {
        preferTop5Ref.current = true;
        const top = matchesRef.current.slice(0, 5);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "We've updated your listings to show the top 5 you're most likely to hear back from.",
          },
        ]);
        setResults((current) => (current ? top : current));
        setPhase("complete");
      }, MATCH_MS);
      return () => clearTimeout(id);
    }

    if (phase !== "complete") return;
    const id = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Would you like us to save your job preferences? Creating an account is free, and you can sign up for optional weekly digests about new postings that match your qualifications.",
        },
      ]);
      setTimeout(() => inputRef.current?.focus(), 100);
    }, 2000);
    return () => clearTimeout(id);
  }, [phase]);

  useEffect(() => {
    const id = ++turnRef.current;
    const history: ChatMessage[] = [
      { role: "user", content: initialMessage },
    ];

    (async () => {
      const turn = await requestTurn(history, initialJob?.id);
      if (id !== turnRef.current) return;
      applyTurn(history, turn);
    })();

    return () => {
      turnRef.current += 1;
    };
  }, [initialMessage, initialJob]);

  const revealListings = () => {
    const jobs = matchesRef.current;
    setResults(preferTop5Ref.current ? jobs.slice(0, 5) : jobs);
    setListingsOpen(true);
  };

  const send = () => {
    const value = draft.trim();
    if (!value || thinking || phase === "matching" || phase === "reviewingLinkedIn") return;

    if (phase === "awaitingLinkedIn") {
      const next = [...messages, { role: "user" as const, content: value }];
      setMessages(next);
      setDraft("");
      if (linkedinRe.test(value)) {
        setPhase("reviewingLinkedIn");
        return;
      }
      setMessages([
        ...next,
        {
          role: "assistant",
          content: "No LinkedIn needed. You can show the full list when you're ready.",
        },
      ]);
      return;
    }

    if (phase === "complete") return;

    const next = [...messages, { role: "user" as const, content: value }];
    const id = ++turnRef.current;
    setMessages(next);
    setDraft("");
    setThinking(true);
    requestTurn(next).then((turn) => {
      if (id !== turnRef.current) return;
      applyTurn(next, turn);
    });
  };

  const composerLocked =
    thinking || phase === "matching" || phase === "reviewingLinkedIn";
  const listingCount = results?.length ?? 0;
  const panel =
    "flex min-h-0 flex-col overflow-hidden rounded-field border border-border-strong bg-surface";

  return (
    <div className="fixed inset-0 z-overlay flex flex-col bg-surface-subtle">
      <div className="px-4 pt-4 pb-3">
        <Logo onClick={onClose} />
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-3 px-4 pb-4 lg:flex-row">
        <section className={cn(panel, "min-h-0 w-full flex-1")}>
          <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto px-4 py-10">
            <div className="mx-auto w-full max-w-copy space-y-4">
            {messages.map((message, i) => {
              if (message.job) {
                return (
                  <div key={i} className="space-y-2">
                    <Text size="caption" tone="faint">
                      More like this
                    </Text>
                    <JobCard job={message.job} preview />
                  </div>
                );
              }

              return (
              <div
                key={i}
                className={cn(
                  "flex",
                  message.role === "user" ? "justify-end" : "justify-start",
                )}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-composer px-4 py-2",
                    message.role === "user" && "bg-surface-muted",
                  )}
                >
                  <Text
                    as="div"
                    className="whitespace-pre-wrap"
                    tone="secondary"
                  >
                    {message.content}
                  </Text>
                  {message.listingsLink ? (
                    <Button
                      variant="quiet"
                      onClick={revealListings}
                      className="mt-3 font-title text-gmail-label-work hover:text-gmail-label-work hover:underline"
                    >
                      Show listings
                    </Button>
                  ) : null}
                </div>
              </div>
              );
            })}
              {(phase === "matching" || phase === "reviewingLinkedIn") && (
                <div className="flex justify-start">
                  <MatchingStatus
                    key={phase}
                    labels={phase === "reviewingLinkedIn" ? linkedInLabels : matchLabels}
                  />
                </div>
              )}
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
            </div>
          </div>
          <div className="border-t border-border p-3">
            <div className="relative mx-auto w-full max-w-copy rounded-field border border-brand bg-surface transition-colors focus-within:border-brand-hover">
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
                  phase === "awaitingLinkedIn"
                    ? "Paste your LinkedIn URL (optional)..."
                    : "Type your answer..."
                }
                rows={2}
                disabled={composerLocked}
              />
              <Button
                variant="send"
                onClick={send}
                disabled={composerLocked}
                className={cn(
                  "absolute right-3 bottom-3",
                  draft.trim() ? "bg-send-hover!" : "hover:bg-send",
                )}
              >
                <ArrowUpIcon />
              </Button>
            </div>
          </div>
        </section>
        {listingsOpen && results ? (
          <aside className={cn(panel, "h-64 w-full shrink-0 lg:h-auto lg:w-96")}>
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <Text size="caption" weight="label" tone="muted">
                Listings ({listingCount})
              </Text>
              <Button
                variant="iconQuiet"
                onClick={() => setListingsOpen(false)}
                aria-label="Close listings"
              >
                <CloseIcon />
              </Button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto p-3">
              <JobList jobs={results} compact />
            </div>
          </aside>
        ) : null}
      </div>
    </div>
  );
}
