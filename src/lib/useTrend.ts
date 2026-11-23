import { useExpenses } from '../context/ExpenseContext';
import { trends } from '../data';
import { monthShort } from './format';

/** Last 6 months up to the selected month. Live transactions win over the fake trend file. */
export function useTrend() {
  const { month, totalFor } = useExpenses();
  const upto = trends.filter((t) => t.month <= month).slice(-6);
  return upto.map((t, i) => {
    const live = totalFor(t.month);
    return {
      month: t.month,
      label: monthShort(t.month),
      value: live > 0 ? live : t.total,
      color: i === upto.length - 1 ? '#6D3BE6' : '#DDD2FB',
    };
  });
}
