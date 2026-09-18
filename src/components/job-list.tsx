"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { Text } from "@/components/ui";
import { cn } from "@/lib/cn";
import { getCompany, type Job } from "@/lib/data";
import { useChat } from "./chat-context";
import { ExternalLinkIcon, SparklesIcon } from "./icons";

const markColors: Record<string, string> = {
  viktor: "bg-avatar",
  posthog: "bg-accent",
  "plus-ai": "bg-google-blue",
  helply: "bg-gmail-yes",
  ghost: "bg-fg",
  "2501-ai": "bg-danger",
  narvar: "bg-send",
  "bending-spoons": "bg-google-yellow",
  powernaut: "bg-brand",
  "desktop-commander": "bg-google-green",
  hostie: "bg-gmail-profile",
  vantaca: "bg-brand-soft",
};

const markFallback = [
  "bg-brand",
  "bg-avatar",
  "bg-send",
  "bg-accent",
  "bg-google-blue",
  "bg-danger",
];

function markClass(slug: string) {
  if (markColors[slug]) return markColors[slug];
  let hash = 0;
  for (const char of slug) hash = (hash * 31 + char.charCodeAt(0)) | 0;
  return markFallback[Math.abs(hash) % markFallback.length];
}

function LogoMark({ slug }: { slug: string }) {
  return (
    <div
      className={`size-10 shrink-0 rounded-control ${markClass(slug)}`}
      aria-hidden
    />
  );
}

function moreLikeThisPrompt(job: Job, blurb: string) {
  return [
    "Show me more jobs like this one:",
    "",
    `${job.title} at ${job.company}`,
    blurb,
    job.chips?.join(" · ") ?? job.salary,
    job.summary,
    job.location,
  ]
    .filter(Boolean)
    .join("\n");
}

const actionClass = (delay?: boolean) =>
  cn(
    "group/action relative flex size-8 items-center justify-center rounded-control border border-fg-faint bg-surface text-fg-muted transition-[opacity,transform,color] duration-quick ease-gmail",
    "pointer-events-none translate-y-1 scale-95 opacity-0",
    "group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100",
    "group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:scale-100 group-focus-within:opacity-100",
    "hover:text-fg focus-visible:opacity-100 focus-visible:pointer-events-auto",
    delay && "delay-75",
  );

function ActionTip({ children }: { children: ReactNode }) {
  return (
    <span className="pointer-events-none absolute top-full left-1/2 z-10 mt-1 -translate-x-1/2 whitespace-nowrap rounded-control bg-fg px-1.5 py-0.5 text-caption text-fg-inverse opacity-0 transition-opacity duration-quick group-hover/action:opacity-100">
      {children}
    </span>
  );
}

function JobCard({ job, compact }: { job: Job; compact?: boolean }) {
  const { openChat } = useChat();
  const company = getCompany(job.companySlug);
  const chips = job.chips ?? [job.salary];
  const blurb = job.blurb ?? company?.blurb ?? "";
  const website = company?.website;

  return (
    <article className="group relative rounded-card border border-border transition-colors hover:border-fg-faint">
      {!compact ? (
        <div className="pointer-events-none absolute top-4 right-4 z-10 flex items-center gap-1">
          <button
            type="button"
            aria-label="More like this"
            className={actionClass()}
            onClick={() => openChat(moreLikeThisPrompt(job, blurb))}
          >
            <SparklesIcon />
            <ActionTip>More like this</ActionTip>
          </button>
          {website ? (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit website"
              className={actionClass(true)}
            >
              <ExternalLinkIcon />
              <ActionTip>Visit website</ActionTip>
            </a>
          ) : null}
        </div>
      ) : null}
      <Link href={`/companies/${job.companySlug}`} className={compact ? "block p-3" : "block p-4"}>
        <div className="flex items-start justify-between gap-2">
          <div className="flex min-w-0 items-start gap-3">
            {!compact ? <LogoMark slug={job.companySlug} /> : null}
            <div className="min-w-0">
              <h3 className="text-body font-emphasis text-fg">
                {job.title} at {job.company}
              </h3>
              {!compact && blurb ? (
                <Text size="caption" tone="faint" className="mt-0.5">
                  {blurb}
                </Text>
              ) : null}
            </div>
          </div>
          {!compact ? (
            <time className="mt-0.5 shrink-0 text-caption text-fg-faint transition-opacity duration-quick ease-gmail group-hover:opacity-0 group-focus-within:opacity-0">
              {job.posted}
            </time>
          ) : null}
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          {(compact ? chips.slice(0, 2) : chips).map((chip) => (
            <span
              key={chip}
              className="rounded bg-surface-muted px-1.5 py-0.5 text-caption text-fg-subtle"
            >
              {chip}
            </span>
          ))}
        </div>
        {!compact && job.summary ? (
          <Text size="caption" tone="subtle" className="mt-2">
            {job.summary}
          </Text>
        ) : null}
        <Text size="caption" tone="faint" className="mt-2">
          {job.location}
        </Text>
      </Link>
    </article>
  );
}

export function JobList({ jobs, compact }: { jobs: Job[]; compact?: boolean }) {
  if (jobs.length === 0) {
    return (
      <Text tone="subtle" align="center">
        No sample listings in this slice yet. Describe your role above and Matcha
        will email the ones that fit.
      </Text>
    );
  }

  return (
    <ul className={cn("m-0 list-none p-0", compact ? "space-y-2" : "space-y-3")}>
      {jobs.map((job) => (
        <li key={job.id}>
          <JobCard job={job} compact={compact} />
        </li>
      ))}
    </ul>
  );
}

