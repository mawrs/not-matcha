import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentFooter } from "@/components/content-footer";
import { Container, Heading, Text, TextLink } from "@/components/ui";
import { featuredCompanies } from "@/lib/data";

const collections = [
  {
    slug: "carnegie-mellon-alumni-startups",
    title: "Carnegie Mellon Founders Hiring Now",
    description:
      "Curated list of startups hiring fully remote, grouped by founders who came out of Carnegie Mellon.",
  },
];

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = collections.find((c) => c.slug === slug);
  return { title: collection ? `${collection.title} | Matcha` : "Collections | Matcha" };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = collections.find((c) => c.slug === slug);
  if (!collection) notFound();

  return (
    <Container>
      <Heading>{collection.title}</Heading>
      <Text tone="subtle" className="mt-3">
        {collection.description}
      </Text>
      <ul className="mt-8 space-y-4">
        {featuredCompanies.slice(0, 8).map((company) => (
          <li key={company.slug}>
            <TextLink href={`/companies/${company.slug}`} variant="title" className="text-body">
              {company.name}
            </TextLink>
            <Text tone="subtle">{company.blurb}</Text>
          </li>
        ))}
      </ul>
      <ContentFooter />
    </Container>
  );
}
