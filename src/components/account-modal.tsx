"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Badge, Button, Cluster, Heading, Stack, Text } from "@/components/ui";
import { cn } from "@/lib/cn";
import {
  AvatarIcon,
  CloseIcon,
  DotsIcon,
  PlusIcon,
  ShieldIcon,
  UserNavIcon,
} from "./icons";
import { useLogin } from "./login-context";

type Tab = "profile" | "security";

function deviceSummary() {
  if (typeof navigator === "undefined") {
    return { name: "This device", browser: "Browser" };
  }
  const ua = navigator.userAgent;
  const name = /Mac/.test(ua)
    ? "Macintosh"
    : /Win/.test(ua)
      ? "Windows"
      : /Linux/.test(ua)
        ? "Linux"
        : "This device";
  const chrome = ua.match(/Chrome\/([\d.]+)/);
  const firefox = ua.match(/Firefox\/([\d.]+)/);
  const electron = ua.match(/Electron\/([\d.]+)/);
  const browser = electron
    ? `Electron ${electron[1]}`
    : chrome
      ? `Chrome ${chrome[1]}`
      : firefox
        ? `Firefox ${firefox[1]}`
        : "Browser";
  return { name, browser };
}

function DeviceMark() {
  return (
    <svg className="size-control shrink-0" viewBox="0 0 36 36" aria-hidden>
      <rect width="36" height="36" rx="6" className="fill-fg" />
      <rect x="8" y="10" width="20" height="12" rx="1.5" className="fill-surface" />
      <rect x="14" y="24" width="8" height="2" className="fill-surface" />
    </svg>
  );
}

function AccountRow({
  label,
  action,
  children,
  align = "center",
  border = true,
}: {
  label: string;
  action?: ReactNode;
  children: ReactNode;
  align?: "center" | "start";
  border?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex gap-stack py-section",
        align === "center" ? "items-center" : "items-start",
        border && "border-b border-border",
      )}
    >
      <Text as="span" size="body" tone="muted" className="w-account-label shrink-0">
        {label}
      </Text>
      <div className="min-w-0 flex-1">{children}</div>
      {action}
    </div>
  );
}

export function AccountModal({ onClose }: { onClose: () => void }) {
  const { email, signOut } = useLogin();
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("profile");
  const device = useMemo(() => deviceSummary(), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-overlay flex items-center justify-center bg-overlay-strong px-page"
      onClick={onClose}
    >
      <div
        className="flex h-account w-full max-w-account overflow-hidden rounded-composer bg-surface shadow-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <aside className="flex w-account-nav shrink-0 flex-col bg-surface-subtle p-stack">
          <Stack gap="tight" className="px-3 pb-section">
            <Heading as="h2" variant="page">
              Account
            </Heading>
            <Text size="caption" tone="subtle">
              Manage your account info.
            </Text>
          </Stack>
          <Button
            variant={tab === "profile" ? "navActive" : "nav"}
            onClick={() => setTab("profile")}
          >
            <UserNavIcon />
            Profile
          </Button>
          <Button
            variant={tab === "security" ? "navActive" : "nav"}
            onClick={() => setTab("security")}
          >
            <ShieldIcon />
            Security
          </Button>
        </aside>
        <section className="min-w-0 flex-1 overflow-y-auto p-section">
          <Cluster justify="between" className="border-b border-border pb-stack">
            <Heading as="h3" variant="section">
              {tab === "profile" ? "Profile details" : "Security"}
            </Heading>
            <Button variant="iconQuiet" onClick={onClose} aria-label="Close">
              <CloseIcon />
            </Button>
          </Cluster>
          {tab === "profile" ? (
            <ProfilePane email={email} />
          ) : (
            <SecurityPane
              device={device}
              onDelete={() => {
                onClose();
                signOut();
                router.replace("/");
              }}
            />
          )}
        </section>
      </div>
    </div>
  );
}

function ProfilePane({ email }: { email: string | null }) {
  return (
    <>
      <AccountRow label="Profile" action={<Button variant="quiet">Update profile</Button>}>
        <AvatarIcon className="size-avatar-lg" />
      </AccountRow>
      <AccountRow
        label="Email addresses"
        align="start"
        border={false}
        action={
          <Button variant="iconQuiet" aria-label="Email actions">
            <DotsIcon />
          </Button>
        }
      >
        <Stack gap="stack">
          <Cluster>
            <Text as="span" size="body" tone="default" weight="label">
              {email}
            </Text>
            <Badge>Primary</Badge>
            <Badge>Unverified</Badge>
          </Cluster>
          <Button variant="quiet">
            <PlusIcon />
            Add email address
          </Button>
        </Stack>
      </AccountRow>
    </>
  );
}

function SecurityPane({
  device,
  onDelete,
}: {
  device: { name: string; browser: string };
  onDelete: () => void;
}) {
  return (
    <>
      <AccountRow
        label="Password"
        action={<Button variant="quiet">Update password</Button>}
      >
        <Text as="span" size="body" tone="default">
          ••••••••••
        </Text>
      </AccountRow>
      <AccountRow label="Active devices" align="start">
        <Stack gap="section">
          <Cluster gap="rule" align="start">
            <DeviceMark />
            <div>
              <Cluster>
                <Text as="span" size="body" tone="default" weight="label">
                  {device.name}
                </Text>
                <Badge>This device</Badge>
              </Cluster>
              <Text size="caption" tone="subtle">
                {device.browser}
              </Text>
              <Text size="caption" tone="subtle">
                This session
              </Text>
              <Text size="caption" tone="subtle">
                Today
              </Text>
            </div>
          </Cluster>
          <Cluster gap="rule" align="start">
            <DeviceMark />
            <div className="min-w-0 flex-1">
              <Cluster justify="between">
                <Text as="span" size="body" tone="default" weight="label">
                  Macintosh
                </Text>
                <Button variant="iconQuiet" aria-label="Device actions">
                  <DotsIcon />
                </Button>
              </Cluster>
              <Text size="caption" tone="subtle">
                Chrome 152.0.0.0
              </Text>
              <Text size="caption" tone="subtle">
                United States
              </Text>
              <Text size="caption" tone="subtle">
                Today
              </Text>
            </div>
          </Cluster>
        </Stack>
      </AccountRow>
      <AccountRow label="Delete account" border={false}>
        <Button variant="danger" onClick={onDelete}>
          Delete account
        </Button>
      </AccountRow>
    </>
  );
}
