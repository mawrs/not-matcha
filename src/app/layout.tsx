import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { AppShell } from "@/components/app-shell";
import "./globals.css";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Matcha — Remote Startup Roles, In Your Inbox",
  description:
    "Matcha is a zero noise alternative to job search. Scans 10k+ remote well-funded remote startups daily to surface the handful that matter.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jetbrains.variable}>
      <body className={`${jetbrains.className} bg-noise min-h-screen bg-surface text-fg`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
