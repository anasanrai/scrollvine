import Link from 'next/link';
import Container from './Container';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/books', label: 'Books' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/press', label: 'Press' },
  { href: '/contact', label: 'Contact' }
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-parchment/90 backdrop-blur">
      <Container className="flex items-center justify-between py-4">
        <Link href="/" className="text-lg font-semibold tracking-wide">
          ScrollVine
        </Link>
        <nav className="hidden items-center gap-6 text-sm uppercase tracking-[0.2em] md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-ink/70 transition hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/admin" className="text-xs uppercase tracking-[0.3em] text-ink/60">
          Admin
        </Link>
      </Container>
    </header>
  );
}
