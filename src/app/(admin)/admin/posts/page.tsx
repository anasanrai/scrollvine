import Link from 'next/link';
import AdminTable from '@/components/AdminTable';
import { createSupabaseServerClient } from '@/lib/supabase/supabase-server';

async function deletePost(formData: FormData) {
  'use server';
  const id = String(formData.get('id'));
  const supabase = createSupabaseServerClient();
  await supabase.from('posts').delete().eq('id', id);
}

export const metadata = {
  title: 'Posts — Admin'
};

export default async function AdminPostsPage() {
  const supabase = createSupabaseServerClient();
  const { data: posts } = await supabase.from('posts').select('*').order('created_at', { ascending: false });

  const rows = (posts ?? []).map((post) => (
    <tr key={post.id} className="border-t border-ink/10">
      <td className="px-4 py-3">
        <div className="space-y-1">
          <p className="text-sm font-medium text-ink">{post.title}</p>
          <p className="text-xs text-ink/50">{post.slug}</p>
        </div>
      </td>
      <td className="px-4 py-3 text-xs uppercase tracking-[0.2em] text-ink/50">{post.status}</td>
      <td className="px-4 py-3 text-xs text-ink/50">{post.published_at?.slice(0, 10) ?? '—'}</td>
      <td className="px-4 py-3 text-right">
        <div className="flex items-center justify-end gap-3">
          <Link href={`/admin/posts/${post.id}/edit`} className="text-xs uppercase tracking-[0.2em] text-ink/60">
            Edit
          </Link>
          <form action={deletePost}>
            <input type="hidden" name="id" value={post.id} />
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
          <p className="text-xs uppercase tracking-[0.4em] text-ink/50">Posts</p>
          <h1 className="text-2xl font-semibold text-ink">Manage posts</h1>
        </div>
        <Link href="/admin/posts/new" className="rounded-full bg-ink px-5 py-2 text-xs uppercase tracking-[0.3em] text-parchment">
          New post
        </Link>
      </div>
      <AdminTable headers={["Title", "Status", "Publish", "Actions"]} rows={rows} />
    </div>
  );
}
