export const currency = (amount) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount || 0);

export function calculateBalances(members, expenses, settlements = []) {
  const balances = Object.fromEntries(members.map((m) => [m.id, 0]));

  expenses.forEach((expense) => {
    const people = expense.participants || [];
    if (!people.length) return;
    const share = expense.amount / people.length;
    if (balances[expense.paidBy] !== undefined) balances[expense.paidBy] += expense.amount;
    people.forEach((id) => {
      if (balances[id] !== undefined) balances[id] -= share;
    });
  });

  settlements.forEach((s) => {
    if (balances[s.from] !== undefined) balances[s.from] += s.amount;
    if (balances[s.to] !== undefined) balances[s.to] -= s.amount;
  });
  return balances;
}

export function simplifyDebts(members, balances) {
  const debtors = [];
  const creditors = [];
  members.forEach((m) => {
    const value = balances[m.id] || 0;
    if (value < -0.01) debtors.push({ id: m.id, amount: -value });
    if (value > 0.01) creditors.push({ id: m.id, amount: value });
  });
  const result = [];
  let i = 0, j = 0;
  while (i < debtors.length && j < creditors.length) {
    const amount = Math.min(debtors[i].amount, creditors[j].amount);
    if (amount > 0.01) result.push({ from: debtors[i].id, to: creditors[j].id, amount });
    debtors[i].amount -= amount;
    creditors[j].amount -= amount;
    if (debtors[i].amount < 0.01) i++;
    if (creditors[j].amount < 0.01) j++;
  }
  return result;
}

export const formatDate = (date) =>
  new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" }).format(new Date(date));

export const getCategoryIcon = (category) => ({
  "Food & drinks": "🍜", Transport: "🚕", Groceries: "🛒",
  Entertainment: "🎬", Shopping: "🛍️", Utilities: "💡", Other: "🧾"
}[category] || "🧾");