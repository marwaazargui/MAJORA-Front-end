export type CategoryName = 'Food' | 'Transport' | 'Shopping' | 'Bills' | 'Entertainment' | 'Others';

export interface Category { name: CategoryName; color: string; tint: string; text: string }
export interface Transaction { id: string; date: string; description: string; category: CategoryName; amount: number }
export interface BudgetData { monthly: number; categories: Record<CategoryName, number> }
export interface TrendPoint { month: string; total: number }
export interface CategoryTotal { name: CategoryName; amount: number; pct: number; color: string }
