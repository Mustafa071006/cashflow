function SummaryCard({ title, value, icon: Icon, color = "text-electric-link" }) {
  return (
    <div className="rounded-card bg-carbon p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-body text-ash">{title}</p>

          <h3 className="mt-3 font-display text-feature-stat font-semibold text-porcelain">{value}</h3>
        </div>

        <div className={`flex h-11 w-11 items-center justify-center rounded-full bg-obsidian ${color}`}>
          {Icon && <Icon size={20} />}
        </div>
      </div>
    </div>
  );
}

export default SummaryCard;
