export const initialMembers = [
  { id: "m1", name: "Rajani", email: "rajani@example.com", color: "#7667e8", initials: "RA" },
  { id: "m2", name: "Aarav", email: "aarav@example.com", color: "#e78c64", initials: "AA" },
  { id: "m3", name: "Priya", email: "priya@example.com", color: "#36a78b", initials: "PR" },
  { id: "m4", name: "Rohan", email: "rohan@example.com", color: "#d66c9b", initials: "RO" }
];

const daysAgo = (days) => new Date(Date.now() - days * 86400000).toISOString();

export const initialExpenses = [
  { id: "e1", title: "Dinner at The Garden", category: "Food & drinks", amount: 2400, paidBy: "m1", participants: ["m1", "m2", "m3", "m4"], date: daysAgo(0), note: "Weekend dinner" },
  { id: "e2", title: "Cab to the station", category: "Transport", amount: 680, paidBy: "m2", participants: ["m1", "m2", "m3"], date: daysAgo(1), note: "" },
  { id: "e3", title: "Grocery shopping", category: "Groceries", amount: 1850, paidBy: "m3", participants: ["m1", "m2", "m3", "m4"], date: daysAgo(2), note: "Weekly essentials" },
  { id: "e4", title: "Movie tickets", category: "Entertainment", amount: 960, paidBy: "m4", participants: ["m1", "m4"], date: daysAgo(4), note: "" }
];

export const initialSettlements = [];
