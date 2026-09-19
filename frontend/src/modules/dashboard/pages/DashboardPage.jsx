import DashboardHeader from "../components/DashboardHeader";
import OverviewCards from "../components/OverviewCards";
import RecentTransaction from "../components/RecentTransaction";
import QuickAction from "../components/QuickAction";
import CashFlowChart from "@/components/charts/CashFlowChart";
import Skeleton from "@/components/ui/Skeleton";

import useDashboard from "../hooks/useDashboard";
import { useLanguage } from "@/contexts/LanguageContext";

function DashboardSkeleton({ label }) {
  return (
    <div role="status" aria-live="polite" aria-label={label} className="space-y-8">
      <span className="sr-only">{label}…</span>

      <Skeleton className="h-9 w-56" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
      </div>

      <Skeleton className="h-96" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <Skeleton className="h-72 lg:col-span-8" />
        <Skeleton className="h-72 lg:col-span-4" />
      </div>
    </div>
  );
}

function DashboardPage() {
  const { loading, summary, transactions, chart, chartSummary, months, setMonths } = useDashboard();
  const { language } = useLanguage();

  if (loading) {
    return (
      <DashboardSkeleton label={language === "id" ? "Memuat dasbor" : "Loading dashboard"} />
    );
  }

  return (
    <div className="space-y-8">
      <DashboardHeader />

      <OverviewCards summary={summary} />

      <CashFlowChart
        data={chart}

        summary={chartSummary}

        months={months}

        setMonths={setMonths}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <RecentTransaction transactions={transactions} />
        </div>

        <div className="lg:col-span-4">
          <QuickAction />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
