import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const variants = {
  home: "max-w-wide mx-auto px-page sm:px-page-md lg:px-page-lg py-2",
  prose: "max-w-copy mx-auto px-page pb-prose pt-prose",
  proseLoose: "max-w-copy mx-auto px-page pb-12 pt-prose",
  wide: "max-w-wide mx-auto px-page sm:px-page-md lg:px-page-lg py-2",
  site: "max-w-site mx-auto px-page lg:px-page-lg",
  composer: "max-w-copy mx-auto",
  prefs: "max-w-prefs mx-auto px-header-x pt-prefs-y pb-prefs-bottom",
  lead: "max-w-lead mx-auto",
} as const;

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  variant?: keyof typeof variants;
};

export function Container({
  variant = "prose",
  className,
  ...props
}: ContainerProps) {
  return <div className={cn(variants[variant], className)} {...props} />;
}

export function Canvas({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("min-h-screen bg-surface", className)} {...props} />;
}

export function Stack({
  className,
  gap = "stack",
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  gap?: "tight" | "nudge" | "cluster" | "stack" | "section" | "3" | "4" | "5" | "8" | "12";
}) {
  const gaps = {
    tight: "space-y-tight",
    nudge: "space-y-nudge",
    cluster: "space-y-cluster",
    stack: "space-y-stack",
    section: "space-y-section",
    "3": "space-y-3",
    "4": "space-y-4",
    "5": "space-y-5",
    "8": "space-y-8",
    "12": "space-y-12",
  } as const;
  return <div className={cn(gaps[gap], className)} {...props} />;
}

export function Cluster({
  className,
  gap = "nudge",
  justify = "start",
  align = "center",
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  gap?: "tight" | "nudge" | "rule" | "cluster";
  justify?: "start" | "center" | "between" | "end";
  align?: "center" | "start";
}) {
  return (
    <div
      className={cn(
        "flex",
        gap === "tight" && "gap-tight",
        gap === "nudge" && "gap-nudge",
        gap === "rule" && "gap-rule",
        gap === "cluster" && "gap-cluster",
        justify === "center" && "justify-center",
        justify === "between" && "justify-between",
        justify === "end" && "justify-end",
        align === "center" && "items-center",
        align === "start" && "items-start",
        className,
      )}
      {...props}
    />
  );
}
