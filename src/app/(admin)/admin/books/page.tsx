import Link from 'next/link';
import AdminTable from '@/components/AdminTable';
import { createSupabaseServerClient } from '@/lib/supabase/supabase-server';

async function deleteBook(formData: FormData) {
  'use server';
  const id = String(formData.get('id'));
  const supabase = createSupabaseServerClient();
  await supabase.from('books').delete().eq('id', id);
}

export const metadata = {
  title: 'Books — Admin'
};

export default async function AdminBooksPage() {
  const supabase = createSupabaseServerClient();
  const { data: books } = await supabase.from('books').select('*').order('created_at', { ascending: false });

  const rows = (books ?? []).map((book) => (
    <tr key={book.id} className="border-t border-ink/10">
      <td className="px-4 py-3">
        <div className="space-y-1">
          <p className="text-sm font-medium text-ink">{book.title}</p>
          <p className="text-xs text-ink/50">{book.slug}</p>
        </div>
      </td>
      <td className="px-4 py-3 text-xs uppercase tracking-[0.2em] text-ink/50">{book.status}</td>
      <td className="px-4 py-3 text-xs text-ink/50">{book.publish_date ?? '—'}</td>
      <td className="px-4 py-3 text-right">
        <div className="flex items-center justify-end gap-3">
          <Link href={`/admin/books/${book.id}/edit`} className="text-xs uppercase tracking-[0.2em] text-ink/60">
            Edit
          </Link>
          <form action={deleteBook}>
            <input type="hidden" name="id" value={book.id} />
            <button type="submit" className="text-xs uppercase tracking-[0.2em] text-red-600">
              Delete
            </button>
          </form>
        </div>
      </td>
    </tr>
  ));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-ink/50">Books</p>
          <h1 className="text-2xl font-semibold text-ink">Manage books</h1>
        </div>
        <Link href="/admin/books/new" className="rounded-full bg-ink px-5 py-2 text-xs uppercase tracking-[0.3em] text-parchment">
          New book
        </Link>
      </div>
      <AdminTable headers={["Title", "Status", "Publish", "Actions"]} rows={rows} />
    </div>
  );
}
