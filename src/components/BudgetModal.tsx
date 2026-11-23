import { FormEvent, useState } from 'react';
import Modal, { Field } from './Modal';
import { categories } from '../data';
import { useExpenses } from '../context/ExpenseContext';
import type { BudgetData, CategoryName } from '../types';

export default function BudgetModal({ onClose }: { onClose: () => void }) {
  const { budget, setBudget } = useExpenses();
  const [monthly, setMonthly] = useState(String(budget.monthly));
  const [cats, setCats] = useState<Record<CategoryName, string>>(
    Object.fromEntries(Object.entries(budget.categories).map(([k, v]) => [k, String(v)])) as Record<CategoryName, string>,
  );
  const [error, setError] = useState('');

  function submit(e: FormEvent) {
    e.preventDefault();
    const m = parseFloat(monthly);
    const parsed = Object.fromEntries(categories.map((c) => [c.name, parseFloat(cats[c.name]) || 0])) as BudgetData['categories'];
    if (!(m > 0)) return setError('Enter a monthly budget greater than 0.');
    setBudget({ monthly: m, categories: parsed });
    onClose();
  }

  return (
    <Modal title="Edit budget" onClose={onClose}>
      <form onSubmit={submit} noValidate>
        <Field label="Monthly budget (€)" error={error}>
          <input className="field" autoFocus type="number" min="0" step="1" value={monthly} onChange={(e) => setMonthly(e.target.value)} />
        </Field>
        <p className="mb-2 text-sm font-medium">Category budgets (€)</p>
        <div className="mb-4 grid grid-cols-2 gap-3">
          {categories.map((c) => (
            <label key={c.name} className="block">
              <span className="mb-1 block text-xs text-muted">{c.name}</span>
              <input className="field" type="number" min="0" step="1" value={cats[c.name]} onChange={(e) => setCats({ ...cats, [c.name]: e.target.value })} />
            </label>
          ))}
        </div>
        <div className="flex justify-end gap-3">
          <button type="button" className="btn-outline" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn-primary">Save budget</button>
        </div>
      </form>
    </Modal>
  );
}
