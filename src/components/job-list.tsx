import { Text, TextLink } from "@/components/ui";
import { sampleJobs } from "@/lib/data";

export function JobList({ jobs }: { jobs: typeof sampleJobs }) {
  if (jobs.length === 0) {
    return (
      <Text tone="subtle">
        No sample listings in this slice yet. Describe your role above and Matcha
        will email the ones that fit.
      </Text>
    );
  }

  return (
    <ul className="divide-y divide-border border-y border-border">
      {jobs.map((job) => (
        <li key={job.id} className="py-4">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <div>
              <TextLink href={`/jobs/${job.category}`} variant="title" className="text-body">
                {job.title}
              </TextLink>
              <Text tone="subtle">
                <TextLink href={`/companies/${job.companySlug}`}>{job.company}</TextLink>
                {" · "}
                {job.location}
              </Text>
            </div>
            <div className="sm:text-right">
              <Text size="caption" tone="faint">
                {job.salary}
              </Text>
              <Text size="caption" tone="faint">
                {job.posted}
              </Text>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
