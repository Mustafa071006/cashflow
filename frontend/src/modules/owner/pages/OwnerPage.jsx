import Card from "@/components/ui/Card";
import Skeleton from "@/components/ui/Skeleton";

import useOwner from "../hooks/useOwner";
import { useLanguage } from "@/contexts/LanguageContext";

function OwnerPage() {
  const { stats, users, loading } = useOwner();
  const { language } = useLanguage();

  const loadingLabel = language === "id" ? "Memuat dasbor owner" : "Loading owner dashboard";

  if (loading) {
    return (
      <div role="status" aria-live="polite" aria-label={loadingLabel} className="space-y-8">
        <span className="sr-only">{loadingLabel}…</span>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
        </div>
        <Skeleton className="h-64" />
      </div>
    );
  }

  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(Number(value) || 0);
  };

  return (
    <div className="space-y-8">
      {/* HEADER */}

      <div>
        <h1 className="font-display text-hero-name font-semibold text-porcelain md:text-headline">
          {language === "id" ? "Dasbor Owner" : "Owner Dashboard"}
        </h1>

        <p className="mt-2 text-section-nav text-ash">
          {language === "id"
            ? "Pantau sistem dan kelola pengguna CashFlow."
            : "Monitor the system and manage CashFlow users."}
        </p>
      </div>

      {/* OWNER STATISTICS */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <Card>
          <p className="text-body text-ash">
            {language === "id" ? "Total Pengguna" : "Total Users"}
          </p>

          <h2 className="mt-3 font-display text-feature-stat font-semibold text-porcelain">
            {stats?.totalUsers || 0}
          </h2>
        </Card>

        <Card>
          <p className="text-body text-ash">
            {language === "id" ? "Dompet Saya" : "My Wallets"}
          </p>

          <h2 className="mt-3 font-display text-feature-stat font-semibold text-porcelain">
            {stats?.totalWallet || 0}
          </h2>
        </Card>

        <Card>
          <p className="text-body text-ash">
            {language === "id" ? "Transaksi Saya" : "My Transactions"}
          </p>

          <h2 className="mt-3 font-display text-feature-stat font-semibold text-porcelain">
            {stats?.totalTransactions || 0}
          </h2>
        </Card>

        <Card>
          <p className="text-body text-ash">
            {language === "id" ? "Pemasukan Saya" : "My Income"}
          </p>

          <h2 className="mt-3 truncate font-display text-product-label font-semibold text-income">
            {formatRupiah(stats?.income)}
          </h2>
        </Card>

        <Card>
          <p className="text-body text-ash">
            {language === "id" ? "Pengeluaran Saya" : "My Expenses"}
          </p>

          <h2 className="mt-3 truncate font-display text-product-label font-semibold text-expense">
            {formatRupiah(stats?.expense)}
          </h2>
        </Card>
      </div>

      {/* USER OVERVIEW */}

      <Card>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-product-label font-semibold text-porcelain">
            {language === "id" ? "Ringkasan Pengguna" : "User Overview"}
          </h2>

          <span className="text-utility text-ash">
            {users.length} {language === "id" ? "Pengguna" : "Users"}
          </span>
        </div>

        <div className="scroll-area overflow-x-auto">
          <table className="w-full min-w-full text-left">
            <thead>
              <tr className="border-b border-steel">
                <th scope="col" className="px-4 py-3 text-utility font-semibold text-ash">
                  {language === "id" ? "Nama" : "Name"}
                </th>

                <th scope="col" className="px-4 py-3 text-utility font-semibold text-ash">
                  Email
                </th>

                <th scope="col" className="px-4 py-3 text-utility font-semibold text-ash">
                  Role
                </th>
              </tr>
            </thead>

            <tbody>
              {users.slice(0, 5).map((user) => (
                <tr
                  key={user.id}

                  className="border-b border-steel/60 last:border-0"
                >
                  <td className="px-4 py-3 text-body font-medium text-porcelain">{user.name}</td>

                  <td className="px-4 py-3 text-body text-ash">{user.email}</td>

                  <td className="px-4 py-3 text-body text-ash">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export default OwnerPage;
