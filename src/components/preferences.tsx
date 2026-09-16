"use client";

import { useEffect, useState } from "react";
import {
  Button,
  ButtonAnchor,
  Cluster,
  Container,
  PrefsTextarea,
  Stack,
  Text,
} from "@/components/ui";
import { loveCount, upgradeUrl } from "@/lib/data";
import { gmailJobs } from "@/lib/gmail-mail";
import { LovedByModal } from "./loved-by-modal";
import { useLogin } from "./login-context";

const perks = [
  "Hot roles as they are posted every day",
  "Zero noise. Only what's a good fit for you",
  "Every fully remote startup and scaleup",
  "80% not on LinkedIn",
];

export function Preferences() {
  const { email, preferences, setPreferences, jobSignals, unhideJob } = useLogin();
  const [draft, setDraft] = useState(preferences);
  const [saved, setSaved] = useState(false);
  const [lovedOpen, setLovedOpen] = useState(false);
  const hiddenJobs = gmailJobs.filter((job) => jobSignals[job.id]?.hidden);

  useEffect(() => {
    setDraft(preferences);
  }, [preferences]);

  const checkout = new URL(upgradeUrl);
  if (email) checkout.searchParams.set("prefilled_email", email);

  return (
    <div className="min-h-screen bg-surface">
      <Container variant="prefs">
        <div className="mb-section rounded-field border border-border-brand bg-surface-brand px-5 py-stack">
          <Text size="note" tone="quote">
            0/3 free matches left this week - resets on Tuesday
          </Text>
          <div className="mt-stack flex items-center justify-between gap-rule border-t border-border-brand pt-stack">
            <Stack gap="tight">
              <Text size="body" tone="default" weight="title">
                Unlock all your matches
              </Text>
              <ul className="mt-tight flex flex-col gap-tight">
                {perks.map((perk) => (
                  <Text as="li" key={perk} size="caption" tone="check" className="flex items-baseline gap-1.5">
                    <Text as="span" size="caption" tone="brand" weight="title">
                      ✓
                    </Text>
                    {perk}
                  </Text>
                ))}
                <Text as="li" size="caption" tone="check" className="flex items-baseline gap-1.5">
                  <Text as="span" size="caption">
                    ❤️
                  </Text>
                  <Button variant="love" onClick={() => setLovedOpen(true)}>
                    Loved by {loveCount} remote talent
                  </Button>
                </Text>
              </ul>
            </Stack>
            <ButtonAnchor
              variant="upgrade"
              href={checkout.toString()}
              target="_blank"
              rel="noopener noreferrer"
            >
              Upgrade
            </ButtonAnchor>
          </div>
        </div>
        <Text size="note" tone="quote" className="mb-2.5">
          Prompt: What is your ideal remote startup role?
        </Text>
        {hiddenJobs.length ? (
          <div className="mb-5 rounded-field border border-border px-5 py-4">
            <Text size="note" tone="muted" weight="label" className="mb-3">
              Hidden from emails
            </Text>
            <Stack gap="tight">
              {hiddenJobs.map((job) => (
                <div key={job.id} className="flex items-center justify-between gap-4">
                  <Text size="body" tone="default">
                    {job.title}
                  </Text>
                  <Button variant="quiet" onClick={() => unhideJob(job.id)}>
                    Undo
                  </Button>
                </div>
              ))}
            </Stack>
          </div>
        ) : null}
        <PrefsTextarea
          value={draft}
          onChange={(e) => {
            setDraft(e.target.value);
            setSaved(false);
          }}
          placeholder="Roles, tech stack, level, location, comp, anything else…"
        />
        <Cluster justify="end" gap="rule" className="mt-prefs-save">
          <Text
            size="note"
            tone="brand"
            className={saved ? "opacity-100" : "pointer-events-none opacity-0"}
          >
            ✓ Saved
          </Text>
          <Button
            variant="save"
            onClick={() => {
              setPreferences(draft);
              setSaved(true);
            }}
          >
            Save preferences
          </Button>
        </Cluster>
      </Container>
      {lovedOpen ? <LovedByModal onClose={() => setLovedOpen(false)} /> : null}
    </div>
  );
}
