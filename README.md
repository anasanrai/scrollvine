# ScrollVine

A premium editorial author platform for Dan A Rai, built with Next.js, Tailwind, and Supabase.

## Tech Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS + @tailwindcss/typography
- Supabase (Auth, Postgres, Storage, RLS)
- Deploy target: Vercel

## Setup

1) **Create a Supabase project**
   - Create a new project in the Supabase dashboard.

2) **Run migrations**
   - In the Supabase SQL editor, run the SQL in `supabase/migrations/001_init.sql`.

3) **Create storage buckets**
   - Buckets are created in the migration, but confirm in the dashboard:
     - `covers` (public)
     - `presskit` (public)
     - `samples` (private)

4) **Set environment variables**
   - Copy `.env.example` to `.env.local` and fill in:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

5) **Create the first admin user**
   - Sign up a user in Supabase Auth.
   - In the `profiles` table, set `role = 'admin'` for that user.

6) **Run locally and deploy**
   ```bash
   npm install
   npm run dev
   ```
   - Deploy to Vercel and set the same environment variables.

## Key Routes
Public:
- `/`
- `/books`
- `/books/[slug]`
- `/about`
- `/blog`
- `/blog/[slug]`
- `/press`
- `/contact`
- `/privacy`
- `/terms`

Admin (protected):
- `/admin`
- `/admin/books`
- `/admin/books/new`
- `/admin/books/[id]/edit`
- `/admin/posts`
- `/admin/posts/new`
- `/admin/posts/[id]/edit`
- `/admin/media`
- `/admin/messages`

## Notes
- Email delivery is stubbed in the contact form server action.
- Use the admin media manager to upload covers and press assets.
