function Skeleton({ className = "" }) {
  return (
    <div
      role="presentation"
      aria-hidden="true"
      className={`relative overflow-hidden rounded-nav bg-carbon ${className}`}
    >
      <span className="animate-shimmer absolute inset-0" />
    </div>
  );
}

export default Skeleton;
