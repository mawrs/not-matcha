import type { Metadata } from "next";
import { ContentFooter } from "@/components/content-footer";
import { JobList } from "@/components/job-list";
import { RoleComposer } from "@/components/role-composer";
import { Container, Heading, Text } from "@/components/ui";
import { sampleJobs } from "@/lib/data";

export const metadata: Metadata = {
  title: "Featured Remote Jobs | Matcha",
};

export default function FeaturedJobsPage() {
  return (
    <Container>
      <Heading>Featured jobs</Heading>
      <Text tone="subtle" className="mt-2">
        Hand-picked remote roles from well-funded startups, posted today.
      </Text>
      <div className="mt-6">
        <RoleComposer
          title="Describe your next role, cut the noise"
          placeholder="Fully remote startup roles..."
          animate={false}
        />
      </div>
      <div className="mt-8">
        <JobList jobs={sampleJobs} />
      </div>
      <ContentFooter />
    </Container>
  );
}
