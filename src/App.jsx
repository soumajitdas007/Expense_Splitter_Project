import { useMemo, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import Topbar from "./components/Topbar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Expenses from "./pages/Expenses.jsx";
import AddExpense from "./pages/AddExpense.jsx";
import Groups from "./pages/Groups.jsx";
import Settlements from "./pages/Settlements.jsx";
import useLocalStorage from "./hooks/useLocalStorage.js";
import { initialExpenses, initialMembers, initialSettlements } from "./data/initialData.js";
import { calculateBalances, simplifyDebts } from "./utils/expenseUtils.js";

export default function App() {
  const [members, setMembers] = useLocalStorage("splitwise-members", initialMembers);
  const [expenses, setExpenses] = useLocalStorage("splitwise-expenses", initialExpenses);
  const [settlements, setSettlements] = useLocalStorage("splitwise-settlements", initialSettlements);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const balances = useMemo(() => calculateBalances(members, expenses, settlements), [members, expenses, settlements]);
  const debts = useMemo(() => simplifyDebts(members, balances), [members, balances]);

  const addExpense = (expense) => { setExpenses((old) => [expense, ...old]); navigate("/expenses"); };
  const deleteExpense = (id) => setExpenses((old) => old.filter((e) => e.id !== id));
  const addMember = (member) => setMembers((old) => [...old, member]);
  const settleDebt = (debt) => {
    setSettlements((old) => [...old, { ...debt, id: crypto.randomUUID(), date: new Date().toISOString() }]);
  };

  const shared = { members, expenses, settlements, balances, debts, addExpense, deleteExpense, addMember, settleDebt };
  return <div className="app-shell"><Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} /><main className="main-area"><Topbar onMenu={() => setMenuOpen(true)} /><div className="page-content"><Routes>
    <Route path="/" element={<Dashboard {...shared} />} />
    <Route path="/expenses" element={<Expenses {...shared} />} />
    <Route path="/add-expense" element={<AddExpense {...shared} />} />
    <Route path="/groups" element={<Groups {...shared} />} />
    <Route path="/settlements" element={<Settlements {...shared} />} />
    <Route path="*" element={<Dashboard {...shared} />} />
  </Routes></div><footer className="footer">Made for sharing moments, not spreadsheets. <span>Splitwise · Personal expense tracker</span></footer></main></div>;
}