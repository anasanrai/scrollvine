import { BookLink } from '@/lib/db/types';

export default function BuyButtons({ links }: { links: BookLink[] }) {
  if (!links.length) return null;

  const sorted = [...links].sort((a, b) => a.priority - b.priority);

  return (
    <div className="flex flex-wrap gap-3">
      {sorted.map((link) => (
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-ink/20 px-4 py-2 text-sm uppercase tracking-[0.2em] text-ink/70 transition hover:border-ink hover:text-ink"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}
