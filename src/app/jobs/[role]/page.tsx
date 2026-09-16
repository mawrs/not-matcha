import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentFooter } from "@/components/content-footer";
import { CountryLinks } from "@/components/country-links";
import { JobList } from "@/components/job-list";
import { RoleComposer } from "@/components/role-composer";
import { Canvas, Container, Heading, Text } from "@/components/ui";
import { jobCategories } from "@/lib/data";
import { listingsFor, resolveRole } from "@/lib/jobs";

export function generateStaticParams() {
  const titles = jobCategories.flatMap((c) => c.titles ?? []);
  return [
    ...jobCategories.map((c) => ({ role: c.slug })),
    ...titles.map((t) => ({ role: t.slug })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ role: string }>;
}): Promise<Metadata> {
  const { role } = await params;
  const resolved = resolveRole(role);
  return {
    title: resolved
      ? `Remote ${resolved.label} Jobs | Matcha`
      : "Remote Jobs | Matcha",
  };
}

export default async function RoleJobsPage({
  params,
}: {
  params: Promise<{ role: string }>;
}) {
  const { role } = await params;
  const resolved = resolveRole(role);
  if (!resolved) notFound();
  const jobs = listingsFor(role);

  return (
    <Canvas>
      <Container>
        <Heading>Remote {resolved.label} Jobs</Heading>
        <Text tone="subtle" className="mt-2">
          {resolved.description}
        </Text>
        <div className="mt-6">
          <RoleComposer
            title="Describe your next role, cut the noise"
            placeholder={`Remote ${resolved.label.toLowerCase()} roles...`}
            animate={false}
          />
        </div>
        <div className="mt-6">
          <CountryLinks role={role} />
        </div>
        <div className="mt-8">
          <JobList jobs={jobs} />
        </div>
        <ContentFooter />
      </Container>
    </Canvas>
  );
}
