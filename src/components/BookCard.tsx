import Link from 'next/link';
import Image from 'next/image';
import { Book } from '@/lib/db/types';

export default function BookCard({ book }: { book: Book }) {
  return (
    <article className="group flex flex-col gap-4 rounded-2xl border border-ink/10 bg-white/70 p-6 shadow-soft">
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-ink/5">
        {book.cover_url ? (
          <Image src={book.cover_url} alt={book.title} fill className="object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-xs uppercase tracking-[0.3em] text-ink/40">
            No cover
          </div>
        )}
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-ink">
          <Link href={`/books/${book.slug}`} className="group-hover:underline">
            {book.title}
          </Link>
        </h3>
        {book.subtitle && <p className="text-sm text-ink/70">{book.subtitle}</p>}
        {book.short_blurb && <p className="text-sm text-ink/60">{book.short_blurb}</p>}
      </div>
    </article>
  );
}
