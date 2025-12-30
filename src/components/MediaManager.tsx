'use client';

import { useEffect, useState } from 'react';
import { createSupabaseBrowserClient } from '@/lib/supabase/supabase-browser';

type BucketConfig = {
  name: string;
  label: string;
  public: boolean;
};

const buckets: BucketConfig[] = [
  { name: 'covers', label: 'Book Covers', public: true },
  { name: 'presskit', label: 'Press Kit', public: true }
];

export default function MediaManager() {
  const supabase = createSupabaseBrowserClient();
  const [files, setFiles] = useState<Record<string, string[]>>({});
  const [status, setStatus] = useState<string | null>(null);

  const loadFiles = async () => {
    const next: Record<string, string[]> = {};
    for (const bucket of buckets) {
      const { data } = await supabase.storage.from(bucket.name).list('', { limit: 100 });
      next[bucket.name] = (data ?? []).map((item) => item.name).filter((name) => name !== '.emptyFolderPlaceholder');
    }
    setFiles(next);
  };

  useEffect(() => {
    loadFiles();
  }, []);

  const handleUpload = async (bucket: BucketConfig, file: File | null) => {
    if (!file) return;
    setStatus(`Uploading ${file.name}...`);
    const { error } = await supabase.storage.from(bucket.name).upload(file.name, file, {
      upsert: true
    });
    if (error) {
      setStatus(error.message);
      return;
    }
    setStatus('Upload complete.');
    await loadFiles();
  };

  return (
    <div className="space-y-8">
      {status && <p className="text-sm text-ink/60">{status}</p>}
      {buckets.map((bucket) => (
        <div key={bucket.name} className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-ink/50">{bucket.label}</p>
              <p className="text-sm text-ink/60">{bucket.public ? 'Public bucket' : 'Private bucket'}</p>
            </div>
            <label className="cursor-pointer rounded-full border border-ink/20 px-4 py-2 text-xs uppercase tracking-[0.2em] text-ink/60">
              Upload
              <input
                type="file"
                className="hidden"
                onChange={(event) => handleUpload(bucket, event.target.files?.[0] ?? null)}
              />
            </label>
          </div>
          <div className="rounded-2xl border border-ink/10 bg-white/80 p-4 shadow-soft">
            <ul className="space-y-2 text-sm text-ink/70">
              {(files[bucket.name] ?? []).length ? (
                files[bucket.name].map((fileName) => (
                  <li key={fileName} className="flex items-center justify-between">
                    <span>{fileName}</span>
                  </li>
                ))
              ) : (
                <li className="text-sm text-ink/50">No files yet.</li>
              )}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
