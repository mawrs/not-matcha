"use client";

import Image from "next/image";
import { Button, Cluster, Heading, Modal } from "@/components/ui";
import { loveCount, loveEmails, loveLinkedIn } from "@/lib/data";

export function LovedByModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal size="wide" overlay="overlay-strong" showClose={false} onClose={onClose}>
      <Cluster justify="between" className="mb-stack">
        <Heading as="h2" variant="section">
          Loved by {loveCount} remote talent ❤️
        </Heading>
        <Button variant="iconQuiet" onClick={onClose} aria-label="Close">
          ×
        </Button>
      </Cluster>
      <div className="mb-rule grid grid-cols-2 items-start gap-rule">
        {loveLinkedIn.map((item) => (
          <Image
            key={item.src}
            src={item.src}
            alt={item.alt}
            width={806}
            height={250}
            className="h-auto w-full rounded-card border border-border-strong"
          />
        ))}
      </div>
      <div className="grid grid-cols-2 items-start gap-rule">
        {loveEmails.map((item) => (
          <Image
            key={item.src}
            src={item.src}
            alt={item.alt}
            width={1000}
            height={560}
            className="h-auto w-full rounded-card border border-border-strong"
          />
        ))}
      </div>
    </Modal>
  );
}
