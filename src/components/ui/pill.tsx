import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Pill({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-pill bg-surface-muted px-4 py-1.5 text-caption text-fg-muted",
        className,
      )}
      {...props}
    />
  );
}

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-control border border-border-strong px-2 py-0.5 text-caption text-fg-muted",
        className,
      )}
      {...props}
    />
  );
}
