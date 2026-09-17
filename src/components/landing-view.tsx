import { HomeFooter } from "@/components/home-footer";
import { HomeHero } from "@/components/home-hero";
import { Container } from "@/components/ui";

type Props = {
  role?: string;
  region?: string;
};

export function LandingView({ role, region }: Props) {
  return (
    <Container variant="home">
      <HomeHero role={role} region={region} />
      <HomeFooter />
    </Container>
  );
}
