"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Text } from "@/components/ui";
import { AccountModal } from "./account-modal";
import { AvatarIcon, GearIcon, MailIcon, SignOutIcon } from "./icons";
import { useLogin } from "./login-context";

export function UserButton() {
  const { email, signOut } = useLogin();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [open]);

  return (
    <>
      <div className="relative" ref={root}>
        <Button
          variant="avatar"
          aria-label={open ? "Close user menu" : "Open user menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <AvatarIcon />
        </Button>
        {open ? (
          <div className="pin-user-menu z-overlay mt-nudge w-menu overflow-hidden rounded-field bg-surface shadow-modal">
            <div className="flex items-center gap-3 border-b border-border px-4 py-4">
              <AvatarIcon className="size-control shrink-0" />
              <Text as="span" size="body" tone="default" weight="label">
                {email}
              </Text>
            </div>
            <Button
              variant="menu"
              onClick={() => {
                setOpen(false);
                setAccountOpen(true);
              }}
            >
              <GearIcon />
              Manage account
            </Button>
            <Button
              variant="menu"
              onClick={() => {
                setOpen(false);
                router.push("/gmail");
              }}
            >
              <MailIcon />
              Gmail POV
            </Button>
            <Button
              variant="menu"
              onClick={() => {
                setOpen(false);
                signOut();
                router.replace("/");
              }}
            >
              <SignOutIcon />
              Sign out
            </Button>
          </div>
        ) : null}
      </div>
      {accountOpen ? <AccountModal onClose={() => setAccountOpen(false)} /> : null}
    </>
  );
}
