import { notFound, redirect } from 'next/navigation';
import AdminForm from '@/components/AdminForm';
import PostForm from '@/components/PostForm';
import { createSupabaseServerClient } from '@/lib/supabase/supabase-server';

async function updatePost(id: string, formData: FormData) {
  'use server';
  const supabase = createSupabaseServerClient();
  const payload = {
    title: String(formData.get('title')),
    slug: String(formData.get('slug')),
    excerpt: formData.get('excerpt') || null,
    content: String(formData.get('content') || ''),
    cover_url: formData.get('cover_url') || null,
    status: formData.get('status') || 'draft',
    published_at: formData.get('published_at') || null
  };

  const { error } = await supabase.from('posts').update(payload).eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  redirect('/admin/posts');
}

export const metadata = {
  title: 'Edit Post — Admin'
};

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const supabase = createSupabaseServerClient();
  const { data: post } = await supabase.from('posts').select('*').eq('id', params.id).single();

  if (!post) {
    notFound();
  }

  return (
    <AdminForm title={`Edit: ${post.title}`} description="Update post content and metadata.">
      <form action={updatePost.bind(null, params.id)} className="space-y-6">
        <PostForm initial={post} />
        <button type="submit" className="rounded-full bg-ink px-6 py-3 text-xs uppercase tracking-[0.3em] text-parchment">
          Save changes
        </button>
      </form>
    </AdminForm>
  );
}
