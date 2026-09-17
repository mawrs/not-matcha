"use client";

import { usePathname } from "next/navigation";
import { Button, ButtonLink, Cluster } from "@/components/ui";
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
  const pathname = usePathname();
  const onJobs = pathname.startsWith("/jobs");

  return (
    <header className="flex items-center justify-between bg-surface px-header-x py-header-y">
      <Logo />
      <nav>
        <Cluster>
          <ButtonLink
            href="/jobs"
            variant="ghost"
            className={onJobs ? "bg-surface-muted" : undefined}
          >
            Job Board
          </ButtonLink>
          {signedIn ? (
            <UserButton />
          ) : (
            <Button variant="ghost" onClick={() => setOpen(true)}>
              Login
            </Button>
          )}
        </Cluster>
      </nav>
    </header>
  );
}
