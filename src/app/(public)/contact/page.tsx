import { redirect } from 'next/navigation';
import Container from '@/components/Container';
import { createSupabaseServerClient } from '@/lib/supabase/supabase-server';

export const metadata = {
  title: 'Contact — ScrollVine',
  description: 'Contact Dan A Rai.'
};

async function submitContact(formData: FormData) {
  'use server';

  const name = String(formData.get('name') || '').trim();
  const email = String(formData.get('email') || '').trim();
  const subject = String(formData.get('subject') || '').trim();
  const message = String(formData.get('message') || '').trim();

  if (!name || !email || !message) {
    redirect('/contact?error=missing');
  }

  const supabase = createSupabaseServerClient();

  const { data: recentMessages } = await supabase
    .from('contact_messages')
    .select('created_at')
    .eq('email', email)
    .order('created_at', { ascending: false })
    .limit(1);

  if (recentMessages?.length) {
    const last = new Date(recentMessages[0].created_at).getTime();
    if (Date.now() - last < 60_000) {
      redirect('/contact?error=rate');
    }
  }

  const { error } = await supabase.from('contact_messages').insert({
    name,
    email,
    subject: subject || null,
    message
  });

  if (error) {
    redirect('/contact?error=server');
  }

  // TODO: connect transactional email provider.
  redirect('/contact?sent=1');
}

export default function ContactPage({ searchParams }: { searchParams: { sent?: string; error?: string } }) {
  const statusMessage = searchParams.sent
    ? 'Thank you. Your message has been sent.'
    : searchParams.error === 'rate'
      ? 'Please wait a minute before sending another message.'
      : searchParams.error === 'server'
        ? 'Something went wrong. Please try again soon.'
      : searchParams.error
        ? 'Please complete all required fields.'
        : null;

  return (
    <Container className="py-16">
      <div className="max-w-2xl space-y-4">
        <p className="text-xs uppercase tracking-[0.4em] text-ink/50">Contact</p>
        <h1 className="text-3xl font-semibold text-ink">Let’s start a conversation.</h1>
        <p className="text-sm text-ink/70">For speaking engagements, rights, or media inquiries, reach out below.</p>
      </div>
      <form action={submitContact} className="mt-8 space-y-5 rounded-3xl border border-ink/10 bg-white/80 p-8 shadow-soft">
        {statusMessage && <p className="text-sm text-ink/70">{statusMessage}</p>}
        <div className="grid gap-4 md:grid-cols-2">
          <input name="name" placeholder="Name" className="w-full rounded-full border border-ink/20 bg-white px-4 py-2 text-sm" />
          <input name="email" type="email" placeholder="Email" className="w-full rounded-full border border-ink/20 bg-white px-4 py-2 text-sm" />
        </div>
        <input name="subject" placeholder="Subject" className="w-full rounded-full border border-ink/20 bg-white px-4 py-2 text-sm" />
        <textarea name="message" placeholder="Message" rows={6} className="w-full rounded-2xl border border-ink/20 bg-white px-4 py-3 text-sm" />
        <button type="submit" className="rounded-full bg-ink px-6 py-3 text-sm uppercase tracking-[0.2em] text-parchment">
          Send message
        </button>
      </form>
    </Container>
  );
}
