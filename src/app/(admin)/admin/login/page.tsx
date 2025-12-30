'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createSupabaseBrowserClient } from '@/lib/supabase/supabase-browser';

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get('email'));
    const password = String(formData.get('password'));

    const supabase = createSupabaseBrowserClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    router.push('/admin');
  };

  return (
    <div className="grid min-h-[70vh] gap-8 rounded-3xl border border-ink/10 bg-white/80 p-10 shadow-soft lg:grid-cols-2">
      <div className="space-y-6">
        <p className="text-xs uppercase tracking-[0.4em] text-ink/50">Admin</p>
        <h1 className="text-3xl font-semibold text-ink">Welcome back, editor.</h1>
        <p className="text-sm text-ink/70">
          Log in to manage books, essays, media assets, and contact messages.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-sm text-red-700">{error}</p>}
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full rounded-full border border-ink/20 bg-white px-4 py-2 text-sm"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="w-full rounded-full border border-ink/20 bg-white px-4 py-2 text-sm"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-ink px-6 py-3 text-sm uppercase tracking-[0.2em] text-parchment"
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}
