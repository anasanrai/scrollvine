import { ReactNode } from 'react';

export default function AdminTable({ headers, rows }: { headers: string[]; rows: ReactNode[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-ink/10 bg-white/80 shadow-soft">
      <table className="w-full text-left text-sm">
        <thead className="bg-ink/5 text-xs uppercase tracking-[0.2em] text-ink/60">
          <tr>
            {headers.map((header) => (
              <th key={header} className="px-4 py-3 font-medium">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}
