export interface Bar { label: string; value: number; color: string }

export default function BarChart({ data, step, height = 190 }: { data: Bar[]; step: number; height?: number }) {
  const top = Math.max(step, Math.ceil(Math.max(...data.map((d) => d.value), 0) / step) * step);
  const ticks: number[] = [];
  for (let v = 0; v <= top; v += step) ticks.push(v);

  return (
    <div>
      <div className="flex">
        <div className="relative w-10 shrink-0" style={{ height }}>
          {ticks.map((v) => (
            <span key={v} className="absolute right-2 translate-y-1/2 text-[11px] text-muted" style={{ bottom: `${(v / top) * 100}%` }}>{v}</span>
          ))}
        </div>
        <div className="relative flex-1" style={{ height }}>
          {ticks.map((v) => (
            <div key={v} className="absolute inset-x-0 border-t border-line" style={{ bottom: `${(v / top) * 100}%` }} />
          ))}
          <div className="absolute inset-0 flex px-1">
            {data.map((d) => (
              <div key={d.label} className="flex h-full flex-1 items-end justify-center">
                <div className="w-3/5 max-w-[44px] rounded-t-md" title={`${d.label}: ${d.value.toFixed(2)}`}
                  style={{ height: `${(d.value / top) * 100}%`, background: d.color }} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="ml-10 flex px-1 pt-2">
        {data.map((d) => (
          <span key={d.label} className="flex-1 truncate text-center text-[11px] text-muted">{d.label}</span>
        ))}
      </div>
    </div>
  );
}
