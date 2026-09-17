"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button, Text, Textarea } from "@/components/ui";
import { typewriterExamples } from "@/lib/data";
import { useChat } from "./chat-context";
import { ArrowUpIcon } from "./icons";

type Props = {
  title?: string;
  placeholder?: string;
  animate?: boolean;
};

export function RoleComposer({
  title = "Describe your ideal role, cut the noise",
  placeholder,
  animate = true,
}: Props) {
  const [typed, setTyped] = useState("");
  const [exampleIndex, setExampleIndex] = useState(0);
  const [forward, setForward] = useState(true);
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { openChat } = useChat();
  const example = typewriterExamples[exampleIndex];

  const tick = useCallback(() => {
    if (focused || value || !animate) return;
    if (forward) {
      if (typed.length < example.length) {
        const id = setTimeout(() => setTyped(example.slice(0, typed.length + 1)), 40);
        return () => clearTimeout(id);
      }
      const id = setTimeout(() => setForward(false), 2000);
      return () => clearTimeout(id);
    }
    if (typed.length > 0) {
      const id = setTimeout(() => setTyped(typed.slice(0, -1)), 25);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => {
      setExampleIndex((i) => (i + 1) % typewriterExamples.length);
      setForward(true);
    }, 500);
    return () => clearTimeout(id);
  }, [typed, forward, example, focused, value, animate]);

  useEffect(() => tick(), [tick]);

  const submit = () => {
    const next = value.trim();
    if (!next) return;
    openChat(next);
    setValue("");
    setFocused(false);
  };

  return (
    <div className="relative rounded-composer bg-brand p-1 shadow-composer">
      <Text align="center" className="p-2">
        <Text as="span" tone="inverse">
          {title}
        </Text>
      </Text>
      <div className="relative rounded-field bg-surface">
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            if (!value) setFocused(false);
          }}
          placeholder={focused && !value ? placeholder || example : placeholder}
          rows={5}
          className="relative z-10"
        />
        {animate && !focused && !value && (
          <div className="pointer-events-none absolute top-0 left-0 px-4 py-3 pr-14 text-body-lg text-fg sm:text-body whitespace-pre-wrap break-words">
            {typed}
            <span className="ml-px inline-block size-caret animate-pulse bg-fg align-text-bottom" />
          </div>
        )}
        <Button
          variant={value.trim() ? "iconBrand" : "icon"}
          onClick={submit}
          disabled={!value.trim()}
          className="absolute right-3 bottom-3 z-20"
        >
          <ArrowUpIcon />
        </Button>
      </div>
    </div>
  );
}
