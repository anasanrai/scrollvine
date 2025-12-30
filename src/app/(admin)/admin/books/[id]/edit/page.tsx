import { notFound, redirect } from 'next/navigation';
import AdminForm from '@/components/AdminForm';
import BookForm from '@/components/BookForm';
import { createSupabaseServerClient } from '@/lib/supabase/supabase-server';

async function updateBook(id: string, formData: FormData) {
  'use server';
  const supabase = createSupabaseServerClient();

  const payload = {
    title: String(formData.get('title')),
    slug: String(formData.get('slug')),
    subtitle: formData.get('subtitle') || null,
    short_blurb: formData.get('short_blurb') || null,
    description: formData.get('description') || null,
    cover_url: formData.get('cover_url') || null,
    publish_date: formData.get('publish_date') || null,
    status: formData.get('status') || 'draft',
    featured: formData.get('featured') === 'on'
  };

  const { error } = await supabase.from('books').update(payload).eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  await supabase.from('book_links').delete().eq('book_id', id);

  const linksRaw = String(formData.get('links') || '[]');
  const links = JSON.parse(linksRaw) as Array<{ label: string; url: string; priority: number }>;
  if (links.length) {
    await supabase.from('book_links').insert(
      links.map((link) => ({
        book_id: id,
        label: link.label,
        url: link.url,
        priority: link.priority ?? 0
      }))
    );
  }

  redirect('/admin/books');
}

export const metadata = {
  title: 'Edit Book — Admin'
};

export default async function EditBookPage({ params }: { params: { id: string } }) {
  const supabase = createSupabaseServerClient();
  const { data: book } = await supabase.from('books').select('*, book_links(*)').eq('id', params.id).single();

  if (!book) {
    notFound();
  }

  return (
    <AdminForm title={`Edit: ${book.title}`} description="Update book details and buy links.">
      <form action={updateBook.bind(null, params.id)} className="space-y-6">
        <BookForm initial={book} />
        <button type="submit" className="rounded-full bg-ink px-6 py-3 text-xs uppercase tracking-[0.3em] text-parchment">
          Save changes
        </button>
      </form>
    </AdminForm>
  );
}
