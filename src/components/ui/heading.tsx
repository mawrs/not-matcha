import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const variants = {
  display:
    "text-title font-display tracking-display leading-display lg:text-display",
  page: "text-title font-title text-fg",
  affiliate: "text-display-sm sm:text-display font-title leading-display text-fg",
  section: "text-section font-title text-fg",
  kicker:
    "text-caption font-emphasis uppercase tracking-kicker text-fg-faint",
} as const;

type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  as?: "h1" | "h2" | "h3" | "h4";
  variant?: keyof typeof variants;
  align?: "left" | "center";
};

export function Heading({
  as,
  variant = "page",
  align,
  className,
  ...props
}: HeadingProps) {
  const Tag = as ?? (variant === "section" || variant === "kicker" ? "h2" : "h1");
  return (
    <Tag
      className={cn(variants[variant], align === "center" && "text-center", className)}
      {...props}
    />
  );
}
