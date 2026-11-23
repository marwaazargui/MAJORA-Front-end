import { useEffect, useMemo, useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, Pencil, Plus, Search, Trash2 } from 'lucide-react';
import PageHeader, { MonthSelect } from '../components/PageHeader';
import { CategoryBadge } from '../components/CategoryIcon';
import ExpenseModal from '../components/ExpenseModal';
import ConfirmModal from '../components/ConfirmModal';
import { useExpenses } from '../context/ExpenseContext';
import { categories } from '../data';
import { eur, formatDate } from '../lib/format';
import type { Transaction } from '../types';

const PAGE_SIZE = 5;

function pageList(cur: number, last: number): (number | '…')[] {
  const set = new Set([1, last, cur - 1, cur, cur + 1].filter((p) => p >= 1 && p <= last));
  if (last <= 6) return Array.from({ length: last }, (_, i) => i + 1);
  const sorted = [...set].sort((a, b) => a - b);
  const out: (number | '…')[] = [];
  sorted.forEach((p, i) => {
    if (i && p - sorted[i - 1] > 1) out.push('…');
    out.push(p);
  });
  return out;
}

export default function Transactions() {
  const { monthTx, month, setMonth, deleteTx } = useExpenses();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All Categories');
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState<{ editing: Transaction | null } | null>(null);
  const [toDelete, setToDelete] = useState<Transaction | null>(null);

  const rows = useMemo(
    () =>
      monthTx.filter(
        (t) =>
          t.description.toLowerCase().includes(search.toLowerCase()) &&
          (category === 'All Categories' || t.category === category),
      ),
    [monthTx, search, category],
  );
  const pages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  useEffect(() => setPage(1), [search, category, month]);
  const current = Math.min(page, pages);
  const start = (current - 1) * PAGE_SIZE;
  const visible = rows.slice(start, start + PAGE_SIZE);

  return (
    <>
      <PageHeader title="Transactions" subtitle="Manage your expense records" showMonth={false}
        action={<button className="btn-primary" onClick={() => setModal({ editing: null })}><Plus size={16} /> Add Expense</button>} />

      <section className="card p-5">
        <div className="mb-4 flex flex-wrap gap-3">
          <div className="relative min-w-[200px] flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input className="field pl-9" placeholder="Search description…" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="relative w-48">
            <select aria-label="Category" className="field cursor-pointer appearance-none pr-9" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option>All Categories</option>
              {categories.map((c) => <option key={c.name}>{c.name}</option>)}
            </select>
            <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
          </div>
          <MonthSelect value={month} onChange={setMonth} />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="bg-surface text-left font-semibold">
                <th className="rounded-l-lg px-4 py-3">Date</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3 text-right">Amount</th>
                <th className="rounded-r-lg px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((t) => (
                <tr key={t.id} className="border-b border-line last:border-0">
                  <td className="px-4 py-3.5">{formatDate(t.date)}</td>
                  <td className="px-4 py-3.5">{t.description}</td>
                  <td className="px-4 py-3.5"><CategoryBadge name={t.category} /></td>
                  <td className="px-4 py-3.5 text-right font-medium">{eur(t.amount)}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex justify-center gap-3">
                      <button aria-label={`Edit ${t.description}`} className="rounded p-1 text-brand hover:bg-brand-50" onClick={() => setModal({ editing: t })}><Pencil size={16} /></button>
                      <button aria-label={`Delete ${t.description}`} className="rounded p-1 text-danger hover:bg-red-50" onClick={() => setToDelete(t)}><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {!visible.length && (
                <tr><td colSpan={5} className="px-4 py-12 text-center text-muted">No expenses match. Add one or change the filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
          <span className="text-muted">
            {rows.length ? `Showing ${start + 1}–${start + visible.length} of ${rows.length} transactions` : 'Showing 0 transactions'}
          </span>
          <div className="flex items-center gap-1.5">
            <button aria-label="Previous page" disabled={current === 1} onClick={() => setPage(current - 1)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-line disabled:opacity-40"><ChevronLeft size={16} /></button>
            {pageList(current, pages).map((p, i) =>
              p === '…' ? <span key={i} className="px-2 text-muted">…</span> : (
                <button key={p} onClick={() => setPage(p)}
                  className={`h-9 w-9 rounded-lg text-sm font-medium ${p === current ? 'bg-brand text-white shadow-btn' : 'border border-line hover:bg-brand-50'}`}>{p}</button>
              ))}
            <button aria-label="Next page" disabled={current === pages} onClick={() => setPage(current + 1)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-line disabled:opacity-40"><ChevronRight size={16} /></button>
          </div>
        </div>
      </section>

      {modal && <ExpenseModal editing={modal.editing} onClose={() => setModal(null)} />}
      {toDelete && (
        <ConfirmModal title="Delete expense" confirmLabel="Delete"
          message={`Delete “${toDelete.description}” (${eur(toDelete.amount)})? This can’t be undone.`}
          onConfirm={() => deleteTx(toDelete.id)} onClose={() => setToDelete(null)} />
      )}
    </>
  );
}
