import { ReactNode } from 'react';

export default function StatCard({ icon, tint, label, value, valueClass = '', footer }: {
  icon: ReactNode; tint: string; label: string; value: string; valueClass?: string; footer?: ReactNode;
}) {
  return (
    <div className="card p-5">
      <span className={`mb-3 flex h-9 w-9 items-center justify-center rounded-lg ${tint}`}>{icon}</span>
      <p className="text-sm text-muted">{label}</p>
      <p className={`mt-1 text-2xl font-bold ${valueClass}`}>{value}</p>
      {footer}
    </div>
  );
}
