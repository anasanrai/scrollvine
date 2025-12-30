create extension if not exists "pgcrypto";

create table if not exists profiles (
  id uuid primary key references auth.users on delete cascade,
  role text check (role in ('admin', 'editor')) default 'editor',
  display_name text,
  created_at timestamptz default now()
);

create table if not exists books (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  subtitle text,
  short_blurb text,
  description text,
  cover_url text,
  publish_date date,
  featured boolean default false,
  status text check (status in ('draft', 'published')) default 'draft',
  created_at timestamptz default now()
);

create table if not exists book_links (
  id uuid primary key default gen_random_uuid(),
  book_id uuid references books(id) on delete cascade,
  label text not null,
  url text not null,
  priority int default 0
);

create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text,
  content text not null,
  cover_url text,
  status text check (status in ('draft', 'published')) default 'draft',
  published_at timestamptz,
  created_at timestamptz default now()
);

create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  author text not null,
  source text,
  featured boolean default false
);

create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  created_at timestamptz default now(),
  status text check (status in ('new', 'replied')) default 'new'
);

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, new.raw_user_meta_data->>'full_name')
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

alter table profiles enable row level security;
alter table books enable row level security;
alter table book_links enable row level security;
alter table posts enable row level security;
alter table testimonials enable row level security;
alter table contact_messages enable row level security;

-- Profiles policies
create policy "Profiles are viewable by owner" on profiles
  for select
  using (auth.uid() = id);

create policy "Profiles can be updated by owner" on profiles
  for update
  using (auth.uid() = id);

create policy "Admins can manage profiles" on profiles
  for all
  using (exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin'));

-- Books policies
create policy "Published books are viewable" on books
  for select
  using (status = 'published');

create policy "Editors can manage books" on books
  for all
  using (exists (select 1 from profiles p where p.id = auth.uid() and p.role in ('admin', 'editor')));

-- Book links policies
create policy "Book links are viewable for published books" on book_links
  for select
  using (exists (select 1 from books b where b.id = book_id and b.status = 'published'));

create policy "Editors can manage book links" on book_links
  for all
  using (exists (select 1 from profiles p where p.id = auth.uid() and p.role in ('admin', 'editor')));

-- Posts policies
create policy "Published posts are viewable" on posts
  for select
  using (status = 'published');

create policy "Editors can manage posts" on posts
  for all
  using (exists (select 1 from profiles p where p.id = auth.uid() and p.role in ('admin', 'editor')));

-- Testimonials policies
create policy "Testimonials are viewable" on testimonials
  for select
  using (true);

create policy "Editors can manage testimonials" on testimonials
  for all
  using (exists (select 1 from profiles p where p.id = auth.uid() and p.role in ('admin', 'editor')));

-- Contact messages policies
create policy "Contact messages insertable by anyone" on contact_messages
  for insert
  with check (true);

create policy "Editors can view contact messages" on contact_messages
  for select
  using (exists (select 1 from profiles p where p.id = auth.uid() and p.role in ('admin', 'editor')));

create policy "Editors can update contact messages" on contact_messages
  for update
  using (exists (select 1 from profiles p where p.id = auth.uid() and p.role in ('admin', 'editor')));

-- Storage buckets
insert into storage.buckets (id, name, public)
values ('covers', 'covers', true)
on conflict do nothing;

insert into storage.buckets (id, name, public)
values ('presskit', 'presskit', true)
on conflict do nothing;

insert into storage.buckets (id, name, public)
values ('samples', 'samples', false)
on conflict do nothing;

-- Storage policies
create policy "Public can read covers" on storage.objects
  for select
  using (bucket_id = 'covers');

create policy "Public can read presskit" on storage.objects
  for select
  using (bucket_id = 'presskit');

create policy "Editors can manage storage" on storage.objects
  for all
  using (exists (select 1 from profiles p where p.id = auth.uid() and p.role in ('admin', 'editor')));
