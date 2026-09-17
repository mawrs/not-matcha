import { ContentFooter } from "@/components/content-footer";
import { WheatIcon } from "@/components/icons";
import { JobList } from "@/components/job-list";
import { RoleComposer } from "@/components/role-composer";
import { Canvas, Container, Heading, Pill, Text } from "@/components/ui";
import type { Job } from "@/lib/data";

type Props = {
  role: string;
  region?: string;
  jobs: Job[];
};

export function RoleListing({ role, region, jobs }: Props) {
  const count = jobs.length;
  const fresh = jobs.filter((job) => /(?:h ago|[12]d ago)/.test(job.posted)).length;
  const heading = region
    ? `${count} Remote ${role} Jobs in ${region}`
    : `${count} Remote ${role} Jobs`;

  return (
    <Canvas>
      <Container className="space-y-6 pt-10 pb-8">
        <div className="space-y-3 text-center">
          <Heading variant="display" align="center">
            {heading}
          </Heading>
          <Text tone="muted" align="center">
            {count} remote {role.toLowerCase()} roles, all at fully remote,
            VC-backed startups from seed to series C. Matcha reads every job
            description daily and sends you one zero noise email with only the
            roles that really fit. No scrolling, no noise.
            {region ? ` Open to candidates in ${region}.` : null}
          </Text>
          <div>
            <Pill>
              <WheatIcon />
              <span>10k+ under the radar remote startups · 1 zero noise email</span>
              <WheatIcon flipped />
            </Pill>
          </div>
        </div>
        <RoleComposer
          title="Describe your next role, cut the noise"
          placeholder={`Fully remote ${role.toLowerCase()}...`}
          animate={false}
        />
        <Text size="caption" tone="subtle" align="center">
          {count} open roles · {fresh} new this week · 80% not on LinkedIn · $163K
          avg pay
        </Text>
        <JobList jobs={jobs} />
        <ContentFooter />
      </Container>
    </Canvas>
  );
}
