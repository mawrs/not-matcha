"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui";
import {
  emptyJobSignal,
  whyReplySeed,
  type GmailJob,
  type MailNote,
} from "@/lib/gmail-mail";
import { GmailForwardIcon, GmailPersonIcon, GmailReplyIcon, GmailSmileIcon } from "./gmail-icons";
import { useLogin } from "./login-context";

function Chip({
  active,
  tone,
  children,
  onClick,
}: {
  active: boolean;
  tone: "yes" | "no" | "hide";
  children: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "cursor-pointer rounded-pill px-3 py-1.5 text-body leading-normal transition-colors duration-quick ease-gmail active:scale-press",
        tone === "yes" && active && "bg-gmail-yes-bg text-gmail-yes hover:bg-gmail-yes-hover",
        tone === "yes" && !active && "bg-gmail-chip text-gmail-fg-body hover:bg-gmail-yes-bg hover:text-gmail-yes",
        tone === "no" && active && "bg-gmail-no-bg text-gmail-no hover:bg-gmail-no-hover",
        tone === "no" && !active && "bg-gmail-chip text-gmail-fg-body hover:bg-gmail-no-bg hover:text-gmail-no",
        tone === "hide" && active && "bg-gmail-pill text-gmail-fg-nav hover:bg-gmail-stroke",
        tone === "hide" && !active && "bg-gmail-chip text-gmail-fg-body hover:bg-gmail-pill",
      )}
    >
      {children}
    </button>
  );
}

function JobBlock({
  job,
  onReplyWhy,
}: {
  job: GmailJob;
  onReplyWhy: (seed: string) => void;
}) {
  const { jobSignals, setJobVote, hideJob, unhideJob } = useLogin();
  const signal = jobSignals[job.id] ?? emptyJobSignal;

  if (signal.hidden) {
    return (
      <div className="animate-rise flex flex-col gap-2 rounded-control bg-gmail-chip px-4 py-3">
        <p className="text-body text-gmail-fg-muted">{job.title}</p>
        <p className="text-caption text-gmail-fg-faint">
          Hidden from future emails — applied or not a fit.
        </p>
        <button
          type="button"
          onClick={() => unhideJob(job.id)}
          className="cursor-pointer self-start text-caption font-label text-gmail-label-work transition-colors duration-quick ease-gmail hover:underline"
        >
          Undo
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-body leading-normal text-gmail-fg-body">
        <a
          href={job.href}
          className="font-emphasis text-gmail-label-work no-underline transition-colors duration-quick ease-gmail hover:underline"
        >
          {job.title}
        </a>
        <br />
        {job.summary}
        <br />
        {job.meta}
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <Chip tone="yes" active={signal.vote === "yes"} onClick={() => setJobVote(job.id, "yes")}>
          👍 Yes
        </Chip>
        <Chip tone="no" active={signal.vote === "no"} onClick={() => setJobVote(job.id, "no")}>
          👎 Not for me
        </Chip>
        <Chip tone="hide" active={false} onClick={() => hideJob(job.id)}>
          Applied / don’t show again
        </Chip>
      </div>
      {signal.vote ? (
        <p className="animate-rise text-caption text-gmail-fg-muted">
          {signal.why.trim() ? (
            "Saved from your reply."
          ) : (
            <>
              Noted.{" "}
              <button
                type="button"
                onClick={() => onReplyWhy(whyReplySeed(job, signal.vote!))}
                className="cursor-pointer font-label text-gmail-label-work transition-colors duration-quick ease-gmail hover:underline"
              >
                Reply with why
              </button>{" "}
              if you want — optional.
            </>
          )}
        </p>
      ) : null}
    </div>
  );
}

function ThreadNote({ note }: { note: MailNote }) {
  const { email } = useLogin();
  const me = note.from === "me";
  return (
    <div className="flex items-start gap-4">
      <div className="size-gmail-avatar shrink-0 overflow-hidden rounded-pill">
        <GmailPersonIcon tone={me ? "me" : "profile"} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-body font-title text-gmail-fg">
          {me ? "me" : "Matcha"}{" "}
          <span className="text-caption font-body text-gmail-fg-muted">
            {me ? `<${email ?? "you@gmail.com"}>` : "<fico@matcha.fm>"}
          </span>
        </p>
        <p className="mt-2 text-body leading-normal text-gmail-fg-body">{note.text}</p>
      </div>
    </div>
  );
}

export function GmailJobList({
  jobs,
  onReplyWhy,
}: {
  jobs: GmailJob[];
  onReplyWhy: (seed: string) => void;
}) {
  const { jobSignals } = useLogin();
  const hiddenCount = jobs.filter((job) => jobSignals[job.id]?.hidden).length;

  return (
    <div className="flex flex-col gap-8">
      {jobs.map((job) => (
        <JobBlock key={job.id} job={job} onReplyWhy={onReplyWhy} />
      ))}
      {hiddenCount === jobs.length ? (
        <p className="text-body text-gmail-fg-muted">
          Every role in this email is hidden. They won’t appear in the next digest.
        </p>
      ) : hiddenCount > 0 ? (
        <p className="text-caption text-gmail-fg-faint">
          Hidden roles stay off future Matcha emails.
        </p>
      ) : null}
    </div>
  );
}

export function GmailThreadNotes() {
  const { mailNotes } = useLogin();
  const end = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mailNotes.length) end.current?.scrollIntoView({ block: "nearest" });
  }, [mailNotes.length]);

  if (!mailNotes.length) return null;

  return (
    <div className="flex flex-col gap-8">
      {mailNotes.map((note) => (
        <ThreadNote key={note.id} note={note} />
      ))}
      <div ref={end} />
    </div>
  );
}

function ActionPill({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex cursor-pointer items-center gap-2 rounded-pill border border-gmail-stroke bg-surface px-5 py-2 text-body text-gmail-fg-nav transition-colors duration-quick ease-gmail hover:bg-gmail-chip active:scale-press"
    >
      <span className="text-gmail-icon">{children}</span>
      {label}
    </button>
  );
}

export function GmailReplyBox({
  open,
  seed,
  mode = "reply",
  onOpen,
  onForward,
  onClose,
}: {
  open: boolean;
  seed?: string;
  mode?: "reply" | "forward";
  onOpen: () => void;
  onForward: () => void;
  onClose: () => void;
}) {
  const { sendReply } = useLogin();
  const [draft, setDraft] = useState("");
  const field = useRef<HTMLTextAreaElement>(null);
  const reply = mode === "reply";

  useEffect(() => {
    if (!open) return;
    if (seed) setDraft(seed);
    else setDraft("");
    field.current?.focus();
  }, [open, seed]);

  const send = () => {
    if (!draft.trim()) return;
    if (reply) sendReply(draft);
    setDraft("");
    onClose();
  };

  if (!open) {
    return (
      <div className="flex w-full items-center gap-3">
        <ActionPill label="Reply" onClick={onOpen}>
          <GmailReplyIcon />
        </ActionPill>
        <ActionPill label="Forward" onClick={onForward}>
          <GmailForwardIcon />
        </ActionPill>
        <button
          type="button"
          aria-label="Insert emoji"
          className="flex size-gmail-tool cursor-pointer items-center justify-center rounded-pill text-gmail-icon transition-colors duration-quick ease-gmail hover:bg-gmail-chip"
        >
          <GmailSmileIcon />
        </button>
      </div>
    );
  }

  return (
    <form
      className="animate-rise w-full rounded-gmail border border-gmail-stroke bg-surface p-5 shadow-composer transition-colors duration-quick ease-gmail focus-within:border-gmail-label-work"
      onSubmit={(event) => {
        event.preventDefault();
        send();
      }}
    >
      <div className="mb-3 flex items-center justify-between">
        <p className="text-note text-gmail-fg-nav">
          {reply ? (
            <>
              To: Matcha{" "}
              <span className="text-gmail-fg-muted">&lt;fico@matcha.fm&gt;</span>
            </>
          ) : (
            "Forward"
          )}
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close reply"
          className="flex size-gmail-tool cursor-pointer items-center justify-center rounded-pill text-body text-gmail-fg-muted transition-colors duration-quick ease-gmail hover:bg-gmail-chip hover:text-gmail-fg"
        >
          ×
        </button>
      </div>
      <textarea
        ref={field}
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
            event.preventDefault();
            send();
          }
        }}
        rows={5}
        placeholder="One sentence is enough — e.g. no companies over 100 people"
        className="w-full resize-none bg-transparent text-body leading-normal text-gmail-fg-body placeholder:text-gmail-fg-faint transition-colors duration-quick ease-gmail focus:outline-none"
      />
      <div className="mt-3 flex items-center justify-between">
        <p className="text-caption text-gmail-fg-faint">
          {reply ? "This updates your Matcha preferences" : "Prototype — won’t send"}
        </p>
        <Button type="submit" variant="gmailSend" disabled={!draft.trim()}>
          Send
        </Button>
      </div>
    </form>
  );
}
