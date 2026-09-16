import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Button } from "./button";
import { Text } from "./text";
import { CloseIcon } from "../icons";

const sizes = {
  default: "max-w-modal rounded-field",
  wide: "max-w-wide rounded-composer",
} as const;

export function Modal({
  children,
  footer,
  onClose,
  size = "default",
  overlay = "overlay",
  showClose = true,
}: {
  children: ReactNode;
  footer?: ReactNode;
  onClose: () => void;
  size?: keyof typeof sizes;
  overlay?: "overlay" | "overlay-strong";
  showClose?: boolean;
}) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-overlay flex items-center justify-center px-page",
        overlay === "overlay-strong" ? "bg-overlay-strong" : "bg-overlay",
      )}
      onClick={onClose}
    >
      <div
        className={cn(
          "relative w-full overflow-hidden bg-surface shadow-modal",
          sizes[size],
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {showClose ? (
          <Button
            variant="iconQuiet"
            className="pin-modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            <CloseIcon />
          </Button>
        ) : null}
        <div className={size === "wide" ? "max-h-dialog overflow-y-auto p-page sm:p-page-md" : "p-modal-body"}>
          {children}
        </div>
        {footer ? (
          <div className="border-t border-border py-modal-footer text-center">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function ModalFooterNote({ children }: { children: ReactNode }) {
  return (
    <Text size="caption" tone="faint">
      {children}
    </Text>
  );
}
