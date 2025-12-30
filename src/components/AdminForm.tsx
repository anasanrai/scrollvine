import { ReactNode } from 'react';

export default function AdminForm({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <section className="rounded-3xl border border-ink/10 bg-white/80 p-8 shadow-soft">
      <div className="mb-6 space-y-2">
        <h2 className="text-xl font-semibold text-ink">{title}</h2>
        {description && <p className="text-sm text-ink/60">{description}</p>}
      </div>
      <div className="space-y-6">{children}</div>
    </section>
  );
}
