import type { Metadata } from "next";
import { ContentFooter } from "@/components/content-footer";
import { Container, Heading, Stack, Text } from "@/components/ui";

export const metadata: Metadata = {
  title: "Privacy Policy | Matcha",
};

export default function PrivacyPage() {
  return (
    <Container>
      <Heading>Privacy Policy</Heading>
      <Text tone="subtle" className="mt-2">
        Last updated: August 6, 2026
      </Text>
      <Stack className="mt-4 leading-body">
        <Heading as="h2" variant="section" className="pt-2">
          Who we are
        </Heading>
        <Text>
          Matcha (matcha.fm) is a job matching service that finds remote roles
          and sends you the ones that fit you by email. If you have any
          questions about this policy or your data, contact us at
          fico@matcha.fm.
        </Text>
        <Heading as="h2" variant="section" className="pt-2">
          What we collect
        </Heading>
        <Text>
          We collect your email address and name when you sign in, and the job
          preferences you share with us so we can match you with roles. We also
          collect basic usage data such as your IP address, browser type, and
          the pages you visit, through analytics tools.
        </Text>
        <Heading as="h2" variant="section" className="pt-2">
          How we use your data
        </Heading>
        <Text>
          We use your data to match you with jobs and send you match emails, to
          operate and improve the service, and to process payments if you are on
          a paid plan.
        </Text>
        <Heading as="h2" variant="section" className="pt-2">
          Sharing
        </Heading>
        <Text>
          We share data only with the service providers that run the product,
          such as hosting, sign-in, payments, analytics, and email delivery. We
          do not sell your personal data.
        </Text>
        <Heading as="h2" variant="section" className="pt-2">
          Emails
        </Heading>
        <Text>
          We send you job match emails and account emails. Every email includes
          an unsubscribe link.
        </Text>
        <Heading as="h2" variant="section" className="pt-2">
          Retention and deletion
        </Heading>
        <Text>
          We keep your data while your account is active. You can ask us to
          delete your data at any time by emailing fico@matcha.fm.
        </Text>
        <Heading as="h2" variant="section" className="pt-2">
          Changes to this policy
        </Heading>
        <Text>
          We may update this policy from time to time. The date at the top
          reflects the latest version.
        </Text>
      </Stack>
      <ContentFooter />
    </Container>
  );
}
