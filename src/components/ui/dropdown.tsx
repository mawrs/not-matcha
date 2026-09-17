"use client";

import { useEffect, useId, useRef, useState } from "react";
import { CheckIcon, ChevronDownIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

export type DropdownOption = { value: string; label: string };

type Props = {
  id?: string;
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
};

export function Dropdown({ id, value, options, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const listId = useId();
  const selected = options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={root}>
      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((v) => !v)}
        className="flex h-control w-full items-center justify-between rounded-control border border-border-strong bg-surface px-3 text-left text-body text-fg hover:bg-surface-subtle"
      >
        <span className="truncate">{selected?.label}</span>
        <ChevronDownIcon open={open} />
      </button>
      {open ? (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-overlay mt-nudge max-h-64 w-full overflow-auto rounded-field border border-border bg-surface shadow-modal"
        >
          {options.map((option) => {
            const active = option.value === value;
            return (
              <li key={option.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 px-3 text-left text-body text-fg hover:bg-surface-muted",
                    active && "bg-surface-muted",
                  )}
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                >
                  <span>{option.label}</span>
                  {active ? <CheckIcon /> : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
