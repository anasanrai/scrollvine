import Container from '@/components/Container';
import BookCard from '@/components/BookCard';
import { getPublishedBooks } from '@/lib/db/queries';

export const metadata = {
  title: 'Books — ScrollVine',
  description: 'Published books by Dan A Rai.'
};

export default async function BooksPage() {
  const books = await getPublishedBooks();

  return (
    <Container className="py-16">
      <div className="max-w-2xl space-y-4">
        <p className="text-xs uppercase tracking-[0.4em] text-ink/50">Books</p>
        <h1 className="text-3xl font-semibold text-ink">Stories that linger.</h1>
        <p className="text-sm text-ink/70">Explore Dan A Rai's published titles and forthcoming works.</p>
      </div>
      <div className="mt-10 grid gap-8 md:grid-cols-3">
        {books.length > 0 ? books.map((book) => <BookCard key={book.id} book={book} />) : (
          <p className="text-sm text-ink/60">No published books yet.</p>
        )}
      </div>
    </Container>
  );
}
