export type JobVote = "yes" | "no";

export type JobSignal = {
  vote: JobVote | null;
  why: string;
  hidden: boolean;
};

export type MailNote = {
  id: string;
  from: "me" | "matcha";
  text: string;
};

export type GmailJob = {
  id: string;
  company: string;
  title: string;
  href: string;
  summary: string;
  meta: string;
};

export const emptyJobSignal: JobSignal = {
  vote: null,
  why: "",
  hidden: false,
};

export const gmailSubject =
  "Re: mid/senior product design at design-centric Seed–Series B startups, remote or West Coast, $150k-$180k";

export const gmailSearchPrompt =
  "mid/senior product design at design-centric Seed–Series B startups, remote or West Coast, $150k-$180k";

export const gmailJobs: GmailJob[] = [
  {
    id: "brightplan",
    company: "Brightplan",
    title: "Lead Product Designer at Brightplan",
    href: "https://matcha.fm/",
    summary:
      "Senior IC product design role with strong ownership, explicit AI-first workflow focus, remote US, and comp squarely in your target band.",
    meta: "Posted 5 days ago - Team of 65",
  },
  {
    id: "nash",
    company: "Nash",
    title: "Product Designer at Nash",
    href: "https://matcha.fm/",
    summary:
      "High-ownership product design for complex AI-native workflows with daily LLM use, remote US, and compensation that cleanly meets your floor.",
    meta: "Posted 6 days ago",
  },
  {
    id: "wrapbook",
    company: "Wrapbook",
    title: "Senior Product Designer II at Wrapbook",
    href: "https://matcha.fm/",
    summary:
      "Senior product design IC role with end-to-end ownership, strong AI fluency expectations, remote US/Canada, and salary range that reaches your target.",
    meta: "Posted 1 day ago - Team of 417",
  },
];

export function jobById(id: string) {
  return gmailJobs.find((job) => job.id === id);
}

export function whyLabel(company: string, vote: JobVote) {
  return vote === "yes" ? `Liked ${company}` : `Why not ${company}`;
}

export function whyReplySeed(job: GmailJob, vote: JobVote) {
  return `${whyLabel(job.company, vote)}: `;
}

function dropPrefLine(prefs: string, label: string) {
  return prefs
    .split("\n")
    .filter((line) => !line.startsWith(`${label}:`))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function applyWhyToPrefs(
  prefs: string,
  job: GmailJob,
  vote: JobVote | null,
  why: string,
) {
  let next = dropPrefLine(prefs, `Liked ${job.company}`);
  next = dropPrefLine(next, `Why not ${job.company}`);
  const trimmed = why.trim();
  if (!vote || !trimmed) return next;
  const label = whyLabel(job.company, vote);
  return next ? `${next}\n${label}: ${trimmed}` : `${label}: ${trimmed}`;
}

export function applyReplyToPrefs(prefs: string, reply: string) {
  const trimmed = reply.trim();
  if (!trimmed) return prefs;
  const base = prefs.trim() || gmailSearchPrompt;
  return `${base}\n${trimmed}`;
}

export function matchaReplyConfirm(reply: string) {
  const snippet = reply.trim().replace(/\s+/g, " ");
  const short = snippet.length > 80 ? `${snippet.slice(0, 77)}…` : snippet;
  return `Got it — I updated your preferences with “${short}”. I’ll use this on the next digest.`;
}
