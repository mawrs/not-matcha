import type { Metadata } from "next";
import { JobBoard } from "@/components/job-board";
import { sampleJobs } from "@/lib/data";

export const metadata: Metadata = {
  title: "Job Board | Matcha",
};

export default function JobsPage() {
  return <JobBoard jobs={sampleJobs} />;
}
