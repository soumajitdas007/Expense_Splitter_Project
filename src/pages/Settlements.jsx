import { useState } from "react";
import { Check, ArrowRightLeft, CheckCircle2 } from "lucide-react";
import Avatar from "../components/Avatar.jsx";
import { currency, formatDate } from "../utils/expenseUtils.js";

export default function Settlements({ members, debts, settleDebt, settlements }) {
  const [done, setDone] = useState("");
  const markPaid = (debt) => { settleDebt(debt); setDone(`${members.find(m=>m.id===debt.from)?.name} paid ${members.find(m=>m.id===debt.to)?.name} ${currency(debt.amount)}.`); setTimeout(()=>setDone(""),3500); };
  return <div className="page-stack"><section className="page-intro"><div><h2>Settle up</h2><p>Clear balances and keep your group in sync.</p></div><span className="mini-pill">{debts.length} pending</span></section>
    {done&&<div className="success-banner"><CheckCircle2 size={18}/>{done}</div>}
    <section className="panel settlement-panel"><div className="panel-heading"><div><h3>Suggested payments</h3><p>A simplified list of who should pay whom.</p></div><span className="mini-pill">{debts.length} transfers</span></div>
      {debts.length ? <div className="settlement-list">{debts.map((d,i)=>{const from=members.find(m=>m.id===d.from);const to=members.find(m=>m.id===d.to);return <div className="settlement-row" key={`${d.from}-${d.to}-${i}`}><div className="settlement-person"><Avatar member={from}/><div><strong>{from?.name}</strong><span>pays</span></div></div><div className="settlement-middle"><ArrowRightLeft size={17}/><strong>{currency(d.amount)}</strong></div><div className="settlement-person"><Avatar member={to}/><div><strong>{to?.name}</strong><span>receives</span></div></div><button className="button button-small button-success" onClick={()=>markPaid(d)}><Check size={15}/> Mark paid</button></div>})}</div> : <div className="all-set settlement-done"><span>✓</span><strong>You're all settled up!</strong><p>No payments are currently needed.</p></div>}
    </section>
    <section className="panel history-panel"><div className="panel-heading"><div><h3>Settlement history</h3><p>Payments you've marked as complete.</p></div></div>{settlements.length ? settlements.slice().reverse().map(s=><div className="history-row" key={s.id}><CheckCircle2 size={18}/><span><strong>{members.find(m=>m.id===s.from)?.name}</strong> paid <strong>{members.find(m=>m.id===s.to)?.name}</strong></span><b>{currency(s.amount)}</b><small>{formatDate(s.date)}</small></div>) : <p className="muted-empty">Completed settlements will appear here.</p>}</section>
  </div>;
}