import { ReactNode } from 'react';
import { CalendarDays, ChevronDown } from 'lucide-react';
import { useExpenses } from '../context/ExpenseContext';
import { MONTHS, monthLabel } from '../lib/format';

export function MonthSelect({ value, onChange }: { value: string; onChange: (m: string) => void }) {
  return (
    <div className="relative">
      <CalendarDays size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2" />
      <select aria-label="Month" value={value} onChange={(e) => onChange(e.target.value)}
        className="field cursor-pointer appearance-none py-2.5 pl-9 pr-9 font-medium">
        {MONTHS.map((m) => <option key={m} value={m}>{monthLabel(m)}</option>)}
      </select>
      <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
    </div>
  );
}

export default function PageHeader({ title, subtitle, action, showMonth = true }: {
  title: string; subtitle: string; action?: ReactNode; showMonth?: boolean;
}) {
  const { month, setMonth } = useExpenses();
  return (
    <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="mt-1 text-sm text-muted">{subtitle}</p>
      </div>
      <div className="no-print flex items-center gap-3">
        {showMonth && <MonthSelect value={month} onChange={setMonth} />}
        {action}
      </div>
    </header>
  );
}
