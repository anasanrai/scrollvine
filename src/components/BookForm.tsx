'use client';

import { useMemo, useState } from 'react';
import { slugify } from '@/lib/slug';
import { Book, BookLink } from '@/lib/db/types';

type BookFormProps = {
  initial?: Partial<Book> & { book_links?: BookLink[] };
};

export default function BookForm({ initial }: BookFormProps) {
  const [title, setTitle] = useState(initial?.title ?? '');
  const [slug, setSlug] = useState(initial?.slug ?? '');
  const [links, setLinks] = useState<BookLink[]>(initial?.book_links ?? []);

  const linksPayload = useMemo(() => JSON.stringify(links), [links]);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!initial?.slug) {
      setSlug(slugify(value));
    }
  };

  const updateLink = (index: number, patch: Partial<BookLink>) => {
    setLinks((prev) => prev.map((link, idx) => (idx === index ? { ...link, ...patch } : link)));
  };

  const addLink = () => {
    setLinks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), book_id: '', label: '', url: '', priority: prev.length }
    ]);
  };

  const removeLink = (index: number) => {
    setLinks((prev) => prev.filter((_, idx) => idx !== index));
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
          <label className="text-xs uppercase tracking-[0.2em] text-ink/50">Subtitle</label>
          <input
            name="subtitle"
            defaultValue={initial?.subtitle ?? ''}
            className="w-full rounded-full border border-ink/20 bg-white px-4 py-2 text-sm"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-[0.2em] text-ink/50">Short blurb</label>
          <input
            name="short_blurb"
            defaultValue={initial?.short_blurb ?? ''}
            className="w-full rounded-full border border-ink/20 bg-white px-4 py-2 text-sm"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-[0.2em] text-ink/50">Description</label>
        <textarea
          name="description"
          defaultValue={initial?.description ?? ''}
          rows={4}
          className="w-full rounded-2xl border border-ink/20 bg-white px-4 py-3 text-sm"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-[0.2em] text-ink/50">Cover URL</label>
          <input
            name="cover_url"
            defaultValue={initial?.cover_url ?? ''}
            className="w-full rounded-full border border-ink/20 bg-white px-4 py-2 text-sm"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-[0.2em] text-ink/50">Publish date</label>
          <input
            type="date"
            name="publish_date"
            defaultValue={initial?.publish_date ?? ''}
            className="w-full rounded-full border border-ink/20 bg-white px-4 py-2 text-sm"
          />
        </div>
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
      </div>
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          name="featured"
          defaultChecked={initial?.featured ?? false}
          className="h-4 w-4 rounded border-ink/20"
        />
        <label className="text-xs uppercase tracking-[0.2em] text-ink/50">Featured</label>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.2em] text-ink/50">Buy links</p>
          <button type="button" onClick={addLink} className="text-xs uppercase tracking-[0.2em] text-ink/60">
            Add link
          </button>
        </div>
        {links.length === 0 ? (
          <p className="text-sm text-ink/60">No links yet.</p>
        ) : (
          <div className="space-y-3">
            {links.map((link, index) => (
              <div key={link.id} className="grid gap-3 rounded-2xl border border-ink/10 bg-white p-4 md:grid-cols-4">
                <input
                  value={link.label}
                  onChange={(event) => updateLink(index, { label: event.target.value })}
                  placeholder="Label"
                  className="rounded-full border border-ink/20 bg-white px-4 py-2 text-sm"
                />
                <input
                  value={link.url}
                  onChange={(event) => updateLink(index, { url: event.target.value })}
                  placeholder="URL"
                  className="rounded-full border border-ink/20 bg-white px-4 py-2 text-sm md:col-span-2"
                />
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={link.priority}
                    onChange={(event) => updateLink(index, { priority: Number(event.target.value) })}
                    className="w-20 rounded-full border border-ink/20 bg-white px-3 py-2 text-sm"
                  />
                  <button type="button" onClick={() => removeLink(index)} className="text-xs uppercase tracking-[0.2em] text-ink/60">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <input type="hidden" name="links" value={linksPayload} />
      </div>
    </div>
  );
}
