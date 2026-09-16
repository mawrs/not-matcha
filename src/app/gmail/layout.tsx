import { Roboto } from "next/font/google";
import type { ReactNode } from "react";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

export default function GmailLayout({ children }: { children: ReactNode }) {
  return <div className={`${roboto.variable} ${roboto.className} min-h-dvh`}>{children}</div>;
}
