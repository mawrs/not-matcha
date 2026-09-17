import Link from "next/link";
import { Text } from "@/components/ui";
import { getCompany, type Job } from "@/lib/data";

const markColors: Record<string, string> = {
  viktor: "bg-avatar",
  posthog: "bg-accent",
  "plus-ai": "bg-google-blue",
  helply: "bg-gmail-yes",
  ghost: "bg-fg",
  "2501-ai": "bg-danger",
  narvar: "bg-send",
  "bending-spoons": "bg-google-yellow",
  powernaut: "bg-brand",
  "desktop-commander": "bg-google-green",
  hostie: "bg-gmail-profile",
  vantaca: "bg-brand-soft",
};

const markFallback = [
  "bg-brand",
  "bg-avatar",
  "bg-send",
  "bg-accent",
  "bg-google-blue",
  "bg-danger",
];

function markClass(slug: string) {
  if (markColors[slug]) return markColors[slug];
  let hash = 0;
  for (const char of slug) hash = (hash * 31 + char.charCodeAt(0)) | 0;
  return markFallback[Math.abs(hash) % markFallback.length];
}

function LogoMark({ slug }: { slug: string }) {
  return (
    <div
      className={`size-10 shrink-0 rounded-control ${markClass(slug)}`}
      aria-hidden
    />
  );
}

export function JobList({ jobs }: { jobs: Job[] }) {
  if (jobs.length === 0) {
    return (
      <Text tone="subtle" align="center">
        No sample listings in this slice yet. Describe your role above and Matcha
        will email the ones that fit.
      </Text>
    );
  }

  return (
    <ul className="m-0 list-none space-y-3 p-0">
      {jobs.map((job) => {
        const company = getCompany(job.companySlug);
        const chips = job.chips ?? [job.salary];
        const blurb = job.blurb ?? company?.blurb ?? "";

        return (
          <li key={job.id}>
            <article className="rounded-card border border-border transition-colors hover:border-fg-faint">
              <Link href={`/companies/${job.companySlug}`} className="block p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex min-w-0 items-start gap-3">
                    <LogoMark slug={job.companySlug} />
                    <div className="min-w-0">
                      <h3 className="text-body font-emphasis text-fg">
                        {job.title} at {job.company}
                      </h3>
                      {blurb ? (
                        <Text size="caption" tone="faint" className="mt-0.5">
                          {blurb}
                        </Text>
                      ) : null}
                    </div>
                  </div>
                  <time className="mt-0.5 shrink-0 text-caption text-fg-faint">
                    {job.posted}
                  </time>
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {chips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded bg-surface-muted px-1.5 py-0.5 text-caption text-fg-subtle"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
                {job.summary ? (
                  <Text size="caption" tone="subtle" className="mt-2">
                    {job.summary}
                  </Text>
                ) : null}
                <Text size="caption" tone="faint" className="mt-2">
                  {job.location}
                </Text>
              </Link>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
