import { NavLink } from 'react-router-dom';
import { BarChart3, FileText, LayoutDashboard, ListChecks, Settings, Wallet, WalletCards } from 'lucide-react';

const links = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/transactions', label: 'Transactions', icon: ListChecks },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/budget', label: 'Budget', icon: Wallet },
  { to: '/reports', label: 'Reports', icon: FileText },
];

export default function Sidebar() {
  return (
    <aside className="sticky top-0 flex h-screen w-16 shrink-0 flex-col border-r border-line bg-[#FBFBFE] px-3 py-6 lg:w-60 lg:px-4">
      <div className="mb-8 flex items-center gap-3 px-1">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand text-white shadow-btn">
          <WalletCards size={20} />
        </span>
        <span className="hidden text-base font-bold leading-tight lg:block">Expense<br />Tracker</span>
      </div>
      <nav className="flex flex-1 flex-col gap-1">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} end={to === '/'} title={label}
            className={({ isActive }) =>
              `flex items-center justify-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition lg:justify-start ${
                isActive ? 'bg-brand text-white shadow-btn' : 'text-ink hover:bg-brand-50'
              }`}>
            <Icon size={18} />
            <span className="hidden lg:inline">{label}</span>
          </NavLink>
        ))}
      </nav>
      <button title="Settings" className="flex items-center justify-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-brand-50 lg:justify-start">
        <Settings size={18} />
        <span className="hidden lg:inline">Settings</span>
      </button>
    </aside>
  );
}
