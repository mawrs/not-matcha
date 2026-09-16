import type { ReactNode, SVGProps } from "react";
import { cn } from "@/lib/cn";

function Mark({ className, children, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={cn("size-gmail-mark", className)}
      {...props}
    >
      {children}
    </svg>
  );
}

export function GmailMenuIcon() {
  return (
    <Mark>
      <path d="M3 6h18v2H3V6Zm0 5h18v2H3v-2Zm0 5h18v2H3v-2Z" />
    </Mark>
  );
}

export function GmailSearchIcon() {
  return (
    <Mark>
      <path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L20 21.49 21.49 20 15.5 14Zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14Z" />
    </Mark>
  );
}

export function GmailTuneIcon() {
  return (
    <Mark>
      <path d="M3 17v2h6v-2H3ZM3 5v2h10V5H3Zm10 16v-2h8v-2h-8v-2h-2v6h2ZM7 9v2H3v2h4v2h2V9H7Zm14 4v-2H11v2h10Zm-6-4h2V7h4V5h-4V3h-2v6Z" />
    </Mark>
  );
}

export function GmailHelpIcon() {
  return (
    <Mark>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8Zm-1-4h2v2h-2v-2Zm1.61-9.96c-2.06-.3-3.88.97-4.43 2.79l1.93.5c.19-.68.89-1.33 1.7-1.21.85.13 1.19.81 1.16 1.27-.08 1.24-2.07 1.16-2.07 3.61h1.98c0-1.22.56-1.75 1.17-2.27.55-.47 1.03-.89 1.03-1.9 0-1.36-1.13-2.43-2.47-2.79Z" />
    </Mark>
  );
}

export function GmailSettingsIcon() {
  return (
    <Mark>
      <path d="M19.14 12.94c.04-.31.06-.63.06-.94s-.02-.63-.06-.94l2.03-1.58a.5.5 0 0 0 .12-.64l-1.92-3.32a.5.5 0 0 0-.6-.22l-2.39.96a7.2 7.2 0 0 0-1.63-.94l-.36-2.54A.5.5 0 0 0 13.9 2h-3.8a.5.5 0 0 0-.5.42l-.36 2.54c-.59.24-1.13.55-1.63.94l-2.39-.96a.5.5 0 0 0-.6.22L2.7 8.48a.5.5 0 0 0 .12.64L4.85 10.7c-.04.31-.06.63-.06.94s.02.63.06.94L2.82 14.16a.5.5 0 0 0-.12.64l1.92 3.32c.14.24.43.34.69.22l2.39-.96c.5.39 1.04.7 1.63.94l.36 2.54c.05.24.26.42.5.42h3.8c.24 0 .45-.18.5-.42l.36-2.54c.59-.24 1.13-.55 1.63-.94l2.39.96c.26.12.55.02.69-.22l1.92-3.32a.5.5 0 0 0-.12-.64l-2.03-1.58ZM12 15.6A3.6 3.6 0 1 1 12 8.4a3.6 3.6 0 0 1 0 7.2Z" />
    </Mark>
  );
}

export function GmailAppsIcon() {
  return (
    <Mark>
      <path d="M4 8h4V4H4v4Zm6 12h4v-4h-4v4Zm-6 0h4v-4H4v4Zm0-6h4v-4H4v4Zm6 0h4v-4h-4v4Zm6-10v4h4V4h-4Zm-6 4h4V4h-4v4Zm6 6h4v-4h-4v4Zm0 6h4v-4h-4v4Z" />
    </Mark>
  );
}

export function GmailPencilIcon() {
  return (
    <Mark>
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25ZM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83Z" />
    </Mark>
  );
}

export function GmailInboxIcon() {
  return (
    <Mark>
      <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Zm0 12h-4c0 1.66-1.34 3-3 3s-3-1.34-3-3H5V5h14v10Z" />
    </Mark>
  );
}

export function GmailStarIcon() {
  return (
    <Mark>
      <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27Z" />
    </Mark>
  );
}

export function GmailSnoozeIcon() {
  return (
    <Mark>
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16Zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7Z" />
    </Mark>
  );
}

export function GmailSentIcon() {
  return (
    <Mark>
      <path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2 .01 7Z" />
    </Mark>
  );
}

export function GmailDraftsIcon() {
  return (
    <Mark>
      <path d="M21.99 8c0-.72-.37-1.35-.94-1.7L12 1 2.95 6.3C2.38 6.65 2 7.28 2 8v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2l-.01-10ZM12 13 3.74 7.84 12 3l8.26 4.84L12 13Z" />
    </Mark>
  );
}

export function GmailChevronIcon() {
  return (
    <Mark>
      <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41Z" />
    </Mark>
  );
}

export function GmailBackIcon() {
  return (
    <Mark>
      <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2Z" />
    </Mark>
  );
}

export function GmailArchiveIcon() {
  return (
    <Mark>
      <path d="M20.54 5.23 19.15 3.55A2 2 0 0 0 17.53 3H6.47a2 2 0 0 0-1.62.55L3.46 5.23A2 2 0 0 0 3 6.63V19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.63c0-.54-.21-1.04-.46-1.4ZM12 9.5 16.5 14H14v3h-4v-3H7.5L12 9.5ZM5.12 5l.81-1h12.14l.81 1H5.12Z" />
    </Mark>
  );
}

export function GmailSpamIcon() {
  return (
    <Mark>
      <path d="M12 2 1 21h22L12 2Zm1 16h-2v-2h2v2Zm0-4h-2v-4h2v4Z" />
    </Mark>
  );
}

export function GmailTrashIcon() {
  return (
    <Mark>
      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12ZM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4Z" />
    </Mark>
  );
}

export function GmailMailIcon() {
  return (
    <Mark>
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z" />
    </Mark>
  );
}

export function GmailClockIcon() {
  return (
    <Mark>
      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2ZM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8Zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7Z" />
    </Mark>
  );
}

export function GmailTaskIcon() {
  return (
    <Mark>
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2Zm-9 14-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9Z" />
    </Mark>
  );
}

export function GmailMoveIcon() {
  return (
    <Mark>
      <path d="M20 6h-8l-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2Zm-2 10-4-4v3H8v-2h6V9l4 4-4 3Z" />
    </Mark>
  );
}

export function GmailLabelIcon() {
  return (
    <Mark>
      <path d="M17.63 5.84C17.27 5.33 16.67 5 16 5H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h11c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16Z" />
    </Mark>
  );
}

export function GmailMoreIcon() {
  return (
    <Mark>
      <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2Zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Z" />
    </Mark>
  );
}

export function GmailPrintIcon() {
  return (
    <Mark>
      <path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3Zm-3 11H8v-5h8v5Zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1Zm-1-9H6v4h12V3Z" />
    </Mark>
  );
}

export function GmailOpenIcon() {
  return (
    <Mark>
      <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7ZM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7Z" />
    </Mark>
  );
}

export function GmailReplyIcon() {
  return (
    <Mark>
      <path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11Z" />
    </Mark>
  );
}

export function GmailForwardIcon() {
  return (
    <Mark>
      <path d="M14 9V5l7 7-7 7v-4.1c-5 0-8.5 1.6-11 5.1 1-5 4-10 11-11Z" />
    </Mark>
  );
}

export function GmailSmileIcon() {
  return (
    <Mark>
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-3.5 8.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Zm7 0a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 17.5A4.5 4.5 0 0 1 7.6 15h8.8A4.5 4.5 0 0 1 12 17.5Z" />
    </Mark>
  );
}

export function GmailStarOutlineIcon() {
  return (
    <Mark>
      <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24ZM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4Z" />
    </Mark>
  );
}

export function GmailCalendarIcon() {
  return (
    <Mark className="text-gmail-label-work">
      <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 16H5V10h14v10Zm0-12H5V6h14v2Z" />
    </Mark>
  );
}

export function GmailKeepIcon() {
  return (
    <Mark className="text-gmail-label-news">
      <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1Zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7Z" />
    </Mark>
  );
}

export function GmailContactsIcon() {
  return (
    <Mark className="text-gmail-label-work">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4Zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4Z" />
    </Mark>
  );
}

export function GmailPlusIcon() {
  return (
    <Mark>
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2Z" />
    </Mark>
  );
}

export function GmailCheckEmptyIcon() {
  return (
    <Mark>
      <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2Z" />
    </Mark>
  );
}

export function GmailChevronLeftIcon() {
  return (
    <Mark>
      <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
    </Mark>
  );
}

export function GmailChevronRightIcon() {
  return (
    <Mark>
      <path d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
    </Mark>
  );
}

export function GmailPersonIcon({ tone = "profile" }: { tone?: "profile" | "me" }) {
  return (
    <svg viewBox="0 0 40 40" className="size-full" aria-hidden>
      <circle
        cx="20"
        cy="20"
        r="20"
        className={tone === "me" ? "fill-gmail-label-cat" : "fill-gmail-profile"}
      />
      <circle cx="20" cy="15" r="6" className="fill-surface" />
      <ellipse cx="20" cy="32" rx="11" ry="9" className="fill-surface" />
    </svg>
  );
}

export function GmailWordmark() {
  return (
    <span className="flex items-center gap-2 text-gmail-fg-logo">
      <img src="/gmail/logo.svg" alt="" className="size-gmail-logo" />
      <span className="text-gmail-word font-emphasis tracking-tight">Gmail</span>
    </span>
  );
}

export function GmailTool({
  label,
  children,
  onClick,
}: {
  label: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex size-gmail-tool items-center justify-center rounded-pill text-gmail-icon hover:bg-gmail-chip"
    >
      {children}
    </button>
  );
}
