import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentFooter } from "@/components/content-footer";
import { JobList } from "@/components/job-list";
import { RoleComposer } from "@/components/role-composer";
import { Canvas, Container, Heading, Text } from "@/components/ui";
import { countries, jobCategories } from "@/lib/data";
import { countryLabel, listingsFor, resolveRole } from "@/lib/jobs";

export function generateStaticParams() {
  const titles = jobCategories.flatMap((c) => c.titles ?? []);
  const roles = [...jobCategories.map((c) => c.slug), ...titles.map((t) => t.slug)];
  return roles.flatMap((role) =>
    countries.map((country) => ({ role, region: country.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ role: string; region: string }>;
}): Promise<Metadata> {
  const { role, region } = await params;
  const resolved = resolveRole(role);
  const country = countryLabel(region);
  return {
    title:
      resolved && country
        ? `Remote ${resolved.label} Jobs in ${country} | Matcha`
        : "Remote Jobs | Matcha",
  };
}

export default async function RoleRegionJobsPage({
  params,
}: {
  params: Promise<{ role: string; region: string }>;
}) {
  const { role, region } = await params;
  const resolved = resolveRole(role);
  const country = countryLabel(region);
  if (!resolved || !country) notFound();
  const jobs = listingsFor(role, region);

  return (
    <Canvas>
      <Container>
        <Heading>
          Remote {resolved.label} Jobs in {country}
        </Heading>
        <Text tone="subtle" className="mt-2">
          {resolved.description} Open to candidates in {country}.
        </Text>
        <div className="mt-6">
          <RoleComposer
            title="Describe your next role, cut the noise"
            placeholder={`Remote ${resolved.label.toLowerCase()} in ${country}...`}
            animate={false}
          />
        </div>
        <div className="mt-8">
          <JobList jobs={jobs} />
        </div>
        <ContentFooter />
      </Container>
    </Canvas>
  );
}
