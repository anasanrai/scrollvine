import Link from 'next/link';
import Container from '@/components/Container';
import { getPublishedPosts } from '@/lib/db/queries';

export const metadata = {
  title: 'Blog — ScrollVine',
  description: 'Essays and notes from Dan A Rai.'
};

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <Container className="py-16">
      <div className="max-w-2xl space-y-4">
        <p className="text-xs uppercase tracking-[0.4em] text-ink/50">Blog</p>
        <h1 className="text-3xl font-semibold text-ink">Essays & reflections.</h1>
        <p className="text-sm text-ink/70">Long-form writing on craft, creativity, and culture.</p>
      </div>
      <div className="mt-10 space-y-6">
        {posts.length > 0 ? (
          posts.map((post) => (
            <article key={post.id} className="rounded-2xl border border-ink/10 bg-white/80 p-6 shadow-soft">
              <p className="text-xs uppercase tracking-[0.3em] text-ink/50">{post.published_at?.slice(0, 10)}</p>
              <h2 className="mt-2 text-2xl font-semibold text-ink">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              {post.excerpt && <p className="mt-3 text-sm text-ink/60">{post.excerpt}</p>}
            </article>
          ))
        ) : (
          <p className="text-sm text-ink/60">No published posts yet.</p>
        )}
      </div>
    </Container>
  );
}
