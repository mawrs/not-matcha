"use client";

import { Button } from "@/components/ui";
import { TextLink } from "@/components/ui/text-link";
import { useLogin } from "./login-context";
import { UserButton } from "./user-button";

export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <div className="font-title text-body-lg tracking-logo">
      <TextLink href="/" onClick={onClick}>
        Matcha
      </TextLink>
    </div>
  );
}

export function Header() {
  const { setOpen, signedIn } = useLogin();

  return (
    <header className="flex items-center justify-between bg-surface px-header-x py-header-y">
      <Logo />
      <nav className="flex items-center">
        {signedIn ? (
          <UserButton />
        ) : (
          <Button variant="ghost" onClick={() => setOpen(true)}>
            Login
          </Button>
        )}
      </nav>
    </header>
  );
}
