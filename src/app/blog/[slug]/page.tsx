import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentFooter } from "@/components/content-footer";
import { Container, Heading, Stack, Text } from "@/components/ui";
import { blogPosts } from "@/lib/data";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  return { title: post ? `${post.title} | Matcha` : "Writing | Matcha" };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <Container>
      <Heading className="leading-display">{post.title}</Heading>
      <Text size="caption" tone="faint" className="mt-2">
        {post.date}
      </Text>
      <Stack className="mt-6 leading-body">
        <Text>{post.excerpt}</Text>
        <Text>
          Matcha reads job descriptions from remote startups every day. These
          notes come from that feed: what companies actually write, not what
          job boards summarize.
        </Text>
        <Text>
          If you want the handful of roles that fit you, describe your next
          role on the homepage. No dashboard. One zero-noise email.
        </Text>
      </Stack>
      <ContentFooter />
    </Container>
  );
}
