"use client";

import Image from "next/image";
import { ContentFooter } from "@/components/content-footer";
import { useLogin } from "@/components/login-context";
import { Button, Container, Heading, Stack, Text } from "@/components/ui";

const linkedinShots = ["in_1", "in_2", "in_4", "in_5"];
const emailShots = ["4", "2", "3", "1"];

export default function AffiliatesPage() {
  const { setOpen } = useLogin();

  return (
    <Container variant="proseLoose">
      <Heading variant="affiliate">Get paid to fix job search</Heading>
      <Text size="body-lg" tone="body" className="mt-3">
        Earn 50% on every customer you refer to Matcha, including recurring
        subscriptions, month after month.
      </Text>
      <div className="mt-5">
        <Button variant="brand" onClick={() => setOpen(true)}>
          Become an affiliate, earn 50%
        </Button>
      </div>
      <Stack className="mt-6 leading-body">
        <Heading as="h2" variant="section">
          What Matcha does
        </Heading>
        <Text>
          Matcha is a job search agent for remote roles. You tell it what you
          are looking for in a sentence or two. It checks all the promising
          remote job boards and startup career pages so you don&apos;t have to,
          and emails you the few roles that really fit, with a line on why. Free
          to try, paid to keep it candidate first.
        </Text>
        <Text>So far users really love it.</Text>
      </Stack>
      <div className="mt-6">
        <Heading as="h2" variant="section">
          What users love
        </Heading>
        <ul className="mt-3 space-y-3">
          <Text as="li">
            <Text as="span" tone="default" weight="emphasis">
              It&apos;s simple.
            </Text>{" "}
            You describe what you want in plain words. That&apos;s the whole
            setup. No filters, no profile to maintain.
          </Text>
          <Text as="li">
            <Text as="span" tone="default" weight="emphasis">
              It surfaces roles they totally missed.
            </Text>{" "}
            Matcha checks all the remote job boards and startup career pages,
            including roles that never make it to LinkedIn. People keep telling
            us they would never have found these otherwise.
          </Text>
          <Text as="li">
            <Text as="span" tone="default" weight="emphasis">
              No dashboard to keep checking.
            </Text>{" "}
            Roles come to you by email, on a calm rhythm, with a short line on
            why each one fits. It nudges you to stay on top and actually apply.
          </Text>
          <Text as="li">
            <Text as="span" tone="default" weight="emphasis">
              You can chat with the founder anytime.
            </Text>{" "}
            Reply to any email and Fico answers. Questions about a role, your
            search, your profile, anything.
          </Text>
          <Text as="li">
            <Text as="span" tone="default" weight="emphasis">
              It works with agents.
            </Text>{" "}
            Some people plug Matcha into their own AI agents and automate their
            job search end to end.
          </Text>
        </ul>
      </div>
      <div className="mt-8">
        <Heading as="h2" variant="section">
          In their words
        </Heading>
        <div className="mt-3 grid grid-cols-1 items-start gap-3 sm:grid-cols-2">
          {linkedinShots.map((name) => (
            <Image
              key={name}
              src={`/testimonials/${name}.png`}
              alt="LinkedIn message from a Matcha user"
              width={806}
              height={250}
              className="h-auto w-full rounded-card border border-border-strong"
            />
          ))}
        </div>
        <div className="mt-3 grid grid-cols-1 items-start gap-3 sm:grid-cols-2">
          {emailShots.map((name) => (
            <Image
              key={name}
              src={`/testimonials/${name}.png`}
              alt="Email from a Matcha user"
              width={1000}
              height={560}
              className="h-auto w-full rounded-card border border-border-strong"
            />
          ))}
        </div>
      </div>
      <div className="mt-10">
        <Button variant="brand" onClick={() => setOpen(true)}>
          Become an affiliate, earn 50%
        </Button>
      </div>
      <ContentFooter />
    </Container>
  );
}
