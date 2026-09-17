"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LandingView } from "@/components/landing-view";
import { Preferences } from "@/components/preferences";
import { useLogin } from "@/components/login-context";

export default function Home() {
  const { signedIn } = useLogin();
  const router = useRouter();

  useEffect(() => {
    if (signedIn) router.replace("/preferences");
  }, [signedIn, router]);

  if (signedIn) return <Preferences />;

  return <LandingView />;
}
