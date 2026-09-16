import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Matcha Affiliate Program | Earn 50% on every referral",
};

export default function AffiliatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
