# Shared Expense Splitter (React JS)

A responsive expense-sharing application built with React, Vite, React Router, hooks, reusable components, and browser LocalStorage.

## Features
- Dashboard with group spending, your net balance, recent activity, and simplified debts.
- Add expenses with payer, category, date, notes, and selected participants.
- Equal split calculation.
- Expense search and category filter.
- Add people to the expense circle.
- Suggested settlements and payment history.
- Data persists in LocalStorage after refresh.
- Responsive sidebar and layouts for mobile/tablet/desktop.

## Requirements
- Node.js 18 or later
- npm

## Run locally
```bash
npm install
npm run dev
```
Open the local URL printed by Vite (usually http://localhost:5173).

## Production build
```bash
npm run build
npm run preview
```

## Project structure
```text
src/
  components/     Reusable UI (Avatar, Sidebar, Topbar, cards, modal)
  data/           Initial sample data
  hooks/          LocalStorage hook
  pages/          Dashboard, expenses, add expense, people, settlements
  styles/         Global responsive styling
  utils/          Currency, balances, debt simplification, dates
  App.jsx         State ownership and routes
  main.jsx        React entry point
```

## React concepts used
- **Component architecture:** UI is split into focused reusable components.
- **JSX:** Components return JSX markup.
- **Props:** Parent pages pass expense/member data and callbacks to child components.
- **State and hooks:** `useState`, `useEffect`, and `useMemo` manage state, persistence, and derived values.
- **Array methods:** `map` renders lists; `filter` searches/removes; `reduce` totals expenses; `sort` orders activity; `Set` builds category options.
- **Routing:** React Router maps URLs to pages.
- **Styling:** Global CSS, component class names, conditional classes, CSS variables, and media queries.

## Expense calculation
Each expense is divided equally among the selected participants. The person who paid is credited with the full amount, and each participant is debited their share. A member's net balance is:

`amount paid - total personal shares`

Positive means they should receive money; negative means they owe money. The settlement page simplifies the net balances into suggested transfers.

## LocalStorage keys
- `splitwise-members`
- `splitwise-expenses`
- `splitwise-settlements`

To reset the sample app, clear these keys in browser DevTools → Application → Local Storage.

## Notes / limitations
- This is a frontend college/demo project. It does not include authentication, a server, or cloud sync.
- Splits are equal only; custom percentage/share splits are not implemented.
- Marking a suggested payment paid updates balances and adds a settlement history entry. For a real multi-user product, settlements should be verified by a backend.
- The demo starts with sample members and expenses so the dashboard is populated.
