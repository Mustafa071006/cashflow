import clsx from "clsx";

import Card from "@/components/ui/Card";

function StatCard({ title, value, subtitle, icon: Icon, variant = "default", className }) {
  const iconStyle = {
    balance: `
      bg-blue-100
      text-blue-600

      dark:bg-blue-500/20
      dark:text-blue-400
    `,

    income: `
      bg-green-100
      text-green-600

      dark:bg-green-500/20
      dark:text-green-400
    `,

    expense: `
      bg-red-100
      text-red-600

      dark:bg-red-500/20
      dark:text-red-400
    `,

    default: `
      bg-indigo-100
      text-indigo-600

      dark:bg-indigo-500/20
      dark:text-indigo-400
    `,
  };

  return (
    <Card
      hover

      className={clsx(
        `group transition-all duration-300 hover:-translate-y-1`,

        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{title}</p>

          {/* VALUE */}

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            {value}
          </h2>

          <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">{subtitle}</p>
        </div>

        {Icon && (
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110 sm:h-14 sm:w-14 ${iconStyle[variant]} `}
          >
            <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
        )}
      </div>
    </Card>
  );
}

export default StatCard;
