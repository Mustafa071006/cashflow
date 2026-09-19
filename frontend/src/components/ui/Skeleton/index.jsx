function Skeleton({ className = "" }) {
  return (
    <div
      role="presentation"
      aria-hidden="true"
      className={`relative overflow-hidden rounded-xl bg-zinc-200 dark:bg-zinc-800 ${className}`}
    >
      <span className="animate-shimmer absolute inset-0" />
    </div>
  );
}

export default Skeleton;
