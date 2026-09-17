"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { ChatOverlay } from "./chat-overlay";

type ChatContextValue = {
  openChat: (message: string) => void;
};

const ChatContext = createContext<ChatContextValue | null>(null);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);

  const openChat = useCallback((next: string) => {
    const value = next.trim();
    if (value) setMessage(value);
  }, []);

  return (
    <ChatContext.Provider value={{ openChat }}>
      {children}
      {message ? (
        <ChatOverlay
          key={message}
          initialMessage={message}
          onClose={() => setMessage(null)}
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
