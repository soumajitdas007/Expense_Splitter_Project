import { Bell, Plus, Menu } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
const titles = { "/": "Overview", "/expenses": "All expenses", "/groups": "Groups & people", "/settlements": "Settlements" };
export default function Topbar({ onMenu }) {
  const location = useLocation();
  const navigate = useNavigate();
  return <header className="topbar"><div className="topbar-left"><button className="icon-button menu-button" onClick={onMenu}><Menu /></button><div><p className="eyebrow">YOUR SPACE</p><h1>{titles[location.pathname] || "Shared expenses"}</h1></div></div><div className="topbar-actions"><button className="icon-button notification-button" aria-label="Notifications"><Bell size={19} /><i /></button><button className="button button-primary" onClick={() => navigate("/add-expense")}><Plus size={17} /> Add expense</button></div></header>;
}