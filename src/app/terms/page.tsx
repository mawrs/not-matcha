import type { Metadata } from "next";
import { ContentFooter } from "@/components/content-footer";
import { Container, Heading, Stack, Text } from "@/components/ui";

export const metadata: Metadata = {
  title: "Terms of Service | Matcha",
};

export default function TermsPage() {
  return (
    <Container>
      <Heading>Terms of Service</Heading>
      <Text tone="subtle" className="mt-2">
        Last updated: August 6, 2026
      </Text>
      <Stack className="mt-4 leading-body">
        <Heading as="h2" variant="section" className="pt-2">
          Acceptance
        </Heading>
        <Text>
          By using Matcha (matcha.fm), you agree to these terms. If you do not
          agree, please do not use the service.
        </Text>
        <Heading as="h2" variant="section" className="pt-2">
          The service
        </Heading>
        <Text>
          Matcha finds job listings and emails you the ones that match your
          preferences. Listings come from third parties. We do our best to keep
          them accurate and current, but we do not guarantee their accuracy or
          availability, and we do not guarantee any job outcome.
        </Text>
        <Heading as="h2" variant="section" className="pt-2">
          Accounts
        </Heading>
        <Text>
          Provide accurate information when you sign up, and keep your account
          secure. You are responsible for activity that happens on your account.
        </Text>
        <Heading as="h2" variant="section" className="pt-2">
          Subscriptions and billing
        </Heading>
        <Text>
          Paid plans renew automatically until cancelled. You can cancel at any
          time. We offer a 30-day money-back guarantee: if you are not happy
          with your purchase, email fico@matcha.fm within 30 days of your first
          purchase for a full refund.
        </Text>
        <Heading as="h2" variant="section" className="pt-2">
          Acceptable use
        </Heading>
        <Text>
          Use Matcha for lawful purposes only. Do not scrape the site, resell
          our data, or disrupt the service. We may suspend or terminate accounts
          that violate these terms.
        </Text>
        <Heading as="h2" variant="section" className="pt-2">
          Our content
        </Heading>
        <Text>
          The site and its content belong to Matcha. Do not copy or redistribute
          them without permission.
        </Text>
        <Heading as="h2" variant="section" className="pt-2">
          Disclaimer
        </Heading>
        <Text>
          The service is provided as is, without warranties of any kind. We do
          not guarantee uninterrupted access.
        </Text>
        <Heading as="h2" variant="section" className="pt-2">
          Limitation of liability
        </Heading>
        <Text>
          To the maximum extent permitted by law, our total liability for any
          claim is limited to the fees you paid us in the 12 months before the
          claim.
        </Text>
        <Heading as="h2" variant="section" className="pt-2">
          Changes to these terms
        </Heading>
        <Text>
          We may update these terms from time to time. The date at the top
          reflects the latest version. Continued use of the service after
          changes take effect means you accept the updated terms.
        </Text>
        <Heading as="h2" variant="section" className="pt-2">
          Contact
        </Heading>
        <Text>Questions? Email fico@matcha.fm.</Text>
      </Stack>
      <ContentFooter />
    </Container>
  );
}
