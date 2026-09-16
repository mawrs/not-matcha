import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ComponentProps } from "react";
import { cn } from "@/lib/cn";

const variants = {
  ghost:
    "text-fg hover:bg-surface-muted rounded-control h-control px-4 font-label text-body",
  brand:
    "bg-brand hover:bg-brand-hover text-fg-inverse rounded-control px-4 py-2.5 font-label text-body",
  cta: "bg-brand hover:bg-brand-hover text-fg-inverse rounded-pill px-6 py-2.5 font-label text-body",
  outline:
    "border border-border-strong bg-surface hover:bg-surface-subtle text-fg rounded-control px-4 py-2.5 font-label text-body",
  icon: "size-control rounded-pill bg-surface-disabled text-fg-inverse disabled:cursor-not-allowed",
  iconBrand: "size-control rounded-pill bg-brand hover:bg-brand-hover text-fg-inverse",
  send: "size-control rounded-pill bg-send hover:bg-send-hover text-fg-inverse",
  save: "bg-fg hover:bg-fg-secondary text-fg-inverse rounded-action px-action-x py-3 font-title text-body",
  upgrade: "bg-brand hover:bg-brand-hover text-fg-inverse rounded-action px-action-x py-3 font-title text-body",
  avatar: "size-control rounded-pill p-0 overflow-hidden bg-avatar text-fg-inverse",
  menu: "h-auto w-full justify-start rounded-none border-b border-border px-4 py-3 font-body text-body text-fg-muted hover:bg-surface-subtle",
  love: "h-auto p-0 font-body text-caption text-fg-check underline",
  quiet: "h-auto p-0 font-label text-body text-fg-muted hover:text-fg",
  nav: "h-auto w-full justify-start rounded-control px-3 py-2 font-label text-body text-fg-muted hover:bg-surface-muted",
  navActive: "h-auto w-full justify-start rounded-control px-3 py-2 font-label text-body text-fg bg-surface-muted",
  danger: "h-auto p-0 font-label text-body text-danger hover:text-danger",
  iconQuiet: "h-auto p-nudge text-fg-faint hover:text-fg",
  gmailSend:
    "rounded-control bg-gmail-label-work px-5 py-2 font-label text-body text-surface transition-colors duration-quick ease-gmail hover:bg-gmail-send-hover active:scale-press disabled:pointer-events-none disabled:opacity-50",
} as const;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  block?: boolean;
};

const buttonClass = (variant: keyof typeof variants, block?: boolean, className?: string) =>
  cn(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors",
    variants[variant],
    block && "w-full",
    className,
  );

export function Button({
  variant = "ghost",
  block,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button type={type} className={buttonClass(variant, block, className)} {...props} />
  );
}

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: keyof typeof variants;
  block?: boolean;
};

export function ButtonLink({
  variant = "cta",
  block,
  className,
  ...props
}: ButtonLinkProps) {
  return <Link className={buttonClass(variant, block, className)} {...props} />;
}

type ButtonAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: keyof typeof variants;
  block?: boolean;
};

export function ButtonAnchor({
  variant = "cta",
  block,
  className,
  ...props
}: ButtonAnchorProps) {
  return <a className={buttonClass(variant, block, className)} {...props} />;
}
