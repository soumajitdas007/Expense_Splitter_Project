import { useNavigate } from "react-router-dom";
import { ArrowRight, Plus, Sparkles } from "lucide-react";
import StatCard from "../components/StatCard.jsx";
import ExpenseItem from "../components/ExpenseItem.jsx";
import Avatar from "../components/Avatar.jsx";
import { currency, simplifyDebts } from "../utils/expenseUtils.js";

export default function Dashboard({ members, expenses, balances, debts, deleteExpense }) {
  const navigate = useNavigate();
  const me = members[0];
  const total = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  const owed = Math.max(0, balances[me?.id] || 0);
  const owe = Math.max(0, -(balances[me?.id] || 0));
  const monthExpenses = expenses.filter((e) => new Date(e.date).getMonth() === new Date().getMonth()).length;
  const recent = [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4);
  return <div className="page-stack">
    <section className="welcome-row"><div><div className="welcome-kicker"> YOUR FINANCIAL SNAPSHOT</div><h2>Good to see you, {me?.name || "there"}! </h2><p>Here’s what’s happening with your shared expenses.</p></div><button className="button button-dark" onClick={() => navigate("/add-expense")}><Plus size={17} /> Add an expense</button></section>
    <section className="stats-grid">
      <StatCard title="Total group spending" value={currency(total)} helper={`${expenses.length} expenses recorded`} type="wallet" tone="purple" />
      <StatCard title="You are owed" value={currency(owed)} helper="Your share to receive" type="receive" tone="green" />
      <StatCard title="You owe" value={currency(owe)} helper="Your pending share" type="owe" tone="orange" />
      <StatCard title="This month's activity" value={monthExpenses} helper="Expenses added this month" type="receipt" tone="blue" />
    </section>
    <section className="dashboard-grid">
      <div className="panel recent-panel"><div className="panel-heading"><div><h3>Recent expenses</h3><p>Your group's latest activity</p></div><button className="text-button" onClick={() => navigate("/expenses")}>View all <ArrowRight size={15} /></button></div>
        {recent.length ? <div className="expense-list">{recent.map((e) => <ExpenseItem key={e.id} expense={e} members={members} compact onDelete={deleteExpense} />)}</div> : <EmptyState text="No expenses yet. Add your first shared expense." />}
      </div>
      <div className="panel balance-panel"><div className="panel-heading"><div><h3>Balances</h3><p>Who owes whom</p></div><span className="mini-pill">{debts.length} open</span></div>
        {debts.length ? <div className="debt-list">{debts.slice(0, 5).map((d, i) => { const from = members.find((m) => m.id === d.from); const to = members.find((m) => m.id === d.to); return <div className="debt-row" key={`${d.from}-${d.to}-${i}`}><Avatar member={from} size="sm" /><div className="debt-copy"><strong>{from?.name}</strong><span>owes {to?.name}</span></div><b>{currency(d.amount)}</b></div>; })}</div> : <div className="all-set"><span>✓</span><strong>Everyone is settled up!</strong><p>There are no outstanding balances.</p></div>}
        <button className="panel-bottom-link" onClick={() => navigate("/settlements")}>Manage settlements <ArrowRight size={15} /></button>
      </div>
    </section>
    <section className="people-strip"><div><h3>Your people</h3><p>Everyone in your expense circle</p></div><div className="people-avatars">{members.map((m) => <div className="person-mini" key={m.id}><Avatar member={m} /><span>{m.name}</span></div>)}</div><button className="text-button" onClick={() => navigate("/groups")}>Manage people <ArrowRight size={15} /></button></section>
  </div>;
}
function EmptyState({ text }) { return <div className="empty-state"><span>🧾</span><p>{text}</p></div>; }