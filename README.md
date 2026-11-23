# Expense Tracker – Frontend

React + TypeScript + Vite + Tailwind CSS.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```

## Structure
- `src/data/*.json` – fake data (transactions, categories, budget, trends). Swap for API calls later.
- `src/context/ExpenseContext.tsx` – single store: month, transactions, budget, add/edit/delete.
- `src/pages` – Dashboard, Transactions, Analytics, Budget, Reports.
- `src/components` – Sidebar, modals (expense, budget, confirm delete), charts, shared UI.
