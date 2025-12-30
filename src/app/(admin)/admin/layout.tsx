import Link from 'next/link';
import Container from '@/components/Container';

const links = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/books', label: 'Books' },
  { href: '/admin/posts', label: 'Posts' },
  { href: '/admin/media', label: 'Media' },
  { href: '/admin/messages', label: 'Messages' }
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container className="py-12">
      <div className="grid gap-8 lg:grid-cols-[200px_1fr]">
        <aside className="space-y-4 rounded-3xl border border-ink/10 bg-white/80 p-6 shadow-soft">
          <p className="text-xs uppercase tracking-[0.3em] text-ink/50">Admin</p>
          <nav className="space-y-3 text-sm">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="block text-ink/70 hover:text-ink">
                {link.label}
              </Link>
            ))}
          </nav>
        </aside>
        <div className="space-y-8">{children}</div>
      </div>
    </Container>
  );
}
