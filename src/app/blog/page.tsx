import type { Metadata } from "next";
import { ContentFooter } from "@/components/content-footer";
import { Container, Heading, Text, TextLink } from "@/components/ui";
import { blogPosts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Writing | Matcha",
};

export default function BlogPage() {
  return (
    <Container>
      <Heading>Writing</Heading>
      <Text tone="muted" className="mt-2">
        Notes and findings on remote startup and scale up jobs.
      </Text>
      <ul className="mt-8 space-y-5">
        {blogPosts.map((post) => (
          <li key={post.slug}>
            <TextLink href={`/blog/${post.slug}`} variant="title" className="text-body">
              {post.title}
            </TextLink>
            <Text size="caption" tone="faint" className="mt-1">
              {post.date}
            </Text>
          </li>
        ))}
      </ul>
      <ContentFooter />
    </Container>
  );
}
