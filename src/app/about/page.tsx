import type { Metadata } from "next";
import { ContentFooter } from "@/components/content-footer";
import { ButtonLink, Container, Heading, Stack, Text } from "@/components/ui";

export const metadata: Metadata = {
  title: "About Matcha | A Job Search Agent That Actually Works",
};

export default function AboutPage() {
  return (
    <Container>
      <Heading>About Matcha</Heading>
      <Stack className="mt-4 leading-body">
        <Text>
          Hi 👋 my name is Fico and I&apos;m the founder of Matcha. I&apos;m a
          Canadian founder, previously founding engineer at Roger.ai, where I
          helped build it from 0 to $5B in transaction volume and an acquisition
          to NYSE:CPAY. I got that job by manually doing what Matcha does now,
          then reaching out to the founder with a one liner about who I am and
          what I built before. I was employee #2.
        </Text>
        <Text>
          Fast forward a few years, my brother was looking to relocate from
          Vancouver, Canada to Europe and was looking for a remote job.
        </Text>
        <Text>
          I was shocked by how tedious, manual and frankly discouraging the job
          search experience was for remote jobs. He had to use LinkedIn and tens
          of different other job boards, and even then he was missing so many
          roles. It was messy, overwhelming. He would give up for months, stop
          applying. It was tough! And he&apos;s a very talented engineer.
        </Text>
        <Text>
          So I decided to build a tool that aggregates all the remote startup
          roles out there, even the ones on a Google Doc or a Notion document
          somewhere, not posted anywhere (as long as the startup was legit).
        </Text>
        <Text>
          It worked super well, he got his dream job. It&apos;s expensive to run
          for one person, so I decided to open it up to more people. The
          feedback has been overwhelmingly good, people have sent me so many
          messages thanking me for this tool (really!). I honestly did not know
          it was going to get so much love.
        </Text>
        <Text>
          Ahh, and why Matcha? Because I like matcha tea :D It has this calm,
          zen feel about it, and it&apos;s a nice pun with matching, which is
          what it does. Why .fm? That&apos;s the domain name of Micronesia,
          beautiful islands, and since this is about working remotely from
          beautiful places, it fits perfectly.
        </Text>
        <Text>Voila, that&apos;s the story of Matcha.</Text>
        <Heading as="h2" variant="section" className="pt-2">
          How it works
        </Heading>
        <Text>
          Matcha is a job search agent that actually works. There is so much
          noise around job search, especially remote. It&apos;s not always clear
          if the job is remote, where you can work remotely from, what the
          requirements are, if the company is legit and well funded, what the
          track record of the founders is, what the culture of the company is
          like.
        </Text>
        <Text>
          And these roles are not on LinkedIn, they&apos;re scattered around a
          few job boards. There are so many new job boards out there that we got
          to a job board fatigue. It is very messy and hard to keep track of
          everything.
        </Text>
        <Text>
          That is what Matcha is solving: a zero-noise alternative to job
          boards. We check all the promising remote job boards out there, and
          all remote startups and scaleups, so you don&apos;t have to, and we
          send you an email with the best roles for you.
        </Text>
        <Text>
          Matcha understands you and what you are looking for, and there is no
          limit to what you can be picky about.
        </Text>
        <Text>
          One customer had already seen a job Matcha sent them, but kind of
          skipped it because it didn&apos;t seem too interesting. Then they
          received an email from Matcha about it, with a short one liner about
          why it would be a good fit. They applied where they would otherwise
          have skipped, and got the job. This is the reason Matcha has no UI:
          it&apos;s just an email nudging you about the roles that make sense
          for you, and why.
        </Text>
        <Text>5 min a day vs. hours of mess.</Text>
        <Heading as="h2" variant="section" className="pt-2">
          Is Matcha paid?
        </Heading>
        <Text>
          Yes, Matcha is paid. I mean, it&apos;s free to get a preview and a few
          matches every week to see the power of it. But ultimately it has to be
          paid to stay candidate first. The minute Matcha becomes free, it
          becomes like every other job board out there that is noisy: it gets
          paid by the company to push the company&apos;s jobs to everyone, even
          people where it&apos;s not a good fit. It&apos;s really simple.
          Someone has to pay for a service, and the side that pays has priority.
          Matcha decides to prioritize candidates, because nobody else is.
          It&apos;s still affordable, and this support keeps it focused on
          giving candidates the best possible job search experience.
        </Text>
        <Heading as="h2" variant="section" className="pt-2">
          Does it auto-apply?
        </Heading>
        <Text>
          Nope. If you get a handful of roles where you&apos;ll actually land an
          interview because it&apos;s such a good fit, then there&apos;s no need
          to auto-apply. Applying to 3 roles takes 15 min tops. It&apos;s when
          you can&apos;t cut through the noise and have to apply everywhere that
          auto-apply makes sense. With Matcha, that&apos;s not the case.
        </Text>
        <Text>
          And to be even more effective, take those handful of really good
          matches and reach out directly to the founders. Some candidates use
          LinkedIn, others use outreach apps like Hunter to get founders&apos;
          emails and send a one line email to get their attention. Yes, it&apos;s
          noisy for recruiters and founders too, and if you can cut through
          their noise too, you&apos;ll get the interview.
        </Text>
        <div className="pt-2">
          <ButtonLink href="/">Try matcha</ButtonLink>
        </div>
      </Stack>
      <ContentFooter />
    </Container>
  );
}
