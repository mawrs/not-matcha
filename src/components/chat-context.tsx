"use client";

import { createContext, useCallback, useContext, useState } from "react";
import type { Job } from "@/lib/data";
import { ChatOverlay } from "./chat-overlay";

type ChatContextValue = {
  openChat: (message: string, job?: Job) => void;
};

const ChatContext = createContext<ChatContextValue | null>(null);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<{ message: string; job?: Job } | null>(
    null,
  );

  const openChat = useCallback((next: string, job?: Job) => {
    const value = next.trim();
    if (value) setSession({ message: value, job });
  }, []);

  return (
    <ChatContext.Provider value={{ openChat }}>
      {children}
      {session ? (
        <ChatOverlay
          key={session.job?.id ?? session.message}
          initialMessage={session.message}
          initialJob={session.job}
          onClose={() => setSession(null)}
        />
      ) : null}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used within ChatProvider");
  return ctx;
}
