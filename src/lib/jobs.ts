import {
  countries,
  getCategory,
  jobCategories,
  jobsFor,
  sampleJobs,
  type Job,
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

export function salaryUsd(job: Job) {
  const hourly = job.salary.match(/\$(\d+)\s*\/\s*hr/i);
  if (hourly) return Number(hourly[1]) * 2000;
  const usd = job.salary.match(/\$(\d+)/i);
  if (usd) {
    const n = Number(usd[1]);
    return job.salary.toLowerCase().includes("k") ? n * 1000 : n;
  }
  const gbp = job.salary.match(/£(\d+)/i);
  if (gbp) return Math.round(Number(gbp[1]) * 1000 * 1.27);
  const eur = job.salary.match(/€(\d+)/i);
  if (eur) return Math.round(Number(eur[1]) * 1000 * 1.1);
  return null;
}

export function teamSizeOf(job: Job) {
  if (job.teamSize != null) return job.teamSize;
  for (const chip of job.chips ?? []) {
    const match = chip.match(/Team of (\d+)/i);
    if (match) return Number(match[1]);
  }
  return null;
}

export function filterJobs(
  jobs: Job[],
  filters: { role: string; salary: string; team: string },
) {
  return jobs.filter((job) => {
    if (filters.role !== "all" && job.category !== filters.role) return false;

    if (filters.salary !== "all") {
      const usd = salaryUsd(job);
      if (usd == null || usd < Number(filters.salary)) return false;
    }

    if (filters.team !== "all") {
      const size = teamSizeOf(job);
      if (size == null) return false;
      if (filters.team === "201") return size >= 201;
      const [min, max] = filters.team.split("-").map(Number);
      if (size < min || size > max) return false;
    }

    return true;
  });
}

export { sampleJobs };
