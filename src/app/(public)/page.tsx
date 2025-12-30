import Link from 'next/link';
import Image from 'next/image';
import Container from '@/components/Container';
import NewsletterCTA from '@/components/NewsletterCTA';
import PraiseQuote from '@/components/PraiseQuote';
import { getFeaturedBook, getPublishedPosts, getTestimonials } from '@/lib/db/queries';

export default async function HomePage() {
  const [featuredBook, posts, testimonials] = await Promise.all([
    getFeaturedBook(),
    getPublishedPosts(),
    getTestimonials()
  ]);

  return (
    <div className="space-y-20 py-16">
      <Container className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.4em] text-ink/50">Author platform</p>
          <h1 className="text-4xl font-semibold text-ink md:text-5xl">A quiet space for luminous stories.</h1>
          <p className="text-lg text-ink/70">
            ScrollVine is the editorial home of Dan A Rai. Discover new releases, essays, and the
            craft behind each book.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/books" className="rounded-full bg-ink px-6 py-3 text-sm uppercase tracking-[0.2em] text-parchment">
              Browse books
            </Link>
            <Link href="/blog" className="rounded-full border border-ink/20 px-6 py-3 text-sm uppercase tracking-[0.2em] text-ink/70">
              Read essays
            </Link>
          </div>
        </div>
        <div className="rounded-3xl border border-ink/10 bg-white/80 p-8 shadow-soft">
          {featuredBook ? (
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.3em] text-ink/50">Featured book</p>
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl">
                {featuredBook.cover_url ? (
                  <Image src={featuredBook.cover_url} alt={featuredBook.title} fill className="object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs uppercase tracking-[0.3em] text-ink/40">
                    Cover forthcoming
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-ink">{featuredBook.title}</h2>
                {featuredBook.subtitle && <p className="text-sm text-ink/60">{featuredBook.subtitle}</p>}
                {featuredBook.short_blurb && <p className="mt-2 text-sm text-ink/70">{featuredBook.short_blurb}</p>}
              </div>
              <Link href={`/books/${featuredBook.slug}`} className="text-sm uppercase tracking-[0.3em] text-ink/60">
                Read more →
              </Link>
            </div>
          ) : (
            <p className="text-sm text-ink/60">Add a featured book in the admin dashboard.</p>
          )}
        </div>
      </Container>

      <Container className="space-y-10">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-ink">Latest essays</h2>
          <Link href="/blog" className="text-xs uppercase tracking-[0.3em] text-ink/60">
            View all
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {posts.slice(0, 3).map((post) => (
            <article key={post.id} className="rounded-2xl border border-ink/10 bg-white/80 p-6 shadow-soft">
              <p className="text-xs uppercase tracking-[0.3em] text-ink/50">Essay</p>
              <h3 className="mt-3 text-lg font-semibold text-ink">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h3>
              {post.excerpt && <p className="mt-2 text-sm text-ink/60">{post.excerpt}</p>}
            </article>
          ))}
        </div>
      </Container>

      <Container className="grid gap-6 md:grid-cols-2">
        {testimonials.length > 0 ? (
          testimonials.map((testimonial) => (
            <PraiseQuote key={testimonial.id} testimonial={testimonial} />
          ))
        ) : (
          <p className="text-sm text-ink/60">Add featured testimonials in the admin dashboard.</p>
        )}
      </Container>

      <Container>
        <NewsletterCTA />
      </Container>
    </div>
  );
}
