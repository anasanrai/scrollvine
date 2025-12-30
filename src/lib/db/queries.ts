import { cache } from 'react';
import { createSupabaseServerClient } from '@/lib/supabase/supabase-server';

export const getFeaturedBook = cache(async () => {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from('books')
    .select('*')
    .eq('status', 'published')
    .eq('featured', true)
    .order('publish_date', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
});

export const getPublishedBooks = cache(async () => {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from('books')
    .select('*')
    .eq('status', 'published')
    .order('publish_date', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
});

export const getBookBySlug = cache(async (slug: string) => {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from('books')
    .select('*, book_links(*)')
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
});

export const getPublishedPosts = cache(async () => {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
});

export const getPostBySlug = cache(async (slug: string) => {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
});

export const getTestimonials = cache(async () => {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('featured', true)
    .limit(6);

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
});
