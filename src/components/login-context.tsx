"use client";

import { createContext, useContext, useState } from "react";
import {
  applyReplyToPrefs,
  applyWhyToPrefs,
  emptyJobSignal,
  gmailJobs,
  jobById,
  matchaReplyConfirm,
  whyLabel,
  type JobSignal,
  type JobVote,
  type MailNote,
} from "@/lib/gmail-mail";

type LoginContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  signedIn: boolean;
  email: string | null;
  preferences: string;
  setPreferences: (value: string) => void;
  signIn: (email: string) => void;
  signOut: () => void;
  jobSignals: Record<string, JobSignal>;
  mailNotes: MailNote[];
  ensureSession: () => void;
  setJobVote: (id: string, vote: JobVote) => void;
  setJobWhy: (id: string, why: string) => void;
  hideJob: (id: string) => void;
  unhideJob: (id: string) => void;
  sendReply: (text: string) => void;
};

const LoginContext = createContext<LoginContextValue | null>(null);

export function LoginProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [preferences, setPreferences] = useState("");
  const [jobSignals, setJobSignals] = useState<Record<string, JobSignal>>({});
  const [mailNotes, setMailNotes] = useState<MailNote[]>([]);

  const signIn = (nextEmail: string) => {
    setEmail(nextEmail);
    setSignedIn(true);
    setOpen(false);
  };

  const signOut = () => {
    setSignedIn(false);
    setEmail(null);
    setPreferences("");
    setJobSignals({});
    setMailNotes([]);
  };

  const ensureSession = () => {
    if (!signedIn) {
      setEmail((current) => current ?? "you@gmail.com");
      setSignedIn(true);
      setOpen(false);
    }
  };

  const setJobVote = (id: string, vote: JobVote) => {
    ensureSession();
    const job = jobById(id);
    setJobSignals((prev) => {
      const current = prev[id] ?? emptyJobSignal;
      const nextVote = current.vote === vote ? null : vote;
      const next = {
        ...current,
        vote: nextVote,
        why: nextVote ? current.why : "",
      };
      if (job) {
        setPreferences((prefs) => applyWhyToPrefs(prefs, job, next.vote, next.why));
      }
      return { ...prev, [id]: next };
    });
  };

  const setJobWhy = (id: string, why: string) => {
    ensureSession();
    const job = jobById(id);
    setJobSignals((prev) => {
      const current = prev[id] ?? emptyJobSignal;
      const next = { ...current, why };
      if (job) {
        setPreferences((prefs) => applyWhyToPrefs(prefs, job, next.vote, why));
      }
      return { ...prev, [id]: next };
    });
  };

  const hideJob = (id: string) => {
    ensureSession();
    setJobSignals((prev) => ({
      ...prev,
      [id]: { ...(prev[id] ?? emptyJobSignal), hidden: true },
    }));
  };

  const unhideJob = (id: string) => {
    setJobSignals((prev) => ({
      ...prev,
      [id]: { ...(prev[id] ?? emptyJobSignal), hidden: false },
    }));
  };

  const sendReply = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    ensureSession();

    let whyMatch = false;
    for (const job of gmailJobs) {
      for (const vote of ["yes", "no"] as const) {
        const prefix = `${whyLabel(job.company, vote)}:`;
        if (!trimmed.startsWith(prefix)) continue;
        const why = trimmed.slice(prefix.length).trim();
        whyMatch = true;
        setJobSignals((prev) => ({
          ...prev,
          [job.id]: { ...(prev[job.id] ?? emptyJobSignal), vote, why },
        }));
        setPreferences((prefs) => applyWhyToPrefs(prefs, job, vote, why));
      }
    }
    if (!whyMatch) {
      setPreferences((prefs) => applyReplyToPrefs(prefs, trimmed));
    }

    const stamp = Date.now();
    setMailNotes((prev) => [
      ...prev,
      { id: `me-${stamp}`, from: "me", text: trimmed },
      { id: `matcha-${stamp}`, from: "matcha", text: matchaReplyConfirm(trimmed) },
    ]);
  };

  return (
    <LoginContext.Provider
      value={{
        open,
        setOpen,
        signedIn,
        email,
        preferences,
        setPreferences,
        signIn,
        signOut,
        jobSignals,
        mailNotes,
        ensureSession,
        setJobVote,
        setJobWhy,
        hideJob,
        unhideJob,
        sendReply,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}

export function useLogin() {
  const ctx = useContext(LoginContext);
  if (!ctx) throw new Error("useLogin must be used within LoginProvider");
  return ctx;
}
