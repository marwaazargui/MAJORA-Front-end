import { useMemo, useState } from 'react';
import { ChevronDown, FileText, Download, Printer, BarChart3 } from 'lucide-react';
import PageHeader, { MonthSelect } from '../components/PageHeader';
import { useExpenses } from '../context/ExpenseContext';
import { categories } from '../data';
import { eur, monthLabel, pct } from '../lib/format';

type ReportType = 'Monthly Summary' | 'Category Breakdown';

export default function Reports() {
  const { transactions, budget } = useExpenses();
  const [type, setType] = useState<ReportType>('Monthly Summary');
  const [month, setMonth] = useState('2026-11');
  const [applied, setApplied] = useState({ type, month });

  const report = useMemo(() => {
    const tx = transactions.filter((t) => t.date.startsWith(applied.month));
    const total = tx.reduce((s, t) => s + t.amount, 0);
    const cats = categories.map((c) => {
      const amount = tx.filter((t) => t.category === c.name).reduce((s, t) => s + t.amount, 0);
      return { name: c.name, amount, pct: total ? (amount / total) * 100 : 0, budget: budget.categories[c.name] };
    });
    const biggest = [...cats].sort((a, b) => b.amount - a.amount)[0];
    return { tx, total, cats, biggest };
  }, [transactions, budget, applied]);

  function exportCsv() {
    const esc = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;
    const lines = [['Date', 'Description', 'Category', 'Amount (EUR)'].map(esc).join(',')];
    report.tx.forEach((t) => lines.push([t.date, t.description, t.category, t.amount.toFixed(2)].map(esc).join(',')));
    const blob = new Blob(['\ufeff' + lines.join('\n')], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `expenses-${applied.month}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  const remaining = budget.monthly - report.total;
  const rows: [string, string, string?][] = [
    ['Total Expenses', eur(report.total)],
    ['Monthly Budget', eur(budget.monthly)],
    ['Remaining', eur(remaining), remaining >= 0 ? 'text-success' : 'text-danger'],
    ['Biggest Category', report.total ? `${report.biggest.name} (${eur(report.biggest.amount)})` : '—'],
    ['Number of Transactions', String(report.tx.length)],
  ];

  return (
    <>
      <PageHeader title="Reports" subtitle="Generate and export expense reports" showMonth={false} />
      <section className="card no-print mb-5 flex flex-wrap items-end gap-4 p-5">
        <div>
          <label className="mb-1.5 block text-sm font-semibold">Report Type</label>
          <div className="relative w-56">
            <select className="field appearance-none pr-9" value={type} onChange={(e) => setType(e.target.value as ReportType)}>
              <option>Monthly Summary</option>
              <option>Category Breakdown</option>
            </select>
            <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-semibold">Month</label>
          <MonthSelect value={month} onChange={setMonth} />
        </div>
        <button className="btn-primary" onClick={() => setApplied({ type, month })}><BarChart3 size={16} /> Generate</button>
      </section>

      <section className="card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">{applied.type} – {monthLabel(applied.month)}</h2>
          <FileText className="text-brand" size={20} />
        </div>

        {applied.type === 'Monthly Summary' ? (
          <dl className="divide-y divide-line text-sm">
            {rows.map(([k, v, cls]) => (
              <div key={k} className="flex justify-between py-3.5">
                <dt>{k}</dt><dd className={`font-semibold ${cls ?? ''}`}>{v}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] text-sm">
              <thead><tr className="text-left text-muted"><th className="py-2 font-medium">Category</th><th className="py-2 text-right font-medium">Spent</th><th className="py-2 text-right font-medium">Share</th><th className="py-2 text-right font-medium">Budget</th></tr></thead>
              <tbody className="divide-y divide-line">
                {report.cats.map((c) => (
                  <tr key={c.name}><td className="py-3">{c.name}</td><td className="py-3 text-right font-semibold">{eur(c.amount)}</td><td className="py-3 text-right">{pct(c.pct)}</td><td className="py-3 text-right">{eur(c.budget)}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="no-print mt-6 flex flex-wrap gap-4">
          <button className="btn-outline flex-1" onClick={exportCsv}><Download size={16} /> Export to Excel (CSV)</button>
          <button className="btn-primary flex-1" onClick={() => window.print()}><Printer size={16} /> Print Report</button>
        </div>
      </section>
    </>
  );
}
