import { notFound } from 'next/navigation';
import Image from 'next/image';
import Container from '@/components/Container';
import BuyButtons from '@/components/BuyButtons';
import { getBookBySlug } from '@/lib/db/queries';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const book = await getBookBySlug(params.slug);
  if (!book) return {};

  return {
    title: `${book.title} — ScrollVine`,
    description: book.short_blurb ?? book.subtitle ?? 'Book by Dan A Rai',
    openGraph: {
      title: book.title,
      description: book.short_blurb ?? book.subtitle ?? undefined,
      images: book.cover_url ? [book.cover_url] : undefined
    }
  };
}

export default async function BookDetailPage({ params }: { params: { slug: string } }) {
  const book = await getBookBySlug(params.slug);

  if (!book) {
    notFound();
  }

  return (
    <Container className="py-16">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-ink/10 bg-white/80 shadow-soft">
          {book.cover_url ? (
            <Image src={book.cover_url} alt={book.title} fill className="object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-xs uppercase tracking-[0.3em] text-ink/40">
              Cover forthcoming
            </div>
          )}
        </div>
        <div className="space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-ink/50">Book</p>
            <h1 className="mt-3 text-3xl font-semibold text-ink md:text-4xl">{book.title}</h1>
            {book.subtitle && <p className="mt-2 text-lg text-ink/70">{book.subtitle}</p>}
          </div>
          {book.short_blurb && <p className="text-base text-ink/70">{book.short_blurb}</p>}
          {book.description && <p className="text-sm text-ink/60">{book.description}</p>}
          <BuyButtons links={book.book_links ?? []} />
        </div>
      </div>
    </Container>
  );
}
