import { ArrowUp, ArrowDown, Receipt, Target, TrendingDown, Wallet } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import DonutChart from '../components/DonutChart';
import CategoryLegend from '../components/CategoryLegend';
import BarChart from '../components/BarChart';
import { useExpenses } from '../context/ExpenseContext';
import { useTrend } from '../lib/useTrend';
import { eur, prevMonth } from '../lib/format';

export default function Dashboard() {
  const { total, monthTx, byCategory, budget, month, totalFor } = useExpenses();
  const trend = useTrend();
  const prev = totalFor(prevMonth(month));
  const change = prev > 0 ? ((total - prev) / prev) * 100 : null;
  const remaining = budget.monthly - total;

  return (
    <>
      <PageHeader title="Dashboard" subtitle="Overview of your expenses" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={<Wallet size={18} />} tint="bg-brand-50 text-brand" label="Total Expenses" value={eur(total)}
          footer={change !== null && (
            <p className={`mt-2 flex items-center gap-1 text-xs font-medium ${change >= 0 ? 'text-danger' : 'text-success'}`}>
              {change >= 0 ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
              {change >= 0 ? '+' : ''}{change.toFixed(0)}% from last month
            </p>
          )} />
        <StatCard icon={<Target size={18} />} tint="bg-brand-50 text-brand" label="Monthly Budget" value={eur(budget.monthly)} />
        <StatCard icon={<TrendingDown size={18} />} tint="bg-green-50 text-success" label="Remaining" value={eur(remaining)}
          valueClass={remaining >= 0 ? 'text-success' : 'text-danger'} />
        <StatCard icon={<Receipt size={18} />} tint="bg-brand-50 text-brand" label="Transactions" value={String(monthTx.length)} />
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.25fr_1fr]">
        <section className="card p-6">
          <h2 className="mb-5 text-base font-bold">Spending by Category</h2>
          <div className="flex flex-wrap items-center gap-6">
            <DonutChart data={byCategory} total={total} />
            <CategoryLegend data={byCategory} />
          </div>
        </section>
        <section className="card p-6">
          <h2 className="mb-5 text-base font-bold">Monthly Spending Trend</h2>
          <BarChart step={300} data={trend.map((t) => ({ label: t.label, value: t.value, color: t.color }))} />
        </section>
      </div>
    </>
  );
}
