import { TextLink } from "@/components/ui";
import { homeFooterPrimary, homeFooterSecondary } from "@/lib/data";

function FooterLinks({
  links,
}: {
  links: { href: string; label: string }[];
}) {
  return (
    <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1.5">
      {links.map((link) => (
        <li key={link.href}>
          <TextLink href={link.href}>{link.label}</TextLink>
        </li>
      ))}
    </ul>
  );
}

export function HomeFooter() {
  return (
    <footer className="mt-footer space-y-3 border-t border-border pt-6 pb-8 text-caption text-fg-faint sm:mt-footer-lg">
      <FooterLinks links={homeFooterPrimary} />
      <FooterLinks links={homeFooterSecondary} />
    </footer>
  );
}
