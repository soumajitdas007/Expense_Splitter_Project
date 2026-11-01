import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ReceiptText } from "lucide-react";

export default function AddExpense({ members, addExpense }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food & drinks");
  const [paidBy, setPaidBy] = useState(members[0]?.id || "");
  const [participants, setParticipants] = useState(members.map((m)=>m.id));
  const [date, setDate] = useState(new Date().toISOString().slice(0,10));
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const togglePerson = (id) => setParticipants((old) => old.includes(id) ? old.filter((x)=>x!==id) : [...old,id]);
  const submit = (e) => {
    e.preventDefault();
    if (!title.trim() || Number(amount) <= 0 || !Number.isFinite(Number(amount))) return setError("Enter a description and a valid amount greater than zero.");
    if (!participants.length) return setError("Select at least one person to split this expense.");
    if (!participants.includes(paidBy)) return setError("The payer must be included in the split.");
    addExpense({ id: crypto.randomUUID(), title: title.trim(), amount: Number(amount), category, paidBy, participants, date: new Date(`${date}T12:00:00`).toISOString(), note });
  };
  return <div className="page-stack form-page"><button className="back-link" onClick={()=>navigate(-1)}><ArrowLeft size={16}/> Back</button><div className="form-heading"><span className="form-heading-icon"><ReceiptText/></span><div><h2>Add a new expense</h2><p>Record a payment and split it with your people.</p></div></div>
    <form className="panel expense-form" onSubmit={submit}>
      <div className="form-grid"><label className="field field-wide">What was it for?<input autoFocus value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="e.g. Dinner at the new cafe" /></label>
        <label className="field">Amount (₹)<div className="amount-input"><span>₹</span><input type="number" min="1" step="0.01" value={amount} onChange={(e)=>setAmount(e.target.value)} placeholder="0.00"/></div></label>
        <label className="field">Category<select value={category} onChange={(e)=>setCategory(e.target.value)}>{["Food & drinks","Transport","Groceries","Entertainment","Shopping","Utilities","Other"].map((c)=><option key={c}>{c}</option>)}</select></label>
        <label className="field">Paid by<select value={paidBy} onChange={(e)=>setPaidBy(e.target.value)}>{members.map((m)=><option value={m.id} key={m.id}>{m.name}</option>)}</select></label>
        <label className="field">Date<input type="date" value={date} onChange={(e)=>setDate(e.target.value)}/></label>
        <label className="field field-wide">Note (optional)<textarea rows="2" value={note} onChange={(e)=>setNote(e.target.value)} placeholder="Add a little more detail..."/></label>
      </div>
      <div className="split-section"><div><h3>Split between</h3><p>Choose everyone who shares this expense.</p></div><span className="selected-count">{participants.length} selected</span></div>
      <div className="member-select-grid">{members.map((m)=><label className={`member-check ${participants.includes(m.id)?"selected":""}`} key={m.id}><input type="checkbox" checked={participants.includes(m.id)} onChange={()=>togglePerson(m.id)}/><span className="check-avatar" style={{background:m.color}}>{m.initials}</span><span>{m.name}</span><i>{participants.includes(m.id)?"✓":"+"}</i></label>)}</div>
      {amount && participants.length>0 && <div className="split-preview"><span>Each person's share</span><strong>₹{(Number(amount)/participants.length).toLocaleString("en-IN",{maximumFractionDigits:2})}</strong></div>}
      {error && <p className="form-error">{error}</p>}
      <div className="form-actions"><button type="button" className="button button-ghost" onClick={()=>navigate(-1)}>Cancel</button><button className="button button-primary" type="submit">Save expense</button></div>
    </form>
  </div>;
}