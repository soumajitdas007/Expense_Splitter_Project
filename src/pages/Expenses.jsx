import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, Trash2 } from "lucide-react";
import ExpenseItem from "../components/ExpenseItem.jsx";
import { currency } from "../utils/expenseUtils.js";

export default function Expenses({ members, expenses, deleteExpense }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All categories");
  const navigate = useNavigate();
  const categories = ["All categories", ...new Set(expenses.map((e) => e.category))];
  const filtered = useMemo(() => expenses.filter((e) => e.title.toLowerCase().includes(search.toLowerCase()) && (category === "All categories" || e.category === category)).sort((a,b) => new Date(b.date)-new Date(a.date)), [expenses, search, category]);
  const total = filtered.reduce((sum, e) => sum + Number(e.amount), 0);
  return <div className="page-stack"><section className="page-intro"><div><h2>All expenses</h2><p>Every shared cost, all in one place.</p></div><button className="button button-primary" onClick={() => navigate("/add-expense")}><Plus size={17}/> Add expense</button></section>
    <section className="panel"><div className="list-toolbar"><div className="search-box"><Search size={17}/><input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search expenses..." /></div><select value={category} onChange={(e)=>setCategory(e.target.value)}>{categories.map((c)=><option key={c}>{c}</option>)}</select><div className="list-total"><span>Filtered total</span><strong>{currency(total)}</strong></div></div>
      {filtered.length ? <div className="expense-list full-expense-list">{filtered.map((e)=><ExpenseItem key={e.id} expense={e} members={members} onDelete={deleteExpense}/>)}</div> : <div className="empty-state"><span>🔎</span><p>No expenses match your search.</p></div>}
    </section>
  </div>;
}