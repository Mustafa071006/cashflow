function ChartCard({ title, subtitle, children }) {
  return (
    <div className="rounded-card bg-carbon p-6">
      <div className="mb-6">
        <h2 className="font-display text-product-label font-semibold text-porcelain">{title}</h2>

        {subtitle && <p className="mt-1 text-body text-ash">{subtitle}</p>}
      </div>

      <div className="h-80">{children}</div>
    </div>
  );
}

export default ChartCard;
