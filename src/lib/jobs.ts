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

const stop = new Set([
  "the",
  "and",
  "for",
  "looking",
  "with",
  "that",
  "this",
  "from",
  "have",
  "want",
  "based",
  "please",
  "just",
  "into",
  "your",
  "what",
  "kind",
  "company",
  "size",
  "medium",
  "authorized",
  "work",
  "role",
  "roles",
  "year",
  "yearly",
  "level",
]);

function roleHint(text: string) {
  if (/design/.test(text)) return /design|ux|ui/;
  if (/engineer|developer|fullstack|full stack/.test(text)) return /engineer|developer/;
  if (/market/.test(text)) return /market/;
  if (/sales|account executive/.test(text)) return /sales|account/;
  if (/product manager|\bpm\b/.test(text)) return /product manager|\bpm\b/;
  return null;
}

export function matchJobs(prefs: string) {
  const text = prefs.toLowerCase();
  const tokens = text
    .split(/[^a-z0-9+]+/)
    .filter((token) => token.length > 2 && !stop.has(token));

  const scored = sampleJobs.map((job) => {
    const hay =
      `${job.title} ${job.company} ${job.category} ${job.summary ?? ""} ${job.location} ${job.chips?.join(" ") ?? ""}`.toLowerCase();
    let score = 0;
    for (const token of tokens) {
      if (hay.includes(token)) score += 1;
    }
    if (/design/.test(text) && /design/.test(hay)) score += 4;
    if (/engineer/.test(text) && /engineer/.test(hay)) score += 3;
    if (/designer/.test(text) && /designer/.test(hay)) score += 5;
    if (/product/.test(text) && /product/.test(hay)) score += 2;
    if (/\b(senior|sr)\b/.test(text) && /senior/.test(hay)) score += 2;
    if (/remote/.test(text) && /remote/.test(hay)) score += 1;
    return { job, score };
  });

  const hint = roleHint(text);
  const ranked = scored
    .filter((item) => {
      if (item.score <= 0) return false;
      if (!hint) return true;
      const hay = `${item.job.title} ${item.job.category}`.toLowerCase();
      return hint.test(hay);
    })
    .sort((a, b) => b.score - a.score)
    .map((item) => item.job);

  return ranked.length > 0 ? ranked : sampleJobs;
}

function stageOf(job: Job) {
  const text = (job.chips ?? []).join(" ").toLowerCase();
  if (/nonprofit/.test(text)) return "nonprofit";
  if (/unicorn/.test(text)) return "unicorn";
  if (/pre-?seed/.test(text)) return "pre-seed";
  if (/\bseed\b/.test(text)) return "seed";
  if (/series\s*a/.test(text)) return "series-a";
  if (/series\s*b/.test(text)) return "series-b";
  if (/series\s*c/.test(text)) return "series-c";
  return null;
}

function teamBucket(size: number | null) {
  if (size == null) return null;
  if (size <= 20) return "1-20";
  if (size <= 50) return "21-50";
  if (size <= 200) return "51-200";
  return "201+";
}

function roleFamily(job: Job) {
  const hay = `${job.title} ${job.category}`.toLowerCase();
  if (job.category === "internship" || /\bintern\b/.test(hay)) return "intern";
  if (/design/.test(hay)) return "design";
  if (/engineer|developer|new-grad|new grad/.test(hay)) return "eng";
  if (/market/.test(hay)) return "marketing";
  if (/sales|account executive|\bsdr\b/.test(hay)) return "sales";
  if (/product manager|\bpm\b|head of product/.test(hay)) return "pm";
  if (/recruit/.test(hay)) return "recruit";
  if (/success|support/.test(hay)) return "support";
  return job.category;
}

function titleTokens(title: string) {
  return title
    .toLowerCase()
    .split(/[^a-z0-9+]+/)
    .filter((token) => token.length > 2 && !stop.has(token));
}

const tagStop = new Set([...stop, "team", "year", "total", "funding", "backed"]);

function tagTokens(job: Job) {
  return (job.chips ?? [])
    .join(" ")
    .toLowerCase()
    .split(/[^a-z0-9+]+/)
    .filter((token) => token.length > 2 && !tagStop.has(token) && !/^\d+$/.test(token));
}

export function similarJobs(job: Job, limit = 6) {
  const sourceStage = stageOf(job);
  const sourceTeam = teamBucket(teamSizeOf(job));
  const sourcePay = salaryUsd(job);
  const sourceTitle = new Set(titleTokens(job.title));

  const scored = sampleJobs
    .filter((candidate) => candidate.id !== job.id)
    .map((candidate) => {
      let score = 0;
      if (candidate.category === job.category) score += 12;
      if (candidate.region === job.region) score += 3;
      if (candidate.companySlug === job.companySlug) score += 1;

      const stage = stageOf(candidate);
      if (sourceStage && stage === sourceStage) score += 5;

      const team = teamBucket(teamSizeOf(candidate));
      if (sourceTeam && team === sourceTeam) score += 4;

      const pay = salaryUsd(candidate);
      if (sourcePay && pay) {
        const ratio = Math.min(sourcePay, pay) / Math.max(sourcePay, pay);
        if (ratio >= 0.75) score += 4;
        else if (ratio >= 0.6) score += 2;
      }

      for (const token of titleTokens(candidate.title)) {
        if (sourceTitle.has(token)) score += 2;
      }

      const sourceTags = new Set(tagTokens(job));
      for (const token of tagTokens(candidate)) {
        if (sourceTags.has(token)) score += 2;
      }

      return { job: candidate, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  const family = roleFamily(job);
  const sameFamily = scored.filter((item) => roleFamily(item.job) === family);
  const ranked = (sameFamily.length > 0 ? sameFamily : scored)
    .slice(0, limit)
    .map((item) => item.job);

  if (ranked.length > 0) return ranked;
  return sampleJobs.filter((candidate) => candidate.id !== job.id).slice(0, limit);
}

export { sampleJobs };
