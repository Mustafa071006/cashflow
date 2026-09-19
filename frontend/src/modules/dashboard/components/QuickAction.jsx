import { Plus, Wallet, ArrowLeftRight, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button/Button";
import { useLanguage } from "@/contexts/LanguageContext";
import en from "@/locales/en";
import id from "@/locales/id";

const actions = [
  {
    key: "addIncome",
    path: "/transactions",
    icon: Plus,
  },

  {
    key: "transfer",
    path: "/transactions",
    icon: ArrowLeftRight,
  },

  {
    key: "wallet",
    path: "/wallet",
    icon: Wallet,
  },

  {
    key: "reports",
    path: "/reports",
    icon: BarChart3,
  },
];

function QuickAction() {
  const navigate = useNavigate();

  const { language } = useLanguage();

  const t = language === "id" ? id : en;

  return (
    <Card>
      {/* HEADER */}

      <div className="mb-6">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
          {t.dashboard.quickActions}
        </h2>

        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          {t.dashboard.quickActionsSubtitle}
        </p>
      </div>

      {/* ACTION GRID */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Button
              key={action.key}

              variant="secondary"

              onClick={() => navigate(action.path)}

              className="flex h-auto flex-row items-center justify-start gap-4 rounded-2xl px-5 py-4 transition-all duration-300 hover:-translate-y-1 sm:flex-col sm:justify-center sm:py-6 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800"
            >
              {/* ICON */}

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800">
                <Icon
                  size={24}

                  className="text-zinc-900 dark:text-zinc-100"
                />
              </div>

              {/* TEXT */}

              <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {t.dashboard[action.key]}
              </span>
            </Button>
          );
        })}
      </div>
    </Card>
  );
}

export default QuickAction;
