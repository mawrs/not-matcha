"use client";

import { useCallback, useEffect, useState, type ComponentType } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/cn";
import { ButtonLink, Text } from "@/components/ui";
import { GmailJobList, GmailReplyBox, GmailThreadNotes } from "./gmail-feedback";
import { useLogin } from "./login-context";
import { gmailJobs, gmailSubject } from "@/lib/gmail-mail";
import {
  GmailAppsIcon,
  GmailArchiveIcon,
  GmailBackIcon,
  GmailCalendarIcon,
  GmailCheckEmptyIcon,
  GmailChevronIcon,
  GmailChevronLeftIcon,
  GmailChevronRightIcon,
  GmailClockIcon,
  GmailContactsIcon,
  GmailDraftsIcon,
  GmailHelpIcon,
  GmailInboxIcon,
  GmailKeepIcon,
  GmailLabelIcon,
  GmailMailIcon,
  GmailMenuIcon,
  GmailMoreIcon,
  GmailMoveIcon,
  GmailOpenIcon,
  GmailPencilIcon,
  GmailPersonIcon,
  GmailPlusIcon,
  GmailPrintIcon,
  GmailReplyIcon,
  GmailSearchIcon,
  GmailSentIcon,
  GmailSettingsIcon,
  GmailSnoozeIcon,
  GmailSpamIcon,
  GmailStarIcon,
  GmailStarOutlineIcon,
  GmailTaskIcon,
  GmailTool,
  GmailTrashIcon,
  GmailTuneIcon,
  GmailWordmark,
} from "./gmail-icons";

const navItems: Array<{
  label: string;
  icon: ComponentType;
  active?: boolean;
  count?: string;
}> = [
  { label: "Inbox", icon: GmailInboxIcon, active: true, count: "14" },
  { label: "Starred", icon: GmailStarIcon },
  { label: "Snoozed", icon: GmailSnoozeIcon },
  { label: "Sent", icon: GmailSentIcon },
  { label: "Drafts", icon: GmailDraftsIcon },
];

const labels = [
  { label: "Categories", tone: "bg-gmail-label-cat" },
  { label: "Team", tone: "bg-gmail-label-team" },
  { label: "News", tone: "bg-gmail-label-news" },
  { label: "Work", tone: "bg-gmail-label-work" },
  { label: "Personal", tone: "bg-gmail-label-personal" },
] as const;

export function GmailView() {
  const router = useRouter();
  const { signedIn } = useLogin();
  const exitHref = signedIn ? "/preferences" : "/";
  const [replyOpen, setReplyOpen] = useState(false);
  const [replySeed, setReplySeed] = useState("");
  const [replyMode, setReplyMode] = useState<"reply" | "forward">("reply");

  const openReply = useCallback((seed = "") => {
    setReplyMode("reply");
    setReplySeed(seed);
    setReplyOpen(true);
  }, []);

  const openForward = useCallback(() => {
    setReplyMode("forward");
    setReplySeed("");
    setReplyOpen(true);
  }, []);

  const closeReply = useCallback(() => {
    setReplyOpen(false);
    setReplySeed("");
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (replyOpen) {
        closeReply();
        return;
      }
      router.push(exitHref);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeReply, exitHref, replyOpen, router]);

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-gmail-canvas">
      <div className="z-overlay flex shrink-0 items-center justify-between gap-4 bg-fg px-header-x py-2 font-sans">
        <div className="flex min-w-0 flex-col">
          <Text as="span" size="body" tone="inverse" weight="title">
            Gmail POV
          </Text>
          <Text as="span" size="caption" tone="inverse">
            Vote, reply, or hide a role · Esc to leave
          </Text>
        </div>
        <ButtonLink href={exitHref} variant="brand">
          Exit to Matcha
        </ButtonLink>
      </div>

      <div className="flex min-h-0 flex-1 flex-col font-gmail text-gmail-fg">
        <header className="flex h-gmail-bar shrink-0 items-center gap-2 px-2">
          <div className="flex w-gmail-nav shrink-0 items-center gap-1">
            <GmailTool label="Main menu">
              <GmailMenuIcon />
            </GmailTool>
            <GmailWordmark />
          </div>

          <div className="flex min-w-0 flex-1 items-center">
            <div className="flex h-gmail-search w-full items-center gap-4 rounded-pill bg-gmail-search px-5 text-gmail-icon">
              <GmailSearchIcon />
              <span className="flex-1 text-body font-emphasis text-gmail-fg-muted">
                Search mail
              </span>
              <GmailTuneIcon />
            </div>
          </div>

          <div className="flex shrink-0 items-center">
            <GmailTool label="Support">
              <GmailHelpIcon />
            </GmailTool>
            <GmailTool label="Settings">
              <GmailSettingsIcon />
            </GmailTool>
            <GmailTool label="Google apps">
              <GmailAppsIcon />
            </GmailTool>
            <ButtonLink
              href={exitHref}
              variant="quiet"
              className="rounded-pill px-3 text-note font-emphasis text-gmail-fg-nav hover:bg-gmail-chip"
            >
              Exit
            </ButtonLink>
            <ButtonLink
              href={exitHref}
              variant="iconQuiet"
              aria-label="Exit to Matcha"
              className="size-gmail-tool overflow-hidden rounded-pill p-0"
            >
              <GmailPersonIcon />
            </ButtonLink>
          </div>
        </header>

        <div className="flex min-h-0 flex-1">
          <aside className="flex w-gmail-nav shrink-0 flex-col px-2">
            <button
              type="button"
              onClick={() => openReply()}
              className="mb-4 flex h-gmail-compose w-gmail-compose items-center justify-center gap-3 rounded-gmail-compose bg-gmail-compose text-note font-emphasis text-gmail-fg-nav shadow-composer"
            >
              <GmailPencilIcon />
              Compose
            </button>
            <nav className="flex flex-col">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className={cn(
                      "flex items-center gap-4 py-1.5 pr-4 pl-5 text-note text-gmail-fg-nav",
                      item.active
                        ? "rounded-r-gmail-nav bg-gmail-inbox font-title text-gmail-fg-strong"
                        : "font-body",
                    )}
                  >
                    <Icon />
                    <span className="flex-1">{item.label}</span>
                    {item.count ? (
                      <span className="text-caption font-label">{item.count}</span>
                    ) : null}
                  </div>
                );
              })}
              <div className="flex items-center gap-4 py-1.5 pr-4 pl-5 text-note text-gmail-fg-nav">
                <GmailChevronIcon />
                More
              </div>
            </nav>
            <div className="mt-6 flex items-center justify-between px-5">
              <span className="text-body font-emphasis text-gmail-fg">Labels</span>
              <GmailPlusIcon />
            </div>
            <div className="mt-2 flex flex-col">
              {labels.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-4 py-1.5 pr-4 pl-5 text-note text-gmail-fg-nav"
                >
                  <span className={cn("size-icon-sm rounded-sm", item.tone)} />
                  {item.label}
                </div>
              ))}
            </div>
          </aside>

          <section className="relative mb-4 mr-2 flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-gmail bg-surface">
            <div className="flex shrink-0 items-center justify-between px-2 pt-1 text-gmail-icon">
              <div className="flex items-center">
                <GmailTool label="Select">
                  <GmailCheckEmptyIcon />
                </GmailTool>
                <GmailTool label="Back">
                  <GmailBackIcon />
                </GmailTool>
                <GmailTool label="Archive">
                  <GmailArchiveIcon />
                </GmailTool>
                <GmailTool label="Report spam">
                  <GmailSpamIcon />
                </GmailTool>
                <GmailTool label="Delete">
                  <GmailTrashIcon />
                </GmailTool>
                <span className="mx-1 h-5 w-hairline bg-gmail-stroke" />
                <GmailTool label="Mark as unread">
                  <GmailMailIcon />
                </GmailTool>
                <GmailTool label="Snooze">
                  <GmailClockIcon />
                </GmailTool>
                <GmailTool label="Add to Tasks">
                  <GmailTaskIcon />
                </GmailTool>
                <span className="mx-1 h-5 w-hairline bg-gmail-stroke" />
                <GmailTool label="Move to">
                  <GmailMoveIcon />
                </GmailTool>
                <GmailTool label="Labels">
                  <GmailLabelIcon />
                </GmailTool>
                <GmailTool label="More">
                  <GmailMoreIcon />
                </GmailTool>
              </div>
              <div className="flex items-center text-caption font-label text-gmail-fg-faint">
                1–16 of 16
                <GmailTool label="Newer">
                  <GmailChevronLeftIcon />
                </GmailTool>
                <GmailTool label="Older">
                  <GmailChevronRightIcon />
                </GmailTool>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto">
              <div className="flex items-start justify-between gap-stack px-8 pt-6">
                <div>
                  <h1 className="max-w-copy text-section text-gmail-fg">{gmailSubject}</h1>
                  <span className="mt-2 inline-flex items-center rounded-control bg-gmail-pill px-1.5 py-0.5 text-caption font-label text-gmail-fg-muted">
                    Inbox ×
                  </span>
                </div>
                <div className="flex shrink-0 text-gmail-icon">
                  <GmailTool label="Print">
                    <GmailPrintIcon />
                  </GmailTool>
                  <GmailTool label="In new window">
                    <GmailOpenIcon />
                  </GmailTool>
                </div>
              </div>

              <div className="mt-6 flex items-start justify-between gap-stack px-4">
                <div className="flex items-center gap-4">
                  <div className="size-gmail-avatar shrink-0 overflow-hidden rounded-pill">
                    <GmailPersonIcon />
                  </div>
                  <div>
                    <p className="text-body font-title text-gmail-fg">
                      Matcha{" "}
                      <span className="text-caption font-body text-gmail-fg-muted">
                        &lt;fico@matcha.fm&gt;
                      </span>
                    </p>
                    <p className="text-caption font-label text-gmail-fg-faint">to me ▾</p>
                  </div>
                </div>
                <div className="flex items-center pt-2 text-caption font-label text-gmail-fg-faint">
                  9:00 AM (12 hours ago)
                  <span className="flex items-center text-gmail-icon">
                    <GmailTool label="Not starred">
                      <GmailStarOutlineIcon />
                    </GmailTool>
                    <GmailTool label="Reply" onClick={() => openReply()}>
                      <GmailReplyIcon />
                    </GmailTool>
                    <GmailTool label="More">
                      <GmailMoreIcon />
                    </GmailTool>
                  </span>
                </div>
              </div>

              <div className="px-8 py-8">
                <div className="flex max-w-copy flex-col gap-8 text-body leading-normal text-gmail-fg-body">
                  <p>Hey</p>
                  <p>
                    Here are 3 matches for you that were posted recently (ai-heavy product design
                    roles with ownership and strong remote flexibility)
                  </p>
                  <GmailJobList jobs={gmailJobs} onReplyWhy={openReply} />
                  <p>
                    Full list here :{" "}
                    <a href="https://matcha.fm/" className="underline">
                      matcha.fm/full
                    </a>
                  </p>
                  <p>80% are not on linkedin</p>
                  <p>
                    Cheers
                    <br />
                    Fico
                  </p>
                  <a href="https://matcha.fm/" className="underline">
                    Unsubscribe
                  </a>
                  <GmailThreadNotes />
                </div>
                <div className="mt-8 w-full pb-16">
                  <GmailReplyBox
                    open={replyOpen}
                    seed={replySeed}
                    mode={replyMode}
                    onOpen={() => openReply()}
                    onForward={openForward}
                    onClose={closeReply}
                  />
                </div>
              </div>
            </div>
          </section>

          <aside className="flex w-gmail-rail shrink-0 flex-col items-center gap-1 pt-2 text-gmail-icon">
            <GmailTool label="Calendar">
              <GmailCalendarIcon />
            </GmailTool>
            <GmailTool label="Keep">
              <GmailKeepIcon />
            </GmailTool>
            <GmailTool label="Contacts">
              <GmailContactsIcon />
            </GmailTool>
            <span className="my-2 h-hairline w-6 bg-gmail-stroke" />
            <GmailTool label="Get Add-ons">
              <GmailPlusIcon />
            </GmailTool>
          </aside>
        </div>
      </div>
    </div>
  );
}
