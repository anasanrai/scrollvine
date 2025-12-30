import { redirect } from 'next/navigation';
import AdminForm from '@/components/AdminForm';
import BookForm from '@/components/BookForm';
import { createSupabaseServerClient } from '@/lib/supabase/supabase-server';

async function createBook(formData: FormData) {
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

  const { data, error } = await supabase.from('books').insert(payload).select('id').single();

  if (error) {
    throw new Error(error.message);
  }

  const linksRaw = String(formData.get('links') || '[]');
  const links = JSON.parse(linksRaw) as Array<{ label: string; url: string; priority: number }>;
  if (links.length) {
    await supabase.from('book_links').insert(
      links.map((link) => ({
        book_id: data.id,
        label: link.label,
        url: link.url,
        priority: link.priority ?? 0
      }))
    );
  }

  redirect('/admin/books');
}

export const metadata = {
  title: 'New Book — Admin'
};

export default function NewBookPage() {
  return (
    <AdminForm title="New book" description="Create a new book listing.">
      <form action={createBook} className="space-y-6">
        <BookForm />
        <button type="submit" className="rounded-full bg-ink px-6 py-3 text-xs uppercase tracking-[0.3em] text-parchment">
          Create book
        </button>
      </form>
    </AdminForm>
  );
}
