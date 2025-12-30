import { redirect } from 'next/navigation';
import AdminForm from '@/components/AdminForm';
import PostForm from '@/components/PostForm';
import { createSupabaseServerClient } from '@/lib/supabase/supabase-server';

async function createPost(formData: FormData) {
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

  const { error } = await supabase.from('posts').insert(payload);

  if (error) {
    throw new Error(error.message);
  }

  redirect('/admin/posts');
}

export const metadata = {
  title: 'New Post — Admin'
};

export default function NewPostPage() {
  return (
    <AdminForm title="New post" description="Create a new blog post.">
      <form action={createPost} className="space-y-6">
        <PostForm />
        <button type="submit" className="rounded-full bg-ink px-6 py-3 text-xs uppercase tracking-[0.3em] text-parchment">
          Create post
        </button>
      </form>
    </AdminForm>
  );
}
