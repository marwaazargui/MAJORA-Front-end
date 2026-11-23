import { eur } from '../lib/format';

export default function DonutChart({ data, total, size = 170 }: {
  data: { name: string; amount: number; color: string }[]; total: number; size?: number;
}) {
  const r = 70;
  const c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg viewBox="0 0 180 180" className="h-full w-full -rotate-90">
        <circle cx="90" cy="90" r={r} fill="none" stroke="#F1F0FA" strokeWidth="26" />
        {total > 0 &&
          data.map((d) => {
            const len = (d.amount / total) * c;
            const el = (
              <circle key={d.name} cx="90" cy="90" r={r} fill="none" stroke={d.color} strokeWidth="26"
                strokeDasharray={`${len} ${c - len}`} strokeDashoffset={-offset} />
            );
            offset += len;
            return el;
          })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-base font-bold">{eur(total)}</span>
        <span className="text-xs text-muted">Total</span>
      </div>
    </div>
  );
}
