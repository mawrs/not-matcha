"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Container, Heading, Text } from "@/components/ui";
import { testimonials } from "@/lib/data";
import { RoleComposer } from "./role-composer";

const cards = [
  {
    key: "stage",
    title: (
      <>
        Our typical company listing is{" "}
        <span className="whitespace-nowrap">Seed–Series B</span>
      </>
    ),
    body: "That's the sweet spot. We still list companies from 1 person up to around 300.",
  },
  {
    key: "linkedin",
    title: "80% of these roles never get posted on LinkedIn",
    body: "These startups aren't anti-LinkedIn. Most just post on Ashby, Greenhouse, YC Jobs, or their own career page.",
  },
];

const loopedTestimonials = [...testimonials, ...testimonials];
const scrollSpeed = 28;

function TestimonialCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const offsetRef = useRef(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const pause = () => {
      pausedRef.current = true;
    };
    const resume = () => {
      pausedRef.current = false;
    };
    el.addEventListener("pointerenter", pause);
    el.addEventListener("pointerleave", resume);

    let frame = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      const loop = el.scrollWidth / 2;
      if (loop > 0) {
        if (pausedRef.current) {
          offsetRef.current = el.scrollLeft % loop;
        } else {
          offsetRef.current += (scrollSpeed * dt) / 1000;
          if (offsetRef.current >= loop) offsetRef.current -= loop;
          el.scrollLeft = offsetRef.current;
        }
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointerenter", pause);
      el.removeEventListener("pointerleave", resume);
    };
  }, []);

  return (
    <div className="mt-footer mb-8">
      <Heading as="h3" variant="section" align="center">
        What our customers have said about us
      </Heading>
      <div className="relative [mask-image:linear-gradient(to_right,transparent,black_4rem,black_calc(100%-4rem),transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_4rem,black_calc(100%-4rem),transparent)]">
        <div
          ref={scrollerRef}
          onPointerEnter={() => {
            pausedRef.current = true;
          }}
          onPointerLeave={() => {
            pausedRef.current = false;
          }}
          className="flex gap-8 overflow-x-auto py-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {loopedTestimonials.map((person, i) => (
            <div
              key={`${person.name}-${i}`}
              className="flex w-[calc((100%-2rem)/1.5)] shrink-0 items-start gap-3"
            >
              <Image
                src={person.image}
                alt=""
                width={48}
                height={48}
                className="size-avatar-lg shrink-0 rounded-full object-cover"
              />
              <div className="min-w-0 text-left">
                <Text size="body" tone="muted">
                  “{person.quote}”
                </Text>
                <Text size="caption" tone="faint" className="mt-tight">
                  {person.name} · {person.role} · {person.location}
                </Text>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

type HomeHeroProps = {
  role?: string;
  region?: string;
};

export function HomeHero({ role, region }: HomeHeroProps) {
  const headline = role
    ? region
      ? `Remote ${role} roles in ${region}`
      : `Remote ${role} roles`
    : "Remote startup roles";

  return (
    <div className="relative my-2 sm:my-hero">
      <div className="mb-8 space-y-4 text-center">
        <Heading variant="display">
          {headline}
          <br className="sm:hidden" /> in your inbox
        </Heading>
        <Text tone="muted" align="center" className="max-w-lead mx-auto lg:text-body-lg">
          Matcha checks 10k+ remote startups and emails you the roles that fit.
          One zero noise email, not another job board.
        </Text>
      </div>
      <Container variant="composer">
        <RoleComposer
          placeholder={
            role
              ? region
                ? `Remote ${role.toLowerCase()} in ${region}...`
                : `Remote ${role.toLowerCase()} roles...`
              : undefined
          }
        />
      </Container>
      <div className="mt-6 pt-2">
        <div className="mx-auto grid max-w-copy grid-cols-1 gap-8 sm:grid-cols-2">
          {cards.map((card) => (
            <div key={card.key}>
              <Text size="body" weight="emphasis" tone="default">
                {card.title}
              </Text>
              <Text size="caption" tone="subtle" className="mt-nudge sm:text-body">
                {card.body}
              </Text>
            </div>
          ))}
        </div>
      </div>
      <TestimonialCarousel />
    </div>
  );
}
