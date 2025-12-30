import { MetadataRoute } from 'next';
import { createSupabaseServerClient } from '@/lib/supabase/supabase-server';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://scrollvine.vercel.app';
  const supabase = createSupabaseServerClient();

  const [{ data: books }, { data: posts }] = await Promise.all([
    supabase.from('books').select('slug, updated_at:created_at').eq('status', 'published'),
    supabase.from('posts').select('slug, updated_at:created_at').eq('status', 'published')
  ]);

  const routes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/books`, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/blog`, lastModified: new Date() },
    { url: `${baseUrl}/press`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
    { url: `${baseUrl}/privacy`, lastModified: new Date() },
    { url: `${baseUrl}/terms`, lastModified: new Date() }
  ];

  (books ?? []).forEach((book) => {
    routes.push({
      url: `${baseUrl}/books/${book.slug}`,
      lastModified: new Date(book.updated_at ?? Date.now())
    });
  });

  (posts ?? []).forEach((post) => {
    routes.push({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updated_at ?? Date.now())
    });
  });

  return routes;
}
