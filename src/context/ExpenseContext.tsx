import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import { categories, initialBudget, initialTransactions } from '../data';
import type { BudgetData, CategoryTotal, Transaction } from '../types';

interface Ctx {
  month: string;
  setMonth: (m: string) => void;
  transactions: Transaction[];
  monthTx: Transaction[];
  total: number;
  byCategory: CategoryTotal[];
  budget: BudgetData;
  setBudget: (b: BudgetData) => void;
  totalFor: (month: string) => number;
  addTx: (t: Omit<Transaction, 'id'>) => void;
  updateTx: (t: Transaction) => void;
  deleteTx: (id: string) => void;
}

const ExpenseContext = createContext<Ctx | null>(null);

export function ExpenseProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [budget, setBudget] = useState<BudgetData>(initialBudget);
  const [month, setMonth] = useState('2026-11');

  const monthTx = useMemo(
    () =>
      transactions
        .filter((t) => t.date.startsWith(month))
        .sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id)),
    [transactions, month],
  );
  const total = useMemo(() => monthTx.reduce((s, t) => s + t.amount, 0), [monthTx]);
  const byCategory = useMemo<CategoryTotal[]>(
    () =>
      categories.map((c) => {
        const amount = monthTx.filter((t) => t.category === c.name).reduce((s, t) => s + t.amount, 0);
        return { name: c.name, amount, pct: total ? (amount / total) * 100 : 0, color: c.color };
      }),
    [monthTx, total],
  );
  const totalFor = useCallback(
    (m: string) => transactions.filter((t) => t.date.startsWith(m)).reduce((s, t) => s + t.amount, 0),
    [transactions],
  );

  const value: Ctx = {
    month, setMonth, transactions, monthTx, total, byCategory, budget, setBudget, totalFor,
    addTx: (t) => {
      setTransactions((p) => [...p, { ...t, id: crypto.randomUUID() }]);
      setMonth(t.date.slice(0, 7));
    },
    updateTx: (t) => {
      setTransactions((p) => p.map((x) => (x.id === t.id ? t : x)));
      setMonth(t.date.slice(0, 7));
    },
    deleteTx: (id) => setTransactions((p) => p.filter((x) => x.id !== id)),
  };
  return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>;
}

export function useExpenses() {
  const ctx = useContext(ExpenseContext);
  if (!ctx) throw new Error('useExpenses must be used inside ExpenseProvider');
  return ctx;
}
