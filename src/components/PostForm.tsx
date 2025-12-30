'use client';

import { useState } from 'react';
import { slugify } from '@/lib/slug';
import { Post } from '@/lib/db/types';

type PostFormProps = {
  initial?: Partial<Post>;
};

export default function PostForm({ initial }: PostFormProps) {
  const [title, setTitle] = useState(initial?.title ?? '');
  const [slug, setSlug] = useState(initial?.slug ?? '');

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!initial?.slug) {
      setSlug(slugify(value));
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-[0.2em] text-ink/50">Title</label>
          <input
            name="title"
            value={title}
            onChange={(event) => handleTitleChange(event.target.value)}
            required
            className="w-full rounded-full border border-ink/20 bg-white px-4 py-2 text-sm"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-[0.2em] text-ink/50">Slug</label>
          <input
            name="slug"
            value={slug}
            onChange={(event) => setSlug(event.target.value)}
            required
            className="w-full rounded-full border border-ink/20 bg-white px-4 py-2 text-sm"
          />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-[0.2em] text-ink/50">Excerpt</label>
          <textarea
            name="excerpt"
            defaultValue={initial?.excerpt ?? ''}
            rows={3}
            className="w-full rounded-2xl border border-ink/20 bg-white px-4 py-3 text-sm"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-[0.2em] text-ink/50">Cover URL</label>
          <input
            name="cover_url"
            defaultValue={initial?.cover_url ?? ''}
            className="w-full rounded-full border border-ink/20 bg-white px-4 py-2 text-sm"
          />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-[0.2em] text-ink/50">Status</label>
          <select
            name="status"
            defaultValue={initial?.status ?? 'draft'}
            className="w-full rounded-full border border-ink/20 bg-white px-4 py-2 text-sm"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-[0.2em] text-ink/50">Published at</label>
          <input
            type="datetime-local"
            name="published_at"
            defaultValue={initial?.published_at?.slice(0, 16) ?? ''}
            className="w-full rounded-full border border-ink/20 bg-white px-4 py-2 text-sm"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-[0.2em] text-ink/50">Content (Markdown)</label>
        <textarea
          name="content"
          defaultValue={initial?.content ?? ''}
          rows={12}
          className="w-full rounded-2xl border border-ink/20 bg-white px-4 py-3 text-sm font-mono"
        />
      </div>
    </div>
  );
}
