import AdminTable from '@/components/AdminTable';
import { createSupabaseServerClient } from '@/lib/supabase/supabase-server';

export const metadata = {
  title: 'Messages — Admin'
};

export default async function AdminMessagesPage() {
  const supabase = createSupabaseServerClient();
  const { data: messages } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });

  const rows = (messages ?? []).map((message) => (
    <tr key={message.id} className="border-t border-ink/10">
      <td className="px-4 py-3">
        <p className="text-sm font-medium text-ink">{message.name}</p>
        <p className="text-xs text-ink/50">{message.email}</p>
      </td>
      <td className="px-4 py-3 text-sm text-ink/60">{message.subject ?? '—'}</td>
      <td className="px-4 py-3 text-sm text-ink/60">{message.message}</td>
      <td className="px-4 py-3 text-xs text-ink/50">{message.created_at.slice(0, 10)}</td>
    </tr>
  ));

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-ink/50">Messages</p>
        <h1 className="text-2xl font-semibold text-ink">Contact submissions</h1>
      </div>
      <AdminTable headers={["Sender", "Subject", "Message", "Date"]} rows={rows} />
    </div>
  );
}
