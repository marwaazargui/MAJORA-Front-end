const eurFmt = new Intl.NumberFormat('en-IE', { style: 'currency', currency: 'EUR' });
export const eur = (n: number) => eurFmt.format(n);
export const pct = (n: number) => `${n.toFixed(1)}%`;

export function formatDate(iso: string) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
}
export function monthLabel(m: string) {
  const [y, mo] = m.split('-').map(Number);
  return new Date(y, mo - 1, 1).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}
export function monthShort(m: string) {
  const [y, mo] = m.split('-').map(Number);
  return new Date(y, mo - 1, 1).toLocaleDateString('en-US', { month: 'short' });
}
export function prevMonth(m: string) {
  const [y, mo] = m.split('-').map(Number);
  const d = new Date(y, mo - 2, 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}
export const MONTHS = Array.from({ length: 11 }, (_, i) => `2026-${String(11 - i).padStart(2, '0')}`);
