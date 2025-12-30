import { notFound } from 'next/navigation';
import { marked } from 'marked';
import Container from '@/components/Container';
import { getPostBySlug } from '@/lib/db/queries';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: `${post.title} — ScrollVine`,
    description: post.excerpt ?? undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      images: post.cover_url ? [post.cover_url] : undefined
    }
  };
}

export default async function PostDetailPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const html = marked.parse(post.content, { mangle: false, headerIds: false });

  return (
    <Container className="py-16">
      <article className="mx-auto max-w-3xl">
        <p className="text-xs uppercase tracking-[0.4em] text-ink/50">{post.published_at?.slice(0, 10)}</p>
        <h1 className="mt-4 text-3xl font-semibold text-ink md:text-4xl">{post.title}</h1>
        {post.excerpt && <p className="mt-4 text-sm text-ink/60">{post.excerpt}</p>}
        <div
          className="prose prose-lg mt-8 max-w-none"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>
    </Container>
  );
}
