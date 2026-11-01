import { useState } from "react";
import { Plus, Users, Mail } from "lucide-react";
import Avatar from "../components/Avatar.jsx";
import Modal from "../components/Modal.jsx";
import { currency } from "../utils/expenseUtils.js";

export default function Groups({ members, addMember, balances }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const colors = ["#7667e8","#e78c64","#36a78b","#d66c9b","#4f91d3","#c18b40"];
  const submit = (e) => {
    e.preventDefault();
    if (!name.trim()) return setError("Please enter a name.");
    if (members.some((m)=>m.email.toLowerCase()===email.trim().toLowerCase() && email.trim())) return setError("This email is already in your group.");
    const initials = name.trim().split(/\s+/).slice(0,2).map((x)=>x[0]).join("").toUpperCase();
    addMember({id:crypto.randomUUID(), name:name.trim(), email:email.trim() || "No email added", initials, color:colors[members.length%colors.length]});
    setName("");setEmail("");setError("");setOpen(false);
  };
  return <div className="page-stack"><section className="page-intro"><div><h2>Groups & people</h2><p>Your expense circle and the people you share with.</p></div><button className="button button-primary" onClick={()=>setOpen(true)}><Plus size={17}/> Add person</button></section>
    <div className="group-banner"><div className="group-banner-icon"><Users size={23}/></div><div><span>YOUR CIRCLE</span><h2>Friends & everyday life</h2><p>{members.length} members · Shared expenses</p></div><div className="banner-avatars">{members.slice(0,5).map(m=><Avatar key={m.id} member={m} size="sm"/>)}</div></div>
    <section className="member-grid">{members.map((m)=><article className="member-card panel" key={m.id}><div className="member-card-top"><Avatar member={m} size="lg"/><span className="member-status">Active</span></div><h3>{m.name}</h3><p className="member-email"><Mail size={14}/>{m.email}</p><div className="member-balance"><span>Net balance</span><strong className={(balances[m.id]||0)>=0?"positive":"negative"}>{(balances[m.id]||0)>=0?"+":""}{currency(balances[m.id]||0)}</strong></div></article>)}</section>
    {open && <Modal title="Add a person" onClose={()=>setOpen(false)}><form className="modal-form" onSubmit={submit}><label className="field">Full name<input value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Ananya Sharma"/></label><label className="field">Email address (optional)<input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="ananya@example.com"/></label>{error&&<p className="form-error">{error}</p>}<button className="button button-primary button-full">Add to your circle</button></form></Modal>}
  </div>;
}