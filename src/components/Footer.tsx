import Container from './Container';

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 py-10 text-sm text-ink/60">
      <Container className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Dan A Rai — ScrollVine</p>
        <div className="flex gap-6 text-xs uppercase tracking-[0.2em]">
          <a href="/privacy" className="link-underline">Privacy</a>
          <a href="/terms" className="link-underline">Terms</a>
        </div>
      </Container>
    </footer>
  );
}
