import { ReactNode } from 'react';
import Container from './Container';

export default function ArticleLayout({ title, eyebrow, children }: { title: string; eyebrow?: string; children: ReactNode }) {
  return (
    <Container className="max-w-3xl py-16">
      <div className="space-y-4">
        {eyebrow && <p className="text-xs uppercase tracking-[0.4em] text-ink/50">{eyebrow}</p>}
        <h1 className="text-3xl font-semibold text-ink md:text-4xl">{title}</h1>
      </div>
      <div className="prose prose-lg mt-8 max-w-none">{children}</div>
    </Container>
  );
}
