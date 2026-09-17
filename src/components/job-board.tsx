"use client";

import { useMemo, useState } from "react";
import { HomeFooter } from "@/components/home-footer";
import { JobList } from "@/components/job-list";
import {
  Canvas,
  Container,
  Dropdown,
  FieldLabel,
  Heading,
  Text,
} from "@/components/ui";
import { getCategory, jobCategories, type Job } from "@/lib/data";
import { filterJobs } from "@/lib/jobs";

const salaryOptions = [
  { value: "all", label: "Any salary" },
  { value: "100000", label: "$100k+" },
  { value: "130000", label: "$130k+" },
  { value: "150000", label: "$150k+" },
  { value: "180000", label: "$180k+" },
];

const teamOptions = [
  { value: "all", label: "Any team size" },
  { value: "1-20", label: "1–20" },
  { value: "21-50", label: "21–50" },
  { value: "51-200", label: "51–200" },
  { value: "201", label: "200+" },
];

export function JobBoard({ jobs }: { jobs: Job[] }) {
  const [role, setRole] = useState("all");
  const [salary, setSalary] = useState("all");
  const [team, setTeam] = useState("all");

  const roleOptions = useMemo(
    () => [
      { value: "all", label: "All roles" },
      ...jobCategories
        .filter((category) => jobs.some((job) => job.category === category.slug))
        .map((category) => ({ value: category.slug, label: category.label })),
    ],
    [jobs],
  );

  const visible = filterJobs(jobs, { role, salary, team });
  const roleLabel = role === "all" ? "Startup" : getCategory(role)?.label ?? "Startup";
  const count = visible.length;
  const jobWord = count === 1 ? "Job" : "Jobs";
  const roleWord = count === 1 ? "role" : "roles";

  return (
    <Canvas>
      <Container className="space-y-6 pt-10 pb-8">
        <div className="space-y-3 text-center">
          <Heading variant="display" align="center">
            {count} Remote {roleLabel} {jobWord}
          </Heading>
          <Text tone="muted" align="center">
            {count} remote {roleLabel.toLowerCase()} {roleWord}, all at fully remote,
            VC-backed startups from seed to series C. Matcha reads every job
            description daily and sends you one zero noise email with only the
            roles that really fit. No scrolling, no noise.
          </Text>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="space-y-1">
            <FieldLabel htmlFor="filter-role">Role</FieldLabel>
            <Dropdown
              id="filter-role"
              value={role}
              options={roleOptions}
              onChange={setRole}
            />
          </div>
          <div className="space-y-1">
            <FieldLabel htmlFor="filter-salary">Salary</FieldLabel>
            <Dropdown
              id="filter-salary"
              value={salary}
              options={salaryOptions}
              onChange={setSalary}
            />
          </div>
          <div className="space-y-1">
            <FieldLabel htmlFor="filter-team">Team size</FieldLabel>
            <Dropdown
              id="filter-team"
              value={team}
              options={teamOptions}
              onChange={setTeam}
            />
          </div>
        </div>
        <JobList jobs={visible} />
        <HomeFooter />
      </Container>
    </Canvas>
  );
}
