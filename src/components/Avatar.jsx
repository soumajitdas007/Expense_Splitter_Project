export default function Avatar({ member, size = "md" }) {
  return (
    <span className={`avatar avatar-${size}`} style={{ background: member?.color || "#9ca3af" }}>
      {member?.initials || member?.name?.slice(0, 2).toUpperCase() || "?"}
    </span>
  );
}