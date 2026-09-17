export const loveCount = 6525;
export const upgradeUrl =
  "https://buy.stripe.com/6oUcN6a8bdS269t7SgdQQ04";

export const loveLinkedIn = [
  { src: "/testimonials/in_1.png", alt: "LinkedIn message from a Matcha user" },
  { src: "/testimonials/in_2.png", alt: "LinkedIn message from a Matcha user" },
  { src: "/testimonials/in_4.png", alt: "LinkedIn message from a Matcha user" },
  { src: "/testimonials/in_5.png", alt: "LinkedIn message from a Matcha user" },
];

export const loveEmails = [
  { src: "/testimonials/4.png", alt: "Email from a Matcha user" },
  { src: "/testimonials/2.png", alt: "Email from a Matcha user" },
  { src: "/testimonials/3.png", alt: "Email from a Matcha user" },
  { src: "/testimonials/1.png", alt: "Email from a Matcha user" },
];

export const testimonials = [
  {
    name: "Neil",
    quote: "The job search agent that actually works =)",
    role: "Founding Engineer at Folio",
    location: "Toronto",
    image: "/testimonials/neil.png",
  },
  {
    name: "Sara",
    quote: "Found a dream fully remote role that isn't even on LinkedIn",
    role: "Product Designer at Northwind",
    location: "Berlin",
    image: "/testimonials/sara.png",
  },
  {
    name: "James",
    quote: "Happy I don't have to use job boards anymore.",
    role: "Account Executive at Relic",
    location: "Austin",
    image: "/testimonials/james.png",
  },
  {
    name: "Priya",
    quote: "It actually understands what kind of role I want",
    role: "Senior Product Manager at Kite",
    location: "London",
    image: "/testimonials/priya.png",
  },
  {
    name: "Alex",
    quote:
      "Got a perfect-fit role I would have never found otherwise.",
    role: "Fullstack Engineer at Lumen",
    location: "Lisbon",
    image: "/testimonials/alex.png",
  },
  {
    name: "Maria",
    quote: "I live in Spain and can finally filter out US-only remote roles",
    role: "Growth Marketer at Sable",
    location: "Valencia",
    image: "/testimonials/maria.png",
  },
];

export const typewriterExamples = [
  "0 to 1 founding fullstack engineer looking for a funded startup with less than 10 people. Remote authorized to work in the EU or Canada.",
  "Senior content and growth marketer for a B2B SaaS or AI startup. Fully remote, US based, minimum $120k. I want to own strategy and execution, not be a cog in a big marketing team.",
  "Senior product designer, B2B SaaS or AI products, remote in the EU. End-to-end ownership, design systems, 85-95k EUR.",
  "Account executive at a B2B SaaS startup, mid to senior, fully remote in the US. $120k base, $180k OTE.",
  "Senior fullstack engineer, fully remote, based in Europe, React + NextJS",
];

export const homeFooterLinks = [
  { href: "/companies", label: "Companies" },
  { href: "/new-job", label: "Featured jobs" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/affiliates", label: "Affiliates" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export const countries = [
  { slug: "eu", label: "Europe" },
  { slug: "us", label: "US" },
  { slug: "ca", label: "Canada" },
  { slug: "uk", label: "UK" },
  { slug: "ww", label: "Worldwide" },
  { slug: "brazil", label: "Brazil" },
  { slug: "portugal", label: "Portugal" },
  { slug: "spain", label: "Spain" },
  { slug: "netherlands", label: "Netherlands" },
];

export type JobTitle = { slug: string; label: string };

export type JobCategory = {
  slug: string;
  label: string;
  description: string;
  titles?: JobTitle[];
};

export const jobCategories: JobCategory[] = [
  {
    slug: "software-engineer",
    label: "Software Engineer",
    description:
      "Remote software engineering roles at early-stage startups: backend, full-stack, frontend, AI, and infrastructure engineers.",
    titles: [
      { slug: "full-stack-engineer", label: "Full Stack Engineer" },
      { slug: "backend-engineer", label: "Backend Engineer" },
      { slug: "frontend-engineer", label: "Frontend Engineer" },
      { slug: "devops-engineer", label: "DevOps Engineer" },
      { slug: "machine-learning-engineer", label: "Machine Learning Engineer" },
      { slug: "data-engineer", label: "Data Engineer" },
      { slug: "data-scientist", label: "Data Scientist" },
      { slug: "data-analyst", label: "Data Analyst" },
    ],
  },
  {
    slug: "product-designer",
    label: "Product Designer",
    description:
      "Remote design roles at startups: product designers, UX designers, and brand designers working on high-impact products.",
    titles: [
      { slug: "ux-designer", label: "UX Designer" },
      { slug: "ui-designer", label: "UI Designer" },
      { slug: "brand-designer", label: "Brand Designer" },
    ],
  },
  {
    slug: "marketing",
    label: "Marketing",
    description:
      "Remote marketing roles at startups: growth marketers, content marketers, and marketing managers driving user acquisition.",
    titles: [
      { slug: "growth-marketer", label: "Growth Marketer" },
      { slug: "content-marketer", label: "Content Marketer" },
      { slug: "marketing-manager", label: "Marketing Manager" },
    ],
  },
  {
    slug: "sales",
    label: "Sales",
    description:
      "Remote sales roles at startups: account executives, SDRs, and sales managers closing deals at fast-growing companies.",
    titles: [
      { slug: "account-executive", label: "Account Executive" },
      { slug: "sdr", label: "SDR" },
      { slug: "sales-manager", label: "Sales Manager" },
    ],
  },
  {
    slug: "customer-support",
    label: "Customer Support",
    description:
      "Remote customer support and customer success roles at startups: specialists, CSMs, and technical support engineers.",
    titles: [
      { slug: "customer-success-manager", label: "Customer Success Manager" },
      { slug: "support-specialist", label: "Support Specialist" },
      { slug: "technical-support", label: "Technical Support Engineer" },
    ],
  },
  {
    slug: "product-manager",
    label: "Product Manager",
    description:
      "Remote product roles at startups: product managers, senior PMs, and heads of product owning roadmap and outcomes.",
    titles: [
      { slug: "senior-product-manager", label: "Senior Product Manager" },
      { slug: "head-of-product", label: "Head of Product" },
    ],
  },
  {
    slug: "operations",
    label: "Operations",
    description:
      "Remote operations roles at startups: operations managers, chiefs of staff, project managers, and people teams.",
    titles: [
      { slug: "operations-manager", label: "Operations Manager" },
      { slug: "chief-of-staff", label: "Chief of Staff" },
      { slug: "project-manager", label: "Project Manager" },
    ],
  },
  {
    slug: "finance",
    label: "Finance",
    description:
      "Remote finance roles at startups: accountants, financial analysts, controllers, and finance managers.",
    titles: [
      { slug: "accountant", label: "Accountant" },
      { slug: "financial-analyst", label: "Financial Analyst" },
      { slug: "controller", label: "Controller" },
    ],
  },
  {
    slug: "recruiter",
    label: "Recruiter",
    description:
      "Remote recruiting roles at startups: recruiters, talent acquisition partners, and technical sourcers.",
    titles: [
      { slug: "recruiter", label: "Recruiter" },
      { slug: "talent-partner", label: "Talent Acquisition Partner" },
    ],
  },
  {
    slug: "legal",
    label: "Legal",
    description:
      "Remote legal roles at startups: in-house counsel, paralegals, and compliance managers.",
    titles: [
      { slug: "counsel", label: "In-house Counsel" },
      { slug: "paralegal", label: "Paralegal" },
    ],
  },
  {
    slug: "junior",
    label: "Junior",
    description:
      "Remote roles at startups asking for under 2 years of experience, updated daily.",
  },
  {
    slug: "new-grad",
    label: "New Grad",
    description:
      "Remote roles at startups explicitly open to new grads and recent graduates, updated daily.",
  },
  {
    slug: "internship",
    label: "Internship",
    description:
      "Remote internships at startups: engineering, product, marketing, and operations roles for students, updated daily.",
  },
];

export const featuredCompanies = [
  {
    slug: "viktor",
    name: "Viktor",
    website: "https://viktor.ai",
    blurb:
      "The generalist AI employee that lives in Slack and Teams. Not a tool, a hire.",
  },
  {
    slug: "bending-spoons",
    name: "Bending Spoons",
    website: "https://bendingspoons.com",
    blurb:
      "The Milan tech company behind Evernote, WeTransfer, Vimeo, Komoot and Remini. Impossible. Maybe.",
  },
  {
    slug: "posthog",
    name: "PostHog",
    website: "https://posthog.com",
    blurb:
      "The open source Product OS built by product engineers, for product engineers: analytics, session replay, feature flags and more in one platform.",
  },
  {
    slug: "ghost",
    name: "Ghost",
    website: "https://ghost.org",
    blurb:
      "The nonprofit, open source publishing platform for independent writers and publishers. Fully remote, 4-day week, no investors.",
  },
  {
    slug: "narvar",
    name: "Narvar",
    website: "https://narvar.com",
    blurb:
      "The post-purchase experience platform behind delivery tracking, returns and proactive notifications for Nike, Sephora and 1,500+ other retail brands.",
  },
  {
    slug: "vantaca",
    name: "Vantaca",
    website: "https://vantaca.com",
    blurb:
      "The AI-first platform powering HOA and community association management, now a Wilmington, NC unicorn after acquiring HOAi.",
  },
  {
    slug: "hostie",
    name: "Hostie",
    website: "https://hostie.ai",
    blurb:
      "The AI virtual concierge that answers a restaurant's phones, texts and reservations so the front of house never misses a call.",
  },
  {
    slug: "plus-ai",
    name: "Plus AI",
    website: "https://plusai.com",
    blurb:
      "The AI presentation copilot built into PowerPoint and Google Slides, with over two million installs and customers from Google to Nvidia.",
  },
  {
    slug: "helply",
    name: "Helply",
    website: "https://helply.com",
    blurb:
      "The AI-native support platform for B2B SaaS, built by the team that bootstrapped Groove to $5M ARR.",
  },
  {
    slug: "desktop-commander",
    name: "Desktop Commander",
    website: "https://desktopcommander.app",
    blurb:
      "Maker of the open source MCP that gives AI direct access to your computer's files and terminal.",
  },
  {
    slug: "powernaut",
    name: "Powernaut",
    website: "https://powernaut.com",
    blurb:
      "The Ghent startup building an Open Virtual Power Plant to orchestrate Europe's batteries, solar and EVs.",
  },
  {
    slug: "2501-ai",
    name: "2501.ai",
    website: "https://2501.ai",
    blurb:
      "The Paris and New York startup building autonomous AI agents that detect and fix IT infrastructure incidents, not just alert on them.",
  },
  {
    slug: "clever-benefits",
    name: "Clever Benefits",
    website: "https://cleverbenefits.com",
    blurb:
      "The Scottsdale, Arizona benefits technology company behind Clever Health, Clever RX and the Agent Login broker portal.",
  },
  {
    slug: "orderly",
    name: "Orderly",
    website: "https://orderly.mx",
    blurb:
      "Administrative and invoicing software for Mexican professional-services businesses, from creative agencies to law and engineering firms.",
  },
];

export const blogPosts = [
  {
    slug: "llm-experience-requirements",
    title:
      "3 startups hiring engineers ask for 4+ years of LLM experience. ChatGPT is 3 years old.",
    date: "August 12, 2026",
    excerpt:
      "Job posts are asking for more years of LLM experience than the products have existed.",
  },
  {
    slug: "ai-coding-requirement",
    title:
      "1 in 5 remote software jobs now asks you to code with AI. A year ago it was 1 in 20.",
    date: "August 4, 2026",
    excerpt:
      "AI-assisted coding went from a nice-to-have line in a JD to a default requirement.",
  },
  {
    slug: "engineers-july-2026",
    title:
      "What fully remote startups and scaleups hiring software engineers in July 2026 are looking for",
    date: "July 28, 2026",
    excerpt:
      "Stacks, seniority, and what actually shows up in the postings.",
  },
  {
    slug: "support-july-2026",
    title:
      "What fully remote startups and scaleups hiring customer support and success teams in July 2026 are looking for",
    date: "July 21, 2026",
    excerpt: "How support roles are changing as AI takes the first reply.",
  },
  {
    slug: "sales-july-2026",
    title:
      "What fully remote startups and scaleups hiring salespeople in July 2026 are looking for",
    date: "July 14, 2026",
    excerpt: "AE vs SDR mix, OTE ranges, and the tools that keep showing up.",
  },
  {
    slug: "marketers-july-2026",
    title:
      "What fully remote startups and scaleups hiring marketers in July 2026 are looking for",
    date: "July 7, 2026",
    excerpt: "Growth generalists still win. Specialists get hired later.",
  },
  {
    slug: "why-build-matcha",
    title: "Why build Matcha and how it works",
    date: "June 18, 2026",
    excerpt:
      "A zero-noise alternative to job boards, from someone who had to search the hard way.",
  },
];

export type Job = {
  id: string;
  title: string;
  company: string;
  companySlug: string;
  location: string;
  salary: string;
  posted: string;
  category: string;
  region: string;
  blurb?: string;
  summary?: string;
  chips?: string[];
  teamSize?: number;
};

export const sampleJobs: Job[] = [
  {
    id: "1",
    title: "Founding Full Stack Engineer",
    company: "Viktor",
    companySlug: "viktor",
    location: "Remote · EU / Canada",
    salary: "$140k–$180k",
    posted: "2h ago",
    category: "software-engineer",
    region: "eu",
    chips: ["$140K–$180K / year", "Team of 12", "Seed · $8M"],
    summary:
      "Own the product end to end at an AI employee startup; TypeScript, Next.js, Slack/Teams integrations; EU or Canada work authorization.",
  },
  {
    id: "2",
    title: "Senior Product Designer",
    company: "PostHog",
    companySlug: "posthog",
    location: "Remote · Worldwide",
    salary: "$160k–$200k",
    posted: "5h ago",
    category: "product-designer",
    region: "ww",
    chips: [
      "$160K–$200K / year",
      "Team of 80",
      "$27M total funding",
      "Backed by Y Combinator, GV",
    ],
    summary:
      "Own end-to-end product design for analytics and session replay; 5+ years, design systems, Figma, strong product sense; bonus: developer tools.",
  },
  {
    id: "3",
    title: "Growth Marketer",
    company: "Plus AI",
    companySlug: "plus-ai",
    location: "Remote · US",
    salary: "$120k–$150k",
    posted: "8h ago",
    category: "marketing",
    region: "us",
    teamSize: 35,
  },
  {
    id: "4",
    title: "Account Executive",
    company: "Helply",
    companySlug: "helply",
    location: "Remote · US",
    salary: "$120k + $60k OTE",
    posted: "1d ago",
    category: "sales",
    region: "us",
    teamSize: 22,
  },
  {
    id: "5",
    title: "Customer Success Manager",
    company: "Ghost",
    companySlug: "ghost",
    location: "Remote · UK / EU",
    salary: "£70k–£90k",
    posted: "1d ago",
    category: "customer-support",
    region: "uk",
    teamSize: 40,
  },
  {
    id: "6",
    title: "Backend Engineer",
    company: "2501.ai",
    companySlug: "2501-ai",
    location: "Remote · EU",
    salary: "€90k–€120k",
    posted: "2d ago",
    category: "software-engineer",
    region: "eu",
    teamSize: 40,
  },
  {
    id: "7",
    title: "Product Manager",
    company: "Narvar",
    companySlug: "narvar",
    location: "Remote · US / Canada",
    salary: "$150k–$185k",
    posted: "2d ago",
    category: "product-manager",
    region: "us",
    teamSize: 400,
  },
  {
    id: "8",
    title: "Technical Recruiter",
    company: "Bending Spoons",
    companySlug: "bending-spoons",
    location: "Remote · EU",
    salary: "€65k–€85k",
    posted: "3d ago",
    category: "recruiter",
    region: "eu",
    teamSize: 300,
  },
  {
    id: "9",
    title: "New Grad Software Engineer",
    company: "Powernaut",
    companySlug: "powernaut",
    location: "Remote · EU",
    salary: "€55k–€70k",
    posted: "3d ago",
    category: "new-grad",
    region: "eu",
    teamSize: 15,
  },
  {
    id: "10",
    title: "Engineering Intern",
    company: "Desktop Commander",
    companySlug: "desktop-commander",
    location: "Remote · Worldwide",
    salary: "$40/hr",
    posted: "4d ago",
    category: "internship",
    region: "ww",
    teamSize: 8,
  },
  {
    id: "11",
    title: "Product Designer",
    company: "Ghost",
    companySlug: "ghost",
    location: "Remote worldwide; 4-day week",
    salary: "£70k–£90k",
    posted: "1d ago",
    category: "product-designer",
    region: "ww",
    chips: ["£70K–£90K / year", "Team of 40", "Nonprofit · no investors"],
    summary:
      "Design publishing and membership flows for an open source CMS; 4+ years product design, Figma, content tools; bonus: editorial or creator products.",
  },
  {
    id: "12",
    title: "Senior Product Designer",
    company: "Narvar",
    companySlug: "narvar",
    location: "Remote US or Canada only",
    salary: "$150k–$185k",
    posted: "1d ago",
    category: "product-designer",
    region: "us",
    chips: [
      "$150K–$185K / year",
      "Team of 400",
      "Series C",
      "Backed by Accel",
    ],
    summary:
      "Own post-purchase tracking and returns UX for retail brands; 6+ years, complex B2B/consumer workflows, design systems, Figma.",
  },
  {
    id: "13",
    title: "Brand Designer",
    company: "Plus AI",
    companySlug: "plus-ai",
    location: "Remote US only",
    salary: "$130k–$160k",
    posted: "2d ago",
    category: "product-designer",
    region: "us",
    chips: ["$130K–$160K / year", "Team of 35", "Series A · $20M"],
    summary:
      "Own brand campaigns and in-product visual systems for an AI presentation copilot; motion, Figma, marketing site craft.",
  },
  {
    id: "14",
    title: "UX Designer",
    company: "Helply",
    companySlug: "helply",
    location: "Remote US only",
    salary: "$125k–$155k",
    posted: "2d ago",
    category: "product-designer",
    region: "us",
    chips: ["$125K–$155K / year", "Team of 22", "Seed · $6M"],
    summary:
      "Design support-agent workflows and AI-assist surfaces; 4+ years UX, research, prototyping, Figma; bonus: B2B SaaS support tools.",
  },
  {
    id: "15",
    title: "Product Designer",
    company: "Viktor",
    companySlug: "viktor",
    location: "Remote EU or Canada only",
    salary: "€85k–€110k",
    posted: "3d ago",
    category: "product-designer",
    region: "eu",
    chips: ["€85K–€110K / year", "Team of 12", "Seed · $8M"],
    summary:
      "Zero-to-one design for an AI employee in Slack and Teams; systems thinking, AI product patterns, Figma; equity.",
  },
  {
    id: "16",
    title: "Senior Product Designer",
    company: "Hostie",
    companySlug: "hostie",
    location: "Remote US only",
    salary: "$145k–$175k",
    posted: "3d ago",
    category: "product-designer",
    region: "us",
    chips: ["$145K–$175K / year", "Team of 18", "Seed"],
    summary:
      "Design voice and chat concierge experiences for restaurants; 5+ years, conversational UI, mobile, Figma.",
  },
  {
    id: "17",
    title: "Product Designer",
    company: "Vantaca",
    companySlug: "vantaca",
    location: "Remote US only",
    salary: "$140k–$170k",
    posted: "4d ago",
    category: "product-designer",
    region: "us",
    chips: ["$140K–$170K / year", "Team of 200", "Unicorn"],
    summary:
      "Own HOA operations software UX; 4+ years B2B SaaS, complex forms, design systems, Figma; bonus: proptech.",
  },
];

export function getCategory(slug: string) {
  return jobCategories.find((c) => c.slug === slug);
}

export function getCompany(slug: string) {
  return featuredCompanies.find((c) => c.slug === slug);
}

export function jobsFor(category?: string, region?: string) {
  return sampleJobs.filter((job) => {
    if (category && job.category !== category && category !== "junior") {
      if (["new-grad", "internship"].includes(category)) {
        return job.category === category;
      }
      if (job.category !== category) return false;
    }
    if (region && job.region !== region && region !== "ww") {
      if (region === "eu" && ["eu", "uk"].includes(job.region)) return true;
      return job.region === region;
    }
    return true;
  });
}
