import categoriesJson from './categories.json';
import transactionsJson from './transactions.json';
import budgetJson from './budget.json';
import trendsJson from './trends.json';
import type { BudgetData, Category, Transaction, TrendPoint } from '../types';

export const categories = categoriesJson as Category[];
export const initialTransactions = transactionsJson as Transaction[];
export const initialBudget = budgetJson as BudgetData;
export const trends = trendsJson as TrendPoint[];
