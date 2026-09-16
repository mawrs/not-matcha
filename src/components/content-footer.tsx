import { Container, Heading, TextLink } from "@/components/ui";
import { jobCategories } from "@/lib/data";

const companyLinks = [
  { href: "/companies", label: "All Companies Hiring Remotely" },
  { href: "/companies/software-engineer", label: "Companies Hiring Software Engineers" },
  { href: "/companies/product-designer", label: "Companies Hiring Product Designers" },
  { href: "/companies/marketing", label: "Companies Hiring Marketers" },
  { href: "/companies/sales", label: "Companies Hiring Salespeople" },
  { href: "/companies/customer-support", label: "Companies Hiring Customer Support" },
];

const matchaLinks = [
  { href: "/about", label: "About" },
  { href: "/careers", label: "Careers" },
  { href: "/affiliates", label: "Affiliates" },
  { href: "/blog", label: "Blog" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <section>
      <Heading as="h3" variant="kicker" className="mb-2">
        {title}
      </Heading>
      <ul className="space-y-1">
        {links.map((link) => (
          <li key={link.href}>
            <TextLink href={link.href} variant="faint">
              {link.label}
            </TextLink>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ContentFooter() {
  const jobLinks = [
    { href: "/jobs", label: "All Remote Jobs" },
    ...jobCategories
      .filter((c) => c.slug !== "junior")
      .map((c) => ({
        href: `/jobs/${c.slug}`,
        label: `Remote ${c.label} Jobs`,
      })),
    {
      href: "/collections/carnegie-mellon-alumni-startups",
      label: "Carnegie Mellon Founders Hiring Now",
    },
  ];

  return (
    <div className="mt-10">
      <footer className="relative left-1/2 w-screen -translate-x-1/2 border-t border-border">
        <Container
          variant="site"
          className="grid grid-cols-1 gap-8 pt-6 pb-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12"
        >
          <FooterColumn title="Remote jobs" links={jobLinks} />
          <FooterColumn title="Companies hiring remotely" links={companyLinks} />
          <FooterColumn title="Matcha" links={matchaLinks} />
        </Container>
      </footer>
    </div>
  );
}
