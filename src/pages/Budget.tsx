import { useState } from 'react';
import { Pencil } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import BudgetModal from '../components/BudgetModal';
import { CategoryIcon } from '../components/CategoryIcon';
import { useExpenses } from '../context/ExpenseContext';
import { categories } from '../data';
import { eur, pct } from '../lib/format';

export default function Budget() {
  const { total, budget, byCategory } = useExpenses();
  const [editing, setEditing] = useState(false);
  const used = (total / budget.monthly) * 100;

  return (
    <>
      <PageHeader title="Budget" subtitle="Set and track your monthly budget" />
      <section className="card mb-5 p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium">Monthly Budget</p>
            <p className="mt-1 text-3xl font-bold">{eur(budget.monthly)}</p>
          </div>
          <button className="btn-primary" onClick={() => setEditing(true)}><Pencil size={14} /> Edit Budget</button>
        </div>
        <div className="mt-5 flex flex-wrap gap-x-16 gap-y-3">
          <div>
            <p className="flex items-center gap-2 text-sm"><span className="h-2 w-2 rounded-full bg-brand" />Spent</p>
            <p className="text-xl font-bold">{eur(total)}</p>
          </div>
          <div>
            <p className="flex items-center gap-2 text-sm"><span className="h-2 w-2 rounded-full bg-success" />Remaining</p>
            <p className={`text-xl font-bold ${budget.monthly - total >= 0 ? 'text-success' : 'text-danger'}`}>{eur(budget.monthly - total)}</p>
          </div>
        </div>
        <div className="mt-4 h-3 overflow-hidden rounded-full bg-brand-50">
          <div className="h-full rounded-full bg-brand" style={{ width: `${Math.min(100, used)}%` }} />
        </div>
        <p className="mt-2 text-xs text-muted">{pct(used)} of budget used</p>
      </section>

      <section className="card p-6">
        <h2 className="mb-5 text-base font-bold">Category Budgets</h2>
        <ul className="space-y-5">
          {categories.map((c) => {
            const spent = byCategory.find((b) => b.name === c.name)?.amount ?? 0;
            const limit = budget.categories[c.name];
            const p = limit ? (spent / limit) * 100 : 0;
            return (
              <li key={c.name} className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <CategoryIcon name={c.name} />
                <span className="w-28 text-sm font-medium">{c.name}</span>
                <span className="w-24 text-sm">{eur(limit)}</span>
                <div className="min-w-[180px] flex-1">
                  <div className="mb-1 flex justify-between text-xs font-medium">
                    <span>{eur(spent)}</span>
                    <span className={p > 100 ? 'text-danger' : ''}>{pct(p)}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-brand-50">
                    <div className="h-full rounded-full" style={{ width: `${Math.min(100, p)}%`, background: p > 100 ? '#E5484D' : c.color }} />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
      {editing && <BudgetModal onClose={() => setEditing(false)} />}
    </>
  );
}
