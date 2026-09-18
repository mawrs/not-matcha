export type ChatMessage = { role: "user" | "assistant"; content: string };
export type ChatTurn = { reply: string; readyForContact: boolean };

const TOPICS = [
  {
    id: "role",
    question:
      "What kind of role are you looking for, and at what level? (e.g. senior marketer, junior engineer)",
    test: /(engineer|designer|marketer|marketing|sales|manager|founder|product|role|title|senior|junior|staff|director|support|intern)/,
    hint: /(role|title|level|seniority|engineer|designer|marketer)/,
    clarify:
      "Role is the job you want, plus seniority — like senior product designer, founding engineer, or junior marketer. Title plus level is enough.",
  },
  {
    id: "comp",
    question: "What yearly compensation range are you targeting?",
    test: /(\$|\d+\s?k\b|usd|eur|salary|comp|compensation|ote|pay)/,
    hint: /(compensation|\bsalary\b|\bpay\b|\bote\b|\bcash\b|\bcomp\b)/,
    clarify:
      "A yearly ballpark is enough — base, or total cash if you have it. Something like 150–180k works. Include currency if you are not in USD.",
  },
  {
    id: "location",
    question:
      "Where are you based, and what countries are you authorized to work in?",
    test:
      /(remote|based|sf|nyc|europe|eu\b|us\b|uk\b|canada|authorized|visa|timezone|salt lake|london|berlin)/,
    hint: /(based|authoriz|visa|location|remote|countr|work from)/,
    clarify:
      "Based is where you live now. Authorized to work is where you can legally take a job — citizenship, visa, or already cleared. If you're in the US and only want US remote, say that.",
  },
  {
    id: "company",
    question: "Any preferences on company size, stage, or culture?",
    test: /(startup|series|seed|size|culture|team|stage|small|early)/,
    hint: /(size|stage|culture|seed|series|team|vibe|company)/,
    clarify:
      "Stage is how early they are (pre-seed, seed, Series A/B, later). Size is headcount. Culture is whatever you care about — async, in-office, founder-led, slow vs intense. \"Small early-stage\" or \"no preference\" both work.",
  },
] as const;

export const CHAT_SYSTEM_PROMPT = `You are a calm, experienced career advisor for a remote-startup matching service. You are screening preferences so later matching is accurate. Someone else will ask for LinkedIn and email after you.

You are collecting these four things:
1. Role and seniority
2. Yearly compensation target
3. Where they are based and where they are authorized to work
4. Company size, stage, or culture preferences

Return JSON only:
{"reply": string, "readyForContact": boolean}

Voice:
- Sound like a legitimate career advisor: direct, even, professional. Not a cheerleader, intern, or sales bot.
- No excitement, praise, or pep. Ban: "great question", "love that", "awesome", "amazing", "perfect!", "nice!", "got it!", "hi there", exclamation marks, emoji, and stacked affirmations.
- Clarifications are dry and concrete. Example: "Seniority is the level of the seat — junior, mid, senior, staff."
- Do not hype the service.

Reply shape when you still need information:
1. One opening sentence that asks them to help you further understand what they want, weaving in the specifics they already gave (role, seniority, remote, location, domain). Do not dump their message back as a fragment, and do not pack the follow-ups into that sentence.
   Example: "Please help me further understand what you're looking for in a senior product design role that is remote."
   If they have given almost nothing: "Please help me further understand what you're looking for."
2. A blank line.
3. Each remaining question as its own bullet, prefixed with "— ", one question per bullet. Never comma-separate questions in a paragraph.

Full example after they said they want a senior product design role that is remote:
Please help me further understand what you're looking for in a senior product design role that is remote.

— What yearly compensation range are you targeting?
— Where are you based, and what countries are you authorized to work in?
— Any preferences on company size, stage, or culture?

How to collect:
- Ask for whatever is still missing. React to what they actually said in the opening sentence, then bullet the rest.
- Even a single follow-up must be a bullet, not an inline question.
- If they ask what you mean, explain in one or two sentences, then continue with the same bullet format. readyForContact must be false.
- If they pasted a job or asked for similar roles, note the listing, then collect THEIR constraints.
- If the first message is a greeting or too vague, skip the small talk and ask.
- Do not ask for name, email, LinkedIn, resume, or phone. Do not mention those.
- Do not invent jobs or claim you already found matches.

When to finish:
- readyForContact is true only when you have a usable picture: at least a role, and you've asked about the rest. Skipped details, "don't know", or "no preference" count as done.
- If they are only asking a clarifying question, readyForContact is false even if earlier messages had some preferences.
- When you have enough, one sentence only, like: "That's enough to start matching." Do not mention LinkedIn, email, or how many jobs you found. The client searches next.`;

export function missingTopics(text: string) {
  const value = text.toLowerCase();
  return TOPICS.filter((topic) => !topic.test.test(value));
}

export function looksLikeClarifyingQuestion(text: string) {
  const value = text.trim().toLowerCase();
  if (!value) return false;
  if (value.length > 280 && !value.includes("?")) return false;
  return (
    /\?/.test(value) ||
    /^(what|why|how|wait|huh|which|can you|could you|do you mean|wdym|explain|sorry)/.test(
      value,
    ) ||
    /(what do you mean|what does .+ mean|can you clarify|not sure what you mean|what is .+ (mean|exactly))/.test(
      value,
    )
  );
}

function clarify(text: string) {
  const value = text.toLowerCase();
  const topic = TOPICS.find((item) => item.hint.test(value));
  return topic?.clarify ??
    "I am collecting role and level, pay range, where you can work, and any company size, stage, or culture constraints.";
}

function formatAsk(topics: typeof TOPICS[number][]) {
  if (topics.length === 0) return "";
  return topics.map((topic) => `— ${topic.question}`).join("\n\n");
}

function allUserText(messages: ChatMessage[]) {
  return messages
    .filter((message) => message.role === "user")
    .map((message) => message.content)
    .join("\n\n");
}

function openingLine(text: string) {
  const value = text.toLowerCase();
  if (/show me more jobs like this/i.test(text)) {
    return "Please help me further understand what you're looking for in roles like that listing.";
  }

  const seniority = /\b(staff|principal|lead|director|junior|senior|sr|mid)\b/.test(
    value,
  )
    ? value.match(/\b(staff|principal|lead|director|junior|senior|sr|mid)\b/)?.[0]
    : "";
  const level =
    seniority === "sr"
      ? "senior"
      : seniority === "mid"
        ? "mid-level"
        : seniority;

  let role = "";
  if (/product designer/.test(value)) role = "product design role";
  else if (/designer/.test(value)) role = "design role";
  else if (/(full.?stack|frontend|backend|software)?\s*engineer/.test(value))
    role = "engineering role";
  else if (/marketer|marketing/.test(value)) role = "marketing role";
  else if (/\bsales\b/.test(value)) role = "sales role";
  else if (/product manager|\bpm\b/.test(value)) role = "product role";

  const bits: string[] = [];
  if (role) bits.push(level ? `a ${level} ${role}` : `a ${role}`);
  if (/\bremote\b/.test(value)) bits.push("that is remote");

  if (bits.length === 0) {
    return "Please help me further understand what you're looking for.";
  }
  return `Please help me further understand what you're looking for in ${bits.join(" ")}.`;
}

export function fallbackTurn(messages: ChatMessage[]): ChatTurn {
  const latest =
    [...messages].reverse().find((message) => message.role === "user")
      ?.content ?? "";
  const combined = allUserText(messages);
  const missing = missingTopics(combined);

  if (looksLikeClarifyingQuestion(latest)) {
    const asked = TOPICS.filter((topic) => topic.hint.test(latest.toLowerCase()));
    const focus = asked.length ? asked : missing.slice(0, 1);
    return {
      reply: [clarify(latest), formatAsk(focus)].filter(Boolean).join("\n\n"),
      readyForContact: false,
    };
  }

  if (missing.length === 0) {
    return {
      reply: "That's enough to start matching.",
      readyForContact: true,
    };
  }

  return {
    reply: `${openingLine(combined)}\n\n${formatAsk(missing)}`,
    readyForContact: false,
  };
}

export function normalizeTurn(value: unknown, fallback: ChatTurn): ChatTurn {
  if (!value || typeof value !== "object") return fallback;
  const record = value as { reply?: unknown; readyForContact?: unknown };
  const reply =
    typeof record.reply === "string" ? record.reply.trim() : fallback.reply;
  return {
    reply,
    readyForContact: record.readyForContact === true,
  };
}
