import {
  countries,
  getCategory,
  jobCategories,
  jobsFor,
  sampleJobs,
} from "./data";

export function resolveRole(slug: string) {
  const category = getCategory(slug);
  if (category) {
    return {
      slug,
      label: category.label,
      description: category.description,
      categorySlug: category.slug,
    };
  }

  for (const cat of jobCategories) {
    const title = cat.titles?.find((t) => t.slug === slug);
    if (title) {
      return {
        slug,
        label: title.label,
        description: `Remote ${title.label.toLowerCase()} roles at early-stage startups.`,
        categorySlug: cat.slug,
      };
    }
  }

  return null;
}

export function listingsFor(roleSlug: string, region?: string) {
  const role = resolveRole(roleSlug);
  if (!role) return [];
  const inCategory = jobsFor(role.categorySlug, region);
  if (role.slug === role.categorySlug) return inCategory;
  return inCategory.filter((job) =>
    job.title.toLowerCase().includes(role.label.toLowerCase().split(" ")[0]!),
  );
}

export function countryLabel(slug?: string) {
  if (!slug) return null;
  return countries.find((c) => c.slug === slug)?.label ?? null;
}

export { sampleJobs };
