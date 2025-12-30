import Container from '@/components/Container';
import { createSupabaseServerClient } from '@/lib/supabase/supabase-server';

export const metadata = {
  title: 'Press — ScrollVine',
  description: 'Press kit and media resources.'
};

export default async function PressPage() {
  const supabase = createSupabaseServerClient();
  const { data: files } = await supabase.storage.from('presskit').list('', { limit: 100 });
  const pressAssets = (files ?? [])
    .filter((file) => file.name !== '.emptyFolderPlaceholder')
    .map((file) => ({
      name: file.name,
      url: supabase.storage.from('presskit').getPublicUrl(file.name).data.publicUrl
    }));

  return (
    <Container className="py-16">
      <div className="max-w-2xl space-y-4">
        <p className="text-xs uppercase tracking-[0.4em] text-ink/50">Press</p>
        <h1 className="text-3xl font-semibold text-ink">Press kit & resources.</h1>
        <p className="text-sm text-ink/70">
          Download press-ready assets, author bios, and book imagery for media coverage.
        </p>
      </div>
      <div className="mt-8 rounded-2xl border border-ink/10 bg-white/80 p-6 shadow-soft">
        {pressAssets.length > 0 ? (
          <ul className="space-y-3 text-sm text-ink/70">
            {pressAssets.map((asset) => (
              <li key={asset.name} className="flex items-center justify-between">
                <span>{asset.name}</span>
                <a href={asset.url} className="text-xs uppercase tracking-[0.3em] text-ink/60">
                  Download
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-ink/60">Press assets will appear here once uploaded.</p>
        )}
      </div>
    </Container>
  );
}
