"use client";

import { usePathname } from "next/navigation";
import { ChatProvider } from "./chat-context";
import { Header } from "./header";
import { LoginModal } from "./login-modal";
import { LoginProvider } from "./login-context";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const gmail = pathname.startsWith("/gmail");

  return (
    <LoginProvider>
      <ChatProvider>
        {gmail ? null : <Header />}
        <main>{children}</main>
        {gmail ? null : <LoginModal />}
      </ChatProvider>
    </LoginProvider>
  );
}
