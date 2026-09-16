import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const tones = {
  default: "text-fg",
  secondary: "text-fg-secondary",
  body: "text-fg-body",
  muted: "text-fg-muted",
  subtle: "text-fg-subtle",
  faint: "text-fg-faint",
  quote: "text-fg-quote",
  check: "text-fg-check",
  inverse: "text-fg-inverse",
  brand: "text-brand",
  danger: "text-danger",
} as const;

const sizes = {
  note: "text-note",
  caption: "text-caption",
  body: "text-body",
  "body-lg": "text-body-lg",
  section: "text-section",
} as const;

const weights = {
  body: "font-body",
  label: "font-label",
  emphasis: "font-emphasis",
  title: "font-title",
} as const;

type TextProps = HTMLAttributes<HTMLElement> & {
  as?: "p" | "span" | "div" | "label" | "li";
  tone?: keyof typeof tones;
  size?: keyof typeof sizes;
  weight?: keyof typeof weights;
  align?: "left" | "center" | "right";
};

export function Text({
  as: Tag = "p",
  tone = "body",
  size = "body",
  weight = "body",
  align,
  className,
  ...props
}: TextProps) {
  return (
    <Tag
      className={cn(
        sizes[size],
        tones[tone],
        weights[weight],
        align === "center" && "text-center",
        align === "right" && "text-right",
        className,
      )}
      {...props}
    />
  );
}
