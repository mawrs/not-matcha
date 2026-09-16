import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

const variants = {
  inherit: "transition-colors hover:text-fg-muted",
  muted: "text-body text-fg-subtle hover:text-fg-secondary hover:underline",
  faint: "text-caption text-fg-subtle hover:text-fg-secondary hover:underline",
  title: "font-label text-fg hover:underline",
  body: "text-body text-fg-secondary hover:text-fg-secondary hover:underline",
} as const;

type TextLinkProps = ComponentProps<typeof Link> & {
  variant?: keyof typeof variants;
};

export function TextLink({
  variant = "inherit",
  className,
  ...props
}: TextLinkProps) {
  return <Link className={cn(variants[variant], className)} {...props} />;
}
