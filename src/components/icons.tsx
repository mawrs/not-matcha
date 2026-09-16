import { cn } from "@/lib/cn";

export function WheatIcon({ flipped = false }: { flipped?: boolean }) {
  return (
    <svg
      className={cn(
        "size-icon-sm text-accent shrink-0 stroke-icon",
        flipped && "-scale-x-100",
      )}
      viewBox="0 0 12 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 21c0 0-2-3-2-8c0-4 1-7 2-9" />
      <path d="M7.5 12.5C6 11 4.5 10 3 10c0 0 1 3 4.5 5" />
      <path d="M7 16c-1.5-1-3-1.5-4-1.5c0 0 .5 2.5 4 4" />
      <path d="M8.5 9C7 7.5 5 6.5 3.5 6.5c0 0 .5 2.5 5 4.5" />
    </svg>
  );
}

export function ArrowUpIcon() {
  return (
    <svg
      className="size-icon stroke-strong"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="19" x2="12" y2="5" />
      <polyline points="5 12 12 5 19 12" />
    </svg>
  );
}

export function CloseIcon() {
  return (
    <svg
      className="size-icon-sm stroke-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </svg>
  );
}

export function AvatarIcon({ className }: { className?: string }) {
  return (
    <svg className={className ?? "size-control"} viewBox="0 0 36 36" aria-hidden>
      <circle cx="18" cy="18" r="18" className="fill-avatar" />
      <circle cx="18" cy="14" r="6" className="fill-surface" />
      <ellipse cx="18" cy="30" rx="10" ry="8" className="fill-surface" />
    </svg>
  );
}

export function GearIcon() {
  return (
    <svg
      className="size-icon-sm stroke-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4m11.4-11.4 1.4-1.4" />
    </svg>
  );
}

export function MailIcon() {
  return (
    <svg
      className="size-icon-sm stroke-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export function SignOutIcon() {
  return (
    <svg
      className="size-icon-sm stroke-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="m16 17 5-5-5-5" />
      <path d="M21 12H9" />
    </svg>
  );
}

export function UserNavIcon() {
  return (
    <svg
      className="size-icon-sm stroke-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 19c.8-3.2 3.5-5 7-5s6.2 1.8 7 5" />
    </svg>
  );
}

export function ShieldIcon() {
  return (
    <svg
      className="size-icon-sm stroke-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function PlusIcon() {
  return (
    <svg
      className="size-icon-sm stroke-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function DotsIcon() {
  return (
    <svg className="size-icon-sm" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="6" cy="12" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="18" cy="12" r="1.5" />
    </svg>
  );
}

export function GoogleIcon() {
  return (
    <svg className="size-icon-sm" viewBox="0 0 24 24">
      <path
        className="fill-google-blue"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        className="fill-google-green"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        className="fill-google-yellow"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        className="fill-google-red"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}
