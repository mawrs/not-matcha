import type { Metadata } from "next";
import { ContentFooter } from "@/components/content-footer";
import { Container, Heading, Text, TextLink } from "@/components/ui";
import { featuredCompanies } from "@/lib/data";

export const metadata: Metadata = {
  title: "Remote First Companies Hiring | Matcha",
};

export default function CompaniesPage() {
  return (
    <Container>
      <Heading>
        Remote first fully distributed startups, scaleups and tech companies
      </Heading>
      <Text tone="subtle" className="mt-3">
        Every company Matcha pulls remote jobs from, with funding, investors,
        team size, and the regions each one hires in. Updated daily.
      </Text>
      <ul className="mt-8 space-y-5">
        {featuredCompanies.map((company) => (
          <li key={company.slug}>
            <TextLink href={`/companies/${company.slug}`} variant="title" className="text-body">
              {company.name}: remote jobs, culture and where they hire
            </TextLink>
            <Text tone="subtle">{company.blurb}</Text>
          </li>
        ))}
      </ul>
      <ContentFooter />
    </Container>
  );
}
