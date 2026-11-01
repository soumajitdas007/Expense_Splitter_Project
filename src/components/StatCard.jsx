import { ArrowDownLeft, ArrowUpRight, Wallet, ReceiptText } from "lucide-react";

const icons = { wallet: Wallet, receive: ArrowDownLeft, owe: ArrowUpRight, receipt: ReceiptText };

export default function StatCard({ title, value, helper, type = "wallet", tone = "purple" }) {
  const Icon = icons[type] || Wallet;
  return (
    <article className="stat-card">
      <div className={`stat-icon ${tone}`}><Icon size={19} /></div>
      <p className="stat-title">{title}</p>
      <h3>{value}</h3>
      <span className="stat-helper">{helper}</span>
    </article>
  );
}