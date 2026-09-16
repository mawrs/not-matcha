"use client";

import { useEffect, useState } from "react";
import { Container, Heading, Pill, Text } from "@/components/ui";
import { quotes } from "@/lib/data";
import { WheatIcon } from "./icons";
import { RoleComposer } from "./role-composer";

const stats = [
  { value: "80%", label: "not on LinkedIn" },
  { value: "$160K", label: "average pay" },
  { value: "1–300", label: "team size range" },
  { value: "Top VC", label: "backing" },
];

export function HomeHero() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % quotes.length);
        setVisible(true);
      }, 500);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative my-2 sm:my-hero">
      <div className="mb-8 space-y-4 text-center">
        <Heading variant="display">
          Remote startup roles
          <br className="sm:hidden" /> in your inbox
        </Heading>
        <Text tone="muted" align="center" className="max-w-lead mx-auto lg:text-body-lg">
          Matcha reads all job descriptions to surface the handful that actually
          matter in a zero noise email. Simple by design.
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
        <RoleComposer />
      </Container>
      <div className="mt-4 grid text-center">
        {quotes.map((quote, i) => (
          <Text
            key={quote}
            size="caption"
            tone="faint"
            className={`col-start-1 row-start-1 transition-opacity duration-fade ${
              i === index && visible ? "opacity-100" : "opacity-0"
            }`}
          >
            {quote}
          </Text>
        ))}
      </div>
      <div className="mt-6 pt-2">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-4">
          {stats.map((stat) => (
            <div key={stat.value} className="flex flex-col items-center">
              <Text as="span" size="body" weight="emphasis" tone="default" className="sm:text-body-lg">
                {stat.value}
              </Text>
              <Text as="span" size="caption" tone="faint" align="center" className="sm:text-body">
                {stat.label}
              </Text>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
