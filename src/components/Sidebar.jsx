import { NavLink } from "react-router-dom";
import { LayoutDashboard, ReceiptText, Users, ArrowLeftRight, Wallet, X } from "lucide-react";

const links = [
  { to: "/", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/expenses", label: "All expenses", icon: ReceiptText },
  { to: "/groups", label: "Groups & people", icon: Users },
  { to: "/settlements", label: "Settlements", icon: ArrowLeftRight }
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && <button className="sidebar-scrim" aria-label="Close menu" onClick={onClose} />}
      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="brand"><span className="brand-mark"><Wallet size={20} /></span><span>split<span className="brand-light">wise</span></span><button className="mobile-close icon-button" onClick={onClose}><X /></button></div>
        <p className="nav-label">WORKSPACE</p>
        <nav>{links.map(({ to, label, icon: Icon, end }) => <NavLink key={to} to={to} end={end} onClick={onClose} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}><Icon size={18} /><span>{label}</span></NavLink>)}</nav>
        {/* <div className="sidebar-bottom"><div className="help-card"><div className="help-bubble">✦</div><strong>Keep things fair.</strong><p>Track shared costs and settle up without the awkward maths.</p></div><div className="sidebar-foot">SHARED EXPENSES, SIMPLIFIED</div></div> */}
      </aside>
    </>
  );
}