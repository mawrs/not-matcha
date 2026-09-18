import {
  CHAT_SIMILAR_JOB_PROMPT,
  CHAT_SYSTEM_PROMPT,
  fallbackTurn,
  normalizeTurn,
  similarJobContext,
  similarJobTurn,
  type ChatMessage,
} from "@/lib/chat";
import { sampleJobs, similarJobs } from "@/lib/jobs";

type Body = { messages?: ChatMessage[]; jobId?: string };

export async function POST(request: Request) {
  let body: Body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const messages = (body.messages ?? []).filter(
    (message): message is ChatMessage =>
      !!message &&
      (message.role === "user" || message.role === "assistant") &&
      typeof message.content === "string",
  );

  if (messages.length === 0) {
    return Response.json({ error: "messages required" }, { status: 400 });
  }

  const job =
    typeof body.jobId === "string"
      ? sampleJobs.find((item) => item.id === body.jobId)
      : undefined;
  const matches = job ? similarJobs(job) : [];
  const fallback = job ? similarJobTurn(job, matches) : fallbackTurn(messages);
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return Response.json(fallback);
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL ?? "gpt-5.6-sol",
        reasoning_effort: "low",
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content: job ? CHAT_SIMILAR_JOB_PROMPT : CHAT_SYSTEM_PROMPT,
          },
          ...(job
            ? [{ role: "system" as const, content: similarJobContext(job, matches) }]
            : []),
          ...messages.map((message) => ({
            role: message.role,
            content: message.content,
          })),
        ],
      }),
    });

    if (!response.ok) {
      console.error("OpenAI chat error", response.status, await response.text());
      return Response.json(fallback);
    }

    const data = await response.json();
    const raw = data?.choices?.[0]?.message?.content;
    const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
    const turn = normalizeTurn(parsed, fallback);
    if (job) turn.readyForContact = true;
    return Response.json(turn);
  } catch {
    return Response.json(fallback);
  }
}
