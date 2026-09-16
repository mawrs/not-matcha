import type { Metadata } from "next";
import { ContentFooter } from "@/components/content-footer";
import { ButtonLink, Container, Heading, Stack, Text } from "@/components/ui";

export const metadata: Metadata = {
  title: "Careers | Matcha",
};

export default function CareersPage() {
  return (
    <Container>
      <Heading>Careers</Heading>
      <Stack className="mt-4 leading-body">
        <Text>
          Matcha is a tiny, fully remote team. There are no open roles right
          now.
        </Text>
        <Text>
          If you want to work at a remote startup, describe your ideal role on
          the homepage. That is the product.
        </Text>
        <div className="pt-2">
          <ButtonLink href="/">Try matcha</ButtonLink>
        </div>
      </Stack>
      <ContentFooter />
    </Container>
  );
}
