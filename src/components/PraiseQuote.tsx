import { Testimonial } from '@/lib/db/types';

export default function PraiseQuote({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="rounded-2xl border border-ink/10 bg-white/70 p-6 shadow-soft">
      <blockquote className="text-lg text-ink/80">“{testimonial.quote}”</blockquote>
      <figcaption className="mt-4 text-sm uppercase tracking-[0.2em] text-ink/50">
        {testimonial.author}
        {testimonial.source ? ` — ${testimonial.source}` : ''}
      </figcaption>
    </figure>
  );
}
