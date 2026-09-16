import type { ComponentProps } from "react";
import { Text } from "./text";
import { cn } from "@/lib/cn";

const fieldClass =
  "w-full bg-transparent text-fg text-body-lg sm:text-body placeholder:text-fg-faint focus:outline-none";

export function Input({
  className,
  ...props
}: ComponentProps<"input">) {
  return (
    <input
      className={cn(
        fieldClass,
        "rounded-control border border-border-strong px-3 py-2 focus:border-brand",
        className,
      )}
      {...props}
    />
  );
}

export function FieldLabel({
  className,
  ...props
}: ComponentProps<"label">) {
  return (
    <Text as="label" size="caption" tone="subtle" className={className} {...props} />
  );
}

export function PrefsTextarea({
  className,
  ...props
}: ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        fieldClass,
        "min-h-prefs w-full resize-y rounded-composer border border-border-strong bg-surface px-5 py-5 text-body leading-body text-fg placeholder:text-fg-faint focus:outline-none",
        className,
      )}
      {...props}
    />
  );
}

export function Textarea({
  className,
  ...props
}: ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        fieldClass,
        "resize-none rounded-field px-4 py-3 pr-14",
        className,
      )}
      {...props}
    />
  );
}
