import { Text, TextLink } from "@/components/ui";
import { countries } from "@/lib/data";

export function CountryLinks({ role }: { role: string }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <Text as="span" tone="faint">
        By country:
      </Text>
      {countries.map((country) => (
        <TextLink key={country.slug} href={`/jobs/${role}/${country.slug}`} variant="body">
          {country.label}
        </TextLink>
      ))}
    </div>
  );
}
