import { eur, pct } from '../lib/format';
import type { CategoryTotal } from '../types';

export default function CategoryLegend({ data }: { data: CategoryTotal[] }) {
  return (
    <ul className="flex-1 space-y-2.5 text-sm">
      {data.map((d) => (
        <li key={d.name} className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-sm" style={{ background: d.color }} />
          <span className="flex-1">{d.name}</span>
          <span className="w-20 text-right font-medium">{eur(d.amount)}</span>
          <span className="w-14 text-right text-muted">{pct(d.pct)}</span>
        </li>
      ))}
    </ul>
  );
}
