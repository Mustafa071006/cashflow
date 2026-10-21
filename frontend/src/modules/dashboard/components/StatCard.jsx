import clsx from "clsx";

import Card from "@/components/ui/Card";

function StatCard({ title, value, subtitle, icon: Icon, variant = "default", className }) {
  const iconStyle = {
    balance: `text-electric-link`,

    income: `text-income`,

    expense: `text-expense`,

    default: `text-porcelain`,
  };

  return (
    <Card hover className={clsx(`group`, className)}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-body text-ash">{title}</p>

          {/* VALUE */}

          <h2 className="mt-3 truncate font-display text-feature-stat font-semibold text-porcelain">
            {value}
          </h2>

          <p className="mt-3 text-body text-ash">{subtitle}</p>
        </div>

        {Icon && (
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-obsidian ${iconStyle[variant]}`}
          >
            <Icon size={20} strokeWidth={1.75} />
          </div>
        )}
      </div>
    </Card>
  );
}

export default StatCard;
