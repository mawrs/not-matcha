"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { HomeFooter } from "@/components/home-footer";
import { HomeHero } from "@/components/home-hero";
import { Preferences } from "@/components/preferences";
import { useLogin } from "@/components/login-context";
import { Container } from "@/components/ui";

export default function PreferencesPage() {
  const { signedIn } = useLogin();
  const router = useRouter();

  useEffect(() => {
    if (!signedIn) router.replace("/");
  }, [signedIn, router]);

  if (!signedIn) {
    return (
      <Container variant="home">
        <HomeHero />
        <HomeFooter />
      </Container>
    );
  }

  return <Preferences />;
}
