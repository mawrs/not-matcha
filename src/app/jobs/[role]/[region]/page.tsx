import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RoleListing } from "@/components/role-listing";
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

  return (
    <RoleListing
      role={resolved.label}
      region={country}
      jobs={listingsFor(role, region)}
    />
  );
}
