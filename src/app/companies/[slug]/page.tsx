import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentFooter } from "@/components/content-footer";
import { JobList } from "@/components/job-list";
import { Container, Heading, Text, TextLink } from "@/components/ui";
import { featuredCompanies, getCategory, jobCategories, sampleJobs } from "@/lib/data";

export function generateStaticParams() {
  return [
    ...featuredCompanies.map((c) => ({ slug: c.slug })),
    ...jobCategories.map((c) => ({ slug: c.slug })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const company = featuredCompanies.find((c) => c.slug === slug);
  const category = getCategory(slug);
  if (company) return { title: `${company.name}: remote jobs | Matcha` };
  if (category)
    return { title: `Companies Hiring ${category.label}s | Matcha` };
  return { title: "Companies | Matcha" };
}

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const company = featuredCompanies.find((c) => c.slug === slug);
  const category = getCategory(slug);

  if (company) {
    const jobs = sampleJobs.filter((j) => j.companySlug === slug);
    return (
      <Container>
        <Heading>
          {company.name}: remote jobs, culture and where they hire
        </Heading>
        <Text className="mt-3">{company.blurb}</Text>
        <Heading as="h2" variant="section" className="mt-8">
          Open roles
        </Heading>
        <div className="mt-4">
          <JobList jobs={jobs} />
        </div>
        <ContentFooter />
      </Container>
    );
  }

  if (category) {
    const jobs = sampleJobs.filter((j) => j.category === slug);
    const companies = featuredCompanies.filter((c) =>
      jobs.some((j) => j.companySlug === c.slug),
    );
    return (
      <Container>
        <Heading>Companies Hiring {category.label}s</Heading>
        <Text tone="subtle" className="mt-3">
          {category.description}
        </Text>
        <ul className="mt-8 space-y-4">
          {(companies.length ? companies : featuredCompanies.slice(0, 6)).map(
            (c) => (
              <li key={c.slug}>
                <TextLink href={`/companies/${c.slug}`} variant="title" className="text-body">
                  {c.name}
                </TextLink>
                <Text tone="subtle">{c.blurb}</Text>
              </li>
            ),
          )}
        </ul>
        <ContentFooter />
      </Container>
    );
  }

  notFound();
}
