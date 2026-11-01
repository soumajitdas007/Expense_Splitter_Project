import { MoreHorizontal } from "lucide-react";
import Avatar from "./Avatar.jsx";
import { currency, formatDate, getCategoryIcon } from "../utils/expenseUtils.js";

export default function ExpenseItem({ expense, members, compact = false, onDelete }) {
  const payer = members.find((m) => m.id === expense.paidBy);
  const participants = expense.participants.map((id) => members.find((m) => m.id === id)).filter(Boolean);
  return (
    <div className="expense-row">
      <div className="category-icon">{getCategoryIcon(expense.category)}</div>
      <div className="expense-main">
        <strong>{expense.title}</strong>
        <span>Paid by {payer?.name || "Unknown"} · {formatDate(expense.date)}</span>
        {!compact && <div className="participant-stack">{participants.slice(0, 4).map((m) => <Avatar key={m.id} member={m} size="xs" />)}</div>}
      </div>
      <div className="expense-amount">
        <strong>{currency(expense.amount)}</strong>
        <span>{expense.category}</span>
      </div>
      {onDelete && <button className="icon-button row-more" title="Delete expense" onClick={() => onDelete(expense.id)}><MoreHorizontal size={19} /></button>}
    </div>
  );
}