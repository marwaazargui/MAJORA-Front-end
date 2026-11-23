import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import DonutChart from '../components/DonutChart';
import CategoryLegend from '../components/CategoryLegend';
import BarChart from '../components/BarChart';
import { useExpenses } from '../context/ExpenseContext';
import { useTrend } from '../lib/useTrend';
import { eur, monthLabel } from '../lib/format';

export default function Analytics() {
  const { total, byCategory } = useExpenses();
  const trend = useTrend();
  const [tab, setTab] = useState<'category' | 'month'>('category');

  return (
    <>
      <PageHeader title="Analytics" subtitle="Insights into your spending" />
      <div className="card overflow-hidden">
        <div className="flex border-b border-line bg-surface/60 px-2">
          {([['category', 'By Category'], ['month', 'By Month']] as const).map(([key, label]) => (
            <button key={key} onClick={() => setTab(key)}
              className={`border-b-2 px-5 py-3 text-sm font-semibold ${tab === key ? 'border-brand text-brand' : 'border-transparent text-ink'}`}>
              {label}
            </button>
          ))}
        </div>

        {tab === 'category' ? (
          <>
            <div className="flex flex-wrap items-center gap-8 p-6">
              <DonutChart data={byCategory} total={total} size={200} />
              <CategoryLegend data={byCategory} />
            </div>
            <div className="border-t border-line p-6">
              <h2 className="mb-5 text-base font-bold">Category Comparison</h2>
              <BarChart step={100} data={byCategory.map((c) => ({ label: c.name, value: c.amount, color: c.color }))} />
            </div>
          </>
        ) : (
          <div className="p-6">
            <h2 className="mb-5 text-base font-bold">Monthly Spending Trend</h2>
            <BarChart step={300} data={trend.map((t) => ({ label: t.label, value: t.value, color: t.color }))} />
            <ul className="mt-6 divide-y divide-line text-sm">
              {[...trend].reverse().map((t) => (
                <li key={t.month} className="flex justify-between py-2.5"><span>{monthLabel(t.month)}</span><span className="font-medium">{eur(t.value)}</span></li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
