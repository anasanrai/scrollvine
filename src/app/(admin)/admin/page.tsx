import AdminForm from '@/components/AdminForm';
import { createSupabaseServerClient } from '@/lib/supabase/supabase-server';

export const metadata = {
  title: 'Admin Dashboard — ScrollVine'
};

export default async function AdminDashboardPage() {
  const supabase = createSupabaseServerClient();
  const [{ count: bookCount }, { count: postCount }, { count: messageCount }] = await Promise.all([
    supabase.from('books').select('*', { count: 'exact', head: true }),
    supabase.from('posts').select('*', { count: 'exact', head: true }),
    supabase.from('contact_messages').select('*', { count: 'exact', head: true })
  ]);

  return (
    <div className="space-y-6">
      <AdminForm title="Overview" description="Key stats across ScrollVine.">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-ink/10 bg-parchment p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-ink/50">Books</p>
            <p className="mt-3 text-3xl font-semibold text-ink">{bookCount ?? 0}</p>
          </div>
          <div className="rounded-2xl border border-ink/10 bg-parchment p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-ink/50">Posts</p>
            <p className="mt-3 text-3xl font-semibold text-ink">{postCount ?? 0}</p>
          </div>
          <div className="rounded-2xl border border-ink/10 bg-parchment p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-ink/50">Messages</p>
            <p className="mt-3 text-3xl font-semibold text-ink">{messageCount ?? 0}</p>
          </div>
        </div>
      </AdminForm>
    </div>
  );
}
