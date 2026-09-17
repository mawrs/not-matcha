import { TextLink } from "@/components/ui";
import { homeFooterLinks } from "@/lib/data";

export function HomeFooter() {
  return (
    <footer className="mt-footer border-t border-border pt-6 pb-8 text-caption text-fg-faint sm:mt-footer-lg">
      <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1.5">
        {homeFooterLinks.map((link) => (
          <li key={link.href}>
            <TextLink href={link.href}>{link.label}</TextLink>
          </li>
        ))}
      </ul>
    </footer>
  );
}
