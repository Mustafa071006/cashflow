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
        <h2 className="font-display text-product-label font-semibold text-porcelain">
          {t.dashboard.quickActions}
        </h2>

        <p className="mt-1 text-body text-ash">
          {t.dashboard.quickActionsSubtitle}
        </p>
      </div>

      {/* ACTION GRID */}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Button
              key={action.key}

              variant="ghost"

              onClick={() => navigate(action.path)}

              className="flex h-auto flex-row items-center justify-start gap-4 rounded-card bg-obsidian px-5 py-4 hover:bg-obsidian/60 sm:flex-col sm:justify-center sm:py-6"
            >
              {/* ICON */}

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-carbon">
                <Icon size={20} strokeWidth={1.75} className="text-porcelain" />
              </div>

              {/* TEXT */}

              <span className="text-body font-medium text-porcelain">
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
