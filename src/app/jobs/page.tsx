import type { Metadata } from "next";
import { ContentFooter } from "@/components/content-footer";
import { CountryLinks } from "@/components/country-links";
import { WheatIcon } from "@/components/icons";
import { RoleComposer } from "@/components/role-composer";
import {
  Canvas,
  Container,
  Heading,
  Pill,
  Stack,
  Text,
  TextLink,
} from "@/components/ui";
import { featuredCompanies, jobCategories } from "@/lib/data";

export const metadata: Metadata = {
  title: "Browse Remote Jobs by Role & Region | Matcha",
};

const faqs = [
  {
    q: "How is Matcha different from job boards?",
    a: "Job boards make you scroll through hundreds of irrelevant posts. Matcha flips this: you describe your ideal role once (title, tech stack, team size, dealbreakers) and Matcha reads every job description daily to surface the handful that actually fit, and sends you one zero noise email. No UI to check, no noise, just a single email when something real shows up. Unlike job boards with their fixed filter sets, Matcha uses plain-language descriptions to match against full job descriptions, so you can filter by anything, something no dropdown could ever capture.",
  },
  {
    q: "How does it work?",
    a: "You describe what you're looking for in plain language: role, tech stack, team size, things you don't want. Every day, Matcha scans thousands of new remote startup job postings and compares each description against your preferences. Roles that match land in your inbox in a single, zero-noise email within hours of being posted.",
  },
  {
    q: "How fresh are the listings?",
    a: "Roles are added as soon as they are posted. About 80% of them never appear on LinkedIn.",
  },
  {
    q: "How complete is the index?",
    a: "Yes, all public jobs are covered: workatastartup (YC jobs), Ashby, Greenhouse, and more. Matcha also tracks under-the-radar startups individually, including roles that are not listed anywhere else.",
  },
  {
    q: "Who built Matcha?",
    a: "Matcha was built by Fico, a Canadian repeat founder who has spent over a decade building and working at fully distributed startups. He was on the founding team of Roger.ai, a fully distributed startup he helped grow from zero to $5 billion in transaction volume and millions in ARR before it was acquired by NYSE:CPAY, where he served as VP of Engineering for four years, fully remote. Fico has a deep network of remote-first founders and understands this space firsthand.",
  },
  {
    q: "Why did Fico build Matcha?",
    a: "While looking for a new startup to join, Fico found the experience exhausting: noisy job boards, limited filters, and no way to specify what actually mattered to him. Nothing let him filter the way he wanted. So he built it for himself, shared it with friends, and after seeing how much they loved it, opened it up. The goal: stay open to the right opportunity without the daily grind of checking boards or wading through noise. It takes two minutes over coffee instead of hours.",
  },
];

export default function JobsPage() {
  return (
    <Canvas>
      <Container variant="wide">
        <div className="relative my-2 sm:my-hero">
          <div className="mb-8 space-y-4 text-center">
            <Heading variant="display">14220 Fully Remote Jobs at Startups</Heading>
            <Text tone="muted" align="center" className="max-w-lead mx-auto lg:text-body-lg">
              Matcha is a zero noise alternative to job boards. Matcha reads all
              job descriptions every day to surface the handful that actually
              matter in a zero noise email, as soon as they are posted. Simple
              by design.
            </Text>
          </div>
          <div className="mb-8 text-center">
            <Pill>
              <WheatIcon />
              <span>
                10k+ under the radar remote startups
                <span className="hidden sm:inline"> · </span>
                <br className="sm:hidden" />
                1 zero noise email
              </span>
              <WheatIcon flipped />
            </Pill>
          </div>
          <Container variant="composer">
            <RoleComposer
              title="Describe your next role, cut the noise"
              placeholder="Fully remote startup roles..."
              animate={false}
            />
          </Container>
          <Text size="caption" tone="faint" align="center" className="mt-4">
            14220 open jobs · 1715 jobs this week · 80% not on LinkedIn · $163K
            average pay
          </Text>
        </div>

        <Stack gap="12" className="pb-8">
          {jobCategories.map((category) => (
            <section key={category.slug}>
              <Heading as="h2" variant="section" className="mb-1">
                <TextLink href={`/jobs/${category.slug}`}>
                  {["junior", "new-grad", "internship"].includes(category.slug)
                    ? `${category.label} remote jobs`
                    : `Remote ${category.label} Jobs`}
                </TextLink>
              </Heading>
              <Text tone="subtle" className="mb-3">
                {category.description}
              </Text>
              <CountryLinks role={category.slug} />
              {category.titles && (
                <div className="mt-5">
                  <Heading as="h3" variant="kicker" className="mb-2 normal-case tracking-normal text-fg-subtle">
                    By job title
                  </Heading>
                  <Stack>
                    {category.titles.map((title) => (
                      <div key={title.slug}>
                        <Heading as="h4" variant="section" className="mb-1.5 text-body font-label">
                          <TextLink href={`/jobs/${title.slug}`} variant="title">
                            Remote {title.label} Jobs
                          </TextLink>
                        </Heading>
                        <CountryLinks role={title.slug} />
                      </div>
                    ))}
                  </Stack>
                </div>
              )}
            </section>
          ))}

          <section>
            <Heading as="h2" variant="section" className="mb-1">
              <TextLink href="/new-job">Featured jobs</TextLink>
            </Heading>
            <Text tone="subtle" className="mb-3">
              Hand-picked remote roles from well-funded startups, posted today.
            </Text>
          </section>

          <section>
            <Heading as="h2" variant="section" className="mb-1">
              Startup collections
            </Heading>
            <Text tone="subtle" className="mb-3">
              Curated lists of startups hiring fully remote, grouped by what
              their founders have in common.
            </Text>
            <TextLink href="/collections/carnegie-mellon-alumni-startups" variant="title">
              Carnegie Mellon Founders Hiring Now
            </TextLink>
          </section>

          <section>
            <Heading as="h2" variant="section" className="mb-1">
              <TextLink href="/companies">
                Remote first fully distributed startups, scaleups and tech
                companies
              </TextLink>
            </Heading>
            <Text tone="subtle" className="mb-3">
              Every company Matcha pulls remote jobs from, with funding,
              investors, team size, and the regions each one hires in. Updated
              daily.
            </Text>
          </section>

          <section>
            <Heading as="h2" variant="section" className="mb-3 text-body-lg font-emphasis">
              Featured remote companies
            </Heading>
            <ul className="m-0 list-none space-y-3 p-0">
              {featuredCompanies.map((company) => (
                <li key={company.slug}>
                  <TextLink href={`/companies/${company.slug}`} variant="title" className="text-body">
                    {company.name}: remote jobs, culture and where they hire
                  </TextLink>
                  <Text tone="subtle">{company.blurb}</Text>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <Heading as="h2" variant="section" className="mb-3 text-body-lg font-emphasis">
              About Matcha
            </Heading>
            <Text tone="subtle" className="max-w-lead">
              Matcha is a zero-noise alternative to job boards for remote
              startup jobs. Instead of scrolling through hundreds of irrelevant
              postings, you describe your next role once and Matcha reads every
              job description daily to surface only the roles that actually fit.
              Matches arrive in a single email, as soon as a relevant role is
              posted. No UI to check, no notifications, no noise. Because Matcha
              reads full job descriptions in plain language, there is no limit
              to what you can filter by: not just the usual dropdowns, but
              anything you can put into words.
            </Text>
            <Text tone="subtle" className="mt-3 max-w-lead">
              Matcha surfaces fully remote jobs at startups from seed to series
              A, series B, etc. typically backed by top-tier VCs like a16z,
              Index Ventures, Y Combinator, Google Ventures, Sequoia, Accel,
              Khosla Ventures, etc. Roles span software engineering, design,
              marketing, sales, and more. Open to candidates in Europe, the US,
              Canada, the UK, Brazil, Latam, APAC, and worldwide.
            </Text>
          </section>

          <section>
            <Heading as="h2" variant="section" className="mb-5 text-body-lg font-emphasis">
              Frequently asked questions
            </Heading>
            <div className="max-w-lead divide-y divide-border border-y border-border">
              {faqs.map((faq) => (
                <details key={faq.q} className="group py-4">
                  <summary className="cursor-pointer list-none">
                    <Text as="span" weight="label" tone="default">
                      {faq.q}
                    </Text>
                  </summary>
                  <Text tone="subtle" className="mt-2">
                    {faq.a}
                  </Text>
                </details>
              ))}
            </div>
          </section>
        </Stack>
        <ContentFooter />
      </Container>
    </Canvas>
  );
}
