export type Profile = {
  id: string;
  role: 'admin' | 'editor';
  display_name: string | null;
  created_at: string;
};

export type Book = {
  id: string;
  title: string;
  slug: string;
  subtitle: string | null;
  short_blurb: string | null;
  description: string | null;
  cover_url: string | null;
  publish_date: string | null;
  featured: boolean;
  status: 'draft' | 'published';
  created_at: string;
};

export type BookLink = {
  id: string;
  book_id: string;
  label: string;
  url: string;
  priority: number;
};

export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_url: string | null;
  status: 'draft' | 'published';
  published_at: string | null;
  created_at: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  source: string | null;
  featured: boolean;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  created_at: string;
  status: 'new' | 'replied';
};
