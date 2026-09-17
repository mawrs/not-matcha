import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RoleListing } from "@/components/role-listing";
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

  return <RoleListing role={resolved.label} jobs={listingsFor(role)} />;
}
