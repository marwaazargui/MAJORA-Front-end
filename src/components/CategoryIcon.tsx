import { Film, FileText, MoreHorizontal, ShoppingBag, Bus, Utensils } from 'lucide-react';
import { categories } from '../data';
import type { CategoryName } from '../types';

const icons = { Food: Utensils, Transport: Bus, Shopping: ShoppingBag, Bills: FileText, Entertainment: Film, Others: MoreHorizontal };

export const getCategory = (name: CategoryName) => categories.find((c) => c.name === name)!;

export function CategoryIcon({ name }: { name: CategoryName }) {
  const Icon = icons[name];
  const c = getCategory(name);
  return (
    <span className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: c.tint, color: c.text }}>
      <Icon size={18} />
    </span>
  );
}

export function CategoryBadge({ name }: { name: CategoryName }) {
  const c = getCategory(name);
  return (
    <span className="inline-block rounded-md px-2.5 py-1 text-xs font-medium" style={{ background: c.tint, color: c.text }}>
      {name}
    </span>
  );
}
