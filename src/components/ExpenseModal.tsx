import { FormEvent, useState } from 'react';
import Modal, { Field } from './Modal';
import { categories } from '../data';
import { useExpenses } from '../context/ExpenseContext';
import type { CategoryName, Transaction } from '../types';

export default function ExpenseModal({ editing, onClose }: { editing?: Transaction | null; onClose: () => void }) {
  const { addTx, updateTx, month } = useExpenses();
  const [description, setDescription] = useState(editing?.description ?? '');
  const [amount, setAmount] = useState(editing ? String(editing.amount) : '');
  const [category, setCategory] = useState<CategoryName>(editing?.category ?? 'Food');
  const [date, setDate] = useState(editing?.date ?? (month === '2026-11' ? '2026-11-23' : `${month}-01`));
  const [errors, setErrors] = useState<Record<string, string>>({});

  function submit(e: FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    const value = parseFloat(amount);
    if (!description.trim()) errs.description = 'Enter a description.';
    if (!(value > 0)) errs.amount = 'Enter an amount greater than 0.';
    if (!date) errs.date = 'Pick a date.';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    const data = { description: description.trim(), amount: Math.round(value * 100) / 100, category, date };
    if (editing) updateTx({ ...data, id: editing.id });
    else addTx(data);
    onClose();
  }

  return (
    <Modal title={editing ? 'Edit expense' : 'Add expense'} onClose={onClose}>
      <form onSubmit={submit} noValidate>
        <Field label="Description" error={errors.description}>
          <input className="field" autoFocus value={description} onChange={(e) => setDescription(e.target.value)} placeholder="e.g. Lunch at cafe" />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Amount (€)" error={errors.amount}>
            <input className="field" type="number" step="0.01" min="0" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" />
          </Field>
          <Field label="Date" error={errors.date}>
            <input className="field" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </Field>
        </div>
        <Field label="Category">
          <select className="field" value={category} onChange={(e) => setCategory(e.target.value as CategoryName)}>
            {categories.map((c) => <option key={c.name}>{c.name}</option>)}
          </select>
        </Field>
        <div className="mt-2 flex justify-end gap-3">
          <button type="button" className="btn-outline" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn-primary">{editing ? 'Save changes' : 'Add expense'}</button>
        </div>
      </form>
    </Modal>
  );
}
